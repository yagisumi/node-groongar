import { method_name, comment } from '@/generate_groongar'

describe('generate_groongar', () => {
  test('method_name', () => {
    expect(method_name('select')).toBe('select')
    expect(method_name('table_list')).toBe('tableList')
    expect(method_name('logical_shard_list')).toBe('logicalShardList')
  })

  test('comment', () => {
    const desc = 'foo bar'
    expect(comment(desc)).toBe(['/**', ' * foo bar', ' */'].join('\n'))
  })
})
