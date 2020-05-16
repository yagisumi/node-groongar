import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1, info1 } from './setup'

const db_dir = path.join(__dirname, 'db_index_column_diff')
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

  test('index_column_diff', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'index_column_diff.db'),
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

    await groongar.truncate({
      target_name: 'Terms.NES_title',
    })

    const r3 = await groongar.indexColumnDiff({
      table: 'Terms',
      name: 'NES_title',
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    if (r3.ok) {
      expect(Array.isArray(r3.value)).toBe(true)
      expect(r3.value.length > 0).toBe(true)
    }
  })
})
