import { Command, Response } from './grntest_parser'
import { merge } from './merge'

type ErrorInfo = {
  return_code: number
  message?: string
}

type GroongarArgsVal = string | number | bigint | GroongarArgsVal[] | GroongarArgs
interface GroongarArgs {
  [key: string]: GroongarArgsVal
}

export function convertCommand(cmd: Command, testPath: string) {}

const FORCE_STRING_KEYS = ['script', 'query', 'filter', 'output_columns', 'string']

export class CommandConverter {
  cmd: Command
  testPath: string
  lines: string[] = []
  report: Record<string, any> = {}

  private countStr: string
  private errorMassage?: string
  private args: GroongarArgs
  private withAny = false

  constructor(cmd: Command, testPath: string) {
    this.cmd = cmd
    this.testPath = testPath

    this.countStr = this.getCountStr(cmd)
    this.errorMassage = getErrorMessage(cmd.response)
    this.args = this.parseArguments({}, cmd.command.arguments, cmd.command.command_name)
  }

  main() {}

  private getCountStr(cmd: Command) {
    const count = cmd.count
    return count < 0 ? `_t${Math.abs(count)}` : count.toString()
  }

  // buildArguments(cmd: Command) {
  //   return this.parseArguments({}, cmd.command.arguments, cmd.command.command_name)
  // }

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
      } else {
        const lines: string[] = []
        lines.push(`${'  '.repeat(indent)}${this.objLabel(key)}: [`)
        for (const v of val) {
          //
        }
        lines.push(`${'  '.repeat(indent)}],`)
        throw new Error('unexpected')
      }
    } else if (typeof val === 'object') {
      const lines: string[] = []
      lines.push(`${'  '.repeat(indent)}${this.objLabel(key)}: {`)
      for (const k of Object.keys(val)) {
        const v = val[k]
        lines.push(...this.objLines(cmd, k, v, indent + 1))
      }
      lines.push(`${'  '.repeat(indent)}},`)
      return lines
    } else if (typeof val === 'bigint') {
      return [`${'  '.repeat(indent)}${this.objLabel(key)}: '${val.toString()}',`]
    } else {
      // string, number
      return [`${'  '.repeat(indent)}${this.objLabel(key)}: ${JSON.stringify(val)},`]
    }
  }

  private valLines(val: GroongarArgsVal, indent = 0) {
    if (Array.isArray(val)) {
      const lines: string[] = ['[']
      for (const v of val) {
        const vlines = this.valLines(v, indent + 1)
        const idxTail = vlines.length - 1
        vlines[0] = '  '.repeat(indent + 1) + vlines[0]
        vlines[idxTail] = vlines[idxTail] + ','
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
