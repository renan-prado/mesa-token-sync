import React from 'react'
import { ReactNode } from 'react'

type HomeContainerProps = {
  children: ReactNode
}

export function HomeContainer({ children }: HomeContainerProps) {
  return <section className="container mx-auto px-4 py-6">{children}</section>
}
