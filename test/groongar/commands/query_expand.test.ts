import path from 'path'
import { createGroongar } from '@/groongar'
import { setup2 } from './setup'

const db_dir = path.join(__dirname, 'tmp.query_expand')
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

  test('query_expand', async () => {
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.query_expand.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

    const r1 = await setup2(groongar)
    if (r1.error) {
      throw r1.error
    }

    const r2 = await groongar.queryExpand({
      term_column: 'term',
      expanded_term_column: 'expansion',
      expander: 'TermExpansions',
      query: 'Groonga Rroonga Mroonga',
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    expect(r2.value).toBe('Groonga ((Rroonga) OR (Ruby Groonga)) Mroonga')
  })
})
