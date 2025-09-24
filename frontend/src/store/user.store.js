// store/userStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      name: '',
      email: '',
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setUser: (user) => set({ name: user.name, email: user.email }),
      clearUser: () => set({ name: '', email: '' }),
    }),
    {
      name: 'user-storage', // key in localStorage
    }
  )
)
