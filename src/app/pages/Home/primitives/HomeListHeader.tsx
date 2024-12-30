import React from 'react'
import { Button } from '../../../components/Button'
import { ExternalLink, Plus } from 'lucide-react'

export function HomeListHeader() {
  return (
    <header className="flex justify-between">
      <h2 className="text-2xl font-semibold">Repositories</h2>
      <div className="flex gap-2">
        <Button theme="light">
          <ExternalLink className="mr-2 h-4 w-4" />
          <span className="text-sm font-semibold">Export to All</span>
        </Button>
        <Button>
          <Plus className="mr-1 h-4 w-4" />
          <span className="text-sm font-semibold">Add</span>
        </Button>
      </div>
    </header>
  )
}
