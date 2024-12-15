import type { GithubRepositoryData } from '../../typings/common.types'
import { createActionHandler } from '../helpers/createActionHandler'
import { sendMessage } from '../helpers/sendMessage'

type GITHUB_FIELDS = 'NAME' | 'ACCESS_KEY' | 'BRANCH' | 'REPOSITORY'

const storageAttr = (name: string, attr: GITHUB_FIELDS) => `GTH_${attr}_${name}`

async function main({ repository }: GithubRepositoryData) {
  const { getAsync, deleteAsync } = figma.clientStorage

  const REPOSITORY = await getAsync(storageAttr(repository, 'REPOSITORY'))

  if (!!REPOSITORY) {
    await deleteAsync(storageAttr(repository, 'REPOSITORY'))
    await deleteAsync(storageAttr(repository, 'ACCESS_KEY'))
    await deleteAsync(storageAttr(repository, 'BRANCH'))
    await deleteAsync(storageAttr(repository, 'NAME'))

    figma.notify('Repositório deletado com sucesso!')
  } else {
    figma.notify('Repositório não encontrado!', { error: true })
  }

  sendMessage('delete-github-repo', { random: Math.random() })
}

export default createActionHandler<GithubRepositoryData>(
  'delete-github-repo',
  main
)
