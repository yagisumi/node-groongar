import NodeEnvironment from 'jest-environment-node'
import { Config } from '@jest/types'
import { setEnv, deleteEnv, mkdir, rimraf, exists, copyFile } from './funcs'
import { SetupConfig, TestEnv } from './types'
import { Database } from 'nroonga'

type NroongaTestEnv = {
  client: Database
  config: SetupConfig
}

function setup(config: SetupConfig): Promise<TestEnv> {
  return new Promise((resolve) => {
    const client = new Database(config.db_path)
    const env: NroongaTestEnv = {
      config,
      client,
    }
    resolve(env)
  })
}

function teardown(env: NroongaTestEnv): Promise<void> {
  return new Promise((resolve) => {
    try {
      env.client.close()
    } catch (err) {
      // empty
    }
    resolve()
  })
}

export default class NroongaEnvironment extends NodeEnvironment {
  constructor(config: Config.ProjectConfig) {
    super(config)
    const g = this.global as any
    g.setEnv = setEnv
    g.deleteEnv = deleteEnv
    g.mkdir = mkdir
    g.rimraf = rimraf
    g.exists = exists
    g.copyFile = copyFile
    g.setup = setup
    g.teardown = teardown
    g.config = config
    g.context = this.context
    g.clientInterface = 'nroonga'
  }
}
