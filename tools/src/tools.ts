import heredoc from 'heredocument'
import { init_config, Env } from './env'
import { generateGronngar } from './generate_groongar'

function printUsage() {
  console.log(heredoc`
    USAGE: node tools/lib/tools.js [commands...]
      Commands
        init           create config.json
        doc_test       create grntest of groonga/docs
        convert        convert tests of grntest to tests of groongar
        outputs        collect outputs of grntest
        typecheck      generate tests for types of return values
        groongar       generate groongar.ts
        clean          delete directories [report doc_test outputs]
        clean_test     delete tests of groongar
  `)
}

const COMMANDS = {
  init: false,
  doc_test: false,
  convert: false,
  outputs: false,
  groongar: false,
  clean: false,
  clean_test: false,
}

function isKeyofCommands(key: string): key is keyof typeof COMMANDS {
  return key in COMMANDS
}

function main() {
  const commands = Object.create(COMMANDS) as typeof COMMANDS
  const argv = process.argv.slice(2)
  if (argv.length === 0) {
    printUsage()
    return
  }

  argv.forEach((arg) => {
    if (isKeyofCommands(arg)) {
      commands[arg] = true
    } else {
      console.warn(`unknown command: ${arg}`)
    }
  })

  if (Object.keys(commands).length === 0) {
    printUsage()
    return
  }

  let env: Env
  Object.keys(commands).forEach((cmd) => {
    console.log(`tools.js ${cmd}`)
    if (cmd === 'init') {
      init_config()
    } else if (cmd === 'groongar') {
      env = env ?? new Env()
      generateGronngar(env)
    }
  })
}

main()
