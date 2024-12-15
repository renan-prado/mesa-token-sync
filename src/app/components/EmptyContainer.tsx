import React from 'react'
import GithubPng from '../assets/github-mark-white.svg'
import { Button } from './Button'
import { useFormSyncRepo } from '../hooks/useFormSyncRepo'

export function EmptyContainer() {
  const { open: openFormSyncRepo } = useFormSyncRepo()

  return (
    <section
      data-component="empty-container"
      className="flex w-full h-full justify-center items-center p-4"
    >
      <div className="flex flex-col gap-6 items-center justify-center w-full h-40 border-2 border-dashed border-zinc-600 rounded-2xl">
        <p className="text-base text-zinc-400 text-center">
          Ops! Nenhum repositório do GitHub conectado.
        </p>
        <Button onClick={openFormSyncRepo}>
          <img src={GithubPng} alt="" className="w-4 h-4" />
          <span>Sincronizar repositório Github</span>
        </Button>
      </div>
    </section>
  )
}
