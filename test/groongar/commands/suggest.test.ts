import path from 'path'
import { createGroongar } from '@/groongar'
import { setup4 } from './setup'

const db_dir = path.join(__dirname, 'tmp.suggest')
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

  test('suggest', async () => {
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.suggest.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

    const r1 = await setup4(groongar)
    if (r1.error) {
      throw r1.error
    }

    const expected = {
      suggest: [
        [1],
        [
          ['_key', 'ShortText'],
          ['_score', 'Int32'],
        ],
        ['engine engine engine', 10],
      ],
    }

    const r2 = await groongar.suggest({
      table: 'item_query',
      column: 'kana',
      types: 'suggest',
      query: 'engine',
      frequency_threshold: 0,
      conditional_probability_threshold: 0,
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    if (r2.ok) {
      expect(r2.value).toEqual(expected)
    }
  })
})
