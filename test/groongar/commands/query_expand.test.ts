import path from 'path'
import { createGroongar } from '@/groongar'
import { setup2 } from './setup'

const db_dir = path.join(__dirname, 'tmp.query_expand')
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

  test('query_expand', async () => {
    rimraf(db_dir)
    mkdir(db_dir)
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
