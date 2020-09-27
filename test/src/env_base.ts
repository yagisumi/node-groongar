import NodeEnvironment from 'jest-environment-node'
import { Config } from '@jest/types'

import {
  setEnv, //
  deleteEnv,
  mkdir,
  rimraf,
  exists,
  copyFile,
  copyPath,
  generateSeries,
  sleep,
  fixDBPath,
  fixObjectInspect,
} from './funcs'

export class BaseEnvironment extends NodeEnvironment {
  constructor(config: Config.ProjectConfig) {
    super(config)
    const g = this.global as any
    g.setEnv = setEnv
    g.deleteEnv = deleteEnv
    g.mkdir = mkdir
    g.rimraf = rimraf
    g.exists = exists
    g.copyFile = copyFile
    // grntest
    g.copyPath = copyPath
    g.generateSeries = generateSeries
    g.sleep = sleep
    g.fixDBPath = fixDBPath
    g.fixObjectInspect = fixObjectInspect
  }
}
