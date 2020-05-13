import { wrapError, OK, ERR } from '@/result'

describe('result', () => {
  test('wrapError', () => {
    const e = new Error('test1')
    expect(wrapError(e)).toBe(e)

    const msg = 'test2'
    const e2 = wrapError(msg)
    expect(e2.message).toBe(msg)

    const obj = {
      name: 'Test3',
      message: 'test3',
    }
    const e3 = wrapError(obj)
    expect(e3.name).toBe(obj.name)
    expect(e3.message).toBe(obj.message)

    const e4 = wrapError(null)
    expect(e4).toBeInstanceOf(Error)
  })

  test('OK', () => {
    const v1 = 'test1'
    const r1 = OK(v1)
    expect(r1.ok).toBe(true)
    expect(r1.error).toBeUndefined()
    expect(r1.value).toBe(v1)
  })

  test('ERR', () => {
    const msg = 'test1'
    const r1 = ERR(msg)
    expect(r1.ok).toBe(false)
    expect(r1.error).toBeInstanceOf(Error)
    expect(r1.error.message).toBe(msg)
    expect(r1.value).toBeUndefined()
  })
})
