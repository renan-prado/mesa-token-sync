import React, { useState } from 'react'
import './styles/ui.css'
import { FormSyncRepo, HomePage } from './pages'

export default function App() {
  const [route] = useState<'home' | 'form-sync-repo'>('home')

  return (
    <article className="w-full h-full bg-white text-primary">
      {route === 'home' && <HomePage />}
      {route === 'form-sync-repo' && <FormSyncRepo />}
    </article>
  )
}
