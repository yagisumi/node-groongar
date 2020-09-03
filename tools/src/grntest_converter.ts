import { Env } from './env'
import path from 'path'
import readdirp from 'readdirp'
import { merge } from './merge'
import { parseGrnTest, GrnTestElem, Command } from './grntest_parser'
import fs from 'fs'
import util from 'util'

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
      const path = ent.path.slice(0, -5)
      test_map[path] = merge(test_map[path], { test: ent })
    } else if (ent.path.endsWith('.expected')) {
      const path = ent.path.slice(0, -9)
      test_map[path] = merge(test_map[path], { expected: ent })
    } else if (ent.path.endsWith('.rb')) {
      const path = ent.path.slice(0, -3)
      test_map[path] = merge(test_map[path], { test: ent })
    }
  })

  for (const path of Object.keys(test_map)) {
    console.log(path)
    const { test, expected } = test_map[path]
    if (!test || !expected) {
      console.error(`not enough files: ${path}`)
      merge(report, { 'not enough files': [path] })
      continue
    }

    const test_elems = parseGrnTest(fs.readFileSync(test.fullPath, { encoding: 'utf8' }), false)
    const expected_elems = parseGrnTest(fs.readFileSync(expected.fullPath, { encoding: 'utf8' }), true)

    //

    const combined = combineElems(test_elems, expected_elems)
    if (combined === undefined) {
      console.log(path)
      report['combine error'] = merge(report['combine error'], [path])
      continue
    }

    env.save_grntest(path + '.txt', util.inspect(combined, false, null))
  }
  console.log(report)
}

function combineElems(test_elems: GrnTestElem[], expected_elems: GrnTestElem[]) {
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

class GrnTestConverter {
  readonly path: string
  readonly testFileInfo: TestFileInfo

  constructor(path: string, testFileInfo: TestFileInfo) {
    this.path = path
    this.testFileInfo = testFileInfo
  }

  main() {}

  buildTestElems() {}
}
