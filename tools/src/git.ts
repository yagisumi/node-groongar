import { exec, spawn } from 'child_process'
import { Result, OK, ERR } from './result'
import { existsSync } from 'fs'
import path from 'path'

export function formatTime(time: number) {
  const date = new Date(time)
  const YYYY = date.getFullYear()
  const MM = `${date.getMonth() + 1}`.padStart(2, '0')
  const DD = `${date.getDate()}`.padStart(2, '0')
  const hh = `${date.getHours()}`.padStart(2, '0')
  const mm = `${date.getMinutes()}`.padStart(2, '0')
  const ss = `${date.getSeconds()}`.padStart(2, '0')
  const tz_offset = date.getTimezoneOffset()
  const tz = [
    tz_offset <= 0 ? '+' : '-',
    Math.floor(Math.abs(tz_offset) / 60)
      .toString()
      .padStart(2, '0'),
    (tz_offset % 60).toString().padStart(2, '0'),
  ].join('')
  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss} ${tz}`
}

export class Git {
  readonly repositoryDir: string
  readonly repositoryName: string
  readonly repositoryParentDir: string
  readonly url: string

  constructor(repositoryDir: string, url: string) {
    this.repositoryDir = repositoryDir
    this.repositoryName = path.basename(repositoryDir)
    this.repositoryParentDir = path.resolve(repositoryDir, '..')
    this.url = url
  }

  clone(): Promise<Result<true>> {
    return new Promise((resolve) => {
      if (existsSync(this.repositoryDir)) {
        resolve(ERR(`repository directory already exists: ${this.repositoryDir}`))
      } else {
        const process = spawn('git', ['clone', '-b', 'master', this.url], {
          cwd: this.repositoryParentDir,
          stdio: 'inherit',
        })
        process.on('exit', (code) => {
          if (code === 0) {
            resolve(OK(true))
          } else {
            resolve(ERR(`exit code: ${code}`))
          }
        })
        process.on('error', (err) => {
          resolve(ERR(err))
        })
      }
    })
  }

  pull(): Promise<Result<true>> {
    return new Promise((resolve) => {
      const process = spawn('git', ['pull', 'origin', 'master'], {
        cwd: this.repositoryDir,
        stdio: 'inherit',
      })
      process.on('exit', (code) => {
        if (code === 0) {
          resolve(OK(true))
        } else {
          resolve(ERR(`exit code: ${code}`))
        }
      })
      process.on('error', (err) => {
        resolve(ERR(err))
      })
    })
  }

  getTagTime(tag: string): Promise<Result<number>> {
    return new Promise((resolve) => {
      exec(`git log -1 --format=%ai "${tag}"`, { cwd: this.repositoryDir }, (err, data) => {
        if (err) {
          resolve(ERR(err))
        } else {
          const time = Date.parse(data)
          if (isNaN(time)) {
            resolve(ERR('date parse error'))
          } else {
            resolve(OK(time))
          }
        }
      })
    })
  }

  getCommitTime(path: string, until?: number): Promise<Result<number>> {
    return new Promise((resolve) => {
      const until_option = until ? `--until="${formatTime(until)}"` : ''
      exec(`git log -1 ${until_option} --format=%ai -- "${path}"`, { cwd: this.repositoryDir }, (err, data) => {
        if (err) {
          resolve(ERR(err))
        } else {
          const time = Date.parse(data)
          if (isNaN(time)) {
            resolve(ERR('date parse error'))
          } else {
            resolve(OK(time))
          }
        }
      })
    })
  }

  getFiles(tag = 'HEAD'): Promise<Result<string[]>> {
    return new Promise((resolve) => {
      exec(`git ls-tree -r "${tag}"`, { cwd: this.repositoryDir }, (err, data) => {
        if (err) {
          resolve(ERR(err))
        } else {
          const files: string[] = []
          data.split(/\n/).forEach((line) => {
            if (line.match(/\S+\s+\S+\s+\S+\s+(.+)/)) {
              files.push(RegExp.$1.trimRight())
            }
          })
          resolve(OK(files))
        }
      })
    })
  }

  catFile(path: string, tag = 'HEAD'): Promise<Result<string>> {
    return new Promise((resolve) => {
      exec(`git cat-file -p "${tag}:${path}"`, { cwd: this.repositoryDir }, (err, data) => {
        if (err) {
          resolve(ERR(err))
        } else {
          resolve(OK(data))
        }
      })
    })
  }
}

export function syncGroonga(repositoryDir: string): Promise<Result<true>> {
  return new Promise((resolve) => {
    const git = new Git(repositoryDir, 'https://github.com/groonga/groonga.git')
    if (existsSync(repositoryDir)) {
      git.pull().then((r) => {
        if (r.error) {
          resolve(r)
        } else {
          resolve(OK(true))
        }
      })
    } else {
      git.clone().then((r) => {
        if (r.error) {
          resolve(r)
        } else {
          resolve(OK(true))
        }
      })
    }
  })
}
