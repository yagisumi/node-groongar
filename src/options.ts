import { types, CommandOptions } from './types'

export type OptionsMap = { [key in keyof types.CommandMap]?: Partial<types.CommandMap[key]['opts']> }

type Options = {
  defaultOptions: OptionsMap
  restrictionAll: CommandOptions
  restrictions: OptionsMap
}

export function createOptions(): Options {
  return {
    defaultOptions: {
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

    restrictionAll: {
      output_type: 'json',
    },

    restrictions: {
      load: {
        input_type: 'json',
      },
      logical_select: {
        command_version: 2,
      },
      logical_range_filter: {
        command_version: 2,
      },
    },
  }
}
