'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { AuthProvider } from '@/components/AuthProvider'
import { FullPageLoader } from '@/components/LoadingSpinner'

function SplashContent() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAppStore()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/home')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <FullPageLoader />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-memora-light to-gray-100 dark:from-memora-dark dark:to-gray-900">
      <div className="text-center px-6">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-memora-purple rounded-3xl mb-4">
            <span className="text-4xl font-bold text-white">M</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-primary dark:text-white mb-2 animate-slide-up">
          MEMORA
        </h1>

        {/* Tagline */}
        <p className="text-lg text-secondary dark:text-secondary-dark mb-8 animate-slide-up">
          Remember the moves that matter
        </p>

        {/* Description */}
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-sm mx-auto mb-12 animate-slide-up">
          Discover tokens, traders, and opportunities with the premium social crypto platform
        </p>

        {/* Loading indicator */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-2 h-2 bg-memora-purple rounded-full animate-pulse" />
          <span className="text-sm text-secondary dark:text-secondary-dark">
            Connecting to Telegram...
          </span>
        </div>
      </div>
    </div>
  )
}

export default function RootPage() {
  return (
    <AuthProvider>
      <SplashContent />
    </AuthProvider>
  )
}
