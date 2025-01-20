import type { GithubRepositoryData } from '../../typings/common.types'
import { createActionHandler } from '../helpers/createActionHandler'
import { getLocalRepositories } from '../helpers/getLocalRepositories'
import { sendMessage } from '../helpers/sendMessage'

async function main() {
  const response = await getLocalRepositories()
  sendMessage('get-local-respos', response)
}

export default createActionHandler<GithubRepositoryData>(
  'get-local-respos',
  main
)
