import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'tmp.quit')
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

  test('quit', async () => {
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.quit.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

    const r2 = await groongar.quit()
    if (r2.ok) {
      expect(r2.value).toBe(true)
    } else {
      expect(r2.error).toBeInstanceOf(Error)
    }
  })
})
