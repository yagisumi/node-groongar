import { stringify, flattenOptions } from '@/command_utils'
import { types, CommandOptions } from '@/types'

describe('command_utils', () => {
  test('stringify', () => {
    const str = 'test'
    expect(stringify(str)).toBe(str)

    const now = new Date()
    const values = [{ a: 1, b: 'B', c: true, d: now, e: null }]

    const json = stringify(values)
    const obj = JSON.parse(json)

    expect(Array.isArray(obj)).toBe(true)
    expect(obj[0].a).toBe(values[0].a)
    expect(obj[0].b).toBe(values[0].b)
    expect(obj[0].c).toBe(values[0].c)
    expect(obj[0].d).toBeCloseTo(now.getTime() / 1000)
    expect(obj[0].e).toBe(values[0].e)
  })

  test('flattenOptions', () => {
    const flatten1: CommandOptions = {}
    const options1: types.opts<'select'> = {
      query: 'content:@is',
      slices: {
        fast: {
          query: 'content:@fast',
          sort_keys: '-_id',
          columns: {
            highlighted_content: {
              stage: 'output',
              type: 'Text',
              flags: 'COLUMN_SCALAR',
              value: 'highlight_html(content)',
            },
          },
          output_columns: '_id,highlighted_content',
        },
      },
      table: 'Memos',
    }

    const expected1 = {
      query: 'content:@is',
      'slices[fast].query': 'content:@fast',
      'slices[fast].sort_keys': '-_id',
      'slices[fast].columns[highlighted_content].stage': 'output',
      'slices[fast].columns[highlighted_content].type': 'Text',
      'slices[fast].columns[highlighted_content].flags': 'COLUMN_SCALAR',
      'slices[fast].columns[highlighted_content].value': 'highlight_html(content)',
      'slices[fast].output_columns': '_id,highlighted_content',
      table: 'Memos',
    }

    flattenOptions(flatten1, options1)
    expect(flatten1).toEqual(expected1)

    const flatten2: CommandOptions = {}
    const options2: types.opts<'select'> = {
      table: 'Table',
      columns: {
        name1: {
          stage: 'initial',
          type: 'UInt32',
          value: 29,
        },
        name2: {
          stage: 'filtered',
          type: 'Float',
          value: '_score * 0.1',
          flags: 'COLUMN_SCALAR',
          window_sort_keys: 'test1',
          window_group_keys: 'test2',
        },
      },
    }

    const expected2: CommandOptions = {
      table: 'Table',
      'columns[name1].stage': 'initial',
      'columns[name1].type': 'UInt32',
      'columns[name1].value': 29,
      'columns[name2].stage': 'filtered',
      'columns[name2].type': 'Float',
      'columns[name2].value': '_score * 0.1',
      'columns[name2].flags': 'COLUMN_SCALAR',
      'columns[name2].window.sort_keys': 'test1',
      'columns[name2].window.group_keys': 'test2',
    }

    flattenOptions(flatten2, options2)
    expect(flatten2).toEqual(expected2)

    const flatten3: CommandOptions = {}
    const options3: types.opts<'select'> = {
      table: 'Table',
      drilldowns: {
        label1: {
          keys: 'column1',
          sort_keys: '-_nsubrecs',
          columns: {
            name: {
              stage: 'initial',
              type: 'UInt32',
              value: 29,
            },
          },
        },
        label2: {
          keys: 'column2',
          sort_keys: '_key',
          output_columns: '_key, _nsubrecs',
          offset: 0,
          limit: 10,
          calc_types: 'MIN,MAX',
          calc_target: 'test1',
          filter: 'test2',
        },
      },
    }

    const expected3: CommandOptions = {
      table: 'Table',
      'drilldowns[label1].keys': 'column1',
      'drilldowns[label1].sort_keys': '-_nsubrecs',
      'drilldowns[label1].columns[name].stage': 'initial',
      'drilldowns[label1].columns[name].type': 'UInt32',
      'drilldowns[label1].columns[name].value': 29,
      'drilldowns[label2].keys': 'column2',
      'drilldowns[label2].sort_keys': '_key',
      'drilldowns[label2].output_columns': '_key, _nsubrecs',
      'drilldowns[label2].offset': 0,
      'drilldowns[label2].limit': 10,
      'drilldowns[label2].calc_types': 'MIN,MAX',
      'drilldowns[label2].calc_target': 'test1',
      'drilldowns[label2].filter': 'test2',
    }

    flattenOptions(flatten3, options3)
    expect(flatten3).toEqual(expected3)
  })
})
