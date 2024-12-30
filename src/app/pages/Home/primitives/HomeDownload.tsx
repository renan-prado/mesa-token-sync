import React from 'react'
import { ReactNode } from 'react'
import { Button } from '../../../components/Button'
import { Download, Loader2 } from 'lucide-react'

type HomeDownloadProps = {
  children?: ReactNode
  isLoading?: boolean
}

export function HomeDownload({
  children = 'Download design-tokens.json',
  isLoading = false,
}: HomeDownloadProps) {
  return (
    <div className="group flex gap-4 mb-8 items-center">
      <Button disabled={isLoading}>
        <Download className="mr-2 h-4 w-4" />
        <span className="text-sm font-semibold">{children}</span>
      </Button>
      <Loader2
        data-loading={isLoading}
        className="h-6 w-6 hidden data-[loading=true]:flex text-primary animate-spin"
      />
    </div>
  )
}
