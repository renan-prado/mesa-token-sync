import { GITHUB_FIELDS, getStorageKey } from '@plugin/helpers/storage'

export const FigmaStorage = {
  async get(name: string, attr: GITHUB_FIELDS) {
    const { getAsync } = figma.clientStorage
    return getAsync(getStorageKey(name, attr))
  },

  async set(name: string, attr: GITHUB_FIELDS, value: string) {
    const { setAsync } = figma.clientStorage
    return setAsync(getStorageKey(name, attr), value)
  },

  async delete(name: string, attr: GITHUB_FIELDS) {
    const { deleteAsync } = figma.clientStorage
    return deleteAsync(getStorageKey(name, attr))
  },

  repositories: {
    async getValuesByAttr(attr: GITHUB_FIELDS) {
      const { keysAsync } = figma.clientStorage
      const keys = await keysAsync()
      return keys.filter((key) => key.includes(`GTH_${attr}_`))
    },
  },
}
