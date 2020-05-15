import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1, info1 } from './setup'

const db_dir = path.join(__dirname, 'db_column_rename')
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

  test('column_rename', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'column_rename.db'),
    })
    const groongar = createGroongar(env.client)
    const r1 = await setup1(groongar)
    if (r1.error) {
      throw r1.error
    }

    const r2 = await groongar.columnRename({
      table: info1.table,
      name: info1.column1,
      new_name: 'year2',
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    expect(r2.value).toBe(true)

    const r3 = await groongar.columnRename({
      table: info1.table,
      name: 'groongar',
      new_name: 'groongar2',
    })
    expect(r3.ok).toBe(false)
    expect(r3.error).toBeInstanceOf(Error)
  })
})