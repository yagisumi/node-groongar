import * as funcs from './funcs'
import { getGroongaPath } from './funcs'
import { SetupConfig, TestEnv } from './types'
import { createClient, GroongaStdioClient } from '@yagisumi/groonga-stdio-client'

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

declare const global: any

for (const f in funcs) {
  global[f] = (funcs as any)[f]
}

global.setupClient = setupClient
global.teardownClient = teardownClient
global.clientInterface = 'stdio'
