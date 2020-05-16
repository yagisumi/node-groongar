import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1 } from './setup'

const db_dir = path.join(__dirname, 'db_object_list')
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

  test('object_list', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'object_list.db'),
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

    const r2 = await groongar.objectList()
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    expect(typeof r2.value).toBe('object')

    const r3 = await groongar.objectList({
      command_version: 3,
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    expect(typeof r3.value).toBe('object')
  })
})
