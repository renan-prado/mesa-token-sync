import { Check, ExternalLink, Github, Loader2, Trash2, X } from 'lucide-react'
import { useEffect } from 'react'
import { Box } from '@app/components/Box'
import { useAction } from '@app/hooks/useAction'
import { Button } from '@app/components/Button'
import { useRoute } from '@app/stores'
import { GithubRepositoryData } from '@typings/common.types'

type Repository = {
  status?: 'loading' | 'success' | 'default' | 'error'
} & GithubRepositoryData

type RepositoryItemProps = {
  index?: number
} & Repository

function RepositoryStatusSuccess() {
  return (
    <span className="bg-green-600 absolute -top-2 -right-1 rounded-full p-1">
      <Check className="h-2 w-2 text-white" />
    </span>
  )
}

function RepositoryStatusLoading() {
  return (
    <span className="bg-zinc-500 absolute -top-2 -right-1 rounded-full p-1">
      <Loader2 className="h-2 w-2 text-white animate-spin" />
    </span>
  )
}

function RepositoryStatusError() {
  return (
    <span className="bg-red-700 absolute -top-2 -right-1 rounded-full p-1">
      <X className="h-2 w-2 text-white" />
    </span>
  )
}

function RepositoryItem({
  repository,
  branch,
  index = 0,
  status = 'default',
}: RepositoryItemProps) {
  const { send: exportTokens } = useAction('export-tokens')
  const { send: deleteGithubRepo } = useAction('delete-github-repo')

  return (
    <li
      data-index={index}
      className="flex justify-between w-full py-4 data-[index=0]:border-none border-t border-zinc-200"
    >
      <div className="flex gap-3 items-center">
        <div className="relative">
          <Github className="h-5 w-5" />
          {status === 'success' && <RepositoryStatusSuccess />}
          {status === 'loading' && <RepositoryStatusLoading />}
          {status === 'error' && <RepositoryStatusError />}
        </div>
        <span
          data-loading={status === 'loading'}
          className="font-semibold flex gap-2 data-[loading=true]:pointer-events-none data-[loading=true]:opacity-50"
        >
          {repository}
          <span className="text-xs py-1 px-2 rounded-md text-zinc-500 border border-zinc-200">
            {branch}
          </span>
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => exportTokens({ repository })}
          theme="light"
          disabled={status === 'loading'}
        >
          <ExternalLink className="mr-1 h-4 w-4" />
          <span className="font-semibold text-sm">Export</span>
        </Button>
        <Button
          onClick={() => deleteGithubRepo({ repository })}
          theme="light"
          disabled={status === 'loading'}
        >
          <Trash2 className="mr-1 h-4 w-4 text-red-600" />
          <span className="font-semibold text-sm text-red-600">Delete</span>
        </Button>
      </div>
    </li>
  )
}

function RepositoryEmpty() {
  const setRoute = useRoute((s) => s.setRoute)

  return (
    <div className="flex flex-col h-72 overflow-auto gap-4 text-center justify-center items-center py-10">
      <span>It seems there’s nothing here.</span>
      <Button onClick={() => setRoute('form-page')}>
        <Github className="h-5 w-5 text-white" />
        <span className="ml-1 text-sm font-semibold">Sync new repository</span>
      </Button>
    </div>
  )
}

export function HomeRepoList() {
  const { message: repositories, send: update } =
    useAction<Repository[]>('get-local-respos')

  useEffect(() => {
    update([])
  }, [])

  const size = repositories?.length || 0

  return (
    <Box>
      {size === 0 ? <RepositoryEmpty /> : null}
      <ul className="max-h-[294px] overflow-auto px-2">
        {repositories?.map((props, index) => (
          <RepositoryItem key={props.repository} index={index} {...props} />
        ))}
      </ul>
    </Box>
  )
}
