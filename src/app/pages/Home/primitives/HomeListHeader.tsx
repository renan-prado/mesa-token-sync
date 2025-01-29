import { Button } from '@app/components/Button'
import { useAction } from '@app/hooks/useAction'
import { useRoute } from '@app/stores'
import { ExternalLink, Plus } from 'lucide-react'

export function HomeListHeader() {
  const { send: exportTokens } = useAction('export-tokens')
  const setRoute = useRoute((s) => s.setRoute)

  return (
    <header className="flex justify-between">
      <h2 className="text-2xl font-semibold">Repositories</h2>
      <div className="flex gap-2">
        <Button
          theme="light"
          onClick={() => exportTokens({ repository: 'ALL' })}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          <span className="text-sm font-semibold">Export to All</span>
        </Button>
        <Button onClick={() => setRoute('form-page')}>
          <Plus className="mr-1 h-4 w-4" />
          <span className="text-sm font-semibold">Add</span>
        </Button>
      </div>
    </header>
  )
}
