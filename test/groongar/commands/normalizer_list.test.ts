import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'db_normalizer_list')
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

  test('normalizer_list', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'normalizer_list.db'),
    })
    const groongar = createGroongar(env.client)

    const r2 = await groongar.normalizerList()
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    expect(Array.isArray(r2.value)).toBe(true)
    if (r2.ok) {
      if (r2.value.length > 0) {
        expect(typeof r2.value[0].name).toBe('string')
      }
    }

    const r3 = await groongar.normalizerList<3>({
      command_version: 3,
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    expect(Array.isArray(r3.value)).toBe(true)
  })
})
