import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1, info1 } from './setup'

const db_dir = path.join(__dirname, 'tmp.table_tokenize')
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

  test('table_tokenize', async () => {
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.table_tokenize.db'),
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

    const r2 = await groongar.tableTokenize({
      table: info1.table_terms,
      string: 'dragon quest',
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    if (r2.ok) {
      expect(r2.value.length).toBe(2)
    }
  })
})
