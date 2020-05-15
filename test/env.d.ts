declare function setEnv(key: string, value: string): void
declare function deleteEnv(key: string): void
declare function mkdir(path: string): void
declare function exists(path: string): boolean
declare function rimraf(dir_path: string): void
declare function copyFile(src: string, dest: string): void
declare const clientInterface: 'nroonga' | 'http' | 'stdio'

type CommandCallback = (err: Error | undefined, data: any) => void
interface GroongaClient {
  command(command: string, options: object, callback: CommandCallback): void
  command(command: string, callback: CommandCallback): void
}
type SetupConfig = {
  db_path: string
}
interface TestEnv {
  client: GroongaClient
  config: SetupConfig
}

declare function setup(config: SetupConfig): Promise<TestEnv>
declare function teardown(env: TestEnv): Promise<void>
declare const context: any
