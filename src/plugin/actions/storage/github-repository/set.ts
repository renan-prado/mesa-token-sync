import { GithubRepositoryData } from '@typings/common.types'
import { createActionHandler } from '@plugin/helpers/createActionHandler'
import { FigmaStorage } from '@plugin/modules'
import { getLocalRepositories } from '@plugin/helpers/getLocalRepositories'

async function main({ accessKey, branch, repository }: GithubRepositoryData) {
  const REPOSITORY = await FigmaStorage.get(repository, 'REPOSITORY')

  if (!!REPOSITORY) {
    figma.notify('Repositório já cadastrado!', { error: true })
  } else {
    await FigmaStorage.set(repository, 'ACCESS_KEY', accessKey)
    await FigmaStorage.set(repository, 'BRANCH', branch)
    await FigmaStorage.set(repository, 'REPOSITORY', repository)

    figma.notify('Repositório cadastrado com sucesso!')

    await getLocalRepositories()
  }
}

export default createActionHandler<GithubRepositoryData>(
  'storage/github-repository/set',
  main
)
