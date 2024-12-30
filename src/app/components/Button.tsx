import { Loader2 } from 'lucide-react'
import React, { type ReactNode } from 'react'

type ButtonType = {
  children: ReactNode
  onClick?: () => void
  theme?: 'dark' | 'light'
  isLoading?: boolean
  disabled?: boolean
}

export function Button({
  children,
  onClick,
  theme = 'dark',
  isLoading = false,
  disabled = false,
}: ButtonType) {
  if (theme === 'dark') {
    return (
      <button
        data-loading={isLoading}
        onClick={onClick}
        disabled={disabled || isLoading}
        className="flex relative group disabled:pointer-events-none disabled:opacity-50 data-[loading=true]:text-transparent justify-center shadow-sm items-center gap-2 h-10 px-4 rounded-md bg-primary hover:bg-primary-accent transition active:scale-95 outline-blue-500 focus-within:outline-2 text-white"
      >
        {children}
        <Loader2 className="h-6 w-6 text-white absolute animate-spin group-data-[loading=true]:flex hidden" />
      </button>
    )
  }

  return (
    <button
      data-loading={isLoading}
      onClick={onClick}
      disabled={disabled || isLoading}
      className="flex justify-center group border disabled:pointer-events-none disabled:opacity-60 data-[loading=true]:text-transparent shadow-sm border-zinc-200 items-center gap-2 h-10 px-4 rounded-md bg-white hover:bg-accent transition active:scale-95 outline-primary focus-within:outline-2 text-primary"
    >
      {children}
      <Loader2 className="h-6 w-6 text-primary absolute animate-spin group-data-[loading=true]:flex hidden" />
    </button>
  )
}
