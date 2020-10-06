import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'tmp.normalizer_list')
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

  test('normalizer_list', async () => {
    rimraf(db_dir)
    mkdir(db_dir)
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.normalizer_list.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

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
