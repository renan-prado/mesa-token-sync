import type { GithubRepositoryData } from '../../typings/common.types'
import { createActionHandler } from '../helpers/createActionHandler'
import { sendMessage } from '../helpers/sendMessage'

type GITHUB_FIELDS = 'NAME' | 'ACCESS_KEY' | 'BRANCH' | 'REPOSITORY'

const storageAttr = (name: string, attr: GITHUB_FIELDS) => `GTH_${attr}_${name}`

async function main({
  accessKey,
  branch,
  name,
  repository,
}: GithubRepositoryData) {
  const { setAsync, getAsync } = figma.clientStorage

  const REPOSITORY = await getAsync(storageAttr(repository, 'REPOSITORY'))

  if (!!REPOSITORY) {
    figma.notify('Repositório já cadastrado!', { error: true })
  } else {
    await setAsync(storageAttr(repository, 'NAME'), name)
    await setAsync(storageAttr(repository, 'ACCESS_KEY'), accessKey)
    await setAsync(storageAttr(repository, 'BRANCH'), branch)
    await setAsync(storageAttr(repository, 'REPOSITORY'), repository)

    figma.notify('Repositório cadastrado com sucesso!')
    sendMessage('toggle-form-sync-repo', { open: false })
  }
}

export default createActionHandler<GithubRepositoryData>(
  'save-github-repo',
  main
)
