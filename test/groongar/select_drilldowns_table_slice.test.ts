import path from 'path'
import { createGroongar } from '@/groongar'

const db_dir = path.join(__dirname, 'db_drilldowns')
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

  test('drilldowns', async () => {
    env = await setup({
      db_path: path.join(db_dir, 'drilldowns.db'),
    })
    const groongar = createGroongar(env.client)

    const r1 = await groongar.tableCreate({
      name: 'Tags',
      flags: 'TABLE_PAT_KEY',
      key_type: 'ShortText',
    })
    expect(r1.ok).toBe(true)
    expect(r1.error).toBeUndefined()
    if (r1.ok) {
      expect(r1.value).toBe(true)
    }

    const r2 = await groongar.tableCreate({
      name: 'Memos',
      flags: 'TABLE_HASH_KEY',
      key_type: 'ShortText',
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    if (r2.ok) {
      expect(r2.value).toBe(true)
    }

    const r3 = await groongar.columnCreate({
      table: 'Memos',
      name: 'date',
      flags: 'COLUMN_SCALAR',
      type: 'Time',
    })
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    if (r3.ok) {
      expect(r3.value).toBe(true)
    }

    const r4 = await groongar.columnCreate({
      table: 'Memos',
      name: 'tag',
      flags: 'COLUMN_SCALAR',
      type: 'Tags',
    })
    expect(r4.ok).toBe(true)
    expect(r4.error).toBeUndefined()
    if (r4.ok) {
      expect(r4.value).toBe(true)
    }

    const r5 = await groongar.columnCreate({
      table: 'Tags',
      name: 'memos_tag',
      flags: 'COLUMN_INDEX',
      type: 'Memos',
      source: 'tag',
    })
    expect(r5.ok).toBe(true)
    expect(r5.error).toBeUndefined()
    if (r5.ok) {
      expect(r5.value).toBe(true)
    }

    const values6 = [
      {
        _key: 'Groonga is fast!',
        date: '2016-05-19 12:00:00',
        tag: 'Groonga',
      },
      {
        _key: 'Mroonga is fast!',
        date: '2016-05-19 12:00:01',
        tag: 'Mroonga',
      },
      {
        _key: 'Groonga sticker!',
        date: '2016-05-19 12:00:02',
        tag: 'Groonga',
      },
      {
        _key: 'Groonga site!',
        date: '2016-05-19 12:00:02',
        tag: 'Groonga',
      },
      {
        _key: 'Rroonga is fast!',
        date: '2016-05-19 12:00:03',
        tag: 'Rroonga',
      },
    ]

    const r6 = await groongar.load({
      table: 'Memos',
      values: values6,
    })
    expect(r6.ok).toBe(true)
    expect(r6.error).toBeUndefined()
    if (r6.ok) {
      expect(r6.value.n_loaded_records).toBe(5)
    }

    const r7 = await groongar.select({
      command_version: 1,
      filter: 'date < "2016-05-19 13:00:02"',
      slices: {
        groonga: {
          filter: 'tag @ "Groonga"',
          sort_keys: '_id',
          output_columns: '_key, date, tag',
        },
      },
      drilldowns: {
        tags: {
          table: 'groonga',
          keys: 'date',
        },
      },
      table: 'Memos',
    })
    expect(r7.ok).toBe(true)
    expect(r7.error).toBeUndefined()
    if (r7.ok) {
      const tz_offset = new Date().getTimezoneOffset() * 60
      expect(r7.value).toEqual([
        [
          [5],
          [
            ['_id', 'UInt32'],
            ['_key', 'ShortText'],
            ['date', 'Time'],
            ['tag', 'Tags'],
          ],
          [1, 'Groonga is fast!', 1463626800.0 + 32400 + tz_offset, 'Groonga'],
          [2, 'Mroonga is fast!', 1463626801.0 + 32400 + tz_offset, 'Mroonga'],
          [3, 'Groonga sticker!', 1463626802.0 + 32400 + tz_offset, 'Groonga'],
          [4, 'Groonga site!', 1463626802.0 + 32400 + tz_offset, 'Groonga'],
          [5, 'Rroonga is fast!', 1463626803.0 + 32400 + tz_offset, 'Rroonga'],
        ],
        {
          groonga: [
            [3],
            [
              ['_key', 'ShortText'],
              ['date', 'Time'],
              ['tag', 'Tags'],
            ],
            ['Groonga is fast!', 1463626800.0 + 32400 + tz_offset, 'Groonga'],
            ['Groonga sticker!', 1463626802.0 + 32400 + tz_offset, 'Groonga'],
            ['Groonga site!', 1463626802.0 + 32400 + tz_offset, 'Groonga'],
          ],
        },
        {
          tags: [
            [2],
            [
              ['_key', 'Time'],
              ['_nsubrecs', 'Int32'],
            ],
            [1463626800.0 + 32400 + tz_offset, 1],
            [1463626802.0 + 32400 + tz_offset, 2],
          ],
        },
      ])
    }
  })
})
