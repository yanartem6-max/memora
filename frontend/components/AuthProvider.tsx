'use client'

import { useEffect, ReactNode } from 'react'
import { useAppStore } from '@/lib/store'
import { apiClient } from '@/lib/api-client'
import { useTelegram } from '@/lib/telegram'
import { useRouter } from 'next/navigation'

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { setUser, setToken, setWallet, setLoading, setError } = useAppStore()
  const { isReady, getInitData, ready, expand } = useTelegram()

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Wait for Telegram WebApp to be ready
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
          ready()
          expand()

          // Give Telegram a moment to initialize
          await new Promise(resolve => setTimeout(resolve, 500))

          const initData = getInitData()

          if (!initData) {
            setError('Failed to get Telegram data')
            return
          }

          setLoading(true)

          // Authenticate with backend
          const response = await apiClient.authenticateTelegram(initData)

          if (response.data.success && response.data.data) {
            const { user, token, wallet } = response.data.data

            // Save token to localStorage
            localStorage.setItem('auth_token', token)

            // Update store
            setUser(user)
            setToken(token)
            setWallet(wallet)
            setLoading(false)

            // Navigate to home
            router.push('/home')
          }
        }
      } catch (error) {
        console.error('Authentication error:', error)
        setError('Authentication failed')
        setLoading(false)
      }
    }

    initializeApp()
  }, [])

  return <>{children}</>
}
