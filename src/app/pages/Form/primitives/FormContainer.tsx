import { ReactNode } from 'react'

type FormContainerProps = {
  children: ReactNode
}

export function FormContainer({ children }: FormContainerProps) {
  return <section className="container mx-auto px-4 py-6">{children}</section>
}
