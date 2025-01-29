import { GITHUB_FIELDS, getStorageKey } from '@plugin/helpers/storage'

/**
 * This module aims to provide a way to interact with the Figma storage.
 *
 * @module FigmaStorage
 */
export const FigmaStorage = {
  /**
   * This function aims to get a value from the Figma storage.
   *
   * @param {string} name - The name of the repository.
   * @param {GITHUB_FIELDS} attr - The attribute of the repository.
   * @returns {Promise<string>} - The promise to be resolved when the value is retrieved.
   */
  async get(name: string, attr: GITHUB_FIELDS) {
    const { getAsync } = figma.clientStorage
    return getAsync(getStorageKey(name, attr))
  },

  /**
   * This function aims to set a value in the Figma storage.
   *
   * @param {string} name - The name of the repository.
   * @param {GITHUB_FIELDS} attr - The attribute of the repository.
   * @param {string} value - The value to be set.
   * @returns {Promise<void>} - The promise to be resolved when the value is set.
   */
  async set(name: string, attr: GITHUB_FIELDS, value: string) {
    const { setAsync } = figma.clientStorage
    return setAsync(getStorageKey(name, attr), value)
  },

  /**
   * This function aims to delete a value from the Figma storage.
   *
   * @param {string} name - The name of the repository.
   * @param {GITHUB_FIELDS} attr - The attribute of the repository.
   * @returns {Promise<void>} - The promise to be resolved when the value is deleted.
   */
  async delete(name: string, attr: GITHUB_FIELDS) {
    const { deleteAsync } = figma.clientStorage
    return deleteAsync(getStorageKey(name, attr))
  },

  repositories: {
    /**
     * This function aims to get the values from the Figma storage by attribute.
     *
     * @param {GITHUB_FIELDS} attr - The attribute of the repository.
     * @returns {Promise<string[]>} - The promise to be resolved when the values are retrieved.
     */
    async getValuesByAttr(attr: GITHUB_FIELDS) {
      const { keysAsync } = figma.clientStorage
      const keys = await keysAsync()
      return keys.filter((key) => key.includes(`GTH_${attr}_`))
    },
  },
}
