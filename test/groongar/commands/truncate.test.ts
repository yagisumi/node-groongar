import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1, info1 } from './setup'

const db_dir = path.join(__dirname, 'tmp.truncate')
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

  test('truncate', async () => {
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.truncate.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

    const r1 = await setup1(groongar, true)
    if (r1.error) {
      throw r1.error
    }

    const r2 = await groongar.select({
      table: info1.table,
      limit: 0,
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    if (r2.ok) {
      expect(r2.value.n_hits).toBe(info1.values.length)
    }

    const r3 = await groongar.truncate({
      target_name: info1.table,
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    expect(r3.value).toBe(true)

    const r4 = await groongar.select({
      table: info1.table,
      limit: 0,
    })
    expect(r4.ok).toBe(true)
    expect(r4.error).toBeUndefined()
    if (r4.ok) {
      expect(r4.value.n_hits).toBe(0)
    }
  })
})
