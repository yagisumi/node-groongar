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
