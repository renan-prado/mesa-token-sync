import { createActionHandler } from '../helpers/createActionHandler'
import { TailwindStore } from '../models/tailwind/TailwindStore'

type ExportTokensType = {
  repository: string
}

async function main({}: ExportTokensType) {
  const tailwindTokens = new TailwindStore()
  await tailwindTokens.sync()

  const tokens = tailwindTokens.get()

  console.log(tokens);


  // const tokens: Record<string, any> = {}

  // const colors = await getColors()
  // tokens.colors = transformColors({ colors }).colors

  // console.log('tokens', tokens)
}

export default createActionHandler<ExportTokensType>('export-tokens', main)
