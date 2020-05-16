import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1, info1 } from './setup'

const db_dir = path.join(__dirname, 'db_io_flush')
let env: TestEnv

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

  test('io_flush', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'io_flush.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

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

    const r3 = await groongar.ioFlush({
      target_name: info1.table,
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    expect(r3.value).toBe(true)
  })
})
