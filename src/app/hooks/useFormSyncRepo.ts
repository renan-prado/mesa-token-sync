import { useEffect, useState } from 'react'
import { useAction } from './useAction'

export type FormSyncType = { open: boolean }

export function useFormSyncRepo() {
  const { message, send } = useAction<FormSyncType>('toggle-form-sync-repo')
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (!!message && message.hasOwnProperty('open')) {
      setOpen(message.open)
    }
  }, [message])

  return {
    isOpen,
    open: () => send({ open: true }),
    close: () => send({ open: false }),
  }
}
