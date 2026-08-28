import { create } from 'zustand'
import { User, Wallet, Asset, UserSettings } from '@/types'

interface AppState {
  // Auth
  isAuthenticated: boolean
  user: User | null
  token: string | null
  
  // Wallet
  wallet: Wallet | null
  assets: Asset[]
  totalBalance: number
  
  // Settings
  settings: UserSettings | null
  isDarkMode: boolean
  
  // UI
  isLoading: boolean
  error: string | null
  
  // Actions
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setWallet: (wallet: Wallet | null) => void
  setAssets: (assets: Asset[]) => void
  setTotalBalance: (balance: number) => void
  setSettings: (settings: UserSettings | null) => void
  setDarkMode: (isDark: boolean) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  wallet: null,
  assets: [],
  totalBalance: 0,
  settings: null,
  isDarkMode: false,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token }),
  setWallet: (wallet) => set({ wallet }),
  setAssets: (assets) => set({ assets }),
  setTotalBalance: (totalBalance) => set({ totalBalance }),
  setSettings: (settings) => set({ settings }),
  setDarkMode: (isDarkMode) => set({ isDarkMode }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      wallet: null,
      assets: [],
      totalBalance: 0,
    }),
}))

interface DiscoverState {
  tokens: any[]
  selectedToken: any | null
  isLoading: boolean
  
  setTokens: (tokens: any[]) => void
  setSelectedToken: (token: any) => void
  setLoading: (isLoading: boolean) => void
}

export const useDiscoverStore = create<DiscoverState>((set) => ({
  tokens: [],
  selectedToken: null,
  isLoading: false,

  setTokens: (tokens) => set({ tokens }),
  setSelectedToken: (selectedToken) => set({ selectedToken }),
  setLoading: (isLoading) => set({ isLoading }),
}))

interface FeedState {
  posts: any[]
  isLoading: boolean
  hasMore: boolean
  page: number
  
  setPosts: (posts: any[]) => void
  addPosts: (posts: any[]) => void
  setLoading: (isLoading: boolean) => void
  setHasMore: (hasMore: boolean) => void
  setPage: (page: number) => void
}

export const useFeedStore = create<FeedState>((set) => ({
  posts: [],
  isLoading: false,
  hasMore: true,
  page: 1,

  setPosts: (posts) => set({ posts }),
  addPosts: (newPosts) => set((state) => ({ posts: [...state.posts, ...newPosts] })),
  setLoading: (isLoading) => set({ isLoading }),
  setHasMore: (hasMore) => set({ hasMore }),
  setPage: (page) => set({ page }),
}))
