import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'tmp.load_v3')
let env: TestEnv | undefined

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
      return teardownClient(tmp)
    }
  })

  test('load_v3', async () => {
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.load_v3.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

    const r1 = await groongar.tableCreate({
      name: 'Memos',
      flags: 'TABLE_NO_KEY',
    })
    expect(r1.ok).toBe(true)
    expect(r1.error).toBeUndefined()
    if (r1.ok) {
      expect(r1.value).toBe(true)
    }

    const r2 = await groongar.columnCreate({
      table: 'Memos',
      name: 'value',
      flags: 'COLUMN_SCALAR',
      type: 'Int8',
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    if (r2.ok) {
      expect(r2.value).toBe(true)
    }

    const values3 = [
      {
        value: 1,
      },
      {
        value: 2,
      },
    ]

    const r3 = await groongar.load({
      table: 'Memos',
      command_version: 3,
      values: values3,
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    if (r3.ok) {
      expect(r3.value).toEqual({
        n_loaded_records: 2,
      })
    }
  })
})
