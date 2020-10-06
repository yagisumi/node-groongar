import * as funcs from './funcs'
import { setupClient, teardownClient } from './env_http'

declare const global: any

for (const f in funcs) {
  global[f] = (funcs as any)[f]
}

global.setupClient = setupClient
global.teardownClient = teardownClient
global.clientInterface = 'http'
