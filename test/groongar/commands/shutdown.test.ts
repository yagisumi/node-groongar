import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'db_shutdown')
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

  test('shutdown', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'shutdown.db'),
    })
    const groongar = createGroongar(env.client)

    const r2 = await groongar.shutdown()
    if (r2.ok) {
      expect(typeof r2.value).toBe('boolean')
    } else {
      expect(r2.error).toBeInstanceOf(Error)
    }
  })
})
