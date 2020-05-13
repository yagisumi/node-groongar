import fs from 'fs'
import path from 'path'

export function setEnv(key: string, value: string) {
  process.env[key] = value
}

export function deleteEnv(key: string) {
  delete process.env[key]
}

export function mkdir(path: string) {
  fs.mkdirSync(path)
}

export function exists(path: string) {
  return fs.existsSync(path)
}

export function copyFile(src: string, dest: string) {
  fs.copyFileSync(src, dest)
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
  if (process.platform === 'win32' && process.env.GROONGA_PATH) {
    return path.join(process.env.GROONGA_PATH, 'bin/groonga.exe')
  }
  return 'groonga'
}
