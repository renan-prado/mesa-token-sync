import React, { type ReactNode } from 'react'

type ButtonType = {
  children: ReactNode
  onClick?: () => void
}

export function Button({ children, onClick }: ButtonType) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center gap-2 h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition active:scale-95 outline-blue-500 focus-within:outline-2 text-white"
    >
      {children}
    </button>
  )
}
