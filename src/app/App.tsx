import React, { useEffect } from 'react'
import './styles/ui.css'
import { EmptyContainer } from './components/EmptyContainer'
import { useFormSyncRepo } from './hooks/useFormSyncRepo'
import { FormSyncRepo } from './components/Form/FormSyncRepo'
import { useAction } from './hooks/useAction'
import type { GithubRepositoryData } from '../typings/common.types'
import { RepositoryList } from './components/RepositoryList/RepositoryList'

function App() {
  const { message: randonUpdate } = useAction('delete-github-repo')
  const { message: getLocalRepo, send: getLocalRepos } = useAction<{
    repos: GithubRepositoryData[]
  }>('get-local-respos')

  const { isOpen: isFormSyncRepoOpen } = useFormSyncRepo()

  const repositories = getLocalRepo?.repos ?? []
  const emptyShow = !isFormSyncRepoOpen && repositories.length === 0
  const repositoryListShow = !isFormSyncRepoOpen && repositories.length > 0

  useEffect(() => {
    getLocalRepos({ repos: [] })
  }, [isFormSyncRepoOpen, randonUpdate])

  return (
    <article className="w-full h-full bg-zinc-800">
      {emptyShow ? <EmptyContainer /> : null}
      {isFormSyncRepoOpen ? <FormSyncRepo /> : null}
      {repositoryListShow ? (
        <RepositoryList repositories={repositories} />
      ) : null}
    </article>
  )
}

export default App
