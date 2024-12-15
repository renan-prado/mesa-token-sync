import { createActionHandler } from '../helpers/createActionHandler'
import { getColors, transformColors } from '../helpers/getTokenColors'

type ExportTokensType = {
  repository: string
}

async function main({}: ExportTokensType) {
  const texts = await (figma as any).getLocalTextStylesAsync()

  console.log('texts', texts)

  const tokens: Record<string, any> = {}

  const colors = await getColors()
  tokens.colors = transformColors({ colors }).colors

  console.log('tokens', tokens)
}

export default createActionHandler<ExportTokensType>('export-tokens', main)
