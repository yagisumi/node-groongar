import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1, info1 } from './setup'

const db_dir = path.join(__dirname, 'tmp.object_remove')
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

  test('object_remove', async () => {
    rimraf(db_dir)
    mkdir(db_dir)
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.object_remove.db'),
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

    const r2 = await groongar.objectExist({
      name: info1.table,
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    expect(r2.value).toBe(true)

    const r3 = await groongar.objectRemove({
      name: info1.table,
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    expect(r3.value).toBe(true)

    const r4 = await groongar.objectExist({
      name: info1.table,
    })
    expect(r4.ok).toBe(true)
    expect(r4.error).toBeUndefined()
    expect(r4.value).toBe(false)

    const r5 = await groongar.objectRemove({
      name: info1.table,
    })
    expect(r5.ok).toBe(false)
    expect(r5.error).toBeInstanceOf(Error)
  })
})
