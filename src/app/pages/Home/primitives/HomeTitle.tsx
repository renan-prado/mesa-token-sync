import { ReactNode } from 'react'

type HomeTitleProps = {
  children?: ReactNode
}

export function HomeTitle({
  children = 'Token Synchronization',
}: HomeTitleProps) {
  return <h1 className="text-3xl font-bold text-gray-800 mb-6">{children}</h1>
}
