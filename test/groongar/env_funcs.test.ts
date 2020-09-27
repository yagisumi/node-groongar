describe('env_funcs', () => {
  test('fixObjectInspect', () => {
    const expected = {
      type: {
        id: 55,
        name: 'db',
      },
      name_table: {
        id: 0,
        name: '',
        type: {
          id: 50,
          name: 'table:dat_key',
        },
        key: {
          type: null,
        },
        value: null,
        n_records: 255,
        disk_usage: 0,
      },
      disk_usage: 0,
    }

    const res = {
      type: {
        id: 55,
        name: 'db',
      },
      name_table: {
        id: 0,
        name: '',
        type: {
          id: 50,
          name: 'table:dat_key',
        },
        key: {
          type: null,
        },
        value: null,
        n_records: 255,
        disk_usage: 100,
      },
      disk_usage: 100,
    }

    expect(fixObjectInspect(res)).toEqual(expected)
  })

  test('fixDBPath/1', () => {
    const expected = ['db/db.0000101']
    const res = [
      'G:\\data\\workspace\\script\\node\\groonga\\groongar\\test\\grntest\\suite\\column_list\\compress\\tmp.lz4\\tmp.lz4.db.0000101',
    ]
    const db_path =
      'G:\\data\\workspace\\script\\node\\groonga\\groongar\\test\\grntest\\suite\\column_list\\compress\\tmp.lz4\\tmp.lz4.db'

    expect(fixDBPath(res, db_path)).toEqual(expected)
  })

  test('fixDBPath/table_list', () => {
    const expected = [
      [
        ['id', 'UInt32'],
        ['name', 'ShortText'],
        ['path', 'ShortText'],
        ['flags', 'ShortText'],
        ['domain', 'ShortText'],
        ['range', 'ShortText'],
        ['default_tokenizer', 'ShortText'],
        ['normalizer', 'ShortText'],
      ],
      [256, 'bookmarks', 'db/db.0000100', 'TABLE_PAT_KEY|PERSISTENT', 'ShortText', 'Object', null, null],
    ]

    const res = [
      [
        ['id', 'UInt32'],
        ['name', 'ShortText'],
        ['path', 'ShortText'],
        ['flags', 'ShortText'],
        ['domain', 'ShortText'],
        ['range', 'ShortText'],
        ['default_tokenizer', 'ShortText'],
        ['normalizer', 'ShortText'],
      ],
      [256, 'bookmarks', '/a/b/c.db.0000100', 'TABLE_PAT_KEY|PERSISTENT', 'ShortText', 'Object', null, null],
    ]

    expect(fixDBPath(res, '/a/b/c.db')).toEqual(expected)
  })

  test('generateSeries', async () => {
    const expected = [{ val: 0 }, { val: 1 }, { val: 2 }, { val: 3 }]
    await generateSeries(
      0,
      4,
      (i) => {
        return { val: i }
      },
      async (vals) => {
        expect(vals).toEqual(expected)
      }
    )
  })
})
