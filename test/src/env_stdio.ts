import NodeEnvironment from 'jest-environment-node'
import { Config } from '@jest/types'
import { setEnv, deleteEnv, mkdir, rimraf, exists, copyFile, getGroongaPath } from './funcs'
import { SetupConfig, TestEnv } from './types'
import { createClient, GroongaStdioClient } from '@yagisumi/groonga-stdio-client'

type StdioTestEnv = {
  client: GroongaStdioClient
  config: SetupConfig
}

function setup(config: SetupConfig): Promise<TestEnv> {
  return new Promise((resolve) => {
    const client = createClient(config.db_path, { groongaPath: getGroongaPath() })
    const env: StdioTestEnv = {
      config,
      client,
    }
    resolve(env)
  })
}

function teardown(env: StdioTestEnv): Promise<void> {
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

export default class StdioEnvironment extends NodeEnvironment {
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
    g.clientInterface = 'stdio'
  }
}
