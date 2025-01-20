import { create } from 'zustand'

type Route = 'home-page' | 'form-page'

type Store = {
  route: Route
  setRoute: (route: Route) => void
}

export const useRoute = create<Store>()((set) => ({
  route: 'home-page',
  setRoute: (route) => set(() => ({ route })),
}))
