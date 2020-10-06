import path from 'path'
import { createGroongar } from '@/groongar'
import { setup3, info1, buildRecords } from './setup'

const db_dir = path.join(__dirname, 'tmp.range_filter')
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

  test('range_filter', async () => {
    rimraf(db_dir)
    mkdir(db_dir)
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.range_filter.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

    const r1 = await setup3(groongar)
    if (r1.error) {
      throw r1.error
    }

    const r2 = await groongar.rangeFilter({
      table: info1.table,
      column: 'year',
      min: 1986,
      max: 1988,
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    if (r2.ok) {
      const records = buildRecords(r2.value)
      expect(records.length > 0).toBe(true)
      expect(1986 <= records[0].year && records[0].year <= 1988).toBe(true)
    }
  })
})
