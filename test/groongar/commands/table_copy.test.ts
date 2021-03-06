import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1, info1 } from './setup'

const db_dir = path.join(__dirname, 'tmp.table_copy')
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

  test('table_copy', async () => {
    rimraf(db_dir)
    mkdir(db_dir)
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.table_copy.db'),
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

    const table = 'FAMICOM'
    await groongar.cacheLimit({ max: 0 })

    const r2 = await groongar.tableCreate({
      name: table,
      flags: 'TABLE_HASH_KEY',
      key_type: 'ShortText',
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()

    const r3 = await groongar.columnCreate({
      table: table,
      name: 'year',
      flags: 'COLUMN_SCALAR',
      type: 'Int32',
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()

    const r4 = await groongar.columnCreate({
      table: table,
      name: 'publisher',
      flags: 'COLUMN_SCALAR',
      type: 'ShortText',
    })
    expect(r4.ok).toBe(true)
    expect(r4.error).toBeUndefined()

    const r5 = await groongar.select({
      table: table,
    })
    expect(r5.ok).toBe(true)
    expect(r5.error).toBeUndefined()
    if (r5.ok) {
      expect(r5.value.n_hits).toBe(0)
    }

    const r6 = await groongar.tableCopy({
      from_name: info1.table,
      to_name: table,
    })
    expect(r6.ok).toBe(true)
    expect(r6.error).toBeUndefined()
    if (r6.ok) {
      expect(r6.value).toBe(true)
    }

    const r7 = await groongar.select({
      table: table,
    })
    expect(r7.ok).toBe(true)
    expect(r7.error).toBeUndefined()
    if (r7.ok) {
      expect(r7.value.n_hits).toBe(info1.values.length)
    }
  })
})
