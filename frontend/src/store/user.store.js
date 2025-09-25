// store/userStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000 // in milliseconds

export const useUserStore = create(
  persist(
    (set, get) => ({
      username: '',
      email: '',
      influencer: '',
      lastUpdated: null, // track when the user was set

      setName: (name) =>
        set({ username: name, lastUpdated: Date.now() }),

      setEmail: (email) =>
        set({ email, lastUpdated: Date.now() }),

      setUser: (user) =>
        set({
          username: user.username,
          email: user.email,
          influencer: user.influencer,
          lastUpdated: Date.now(),
        }),

      clearUser: () =>
        set({ username: '', email: '', influencer: '', lastUpdated: null }),

      resetIfExpired: () => {
        const { lastUpdated } = get()
        if (!lastUpdated || Date.now() - lastUpdated > SEVEN_DAYS) {
          set({ username: '', email: '', influencer: '', lastUpdated: null })
        }
      },
    }),
    {
      name: 'PrimaSpot-storage', // key in localStorage
    }
  )
)
