import { createActionHandler } from '../helpers/createActionHandler'
import { FigmaToken } from '@plugin/modules'

type ExportTokensType = {
  repository: string
}

async function main({ repository }: ExportTokensType) {
  console.log('repository:', repository)

  const tokens = new FigmaToken()
  await tokens.build()

  const colors = tokens.local.styles.colors
  const texts = tokens.local.styles.texts
  const variables = tokens.local.variables.variables

  console.log('->', colors)
  console.log('->', texts)
  console.log('->', variables)

  // figma.notify('Tokens exportado com sucesso!')
}

export default createActionHandler<ExportTokensType>('export-tokens', main)
