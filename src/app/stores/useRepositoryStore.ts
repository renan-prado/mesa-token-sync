import { create } from 'zustand'

interface RepositoryStore {
  accessKey: string
  repository: string
  branch: string
  setAccessKey: (key: string) => void
  setRepository: (repo: string) => void
  setBranch: (branch: string) => void
}

export const useRepositoryStore = create<RepositoryStore>((set) => ({
  accessKey: '',
  repository: '',
  branch: '',
  setAccessKey: (key) => set({ accessKey: key }),
  setRepository: (repo) => set({ repository: repo }),
  setBranch: (branch) => set({ branch }),
}))
