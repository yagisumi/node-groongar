import fs from 'fs'
import path from 'path'

export function mkdir(dir: string) {
  fs.mkdirSync(dir)
}

export function rimraf(dir_path: string) {
  if (fs.existsSync(dir_path)) {
    fs.readdirSync(dir_path).forEach(function (entry) {
      const entry_path = path.join(dir_path, entry)
      if (fs.lstatSync(entry_path).isDirectory()) {
        rimraf(entry_path)
      } else {
        fs.unlinkSync(entry_path)
      }
    })
    fs.rmdirSync(dir_path)
  }
}

export function getGroongaPath() {
  if (process.platform === 'win32' && process.env.GROONGA_PATH != null) {
    return path.join(process.env.GROONGA_PATH, 'bin/groonga.exe')
  }
  return 'groonga'
}
