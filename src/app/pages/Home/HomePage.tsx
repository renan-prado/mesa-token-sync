import React from 'react'
import { HomeLayout } from './primitives'

export function HomePage() {
  return (
    <HomeLayout.Container>
      <HomeLayout.Title />
      <HomeLayout.Download />
      <HomeLayout.Header />
      <HomeLayout.List />
    </HomeLayout.Container>
  )
}
