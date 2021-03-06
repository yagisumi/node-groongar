import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'tmp.database_unmap')
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

  test('database_unmap', async () => {
    rimraf(db_dir)
    mkdir(db_dir)
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.database_unmap.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

    const r2 = await groongar.threadLimit({
      max: 1,
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()

    const r3 = await groongar.databaseUnmap()
    if (r3.ok) {
      expect(r3.value).toBe(true)
    } else {
      expect(r3.error).toBeInstanceOf(Error)
    }
  })
})
