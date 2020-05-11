import { CommandOptions } from './types'

export function stringify(values: any) {
  if (typeof values === 'string') {
    return values
  }

  return JSON.stringify(values, function (this: any, key: string, value: any) {
    if (this[key] instanceof Date) {
      return this[key].getTime() / 1000
    }
    return value
  })
}

export function flattenOptions(flattened: CommandOptions, options: CommandOptions, prefix = '') {
  for (const key of Object.keys(options)) {
    const val = options[key]
    if (typeof val === 'object') {
      if (key === 'values') {
        flattened[`${prefix}${key}`] = stringify(val)
      } else {
        for (const label of Object.keys(val)) {
          const subopts = val[label]
          flattenOptions(flattened, subopts, `${prefix}${key}[${label}].`)
        }
      }
    } else {
      let k = key
      if (key === 'window_sort_keys') {
        k = 'window.sort_keys'
      } else if (key === 'window_group_keys') {
        k = 'window.group_keys'
      }
      flattened[`${prefix}${k}`] = val
    }
  }
  return flattened
}
