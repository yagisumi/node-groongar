import { Result, OK, ERR } from './result'
import { createOptions, OptionsMap } from './options'
import { flattenOptions } from './command_utils'
import { suggestCreateDataset } from './suggest_create_dataset'

export { types as Types } from './types'
import { types, CommandOptions } from './types'

import opts = types.opts
import ret = types.ret
import CommandVersion = types.CommandVersion

type CommandCallback = (err: Error | undefined, data: any) => void

export interface GroongaClient {
  command(command: string, options: object, callback: CommandCallback): void
  command(command: string, callback: CommandCallback): void
}

export class Groongar<T extends GroongaClient = GroongaClient> {
  readonly client: T
  private defaultOptionBase: CommandOptions
  private defaultOptionMap: OptionsMap
  private overwriteOptionBase: CommandOptions
  private overwriteOptionMap: OptionsMap

  constructor(client: T) {
    this.client = client

    const opts = createOptions()
    this.defaultOptionBase = opts.defaultOptionBase
    this.defaultOptionMap = opts.defaultOptionMap
    this.overwriteOptionBase = opts.overwriteOptionBase
    this.overwriteOptionMap = opts.overwriteOptionMap
  }

  protected mergeOptions(command: keyof types.CommandMap, options?: CommandOptions): CommandOptions {
    return {
      ...(this.defaultOptionMap[command] ?? this.defaultOptionBase),
      ...options,
      ...(this.overwriteOptionMap[command] ?? this.overwriteOptionBase),
    }
  }

  suggestCreateDataset(dataset: string): Promise<Result<boolean>> {
    return suggestCreateDataset(this, dataset)
  }

  // genarated by npm run tools:groongar
  // <commands>

  /**
   * `cache_limit` gets or sets the max number of query cache entries.
   */
  cacheLimit<V extends 1 | 2 | 3>(
    options?: opts<'cache_limit'> & CommandVersion<V>
  ): Promise<Result<ret<'cache_limit', V>>>
  cacheLimit<V extends 1 | 2 | 3 = 1>(options?: opts<'cache_limit'>): Promise<Result<ret<'cache_limit', V>>>
  cacheLimit<V extends 1 | 2 | 3>(
    options?: opts<'cache_limit'> | (opts<'cache_limit'> & CommandVersion<V>)
  ): Promise<Result<ret<'cache_limit', V>>> {
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
  check<V extends 1 | 2 | 3>(options: opts<'check'> & CommandVersion<V>): Promise<Result<ret<'check', V>>>
  check<V extends 1 | 2 | 3 = 1>(options: opts<'check'>): Promise<Result<ret<'check', V>>>
  check<V extends 1 | 2 | 3>(
    options: opts<'check'> | (opts<'check'> & CommandVersion<V>)
  ): Promise<Result<ret<'check', V>>> {
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
  clearlock<V extends 1 | 2 | 3>(options: opts<'clearlock'> & CommandVersion<V>): Promise<Result<ret<'clearlock', V>>>
  clearlock<V extends 1 | 2 | 3 = 1>(options: opts<'clearlock'>): Promise<Result<ret<'clearlock', V>>>
  clearlock<V extends 1 | 2 | 3>(
    options: opts<'clearlock'> | (opts<'clearlock'> & CommandVersion<V>)
  ): Promise<Result<ret<'clearlock', V>>> {
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
  columnCopy<V extends 1 | 2 | 3>(
    options: opts<'column_copy'> & CommandVersion<V>
  ): Promise<Result<ret<'column_copy', V>>>
  columnCopy<V extends 1 | 2 | 3 = 1>(options: opts<'column_copy'>): Promise<Result<ret<'column_copy', V>>>
  columnCopy<V extends 1 | 2 | 3>(
    options: opts<'column_copy'> | (opts<'column_copy'> & CommandVersion<V>)
  ): Promise<Result<ret<'column_copy', V>>> {
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
  columnCreate<V extends 1 | 2 | 3>(
    options: opts<'column_create'> & CommandVersion<V>
  ): Promise<Result<ret<'column_create', V>>>
  columnCreate<V extends 1 | 2 | 3 = 1>(options: opts<'column_create'>): Promise<Result<ret<'column_create', V>>>
  columnCreate<V extends 1 | 2 | 3>(
    options: opts<'column_create'> | (opts<'column_create'> & CommandVersion<V>)
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
  columnList<V extends 1 | 2 | 3>(
    options: opts<'column_list'> & CommandVersion<V>
  ): Promise<Result<ret<'column_list', V>>>
  columnList<V extends 1 | 2 | 3 = 1>(options: opts<'column_list'>): Promise<Result<ret<'column_list', V>>>
  columnList<V extends 1 | 2 | 3>(
    options: opts<'column_list'> | (opts<'column_list'> & CommandVersion<V>)
  ): Promise<Result<ret<'column_list', V>>> {
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
  columnRemove<V extends 1 | 2 | 3>(
    options: opts<'column_remove'> & CommandVersion<V>
  ): Promise<Result<ret<'column_remove', V>>>
  columnRemove<V extends 1 | 2 | 3 = 1>(options: opts<'column_remove'>): Promise<Result<ret<'column_remove', V>>>
  columnRemove<V extends 1 | 2 | 3>(
    options: opts<'column_remove'> | (opts<'column_remove'> & CommandVersion<V>)
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
  columnRename<V extends 1 | 2 | 3>(
    options: opts<'column_rename'> & CommandVersion<V>
  ): Promise<Result<ret<'column_rename', V>>>
  columnRename<V extends 1 | 2 | 3 = 1>(options: opts<'column_rename'>): Promise<Result<ret<'column_rename', V>>>
  columnRename<V extends 1 | 2 | 3>(
    options: opts<'column_rename'> | (opts<'column_rename'> & CommandVersion<V>)
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
  configDelete<V extends 1 | 2 | 3>(
    options: opts<'config_delete'> & CommandVersion<V>
  ): Promise<Result<ret<'config_delete', V>>>
  configDelete<V extends 1 | 2 | 3 = 1>(options: opts<'config_delete'>): Promise<Result<ret<'config_delete', V>>>
  configDelete<V extends 1 | 2 | 3>(
    options: opts<'config_delete'> | (opts<'config_delete'> & CommandVersion<V>)
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
  configGet<V extends 1 | 2 | 3>(options: opts<'config_get'> & CommandVersion<V>): Promise<Result<ret<'config_get', V>>>
  configGet<V extends 1 | 2 | 3 = 1>(options: opts<'config_get'>): Promise<Result<ret<'config_get', V>>>
  configGet<V extends 1 | 2 | 3>(
    options: opts<'config_get'> | (opts<'config_get'> & CommandVersion<V>)
  ): Promise<Result<ret<'config_get', V>>> {
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
  configSet<V extends 1 | 2 | 3>(options: opts<'config_set'> & CommandVersion<V>): Promise<Result<ret<'config_set', V>>>
  configSet<V extends 1 | 2 | 3 = 1>(options: opts<'config_set'>): Promise<Result<ret<'config_set', V>>>
  configSet<V extends 1 | 2 | 3>(
    options: opts<'config_set'> | (opts<'config_set'> & CommandVersion<V>)
  ): Promise<Result<ret<'config_set', V>>> {
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
  databaseUnmap<V extends 1 | 2 | 3>(
    options?: opts<'database_unmap'> & CommandVersion<V>
  ): Promise<Result<ret<'database_unmap', V>>>
  databaseUnmap<V extends 1 | 2 | 3 = 1>(options?: opts<'database_unmap'>): Promise<Result<ret<'database_unmap', V>>>
  databaseUnmap<V extends 1 | 2 | 3>(
    options?: opts<'database_unmap'> | (opts<'database_unmap'> & CommandVersion<V>)
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
  defineSelector<V extends 1 | 2 | 3>(
    options: opts<'define_selector'> & CommandVersion<V>
  ): Promise<Result<ret<'define_selector', V>>>
  defineSelector<V extends 1 | 2 | 3 = 1>(options: opts<'define_selector'>): Promise<Result<ret<'define_selector', V>>>
  defineSelector<V extends 1 | 2 | 3>(
    options: opts<'define_selector'> | (opts<'define_selector'> & CommandVersion<V>)
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
  defrag<V extends 1 | 2 | 3>(options?: opts<'defrag'> & CommandVersion<V>): Promise<Result<ret<'defrag', V>>>
  defrag<V extends 1 | 2 | 3 = 1>(options?: opts<'defrag'>): Promise<Result<ret<'defrag', V>>>
  defrag<V extends 1 | 2 | 3>(
    options?: opts<'defrag'> | (opts<'defrag'> & CommandVersion<V>)
  ): Promise<Result<ret<'defrag', V>>> {
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
  delete<V extends 1 | 2 | 3>(options: opts<'delete'> & CommandVersion<V>): Promise<Result<ret<'delete', V>>>
  delete<V extends 1 | 2 | 3 = 1>(options: opts<'delete'>): Promise<Result<ret<'delete', V>>>
  delete<V extends 1 | 2 | 3>(
    options: opts<'delete'> | (opts<'delete'> & CommandVersion<V>)
  ): Promise<Result<ret<'delete', V>>> {
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
  dump<V extends 1 | 2 | 3>(options?: opts<'dump'> & CommandVersion<V>): Promise<Result<ret<'dump', V>>>
  dump<V extends 1 | 2 | 3 = 1>(options?: opts<'dump'>): Promise<Result<ret<'dump', V>>>
  dump<V extends 1 | 2 | 3>(
    options?: opts<'dump'> | (opts<'dump'> & CommandVersion<V>)
  ): Promise<Result<ret<'dump', V>>> {
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
  ioFlush<V extends 1 | 2 | 3>(options?: opts<'io_flush'> & CommandVersion<V>): Promise<Result<ret<'io_flush', V>>>
  ioFlush<V extends 1 | 2 | 3 = 1>(options?: opts<'io_flush'>): Promise<Result<ret<'io_flush', V>>>
  ioFlush<V extends 1 | 2 | 3>(
    options?: opts<'io_flush'> | (opts<'io_flush'> & CommandVersion<V>)
  ): Promise<Result<ret<'io_flush', V>>> {
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
  indexColumnDiff<V extends 1 | 2 | 3>(
    options: opts<'index_column_diff'> & CommandVersion<V>
  ): Promise<Result<ret<'index_column_diff', V>>>
  indexColumnDiff<V extends 1 | 2 | 3 = 1>(
    options: opts<'index_column_diff'>
  ): Promise<Result<ret<'index_column_diff', V>>>
  indexColumnDiff<V extends 1 | 2 | 3>(
    options: opts<'index_column_diff'> | (opts<'index_column_diff'> & CommandVersion<V>)
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
  load<V extends 1 | 2 | 3>(options: opts<'load'> & CommandVersion<V>): Promise<Result<ret<'load', V>>>
  load<V extends 1 | 2 | 3 = 3>(options: opts<'load'>): Promise<Result<ret<'load', V>>>
  load<V extends 1 | 2 | 3>(
    options: opts<'load'> | (opts<'load'> & CommandVersion<V>)
  ): Promise<Result<ret<'load', V>>> {
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
  lockAcquire<V extends 1 | 2 | 3>(
    options?: opts<'lock_acquire'> & CommandVersion<V>
  ): Promise<Result<ret<'lock_acquire', V>>>
  lockAcquire<V extends 1 | 2 | 3 = 1>(options?: opts<'lock_acquire'>): Promise<Result<ret<'lock_acquire', V>>>
  lockAcquire<V extends 1 | 2 | 3>(
    options?: opts<'lock_acquire'> | (opts<'lock_acquire'> & CommandVersion<V>)
  ): Promise<Result<ret<'lock_acquire', V>>> {
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
  lockClear<V extends 1 | 2 | 3>(
    options?: opts<'lock_clear'> & CommandVersion<V>
  ): Promise<Result<ret<'lock_clear', V>>>
  lockClear<V extends 1 | 2 | 3 = 1>(options?: opts<'lock_clear'>): Promise<Result<ret<'lock_clear', V>>>
  lockClear<V extends 1 | 2 | 3>(
    options?: opts<'lock_clear'> | (opts<'lock_clear'> & CommandVersion<V>)
  ): Promise<Result<ret<'lock_clear', V>>> {
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
  lockRelease<V extends 1 | 2 | 3>(
    options?: opts<'lock_release'> & CommandVersion<V>
  ): Promise<Result<ret<'lock_release', V>>>
  lockRelease<V extends 1 | 2 | 3 = 1>(options?: opts<'lock_release'>): Promise<Result<ret<'lock_release', V>>>
  lockRelease<V extends 1 | 2 | 3>(
    options?: opts<'lock_release'> | (opts<'lock_release'> & CommandVersion<V>)
  ): Promise<Result<ret<'lock_release', V>>> {
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
  logLevel<V extends 1 | 2 | 3>(options: opts<'log_level'> & CommandVersion<V>): Promise<Result<ret<'log_level', V>>>
  logLevel<V extends 1 | 2 | 3 = 1>(options: opts<'log_level'>): Promise<Result<ret<'log_level', V>>>
  logLevel<V extends 1 | 2 | 3>(
    options: opts<'log_level'> | (opts<'log_level'> & CommandVersion<V>)
  ): Promise<Result<ret<'log_level', V>>> {
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
  logPut<V extends 1 | 2 | 3>(options: opts<'log_put'> & CommandVersion<V>): Promise<Result<ret<'log_put', V>>>
  logPut<V extends 1 | 2 | 3 = 1>(options: opts<'log_put'>): Promise<Result<ret<'log_put', V>>>
  logPut<V extends 1 | 2 | 3>(
    options: opts<'log_put'> | (opts<'log_put'> & CommandVersion<V>)
  ): Promise<Result<ret<'log_put', V>>> {
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
  logReopen<V extends 1 | 2 | 3>(
    options?: opts<'log_reopen'> & CommandVersion<V>
  ): Promise<Result<ret<'log_reopen', V>>>
  logReopen<V extends 1 | 2 | 3 = 1>(options?: opts<'log_reopen'>): Promise<Result<ret<'log_reopen', V>>>
  logReopen<V extends 1 | 2 | 3>(
    options?: opts<'log_reopen'> | (opts<'log_reopen'> & CommandVersion<V>)
  ): Promise<Result<ret<'log_reopen', V>>> {
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
  logicalCount<V extends 1 | 2 | 3>(
    options: opts<'logical_count'> & CommandVersion<V>
  ): Promise<Result<ret<'logical_count', V>>>
  logicalCount<V extends 1 | 2 | 3 = 1>(options: opts<'logical_count'>): Promise<Result<ret<'logical_count', V>>>
  logicalCount<V extends 1 | 2 | 3>(
    options: opts<'logical_count'> | (opts<'logical_count'> & CommandVersion<V>)
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
  logicalParameters<V extends 1 | 2 | 3>(
    options?: opts<'logical_parameters'> & CommandVersion<V>
  ): Promise<Result<ret<'logical_parameters', V>>>
  logicalParameters<V extends 1 | 2 | 3 = 1>(
    options?: opts<'logical_parameters'>
  ): Promise<Result<ret<'logical_parameters', V>>>
  logicalParameters<V extends 1 | 2 | 3>(
    options?: opts<'logical_parameters'> | (opts<'logical_parameters'> & CommandVersion<V>)
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
  logicalRangeFilter<V extends 2>(
    options: opts<'logical_range_filter'> & CommandVersion<V>
  ): Promise<Result<ret<'logical_range_filter', V>>>
  logicalRangeFilter<V extends 2 = 2>(
    options: opts<'logical_range_filter'>
  ): Promise<Result<ret<'logical_range_filter', V>>>
  logicalRangeFilter<V extends 2>(
    options: opts<'logical_range_filter'> | (opts<'logical_range_filter'> & CommandVersion<V>)
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
  logicalSelect<V extends 2>(
    options: opts<'logical_select'> & CommandVersion<V>
  ): Promise<Result<ret<'logical_select', V>>>
  logicalSelect<V extends 2 = 2>(options: opts<'logical_select'>): Promise<Result<ret<'logical_select', V>>>
  logicalSelect<V extends 2>(
    options: opts<'logical_select'> | (opts<'logical_select'> & CommandVersion<V>)
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
  logicalShardList<V extends 1 | 2 | 3>(
    options: opts<'logical_shard_list'> & CommandVersion<V>
  ): Promise<Result<ret<'logical_shard_list', V>>>
  logicalShardList<V extends 1 | 2 | 3 = 1>(
    options: opts<'logical_shard_list'>
  ): Promise<Result<ret<'logical_shard_list', V>>>
  logicalShardList<V extends 1 | 2 | 3>(
    options: opts<'logical_shard_list'> | (opts<'logical_shard_list'> & CommandVersion<V>)
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
  logicalTableRemove<V extends 1 | 2 | 3>(
    options: opts<'logical_table_remove'> & CommandVersion<V>
  ): Promise<Result<ret<'logical_table_remove', V>>>
  logicalTableRemove<V extends 1 | 2 | 3 = 1>(
    options: opts<'logical_table_remove'>
  ): Promise<Result<ret<'logical_table_remove', V>>>
  logicalTableRemove<V extends 1 | 2 | 3>(
    options: opts<'logical_table_remove'> | (opts<'logical_table_remove'> & CommandVersion<V>)
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
  normalize<V extends 1 | 2 | 3>(options: opts<'normalize'> & CommandVersion<V>): Promise<Result<ret<'normalize', V>>>
  normalize<V extends 1 | 2 | 3 = 1>(options: opts<'normalize'>): Promise<Result<ret<'normalize', V>>>
  normalize<V extends 1 | 2 | 3>(
    options: opts<'normalize'> | (opts<'normalize'> & CommandVersion<V>)
  ): Promise<Result<ret<'normalize', V>>> {
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
  normalizerList<V extends 1 | 2 | 3>(
    options?: opts<'normalizer_list'> & CommandVersion<V>
  ): Promise<Result<ret<'normalizer_list', V>>>
  normalizerList<V extends 1 | 2 | 3 = 1>(options?: opts<'normalizer_list'>): Promise<Result<ret<'normalizer_list', V>>>
  normalizerList<V extends 1 | 2 | 3>(
    options?: opts<'normalizer_list'> | (opts<'normalizer_list'> & CommandVersion<V>)
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
  objectExist<V extends 1 | 2 | 3>(
    options: opts<'object_exist'> & CommandVersion<V>
  ): Promise<Result<ret<'object_exist', V>>>
  objectExist<V extends 1 | 2 | 3 = 1>(options: opts<'object_exist'>): Promise<Result<ret<'object_exist', V>>>
  objectExist<V extends 1 | 2 | 3>(
    options: opts<'object_exist'> | (opts<'object_exist'> & CommandVersion<V>)
  ): Promise<Result<ret<'object_exist', V>>> {
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
  objectInspect<V extends 1 | 2 | 3>(
    options?: opts<'object_inspect'> & CommandVersion<V>
  ): Promise<Result<ret<'object_inspect', V>>>
  objectInspect<V extends 1 | 2 | 3 = 1>(options?: opts<'object_inspect'>): Promise<Result<ret<'object_inspect', V>>>
  objectInspect<V extends 1 | 2 | 3>(
    options?: opts<'object_inspect'> | (opts<'object_inspect'> & CommandVersion<V>)
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
  objectList<V extends 1 | 2 | 3>(
    options?: opts<'object_list'> & CommandVersion<V>
  ): Promise<Result<ret<'object_list', V>>>
  objectList<V extends 1 | 2 | 3 = 1>(options?: opts<'object_list'>): Promise<Result<ret<'object_list', V>>>
  objectList<V extends 1 | 2 | 3>(
    options?: opts<'object_list'> | (opts<'object_list'> & CommandVersion<V>)
  ): Promise<Result<ret<'object_list', V>>> {
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
  objectRemove<V extends 1 | 2 | 3>(
    options: opts<'object_remove'> & CommandVersion<V>
  ): Promise<Result<ret<'object_remove', V>>>
  objectRemove<V extends 1 | 2 | 3 = 1>(options: opts<'object_remove'>): Promise<Result<ret<'object_remove', V>>>
  objectRemove<V extends 1 | 2 | 3>(
    options: opts<'object_remove'> | (opts<'object_remove'> & CommandVersion<V>)
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
  objectSetVisibility<V extends 1 | 2 | 3>(
    options: opts<'object_set_visibility'> & CommandVersion<V>
  ): Promise<Result<ret<'object_set_visibility', V>>>
  objectSetVisibility<V extends 1 | 2 | 3 = 1>(
    options: opts<'object_set_visibility'>
  ): Promise<Result<ret<'object_set_visibility', V>>>
  objectSetVisibility<V extends 1 | 2 | 3>(
    options: opts<'object_set_visibility'> | (opts<'object_set_visibility'> & CommandVersion<V>)
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
  pluginRegister<V extends 1 | 2 | 3>(
    options: opts<'plugin_register'> & CommandVersion<V>
  ): Promise<Result<ret<'plugin_register', V>>>
  pluginRegister<V extends 1 | 2 | 3 = 1>(options: opts<'plugin_register'>): Promise<Result<ret<'plugin_register', V>>>
  pluginRegister<V extends 1 | 2 | 3>(
    options: opts<'plugin_register'> | (opts<'plugin_register'> & CommandVersion<V>)
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
  pluginUnregister<V extends 1 | 2 | 3>(
    options: opts<'plugin_unregister'> & CommandVersion<V>
  ): Promise<Result<ret<'plugin_unregister', V>>>
  pluginUnregister<V extends 1 | 2 | 3 = 1>(
    options: opts<'plugin_unregister'>
  ): Promise<Result<ret<'plugin_unregister', V>>>
  pluginUnregister<V extends 1 | 2 | 3>(
    options: opts<'plugin_unregister'> | (opts<'plugin_unregister'> & CommandVersion<V>)
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
  queryExpand<V extends 1 | 2 | 3>(
    options: opts<'query_expand'> & CommandVersion<V>
  ): Promise<Result<ret<'query_expand', V>>>
  queryExpand<V extends 1 | 2 | 3 = 1>(options: opts<'query_expand'>): Promise<Result<ret<'query_expand', V>>>
  queryExpand<V extends 1 | 2 | 3>(
    options: opts<'query_expand'> | (opts<'query_expand'> & CommandVersion<V>)
  ): Promise<Result<ret<'query_expand', V>>> {
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
  quit<V extends 1 | 2 | 3>(options?: opts<'quit'> & CommandVersion<V>): Promise<Result<ret<'quit', V>>>
  quit<V extends 1 | 2 | 3 = 1>(options?: opts<'quit'>): Promise<Result<ret<'quit', V>>>
  quit<V extends 1 | 2 | 3>(
    options?: opts<'quit'> | (opts<'quit'> & CommandVersion<V>)
  ): Promise<Result<ret<'quit', V>>> {
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
  queryLogFlagsAdd<V extends 1 | 2 | 3>(
    options: opts<'query_log_flags_add'> & CommandVersion<V>
  ): Promise<Result<ret<'query_log_flags_add', V>>>
  queryLogFlagsAdd<V extends 1 | 2 | 3 = 1>(
    options: opts<'query_log_flags_add'>
  ): Promise<Result<ret<'query_log_flags_add', V>>>
  queryLogFlagsAdd<V extends 1 | 2 | 3>(
    options: opts<'query_log_flags_add'> | (opts<'query_log_flags_add'> & CommandVersion<V>)
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
  queryLogFlagsGet<V extends 1 | 2 | 3>(
    options?: opts<'query_log_flags_get'> & CommandVersion<V>
  ): Promise<Result<ret<'query_log_flags_get', V>>>
  queryLogFlagsGet<V extends 1 | 2 | 3 = 1>(
    options?: opts<'query_log_flags_get'>
  ): Promise<Result<ret<'query_log_flags_get', V>>>
  queryLogFlagsGet<V extends 1 | 2 | 3>(
    options?: opts<'query_log_flags_get'> | (opts<'query_log_flags_get'> & CommandVersion<V>)
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
  queryLogFlagsRemove<V extends 1 | 2 | 3>(
    options: opts<'query_log_flags_remove'> & CommandVersion<V>
  ): Promise<Result<ret<'query_log_flags_remove', V>>>
  queryLogFlagsRemove<V extends 1 | 2 | 3 = 1>(
    options: opts<'query_log_flags_remove'>
  ): Promise<Result<ret<'query_log_flags_remove', V>>>
  queryLogFlagsRemove<V extends 1 | 2 | 3>(
    options: opts<'query_log_flags_remove'> | (opts<'query_log_flags_remove'> & CommandVersion<V>)
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
  queryLogFlagsSet<V extends 1 | 2 | 3>(
    options: opts<'query_log_flags_set'> & CommandVersion<V>
  ): Promise<Result<ret<'query_log_flags_set', V>>>
  queryLogFlagsSet<V extends 1 | 2 | 3 = 1>(
    options: opts<'query_log_flags_set'>
  ): Promise<Result<ret<'query_log_flags_set', V>>>
  queryLogFlagsSet<V extends 1 | 2 | 3>(
    options: opts<'query_log_flags_set'> | (opts<'query_log_flags_set'> & CommandVersion<V>)
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
  rangeFilter<V extends 1 | 2 | 3>(
    options: opts<'range_filter'> & CommandVersion<V>
  ): Promise<Result<ret<'range_filter', V>>>
  rangeFilter<V extends 1 | 2 | 3 = 3>(options: opts<'range_filter'>): Promise<Result<ret<'range_filter', V>>>
  rangeFilter<V extends 1 | 2 | 3>(
    options: opts<'range_filter'> | (opts<'range_filter'> & CommandVersion<V>)
  ): Promise<Result<ret<'range_filter', V>>> {
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
  register<V extends 1 | 2 | 3>(options: opts<'register'> & CommandVersion<V>): Promise<Result<ret<'register', V>>>
  register<V extends 1 | 2 | 3 = 1>(options: opts<'register'>): Promise<Result<ret<'register', V>>>
  register<V extends 1 | 2 | 3>(
    options: opts<'register'> | (opts<'register'> & CommandVersion<V>)
  ): Promise<Result<ret<'register', V>>> {
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
  reindex<V extends 1 | 2 | 3>(options?: opts<'reindex'> & CommandVersion<V>): Promise<Result<ret<'reindex', V>>>
  reindex<V extends 1 | 2 | 3 = 1>(options?: opts<'reindex'>): Promise<Result<ret<'reindex', V>>>
  reindex<V extends 1 | 2 | 3>(
    options?: opts<'reindex'> | (opts<'reindex'> & CommandVersion<V>)
  ): Promise<Result<ret<'reindex', V>>> {
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
  requestCancel<V extends 1 | 2 | 3>(
    options: opts<'request_cancel'> & CommandVersion<V>
  ): Promise<Result<ret<'request_cancel', V>>>
  requestCancel<V extends 1 | 2 | 3 = 1>(options: opts<'request_cancel'>): Promise<Result<ret<'request_cancel', V>>>
  requestCancel<V extends 1 | 2 | 3>(
    options: opts<'request_cancel'> | (opts<'request_cancel'> & CommandVersion<V>)
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
  rubyEval<V extends 1 | 2 | 3>(options: opts<'ruby_eval'> & CommandVersion<V>): Promise<Result<ret<'ruby_eval', V>>>
  rubyEval<V extends 1 | 2 | 3 = 1>(options: opts<'ruby_eval'>): Promise<Result<ret<'ruby_eval', V>>>
  rubyEval<V extends 1 | 2 | 3>(
    options: opts<'ruby_eval'> | (opts<'ruby_eval'> & CommandVersion<V>)
  ): Promise<Result<ret<'ruby_eval', V>>> {
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
  schema<V extends 1 | 2 | 3>(options?: opts<'schema'> & CommandVersion<V>): Promise<Result<ret<'schema', V>>>
  schema<V extends 1 | 2 | 3 = 1>(options?: opts<'schema'>): Promise<Result<ret<'schema', V>>>
  schema<V extends 1 | 2 | 3>(
    options?: opts<'schema'> | (opts<'schema'> & CommandVersion<V>)
  ): Promise<Result<ret<'schema', V>>> {
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
  select<V extends 1 | 2 | 3>(options: opts<'select'> & CommandVersion<V>): Promise<Result<ret<'select', V>>>
  select<V extends 1 | 2 | 3 = 3>(options: opts<'select'>): Promise<Result<ret<'select', V>>>
  select<V extends 1 | 2 | 3>(
    options: opts<'select'> | (opts<'select'> & CommandVersion<V>)
  ): Promise<Result<ret<'select', V>>> {
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
  shutdown<V extends 1 | 2 | 3>(options?: opts<'shutdown'> & CommandVersion<V>): Promise<Result<ret<'shutdown', V>>>
  shutdown<V extends 1 | 2 | 3 = 1>(options?: opts<'shutdown'>): Promise<Result<ret<'shutdown', V>>>
  shutdown<V extends 1 | 2 | 3>(
    options?: opts<'shutdown'> | (opts<'shutdown'> & CommandVersion<V>)
  ): Promise<Result<ret<'shutdown', V>>> {
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
  status<V extends 1 | 2 | 3>(options?: opts<'status'> & CommandVersion<V>): Promise<Result<ret<'status', V>>>
  status<V extends 1 | 2 | 3 = 1>(options?: opts<'status'>): Promise<Result<ret<'status', V>>>
  status<V extends 1 | 2 | 3>(
    options?: opts<'status'> | (opts<'status'> & CommandVersion<V>)
  ): Promise<Result<ret<'status', V>>> {
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
  suggest<V extends 1 | 2 | 3>(options: opts<'suggest'> & CommandVersion<V>): Promise<Result<ret<'suggest', V>>>
  suggest<V extends 1 | 2 | 3 = 1>(options: opts<'suggest'>): Promise<Result<ret<'suggest', V>>>
  suggest<V extends 1 | 2 | 3>(
    options: opts<'suggest'> | (opts<'suggest'> & CommandVersion<V>)
  ): Promise<Result<ret<'suggest', V>>> {
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
  tableCopy<V extends 1 | 2 | 3>(options: opts<'table_copy'> & CommandVersion<V>): Promise<Result<ret<'table_copy', V>>>
  tableCopy<V extends 1 | 2 | 3 = 1>(options: opts<'table_copy'>): Promise<Result<ret<'table_copy', V>>>
  tableCopy<V extends 1 | 2 | 3>(
    options: opts<'table_copy'> | (opts<'table_copy'> & CommandVersion<V>)
  ): Promise<Result<ret<'table_copy', V>>> {
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
  tableCreate<V extends 1 | 2 | 3>(
    options: opts<'table_create'> & CommandVersion<V>
  ): Promise<Result<ret<'table_create', V>>>
  tableCreate<V extends 1 | 2 | 3 = 1>(options: opts<'table_create'>): Promise<Result<ret<'table_create', V>>>
  tableCreate<V extends 1 | 2 | 3>(
    options: opts<'table_create'> | (opts<'table_create'> & CommandVersion<V>)
  ): Promise<Result<ret<'table_create', V>>> {
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
  tableList<V extends 1 | 2 | 3>(
    options?: opts<'table_list'> & CommandVersion<V>
  ): Promise<Result<ret<'table_list', V>>>
  tableList<V extends 1 | 2 | 3 = 1>(options?: opts<'table_list'>): Promise<Result<ret<'table_list', V>>>
  tableList<V extends 1 | 2 | 3>(
    options?: opts<'table_list'> | (opts<'table_list'> & CommandVersion<V>)
  ): Promise<Result<ret<'table_list', V>>> {
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
  tableRemove<V extends 1 | 2 | 3>(
    options: opts<'table_remove'> & CommandVersion<V>
  ): Promise<Result<ret<'table_remove', V>>>
  tableRemove<V extends 1 | 2 | 3 = 1>(options: opts<'table_remove'>): Promise<Result<ret<'table_remove', V>>>
  tableRemove<V extends 1 | 2 | 3>(
    options: opts<'table_remove'> | (opts<'table_remove'> & CommandVersion<V>)
  ): Promise<Result<ret<'table_remove', V>>> {
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
  tableRename<V extends 1 | 2 | 3>(
    options: opts<'table_rename'> & CommandVersion<V>
  ): Promise<Result<ret<'table_rename', V>>>
  tableRename<V extends 1 | 2 | 3 = 1>(options: opts<'table_rename'>): Promise<Result<ret<'table_rename', V>>>
  tableRename<V extends 1 | 2 | 3>(
    options: opts<'table_rename'> | (opts<'table_rename'> & CommandVersion<V>)
  ): Promise<Result<ret<'table_rename', V>>> {
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
  tableTokenize<V extends 1 | 2 | 3>(
    options: opts<'table_tokenize'> & CommandVersion<V>
  ): Promise<Result<ret<'table_tokenize', V>>>
  tableTokenize<V extends 1 | 2 | 3 = 1>(options: opts<'table_tokenize'>): Promise<Result<ret<'table_tokenize', V>>>
  tableTokenize<V extends 1 | 2 | 3>(
    options: opts<'table_tokenize'> | (opts<'table_tokenize'> & CommandVersion<V>)
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
  threadLimit<V extends 1 | 2 | 3>(
    options?: opts<'thread_limit'> & CommandVersion<V>
  ): Promise<Result<ret<'thread_limit', V>>>
  threadLimit<V extends 1 | 2 | 3 = 1>(options?: opts<'thread_limit'>): Promise<Result<ret<'thread_limit', V>>>
  threadLimit<V extends 1 | 2 | 3>(
    options?: opts<'thread_limit'> | (opts<'thread_limit'> & CommandVersion<V>)
  ): Promise<Result<ret<'thread_limit', V>>> {
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
  tokenize<V extends 1 | 2 | 3>(options: opts<'tokenize'> & CommandVersion<V>): Promise<Result<ret<'tokenize', V>>>
  tokenize<V extends 1 | 2 | 3 = 1>(options: opts<'tokenize'>): Promise<Result<ret<'tokenize', V>>>
  tokenize<V extends 1 | 2 | 3>(
    options: opts<'tokenize'> | (opts<'tokenize'> & CommandVersion<V>)
  ): Promise<Result<ret<'tokenize', V>>> {
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
  tokenizerList<V extends 1 | 2 | 3>(
    options?: opts<'tokenizer_list'> & CommandVersion<V>
  ): Promise<Result<ret<'tokenizer_list', V>>>
  tokenizerList<V extends 1 | 2 | 3 = 1>(options?: opts<'tokenizer_list'>): Promise<Result<ret<'tokenizer_list', V>>>
  tokenizerList<V extends 1 | 2 | 3>(
    options?: opts<'tokenizer_list'> | (opts<'tokenizer_list'> & CommandVersion<V>)
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
  truncate<V extends 1 | 2 | 3>(options: opts<'truncate'> & CommandVersion<V>): Promise<Result<ret<'truncate', V>>>
  truncate<V extends 1 | 2 | 3 = 1>(options: opts<'truncate'>): Promise<Result<ret<'truncate', V>>>
  truncate<V extends 1 | 2 | 3>(
    options: opts<'truncate'> | (opts<'truncate'> & CommandVersion<V>)
  ): Promise<Result<ret<'truncate', V>>> {
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

export function createGroongar<T extends GroongaClient>(client: T): Result<Groongar<T>> {
  try {
    const groongar = new Groongar(client)
    return OK(groongar)
  } catch (err) {
    return ERR(err)
  }
}
