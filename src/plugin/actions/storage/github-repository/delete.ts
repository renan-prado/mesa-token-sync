import { createActionHandler } from '@plugin/helpers/createActionHandler'
import { getLocalRepositories } from '@plugin/helpers/getLocalRepositories'
import { sendMessage } from '@plugin/helpers/sendMessage'
import { FigmaStorage } from '@plugin/modules'
import { GithubRepositoryData } from '@typings/common.types'

async function main({ repository }: GithubRepositoryData) {
  const REPOSITORY = await FigmaStorage.get(repository, 'REPOSITORY')

  if (!!REPOSITORY) {
    await FigmaStorage.delete(repository, 'REPOSITORY')
    await FigmaStorage.delete(repository, 'ACCESS_KEY')
    await FigmaStorage.delete(repository, 'BRANCH')
    await FigmaStorage.delete(repository, 'NAME')

    figma.notify('Repositório deletado com sucesso!')

    await getLocalRepositories()
  } else {
    figma.notify('Repositório não encontrado!', { error: true })
  }

  sendMessage('storage/github-repository/delete', { random: Math.random() })
}

export default createActionHandler<GithubRepositoryData>(
  'storage/github-repository/delete',
  main
)
