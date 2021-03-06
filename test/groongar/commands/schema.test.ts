import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1 } from './setup'

const db_dir = path.join(__dirname, 'tmp.schema')
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

  test('schema', async () => {
    rimraf(db_dir)
    mkdir(db_dir)
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.schema.db'),
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

    const r2 = await groongar.schema({
      command_version: 3,
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    expect(typeof r2.value).toBe('object')

    const r3 = await groongar.schema()
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    expect(typeof r3.value).toBe('object')
  })
})
