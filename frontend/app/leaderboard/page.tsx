'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { apiClient } from '@/lib/api-client'
import { BottomNavigation } from '@/components/BottomNavigation'
import { Header } from '@/components/Header'
import { LeaderboardRank } from '@/components/LeaderboardRank'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { SkeletonCard_ } from '@/components/Skeleton'

export default function LeaderboardPage() {
  const router = useRouter()
  const { isAuthenticated } = useAppStore()
  const [traders, setTraders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [period, setPeriod] = useState<'24h' | '7d' | '30d' | 'all'>('24h')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }

    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true)
        const response = await apiClient.getLeaderboard(period)
        if (response.data.success && response.data.data) {
          const formattedTraders = response.data.data.map((trader: any, index: number) => ({
            rank: index + 1,
            username: trader.username,
            avatar: trader.avatar,
            pnl: trader.pnl,
            change: trader.pnl,
            trades: trader.trades,
          }))
          setTraders(formattedTraders)
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboard()
  }, [isAuthenticated, router, period])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-memora-light dark:bg-memora-dark pb-24">
      {/* Header */}
      <Header title="Leaderboard" subtitle="Top traders by performance" />

      {/* Period Tabs */}
      <div className="flex gap-2 px-4 mb-6 overflow-x-auto pb-2">
        {['24h', '7d', '30d', 'all'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p as any)}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
              period === p
                ? 'bg-memora-purple text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-primary dark:text-white'
            }`}
          >
            {p === '24h' && '24h'}
            {p === '7d' && '7D'}
            {p === '30d' && '30D'}
            {p === 'all' && 'All Time'}
          </button>
        ))}
      </div>

      {/* Leaderboard List */}
      <div className="px-4">
        {isLoading ? (
          <SkeletonCard_ count={5} />
        ) : traders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary dark:text-secondary-dark">
              No traders yet
            </p>
          </div>
        ) : (
          <LeaderboardRank traders={traders} />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
