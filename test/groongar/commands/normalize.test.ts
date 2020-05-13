import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'db_normalize')
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

  test('normalize', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'normalize.db'),
    })
    const groongar = createGroongar(env.client)

    const r2 = await groongar.normalize({
      normalizer: 'NormalizerAuto',
      string: 'HELLO WORLD',
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    if (r2.ok) {
      expect(r2.value.normalized).toBe('hello world')
    }
  })
})
