import { Button } from '@app/components/Button'
import { useAction } from '@app/hooks/useAction'
import { useRepositoryStore, useRoute } from '@app/stores'
import { GithubRepositoryData } from '@typings/common.types'
import { ArrowLeft, Save } from 'lucide-react'

export function FormActions() {
  const setRoute = useRoute((s) => s.setRoute)
  const {
    accessKey,
    branch,
    repository,
    setAccessKey,
    setBranch,
    setRepository,
  } = useRepositoryStore()
  const { send } = useAction<GithubRepositoryData>('save-github-repo')

  const onSaveRepository = () => {
    send({
      accessKey,
      branch,
      repository,
    })

    setRoute('home-page')
    setBranch('')
    setAccessKey('')
    setRepository('')
  }

  return (
    <div data-layout="form-actions" className="flex justify-between w-full">
      <Button theme="light" onClick={() => setRoute('home-page')}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span className="font-semibold text-sm">Back to Previous Page</span>
      </Button>
      <Button onClick={onSaveRepository}>
        <Save className="w-4 h-4 mr-2" />
        <span className="font-semibold text-sm">Save</span>
      </Button>
    </div>
  )
}
