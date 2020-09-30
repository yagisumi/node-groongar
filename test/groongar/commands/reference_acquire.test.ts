import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1, info1 } from './setup'

const db_dir = path.join(__dirname, 'tmp.reference_acquire')
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
      return teardownClient(tmp)
    }
  })

  test('reference_acquire', async () => {
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.reference_acquire.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

    const r1 = await setup1(groongar)
    if (r1.error) {
      throw r1.error
    }

    const r2 = await groongar.referenceAcquire({
      target_name: info1.table,
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    expect(r2.value).toBe(true)

    const r3 = await groongar.referenceRelease({
      target_name: info1.table,
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    expect(r3.value).toBe(true)

    const r4 = await groongar.referenceAcquire()
    expect(r4.ok).toBe(true)
    expect(r4.error).toBeUndefined()
    expect(r4.value).toBe(true)

    const r5 = await groongar.referenceRelease()
    expect(r5.ok).toBe(true)
    expect(r5.error).toBeUndefined()
    expect(r5.value).toBe(true)
  })
})
