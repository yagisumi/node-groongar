import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'tmp.ruby_eval')
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

  test('ruby_eval', async () => {
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.ruby_eval.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

    const r2 = await groongar.pluginRegister({
      name: 'ruby/eval',
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()

    const r3 = await groongar.rubyEval({
      script: '1 + 2',
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    if (r3.ok) {
      expect((r3.value as { value: any }).value).toBe(3)
    }

    const r4 = await groongar.rubyEval({
      script: 'raise "Error"',
    })
    expect(r4.ok).toBe(true)
    expect(r4.error).toBeUndefined()
    if (r4.ok) {
      expect((r4.value as { exception: { message: string } }).exception.message).toBe('Error')
    }
  })
})
