import { Env } from './env'
import path from 'path'
import readdirp from 'readdirp'
import { merge } from './merge'
import { parseGrnTest, GrnTestElem, Command, Export, Pragma, Comment } from './grntest_parser'
import { CommandConverter } from './command_converter'
import fs from 'fs'
import util from 'util'
import heredoc from 'heredocument'

type TestFileInfo = {
  test: readdirp.EntryInfo
  expected: readdirp.EntryInfo
}

export async function convertGrnTest(env: Env) {
  const report: Record<string, any> = {}
  const src_dir = env.groonga_src_dir
  if (src_dir === undefined) {
    throw new Error('groonga source code directory not found')
  }

  const suite_dir = path.join(src_dir, 'test/command/suite')
  const entries = await readdirp.promise(suite_dir)
  const test_map: Record<string, TestFileInfo> = {}

  entries.forEach((ent) => {
    if (ent.path.endsWith('.test')) {
      const testPath = fixSuitePath(ent.path.slice(0, -5))
      test_map[testPath] = merge(test_map[testPath], { test: ent })
    } else if (ent.path.endsWith('.expected')) {
      const testPath = fixSuitePath(ent.path.slice(0, -9))
      test_map[testPath] = merge(test_map[testPath], { expected: ent })
    } else if (ent.path.endsWith('.rb')) {
      const testPath = fixSuitePath(ent.path.slice(0, -3))
      test_map[testPath] = merge(test_map[testPath], { test: ent })
    }
  })

  for (const testPath of Object.keys(test_map)) {
    console.log(testPath)
    const { test, expected } = test_map[testPath]
    if (!test || !expected) {
      console.error(`not enough files: ${testPath}`)
      merge(report, { 'not enough files': [testPath] })
      continue
    }

    const converter = new GrnTestConverter(testPath, test_map[testPath])
    try {
      const src = converter.main()
      // env.save_grntest(testPath + '.txt', util.inspect(converter.testElems, false, null))
      merge(report, converter.report)

      env.save_grntest(testPath + '.txt', env.prettier_format(src))
    } catch (e) {
      console.error(e)
      // continue
      throw e
    }
  }
  console.log(report)
  env.save_report('convert', report)
}

function fixSuitePath(testPath: string) {
  return 'suite/' + testPath.replace(/\\/g, '/')
}

type Context = {
  timeout?: number
  onerror?: boolean
}

class GrnTestConverter {
  readonly testPath: string
  readonly testFileInfo: TestFileInfo
  report: Record<string, any> = {}
  testElems?: GrnTestElem[]
  context: Context = {}
  omitReasons: Record<string, number> = {}
  skipReasons: Record<string, number> = {}
  isolatedReasons: Record<string, number> = {}
  copypathMap: Record<string, boolean> = {}

  constructor(testPath: string, testFileInfo: TestFileInfo) {
    this.testPath = testPath
    this.testFileInfo = testFileInfo
  }

  main() {
    this.buildTestElems()
    const lines = this.buildLines()
    return this.applyTemplate(lines)
  }

  private buildTestElems() {
    const { test, expected } = this.testFileInfo
    const test_elems = parseGrnTest(fs.readFileSync(test.fullPath, { encoding: 'utf8' }), false)
    const expected_elems = parseGrnTest(fs.readFileSync(expected.fullPath, { encoding: 'utf8' }), true)

    this.testElems = this.combineElems(test_elems, expected_elems)
    if (this.testElems === undefined) {
      merge(this.report['combine error'], [path])
      throw new Error('combine error')
    }
  }

  private buildLines() {
    const lines: string[] = []
    const tryLines: string[] = []

    if (this.testElems === undefined) {
      return lines
    }

    const onerror = this.context.onerror
    const currentLines = onerror ? tryLines : lines

    for (const elem of this.testElems) {
      if (elem.type === 'command') {
        const converter = new CommandConverter(elem, this.testPath)
        currentLines.push(...converter.main())
        merge(this.report, converter.report)
        if (converter.skipReason) {
          merge(this.skipReasons, {
            [converter.skipReason]: 1,
          })
        }
        if (converter.isolationReason) {
          merge(this.isolatedReasons, {
            [converter.isolationReason]: 1,
          })
        }
      } else if (elem.type === 'export') {
        currentLines.push(...this.getLinesOfExport(elem))
      } else if (elem.type === 'pragma') {
        currentLines.push(...this.getLinesOfPragma(elem))
      } else if (elem.type === 'log') {
        currentLines.push(...this.getLinesOfComment(elem))
      } else if (elem.type === 'querylog') {
        currentLines.push(...this.getLinesOfComment(elem))
      } else if (elem.type === 'note') {
        currentLines.push(...this.getLinesOfComment(elem))
      }
      lines.push('')

      if (onerror && !this.context.onerror) {
        this.pushTryLines(lines, tryLines)
      }
    }

    if (tryLines.length > 0) {
      this.pushTryLines(lines, tryLines)
    }

    return lines
  }

  private pushTryLines(lines: string[], tryLines: string[]) {
    lines.push('// on-error omit')
    lines.push('try {')
    lines.push(...tryLines)
    lines.push('} catch (e) {')
    lines.push('  //')
    lines.push('}')
    tryLines.length = 0
  }

  private getLinesOfExport(elem: Export) {
    if (elem.string.match(/^#\$(\w+)=(.+)/)) {
      const key = RegExp.$1
      const val = RegExp.$2.replace(/#\{/g, '${')
      return [
        `// ${elem.string}`,
        `setEnv(${key}, \`${val}\`)`, // need escape
      ]
    } else {
      throw new Error('unexpected')
    }
  }

  private getLinesOfPragma(elem: Pragma) {
    const lines = this.getLinesOfComment(elem)

    if (elem.string.match(/^#@timeout\s+(\d+)/)) {
      this.context.timeout = Number(RegExp.$1) * 1000
    } else if (elem.string.match(/^#@timeout\s+default/)) {
      // nothing
    } else if (elem.string.startsWith('#@omit')) {
      merge(this.omitReasons, { '#@omit': 1 })
    } else if (elem.string.startsWith('#@eval')) {
      merge(this.omitReasons, { '#@eval': 1 })
    } else if (elem.string.match(/^#@suggest-create-dataset\s+(\w+)/)) {
      const dataset = RegExp.$1
      lines.push(`await groongar.suggestCreateDataset(${dataset})`)
    } else if (elem.string.match(/^#@on-error\s+omit/)) {
      this.context.onerror = true
    } else if (elem.string.match(/^#@on-error\s+default/)) {
      this.context.onerror = false
    } else if (elem.string.match(/^#@copy-path\s+(\S+)\s+(\S+)/)) {
      const src = RegExp.$1
      const dest = RegExp.$2.replace(/#\{/g, '${')
      // #{db_directory}, #{db_path}
      lines.push(`copyPath('${src}', \`${dest}\`)`)
      merge(this.report, {
        '#@copy-path': {
          src: {
            [src]: 1,
          },
          dest: {
            [dest]: 1,
          },
        },
      })
    } else if (elem.string.match(/#@sleep\s+(\d+)/)) {
      const time = Number(RegExp.$1) * 1000
      lines.push(`await sleep(${time})`)
    } else if (elem.string.match(/^#@generate-series\s+(\d+)\s+(\d+)\s+(\w+)\s+'((?:\\'|[^'])+)'/)) {
      const from = Number(RegExp.$1)
      const to = Number(RegExp.$2)
      const table = RegExp.$3
      const value = RegExp.$4.trim().replace(/=>/g, ':')
      lines.push(`await generateSeries(groongar, '${table}', ${from}, ${to}, (i) => { return ${value}})`)
    } else if (elem.string.match(/^#@add-important-log-levels/)) {
      // ignore
    } else if (elem.string.match(/^#@remove-important-log-levels/)) {
      // ignore
    } else if (elem.string.match(/^#@disable-logging/)) {
      // ignore
    } else if (elem.string.match(/^#@enable-logging/)) {
      // ignore
    } else if (elem.string.match(/^#@collect-query-log (true|false)/)) {
      // ignore
    } else if (elem.string.match(/^#@read-timeout\s+(\S+)/)) {
      // ignore
    } else if (elem.string.match(/^#@timeout default/)) {
      // ignore
    } else if (elem.string.match(/^#@require-input-type/)) {
      // ignore
    } else if (elem.string.match(/^#@add-ignore-log-pattern/)) {
      // ignore
    } else if (elem.string.match(/^#@remove-ignore-log-pattern/)) {
      // ignore
    } else if (elem.string.match(/^#@require-interface http/)) {
      // ignore
    } else if (elem.string.match(/^#@require-testee groonga/)) {
      // ignore
    } else if (elem.string.match(/^#@require-apache-arrow/)) {
      // ignore
    } else if (elem.string.match(/^#@include /)) {
      // !!!
    } else {
      throw new Error(`unexpected pragma: ${elem.string}`)
    }

    return lines
  }

  private getLinesOfComment(elem: Comment) {
    return elem.string.split(/\n/).map((line) => `// ${line}`)
  }

  private combineElems(test_elems: GrnTestElem[], expected_elems: GrnTestElem[]) {
    let test_max_cmd_count = 0
    let expected_max_cmd_count = 0
    const responses: { [key: number]: Command } = {}

    test_elems.forEach((elem) => {
      if (elem.type === 'command' && elem.count > test_max_cmd_count) {
        test_max_cmd_count = elem.count
      }
    })
    expected_elems.forEach((elem) => {
      if (elem.type === 'command') {
        if (elem.count > 0) {
          responses[elem.count] = elem
          if (elem.response === undefined) {
            console.log(expected_elems)
            throw new Error('missing response')
          }
        }

        if (elem.count > expected_max_cmd_count) {
          expected_max_cmd_count = elem.count
        }
      }
    })

    if (test_max_cmd_count !== expected_max_cmd_count) {
      return undefined
    }

    for (let i = 0; i < test_elems.length; i++) {
      const elem = test_elems[i]
      if (elem.type === 'command' && elem.count > 0) {
        test_elems[i] = responses[elem.count]
      }
    }

    return test_elems
  }

  private applyTemplate(lines: string[]) {
    const basename = path.basename(this.testPath)
    return heredoc`
      import path from 'path'
      import { createGroongar } from '@/groongar'

      const db_directory = path.join(__dirname, 'tmp.${basename}')
      const db_path = path.join(db_directory, 'tmp.${basename}.db')
      let env: TestEnv

      describe('test', () => {
        beforeAll(() => {
          rimraf(db_directory)
          mkdir(db_directory)
        })

        afterAll(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              rimraf(db_directory)
              resolve()
            }, 500)
          })
        })

        beforeEach(() => {
          env = undefined as any
        })

        afterEach(() => {
          if (env) {
            const tmp = env
            env = undefined as any
            return teardown(tmp)
          }
        })

        test('${basename}', async () => {
          env = await setup({
            db_path: db_path,
          })
          const r_grngr = createGroongar(env.client)
          if (r_grngr.error) {
            throw r_grngr.error
          }
          const groongar = r_grngr.value

          ${lines.join('\n')}
        })
      })
    `
  }
}
