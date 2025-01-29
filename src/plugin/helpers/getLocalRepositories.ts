import { GithubRepositoryData } from '@typings/common.types'
import { sendMessage } from './sendMessage'
import { FigmaStorage } from '@plugin/modules'

/**
 * This function aims to get the local repositories from the storage.
 *
 * @returns {Promise<GithubRepositoryData[]>} - The local repositories.
 */
export async function getLocalRepositories() {
  const onlyRepositoryName = await FigmaStorage.repositories.getValuesByAttr(
    'REPOSITORY'
  )

  const repositories = onlyRepositoryName.map(async (repoFullName) => {
    const [_, KEY] = repoFullName.split('GTH_REPOSITORY_')
    const accessKey = await FigmaStorage.get(KEY, 'ACCESS_KEY')
    const branch = await FigmaStorage.get(KEY, 'BRANCH')
    const repository = await FigmaStorage.get(KEY, 'REPOSITORY')

    return {
      accessKey,
      repository,
      branch,
    }
  })

  const response: GithubRepositoryData[] = await Promise.all(repositories)
  sendMessage('storage/github-repository/get-all', response)
  return response
}
