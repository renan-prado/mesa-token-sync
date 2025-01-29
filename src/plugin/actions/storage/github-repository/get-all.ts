import { createActionHandler } from '@plugin/helpers/createActionHandler'
import { getLocalRepositories } from '@plugin/helpers/getLocalRepositories'
import { sendMessage } from '@plugin/helpers/sendMessage'
import { GithubRepositoryData } from '@typings/common.types'

async function main() {
  const response = await getLocalRepositories()
  sendMessage('storage/github-repository/get-all', response)
}

export default createActionHandler<GithubRepositoryData>(
  'storage/github-repository/get-all',
  main
)
