import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'db_query_log_flags_add')
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

  test('query_log_flags_add', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'query_log_flags_add.db'),
    })
    const groongar = createGroongar(env.client)

    const r2 = await groongar.queryLogFlagsSet({
      flags: 'SIZE',
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    if (r2.ok) {
      expect(r2.value.current).toBe('SIZE')
    }

    const r3 = await groongar.queryLogFlagsAdd({
      flags: 'SCORE|COMMAND',
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    if (r3.ok) {
      expect(r3.value.previous).toBe('SIZE')
      expect(r3.value.current.split('|').sort()).toEqual(['COMMAND', 'SCORE', 'SIZE'])
    }

    const r4 = await groongar.queryLogFlagsRemove({
      flags: 'SCORE',
    })
    expect(r4.ok).toBe(true)
    expect(r4.error).toBeUndefined()
    if (r4.ok) {
      expect(r4.value.previous.split('|').sort()).toEqual(['COMMAND', 'SCORE', 'SIZE'])
      expect(r4.value.current.split('|').sort()).toEqual(['COMMAND', 'SIZE'])
    }

    const r5 = await groongar.queryLogFlagsGet()
    expect(r5.ok).toBe(true)
    expect(r5.error).toBeUndefined()
    if (r5.ok) {
      expect(r5.value.split('|').sort()).toEqual(['COMMAND', 'SIZE'])
    }
  })
})
