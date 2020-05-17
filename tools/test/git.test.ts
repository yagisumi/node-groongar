import { formatTime } from '@/git'

describe('git', () => {
  test('formatTime', () => {
    const now = Math.floor(Date.now() / 1000) * 1000
    const str = formatTime(now)
    expect(Date.parse(str)).toBe(now)
  })
})
