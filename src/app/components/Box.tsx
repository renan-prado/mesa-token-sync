import { ReactNode } from 'react'

type BoxType = {
  children: ReactNode
  className?: string
}

export function Box({ children, className }: BoxType) {
  return (
    <div
      className={`flex flex-col mt-4 py-4 px-4 w-full border border-zinc-200 rounded-lg ${className}`}
    >
      {children}
    </div>
  )
}
