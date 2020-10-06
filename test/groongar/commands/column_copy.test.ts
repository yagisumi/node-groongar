import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1, info1, buildRecords } from './setup'

const db_dir = path.join(__dirname, 'tmp.column_copy')
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

  test('column_copy', async () => {
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.column_copy.db'),
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

    const r2 = await groongar.load({
      table: info1.table,
      values: info1.values,
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()

    const r3 = await groongar.columnCreate({
      table: info1.table,
      name: 'year_str',
      flags: 'COLUMN_SCALAR',
      type: 'ShortText',
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()

    const r4 = await groongar.columnCopy({
      from_table: info1.table,
      from_name: 'year',
      to_table: info1.table,
      to_name: 'year_str',
    })

    expect(r4.ok).toBe(true)
    expect(r4.error).toBeUndefined()
    if (r4.ok) {
      expect(r4.value).toBe(true)
    }

    const r5 = await groongar.select({
      table: info1.table,
      filter: '_key == "Dragon Quest"',
    })

    expect(r5.ok).toBe(true)
    expect(r5.error).toBeUndefined()

    if (r5.ok) {
      const records = buildRecords(r5.value)
      expect(records.length).toBe(1)
      expect(records[0].year).toBe(1986)
      expect(records[0].year_str).toBe('1986')
    }
  })
})
