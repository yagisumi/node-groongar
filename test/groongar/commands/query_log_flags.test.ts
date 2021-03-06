import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'tmp.query_log_flags_add')
let env: TestEnv | undefined

describe('test', () => {
  beforeEach(() => {
    env = undefined
  })

  afterEach(async () => {
    if (env) {
      await teardownClient(env)
      rimraf(db_dir)
    }
  })

  test('query_log_flags_add', async () => {
    rimraf(db_dir)
    mkdir(db_dir)
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.query_log_flags_add.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

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
