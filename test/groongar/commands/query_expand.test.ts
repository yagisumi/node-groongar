import path from 'path'
import { createGroongar } from '@/groongar'
import { setup2 } from './setup'

const db_dir = path.join(__dirname, 'db_query_expand')
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

  test('query_expand', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'query_expand.db'),
    })
    const groongar = createGroongar(env.client)
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
