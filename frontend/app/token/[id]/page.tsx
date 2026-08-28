'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { apiClient } from '@/lib/api-client'
import { BottomNavigation } from '@/components/BottomNavigation'
import { Card } from '@/components/Card'
import { Badge, PriceChange } from '@/components/Badge'
import { Button } from '@/components/Button'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { formatCurrency, formatCompactNumber } from '@/lib/format'

export default function TokenPage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated } = useAppStore()
  const [token, setToken] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }

    const fetchToken = async () => {
      try {
        const response = await apiClient.getToken(params.id as string)
        if (response.data.success && response.data.data) {
          setToken(response.data.data)
        }
      } catch (error) {
        console.error('Failed to fetch token:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchToken()
  }, [isAuthenticated, router, params.id])

  if (!isAuthenticated) return null
  if (isLoading) return <div className="flex items-center justify-center h-screen"><LoadingSpinner size="lg" /></div>
  if (!token) return <div className="text-center py-12">Token not found</div>

  return (
    <div className="min-h-screen bg-memora-light dark:bg-memora-dark pb-24">
      {/* Header */}
      <div className="px-4 pt-4 pb-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-primary dark:text-white">
          ← Back
        </button>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="text-2xl"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Token Info */}
      <Card className="mx-4 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            💰
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold text-primary dark:text-white">
                {token.symbol}
              </h1>
              {token.isVerified && <Badge variant="success" size="sm">Verified</Badge>}
              {token.isMeme && <Badge variant="warning" size="sm">Meme</Badge>}
            </div>
            <p className="text-sm text-secondary dark:text-secondary-dark">
              {token.name}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-4xl font-bold text-primary dark:text-white mb-2">
            ${token.price?.toFixed(8) || '0.00'}
          </p>
          {token.change24h !== undefined && (
            <PriceChange value={token.change24h} />
          )}
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 mb-6">
        <Card>
          <p className="text-xs text-secondary dark:text-secondary-dark mb-1">Market Cap</p>
          <p className="font-semibold text-primary dark:text-white">
            {formatCompactNumber(token.marketCap)}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-secondary dark:text-secondary-dark mb-1">24h Volume</p>
          <p className="font-semibold text-primary dark:text-white">
            {formatCompactNumber(token.volume24h)}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-secondary dark:text-secondary-dark mb-1">Liquidity</p>
          <p className="font-semibold text-primary dark:text-white">
            {formatCompactNumber(token.liquidity)}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-secondary dark:text-secondary-dark mb-1">Holders</p>
          <p className="font-semibold text-primary dark:text-white">
            {token.holders?.toLocaleString() || '0'}
          </p>
        </Card>
      </div>

      {/* Token Safety */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-primary dark:text-white mb-3">Token Safety</h2>
        <Card className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-sm text-primary dark:text-white">Liquidity verified</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-sm text-primary dark:text-white">Contract verified</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-sm text-primary dark:text-white">Ownership renounced</span>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="px-4 space-y-3 mb-4">
        <Button
          variant="primary"
          fullWidth
          onClick={() => router.push(`/buy?token=${token.symbol}`)}
        >
          Buy {token.symbol}
        </Button>
        <Button
          variant="secondary"
          fullWidth
          onClick={() => router.push(`/swap?to=${token.symbol}`)}
        >
          Swap to {token.symbol}
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
