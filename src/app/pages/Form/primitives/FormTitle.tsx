import { ReactNode } from 'react'

type FormTitleProps = {
  children?: ReactNode
}

export function FormTitle({ children = 'Add Repository' }: FormTitleProps) {
  return <h1 className="text-3xl font-bold text-gray-800 mb-6">{children}</h1>
}
