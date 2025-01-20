import type { GithubRepositoryData } from '../../typings/common.types'
import { createActionHandler } from '../helpers/createActionHandler'
import { getLocalRepositories } from '../helpers/getLocalRepositories'
import { storageAttr } from '../helpers/storage'

async function main({ accessKey, branch, repository }: GithubRepositoryData) {
  const { setAsync, getAsync } = figma.clientStorage

  const REPOSITORY = await getAsync(storageAttr(repository, 'REPOSITORY'))

  if (!!REPOSITORY) {
    figma.notify('Repositório já cadastrado!', { error: true })
  } else {
    await setAsync(storageAttr(repository, 'ACCESS_KEY'), accessKey)
    await setAsync(storageAttr(repository, 'BRANCH'), branch)
    await setAsync(storageAttr(repository, 'REPOSITORY'), repository)

    figma.notify('Repositório cadastrado com sucesso!')

    await getLocalRepositories()
  }
}

export default createActionHandler<GithubRepositoryData>(
  'save-github-repo',
  main
)
