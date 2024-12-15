import { createActionHandler } from '../helpers/createActionHandler'
import { uploadToGitHub } from '../helpers/uploadToGithub'
import { TailwindStore } from '../models/tailwind/TailwindStore'

type ExportTokensType = {
  repository: string
}

async function main({}: ExportTokensType) {
  const tailwindTokens = new TailwindStore()
  const tokens = await tailwindTokens.get()

  await uploadToGitHub(tokens, 'figma/design-tokens.json')
  console.log(tokens);

}

export default createActionHandler<ExportTokensType>('export-tokens', main)
