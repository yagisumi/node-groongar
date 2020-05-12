import { Result, OK, ERR } from './result'
import { createOptions, OptionsMap } from './options'
import { flattenOptions } from './command_utils'
import { suggestCreateDataset } from './suggest_create_dataset'

export { types as Types } from './types'
import { types, CommandOptions } from './types'

import cmd_vers = types.cmd_vers
import opts = types.opts
import ret = types.ret

type CommandCallback = (err: Error | undefined, data: any) => void

export interface GroongaClient {
  command(command: string, options: object, callback: CommandCallback): void
  command(command: string, callback: CommandCallback): void
}

export class Groongar<T extends GroongaClient = GroongaClient> {
  readonly client: T
  private defaultOptions: OptionsMap
  private restrictionAll: CommandOptions
  private restrictions: OptionsMap

  constructor(client: T) {
    this.client = client

    const opts = createOptions()
    this.defaultOptions = opts.defaultOptions
    this.restrictionAll = opts.restrictionAll
    this.restrictions = opts.restrictions
  }

  private mergeOptions(command: keyof types.CommandMap, options?: CommandOptions): CommandOptions {
    return {
      ...this.defaultOptions[command],
      ...options,
      ...this.restrictionAll,
      ...this.restrictions[command],
    }
  }

  suggestCreateDataset(dataset: string): Promise<boolean> {
    return suggestCreateDataset(this, dataset)
  }

  // genarated by npm run tools:groongar
  // <commands>

  /**
   * `cache_limit` gets or sets the max number of query cache entries.
   */
  cacheLimit<V extends cmd_vers = 'default'>(options?: opts<'cache_limit'>): Promise<Result<ret<'cache_limit', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('cache_limit', options)
        this.client.command('cache_limit', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `check` displays the state of the object.
   */
  check<V extends cmd_vers = 'default'>(options: opts<'check'>): Promise<Result<ret<'check', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('check', options)
        this.client.command('check', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `clearlock` releases the lock set on the object.
   * @deprecated Use `lock_clear` instead.
   */
  clearlock<V extends cmd_vers = 'default'>(options: opts<'clearlock'>): Promise<Result<ret<'clearlock', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('clearlock', options)
        this.client.command('clearlock', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `column_copy` copies all column values to other column.
   */
  columnCopy<V extends cmd_vers = 'default'>(options: opts<'column_copy'>): Promise<Result<ret<'column_copy', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('column_copy', options)
        this.client.command('column_copy', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `column_create` creates a new column in a table.
   */
  columnCreate<V extends cmd_vers = 'default'>(
    options: opts<'column_create'>
  ): Promise<Result<ret<'column_create', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('column_create', options)
        this.client.command('column_create', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `column_list` command lists columns in a table.
   */
  columnList<V extends cmd_vers = 'default'>(options: opts<'column_list'>): Promise<Result<ret<'column_list', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('column_list', options)
        this.client.command('column_list', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `column_remove` deletes a column defined in the table.
   */
  columnRemove<V extends cmd_vers = 'default'>(
    options: opts<'column_remove'>
  ): Promise<Result<ret<'column_remove', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('column_remove', options)
        this.client.command('column_remove', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `column_rename` command renames a column.
   */
  columnRename<V extends cmd_vers = 'default'>(
    options: opts<'column_rename'>
  ): Promise<Result<ret<'column_rename', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('column_rename', options)
        this.client.command('column_rename', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `config_delete` command deletes the specified configuration item.
   */
  configDelete<V extends cmd_vers = 'default'>(
    options: opts<'config_delete'>
  ): Promise<Result<ret<'config_delete', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('config_delete', options)
        this.client.command('config_delete', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `config_get` command returns the value of the specified configuration item.
   */
  configGet<V extends cmd_vers = 'default'>(options: opts<'config_get'>): Promise<Result<ret<'config_get', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('config_get', options)
        this.client.command('config_get', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `config_set` command sets a value to the specified configuration item.
   */
  configSet<V extends cmd_vers = 'default'>(options: opts<'config_set'>): Promise<Result<ret<'config_set', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('config_set', options)
        this.client.command('config_set', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `database_unmap` unmaps already mapped tables and columns in the database.
   */
  databaseUnmap<V extends cmd_vers = 'default'>(
    options?: opts<'database_unmap'>
  ): Promise<Result<ret<'database_unmap', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('database_unmap', options)
        this.client.command('database_unmap', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `define_selector` defines a new search command.
   */
  defineSelector<V extends cmd_vers = 'default'>(
    options: opts<'define_selector'>
  ): Promise<Result<ret<'define_selector', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('define_selector', options)
        this.client.command('define_selector', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `defrag` command resolves fragmentation of specified objects.
   */
  defrag<V extends cmd_vers = 'default'>(options?: opts<'defrag'>): Promise<Result<ret<'defrag', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('defrag', options)
        this.client.command('defrag', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `delete` command deletes specified record of table.
   */
  delete<V extends cmd_vers = 'default'>(options: opts<'delete'>): Promise<Result<ret<'delete', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('delete', options)
        this.client.command('delete', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `dump` outputs a schema and data of a database.
   */
  dump<V extends cmd_vers = 'default'>(options?: opts<'dump'>): Promise<Result<ret<'dump', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('dump', options)
        this.client.command('dump', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `io_flush` flushes all changes in memory to disk explicitly.
   */
  ioFlush<V extends cmd_vers = 'default'>(options?: opts<'io_flush'>): Promise<Result<ret<'io_flush', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('io_flush', options)
        this.client.command('io_flush', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * @todo
   */
  indexColumnDiff<V extends cmd_vers = 'default'>(
    options: opts<'index_column_diff'>
  ): Promise<Result<ret<'index_column_diff', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('index_column_diff', options)
        this.client.command('index_column_diff', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `load` loads data as records in the current database and updates values of each columns.
   */
  load<V extends cmd_vers = 'default'>(options: opts<'load'>): Promise<Result<ret<'load', V>>> {
    return new Promise((resolve) => {
      try {
        const flattened: CommandOptions = {}
        flattenOptions(flattened, options)

        const opts = this.mergeOptions('load', flattened)
        this.client.command('load', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `lock_acquire` command acquires the lock of the target object.
   */
  lockAcquire<V extends cmd_vers = 'default'>(options?: opts<'lock_acquire'>): Promise<Result<ret<'lock_acquire', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('lock_acquire', options)
        this.client.command('lock_acquire', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `lock_clear` command clear the lock of the target object recursively.
   */
  lockClear<V extends cmd_vers = 'default'>(options?: opts<'lock_clear'>): Promise<Result<ret<'lock_clear', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('lock_clear', options)
        this.client.command('lock_clear', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `lock_release` command releases the lock of the target object.
   */
  lockRelease<V extends cmd_vers = 'default'>(options?: opts<'lock_release'>): Promise<Result<ret<'lock_release', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('lock_release', options)
        this.client.command('lock_release', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `log_level` command sets log level of Groonga.
   */
  logLevel<V extends cmd_vers = 'default'>(options: opts<'log_level'>): Promise<Result<ret<'log_level', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('log_level', options)
        this.client.command('log_level', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `log_put` outputs a message to the log.
   */
  logPut<V extends cmd_vers = 'default'>(options: opts<'log_put'>): Promise<Result<ret<'log_put', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('log_put', options)
        this.client.command('log_put', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `log_reopen` is a command that reloads log files.
   */
  logReopen<V extends cmd_vers = 'default'>(options?: opts<'log_reopen'>): Promise<Result<ret<'log_reopen', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('log_reopen', options)
        this.client.command('log_reopen', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `logical_count` is a command that has only count feature in logical_select. logical_select searches records from multiple tables, outputs the number of matched records, outputs columns of the matched records and so on.
   */
  logicalCount<V extends cmd_vers = 'default'>(
    options: opts<'logical_count'>
  ): Promise<Result<ret<'logical_count', V>>> {
    return new Promise((resolve) => {
      try {
        const flattened: CommandOptions = {}
        flattenOptions(flattened, options)

        const opts = this.mergeOptions('logical_count', flattened)
        this.client.command('logical_count', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `logical_parameters` is a command for test. Normally, you don’t need to use this command.
   */
  logicalParameters<V extends cmd_vers = 'default'>(
    options?: opts<'logical_parameters'>
  ): Promise<Result<ret<'logical_parameters', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('logical_parameters', options)
        this.client.command('logical_parameters', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `logical_range_filter` is a sharding version of range_filter.
   */
  logicalRangeFilter<V extends cmd_vers = 'default'>(
    options: opts<'logical_range_filter'>
  ): Promise<Result<ret<'logical_range_filter', V>>> {
    return new Promise((resolve) => {
      try {
        const flattened: CommandOptions = {}
        flattenOptions(flattened, options)

        const opts = this.mergeOptions('logical_range_filter', flattened)
        this.client.command('logical_range_filter', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `logical_select` is a sharding version of select.
   */
  logicalSelect<V extends cmd_vers = 'default'>(
    options: opts<'logical_select'>
  ): Promise<Result<ret<'logical_select', V>>> {
    return new Promise((resolve) => {
      try {
        const flattened: CommandOptions = {}
        flattenOptions(flattened, options)

        const opts = this.mergeOptions('logical_select', flattened)
        this.client.command('logical_select', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `logical_shard_list` returns all existing shard names against the specified logical table name.
   */
  logicalShardList<V extends cmd_vers = 'default'>(
    options: opts<'logical_shard_list'>
  ): Promise<Result<ret<'logical_shard_list', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('logical_shard_list', options)
        this.client.command('logical_shard_list', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `logical_table_remove` removes tables and their columns for the specified logical table.
   */
  logicalTableRemove<V extends cmd_vers = 'default'>(
    options: opts<'logical_table_remove'>
  ): Promise<Result<ret<'logical_table_remove', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('logical_table_remove', options)
        this.client.command('logical_table_remove', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `normalize` command normalizes text by the specified normalizer.
   */
  normalize<V extends cmd_vers = 'default'>(options: opts<'normalize'>): Promise<Result<ret<'normalize', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('normalize', options)
        this.client.command('normalize', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `normalizer_list` command lists normalizers in a database.
   */
  normalizerList<V extends cmd_vers = 'default'>(
    options?: opts<'normalizer_list'>
  ): Promise<Result<ret<'normalizer_list', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('normalizer_list', options)
        this.client.command('normalizer_list', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `object_exist` returns whether object with the specified name exists or not in database.
   */
  objectExist<V extends cmd_vers = 'default'>(options: opts<'object_exist'>): Promise<Result<ret<'object_exist', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('object_exist', options)
        this.client.command('object_exist', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `object_inspect` inspects an object. You can confirm details of an object.
   */
  objectInspect<V extends cmd_vers = 'default'>(
    options?: opts<'object_inspect'>
  ): Promise<Result<ret<'object_inspect', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('object_inspect', options)
        this.client.command('object_inspect', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `object_list` lists objects in database.
   */
  objectList<V extends cmd_vers = 'default'>(options?: opts<'object_list'>): Promise<Result<ret<'object_list', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('object_list', options)
        this.client.command('object_list', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `object_remove` removes an object.
   */
  objectRemove<V extends cmd_vers = 'default'>(
    options: opts<'object_remove'>
  ): Promise<Result<ret<'object_remove', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('object_remove', options)
        this.client.command('object_remove', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * @todo
   */
  objectSetVisibility<V extends cmd_vers = 'default'>(
    options: opts<'object_set_visibility'>
  ): Promise<Result<ret<'object_set_visibility', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('object_set_visibility', options)
        this.client.command('object_set_visibility', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `plugin_register` command registers a plugin.
   */
  pluginRegister<V extends cmd_vers = 'default'>(
    options: opts<'plugin_register'>
  ): Promise<Result<ret<'plugin_register', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('plugin_register', options)
        this.client.command('plugin_register', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `plugin_unregister` command unregisters a plugin.
   */
  pluginUnregister<V extends cmd_vers = 'default'>(
    options: opts<'plugin_unregister'>
  ): Promise<Result<ret<'plugin_unregister', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('plugin_unregister', options)
        this.client.command('plugin_unregister', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * @todo
   */
  queryExpand<V extends cmd_vers = 'default'>(options: opts<'query_expand'>): Promise<Result<ret<'query_expand', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('query_expand', options)
        this.client.command('query_expand', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `quit` ends the session.
   */
  quit<V extends cmd_vers = 'default'>(options?: opts<'quit'>): Promise<Result<ret<'quit', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('quit', options)
        this.client.command('quit', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * @todo
   */
  queryLogFlagsAdd<V extends cmd_vers = 'default'>(
    options: opts<'query_log_flags_add'>
  ): Promise<Result<ret<'query_log_flags_add', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('query_log_flags_add', options)
        this.client.command('query_log_flags_add', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * @todo
   */
  queryLogFlagsGet<V extends cmd_vers = 'default'>(
    options?: opts<'query_log_flags_get'>
  ): Promise<Result<ret<'query_log_flags_get', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('query_log_flags_get', options)
        this.client.command('query_log_flags_get', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * @todo
   */
  queryLogFlagsRemove<V extends cmd_vers = 'default'>(
    options: opts<'query_log_flags_remove'>
  ): Promise<Result<ret<'query_log_flags_remove', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('query_log_flags_remove', options)
        this.client.command('query_log_flags_remove', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * @todo
   */
  queryLogFlagsSet<V extends cmd_vers = 'default'>(
    options: opts<'query_log_flags_set'>
  ): Promise<Result<ret<'query_log_flags_set', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('query_log_flags_set', options)
        this.client.command('query_log_flags_set', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * @todo
   */
  rangeFilter<V extends cmd_vers = 'default'>(options: opts<'range_filter'>): Promise<Result<ret<'range_filter', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('range_filter', options)
        this.client.command('range_filter', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * @deprecated Use `plugin_register` instead.
   */
  register<V extends cmd_vers = 'default'>(options: opts<'register'>): Promise<Result<ret<'register', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('register', options)
        this.client.command('register', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `reindex` command recreates one or more index columns.
   */
  reindex<V extends cmd_vers = 'default'>(options?: opts<'reindex'>): Promise<Result<ret<'reindex', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('reindex', options)
        this.client.command('reindex', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `request_cancel` command cancels a running request.
   */
  requestCancel<V extends cmd_vers = 'default'>(
    options: opts<'request_cancel'>
  ): Promise<Result<ret<'request_cancel', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('request_cancel', options)
        this.client.command('request_cancel', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `ruby_eval` command evaluates Ruby script and returns the result.
   */
  rubyEval<V extends cmd_vers = 'default'>(options: opts<'ruby_eval'>): Promise<Result<ret<'ruby_eval', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('ruby_eval', options)
        this.client.command('ruby_eval', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `schema` command returns schema in the database.
   */
  schema<V extends cmd_vers = 'default'>(options?: opts<'schema'>): Promise<Result<ret<'schema', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('schema', options)
        this.client.command('schema', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `select` searches records that are matched to specified conditions from a table and then outputs them.
   */
  select<V extends cmd_vers = 'default'>(options: opts<'select'>): Promise<Result<ret<'select', V>>> {
    return new Promise((resolve) => {
      try {
        const flattened: CommandOptions = {}
        flattenOptions(flattened, options)

        const opts = this.mergeOptions('select', flattened)
        this.client.command('select', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `shutdown` stops the Groonga server process.
   */
  shutdown<V extends cmd_vers = 'default'>(options?: opts<'shutdown'>): Promise<Result<ret<'shutdown', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('shutdown', options)
        this.client.command('shutdown', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `status` returns the current status of the context that processes the request.
   */
  status<V extends cmd_vers = 'default'>(options?: opts<'status'>): Promise<Result<ret<'status', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('status', options)
        this.client.command('status', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * suggest returns completion, correction and/or suggestion for a query.
   */
  suggest<V extends cmd_vers = 'default'>(options: opts<'suggest'>): Promise<Result<ret<'suggest', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('suggest', options)
        this.client.command('suggest', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `table_copy` copies a table.
   */
  tableCopy<V extends cmd_vers = 'default'>(options: opts<'table_copy'>): Promise<Result<ret<'table_copy', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('table_copy', options)
        this.client.command('table_copy', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `table_create` creates a new table in the current database.
   */
  tableCreate<V extends cmd_vers = 'default'>(options: opts<'table_create'>): Promise<Result<ret<'table_create', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('table_create', options)
        this.client.command('table_create', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `table_list` lists the tables defined in the current database.
   */
  tableList<V extends cmd_vers = 'default'>(options?: opts<'table_list'>): Promise<Result<ret<'table_list', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('table_list', options)
        this.client.command('table_list', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `table_remove` removes a table and its columns.
   */
  tableRemove<V extends cmd_vers = 'default'>(options: opts<'table_remove'>): Promise<Result<ret<'table_remove', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('table_remove', options)
        this.client.command('table_remove', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `table_rename` command renames a table.
   */
  tableRename<V extends cmd_vers = 'default'>(options: opts<'table_rename'>): Promise<Result<ret<'table_rename', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('table_rename', options)
        this.client.command('table_rename', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `table_tokenize` command tokenizes text by the specified table’s tokenizer.
   */
  tableTokenize<V extends cmd_vers = 'default'>(
    options: opts<'table_tokenize'>
  ): Promise<Result<ret<'table_tokenize', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('table_tokenize', options)
        this.client.command('table_tokenize', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * Not Implemented.
   */
  threadLimit<V extends cmd_vers = 'default'>(options?: opts<'thread_limit'>): Promise<Result<ret<'thread_limit', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('thread_limit', options)
        this.client.command('thread_limit', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `tokenize` command tokenizes text by the specified tokenizer.
   */
  tokenize<V extends cmd_vers = 'default'>(options: opts<'tokenize'>): Promise<Result<ret<'tokenize', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('tokenize', options)
        this.client.command('tokenize', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `tokenizer_list` command lists tokenizers in a database.
   */
  tokenizerList<V extends cmd_vers = 'default'>(
    options?: opts<'tokenizer_list'>
  ): Promise<Result<ret<'tokenizer_list', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('tokenizer_list', options)
        this.client.command('tokenizer_list', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  /**
   * `truncate` command deletes all records from specified table or all values from specified column.
   */
  truncate<V extends cmd_vers = 'default'>(options: opts<'truncate'>): Promise<Result<ret<'truncate', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('truncate', options)
        this.client.command('truncate', opts, (err, data) => {
          if (err) {
            resolve(ERR(err))
          } else {
            resolve(OK(data))
          }
        })
      } catch (err) {
        resolve(ERR(err))
      }
    })
  }

  // </commands>
}

export function createGroongar<T extends GroongaClient>(client: T) {
  return new Groongar(client)
}
