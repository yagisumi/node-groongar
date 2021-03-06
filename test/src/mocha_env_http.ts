import * as funcs from './funcs'
import { getGroongaPath } from './funcs'
import { SetupConfig, TestEnv } from './types'
import { createClient, GroongaHttpClient } from '@yagisumi/groonga-http-client'
import axios from 'axios'
import getPort from 'get-port'
import child_process from 'child_process'

type HttpTestEnv = {
  client: GroongaHttpClient
  config: SetupConfig
  server: child_process.ChildProcessWithoutNullStreams
}

const groonga = getGroongaPath()

export function setupClient(config: SetupConfig): Promise<TestEnv> {
  return new Promise((resolve, reject) => {
    getPort()
      .then((port) => {
        const server = child_process.spawn(
          groonga,
          ['--protocol', 'http', '--port', `${port}`, '-s', '-n', config.db_path],
          {
            stdio: 'pipe',
          }
        )

        let error: Error | undefined = undefined
        server.on('error', (err) => {
          error = err
        })
        server.on('exit', (code) => {
          if (typeof code === 'number' && code !== 0) {
            error = new Error(`exit code: ${code}`)
          }
        })

        setTimeout(() => {
          if (error) {
            reject(error)
          } else if (typeof (server as any).exitCode === 'number') {
            reject(new Error(`exit code: ${(server as any).exitCode}`))
          } else {
            const axios_instance = axios.create({
              timeout: 10000,
            })
            const client = createClient(axios_instance, `http://localhost:${port}`)
            const env: HttpTestEnv = {
              config,
              client,
              server,
            }
            resolve(env)
          }
        }, 500)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function sleep(msec: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, msec))
}

export async function teardownClient(env: HttpTestEnv) {
  await env.client.commandAsync('shutdown').catch(() => 0)
  await sleep(300)
  for (let i = 0; i < 10; i++) {
    try {
      env.server.kill()
      await sleep(300)
      if (env.server.exitCode != null || env.server.killed) {
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
global.clientInterface = 'http'
