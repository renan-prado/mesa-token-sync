import { GithubRepositoryData } from '@typings/common.types'
import { storageAttr } from './storage'
import { sendMessage } from './sendMessage'

export async function getLocalRepositories() {
  const { getAsync, keysAsync } = figma.clientStorage

  const keys = await keysAsync()

  const onlyRepositoryName = keys.filter((key) =>
    key.includes('GTH_REPOSITORY_')
  )

  const repositories = onlyRepositoryName.map(async (repoFullName) => {
    const [_, KEY] = repoFullName.split('GTH_REPOSITORY_')
    const accessKey = await getAsync(storageAttr(KEY, 'ACCESS_KEY'))
    const branch = await getAsync(storageAttr(KEY, 'BRANCH'))
    const repository = await getAsync(storageAttr(KEY, 'REPOSITORY'))

    return {
      accessKey,
      repository,
      branch,
    }
  })

  const response: GithubRepositoryData[] = await Promise.all(repositories)
  sendMessage('get-local-respos', response)
  return response
}
