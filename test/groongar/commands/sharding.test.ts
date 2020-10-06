import path from 'path'
import { createGroongar, Groongar } from '@/groongar'
import { OK, Result } from '@/result'

const db_dir = path.join(__dirname, 'tmp.sharding')
let env: TestEnv | undefined

async function setup_sharding(groongar: Groongar): Promise<Result<true>> {
  const VALUES1 = [
    {
      _key: 'The first post!',
      created_at: '2015/07/08 00:00:00',
      content: 'Welcome! This is my first post!',
      n_likes: 5,
      tag: 'Hello',
    },
    {
      _key: 'Groonga',
      created_at: '2015/07/08 01:00:00',
      content: "I started to use Groonga. It's very fast!",
      n_likes: 10,
      tag: 'Groonga',
    },
    {
      _key: 'Mroonga',
      created_at: '2015/07/08 02:00:00',
      content: "I also started to use Mroonga. It's also very fast! Really fast!",
      n_likes: 15,
      tag: 'Groonga',
    },
  ]

  const VALUES2 = [
    {
      _key: 'Good-bye Senna',
      created_at: '2015/07/09 00:00:00',
      content: 'I migrated all Senna system!',
      n_likes: 3,
      tag: 'Senna',
    },
    {
      _key: 'Good-bye Tritonn',
      created_at: '2015/07/09 01:00:00',
      content: 'I also migrated all Tritonn system!',
      n_likes: 3,
      tag: 'Senna',
    },
  ]

  {
    const r = await groongar.pluginRegister({
      name: 'sharding',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.tableCreate({
      name: 'Entries_20150708',
      flags: 'TABLE_HASH_KEY',
      key_type: 'ShortText',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.columnCreate({
      table: 'Entries_20150708',
      name: 'created_at',
      flags: 'COLUMN_SCALAR',
      type: 'Time',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.columnCreate({
      table: 'Entries_20150708',
      name: 'content',
      flags: 'COLUMN_SCALAR',
      type: 'Text',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.columnCreate({
      table: 'Entries_20150708',
      name: 'n_likes',
      flags: 'COLUMN_SCALAR',
      type: 'UInt32',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.columnCreate({
      table: 'Entries_20150708',
      name: 'tag',
      flags: 'COLUMN_SCALAR',
      type: 'ShortText',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.tableCreate({
      name: 'Entries_20150709',
      flags: 'TABLE_HASH_KEY',
      key_type: 'ShortText',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.columnCreate({
      table: 'Entries_20150709',
      name: 'created_at',
      flags: 'COLUMN_SCALAR',
      type: 'Time',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.columnCreate({
      table: 'Entries_20150709',
      name: 'content',
      flags: 'COLUMN_SCALAR',
      type: 'Text',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.columnCreate({
      table: 'Entries_20150709',
      name: 'n_likes',
      flags: 'COLUMN_SCALAR',
      type: 'UInt32',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.columnCreate({
      table: 'Entries_20150709',
      name: 'tag',
      flags: 'COLUMN_SCALAR',
      type: 'ShortText',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.tableCreate({
      name: 'Terms',
      flags: 'TABLE_PAT_KEY',
      key_type: 'ShortText',
      default_tokenizer: 'TokenBigram',
      normalizer: 'NormalizerAuto',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.columnCreate({
      table: 'Terms',
      name: 'entries_key_index_20150708',
      flags: 'COLUMN_INDEX|WITH_POSITION',
      type: 'Entries_20150708',
      source: '_key',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.columnCreate({
      table: 'Terms',
      name: 'entries_content_index_20150708',
      flags: 'COLUMN_INDEX|WITH_POSITION',
      type: 'Entries_20150708',
      source: 'content',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.columnCreate({
      table: 'Terms',
      name: 'entries_key_index_20150709',
      flags: 'COLUMN_INDEX|WITH_POSITION',
      type: 'Entries_20150709',
      source: '_key',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.columnCreate({
      table: 'Terms',
      name: 'entries_content_index_20150709',
      flags: 'COLUMN_INDEX|WITH_POSITION',
      type: 'Entries_20150709',
      source: 'content',
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.load({
      table: 'Entries_20150708',
      values: VALUES1,
    })
    if (r.error) {
      return r
    }
  }

  {
    const r = await groongar.load({
      table: 'Entries_20150709',
      values: VALUES2,
    })
    if (r.error) {
      return r
    }
  }

  return OK(true)
}

describe('test', () => {
  beforeEach(() => {
    env = undefined
  })

  afterEach(async () => {
    if (env) {
      await teardownClient(env)
      rimraf(db_dir)
    }
  })

  test('sharding', async () => {
    rimraf(db_dir)
    mkdir(db_dir)
    env = await setupClient({
      db_path: path.join(db_dir, 'tmp.sharding.db'),
    })
    const r_grngr = createGroongar(env.client)
    if (r_grngr.error) {
      throw r_grngr.error
    }
    const groongar = r_grngr.value

    const r1 = await setup_sharding(groongar)
    if (r1.error) {
      throw r1.error
    }

    const r2 = await groongar.logicalCount({
      logical_table: 'Entries',
      shard_key: 'created_at',
      filter: 'query("content", "Groonga OR Senna")',
    })
    expect(r2.ok).toBe(true)
    expect(r2.error).toBeUndefined()
    if (r2.ok) {
      expect(r2.value).toBe(2)
    }

    const r3 = await groongar.logicalParameters()
    expect(r3.ok).toBe(true)
    expect(r3.error).toBeUndefined()
    if (r3.ok) {
      expect(typeof r3.value).toBe('object')
      expect('range_index' in r3.value).toBe(true)
    }

    const r4 = await groongar.logicalShardList({
      logical_table: 'Entries',
    })
    expect(r4.ok).toBe(true)
    expect(r4.error).toBeUndefined()
    if (r4.ok) {
      expect(Array.isArray(r4.value)).toBe(true)
      expect(r4.value.length).toBe(2)
    }

    const r5 = await groongar.logicalSelect({
      logical_table: 'Entries',
      shard_key: 'created_at',
    })
    expect(r5.ok).toBe(true)
    expect(r5.error).toBeUndefined()
    if (r5.ok) {
      expect(Array.isArray(r5.value)).toBe(true)
    }

    const r6 = await groongar.logicalRangeFilter({
      logical_table: 'Entries',
      shard_key: 'created_at',
    })
    expect(r6.ok).toBe(true)
    expect(r6.error).toBeUndefined()
    if (r6.ok) {
      expect(Array.isArray(r6.value)).toBe(true)
    }

    const r7 = await groongar.logicalTableRemove({
      logical_table: 'Entries',
      shard_key: 'timestamp',
      min: '2016-03-18 01:00:00',
      min_border: 'include',
      max: '2016-03-19 01:30:00',
      max_border: 'include',
    })
    expect(r7.ok).toBe(true)
    expect(r7.error).toBeUndefined()
    if (r7.ok) {
      expect(r7.value).toBe(true)
    }
  })
})
