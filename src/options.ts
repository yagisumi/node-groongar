import { types, CommandOptions } from './types'

export type OptionsMap = {
  [key in keyof types.CommandMap]?: Partial<types.CommandMap[key]['opts']>
}

type Options = {
  defaultOptionBase: CommandOptions
  defaultOptionMap: OptionsMap
  overwriteOptionBase: CommandOptions
  overwriteOptionMap: OptionsMap
}

export function createOptions(): Options {
  return {
    defaultOptionBase: {
      command_version: 1,
    },
    defaultOptionMap: {
      select: {
        command_version: 3,
      },
      load: {
        command_version: 3,
      },
      range_filter: {
        command_version: 3,
      },
    },

    overwriteOptionBase: {
      output_type: 'json',
    },

    overwriteOptionMap: {
      dump: {},
      load: {
        input_type: 'json',
        output_type: 'json',
      },
      logical_select: {
        command_version: 2,
        output_type: 'json',
      },
      logical_range_filter: {
        command_version: 2,
        output_type: 'json',
      },
    },
  }
}
