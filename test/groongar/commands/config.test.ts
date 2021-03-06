import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'tmp.config_delete')
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

  test('config_delete', async () => {
    rimraf(db_dir)
    mkdir(db_dir)
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.config_delete.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

    const HELLO = 'hello'
    const WORLD = 'world'

    const r2 = await groongar.configSet({
      key: HELLO,
      value: WORLD,
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    expect(r2.value).toBe(true)

    const r3 = await groongar.configGet({
      key: HELLO,
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    expect(r3.value).toBe(WORLD)

    const r4 = await groongar.configDelete({
      key: HELLO,
    })
    expect(r4.ok).toBe(true)
    expect(r4.error).toBeUndefined()
    expect(r4.value).toBe(true)

    const r5 = await groongar.configGet({
      key: HELLO,
    })
    expect(r5.ok).toBe(true)
    expect(r5.error).toBeUndefined()
    expect(r5.value).toBe('')
  })
})
