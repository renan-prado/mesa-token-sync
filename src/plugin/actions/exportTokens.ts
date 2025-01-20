import { GeneralToken } from '@plugin/models'
import { createActionHandler } from '../helpers/createActionHandler'
import { storageAttr } from '../helpers/storage'
import { uploadToGitHub } from '../helpers/uploadToGithub'
import { FigmaToken } from '@plugin/modules'

type ExportTokensType = {
  repository: string
}

async function main({ repository }: ExportTokensType) {
  // const { getAsync } = figma.clientStorage
  // const generalTokens = new GeneralToken()
  // const tokens = await generalTokens.get()

  const tokens = new FigmaToken()
  await tokens.build()

  const colors = tokens.local.styles.colors
  const texts = tokens.local.styles.texts
  const variables = tokens.local.variables.variables

  console.log('->', colors)
  console.log('->', texts)
  console.log('->', variables)

  // const repo = await getAsync(storageAttr(repository, 'REPOSITORY'))
  // const auth = await getAsync(storageAttr(repository, 'ACCESS_KEY'))
  // const branch = await getAsync(storageAttr(repository, 'BRANCH'))

  // const isSucess = await uploadToGitHub(tokens, 'figma/design-tokens.json', {
  //   auth,
  //   branch,
  //   repo,
  // })

  // if (isSucess) {
  //   figma.notify('Tokens exportado com sucesso!')
  // }
}

export default createActionHandler<ExportTokensType>('export-tokens', main)
