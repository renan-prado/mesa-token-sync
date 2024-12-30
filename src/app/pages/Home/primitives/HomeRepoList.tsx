import { Check, ExternalLink, Github, Loader2, Trash2, X } from 'lucide-react'
import React from 'react'
import { Button } from '../../../components/Button'
import { useAction } from '../../../hooks/useAction'

type Repository = {
  repository: string
  status?: 'loading' | 'success' | 'default' | 'error'
}

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
          className="font-semibold data-[loading=true]:pointer-events-none data-[loading=true]:opacity-50"
        >
          {repository}
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

export function HomeRepoList() {
  const repositories: Repository[] = [
    { repository: 'mesainc/main-website', status: 'success' },
    { repository: 'mesainc/design-system', status: 'loading' },
    { repository: 'mesainc/mobile-app', status: 'error' },
    { repository: 'mesainc/marketing-site', status: 'default' },
  ]

  return (
    <ul className="flex flex-col mt-4 py-4 px-4 w-full border border-zinc-200 rounded-lg">
      {repositories.map((props, index) => (
        <RepositoryItem key={props.repository} index={index} {...props} />
      ))}
    </ul>
  )
}
