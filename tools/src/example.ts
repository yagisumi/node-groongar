import { Env } from './env'
import { Git } from './git'
import { parseGrnTest, GrnTestElem } from './grntest_parser'
import level from 'level'
import path from 'path'
import { NrnDB } from './nrndb'
import fs from 'fs'
import readdirp from 'readdirp'

type GrnTestMap = {
  [key: number]: GrnTestElem[]
}

export async function example_1() {
  const env = new Env()
  const git = new Git(env.groonga_repository_dir, env.groonga_git_url)
  const db = level<string, GrnTestMap>(path.join(env.tools_dir, 'cache'), { valueEncoding: 'json' })

  const r_files = await git.getFiles()
  if (r_files.ok) {
    for (const file of r_files.value) {
      if (file.startsWith('test/command/suite')) {
        if (file.endsWith('.test') || file.endsWith('.expected')) {
          console.log(file)
          const v = await db.get(file).catch(() => {
            return {} as GrnTestMap
          })
          const r_time = await git.getCommitTime(file)
          if (r_time.error) {
            console.error(r_time.error)
            continue
          }
          console.log(new Date(r_time.value))
          const cache = v[r_time.value]
          if (cache) {
            continue
          }

          const r_grntest = await git.catFile(file)
          if (r_grntest.ok) {
            const elems = parseGrnTest(r_grntest.value, true)
            v[r_time.value] = elems
            await db.put(file, v)
          }
        }
      }
    }
  }

  await db.close()
}

// example: 907187.903ms
// example: 680393.195ms cached

export async function example_2() {
  const env = new Env()
  const git = new Git(env.groonga_repository_dir, env.groonga_git_url)
  const db = new NrnDB(path.join(env.tools_dir, 'tmp.nrndb/tmp.cache.db'))

  const r_files = await git.getFiles()
  if (r_files.ok) {
    for (const file of r_files.value) {
      if (file.startsWith('test/command/suite')) {
        if (file.endsWith('.test') || file.endsWith('.expected')) {
          console.log(file)
          const v = db.get(file) || {}
          const r_time = await git.getCommitTime(file)
          if (r_time.error) {
            console.error(r_time.error)
            continue
          }
          console.log(new Date(r_time.value))
          const cache = v[r_time.value]
          if (cache) {
            console.log(cache.length)
            continue
          }

          const r_grntest = await git.catFile(file)
          if (r_grntest.ok) {
            const elems = parseGrnTest(r_grntest.value, true)
            v[r_time.value] = elems
            db.put(file, v)
          }
        }
      }
    }
  }
}

// example: 860247.198ms
// example: 628194.774ms

export async function example_3() {
  const env = new Env()
  const git = new Git(env.groonga_repository_dir, env.groonga_git_url)
  // const db = new NrnDB(path.join(env.tools_dir, 'tmp.nrndb/tmp.cache.db'))

  const r_files = await git.getFiles()
  if (r_files.ok) {
    for (const file of r_files.value) {
      if (file.startsWith('test/command/suite')) {
        if (file.endsWith('.test') || file.endsWith('.expected')) {
          console.log(file)
          // const v = db.get(file) || {}
          const r_time = await git.getCommitTime(file)
          if (r_time.error) {
            console.error(r_time.error)
            continue
          }
          console.log(new Date(r_time.value))
          // const cache = v[r_time.value]
          // if (cache) {
          //   console.log(cache.length)
          //   continue
          // }

          const r_grntest = await git.catFile(file)
          if (r_grntest.ok) {
            const elems = parseGrnTest(r_grntest.value, true)
            // v[r_time.value] = elems
            // db.put(file, v)
          }
        }
      }
    }
  }
}

// example: 844616.778ms

export async function example() {
  const base = 'G:/data/workspace/script/groonga/src/groonga-10.0.2/test/command/suite'
  const entries = await readdirp.promise(base)
  entries.forEach((entry) => {
    console.log(entry.path)
    const content = fs.readFileSync(entry.fullPath, { encoding: 'utf8' })
    const elems = parseGrnTest(content, true)
    console.log(elems.length)
  })
}
