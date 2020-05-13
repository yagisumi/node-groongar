import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'db_database_unmap')
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

  test('database_unmap', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'database_unmap.db'),
    })
    const groongar = createGroongar(env.client)

    const r2 = await groongar.threadLimit({
      max: 1,
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()

    const r3 = await groongar.databaseUnmap()
    if (r3.ok) {
      expect(r3.value).toBe(true)
    } else {
      expect(r3.error).toBeInstanceOf(Error)
    }
  })
})
