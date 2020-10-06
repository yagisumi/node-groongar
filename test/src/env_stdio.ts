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

export function sleep(msec: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, msec))
}

export async function teardownClient(env: StdioTestEnv) {
  await env.client.commandAsync('quit').catch(() => 0)
  await sleep(300)
  for (let i = 0; i < 12; i++) {
    try {
      env.client.kill()
      await sleep(500)
      if (!env.client.isAlive()) {
        break
      }
    } catch (e) {
      // empty
    }
  }
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
