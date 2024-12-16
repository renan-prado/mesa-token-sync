import React from 'react'
import type { GithubRepositoryData } from '../../../typings/common.types'
import { Button } from '../Button'
import GithubPng from '../../assets/github-mark-white.svg'
import PlusSVG from '../../assets/plus.svg'
import DeleteSVG from '../../assets/delete.svg'
import SucessoSVG from '../../assets/verificado.svg'
import { useFormSyncRepo } from '../../hooks/useFormSyncRepo'
import { useAction } from '../../hooks/useAction'

type RepositoryListType = {
  repositories: GithubRepositoryData[]
}

export function RepositoryList({ repositories }: RepositoryListType) {
  const { send: exportTokens } = useAction('export-tokens')
  const { send: deleteGithubRepo } = useAction('delete-github-repo')
  const { open: openFormSyncRepo } = useFormSyncRepo()

  const deleteRepo = (repository: string) => {
    deleteGithubRepo({ repository })
  }

  const exportTokenHandle = (repository: string) => {
    exportTokens({ repository })
  }

  return (
    <div data-component="repository-list" className="flex flex-col gap-6 p-4">
      <h2 className="text-xl text-zinc-300 font-bold">Meus repositórios:</h2>
      <ul className="flex flex-col gap-2">
        {repositories.map((repo) => {
          return (
            <li
              key={repo.repository}
              className="flex items-center gap-2 justify-between h-16 rounded-lg border border-zinc-600 px-4"
            >
              <div className="text-zinc-400 flex gap-4 items-center">
                <img src={GithubPng} alt="" className="w-4 h-4" />
                <span>{repo.repository}</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => exportTokenHandle(repo.repository)}>
                  Exportar
                </Button>
                <button
                  onClick={() => deleteRepo(repo.repository)}
                  className="bg-transparent px-2 rounded-lg hover:bg-zinc-700 active:scale-95"
                >
                  <img src={DeleteSVG} alt="" className="flex size-4" />
                  <div className='w-4' />
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <div className='w-full gap-2 items-center flex justify-center py-2 bg-green-200 rounded-lg'>
        <img src={SucessoSVG} alt="" className="size-4" />
        Tokens exportados com sucesso!
      </div>

      <Button onClick={openFormSyncRepo}>
        <img src={PlusSVG} alt="" className="size-4" />
        <span>Adicionar repositório</span>
      </Button>
    </div>
  )
}
