import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1 } from './setup'

const db_dir = path.join(__dirname, 'tmp.check')
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

  test('check', async () => {
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.check.db'),
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

    const r2 = await groongar.check({
      obj: r1.value.table,
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    expect(Array.isArray(r2.value)).toBe(true)
  })
})
