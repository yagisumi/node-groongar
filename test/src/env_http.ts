import NodeEnvironment from 'jest-environment-node'
import { Config } from '@jest/types'
import { setEnv, deleteEnv, mkdir, rimraf, exists, copyFile, getGroongaPath } from './funcs'
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

function setup(config: SetupConfig): Promise<TestEnv> {
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
            const client = createClient(axios, `http://localhost:${port}`)
            const env: HttpTestEnv = {
              config,
              client,
              server,
            }
            resolve(env)
          }
        }, 1000)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function teardown(env: HttpTestEnv): Promise<void> {
  return new Promise((resolve) => {
    try {
      env.client.command('shutdown', () => {})
    } catch (err) {
      // empty
    }
    setTimeout(() => {
      try {
        env.server.kill()
      } catch (err) {
        // empty
      }
      resolve()
    }, 1000)
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
    g.config = config
    g.context = this.context
    g.clientInterface = 'http'
  }
}
