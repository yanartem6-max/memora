'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { apiClient } from '@/lib/api-client'
import { BottomNavigation } from '@/components/BottomNavigation'
import { BalanceCard } from '@/components/BalanceCard'
import { QuickActions } from '@/components/QuickActions'
import { Header, PageHeader } from '@/components/Header'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Card } from '@/components/Card'
import { SkeletonBalance, SkeletonCard_ } from '@/components/Skeleton'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAppStore()
  const [balance, setBalance] = useState<number>(1000)
  const [change, setChange] = useState<number>(48.21)
  const [changePercent, setChangePercent] = useState<number>(4.82)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }

    const fetchBalance = async () => {
      try {
        const response = await apiClient.getWalletBalance()
        if (response.data.success && response.data.data) {
          setBalance(response.data.data.balance)
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch balance:', error)
        setIsLoading(false)
      }
    }

    fetchBalance()
  }, [isAuthenticated, router])

  const quickActions = [
    {
      label: 'Send',
      icon: '📤',
      href: '/send',
    },
    {
      label: 'Receive',
      icon: '📥',
      href: '/receive',
    },
    {
      label: 'Buy',
      icon: '💳',
      href: '/buy',
    },
    {
      label: 'Swap',
      icon: '🔄',
      href: '/swap',
    },
  ]

  const greeting = (() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  })()

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-memora-light dark:bg-memora-dark pb-24">
      {/* Header */}
      <PageHeader greeting={`${greeting}, ${user?.firstName || 'User'}`} />

      {/* Balance Card */}
      {isLoading ? (
        <div className="px-4">
          <SkeletonBalance />
        </div>
      ) : (
        <BalanceCard
          balance={balance}
          change={change}
          changePercent={changePercent}
          currency="USDT"
        />
      )}

      {/* Quick Actions */}
      <QuickActions actions={quickActions} />

      {/* Trending Section */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary dark:text-white">
            Trending
          </h2>
          <Link href="/discover" className="text-memora-purple text-sm font-medium">
            View all →
          </Link>
        </div>

        {isLoading ? (
          <SkeletonCard_ count={3} />
        ) : (
          <div className="space-y-3">
            {[
              { symbol: 'MEME', name: 'Memecoin', change: 42.4 },
              { symbol: 'DOGE', name: 'Dogecoin', change: 18.7 },
              { symbol: 'PEPE', name: 'Pepe', change: 12.4 },
            ].map((token) => (
              <Link
                key={token.symbol}
                href={`/token/${token.symbol}`}
              >
                <Card className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-lg">💎</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary dark:text-white">
                        {token.symbol}
                      </p>
                      <p className="text-xs text-secondary dark:text-secondary-dark">
                        {token.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 dark:text-green-400 font-semibold">
                      +{token.change}%
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Social Feed Section */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary dark:text-white">
            People you follow
          </h2>
          <Link href="/activity" className="text-memora-purple text-sm font-medium">
            View all →
          </Link>
        </div>

        {isLoading ? (
          <SkeletonCard_ count={2} />
        ) : (
          <div className="space-y-3">
            {[
              { name: '@alpha', action: 'bought', token: 'MEME', amount: '$4,200', time: '2m ago' },
              { name: '@cryptofox', action: 'sold', token: 'SOL', amount: '$1,842', time: '5m ago' },
            ].map((post) => (
              <Card key={post.name} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-primary dark:text-white">
                    {post.name}
                  </p>
                  <p className="text-sm text-secondary dark:text-secondary-dark">
                    {post.action} <span className="font-semibold">${post.token}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {post.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary dark:text-white">
                    {post.amount}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
