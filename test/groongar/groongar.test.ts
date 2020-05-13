import { Groongar } from '@/groongar'
import { types } from '@/types'

describe('Groongar', () => {
  test('example', () => {})

  test('mergeOptions', () => {
    const g = new Groongar({} as any)

    const opts1: types.opts<'logical_select'> = {
      shard_key: 'x',
      logical_table: 'table',
      command_version: 3,
    }

    const merged1 = g['mergeOptions']('logical_select', opts1)
    expect(merged1.command_version).toBe(2)
  })
})
