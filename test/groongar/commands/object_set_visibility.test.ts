import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1 } from './setup'

const db_dir = path.join(__dirname, 'db_object_set_visibility')
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

  test('object_set_visibility', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'object_set_visibility.db'),
    })
    const groongar = createGroongar(env.client)
    const r1 = await setup1(groongar)
    if (r1.error) {
      throw r1.error
    }

    const r2 = await groongar.objectSetVisibility({
      name: 'Terms.NES_title',
      visible: 'no',
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    expect(typeof r2.value).toBe('object')
    if (r2.ok) {
      expect(r2.value.new).toBe(false)
    }
  })
})