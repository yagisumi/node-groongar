import { Config } from '@jest/types'
import { getGroongaPath } from './funcs'
import { SetupConfig, TestEnv } from './types'
import { createClient, GroongaStdioClient } from '@yagisumi/groonga-stdio-client'
import { BaseEnvironment } from './env_base'

type StdioTestEnv = {
  client: GroongaStdioClient
  config: SetupConfig
}

export function setupClient(config: SetupConfig): Promise<TestEnv> {
  return new Promise((resolve) => {
    const client = createClient(config.db_path, { groongaPath: getGroongaPath() })
    const env: StdioTestEnv = {
      config,
      client,
    }
    resolve(env)
  })
}

export function teardownClient(env: StdioTestEnv): Promise<void> {
  return new Promise((resolve) => {
    try {
      env.client.command('quit', () => {
        try {
          env.client.kill()
        } catch (err) {
          // empty
        }
        resolve()
      })
    } catch (err) {
      // empty
    }
  })
}

export default class StdioEnvironment extends BaseEnvironment {
  constructor(config: Config.ProjectConfig) {
    super(config)
    const g = this.global as any
    g.setupClient = setupClient
    g.teardownClient = teardownClient
    g.clientInterface = 'stdio'
  }
}
