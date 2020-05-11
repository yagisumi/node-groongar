import { Result, OK, ERR } from './result'
import { createOptions, OptionsMap } from './options'

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

export class Groongar<T extends GroongaClient> {
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
}

export function createGroongar<T extends GroongaClient>(client: T) {
  return new Groongar(client)
}
