export type Message<T extends Payload> = {
  action: string
  payload: T
}

export type Payload = {
  [key: string]: any
}

export type Action =
  // Storage
  | 'storage/github-repository/set'
  | 'storage/github-repository/get-all'
  | 'storage/github-repository/delete'

  // Plugin
  | 'close-plugin'
  | 'toggle-form-page'
  | 'export-tokens'

export type GithubRepositoryData = {
  accessKey: string
  repository: string
  branch: string
}
