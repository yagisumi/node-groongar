import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'db_table_create')
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

  test('table_create', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'table_create.db'),
    })
    const groongar = createGroongar(env.client)

    const r2 = await groongar.tableCreate({
      name: 'test',
      flags: 'TABLE_NO_KEY',
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    expect(r2.value).toBe(true)
  })
})