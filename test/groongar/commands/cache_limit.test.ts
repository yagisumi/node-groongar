import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'tmp.cache_limit')
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

  test('cache_limit', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'tmp.cache_limit.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

    const r1 = await groongar.cacheLimit()
    expect(r1.ok).toBe(true)
    if (r1.ok) {
      expect(typeof r1.value).toBe('number')
    }

    const r2 = await groongar.cacheLimit({
      max: 50,
    })
    expect(r2.ok).toBe(true)
    if (r2.ok) {
      expect(typeof r2.value).toBe('number')
    }

    const r3 = await groongar.cacheLimit({
      max: -50,
    })
    expect(r3.ok).toBe(false)
    expect(r3.error).toBeInstanceOf(Error)
  })
})
