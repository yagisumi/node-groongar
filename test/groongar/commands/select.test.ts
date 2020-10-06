import path from 'path'
import { createGroongar } from '@/groongar'
import { setup1, info1, buildRecords } from './setup'

const db_dir = path.join(__dirname, 'tmp.select')
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

  test('select', async () => {
    rimraf(db_dir)
    mkdir(db_dir)
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.select.db'),
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

    const r2 = await groongar.select({
      table: info1.table,
      filter: '_key == "Dragon Quest"',
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    if (r2.ok) {
      expect(r2.value.n_hits).toBe(1)
      const records = buildRecords(r2.value)
      expect(records[0]._key).toBe('Dragon Quest')
      expect(records[0].year).toBe(1986)
      expect(records[0].publisher).toBe('ENIX')
    }

    const r3 = await groongar.load({
      table: info1.table,
      values: [{ _key: 'Dragon Quest', publisher: 'SQUARE ENIX' }],
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()

    const r4 = await groongar.select({
      table: info1.table,
      filter: '_key == "Dragon Quest"',
    })
    expect(r4.ok).toBe(true)
    expect(r4.error).toBeUndefined()
    if (r4.ok) {
      expect(r4.value.n_hits).toBe(1)
      const records = buildRecords(r4.value)
      expect(records[0]._key).toBe('Dragon Quest')
      expect(records[0].year).toBe(1986)
      expect(records[0].publisher).toBe('SQUARE ENIX')
    }

    const r5 = await groongar.select({
      table: info1.table,
      filter: '_key == "Dragon Quest"',
      command_version: 1,
    })
    expect(r5.ok).toBe(true)
    expect(r5.error).toBeUndefined()
    if (r5.ok) {
      expect(r5.value[0][0][0]).toBe(1)
      expect(r5.value[0][2].includes('Dragon Quest')).toBe(true)
      expect(r5.value[0][2].includes('SQUARE ENIX')).toBe(true)
    }
  })
})
