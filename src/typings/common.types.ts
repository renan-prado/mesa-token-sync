export type Message<T extends Payload> = {
  action: string
  payload: T
}

export type Payload = {
  [key: string]: any
}

export type Action =
  | 'say-hello-to-ui'
  | 'say-hello-to-controller'
  | 'close-plugin'
  | 'toggle-form-sync-repo'
  | 'save-github-repo'
  | 'delete-github-repo'
  | 'get-local-respos'
  | 'export-tokens'

export type GithubRepositoryData = {
  accessKey: string
  repository: string
  branch: string
}
export type RGBA = { r: number; g: number; b: number; a: number }

export type ColorRGB = { color: RGB }
