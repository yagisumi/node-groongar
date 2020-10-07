import { Config } from '@jest/types'
import { BaseEnvironment } from './env_base'
import { setupClient, teardownClient } from './mocha_env_stdio'

export default class StdioEnvironment extends BaseEnvironment {
  constructor(config: Config.ProjectConfig) {
    super(config)
    const g = this.global as any
    g.setupClient = setupClient
    g.teardownClient = teardownClient
    g.clientInterface = 'stdio'
  }
}
