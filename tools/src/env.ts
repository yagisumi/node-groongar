import path from 'path'
import fs from 'fs'
import util from 'util'
import rimraf from 'rimraf'
import moment from 'moment'
import sortObject from 'sortobject'

export function path_normalize(path: string) {
  return path.replace(/\\/g, '/')
}

export type Config = {
  groonga: string
  groonga_suggest_create_dataset: string
  // groonga_src: string
  // grntest: string
  // prettier: string
}

function sanitize(value: unknown, init: string) {
  if (typeof value !== 'string') {
    return init
  } else {
    if (value.length === 0) {
      return init
    } else {
      return value
    }
  }
}

const CONFIG_FILE = 'config.json'
const ROOT_DIR = path.resolve(__dirname, '../..')
const TOOLS_DIR = path.join(ROOT_DIR, 'tools')
const PATH_CONFIG = path.join(TOOLS_DIR, CONFIG_FILE)

export function init_config() {
  if (fs.existsSync(PATH_CONFIG)) {
    throw new Error(`already exists ${CONFIG_FILE}`)
  }

  let groonga = 'groonga'
  let groonga_suggest_create_dataset = 'groonga-suggest-create-dataset'
  if (process.platform === 'win32') {
    if (process.env.GROONGA_PATH) {
      groonga = path.join(process.env.GROONGA_PATH, groonga + '.exe')
      groonga_suggest_create_dataset = path.join(process.env.GROONGA_PATH, groonga_suggest_create_dataset + '.exe')
    }
  }

  const config: Config = {
    groonga,
    groonga_suggest_create_dataset,
  }

  fs.writeFileSync(PATH_CONFIG, JSON.stringify(config, null, 2))
  console.log(`created ${PATH_CONFIG}`)
}

export class Env {
  readonly path_config = PATH_CONFIG

  readonly groongar_root_dir = ROOT_DIR
  readonly groongar_test_dir = path.join(this.groongar_root_dir, 'test')
  readonly groongar_grntest_dir = path.join(this.groongar_test_dir, 'grntest')
  readonly groongar_typecheck_dir = path.join(this.groongar_test_dir, 'typecheck')
  readonly path_groongar_ts = path.join(ROOT_DIR, 'src/groongar.ts')
  readonly tools_dir = TOOLS_DIR
  readonly groonga_repository_dir = path.join(this.tools_dir, 'groonga')

  readonly report_dir = path.join(TOOLS_DIR, 'report')
  readonly doc_test_dir = path.join(TOOLS_DIR, 'doc_test')
  readonly temp_dir = path.join(TOOLS_DIR, 'temp')
  readonly tools_test_dir = path.join(TOOLS_DIR, 'test')

  config: Config

  get groonga() {
    return this.config.groonga
  }

  get groonga_suggest_create_dataset() {
    return this.config.groonga_suggest_create_dataset
  }

  constructor() {
    this.config = this.load_config()
  }

  private load_config() {
    if (!fs.existsSync(this.path_config)) {
      init_config()
    }

    const file = fs.readFileSync(this.path_config, { encoding: 'utf8' })
    const cfg = JSON.parse(file) as Config
    if (typeof cfg !== 'object') {
      throw new Error(`invalid format: ${CONFIG_FILE}`)
    }

    // if (cfg.groonga_src == null) {
    //   throw new Error(`missing groonga source directory`)
    // }

    cfg.groonga = sanitize(cfg.groonga, 'groonga')
    cfg.groonga_suggest_create_dataset = sanitize(cfg.groonga, 'groonga-suggest-create-dataset')
    // cfg.grntest = sanitize(cfg.grntest, 'grntest')
    // cfg.prettier = sanitize(cfg.prettier, 'prettier')

    return cfg
  }

  clean() {
    rimraf.sync(this.report_dir)
    rimraf.sync(this.doc_test_dir)
  }

  clean_test() {
    rimraf.sync(this.tools_test_dir)
  }

  save_report(name: string, obj: any) {
    if (!fs.existsSync(this.report_dir)) {
      fs.mkdirSync(this.report_dir)
    }

    const now = moment()
    const file = `${name}-${now.format('YYYYMMDD-hhmmss')}.txt`

    fs.writeFileSync(path.join(this.report_dir, file), util.inspect(sortObject(obj), false, 2))
  }
}
