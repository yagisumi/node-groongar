type CompletionList<T> = T | (string & {})
type retMap<T> = {
  1: T
  2: T
  3: T
}

export type CommandOptions = { [name: string]: any }

export declare namespace types {
  type commands = keyof CommandMap
  type cmd_vers = 1 | 2 | 3
  type opts<K extends keyof CommandMap> = CommandMap[K]['opts']
  type ret<K extends keyof CommandMap, V extends cmd_vers> = CommandMap[K]['ret'][V]
  type callback<K extends keyof CommandMap, V extends cmd_vers> = (err: Error | null, data: ret<K, V>) => void

  type OutputType = 'json' | 'xml' | 'tsv' | 'msgpack'

  interface CommandVersion<V extends 1 | 2 | 3> {
    command_version: V
  }

  interface CommonOptions {
    command_version?: number
    request_id?: string
    request_timeout?: number
    output_type?: CompletionList<OutputType>
    output_pretty?: YesNo
  }

  type YesNo = 'yes' | 'no'

  type Border = 'include' | 'exclude'

  type FixedDataType =
    | 'Bool'
    | 'Int8'
    | 'UInt8'
    | 'Int16'
    | 'UInt16'
    | 'Int32'
    | 'UInt32'
    | 'Int64'
    | 'UInt64'
    | 'Float'
    | 'Time'
    | 'TokyoGeoPoint'
    | 'WGS84GeoPoint'

  type KeyDataType = FixedDataType | 'ShortText'

  type DataType = KeyDataType | 'Text' | 'LongText'

  type LogLevel = 'emergency' | 'alert' | 'critical' | 'error' | 'warning' | 'notice' | 'info' | 'debug' | 'dump'

  type Normalizer = 'NormalizerAuto' | 'NormalizerNFKC121' | 'NormalizerNFKC100' | 'NormalizerNFKC51'

  type Tokenizer =
    | 'TokenMecab'
    | 'TokenDelimit'
    | 'TokenUnigram'
    | 'TokenBigram'
    | 'TokenTrigram'
    | 'TokenBigramSplitSymbol'
    | 'TokenBigramSplitSymbolAlpha'
    | 'TokenBigramSplitSymbolAlphaDigit'
    | 'TokenBigramIgnoreBlank'
    | 'TokenBigramIgnoreBlankSplitSymbol'
    | 'TokenBigramIgnoreBlankSplitSymbolAlpha'
    | 'TokenBigramIgnoreBlankSplitSymbolAlphaDigit'
    | 'TokenDelimitNull'
    | 'TokenRegexp'
    | 'TokenNgram'
    | 'TokenPattern'
    | 'TokenTable'

  type TokenFilter = 'TokenFilterNFKC100' | 'TokenFilterStem' | 'TokenFilterStopWord'

  interface CommandMap {
    cache_limit: {
      opts: CommonOptions & {
        /**
         * Specifies the max number of query cache entries as a number.
         */
        max?: number
      }
      ret: retMap<number>
    }
  }

  interface CommandMap {
    check: {
      opts: CommonOptions & {
        /**
         * Specifies the name of the object.
         */
        obj: string
      }
      ret: retMap<any>
    }
  }

  interface CommandMap {
    /**
     * @deprecated
     */
    clearlock: {
      opts: CommonOptions & {
        /**
         * Specifies the name of the object.
         */
        target_name: string
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    column_copy: {
      opts: CommonOptions & {
        /**
         * Specifies the table name of source column.
         */
        from_table: string
        /**
         * Specifies the column name to be copied values.
         */
        from_name: string
        /**
         * Specifies the table name of destination column.
         */
        to_table: string
        /**
         * Specifies the destination column name.
         */
        to_name: string
      }
      ret: retMap<true>
    }
  }

  type OftenUsedColumnFlags =
    | 'COLUMN_SCALAR'
    | 'COLUMN_VECTOR'
    | 'COLUMN_VECTOR|WITH_WEIGHT'
    | 'COLUMN_INDEX'
    | 'COLUMN_INDEX|WITH_WEIGHT'
    | 'COLUMN_INDEX|WITH_POSITION'
    | 'COLUMN_INDEX|WITH_POSITION|WITH_SECTION'
    | 'COLUMN_SCALAR|COMPRESS_LZ4'
    | 'COLUMN_SCALAR|COMPRESS_ZSTD'

  interface CommandMap {
    column_create: {
      opts: CommonOptions & {
        /**
         * Specifies an existing table name for the new column.
         */
        table: string
        /**
         * Specifies the column name to be created.
         */
        name: string
        /**
         * Specifies the column type and column customize options.
         * @example 'COLUMN_INDEX|WITH_POSITION'
         */
        flags?: CompletionList<OftenUsedColumnFlags>
        /**
         * Specifies type of the column value.
         */
        type: CompletionList<DataType>
        /**
         * Specifies index target columns. You can specify one or more columns to the source parameter.
         */
        source?: string
      }
      ret: retMap<true>
    }
  }

  type ColumnInformationType = [
    ['id', 'UInt32'],
    ['name', 'ShortText'],
    ['path', 'ShortText'],
    ['type', 'ShortText'],
    ['flags', 'ShortText'],
    ['domain', 'ShortText'],
    ['range', 'ShortText'],
    ['source', 'ShortText']
  ]

  type ColumnInformation = [number, string, string, string, string, string, string, string[]]

  type ColumnListRetrunValue = [ColumnInformationType, ...ColumnInformation[]]

  interface CommandMap {
    column_list: {
      opts: CommonOptions & {
        /**
         * Specifies the name of table to be listed columns.
         */
        table: string
      }
      ret: retMap<ColumnListRetrunValue | string>
    }
  }

  interface CommandMap {
    column_remove: {
      opts: CommonOptions & {
        /**
         * Specifies the name of the table in which the column to be deleted is defined.
         */
        table: string
        /**
         * Specifies the column name to be deleted.
         */
        name: string
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    column_rename: {
      opts: CommonOptions & {
        /**
         * Specifies the name of table that has the column to be renamed.
         */
        table: string
        /**
         * Specifies the column name to be renamed.
         */
        name: string
        /**
         * Specifies the new column name.
         */
        new_name: string
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    config_delete: {
      opts: CommonOptions & {
        /**
         * Specifies the key of target configuration item.
         */
        key: string
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    config_get: {
      opts: CommonOptions & {
        /**
         * Specifies the key of target configuration item.
         */
        key: string
      }
      ret: retMap<string>
    }
  }

  interface CommandMap {
    config_set: {
      opts: CommonOptions & {
        /**
         * Specifies the key of target configuration item.
         */
        key: string
        /**
         * Specifies the value of the target configuration item specified by `key`.
         */
        value: string | number
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    database_unmap: {
      opts: CommonOptions & {}
      ret: retMap<true>
    }
  }

  interface CommandMap {
    define_selector: {
      opts: CommonOptions & {
        /**
         * Specifies the name of the selector command to be defined.
         */
        name: string
        /**
         * Specifies the table to search for.
         */
        table?: string
        /**
         * Specifies the default value of the `match_columns` argument of the selector command to be added.
         */
        match_columns?: string
        /**
         * Specifies the default value of the `query` argument of the selector command to be added.
         */
        query?: string
        /**
         * Specifies the default value of the `filter` argument of the selector command to be added.
         */
        filter?: string
        /**
         * Specifies the default value of the `scorer` argument of the selector command to be added.
         */
        scorer?: string
        /**
         * Specifies the default value of the `sortby` argument of the selector command to be added.
         */
        sortby?: string
        /**
         * Specifies the default value of the `output_columns` argument of the selector command to be added.
         */
        output_columns?: string
        /**
         * Specifies the default value for the `offset` argument of the selector command to be added.
         */
        offset?: number
        /**
         * Specifies the default value of `limit` argument of the selector command to be added.
         */
        limit?: number
        /**
         * Specifies the default value of the `drilldown` argument of the selector command to be added.
         */
        drilldown?: string
        /**
         * Specifies the default value for the `drilldown_sortby` argument of the selector command to be added.
         */
        drilldown_sortby?: string
        /**
         * Specifies the default value for the `drilldown_output_columns` argument of the selector command to be added.
         */
        drilldown_output_columns?: string
        /**
         * Specifies the default value for the `drilldown_offset` argument of the selector command to be added.
         */
        drilldown_offset?: number
        /**
         * Specifies the default value for the `drilldown_limit` argument of the selector command to be added.
         */
        drilldown_limit?: number
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    defrag: {
      opts: CommonOptions & {
        /**
         * Specifies the target object name. If empty, the open db object will be targeted.
         */
        objname?: string
        /**
         * @todo
         */
        threshold?: number
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    delete: {
      opts: CommonOptions & {
        /**
         * Specifies the name of table to delete the records.
         */
        table: string
        /**
         * Specifies the key of record to delete.
         * If you use the table with TABLE_NO_KEY, the key is just ignored. (Use id parameter in such a case)
         */
        key?: number | string
        /**
         * Specifies the id of record to delete.
         * If you specify id parameter, you must not specify key parameter.
         */
        id?: number
        /**
         * Specifies the expression of grn_expr to identify the record.
         * If you specify filter parameter, you must not specify key and id parameter.
         */
        filter?: string
        /**
         * Specify the max number of records to delete.
         */
        limit?: number
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    dump: {
      opts: CommonOptions & {
        /**
         * Specifies the output target tables separated by commas.
         * If you specify a table that does not exist, it will be ignored.
         */
        tables?: string
        /**
         * You can customize the output whether it contains registered plugins or not.
         * To exclude registered plugins from the output, specify `no`.
         * @since 5.0.3
         */
        dump_plugins?: YesNo
        /**
         * You can customize the output whether it contains database schema or not.
         * To exclude database schema from the output, specify `no`.
         * @since 5.0.3
         */
        dump_schema?: YesNo
        /**
         * You can customize the output whether it contains records or not.
         * To exclude records from the output, specify `no`.
         * @since 5.0.3
         */
        dump_records?: YesNo
        /**
         * You can customize the output whether it contains indexes or not.
         * To exclude indexes from the output, specify `no`.
         * @since 5.0.3
         */
        dump_indexes?: YesNo
        /**
         * You can customize the output whether it contains configs or not.
         * To exclude configs from the output, specify `no`.
         * @since 5.0.3
         */
        dump_configs?: YesNo
        /**
         * You can ascending sort by `_key` the output of hash table when it contains hash table.
         * To sort the output of hash table, specify `yes`.
         * @since 7.0.5
         */
        sort_hash_table?: YesNo
      }
      ret: retMap<string>
    }
  }

  interface CommandMap {
    io_flush: {
      opts: CommonOptions & {
        /**
         * Specifies a flush target object name. Target object is one of database, table or column.
         */
        target_name?: string
        /**
         * Specifies whether child objects of the flush target object are also flush target objects.
         */
        recursive?: 'dependent' | YesNo
        /**
         * Specifies whether opened objects are only flushed.
         * @since 7.0.4
         */
        only_opened?: YesNo
      }
      ret: retMap<true>
    }
  }

  interface IndexColumnDiffToken {
    id: number
    value: string | number
  }

  interface IndexColumnDiffRemain {
    record_id: number
    section_id?: number
    position?: number
  }

  interface IndexColumnDiffMissing {
    record_id: number
    section_id?: number
    position?: number
  }

  interface IndexColumnDiffReturnItem {
    token: IndexColumnDiffToken
    remains: Array<IndexColumnDiffRemain>
    missings: Array<IndexColumnDiffMissing>
  }

  interface CommandMap {
    index_column_diff: {
      opts: CommonOptions & {
        /**
         * @todo
         */
        table: string
        /**
         * @todo
         */
        name: string
      }
      ret: retMap<Array<IndexColumnDiffReturnItem>>
    }
  }

  interface LoadReturnValueV3 {
    n_loaded_records: number
    loaded_ids?: number[]
    errors?: Array<{ return_code: number; message: string }>
  }

  interface CommandMap {
    load: {
      opts: CommonOptions & {
        /**
         * Specifies a table name you want to add records.
         */
        table: string
        /**
         * Specifies values to be loaded.
         */
        values: any[] | string
        /**
         * Specifies column names in added records with comma separations.
         */
        columns?: string
        /**
         * Specifies executed expression in Script syntax when the same primary key as added records already exists in your table.
         */
        ifexists?: string
        /**
         * Specifies an input format for values. It supports only json for now. It means format of values is JSON.
         */
        input_type?: 'json'
        /**
         * @todo
         */
        each?: string
        /**
         * @todo
         */
        output_ids?: YesNo
        /**
         * Requires `command_version: 3`
         * @todo
         */
        output_errors?: YesNo
        /**
         * Specifies whether locking table while updating columns.
         * Requires `command_version: 3`
         * @since 8.0.6
         */
        lock_table?: YesNo
      }
      ret: {
        1: number
        2: number
        3: LoadReturnValueV3
      }
    }
  }

  interface CommandMap {
    lock_acquire: {
      opts: CommonOptions & {
        /**
         * Specifies the name of table or column.
         */
        target_name?: string
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    lock_clear: {
      opts: CommonOptions & {
        /**
         * Specifies the name of table or column.
         */
        target_name?: string
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    lock_release: {
      opts: CommonOptions & {
        /**
         * Specifies the name of table or column.
         */
        target_name?: string
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    log_level: {
      opts: CommonOptions & {
        /**
         * Specifies log level with a character or string which means log level.
         */
        level: CompletionList<LogLevel>
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    log_put: {
      opts: CommonOptions & {
        /**
         * Specifies log level with a character or string which means log level.
         */
        level: CompletionList<LogLevel>
        /**
         * Specifies a string to output.
         */
        message: string
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    log_reopen: {
      opts: CommonOptions & {}
      ret: retMap<true>
    }
  }

  interface CommandMap {
    logical_count: {
      opts: CommonOptions & {
        /**
         * Specifies logical table name. It means table name without `_YYYYMMDD` postfix.
         * If you use actual table such as `Logs_20150203`, `Logs_20150203` and so on, logical table name is `Logs`.
         */
        logical_table: string
        /**
         * Specifies column name which is treated as shared key.
         * Shard key is a column that stores data that is used for distributing records to suitable shards.
         */
        shard_key: string
        /**
         * Specifies the minimum value of `shard_key` column.
         * If shard doesn’t have any matched records, the shard isn’t searched.
         */
        min?: number | string
        /**
         * Specifies whether the minimum value is included or not. Here is available values.
         */
        min_border?: Border
        /**
         * Specifies the maximum value of `shard_key` column.
         * If shard doesn’t have any matched records, the shard isn’t searched.
         */
        max?: number | string
        /**
         * Specifies whether the maximum value is included or not. Here is available values.
         */
        max_border?: Border
        /**
         * Corresponds to filter in select.
         */
        filter?: string
        /**
         * Specifies the filter text that is processed after `filtered` stage dynamic columns are generated.
         * You can use `post_filter` to filter by `filtered` stage dynamic columns. Others are the same as filter.
         * @since 8.0.1
         */
        post_filter?: string
        /**
         * Specifies the named parameters for dynamic columns.
         */
        columns?: { [name: string]: DynamicColumnArgs }
        /**
         * Specifies whether caching the result of this query or not.
         */
        cache?: YesNo
      }
      ret: retMap<number>
    }
  }

  interface LogicalParametersReturnValue {
    range_index: 'auto' | 'always' | 'never'
  }

  interface CommandMap {
    logical_parameters: {
      opts: CommonOptions & {
        /**
         * Specifies how to use range index in logical_range_filter by keyword.
         */
        range_index?: 'auto' | 'always' | 'never'
      }
      ret: retMap<LogicalParametersReturnValue>
    }
  }

  type LogicalRangeFilterReturnValue = [Array<[string, string | null]>, ...Array<any>]
  interface CommandMap {
    logical_range_filter: {
      opts: CommonOptions & {
        /**
         * Specifies logical table name. It means table name without `_YYYYMMDD` postfix.
         * If you use actual table such as `Entries_20150708`, `Entries_20150709` and so on, logical table name is `Entries`.
         */
        logical_table: string
        /**
         * Specifies column name which is treated as shared key in each parted table.
         */
        shard_key: string
        /**
         * Specifies the min value of `shard_key`
         */
        min?: number | string
        /**
         * Specifies whether the min value of borderline must be include or not.
         * Specifies `include` or `exclude` as the value of this parameter.
         */
        min_border?: Border
        /**
         * Specifies the max value of `shard_key`.
         */
        max?: number | string
        /**
         * Specifies whether the max value of borderline must be include or not.
         * Specifies `include` or `exclude` as the value of this parameter.
         */
        max_border?: Border
        /**
         * @todo
         */
        order?: 'ascending' | 'descending'
        /**
         * Corresponds to filter in select.
         */
        filter?: string
        /**
         * Corresponds to offset in select.
         */
        offset?: number
        /**
         * Corresponds to limit in select.
         */
        limit?: number
        /**
         * Corresponds to output_columns in select.
         */
        output_columns?: string
        /**
         * Specifies whether range_index is used or not.
         * Note that it’s a parameter for test. It should not be used for production.
         */
        use_range_index?: YesNo
        /**
         * Specifies the filter text that is processed after `filtered` stage dynamic columns are generated.
         * You can use `post_filter` to filter by `filtered` stage dynamic columns. Others are the same as filter.
         * @since 7.1.1
         */
        post_filter?: string
        /**
         * Corresponds to sort_keys in select.
         * @since 8.0.2
         */
        sort_keys?: string
        /**
         * Specifies whether caching the result of this query or not.
         */
        cache?: YesNo
        /**
         * Specifies the named parameters for dynamic columns.
         */
        columns?: { [name: string]: DynamicColumnArgs }
      }
      ret: {
        1: LogicalRangeFilterReturnValue
        2: LogicalRangeFilterReturnValue
        3: any
      }
    }
  }

  interface DrilldownArgs {
    keys?: string
    sort_keys?: string
    /** @deprecated */
    sortby?: string
    output_columns?: string
    offset?: number
    limit?: number
    calc_types?: string
    calc_target?: string
    filter?: string
    columns?: { [name: string]: DynamicColumnArgs }
    adjuster?: string
    table?: string
    stage?: string
  }

  interface DynamicColumnArgs {
    stage?: string
    flags?: CompletionList<OftenUsedColumnFlags>
    type?: CompletionList<DataType>
    value?: string | number
    window_sort_keys?: string
    window_group_keys?: string
  }

  interface SliceArgs {
    match_columns?: string
    query?: string
    filter?: string
    query_expander?: string
    query_flags?: string
    sort_keys?: string
    output_columns?: string
    offset?: number
    limit?: number
    table?: string
    columns?: { [name: string]: DynamicColumnArgs }
    drilldowns?: { [label: string]: DrilldownArgs }
  }

  type ColumnSpecsV1 = Array<[string, string | null]>
  type ColumnSpecsV3 = Array<{ name: string; type: string | null }>
  type GrnRecord = Array<any>
  type GrnRecords = Array<GrnRecord>
  type SearchResultV1 = [[number], ColumnSpecsV1, ...GrnRecord[]]
  interface ResultRecordsV3 {
    columns: ColumnSpecsV3
    records: GrnRecords
  }
  type SearchResultBasicV3 = {
    n_hits: number
    columns: ColumnSpecsV3
    records: GrnRecords
  }
  type SearchResultWithDrilldownsV3 = {
    n_hits: number
    columns: ColumnSpecsV3
    records: GrnRecords
    drilldowns?: DrilldownResultMapV3
  }
  type SearchResultV3 = {
    n_hits: number
    columns: ColumnSpecsV3
    records: GrnRecords
    drilldowns?: DrilldownResultMapV3
    slices?: SliceResultMapV3
  }
  type DrilldownResultV1 = SearchResultV1
  type DrilldownResultMapV1 = {
    [label: string]: DrilldownResultV1
  }
  type DrilldownResultMapV3 = {
    [name: string]: SearchResultBasicV3
  }
  type SliceResultMapV3 = {
    [name: string]: SearchResultWithDrilldownsV3
  }

  type SliceLabeledResultV1 = {
    [label: string]: [[number], ColumnSpecsV1, ...(GrnRecord | DrilldownResultMapV1)[]] // *
  }

  type SelectReturnValueV1 =
    | [SearchResultV1, ...DrilldownResultV1[]]
    | [SearchResultV1, SliceLabeledResultV1, ...DrilldownResultV1[]]
    | [SearchResultV1, DrilldownResultMapV1, ...DrilldownResultV1[]]
    | [SearchResultV1, SliceLabeledResultV1, DrilldownResultMapV1, ...DrilldownResultV1[]]
  type SelectReturnValueV3 = SearchResultV3
  type SelectReturnValue = SelectReturnValueV1 | SelectReturnValueV3

  interface CommandMap {
    logical_select: {
      opts: CommonOptions & {
        /**
         * Specifies logical table name. It means table name without `_YYYYMMDD` postfix.
         * If you use actual table such as `Entries_20150708`, `Entries_20150709` and so on, logical table name is `Entries`.
         */
        logical_table: string
        /**
         * Specifies column name which is treated as shared key.
         * Shard key is a column that stores data that is used for distributing records to suitable shards.
         */
        shard_key: string
        /**
         * Specifies the minimum value of `shard_key` column.
         * If shard doesn’t have any matched records, the shard isn’t searched.
         */
        min?: number | string
        /**
         * Specifies whether the minimum value is included or not. Here is available values.
         */
        min_border?: Border
        /**
         * Specifies the maximum value of `shard_key` column.
         * If shard doesn’t have any matched records, the shard isn’t searched.
         */
        max?: number | string
        /**
         * Specifies whether the maximum value is included or not. Here is available values.
         */
        max_border?: Border
        /**
         * Corresponds to filter in select.
         */
        filter?: string
        /**
         * Deprecated since version 6.1.5: Use sort_keys instead.
         * @deprecated
         */
        sortby?: string
        /**
         * Corresponds to output_columns in select.
         */
        output_columns?: string
        /**
         * Corresponds to offset in select.
         */
        offset?: number
        /**
         * Corresponds to limit in select.
         */
        limit?: number
        /**
         * Corresponds to drilldown in select.
         */
        drilldown?: string
        /**
         * Deprecated since version 6.1.5: Use drilldown_sort_keys instead.
         * @deprecated
         */
        drilldown_sortby?: string
        /**
         * Corresponds to drilldown_output_columns in select.
         */
        drilldown_output_columns?: string
        /**
         * Corresponds to drilldown_offset in select.
         */
        drilldown_offset?: number
        /**
         * Corresponds to drilldown_limit in select.
         */
        drilldown_limit?: number
        /**
         * Corresponds to drilldown_calc_types in select.
         */
        drilldown_calc_types?: string
        /**
         * Corresponds to drilldown_calc_target in select.
         */
        drilldown_calc_target?: string
        /**
         * @todo
         */
        drilldown_adjuster?: string
        /**
         * Corresponds to sort_keys in select.
         */
        sort_keys?: string
        /**
         * Corresponds to drilldown_sort_keys in select.
         */
        drilldown_sort_keys?: string
        /**
         * Corresponds to match_columns in select.
         * @since 7.0.1
         */
        match_columns?: string
        /**
         * Corresponds to query in select.
         */
        query?: string
        /**
         * Corresponds to drilldown_filter in select.
         */
        drilldown_filter?: string
        /**
         * Specifies the filter text that is processed after `filtered` stage dynamic columns are generated.
         * You can use `post_filter` to filter by `filtered` stage dynamic columns. Others are the same as filter.
         * @since 8.0.1
         */
        post_filter?: string
        /**
         * You can store specified a table a result of `logical_select` with `--load_table`, `--load-columns` and `--load_values` arguments.
         * `--load_table` specifies a table name for storing a result of `logical_select`.
         * @since 8.1.1
         */
        load_table?: string
        /**
         * Specifies columns of a table that specifying `--load-table`.
         * Stores value of columns that specified with load_values in columns that specified with this argument.
         * You must specify columns that already exists.
         * @since 8.1.1
         */
        load_columns?: string
        /**
         * Specifies columns of result of `logical_select`.
         * Specifies columns for storing values into columns that specified with load_columns.
         * You must specify columns that already exists.
         * @since 8.1.1
         */
        load_values?: string
        /**
         * Specifies whether caching the result of this query or not.
         */
        cache?: YesNo
        /**
         * Specifies the named parameters for dynamic columns.
         */
        columns?: { [name: string]: DynamicColumnArgs }
        /**
         * Specifies the named parameters for advanced drilldown.
         */
        drilldowns?: { [label: string]: DrilldownArgs }
        /**
         * Specifies the named parameters for advanced drilldown.
         */
      }
      ret: {
        1: SelectReturnValueV1
        2: SelectReturnValueV1
        3: any
      }
    }
  }

  interface CommandMap {
    logical_shard_list: {
      opts: CommonOptions & {
        /**
         * Specifies the logical table name. `logical_shard_list` returns a list of shard name of the logical table.
         */
        logical_table: string
      }
      ret: retMap<Array<{ name: string }>>
    }
  }

  interface CommandMap {
    logical_table_remove: {
      opts: CommonOptions & {
        /**
         * Specifies logical table name. It means table name without `_YYYYMMDD` postfix.
         * If you use actual table such as `Logs_20150203`, `Logs_20150203` and so on, logical table name is `Logs`.
         */
        logical_table: string
        /**
         * Specifies column name which is treated as shared key.
         */
        shard_key: string
        /**
         * Specifies the minimum value of `shard_key` column.
         */
        min?: number | string
        /**
         * Specifies whether the minimum value is included or not.
         * `include` and `exclude` are available. The default is `include`.
         */
        min_border?: Border
        /**
         * Specifies the maximum value of `shard_key` column.
         */
        max?: number | string
        /**
         * Specifies whether the maximum value is included or not.
         * `include` and `exclude` are available. The default is include.
         */
        max_border?: Border
        /**
         * Specifies whether tables and columns that depend on the target shard are also removed or not.
         * @since 6.0.1
         */
        dependent?: YesNo
        /**
         * Specifies whether you want to remove target tables and columns even if some problems exist.
         * @since 6.0.9
         */
        force?: YesNo
      }
      ret: retMap<true>
    }
  }

  type OftenUsedNormalizeFlags =
    | 'WITH_TYPES'
    | 'WITH_TYPES|WITH_CHECKS'
    | 'REMOVE_BLANK'
    | 'REMOVE_TOKENIZED_DELIMITER'
    | 'NONE'

  type NormalizeRetrunValue = {
    normalized: string
    types: Array<string>
    checks: Array<number>
    offsets?: Array<number>
  }

  interface CommandMap {
    normalize: {
      opts: CommonOptions & {
        /**
         * Specifies the normalizer name. `normalize` command uses the normalizer that is named `normalizer`.
         */
        normalizer: CompletionList<Normalizer>
        /**
         * Specifies any string which you want to normalize.
         */
        string: string
        /**
         * Specifies a normalization customize options. You can specify multiple options separated by “|”.
         * @example `REMOVE_BLANK|WITH_TYPES`
         */
        flags?: CompletionList<OftenUsedNormalizeFlags>
      }
      ret: retMap<NormalizeRetrunValue>
    }
  }

  interface CommandMap {
    normalizer_list: {
      opts: CommonOptions & {}
      ret: retMap<Array<{ name: string }>>
    }
  }

  interface CommandMap {
    object_exist: {
      opts: CommonOptions & {
        /**
         * Specifies the object name to be checked.
         */
        name: string
      }
      ret: retMap<boolean>
    }
  }

  interface CommandMap {
    object_inspect: {
      opts: CommonOptions & {
        /**
         * Specifies the object name to be inspected.
         */
        name?: string
      }
      /**
       * @todo DB | TABLE | COLUMUN | TYPE
       */
      ret: retMap<{
        [name: string]: any
      }>
    }
  }

  interface ObjectListReturnValue {
    [name: string]: Record<string, any>
  }

  interface CommandMap {
    object_list: {
      opts: CommonOptions & {}
      /** @todo */
      ret: retMap<ObjectListReturnValue>
    }
  }

  interface CommandMap {
    object_remove: {
      opts: CommonOptions & {
        /**
         * Specifies the object name to be removed.
         */
        name: string
        /**
         * Specifies whether removing the object in “force mode”.
         */
        force?: YesNo
      }
      ret: retMap<true>
    }
  }

  interface ObjectSetVisibilityReturnValue {
    old: boolean
    new: boolean
  }

  interface CommandMap {
    object_set_visibility: {
      opts: CommonOptions & {
        /**
         * @todo
         */
        name: string
        /**
         * @todo
         */
        visible: YesNo
      }
      ret: retMap<ObjectSetVisibilityReturnValue>
    }
  }

  interface CommandMap {
    plugin_register: {
      opts: CommonOptions & {
        /**
         * Specifies plug-in name.
         * @example query_expanders/tsv
         */
        name: string
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    plugin_unregister: {
      opts: CommonOptions & {
        /**
         * Specifies plug-in name.
         * @example query_expanders/tsv
         */
        name: string
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    query_expand: {
      opts: CommonOptions & {
        /**
         * @todo
         */
        expander: string
        /**
         * @todo
         */
        query: string
        /**
         * @todo
         */
        flags?: string
        /**
         * @todo
         */
        term_column?: string
        /**
         * @todo
         */
        expanded_term_column?: string
      }
      ret: retMap<string>
    }
  }

  interface CommandMap {
    quit: {
      opts: CommonOptions & {}
      ret: retMap<true>
    }
  }

  interface QueryLogFlagsReturnValue {
    previous: string
    current: string
  }

  interface CommandMap {
    query_log_flags_add: {
      opts: CommonOptions & {
        flags: string
      }
      ret: retMap<QueryLogFlagsReturnValue>
    }
  }

  interface CommandMap {
    query_log_flags_get: {
      opts: CommonOptions & {}
      ret: retMap<string>
    }
  }

  interface CommandMap {
    query_log_flags_remove: {
      opts: CommonOptions & {
        flags: string
      }
      ret: retMap<QueryLogFlagsReturnValue>
    }
  }

  interface CommandMap {
    query_log_flags_set: {
      opts: CommonOptions & {
        flags: string
      }
      ret: retMap<QueryLogFlagsReturnValue>
    }
  }

  type RangeFileterReturnValueV1 = [Array<[string, string | null]>, ...Array<any>]
  type RangeFileterReturnValueV3 = {
    columns: Array<{ name: string; type: string | null }>
    records: Array<any>
  }
  type RangeFileterReturnValue = RangeFileterReturnValueV1 | RangeFileterReturnValueV3
  interface CommandMap {
    range_filter: {
      opts: CommonOptions & {
        /**
         * @todo
         */
        table: string
        /**
         * @todo
         */
        column: string
        /**
         * @todo
         */
        min?: number | string
        /**
         * @todo
         */
        min_border?: Border
        /**
         * @todo
         */
        max?: number | string
        /**
         * @todo
         */
        max_border?: Border
        /**
         * @todo
         */
        offset?: number
        /**
         * @todo
         */
        limit?: number
        /**
         * @todo
         */
        filter?: string
        /**
         * @todo
         */
        output_columns?: string
      }
      ret: {
        1: RangeFileterReturnValueV1
        2: RangeFileterReturnValueV1
        3: RangeFileterReturnValueV3
      }
    }
  }

  interface CommandMap {
    /**
     * @deprecated
     */
    register: {
      opts: CommonOptions & {
        path: string
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    reindex: {
      opts: CommonOptions & {
        /**
         * Specifies the name of table or column.
         */
        target_name?: string
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    request_cancel: {
      opts: CommonOptions & {
        /**
         * Specifies the ID for the target request.
         */
        id: string
      }
      ret: retMap<{ id: string; canceled: boolean }>
    }
  }

  interface CommandMap {
    ruby_eval: {
      opts: CommonOptions & {
        /**
         * Specifies the Ruby script which you want to evaluate.
         */
        script: string
      }
      ret: retMap<{ value: any } | { exception: { message: string } }>
    }
  }

  interface CommandMap {
    ruby_load: {
      opts: CommonOptions & {
        /**
         * Specifies the Ruby script path which you want to load.
         * @example "expression.rb"
         */
        path: string
      }
      ret: retMap<{ value: null }>
    }
  }

  interface SchemaType {
    id: number
    name: string
    size: number
    can_be_key_type: boolean
    can_be_value_type: boolean
  }

  interface SchemaIndex {
    id: number
    full_name: string
    table: string
    name: string
    section: number
  }

  interface SchemaCommand {
    name: string
    arguments: { [key: string]: string }
    command_line: string
  }

  interface SchemaValueType {
    id: number
    name: string
    type: 'type' | 'reference'
  }

  interface SchemaColumn {
    id: number
    name: string
    table: string
    full_name: string
    type: 'scalar' | 'vector' | 'index'
    value_type: SchemaValueType
    compress: null | 'zlib' | 'lz4' | 'zstd'
    section: boolean
    weight: boolean
    position: boolean
    sources: any[]
    indexes: Array<SchemaIndex>
    command: SchemaCommand
  }

  interface SchemaTable {
    id: number
    name: string
    type: 'array' | 'hash table' | 'patricia trie' | 'double array trie' | 'unknown'
    key_type: null | SchemaValueType
    value_type: null | SchemaValueType
    tokenizer: null | { id: number; name: string; options: null | [string, any] }
    normalizer: null | { id: number; name: string; options: null | [string, any] }
    token_filters: Array<{ id: number; name: string; options: null | [string, any] }>
    indexes: Array<SchemaIndex>
    command: SchemaCommand
    columns: { [name: string]: SchemaColumn }
  }

  interface SchemaReturnValue {
    plugins: { [type: string]: { name: string } }
    types: { [type: string]: SchemaType }
    tokenizers: { [type: string]: { id: number; name: string } }
    normalizers: { [type: string]: { id: number; name: string } }
    token_filters: { [type: string]: { id: number; name: string } }
    tables: { [name: string]: SchemaTable }
  }

  interface CommandMap {
    schema: {
      opts: CommonOptions & {}
      ret: retMap<SchemaReturnValue>
    }
  }

  interface CommandMap {
    select: {
      opts: CommonOptions & {
        /**
         * Specifies a table to be searched. table must be specified.
         */
        table: string
        /**
         * Specifies the default target column for fulltext search by `query` parameter value.
         */
        match_columns?: string
        /**
         * Specifies the query text. Normally, it is used for fulltext search with `match_columns` parameter.
         */
        query?: string
        /**
         * Specifies the filter text. Normally, it is used for complex search conditions.
         */
        filter?: string
        /**
         * specifies grn_expr in script format to be applied to all records matching the search condition.
         */
        scorer?: string
        /**
         * @deprecated since version 6.0.3: Use `sort_keys` instead.
         */
        sortby?: string
        /**
         * Specifies output columns separated by `,`.
         */
        output_columns?: string
        /**
         * Specifies offset to determine output records range. Offset is zero-based.
         * `--offset 1` means output range is started from the 2nd record.
         */
        offset?: number
        /**
         * Specifies the max number of output records.
         * If the number of matched records is less than `limit`, all records are outputted.
         */
        limit?: number
        /**
         * Specifies keys for grouping separated by `,`.
         */
        drilldown?: string
        /**
         * @deprecated since version 6.0.3: Use `drilldown_sort_keys` instead
         */
        drilldown_sortby?: string
        /**
         * Specifies output columns for drilldown separated by `,`.
         */
        drilldown_output_columns?: string
        /**
         * Specifies offset to determine range of drilldown output records.
         */
        drilldown_offset?: number
        /**
         * Specifies the max number of groups in a drilldown.
         */
        drilldown_limit?: number
        /**
         * @todo
         */
        drilldown_adjuster?: string
        /**
         * Specifies whether caching the result of this query or not.
         */
        cache?: YesNo
        /**
         * Specifies threshold to determine whether search storategy escalation is used or not.
         * @since 8.0.1
         */
        match_escalation_threshold?: number
        /**
         * @deprecated since version 3.0.2: Use `query_expander` instead.
         */
        query_expansion?: string
        /**
         * available values: `ALLOW_PRAGMA`, `ALLOW_COLUMN`, `ALLOW_UPDATE`, `ALLOW_LEADING_NOT`, `QUERY_NO_SYNTAX_ERROR`, `NONE`
         * @example 'ALLOW_COLUMN|ALLOW_UPDATE'
         */
        query_flags?: string
        /**
         * It’s for query expansion. Query expansion substitutes specific words to another words in query. Nomally, it’s used for synonym search.
         */
        query_expander?: string
        /**
         * Specifies one or more score adjust expressions. You need to use `adjuster` with `query` or `filter`. `adjuster` doesn’t work with not searched request.
         */
        adjuster?: string
        /**
         * calculation  types: `COUNT`, `MAX`, `MIN`, `SUM`, `AVG`, `NONE`
         * @example 'MAX,MIN'
         */
        drilldown_calc_types?: string
        /**
         * Specifies the target column for drilldown_calc_types.
         * @since 6.0.3
         */
        drilldown_calc_target?: string
        /**
         * Specifies the filter condition against the drilled down result.
         */
        drilldown_filter?: string
        /**
         * Specifies sort keys separated by ,. Each sort key is column name.
         */
        sort_keys?: string
        /**
         * Specifies sort keys for drilldown outputs separated by ,.
         * Each sort key is column name.
         */
        drilldown_sort_keys?: string
        /**
         * Specifies how to use match escalation.
         */
        match_escalation?: 'auto' | YesNo
        /**
         * You can store specified a table a result of `select` with `--load_table`,
         *  `--load-columns` and `--load_values` arguments.
         * `--load_table` specifies a table name for storing a result of `select`.
         * @since 9.0.1
         */
        load_table?: string
        /**
         * Specifies columns of a table that specifying `--load-table`.
         * Stores value of columns that specified with load_values in columns that specified with this argument.
         * You must specify columns that already exists.
         * @since 9.0.1
         */
        load_columns?: string
        /**
         * Specifies columns of result of `select`.
         * Specifies columns for storing values into columns that specified with load_columns.
         * You must specify columns that already exists.
         * @since 9.0.1
         */
        load_values?: string
        /**
         * Specifies the named parameters for dynamic columns.
         */
        columns?: { [name: string]: DynamicColumnArgs }
        /**
         * Specifies the named parameters for advanced drilldown.
         */
        drilldowns?: { [label: string]: DrilldownArgs }
        /**
         * @todo
         */
        slices?: { [name: string]: SliceArgs }
      }
      ret: {
        1: SelectReturnValueV1
        2: SelectReturnValueV1
        3: SelectReturnValueV3
      }
    }
  }

  interface CommandMap {
    shutdown: {
      opts: CommonOptions & {
        /**
         * Specifies shutdown mode.
         */
        mode?: 'graceful' | 'immediate'
      }
      ret: retMap<true>
    }
  }

  interface StatusReturnValue {
    alloc_count: number
    cache_hit_rate: number
    command_version: number
    default_command_version: number
    max_command_version: number
    n_queries: number
    start_time: number
    /** @deprecated since version 5.0.8: Use `start_time` instead. */
    starttime: number
    uptime: number
    version: string
  }

  interface CommandMap {
    status: {
      opts: CommonOptions & {}
      ret: retMap<StatusReturnValue>
    }
  }

  type CombinationSuggestTypes =
    | 'complete'
    | 'correct'
    | 'suggest'
    | 'complete|correct'
    | 'complete|suggest'
    | 'correct|suggest'
    | 'complete|correct|suggest'

  interface SuggestReturnValue {
    complete?: SearchResultV1 | SearchResultV3
    correct?: SearchResultV1 | SearchResultV3
    suggest?: SearchResultV1 | SearchResultV3
  }

  interface CommandMap {
    suggest: {
      opts: CommonOptions & {
        /**
         * Specifies what types are returned by the suggest command.
         * @example 'correct|suggest'
         */
        types: CompletionList<CombinationSuggestTypes>
        /**
         * Specifies table name that has item_${DATA_SET_NAME} format.
         */
        table: string
        /**
         * Specifies a column name that has furigana in Katakana in `table` table.
         */
        column: string
        /**
         * Specifies query for completion, correction and/or suggestion.
         */
        query: string
        /**
         * Specifies sort key. Default: `-_score`
         */
        sortby?: string
        /**
         * Specifies output columns. Default: `_key,_score`
         */
        output_columns?: string
        /**
         * Specifies returned records offset.
         */
        offset?: number
        /**
         * Specifies number of returned records.
         */
        limit?: number
        /**
         * Specifies threshold for item frequency.
         * Returned records must have _score that is greater than or equal to `frequency_threshold`.
         */
        frequency_threshold?: number
        /**
         * Specifies threshold for conditional probability.
         * Conditional probability is used for learned data.
         * It is probability of query submission when `query` is occurred.
         */
        conditional_probability_threshold?: number
        /**
         * Specifies whether optional prefix search is used or not in completion.
         */
        prefix_search?: 'auto' | YesNo
        /**
         * Specifies whether optional similar search is used or not in correction.
         */
        similar_search?: 'auto' | YesNo
      }
      ret: retMap<SuggestReturnValue>
    }
  }

  interface CommandMap {
    table_copy: {
      opts: CommonOptions & {
        /**
         * Specifies the table name of source table.
         */
        from_name: string
        /**
         * Specifies the destination table name.
         */
        to_name: string
      }
      ret: retMap<true>
    }
  }

  type TableFlags =
    | 'TABLE_NO_KEY'
    | 'TABLE_HASH_KEY'
    | 'TABLE_HASH_KEY|KEY_NORMALIZE'
    | 'TABLE_HASH_KEY|KEY_NORMALIZE|KEY_LARGE'
    | 'TABLE_HASH_KEY|KEY_LARGE'
    | 'TABLE_HASH_KEY|KEY_LARGE|KEY_NORMALIZE'
    | 'TABLE_PAT_KEY'
    | 'TABLE_PAT_KEY|KEY_NORMALIZE'
    | 'TABLE_PAT_KEY|KEY_NORMALIZE|KEY_WITH_SIS'
    | 'TABLE_PAT_KEY|KEY_WITH_SIS'
    | 'TABLE_PAT_KEY|KEY_WITH_SIS|KEY_NORMALIZE'
    | 'TABLE_DAT_KEY'
    | 'TABLE_DAT_KEY|KEY_NORMALIZE'

  interface CommandMap {
    table_create: {
      opts: CommonOptions & {
        /**
         * Specifies a table name to be created. `name` must be specified.
         */
        name: string
        /**
         * Specifies a table type and table customize options.
         */
        flags: CompletionList<TableFlags>
        /**
         * Specifies key type.
         * If you specify `TABLE_HASH_KEY`, `TABLE_PAT_KEY` or `TABLE_DAT_KEY` as `flags` parameter,
         * you need to specify `key_type` option.
         */
        key_type?: CompletionList<KeyDataType>
        /**
         * Specifies value type.
         */
        value_type?: CompletionList<FixedDataType>
        /**
         * Specifies the default tokenizer that is used on searching and data loading.
         */
        default_tokenizer?: CompletionList<Tokenizer>
        /**
         * Specifies a normalizer that is used to normalize key.
         */
        normalizer?: CompletionList<Normalizer>
        /**
         * Specifies token filters separated by `,`. Token filters are used to process tokens.
         */
        token_filters?: CompletionList<TokenFilter>
      }
      ret: retMap<true>
    }
  }

  type TableInformationType = [
    ['id', 'UInt32'],
    ['name', 'ShortText'],
    ['path', 'ShortText'],
    ['flags', 'ShortText'],
    ['domain', 'ShortText'],
    ['range', 'ShortText'],
    ['default_tokenizer', 'ShortText'],
    ['normalizer', 'ShortText']
  ]

  type TableInformation = [number, string, string, string, null | string, null | string, null | string, null | string]

  type TableListReturnValue = [TableInformationType, ...TableInformation[]]

  interface CommandMap {
    table_list: {
      opts: CommonOptions & {
        /**
         * @todo
         */
        prefix?: string
      }
      ret: retMap<TableListReturnValue>
    }
  }

  interface CommandMap {
    table_remove: {
      opts: CommonOptions & {
        /**
         * Specifies the table name to be removed.
         */
        name: string
        /**
         * Specifies whether tables and columns that reference the target table are also removed or not.
         * @since 6.0.1
         */
        dependent?: YesNo
      }
      ret: retMap<true>
    }
  }

  interface CommandMap {
    table_rename: {
      opts: CommonOptions & {
        /**
         * This section describes parameters of `table_rename`.
         */
        name: string
        /**
         * Specifies the new table name.
         */
        new_name: string
      }
      ret: retMap<true>
    }
  }

  type TokenizeFlag = 'NONE' | 'ENABLE_TOKENIZED_DELIMITER'

  type TokenizeFlags = 'NONE' | 'ENABLE_TOKENIZED_DELIMITER' | 'NONE|ENABLE_TOKENIZED_DELIMITER'

  type TokenizeMode = 'ADD' | 'GET'

  interface Token {
    value: string
    position: number
    force_prefix?: boolean
    force_prefix_search?: boolean
    estimated_size?: number
    metadata?: TokenMetadata
    source_offset?: number
    source_length?: number
    source_first_character_length?: number
  }

  interface TokenMetadata {
    class?: string
    subclass0?: string
    subclass1?: string
    subclass2?: string
    inflected_type?: string
    inflected_form?: string
    base_form?: string
    reading?: string
  }

  interface CommandMap {
    table_tokenize: {
      opts: CommonOptions & {
        /**
         * Specifies the lexicon table.
         * `table_tokenize` command uses the tokenizer, the normalizer, the token filters that is set the lexicon table.
         */
        table: string
        /**
         * Specifies any string which you want to tokenize.
         */
        string: string
        /**
         * Specifies a tokenization customize options. You can specify multiple options separated by “`|`”.
         */
        flags?: TokenizeFlag
        /**
         * Specifies a tokenize mode.
         */
        mode?: TokenizeMode
        /**
         * Specifies an index column.
         */
        index_column?: string
      }
      ret: retMap<Array<Token>>
    }
  }

  interface CommandMap {
    thread_limit: {
      opts: CommonOptions & {
        /**
         * Specifies the new max number of threads.
         */
        max?: number
      }
      ret: retMap<number>
    }
  }

  interface CommandMap {
    tokenize: {
      opts: CommonOptions & {
        /**
         * Specifies the tokenizer name. `tokenize` command uses the tokenizer that is named `tokenizer`.
         */
        tokenizer: CompletionList<Tokenizer>
        /**
         * Specifies any string which you want to tokenize.
         */
        string: string
        /**
         * Specifies the normalizer name. `tokenize` command uses the normalizer that is named `normalizer`.
         * Normalizer is important for N-gram family tokenizers such as `TokenBigram`.
         */
        normalizer?: CompletionList<Normalizer>
        /**
         * Specifies a tokenization customize options. You can specify multiple options separated by “`|`”.
         */
        flags?: TokenizeFlag
        /**
         * Specifies a tokenize mode.
         * If the mode is specified `ADD`, the text is tokenized by the rule that adding a document.
         * If the mode is specified `GET`, the text is tokenized by the rule that searching a document.
         */
        mode?: TokenizeMode
        /**
         * Specifies the token filter names. `tokenize` command uses the tokenizer that is named `token_filters`.
         */
        token_filters?: CompletionList<TokenFilter>
      }
      ret: retMap<Array<Token>>
    }
  }

  interface CommandMap {
    tokenizer_list: {
      opts: CommonOptions & {}
      ret: retMap<Array<{ name: string }>>
    }
  }

  interface CommandMap {
    truncate: {
      opts: CommonOptions & {
        /**
         * Specifies the name of table or column.
         */
        target_name: string
      }
      ret: retMap<true>
    }
  }
}
