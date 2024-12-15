import { createActionHandler } from '../helpers/createActionHandler'
import { storageAttr } from '../helpers/storage'
import { uploadToGitHub } from '../helpers/uploadToGithub'
import { TailwindStore } from '../models/tailwind/TailwindStore'

type ExportTokensType = {
  repository: string
}

async function main({ repository }: ExportTokensType) {
  const { getAsync } = figma.clientStorage
  const tailwindTokens = new TailwindStore()
  const tokens = await tailwindTokens.get()

  const repo = await getAsync(storageAttr(repository, 'REPOSITORY'))
  const auth = await getAsync(storageAttr(repository, 'ACCESS_KEY'))
  const branch = await getAsync(storageAttr(repository, 'BRANCH'))

  const isSucess = await uploadToGitHub(tokens, 'figma/design-tokens.json', {
    auth,
    branch,
    repo
  })

  if (isSucess) {
    figma.notify('Tokens exportado com sucesso!')
  }

}

export default createActionHandler<ExportTokensType>('export-tokens', main)
