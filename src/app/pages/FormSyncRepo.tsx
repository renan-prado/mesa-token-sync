import React from 'react'
import { Button } from '../components/Button'
import { useRoute } from '../stores'

export function FormSyncRepo() {
  const setRoute = useRoute((s) => s.setRoute)

  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to the Form Sync Repo Page
      </h1>
      <Button onClick={() => setRoute('home-page')}> Voltar </Button>
    </section>
  )
}
