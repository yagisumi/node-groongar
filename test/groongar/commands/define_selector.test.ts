import path from 'path'
import { createGroongar, Groongar, GroongaClient } from '@/groongar'
import { setup1, info1, buildRecords } from './setup'
import { types } from '@/types'
import { OK, ERR, Result } from '@/result'

const db_dir = path.join(__dirname, 'db_define_selector')
let env: TestEnv

declare module '@/groongar' {
  interface Groongar {
    searchEnix(): Promise<Result<types.ret<'select', 3>>>
  }
}

Groongar.prototype.searchEnix = function (this: Groongar<GroongaClient>): Promise<Result<types.ret<'select', 3>>> {
  return new Promise((resolve) => {
    try {
      this.client.command('search_enix', { command_version: 3 }, (err, data) => {
        if (err) {
          resolve(ERR(err))
        } else {
          resolve(OK(data))
        }
      })
    } catch (err) {
      resolve(ERR(err))
    }
  })
}

describe('test', () => {
  beforeAll(() => {
    rimraf(db_dir)
    mkdir(db_dir)
  })

  afterAll(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        rimraf(db_dir)
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

  test('define_selector', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'define_selector.db'),
    })
    const groongar = createGroongar(env.client)
    const r1 = await setup1(groongar)
    if (r1.error) {
      throw r1.error
    }

    const r2 = await groongar.load({
      table: info1.table,
      values: info1.values,
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()

    const r3 = await groongar.defineSelector({
      name: 'search_enix',
      table: info1.table,
      filter: 'publisher == "ENIX"',
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    expect(r3.value).toBe(true)

    const r4 = await groongar.searchEnix()
    expect(r4.ok).toBe(true)
    expect(r4.error).toBeUndefined()
    if (r4.ok) {
      const records = buildRecords(r4.value)
      expect(records.length).toBe(4)
      expect(records[0].publisher).toBe('ENIX')
    }
  })
})