import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'db_tokenizer_list')
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

  test('tokenizer_list', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'tokenizer_list.db'),
    })
    const groongar = createGroongar(env.client)

    const r2 = await groongar.tokenizerList()
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    if (r2.ok) {
      expect(r2.value.some((tokenizer) => tokenizer.name === 'TokenBigram')).toBe(true)
    }
  })
})