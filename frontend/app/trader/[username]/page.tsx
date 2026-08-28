'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { apiClient } from '@/lib/api-client'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { PriceChange } from '@/components/Badge'

export default function TraderPage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated } = useAppStore()
  const [trader, setTrader] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }

    const fetchTrader = async () => {
      try {
        const response = await apiClient.getTrader(params.username as string)
        if (response.data.success && response.data.data) {
          setTrader(response.data.data)
        }
      } catch (error) {
        console.error('Failed to fetch trader:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrader()
  }, [isAuthenticated, router, params.username])

  const handleFollow = async () => {
    try {
      await apiClient.followTrader(trader.id)
      setIsFollowing(true)
    } catch (error) {
      console.error('Failed to follow:', error)
    }
  }

  if (!isAuthenticated) return null
  if (isLoading) return <div className="flex items-center justify-center h-screen"><LoadingSpinner size="lg" /></div>
  if (!trader) return <div className="text-center py-12">Trader not found</div>

  return (
    <div className="min-h-screen bg-memora-light dark:bg-memora-dark pb-24">
      {/* Header */}
      <div className="px-4 pt-4 pb-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-primary dark:text-white">
          ← Back
        </button>
      </div>

      {/* Trader Card */}
      <Card className="mx-4 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-memora-purple rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
            {trader.avatar ? '👤' : trader.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary dark:text-white">
              @{trader.username}
            </h1>
            {trader.bio && (
              <p className="text-sm text-secondary dark:text-secondary-dark mt-1">
                {trader.bio}
              </p>
            )}
          </div>
        </div>

        {/* Follow Button */}
        <Button
          variant={isFollowing ? 'secondary' : 'primary'}
          fullWidth
          onClick={handleFollow}
          disabled={isFollowing}
        >
          {isFollowing ? '✓ Following' : 'Follow'}
        </Button>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 mb-6">
        <Card>
          <p className="text-xs text-secondary dark:text-secondary-dark mb-1">Total PnL</p>
          <PriceChange value={trader.totalPnL} />
        </Card>
        <Card>
          <p className="text-xs text-secondary dark:text-secondary-dark mb-1">30D PnL</p>
          <PriceChange value={trader.pnL30d} />
        </Card>
        <Card>
          <p className="text-xs text-secondary dark:text-secondary-dark mb-1">Total Trades</p>
          <p className="font-bold text-primary dark:text-white">{trader.totalTrades}</p>
        </Card>
        <Card>
          <p className="text-xs text-secondary dark:text-secondary-dark mb-1">Win Rate</p>
          <p className="font-bold text-primary dark:text-white">{trader.winRate.toFixed(1)}%</p>
        </Card>
        <Card>
          <p className="text-xs text-secondary dark:text-secondary-dark mb-1">Followers</p>
          <p className="font-bold text-primary dark:text-white">{trader.followers}</p>
        </Card>
        <Card>
          <p className="text-xs text-secondary dark:text-secondary-dark mb-1">Avg Hold</p>
          <p className="font-bold text-primary dark:text-white">{trader.averageHoldTime}h</p>
        </Card>
      </div>

      {/* Recent Trades */}
      <div className="px-4">
        <h2 className="text-lg font-semibold text-primary dark:text-white mb-3">Recent Trades</h2>
        <div className="space-y-2">
          {trader.recentTrades?.slice(0, 5).map((trade: any) => (
            <Card key={trade.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-primary dark:text-white capitalize">
                  {trade.type}
                </p>
                <p className="text-xs text-secondary dark:text-secondary-dark">
                  {trade.amount} tokens
                </p>
              </div>
              {trade.pnl_percentage && (
                <PriceChange value={trade.pnl_percentage} />
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
