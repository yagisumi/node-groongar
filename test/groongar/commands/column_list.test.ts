import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1, info1 } from './setup'

const db_dir = path.join(__dirname, 'tmp.column_list')
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

  test('column_list', async () => {
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.column_list.db'),
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

    const r2 = await groongar.columnList({
      table: info1.table,
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    if (r2.ok) {
      expect(Array.isArray(r2.value)).toBe(true)
      if (Array.isArray(r2.value)) {
        expect(r2.value.length).toBe(4)
        expect(r2.value[1][1]).toBe('_key')
        expect([r2.value[2][1], r2.value[3][1]].sort()).toEqual([info1.column1, info1.column2].sort())
      }
    }
  })
})
