import { getErrorMessage, CommandConverter } from '@/command_converter'
import { Response } from '@/grntest_parser'
import { parseCommand } from '@yagisumi/groonga-command'
import { Command } from '@/grntest_parser'

describe('command_converter', () => {
  describe('getErrorMessage', () => {
    test('response1', () => {
      const res1: Response = [[[-22, 0, 0], '[column][create] nonexistent source: <nonexistent>'], false]
      const msg1 = getErrorMessage(res1)
      expect(typeof msg1).toBe('string')
      expect(msg1).toBe(res1[0][1])

      const res2: Response = [[0, 0, 0], true]
      const msg2 = getErrorMessage(res2)
      expect(msg2).toBeUndefined()
    })

    test('response3', () => {
      const res1: Response = {
        header: {
          return_code: -22,
          start_time: 0.0,
          elapsed_time: 0.0,
          error: {
            message: '[table][load][Users] neither _key nor _id is assigned',
            function: 'grn_loader_on_no_identifier_error',
            file: 'load.c',
            line: 0,
          },
        },
        body: {
          n_loaded_records: 2,
          loaded_ids: [1, 0, 2],
        },
      }
      const msg1 = getErrorMessage(res1)
      expect(typeof msg1).toBe('string')
      expect(msg1).toBe(res1.header.error?.message)

      const res2: Response = {
        header: { return_code: 0, start_time: 0, elapsed_time: 0 },
        body: { n_loaded_records: 2 },
      }
      const msg2 = getErrorMessage(res2)
      expect(msg2).toBeUndefined()
    })
  })

  describe('CommandConverter', () => {
    test('parseArguments/drilldowns/1', () => {
      const string = `select Items \\
        --drilldown[label].keys price \\
        --drilldown[label].output_columns _key,_nsubrecs,tax_included \\
        --drilldown[label].column[tax_included.x].stage initial \\
        --drilldown[label].column[tax_included.x].type UInt32 \\
        --drilldown[label].column[tax_included.x].flags COLUMN_SCALAR \\
        --drilldown[label].column[tax_included.x].value '_key * 1.08'`
      const command = parseCommand(string)

      if (command) {
        const cmd: Command = {
          type: 'command',
          command,
          count: 1,
          string,
        }
        const converter = new CommandConverter(cmd, 'test')

        const expected = {
          drilldowns: {
            label: {
              keys: 'price',
              output_columns: '_key,_nsubrecs,tax_included',
              columns: {
                'tax_included.x': {
                  stage: 'initial',
                  type: 'UInt32',
                  flags: 'COLUMN_SCALAR',
                  value: '_key * 1.08',
                },
              },
            },
          },
          table: 'Items',
        }
        const args1 = converter['parseArguments']({}, command.arguments, command.command_name)
        expect(args1).toEqual(expected)
      }
    })

    test('parseArguments/drilldowns/2', () => {
      const string = `select Logs \\
        --columns[a].flags "COLUMN_SCALAR" \\
        --columns[a].stage "initial" \\
        --columns[a].type "UInt32" \\
        --columns[a].value "window_record_number()" \\
        --columns[a].window.sort_keys "b" \\
        --columns[b].flags "COLUMN_SCALAR" \\
        --columns[b].stage "initial" \\
        --columns[b].type "UInt32" \\
        --columns[b].value "window_record_number()" \\
        --columns[b].window.group_keys "a"`

      const command = parseCommand(string)

      if (command) {
        const cmd: Command = {
          type: 'command',
          command,
          count: 1,
          string,
        }
        const converter = new CommandConverter(cmd, 'test')
        const expected = {
          columns: {
            a: {
              flags: 'COLUMN_SCALAR',
              stage: 'initial',
              type: 'UInt32',
              value: 'window_record_number()',
              window_sort_keys: 'b',
            },
            b: {
              flags: 'COLUMN_SCALAR',
              stage: 'initial',
              type: 'UInt32',
              value: 'window_record_number()',
              window_group_keys: 'a',
            },
          },
          table: 'Logs',
        }
        const args1 = converter['parseArguments']({}, command.arguments, command.command_name)
        expect(args1).toEqual(expected)
      }
    })

    test('parseArguments/drilldowns/3', () => {
      const string = `select Items \\
        --drilldown[label].keys price \\
        --drilldown[label].output_columns _key,_nsubrecs,tax_included \\
        --drilldown[label].columns[tax_included].stage initial \\
        --drilldown[label].columns[tax_included].type UInt32 \\
        --drilldown[label].columns[tax_included].flags COLUMN_SCALAR \\
        --drilldown[label].columns[tax_included].value '_key * 1.08'`

      const command = parseCommand(string)

      if (command) {
        const cmd: Command = {
          type: 'command',
          command,
          count: 1,
          string,
        }
        const converter = new CommandConverter(cmd, 'test')
        const expected = {
          drilldowns: {
            label: {
              keys: 'price',
              output_columns: '_key,_nsubrecs,tax_included',
              columns: {
                tax_included: {
                  stage: 'initial',
                  type: 'UInt32',
                  flags: 'COLUMN_SCALAR',
                  value: '_key * 1.08',
                },
              },
            },
          },
          table: 'Items',
        }
        const args1 = converter['parseArguments']({}, command.arguments, command.command_name)
        expect(args1).toEqual(expected)
      }
    })

    test('parseArguments/load-values/1', () => {
      const values = [
        { _key: 'http://groonga.org/', title: 'Groonga' },
        { _key: 'http://mroonga.org/', title: 'Mroonga' },
      ]
      const string = `load --table Bookmarks --values '${JSON.stringify(values)}'`
      const command = parseCommand(string)
      if (command) {
        const cmd: Command = {
          type: 'command',
          command,
          count: 1,
          string,
        }
        const converter = new CommandConverter(cmd, 'test')
        const expected = {
          table: 'Bookmarks',
          values: [
            { _key: 'http://groonga.org/', title: 'Groonga' },
            { _key: 'http://mroonga.org/', title: 'Mroonga' },
          ],
        }
        const args1 = converter['parseArguments']({}, command.arguments, command.command_name)
        expect(args1).toEqual(expected)
      }
    })

    test('parseArguments/load-values/2', () => {
      const values = [
        ['_key', 'title'],
        ['http://groonga.org/', 'Groonga'],
        ['http://mroonga.org/', 'Mroonga'],
      ]
      const string = `load --table Bookmarks --values '${JSON.stringify(values)}'`
      const command = parseCommand(string)
      if (command) {
        const cmd: Command = {
          type: 'command',
          command,
          count: 1,
          string,
        }
        const converter = new CommandConverter(cmd, 'test')
        const expected = {
          table: 'Bookmarks',
          values: [
            ['_key', 'title'],
            ['http://groonga.org/', 'Groonga'],
            ['http://mroonga.org/', 'Mroonga'],
          ],
        }
        const args1 = converter['parseArguments']({}, command.arguments, command.command_name)
        expect(args1).toEqual(expected)
      }
    })

    test('parseArguments/value-number/1', () => {
      const string = 'select Entries --offset -1 --limit 1 --test -1.23'
      const command = parseCommand(string)

      if (command) {
        const cmd: Command = {
          type: 'command',
          command,
          count: 1,
          string,
        }
        const converter = new CommandConverter(cmd, 'test')
        const expected = { offset: -1, limit: 1, test: -1.23, table: 'Entries' }
        const args1 = converter['parseArguments']({}, command.arguments, command.command_name)
        expect(args1).toEqual(expected)
      }
    })

    test('parseArguments/fixKey/1', () => {
      const string = `table_create Terms TABLE_PAT_KEY ShortText --normalize NormalizerAuto --default_normalizer NormalizerAuto`
      const command = parseCommand(string)

      if (command) {
        const cmd: Command = {
          type: 'command',
          command,
          count: 1,
          string,
        }
        const converter = new CommandConverter(cmd, 'test')
        converter.report = {}
        converter['parseArguments']({}, command.arguments, command.command_name)
        expect(converter.report).toEqual({ fixed_keys: { test: { normalize: 1, default_normalizer: 1 } } })
      }
    })

    test('argsToLines/load-values/1', () => {
      const values = [
        { _key: 'http://groonga.org/', title: 'Groonga' },
        { _key: 'http://mroonga.org/', title: 'Mroonga' },
      ]
      const string = `load --table Bookmarks --values '${JSON.stringify(values)}'`
      const command = parseCommand(string)
      if (command) {
        const cmd: Command = {
          type: 'command',
          command,
          count: 1,
          string,
        }
        const converter = new CommandConverter(cmd, 'test')
        const args1 = converter['parseArguments']({}, command.arguments, command.command_name)
        const lines = converter['argsToLines'](cmd, args1)
        const expected = ['{', '  table: "Bookmarks",', '  values: values1,', '}']
        expect(lines).toEqual(expected)
      }
    })

    test('argsToLines/load-values/2', () => {
      const values = [
        { _key: 'http://groonga.org/', title: 'Groonga' },
        { _key: 'http://mroonga.org/', title: 'Mroonga' },
      ]
      const string = `load --table Bookmarks --values '${JSON.stringify(values)}'`
      const command = parseCommand(string)
      if (command) {
        const cmd: Command = {
          type: 'command',
          command,
          count: -2,
          string,
        }
        const converter = new CommandConverter(cmd, 'test')
        const expected = [
          '{', //
          '  table: "Bookmarks",',
          '  values: values_t2,',
          '}',
        ]
        const args1 = converter['parseArguments']({}, command.arguments, command.command_name)
        const lines = converter['argsToLines'](cmd, args1)
        expect(lines).toEqual(expected)
      }
    })

    test('argsToLines/object-value/1', () => {
      const string = `select Items \\
        --drilldown[label].keys price \\
        --drilldown[label].output_columns _key,_nsubrecs,tax_included \\
        --drilldown[label].columns[tax_included].stage initial \\
        --drilldown[label].columns[tax_included].type UInt32 \\
        --drilldown[label].columns[tax_included].flags COLUMN_SCALAR \\
        --drilldown[label].columns[tax_included].value '_key * 1.08'`

      const command = parseCommand(string)

      if (command) {
        const cmd: Command = {
          type: 'command',
          command,
          count: 1,
          string,
        }
        const converter = new CommandConverter(cmd, 'test')
        const expected = [
          '{',
          '  drilldowns: {',
          '    label: {',
          '      keys: "price",',
          '      output_columns: "_key,_nsubrecs,tax_included",',
          '      columns: {',
          '        tax_included: {',
          '          stage: "initial",',
          '          type: "UInt32",',
          '          flags: "COLUMN_SCALAR",',
          '          value: "_key * 1.08",',
          '        },',
          '      },',
          '    },',
          '  },',
          '  table: "Items",',
          '}',
        ]
        const args1 = converter['parseArguments']({}, command.arguments, command.command_name)
        const lines = converter['argsToLines'](cmd, args1)
        expect(lines).toEqual(expected)
      }
    })

    test('argsToLines/value-number/1', () => {
      const string = 'select Entries --offset -1 --limit 1 --test -1.23'
      const command = parseCommand(string)

      if (command) {
        const cmd: Command = {
          type: 'command',
          command,
          count: 1,
          string,
        }
        const converter = new CommandConverter(cmd, 'test')
        const expected = [
          '{', //
          '  offset: -1,',
          '  limit: 1,',
          '  test: -1.23,',
          '  table: "Entries",',
          '}',
        ]
        const args1 = converter['parseArguments']({}, command.arguments, command.command_name)
        const lines = converter['argsToLines'](cmd, args1)
        expect(lines).toEqual(expected)
      }
    })

    test('valLines', () => {
      const command = parseCommand('dump')
      expect(command).not.toBeUndefined()
      if (command) {
        const cmd: Command = {
          type: 'command',
          command,
          count: 1,
          string: '',
        }
        const converter = new CommandConverter(cmd, 'test')

        {
          const value = -3
          const lines = converter['valLines'](value, 1)
          const expected = ['-3']
          expect(lines).toEqual(expected)
        }

        {
          const value = 'test'
          const lines = converter['valLines'](value, 1)
          const expected = ['"test"']
          expect(lines).toEqual(expected)
        }

        {
          const value = [100, 'test', { a: 2, b: 4 }]
          const lines = converter['valLines'](value, 1)
          const expected = [
            '[', //
            '    100,',
            '    "test",',
            '    {',
            '      a: 2,',
            '      b: 4,',
            '    },',
            '  ]',
          ]
          expect(lines).toEqual(expected)
        }

        {
          const value = { a: 2, b: 4 }
          const lines = converter['valLines'](value, 1)
          const expected = [
            '{', //
            '    a: 2,',
            '    b: 4,',
            '  }',
          ]
          expect(lines).toEqual(expected)
        }
      }
    })
  })
})
