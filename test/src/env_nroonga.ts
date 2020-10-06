import { Config } from '@jest/types'
import { SetupConfig, TestEnv } from './types'
import { Database } from 'nroonga'
import { BaseEnvironment } from './env_base'

export type NroongaTestEnv = {
  client: Database
  config: SetupConfig
}

export function setupClient(config: SetupConfig): Promise<TestEnv> {
  return new Promise((resolve) => {
    const client = new Database(config.db_path)
    const env: NroongaTestEnv = {
      config,
      client,
    }
    resolve(env)
  })
}

export function teardownClient(env: NroongaTestEnv): Promise<void> {
  return new Promise((resolve) => {
    try {
      env.client.close()
    } catch (err) {
      // empty
    }
    resolve()
  })
}

export default class NroongaEnvironment extends BaseEnvironment {
  constructor(config: Config.ProjectConfig) {
    super(config)
    const g = this.global as any
    g.setupClient = setupClient
    g.teardownClient = teardownClient
    g.clientInterface = 'nroonga'
  }
}
