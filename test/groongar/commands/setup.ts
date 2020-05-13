import { Groongar } from '@/groongar'
import { OK, Result } from '@/result'
import { types } from '@/types'

export const info1 = {
  table: 'NES',
  table_terms: 'Terms',
  column1: 'year',
  column2: 'publisher',
  values: [
    { _key: 'Dragon Quest', year: 1986, publisher: 'ENIX' },
    { _key: 'Dragon Quest 2', year: 1987, publisher: 'ENIX' },
    { _key: 'Dragon Quest 3', year: 1988, publisher: 'ENIX' },
    { _key: 'Dragon Quest 4', year: 1990, publisher: 'ENIX' },
    { _key: 'Dragon Buster', year: 1987, publisher: 'namco' },
    { _key: 'Dragon Ninja', year: 1989, publisher: 'namco' },
    { _key: 'Dragon Wars', year: 1991, publisher: 'kemco' },
    { _key: 'Pinball Quest', year: 1989, publisher: 'JALECO' },
  ],
}

export async function setup1(groongar: Groongar, load_values = false): Promise<Result<typeof info1>> {
  const r1 = await groongar.tableCreate({
    name: info1.table,
    flags: 'TABLE_HASH_KEY',
    key_type: 'ShortText',
  })
  if (r1.error) {
    return r1
  }

  const r2 = await groongar.columnCreate({
    table: info1.table,
    name: info1.column1,
    flags: 'COLUMN_SCALAR',
    type: 'Int32',
  })
  if (r2.error) {
    return r2
  }

  const r3 = await groongar.columnCreate({
    table: info1.table,
    name: info1.column2,
    flags: 'COLUMN_SCALAR',
    type: 'ShortText',
  })
  if (r3.error) {
    return r3
  }

  const r4 = await groongar.tableCreate({
    name: info1.table_terms,
    flags: 'TABLE_PAT_KEY|KEY_NORMALIZE',
    key_type: 'ShortText',
    default_tokenizer: 'TokenBigram',
    normalizer: 'NormalizerAuto',
  })
  if (r4.error) {
    return r4
  }

  const r5 = await groongar.columnCreate({
    table: info1.table_terms,
    name: 'NES_title',
    flags: 'COLUMN_INDEX|WITH_POSITION',
    type: 'NES',
    source: '_key',
  })
  if (r5.error) {
    return r5
  }

  if (load_values) {
    const r6 = await groongar.load({
      table: info1.table,
      values: info1.values,
    })
    if (r6.error) {
      return r6
    }
  }

  return OK(info1)
}

export async function setup2(groongar: Groongar): Promise<Result<boolean>> {
  const r1 = await groongar.tableCreate({
    name: 'TermExpansions',
    flags: 'TABLE_NO_KEY',
  })
  if (r1.error) {
    return r1
  }

  const r2 = await groongar.columnCreate({
    table: 'TermExpansions',
    name: 'term',
    flags: 'COLUMN_SCALAR',
    type: 'ShortText',
  })
  if (r2.error) {
    return r2
  }

  const r3 = await groongar.columnCreate({
    table: 'TermExpansions',
    name: 'expansion',
    flags: 'COLUMN_SCALAR',
    type: 'ShortText',
  })
  if (r3.error) {
    return r3
  }

  const values4 = [
    {
      term: 'PGroonga',
      expansion: 'PGroonga',
    },
    {
      term: 'PGroonga',
      expansion: 'Groonga PostgreSQL',
    },
    {
      term: 'Rroonga',
      expansion: 'Rroonga',
    },
    {
      term: 'Rroonga',
      expansion: 'Ruby Groonga',
    },
  ]

  const r4 = await groongar.load({
    table: 'TermExpansions',
    values: values4,
  })
  if (r4.error) {
    return r4
  }

  return OK(true)
}

export async function setup3(groongar: Groongar): Promise<Result<boolean>> {
  const r1 = await setup1(groongar)
  if (r1.error) {
    return r1
  }

  const r2 = await groongar.tableCreate({
    name: 'Years',
    flags: 'TABLE_PAT_KEY',
    key_type: 'Int32',
  })
  if (r2.error) {
    return r2
  }

  const r3 = await groongar.columnCreate({
    table: 'Years',
    name: 'nes_year',
    flags: 'COLUMN_INDEX',
    type: 'NES',
    source: 'year',
  })
  if (r3.error) {
    return r3
  }

  const r4 = await groongar.load({
    table: info1.table,
    values: info1.values,
  })
  if (r4.error) {
    return r4
  }

  return OK(true)
}

export async function setup4(groongar: Groongar): Promise<Result<boolean>> {
  await groongar.suggestCreateDataset('query')

  const values1 = [
    {
      _key: 'query',
      weight: 10,
    },
  ]

  const r1 = await groongar.load({
    table: 'configuration',
    values: values1,
  })
  if (r1.error) {
    return r1
  }

  const values2 = [
    {
      sequence: '1',
      time: 1312950803.86057,
      item: 'engine engine engine',
      type: 'submit',
    },
  ]

  const r2 = await groongar.load({
    table: 'event_query',
    each: 'suggest_preparer(_id, type, item, sequence, time, pair_query)',
    values: values2,
  })
  if (r2.error) {
    return r2
  }

  return OK(true)
}

export function buildRecords(result: types.ResultRecordsV3) {
  const reduced: Array<{ [key: string]: any }> = []
  if (typeof result === 'object' && Array.isArray(result.columns) && Array.isArray(result.records)) {
    result.records.forEach((record) => {
      const obj: { [key: string]: any } = {}
      for (let i = 0; i < Math.min(record.length, result.columns.length); i++) {
        const key = result.columns[i].name
        obj[key] = record[i]
      }
      reduced.push(obj)
    })
    return reduced
  } else {
    throw new TypeError('invalid argument')
  }
}
