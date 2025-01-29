export type GITHUB_FIELDS = 'NAME' | 'ACCESS_KEY' | 'BRANCH' | 'REPOSITORY'

export const GITHUB_KEY_PREFIX = 'GTH'
export const getStorageKey = (name: string, attr: GITHUB_FIELDS) =>
  `${GITHUB_KEY_PREFIX}_${attr}_${name}`
