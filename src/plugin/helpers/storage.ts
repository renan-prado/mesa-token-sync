export type GITHUB_FIELDS = 'NAME' | 'ACCESS_KEY' | 'BRANCH' | 'REPOSITORY'
export const GITHUB_KEY_PREFIX = 'GTH'

/**
 * This function aims to create a key for the storage of the plugin.
 *
 * @param {string} name - The name of the repository.
 * @param {GITHUB_FIELDS} attr - The attribute of the repository.
 * @returns {string} - The key for the storage.
 */
export function getStorageKey(name: string, attr: GITHUB_FIELDS) {
  return `${GITHUB_KEY_PREFIX}_${attr}_${name}`
}
