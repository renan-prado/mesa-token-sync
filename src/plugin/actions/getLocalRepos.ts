import type { GithubRepositoryData } from '../../typings/common.types'
import { createActionHandler } from '../helpers/createActionHandler'
import { sendMessage } from '../helpers/sendMessage'

type GITHUB_FIELDS = 'NAME' | 'ACCESS_KEY' | 'BRANCH' | 'REPOSITORY'

const storageAttr = (name: string, attr: GITHUB_FIELDS) => `GTH_${attr}_${name}`

async function main() {
  const { getAsync, keysAsync } = figma.clientStorage

  const keys = await keysAsync()

  const onlyRepositoryName = keys.filter((key) =>
    key.includes('GTH_REPOSITORY_')
  )

  const repositories = onlyRepositoryName.map(async (repoFullName) => {
    const [_, KEY] = repoFullName.split('GTH_REPOSITORY_')
    const accessKey = await getAsync(storageAttr(KEY, 'ACCESS_KEY'))
    const name = await getAsync(storageAttr(KEY, 'NAME'))
    const branch = await getAsync(storageAttr(KEY, 'BRANCH'))
    const repository = await getAsync(storageAttr(KEY, 'REPOSITORY'))

    return {
      name,
      accessKey,
      repository,
      branch,
    }
  })

  const response: GithubRepositoryData[] = await Promise.all(repositories)

  sendMessage('get-local-respos', { repos: response })
}

export default createActionHandler<GithubRepositoryData>(
  'get-local-respos',
  main
)
