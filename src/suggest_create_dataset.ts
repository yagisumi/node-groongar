import type { Groongar, GroongaClient } from './groongar'

export async function suggestCreateDataset<T extends GroongaClient>(groongar: Groongar<T>, dataset: string) {
  const r1 = await groongar.pluginRegister({
    name: 'suggest/suggest',
  })

  if (r1.error) {
    return false
  }

  const r2 = await groongar.tableCreate({
    name: 'event_type',
    flags: 'TABLE_HASH_KEY',
    key_type: 'ShortText',
  })

  if (r2.error) {
    return false
  }

  const r3 = await groongar.tableCreate({
    default_tokenizer: 'TokenBigram',
    normalizer: 'NormalizerAuto',
    name: 'bigram',
    flags: 'TABLE_PAT_KEY',
    key_type: 'ShortText',
  })

  if (r3.error) {
    return false
  }

  const r4 = await groongar.tableCreate({
    normalizer: 'NormalizerAuto',
    name: 'kana',
    flags: 'TABLE_PAT_KEY',
    key_type: 'ShortText',
  })

  if (r4.error) {
    return false
  }

  const r5 = await groongar.tableCreate({
    default_tokenizer: 'TokenDelimit',
    normalizer: 'NormalizerAuto',
    name: `item_${dataset}`,
    flags: 'TABLE_PAT_KEY',
    key_type: 'ShortText',
  })

  if (r5.error) {
    return false
  }

  const r6 = await groongar.columnCreate({
    table: 'bigram',
    name: `item_${dataset}_key`,
    flags: 'COLUMN_INDEX|WITH_POSITION',
    type: `item_${dataset}`,
    source: '_key',
  })

  if (r6.error) {
    return false
  }

  const r7 = await groongar.columnCreate({
    table: `item_${dataset}`,
    name: 'kana',
    flags: 'COLUMN_VECTOR',
    type: 'kana',
  })

  if (r7.error) {
    return false
  }

  const r8 = await groongar.columnCreate({
    table: 'kana',
    name: `item_${dataset}_kana`,
    flags: 'COLUMN_INDEX',
    type: `item_${dataset}`,
    source: 'kana',
  })

  if (r8.error) {
    return false
  }

  const r9 = await groongar.columnCreate({
    table: `item_${dataset}`,
    name: 'freq',
    flags: 'COLUMN_SCALAR',
    type: 'Int32',
  })

  if (r9.error) {
    return false
  }

  const r10 = await groongar.columnCreate({
    table: `item_${dataset}`,
    name: 'last',
    flags: 'COLUMN_SCALAR',
    type: 'Time',
  })

  if (r10.error) {
    return false
  }

  const r11 = await groongar.columnCreate({
    table: `item_${dataset}`,
    name: 'boost',
    flags: 'COLUMN_SCALAR',
    type: 'Int32',
  })

  if (r11.error) {
    return false
  }

  const r12 = await groongar.columnCreate({
    table: `item_${dataset}`,
    name: 'freq2',
    flags: 'COLUMN_SCALAR',
    type: 'Int32',
  })

  if (r12.error) {
    return false
  }

  const r13 = await groongar.columnCreate({
    table: `item_${dataset}`,
    name: 'buzz',
    flags: 'COLUMN_SCALAR',
    type: 'Int32',
  })

  if (r13.error) {
    return false
  }

  const r14 = await groongar.tableCreate({
    name: `pair_${dataset}`,
    flags: 'TABLE_HASH_KEY',
    key_type: 'UInt64',
  })

  if (r14.error) {
    return false
  }

  const r15 = await groongar.columnCreate({
    table: `pair_${dataset}`,
    name: 'pre',
    flags: 'COLUMN_SCALAR',
    type: `item_${dataset}`,
  })

  if (r15.error) {
    return false
  }

  const r16 = await groongar.columnCreate({
    table: `pair_${dataset}`,
    name: 'post',
    flags: 'COLUMN_SCALAR',
    type: `item_${dataset}`,
  })

  if (r16.error) {
    return false
  }

  const r17 = await groongar.columnCreate({
    table: `pair_${dataset}`,
    name: 'freq0',
    flags: 'COLUMN_SCALAR',
    type: 'Int32',
  })

  if (r17.error) {
    return false
  }

  const r18 = await groongar.columnCreate({
    table: `pair_${dataset}`,
    name: 'freq1',
    flags: 'COLUMN_SCALAR',
    type: 'Int32',
  })

  if (r18.error) {
    return false
  }

  const r19 = await groongar.columnCreate({
    table: `pair_${dataset}`,
    name: 'freq2',
    flags: 'COLUMN_SCALAR',
    type: 'Int32',
  })

  if (r19.error) {
    return false
  }

  const r20 = await groongar.columnCreate({
    table: `item_${dataset}`,
    name: 'co',
    flags: 'COLUMN_INDEX',
    type: `pair_${dataset}`,
    source: 'pre',
  })

  if (r20.error) {
    return false
  }

  const r21 = await groongar.tableCreate({
    name: `sequence_${dataset}`,
    flags: 'TABLE_HASH_KEY',
    key_type: 'ShortText',
  })

  if (r21.error) {
    return false
  }

  const r22 = await groongar.tableCreate({
    name: `event_${dataset}`,
    flags: 'TABLE_NO_KEY',
  })

  if (r22.error) {
    return false
  }

  const r23 = await groongar.columnCreate({
    table: `sequence_${dataset}`,
    name: 'events',
    flags: 'COLUMN_VECTOR|RING_BUFFER',
    type: `event_${dataset}`,
  })

  if (r23.error) {
    return false
  }

  const r24 = await groongar.columnCreate({
    table: `event_${dataset}`,
    name: 'type',
    flags: 'COLUMN_SCALAR',
    type: 'event_type',
  })

  if (r24.error) {
    return false
  }

  const r25 = await groongar.columnCreate({
    table: `event_${dataset}`,
    name: 'time',
    flags: 'COLUMN_SCALAR',
    type: 'Time',
  })

  if (r25.error) {
    return false
  }

  const r26 = await groongar.columnCreate({
    table: `event_${dataset}`,
    name: 'item',
    flags: 'COLUMN_SCALAR',
    type: `item_${dataset}`,
  })

  if (r26.error) {
    return false
  }

  const r27 = await groongar.columnCreate({
    table: `event_${dataset}`,
    name: 'sequence',
    flags: 'COLUMN_SCALAR',
    type: `sequence_${dataset}`,
  })

  if (r27.error) {
    return false
  }

  const r28 = await groongar.tableCreate({
    name: 'configuration',
    flags: 'TABLE_HASH_KEY',
    key_type: 'ShortText',
  })

  if (r28.error) {
    return false
  }

  const r29 = await groongar.columnCreate({
    table: 'configuration',
    name: 'weight',
    flags: 'COLUMN_SCALAR',
    type: 'UInt32',
  })

  if (r29.error) {
    return false
  }

  const values = [
    {
      _key: `${dataset}`,
      weight: 1,
    },
  ]

  const r30 = await groongar.load({
    table: 'configuration',
    values: values,
  })

  if (r30.error) {
    return false
  }

  return true
}
