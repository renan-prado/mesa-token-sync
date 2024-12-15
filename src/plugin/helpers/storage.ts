
type GITHUB_FIELDS = 'NAME' | 'ACCESS_KEY' | 'BRANCH' | 'REPOSITORY'
export const storageAttr = (name: string, attr: GITHUB_FIELDS) => `GTH_${attr}_${name}`
