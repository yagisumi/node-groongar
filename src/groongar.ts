import { Result, OK, ERR } from './result'
export { Result, OK, ERR } from './result'
import { createOptions, OptionsMap } from './options'
import { flattenOptions } from './command_utils'
import { suggestCreateDataset } from './suggest_create_dataset'

export { types as Types } from './types'
import { types, CommandOptions } from './types'

import Opts = types.Opts
import Ret = types.Ret
import CommandVersion = types.CommandVersion
import OptsTableCreateArray = types.OptsTableCreateArray
import OptsTableCreateNonArray = types.OptsTableCreateNonArray

type CommandCallback = (err: Error | undefined, data: any) => void

export interface GroongaClient {
  command(command: string, options: Record<string, unknown>, callback: CommandCallback): void
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
    options?: Opts<'cache_limit'> & CommandVersion<V>
  ): Promise<Result<Ret<'cache_limit', V>>>
  cacheLimit<V extends 1 | 2 | 3 = 1>(options?: Opts<'cache_limit'>): Promise<Result<Ret<'cache_limit', V>>>
  cacheLimit<V extends 1 | 2 | 3>(
    options?: Opts<'cache_limit'> | (Opts<'cache_limit'> & CommandVersion<V>)
  ): Promise<Result<Ret<'cache_limit', V>>> {
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
  check<V extends 1 | 2 | 3>(options: Opts<'check'> & CommandVersion<V>): Promise<Result<Ret<'check', V>>>
  check<V extends 1 | 2 | 3 = 1>(options: Opts<'check'>): Promise<Result<Ret<'check', V>>>
  check<V extends 1 | 2 | 3>(
    options: Opts<'check'> | (Opts<'check'> & CommandVersion<V>)
  ): Promise<Result<Ret<'check', V>>> {
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
  clearlock<V extends 1 | 2 | 3>(options: Opts<'clearlock'> & CommandVersion<V>): Promise<Result<Ret<'clearlock', V>>>
  clearlock<V extends 1 | 2 | 3 = 1>(options: Opts<'clearlock'>): Promise<Result<Ret<'clearlock', V>>>
  clearlock<V extends 1 | 2 | 3>(
    options: Opts<'clearlock'> | (Opts<'clearlock'> & CommandVersion<V>)
  ): Promise<Result<Ret<'clearlock', V>>> {
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
    options: Opts<'column_copy'> & CommandVersion<V>
  ): Promise<Result<Ret<'column_copy', V>>>
  columnCopy<V extends 1 | 2 | 3 = 1>(options: Opts<'column_copy'>): Promise<Result<Ret<'column_copy', V>>>
  columnCopy<V extends 1 | 2 | 3>(
    options: Opts<'column_copy'> | (Opts<'column_copy'> & CommandVersion<V>)
  ): Promise<Result<Ret<'column_copy', V>>> {
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
    options: Opts<'column_create'> & CommandVersion<V>
  ): Promise<Result<Ret<'column_create', V>>>
  columnCreate<V extends 1 | 2 | 3 = 1>(options: Opts<'column_create'>): Promise<Result<Ret<'column_create', V>>>
  columnCreate<V extends 1 | 2 | 3>(
    options: Opts<'column_create'> | (Opts<'column_create'> & CommandVersion<V>)
  ): Promise<Result<Ret<'column_create', V>>> {
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
    options: Opts<'column_list'> & CommandVersion<V>
  ): Promise<Result<Ret<'column_list', V>>>
  columnList<V extends 1 | 2 | 3 = 1>(options: Opts<'column_list'>): Promise<Result<Ret<'column_list', V>>>
  columnList<V extends 1 | 2 | 3>(
    options: Opts<'column_list'> | (Opts<'column_list'> & CommandVersion<V>)
  ): Promise<Result<Ret<'column_list', V>>> {
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
    options: Opts<'column_remove'> & CommandVersion<V>
  ): Promise<Result<Ret<'column_remove', V>>>
  columnRemove<V extends 1 | 2 | 3 = 1>(options: Opts<'column_remove'>): Promise<Result<Ret<'column_remove', V>>>
  columnRemove<V extends 1 | 2 | 3>(
    options: Opts<'column_remove'> | (Opts<'column_remove'> & CommandVersion<V>)
  ): Promise<Result<Ret<'column_remove', V>>> {
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
    options: Opts<'column_rename'> & CommandVersion<V>
  ): Promise<Result<Ret<'column_rename', V>>>
  columnRename<V extends 1 | 2 | 3 = 1>(options: Opts<'column_rename'>): Promise<Result<Ret<'column_rename', V>>>
  columnRename<V extends 1 | 2 | 3>(
    options: Opts<'column_rename'> | (Opts<'column_rename'> & CommandVersion<V>)
  ): Promise<Result<Ret<'column_rename', V>>> {
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
    options: Opts<'config_delete'> & CommandVersion<V>
  ): Promise<Result<Ret<'config_delete', V>>>
  configDelete<V extends 1 | 2 | 3 = 1>(options: Opts<'config_delete'>): Promise<Result<Ret<'config_delete', V>>>
  configDelete<V extends 1 | 2 | 3>(
    options: Opts<'config_delete'> | (Opts<'config_delete'> & CommandVersion<V>)
  ): Promise<Result<Ret<'config_delete', V>>> {
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
  configGet<V extends 1 | 2 | 3>(options: Opts<'config_get'> & CommandVersion<V>): Promise<Result<Ret<'config_get', V>>>
  configGet<V extends 1 | 2 | 3 = 1>(options: Opts<'config_get'>): Promise<Result<Ret<'config_get', V>>>
  configGet<V extends 1 | 2 | 3>(
    options: Opts<'config_get'> | (Opts<'config_get'> & CommandVersion<V>)
  ): Promise<Result<Ret<'config_get', V>>> {
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
  configSet<V extends 1 | 2 | 3>(options: Opts<'config_set'> & CommandVersion<V>): Promise<Result<Ret<'config_set', V>>>
  configSet<V extends 1 | 2 | 3 = 1>(options: Opts<'config_set'>): Promise<Result<Ret<'config_set', V>>>
  configSet<V extends 1 | 2 | 3>(
    options: Opts<'config_set'> | (Opts<'config_set'> & CommandVersion<V>)
  ): Promise<Result<Ret<'config_set', V>>> {
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
    options?: Opts<'database_unmap'> & CommandVersion<V>
  ): Promise<Result<Ret<'database_unmap', V>>>
  databaseUnmap<V extends 1 | 2 | 3 = 1>(options?: Opts<'database_unmap'>): Promise<Result<Ret<'database_unmap', V>>>
  databaseUnmap<V extends 1 | 2 | 3>(
    options?: Opts<'database_unmap'> | (Opts<'database_unmap'> & CommandVersion<V>)
  ): Promise<Result<Ret<'database_unmap', V>>> {
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
    options: Opts<'define_selector'> & CommandVersion<V>
  ): Promise<Result<Ret<'define_selector', V>>>
  defineSelector<V extends 1 | 2 | 3 = 1>(options: Opts<'define_selector'>): Promise<Result<Ret<'define_selector', V>>>
  defineSelector<V extends 1 | 2 | 3>(
    options: Opts<'define_selector'> | (Opts<'define_selector'> & CommandVersion<V>)
  ): Promise<Result<Ret<'define_selector', V>>> {
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
  defrag<V extends 1 | 2 | 3>(options?: Opts<'defrag'> & CommandVersion<V>): Promise<Result<Ret<'defrag', V>>>
  defrag<V extends 1 | 2 | 3 = 1>(options?: Opts<'defrag'>): Promise<Result<Ret<'defrag', V>>>
  defrag<V extends 1 | 2 | 3>(
    options?: Opts<'defrag'> | (Opts<'defrag'> & CommandVersion<V>)
  ): Promise<Result<Ret<'defrag', V>>> {
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
  delete<V extends 1 | 2 | 3>(options: Opts<'delete'> & CommandVersion<V>): Promise<Result<Ret<'delete', V>>>
  delete<V extends 1 | 2 | 3 = 1>(options: Opts<'delete'>): Promise<Result<Ret<'delete', V>>>
  delete<V extends 1 | 2 | 3>(
    options: Opts<'delete'> | (Opts<'delete'> & CommandVersion<V>)
  ): Promise<Result<Ret<'delete', V>>> {
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
  dump<V extends 1 | 2 | 3>(options?: Opts<'dump'> & CommandVersion<V>): Promise<Result<Ret<'dump', V>>>
  dump<V extends 1 | 2 | 3 = 1>(options?: Opts<'dump'>): Promise<Result<Ret<'dump', V>>>
  dump<V extends 1 | 2 | 3>(
    options?: Opts<'dump'> | (Opts<'dump'> & CommandVersion<V>)
  ): Promise<Result<Ret<'dump', V>>> {
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
  ioFlush<V extends 1 | 2 | 3>(options?: Opts<'io_flush'> & CommandVersion<V>): Promise<Result<Ret<'io_flush', V>>>
  ioFlush<V extends 1 | 2 | 3 = 1>(options?: Opts<'io_flush'>): Promise<Result<Ret<'io_flush', V>>>
  ioFlush<V extends 1 | 2 | 3>(
    options?: Opts<'io_flush'> | (Opts<'io_flush'> & CommandVersion<V>)
  ): Promise<Result<Ret<'io_flush', V>>> {
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
    options: Opts<'index_column_diff'> & CommandVersion<V>
  ): Promise<Result<Ret<'index_column_diff', V>>>
  indexColumnDiff<V extends 1 | 2 | 3 = 1>(
    options: Opts<'index_column_diff'>
  ): Promise<Result<Ret<'index_column_diff', V>>>
  indexColumnDiff<V extends 1 | 2 | 3>(
    options: Opts<'index_column_diff'> | (Opts<'index_column_diff'> & CommandVersion<V>)
  ): Promise<Result<Ret<'index_column_diff', V>>> {
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
  load<V extends 1 | 2 | 3>(options: Opts<'load'> & CommandVersion<V>): Promise<Result<Ret<'load', V>>>
  load<V extends 1 | 2 | 3 = 3>(options: Opts<'load'>): Promise<Result<Ret<'load', V>>>
  load<V extends 1 | 2 | 3>(
    options: Opts<'load'> | (Opts<'load'> & CommandVersion<V>)
  ): Promise<Result<Ret<'load', V>>> {
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
    options?: Opts<'lock_acquire'> & CommandVersion<V>
  ): Promise<Result<Ret<'lock_acquire', V>>>
  lockAcquire<V extends 1 | 2 | 3 = 1>(options?: Opts<'lock_acquire'>): Promise<Result<Ret<'lock_acquire', V>>>
  lockAcquire<V extends 1 | 2 | 3>(
    options?: Opts<'lock_acquire'> | (Opts<'lock_acquire'> & CommandVersion<V>)
  ): Promise<Result<Ret<'lock_acquire', V>>> {
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
    options?: Opts<'lock_clear'> & CommandVersion<V>
  ): Promise<Result<Ret<'lock_clear', V>>>
  lockClear<V extends 1 | 2 | 3 = 1>(options?: Opts<'lock_clear'>): Promise<Result<Ret<'lock_clear', V>>>
  lockClear<V extends 1 | 2 | 3>(
    options?: Opts<'lock_clear'> | (Opts<'lock_clear'> & CommandVersion<V>)
  ): Promise<Result<Ret<'lock_clear', V>>> {
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
    options?: Opts<'lock_release'> & CommandVersion<V>
  ): Promise<Result<Ret<'lock_release', V>>>
  lockRelease<V extends 1 | 2 | 3 = 1>(options?: Opts<'lock_release'>): Promise<Result<Ret<'lock_release', V>>>
  lockRelease<V extends 1 | 2 | 3>(
    options?: Opts<'lock_release'> | (Opts<'lock_release'> & CommandVersion<V>)
  ): Promise<Result<Ret<'lock_release', V>>> {
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
  logLevel<V extends 1 | 2 | 3>(options: Opts<'log_level'> & CommandVersion<V>): Promise<Result<Ret<'log_level', V>>>
  logLevel<V extends 1 | 2 | 3 = 1>(options: Opts<'log_level'>): Promise<Result<Ret<'log_level', V>>>
  logLevel<V extends 1 | 2 | 3>(
    options: Opts<'log_level'> | (Opts<'log_level'> & CommandVersion<V>)
  ): Promise<Result<Ret<'log_level', V>>> {
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
  logPut<V extends 1 | 2 | 3>(options: Opts<'log_put'> & CommandVersion<V>): Promise<Result<Ret<'log_put', V>>>
  logPut<V extends 1 | 2 | 3 = 1>(options: Opts<'log_put'>): Promise<Result<Ret<'log_put', V>>>
  logPut<V extends 1 | 2 | 3>(
    options: Opts<'log_put'> | (Opts<'log_put'> & CommandVersion<V>)
  ): Promise<Result<Ret<'log_put', V>>> {
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
    options?: Opts<'log_reopen'> & CommandVersion<V>
  ): Promise<Result<Ret<'log_reopen', V>>>
  logReopen<V extends 1 | 2 | 3 = 1>(options?: Opts<'log_reopen'>): Promise<Result<Ret<'log_reopen', V>>>
  logReopen<V extends 1 | 2 | 3>(
    options?: Opts<'log_reopen'> | (Opts<'log_reopen'> & CommandVersion<V>)
  ): Promise<Result<Ret<'log_reopen', V>>> {
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
    options: Opts<'logical_count'> & CommandVersion<V>
  ): Promise<Result<Ret<'logical_count', V>>>
  logicalCount<V extends 1 | 2 | 3 = 1>(options: Opts<'logical_count'>): Promise<Result<Ret<'logical_count', V>>>
  logicalCount<V extends 1 | 2 | 3>(
    options: Opts<'logical_count'> | (Opts<'logical_count'> & CommandVersion<V>)
  ): Promise<Result<Ret<'logical_count', V>>> {
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
    options?: Opts<'logical_parameters'> & CommandVersion<V>
  ): Promise<Result<Ret<'logical_parameters', V>>>
  logicalParameters<V extends 1 | 2 | 3 = 1>(
    options?: Opts<'logical_parameters'>
  ): Promise<Result<Ret<'logical_parameters', V>>>
  logicalParameters<V extends 1 | 2 | 3>(
    options?: Opts<'logical_parameters'> | (Opts<'logical_parameters'> & CommandVersion<V>)
  ): Promise<Result<Ret<'logical_parameters', V>>> {
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
    options: Opts<'logical_range_filter'> & CommandVersion<V>
  ): Promise<Result<Ret<'logical_range_filter', V>>>
  logicalRangeFilter<V extends 2 = 2>(
    options: Opts<'logical_range_filter'>
  ): Promise<Result<Ret<'logical_range_filter', V>>>
  logicalRangeFilter<V extends 2>(
    options: Opts<'logical_range_filter'> | (Opts<'logical_range_filter'> & CommandVersion<V>)
  ): Promise<Result<Ret<'logical_range_filter', V>>> {
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
    options: Opts<'logical_select'> & CommandVersion<V>
  ): Promise<Result<Ret<'logical_select', V>>>
  logicalSelect<V extends 2 = 2>(options: Opts<'logical_select'>): Promise<Result<Ret<'logical_select', V>>>
  logicalSelect<V extends 2>(
    options: Opts<'logical_select'> | (Opts<'logical_select'> & CommandVersion<V>)
  ): Promise<Result<Ret<'logical_select', V>>> {
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
    options: Opts<'logical_shard_list'> & CommandVersion<V>
  ): Promise<Result<Ret<'logical_shard_list', V>>>
  logicalShardList<V extends 1 | 2 | 3 = 1>(
    options: Opts<'logical_shard_list'>
  ): Promise<Result<Ret<'logical_shard_list', V>>>
  logicalShardList<V extends 1 | 2 | 3>(
    options: Opts<'logical_shard_list'> | (Opts<'logical_shard_list'> & CommandVersion<V>)
  ): Promise<Result<Ret<'logical_shard_list', V>>> {
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
    options: Opts<'logical_table_remove'> & CommandVersion<V>
  ): Promise<Result<Ret<'logical_table_remove', V>>>
  logicalTableRemove<V extends 1 | 2 | 3 = 1>(
    options: Opts<'logical_table_remove'>
  ): Promise<Result<Ret<'logical_table_remove', V>>>
  logicalTableRemove<V extends 1 | 2 | 3>(
    options: Opts<'logical_table_remove'> | (Opts<'logical_table_remove'> & CommandVersion<V>)
  ): Promise<Result<Ret<'logical_table_remove', V>>> {
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
  normalize<V extends 1 | 2 | 3>(options: Opts<'normalize'> & CommandVersion<V>): Promise<Result<Ret<'normalize', V>>>
  normalize<V extends 1 | 2 | 3 = 1>(options: Opts<'normalize'>): Promise<Result<Ret<'normalize', V>>>
  normalize<V extends 1 | 2 | 3>(
    options: Opts<'normalize'> | (Opts<'normalize'> & CommandVersion<V>)
  ): Promise<Result<Ret<'normalize', V>>> {
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
    options?: Opts<'normalizer_list'> & CommandVersion<V>
  ): Promise<Result<Ret<'normalizer_list', V>>>
  normalizerList<V extends 1 | 2 | 3 = 1>(options?: Opts<'normalizer_list'>): Promise<Result<Ret<'normalizer_list', V>>>
  normalizerList<V extends 1 | 2 | 3>(
    options?: Opts<'normalizer_list'> | (Opts<'normalizer_list'> & CommandVersion<V>)
  ): Promise<Result<Ret<'normalizer_list', V>>> {
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
    options: Opts<'object_exist'> & CommandVersion<V>
  ): Promise<Result<Ret<'object_exist', V>>>
  objectExist<V extends 1 | 2 | 3 = 1>(options: Opts<'object_exist'>): Promise<Result<Ret<'object_exist', V>>>
  objectExist<V extends 1 | 2 | 3>(
    options: Opts<'object_exist'> | (Opts<'object_exist'> & CommandVersion<V>)
  ): Promise<Result<Ret<'object_exist', V>>> {
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
    options?: Opts<'object_inspect'> & CommandVersion<V>
  ): Promise<Result<Ret<'object_inspect', V>>>
  objectInspect<V extends 1 | 2 | 3 = 1>(options?: Opts<'object_inspect'>): Promise<Result<Ret<'object_inspect', V>>>
  objectInspect<V extends 1 | 2 | 3>(
    options?: Opts<'object_inspect'> | (Opts<'object_inspect'> & CommandVersion<V>)
  ): Promise<Result<Ret<'object_inspect', V>>> {
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
    options?: Opts<'object_list'> & CommandVersion<V>
  ): Promise<Result<Ret<'object_list', V>>>
  objectList<V extends 1 | 2 | 3 = 1>(options?: Opts<'object_list'>): Promise<Result<Ret<'object_list', V>>>
  objectList<V extends 1 | 2 | 3>(
    options?: Opts<'object_list'> | (Opts<'object_list'> & CommandVersion<V>)
  ): Promise<Result<Ret<'object_list', V>>> {
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
    options: Opts<'object_remove'> & CommandVersion<V>
  ): Promise<Result<Ret<'object_remove', V>>>
  objectRemove<V extends 1 | 2 | 3 = 1>(options: Opts<'object_remove'>): Promise<Result<Ret<'object_remove', V>>>
  objectRemove<V extends 1 | 2 | 3>(
    options: Opts<'object_remove'> | (Opts<'object_remove'> & CommandVersion<V>)
  ): Promise<Result<Ret<'object_remove', V>>> {
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
    options: Opts<'object_set_visibility'> & CommandVersion<V>
  ): Promise<Result<Ret<'object_set_visibility', V>>>
  objectSetVisibility<V extends 1 | 2 | 3 = 1>(
    options: Opts<'object_set_visibility'>
  ): Promise<Result<Ret<'object_set_visibility', V>>>
  objectSetVisibility<V extends 1 | 2 | 3>(
    options: Opts<'object_set_visibility'> | (Opts<'object_set_visibility'> & CommandVersion<V>)
  ): Promise<Result<Ret<'object_set_visibility', V>>> {
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
    options: Opts<'plugin_register'> & CommandVersion<V>
  ): Promise<Result<Ret<'plugin_register', V>>>
  pluginRegister<V extends 1 | 2 | 3 = 1>(options: Opts<'plugin_register'>): Promise<Result<Ret<'plugin_register', V>>>
  pluginRegister<V extends 1 | 2 | 3>(
    options: Opts<'plugin_register'> | (Opts<'plugin_register'> & CommandVersion<V>)
  ): Promise<Result<Ret<'plugin_register', V>>> {
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
    options: Opts<'plugin_unregister'> & CommandVersion<V>
  ): Promise<Result<Ret<'plugin_unregister', V>>>
  pluginUnregister<V extends 1 | 2 | 3 = 1>(
    options: Opts<'plugin_unregister'>
  ): Promise<Result<Ret<'plugin_unregister', V>>>
  pluginUnregister<V extends 1 | 2 | 3>(
    options: Opts<'plugin_unregister'> | (Opts<'plugin_unregister'> & CommandVersion<V>)
  ): Promise<Result<Ret<'plugin_unregister', V>>> {
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
    options: Opts<'query_expand'> & CommandVersion<V>
  ): Promise<Result<Ret<'query_expand', V>>>
  queryExpand<V extends 1 | 2 | 3 = 1>(options: Opts<'query_expand'>): Promise<Result<Ret<'query_expand', V>>>
  queryExpand<V extends 1 | 2 | 3>(
    options: Opts<'query_expand'> | (Opts<'query_expand'> & CommandVersion<V>)
  ): Promise<Result<Ret<'query_expand', V>>> {
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
  quit<V extends 1 | 2 | 3>(options?: Opts<'quit'> & CommandVersion<V>): Promise<Result<Ret<'quit', V>>>
  quit<V extends 1 | 2 | 3 = 1>(options?: Opts<'quit'>): Promise<Result<Ret<'quit', V>>>
  quit<V extends 1 | 2 | 3>(
    options?: Opts<'quit'> | (Opts<'quit'> & CommandVersion<V>)
  ): Promise<Result<Ret<'quit', V>>> {
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
    options: Opts<'query_log_flags_add'> & CommandVersion<V>
  ): Promise<Result<Ret<'query_log_flags_add', V>>>
  queryLogFlagsAdd<V extends 1 | 2 | 3 = 1>(
    options: Opts<'query_log_flags_add'>
  ): Promise<Result<Ret<'query_log_flags_add', V>>>
  queryLogFlagsAdd<V extends 1 | 2 | 3>(
    options: Opts<'query_log_flags_add'> | (Opts<'query_log_flags_add'> & CommandVersion<V>)
  ): Promise<Result<Ret<'query_log_flags_add', V>>> {
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
    options?: Opts<'query_log_flags_get'> & CommandVersion<V>
  ): Promise<Result<Ret<'query_log_flags_get', V>>>
  queryLogFlagsGet<V extends 1 | 2 | 3 = 1>(
    options?: Opts<'query_log_flags_get'>
  ): Promise<Result<Ret<'query_log_flags_get', V>>>
  queryLogFlagsGet<V extends 1 | 2 | 3>(
    options?: Opts<'query_log_flags_get'> | (Opts<'query_log_flags_get'> & CommandVersion<V>)
  ): Promise<Result<Ret<'query_log_flags_get', V>>> {
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
    options: Opts<'query_log_flags_remove'> & CommandVersion<V>
  ): Promise<Result<Ret<'query_log_flags_remove', V>>>
  queryLogFlagsRemove<V extends 1 | 2 | 3 = 1>(
    options: Opts<'query_log_flags_remove'>
  ): Promise<Result<Ret<'query_log_flags_remove', V>>>
  queryLogFlagsRemove<V extends 1 | 2 | 3>(
    options: Opts<'query_log_flags_remove'> | (Opts<'query_log_flags_remove'> & CommandVersion<V>)
  ): Promise<Result<Ret<'query_log_flags_remove', V>>> {
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
    options: Opts<'query_log_flags_set'> & CommandVersion<V>
  ): Promise<Result<Ret<'query_log_flags_set', V>>>
  queryLogFlagsSet<V extends 1 | 2 | 3 = 1>(
    options: Opts<'query_log_flags_set'>
  ): Promise<Result<Ret<'query_log_flags_set', V>>>
  queryLogFlagsSet<V extends 1 | 2 | 3>(
    options: Opts<'query_log_flags_set'> | (Opts<'query_log_flags_set'> & CommandVersion<V>)
  ): Promise<Result<Ret<'query_log_flags_set', V>>> {
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
    options: Opts<'range_filter'> & CommandVersion<V>
  ): Promise<Result<Ret<'range_filter', V>>>
  rangeFilter<V extends 1 | 2 | 3 = 3>(options: Opts<'range_filter'>): Promise<Result<Ret<'range_filter', V>>>
  rangeFilter<V extends 1 | 2 | 3>(
    options: Opts<'range_filter'> | (Opts<'range_filter'> & CommandVersion<V>)
  ): Promise<Result<Ret<'range_filter', V>>> {
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
  register<V extends 1 | 2 | 3>(options: Opts<'register'> & CommandVersion<V>): Promise<Result<Ret<'register', V>>>
  register<V extends 1 | 2 | 3 = 1>(options: Opts<'register'>): Promise<Result<Ret<'register', V>>>
  register<V extends 1 | 2 | 3>(
    options: Opts<'register'> | (Opts<'register'> & CommandVersion<V>)
  ): Promise<Result<Ret<'register', V>>> {
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
  reindex<V extends 1 | 2 | 3>(options?: Opts<'reindex'> & CommandVersion<V>): Promise<Result<Ret<'reindex', V>>>
  reindex<V extends 1 | 2 | 3 = 1>(options?: Opts<'reindex'>): Promise<Result<Ret<'reindex', V>>>
  reindex<V extends 1 | 2 | 3>(
    options?: Opts<'reindex'> | (Opts<'reindex'> & CommandVersion<V>)
  ): Promise<Result<Ret<'reindex', V>>> {
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
    options: Opts<'request_cancel'> & CommandVersion<V>
  ): Promise<Result<Ret<'request_cancel', V>>>
  requestCancel<V extends 1 | 2 | 3 = 1>(options: Opts<'request_cancel'>): Promise<Result<Ret<'request_cancel', V>>>
  requestCancel<V extends 1 | 2 | 3>(
    options: Opts<'request_cancel'> | (Opts<'request_cancel'> & CommandVersion<V>)
  ): Promise<Result<Ret<'request_cancel', V>>> {
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
  rubyEval<V extends 1 | 2 | 3>(options: Opts<'ruby_eval'> & CommandVersion<V>): Promise<Result<Ret<'ruby_eval', V>>>
  rubyEval<V extends 1 | 2 | 3 = 1>(options: Opts<'ruby_eval'>): Promise<Result<Ret<'ruby_eval', V>>>
  rubyEval<V extends 1 | 2 | 3>(
    options: Opts<'ruby_eval'> | (Opts<'ruby_eval'> & CommandVersion<V>)
  ): Promise<Result<Ret<'ruby_eval', V>>> {
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
  schema<V extends 1 | 2 | 3>(options?: Opts<'schema'> & CommandVersion<V>): Promise<Result<Ret<'schema', V>>>
  schema<V extends 1 | 2 | 3 = 1>(options?: Opts<'schema'>): Promise<Result<Ret<'schema', V>>>
  schema<V extends 1 | 2 | 3>(
    options?: Opts<'schema'> | (Opts<'schema'> & CommandVersion<V>)
  ): Promise<Result<Ret<'schema', V>>> {
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
  select<V extends 1 | 2 | 3>(options: Opts<'select'> & CommandVersion<V>): Promise<Result<Ret<'select', V>>>
  select<V extends 1 | 2 | 3 = 3>(options: Opts<'select'>): Promise<Result<Ret<'select', V>>>
  select<V extends 1 | 2 | 3>(
    options: Opts<'select'> | (Opts<'select'> & CommandVersion<V>)
  ): Promise<Result<Ret<'select', V>>> {
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
  shutdown<V extends 1 | 2 | 3>(options?: Opts<'shutdown'> & CommandVersion<V>): Promise<Result<Ret<'shutdown', V>>>
  shutdown<V extends 1 | 2 | 3 = 1>(options?: Opts<'shutdown'>): Promise<Result<Ret<'shutdown', V>>>
  shutdown<V extends 1 | 2 | 3>(
    options?: Opts<'shutdown'> | (Opts<'shutdown'> & CommandVersion<V>)
  ): Promise<Result<Ret<'shutdown', V>>> {
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
  status<V extends 1 | 2 | 3>(options?: Opts<'status'> & CommandVersion<V>): Promise<Result<Ret<'status', V>>>
  status<V extends 1 | 2 | 3 = 1>(options?: Opts<'status'>): Promise<Result<Ret<'status', V>>>
  status<V extends 1 | 2 | 3>(
    options?: Opts<'status'> | (Opts<'status'> & CommandVersion<V>)
  ): Promise<Result<Ret<'status', V>>> {
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
  suggest<V extends 1 | 2 | 3>(options: Opts<'suggest'> & CommandVersion<V>): Promise<Result<Ret<'suggest', V>>>
  suggest<V extends 1 | 2 | 3 = 1>(options: Opts<'suggest'>): Promise<Result<Ret<'suggest', V>>>
  suggest<V extends 1 | 2 | 3>(
    options: Opts<'suggest'> | (Opts<'suggest'> & CommandVersion<V>)
  ): Promise<Result<Ret<'suggest', V>>> {
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
  tableCopy<V extends 1 | 2 | 3>(options: Opts<'table_copy'> & CommandVersion<V>): Promise<Result<Ret<'table_copy', V>>>
  tableCopy<V extends 1 | 2 | 3 = 1>(options: Opts<'table_copy'>): Promise<Result<Ret<'table_copy', V>>>
  tableCopy<V extends 1 | 2 | 3>(
    options: Opts<'table_copy'> | (Opts<'table_copy'> & CommandVersion<V>)
  ): Promise<Result<Ret<'table_copy', V>>> {
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
    options: OptsTableCreateNonArray & CommandVersion<V>
  ): Promise<Result<Ret<'table_create', V>>>
  tableCreate<V extends 1 | 2 | 3 = 1>(options: OptsTableCreateNonArray): Promise<Result<Ret<'table_create', V>>>
  tableCreate<V extends 1 | 2 | 3>(
    options: OptsTableCreateArray & CommandVersion<V>
  ): Promise<Result<Ret<'table_create', V>>>
  tableCreate<V extends 1 | 2 | 3 = 1>(options: OptsTableCreateArray): Promise<Result<Ret<'table_create', V>>>
  tableCreate<V extends 1 | 2 | 3>(
    options:
      | OptsTableCreateArray
      | OptsTableCreateNonArray
      | (OptsTableCreateArray & CommandVersion<V>)
      | (OptsTableCreateNonArray & CommandVersion<V>)
  ): Promise<Result<Ret<'table_create', V>>> {
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
    options?: Opts<'table_list'> & CommandVersion<V>
  ): Promise<Result<Ret<'table_list', V>>>
  tableList<V extends 1 | 2 | 3 = 1>(options?: Opts<'table_list'>): Promise<Result<Ret<'table_list', V>>>
  tableList<V extends 1 | 2 | 3>(
    options?: Opts<'table_list'> | (Opts<'table_list'> & CommandVersion<V>)
  ): Promise<Result<Ret<'table_list', V>>> {
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
    options: Opts<'table_remove'> & CommandVersion<V>
  ): Promise<Result<Ret<'table_remove', V>>>
  tableRemove<V extends 1 | 2 | 3 = 1>(options: Opts<'table_remove'>): Promise<Result<Ret<'table_remove', V>>>
  tableRemove<V extends 1 | 2 | 3>(
    options: Opts<'table_remove'> | (Opts<'table_remove'> & CommandVersion<V>)
  ): Promise<Result<Ret<'table_remove', V>>> {
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
    options: Opts<'table_rename'> & CommandVersion<V>
  ): Promise<Result<Ret<'table_rename', V>>>
  tableRename<V extends 1 | 2 | 3 = 1>(options: Opts<'table_rename'>): Promise<Result<Ret<'table_rename', V>>>
  tableRename<V extends 1 | 2 | 3>(
    options: Opts<'table_rename'> | (Opts<'table_rename'> & CommandVersion<V>)
  ): Promise<Result<Ret<'table_rename', V>>> {
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
    options: Opts<'table_tokenize'> & CommandVersion<V>
  ): Promise<Result<Ret<'table_tokenize', V>>>
  tableTokenize<V extends 1 | 2 | 3 = 1>(options: Opts<'table_tokenize'>): Promise<Result<Ret<'table_tokenize', V>>>
  tableTokenize<V extends 1 | 2 | 3>(
    options: Opts<'table_tokenize'> | (Opts<'table_tokenize'> & CommandVersion<V>)
  ): Promise<Result<Ret<'table_tokenize', V>>> {
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
    options?: Opts<'thread_limit'> & CommandVersion<V>
  ): Promise<Result<Ret<'thread_limit', V>>>
  threadLimit<V extends 1 | 2 | 3 = 1>(options?: Opts<'thread_limit'>): Promise<Result<Ret<'thread_limit', V>>>
  threadLimit<V extends 1 | 2 | 3>(
    options?: Opts<'thread_limit'> | (Opts<'thread_limit'> & CommandVersion<V>)
  ): Promise<Result<Ret<'thread_limit', V>>> {
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
  tokenize<V extends 1 | 2 | 3>(options: Opts<'tokenize'> & CommandVersion<V>): Promise<Result<Ret<'tokenize', V>>>
  tokenize<V extends 1 | 2 | 3 = 1>(options: Opts<'tokenize'>): Promise<Result<Ret<'tokenize', V>>>
  tokenize<V extends 1 | 2 | 3>(
    options: Opts<'tokenize'> | (Opts<'tokenize'> & CommandVersion<V>)
  ): Promise<Result<Ret<'tokenize', V>>> {
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
    options?: Opts<'tokenizer_list'> & CommandVersion<V>
  ): Promise<Result<Ret<'tokenizer_list', V>>>
  tokenizerList<V extends 1 | 2 | 3 = 1>(options?: Opts<'tokenizer_list'>): Promise<Result<Ret<'tokenizer_list', V>>>
  tokenizerList<V extends 1 | 2 | 3>(
    options?: Opts<'tokenizer_list'> | (Opts<'tokenizer_list'> & CommandVersion<V>)
  ): Promise<Result<Ret<'tokenizer_list', V>>> {
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
  truncate<V extends 1 | 2 | 3>(options: Opts<'truncate'> & CommandVersion<V>): Promise<Result<Ret<'truncate', V>>>
  truncate<V extends 1 | 2 | 3 = 1>(options: Opts<'truncate'>): Promise<Result<Ret<'truncate', V>>>
  truncate<V extends 1 | 2 | 3>(
    options: Opts<'truncate'> | (Opts<'truncate'> & CommandVersion<V>)
  ): Promise<Result<Ret<'truncate', V>>> {
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

  /**
   * `reference_acquire` acquires a reference of target objects.
   */
  referenceAcquire<V extends 1 | 2 | 3>(
    options?: Opts<'reference_acquire'> & CommandVersion<V>
  ): Promise<Result<Ret<'reference_acquire', V>>>
  referenceAcquire<V extends 1 | 2 | 3 = 1>(
    options?: Opts<'reference_acquire'>
  ): Promise<Result<Ret<'reference_acquire', V>>>
  referenceAcquire<V extends 1 | 2 | 3>(
    options?: Opts<'reference_acquire'> | (Opts<'reference_acquire'> & CommandVersion<V>)
  ): Promise<Result<Ret<'reference_acquire', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('reference_acquire', options)
        this.client.command('reference_acquire', opts, (err, data) => {
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
   * `reference_release` releases a reference of target objects acquired by reference_acquire.
   */
  referenceRelease<V extends 1 | 2 | 3>(
    options?: Opts<'reference_release'> & CommandVersion<V>
  ): Promise<Result<Ret<'reference_release', V>>>
  referenceRelease<V extends 1 | 2 | 3 = 1>(
    options?: Opts<'reference_release'>
  ): Promise<Result<Ret<'reference_release', V>>>
  referenceRelease<V extends 1 | 2 | 3>(
    options?: Opts<'reference_release'> | (Opts<'reference_release'> & CommandVersion<V>)
  ): Promise<Result<Ret<'reference_release', V>>> {
    return new Promise((resolve) => {
      try {
        const opts = this.mergeOptions('reference_release', options)
        this.client.command('reference_release', opts, (err, data) => {
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
