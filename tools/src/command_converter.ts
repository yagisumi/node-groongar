import { Command, Response } from './grntest_parser'
import { merge } from './merge'

type GroongarArgsVal = string | number | bigint | GroongarArgsVal[] | GroongarArgs
interface GroongarArgs {
  [key: string]: GroongarArgsVal
}

export const FORCE_STRING_KEYS = ['script', 'query', 'filter', 'output_columns', 'string']
export const ANY_TEST_MAP: Record<string, boolean> = {
  'suite/config_set/no_value:1': true,
  // 'reference/commands/io_flush:9': true,
}

export class CommandConverter {
  cmd: Command
  testPath: string
  lines: string[] = []
  report: Record<string, any> = {}

  private countStr: string
  private errorMassage?: string
  private args: GroongarArgs
  private withAny = false
  private testId: string
  private skipReason?: string
  private isolationReason?: string

  constructor(cmd: Command, testPath: string) {
    this.cmd = cmd
    this.testPath = testPath

    this.countStr = this.getCountStr(cmd)
    this.errorMassage = getErrorMessage(cmd.response)
    this.args = this.parseArguments({}, cmd.command.arguments, cmd.command.command_name)
    this.testId = this.getTestId(cmd, testPath)

    this.withAny = ANY_TEST_MAP[this.testId] ? true : false
  }

  main() {
    this.gatherInfo()
    return this.testLines
  }

  private gatherInfo() {
    this.skipReason = this.getSkipReason()
    this.isolationReason = this.getIsolationReason()

    merge(this.report, {
      commands: {
        [this.cmd.command.command_name]: {
          count: 1,
          args: this.argsInfo(),
        },
      },
    })

    if (this.skipReason) {
      merge(this.report, {
        skip_reason: {
          [this.skipReason]: 1,
        },
      })
    }

    if (this.isolationReason) {
      merge(this.report, {
        isolation_reason: {
          [this.isolationReason]: 1,
        },
      })
    }
  }

  private argsInfo() {
    const info: Record<string, number | Record<string, number>> = {}
    const args = this.cmd.command.arguments
    const keys = Object.keys(args)
    if (keys.length === 0) {
      info['<empty>'] = 1
    } else {
      for (const key of keys) {
        const argKey = key.replace(/\[[.\w]+\]/g, '[]')
        const val = args[key]
        const type = this.argType(key, val)

        if (val.match(/^[A-Z_,|\s]+$/)) {
          merge(info, {
            [argKey]: {
              [val]: 1,
            },
          })
        } else {
          merge(info, {
            [argKey]: {
              [type]: 1,
            },
          })
        }
      }
    }

    return info
  }

  private argType(key: string, val: string) {
    if (FORCE_STRING_KEYS.includes(key)) {
      return '<string>'
    }

    if (val.match(/^-?[\d.]+$/)) {
      if (val.indexOf('.') === -1) {
        return '<integer>'
      } else if (val !== '.') {
        return '<float>'
      }
    }

    return '<string>'
  }

  private getSkipReason() {
    if (this.cmd.command.arguments['output_type'] === 'apache-arrow') {
      return 'output_type=apache-arrow'
    } else {
      return undefined
    }
  }

  private getIsolationReason() {
    const cmdName = this.cmd.command.command_name
    const args = this.cmd.command.arguments

    if (cmdName === 'cache_limit') {
      return 'command_name=cache_limit'
    } else if (cmdName === 'tokenize' && args['normalizer'] === 'NormalizerAuto') {
      return 'command_name=tokenize&normalizer=NormalizerAuto'
    } else if (args['output_type'] && args['output_type'] !== 'json') {
      return 'output_type!=json'
    } else if (cmdName.match(/^query_log_flags_/)) {
      return 'command_name=query_log_flags_*'
    } else {
      return undefined
    }
  }

  private testLines() {
    const lines: string[] = []
    lines.push(`// ${this.testId}`)

    if (this.cmd.command.command_name === 'load' && Array.isArray(this.args.values)) {
      const vlines = this.valLines(this.args.values, 0)
      vlines[0] = `const values${this.countStr} = ` + vlines[0]
      lines.push(...vlines)
    }

    const alines = this.argsToLines(this.cmd, this.args)
    alines[0] = `const r${this.countStr} = await groongar.${this.methodName(this.cmd)}(` + alines[0]
    alines[alines.length - 1] += ')'
    lines.push(...alines)

    if (this.errorMassage) {
      lines.push(`expect(r${this.countStr}.ok).toBe(false)`)
      lines.push(`expect(r${this.countStr}.error).instanceOf(Error)`)
      lines.push(
        `if (r${this.countStr}.error) {`,
        `  const errMsg = ${JSON.stringify(this.errorMassage)}`,
        `  expect(r${this.countStr}.error.message.trim()).toBe(errMsg.trim())`,
        '}'
      )
    } else {
      lines.push(`expect(r${this.countStr}.ok).toBe(true)`)
      lines.push(`expect(r${this.countStr}.error).toBeUndefined()`)
      const res = getResponse(this.cmd.response)
      const rlines = this.valLines([res] as any, 0)
      rlines[0] = `const expected${this.countStr} = ` + rlines[0]
      lines.push(...rlines)
      lines.push(`if (r${this.countStr}.ok) {`)
      if (this.cmd.command.command_name === 'object_inspect') {
        lines.push(`  expect([fixObjectInspect(r${this.countStr}.value)]).toEqual(expected${this.countStr})`)
      } else {
        lines.push(`  expect([r${this.countStr}.value]).toEqual(expected${this.countStr})`)
      }
      lines.push('}')
    }

    return lines
  }

  private methodName(cmd: Command) {
    const name = cmd.command.command_name
      .split(/_/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
    return name.charAt(0).toLowerCase() + name.slice(1)
  }

  private getCountStr(cmd: Command) {
    const count = cmd.count
    return count < 0 ? `_t${Math.abs(count)}` : count.toString()
  }

  private getTestId(cmd: Command, testPath: string) {
    return `${testPath}:${cmd.count}`
  }

  private parseArguments(ret: GroongarArgs, args: Record<string, string>, cmdName: string) {
    for (const key of Object.keys(args)) {
      const val = args[key]
      let v = this.toVal(key, val)
      if (key.match(/^(\w+)\[([.\w]+)\]\./)) {
        const groupKey = this.fixGroupKey(RegExp.$1)
        const label = RegExp.$2
        const rest = key.slice(RegExp.lastMatch.length)
        const groupArgs: GroongarArgs = (ret[groupKey] as GroongarArgs) ?? {}
        ret[groupKey] = groupArgs
        const labelArgs: GroongarArgs = (groupArgs[label] as GroongarArgs) ?? {}
        groupArgs[label] = labelArgs
        const childArgs: Record<string, string> = {}
        childArgs[rest] = val
        this.parseArguments(labelArgs, childArgs, cmdName)
      } else {
        if (cmdName === 'load') {
          if (key === 'columns' && val === '') {
            continue
          } else if (key === 'values' && typeof val === 'string') {
            v = JSON.parse(val)
          }
        }
        ret[this.fixKey(key, cmdName)] = v
      }
    }
    return ret
  }

  private fixGroupKey(key: string) {
    if (key === 'column') {
      return 'columns'
    } else if (key === 'drilldown') {
      return 'drilldowns'
    }
    return key
  }

  private fixKey(key: string, cmdName: string) {
    let k = key
    if (key === 'default_normalizer') {
      this.reportFixedKey('default_normalizer')
      k = 'normalizer'
    } else if (key === 'normalize' && cmdName === 'table_create') {
      this.reportFixedKey('normalize')
      k = 'normalizer'
    } else if (key === 'token-fitlers') {
      this.reportFixedKey('token-fitlers')
      k = 'token_filters'
    } else if (key === 'sort_by') {
      this.reportFixedKey('sort_by')
      k = 'sort_keys'
    } else if (key === 'window.sort_keys') {
      k = 'window_sort_keys'
    } else if (key === 'window.group_keys') {
      k = 'window_group_keys'
    }

    return k
  }

  private reportFixedKey(key: string) {
    merge(this.report, { fixed_keys: { [this.testPath]: { [key]: 1 } } })
  }

  private toVal(key: string, val: string) {
    if (!FORCE_STRING_KEYS.includes(key) && typeof val === 'string') {
      if (val.match(/^-?[\d]+$/)) {
        const v = Number(val)
        return v > Number.MAX_SAFE_INTEGER ? BigInt(val) : v
      } else if (val.match(/^-?[\d.]+$/)) {
        return Number(val)
      }
    }
    return val
  }

  private argsToLines(cmd: Command, args: GroongarArgs) {
    const lines: string[] = []
    if (Object.keys(args).length === 0) {
      if (this.errorMassage) {
        lines.push('{} as any')
      } else {
        lines.push('')
      }
    } else {
      lines.push('{')

      for (const key of Object.keys(args)) {
        const val = this.args[key]
        lines.push(...this.objLines(cmd, key, val))
      }

      if (this.errorMassage || this.withAny) {
        lines.push('} as any')
      } else {
        lines.push('}')
      }
    }
    return lines
  }

  private objLines(cmd: Command | undefined, key: string, val: GroongarArgsVal, indent = 1) {
    if (Array.isArray(val)) {
      if (key === 'values' && cmd?.command.command_name === 'load') {
        return [`${'  '.repeat(indent)}${this.objLabel(key)}: values${this.getCountStr(cmd)},`]
      }
    }

    const vlines = this.valLines(val, indent)
    const idxTail = vlines.length - 1
    vlines[0] = `${'  '.repeat(indent)}${this.objLabel(key)}: ` + vlines[0]
    vlines[idxTail] += ','
    return vlines
  }

  private valLines(val: GroongarArgsVal, indent = 0) {
    if (Array.isArray(val)) {
      const lines: string[] = ['[']
      for (const v of val) {
        const vlines = this.valLines(v, indent + 1)
        const idxTail = vlines.length - 1
        vlines[0] = '  '.repeat(indent + 1) + vlines[0]
        vlines[idxTail] += ','
        lines.push(...vlines)
      }
      lines.push(`${'  '.repeat(indent)}]`)
      return lines
    } else if (typeof val === 'object') {
      const lines: string[] = ['{']
      for (const k of Object.keys(val)) {
        const v = val[k]
        lines.push(...this.objLines(undefined, k, v, indent + 1))
      }
      lines.push(`${'  '.repeat(indent)}}`)
      return lines
    } else if (typeof val === 'bigint') {
      return [`'${val.toString()}'`]
    } else {
      return [JSON.stringify(val)]
    }
  }

  private objLabel(key: string) {
    return key.match(/^[a-zA-Z_]\w*$/) ? key : JSON.stringify(key)
  }
}

export function getErrorMessage(response?: Response): string | undefined {
  let msg = undefined

  if (Array.isArray(response)) {
    if (Array.isArray(response[0][0])) {
      msg = response[0][1] as string
    }
  } else if (typeof response === 'object') {
    msg = response.header.error?.message
  }

  return msg
}

export function getResponse(response?: Response): unknown {
  let r = undefined

  if (Array.isArray(response)) {
    r = response[1]
  } else if (typeof response === 'object') {
    r = response.body
  }

  return r
}
