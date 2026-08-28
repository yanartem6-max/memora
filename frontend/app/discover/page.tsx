'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { apiClient } from '@/lib/api-client'
import { BottomNavigation } from '@/components/BottomNavigation'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { Card } from '@/components/Card'
import { LoadingSpinner, SkeletonCard_ } from '@/components/Skeleton'
import { PriceChange } from '@/components/Badge'
import Link from 'next/link'

export default function DiscoverPage() {
  const router = useRouter()
  const { isAuthenticated } = useAppStore()
  const [search, setSearch] = useState('')
  const [tokens, setTokens] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'memecoins'>('trending')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }

    const fetchTokens = async () => {
      try {
        setIsLoading(true)
        let response

        if (search) {
          response = await apiClient.searchTokens(search)
        } else if (activeTab === 'new') {
          response = await apiClient.getNewTokens()
        } else if (activeTab === 'memecoins') {
          response = await apiClient.getMemecoins()
        } else {
          response = await apiClient.getTrendingTokens()
        }

        if (response.data.success && response.data.data) {
          setTokens(response.data.data)
        }
      } catch (error) {
        console.error('Failed to fetch tokens:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(fetchTokens, search ? 500 : 0)
    return () => clearTimeout(timer)
  }, [isAuthenticated, router, search, activeTab])

  const tabs = [
    { id: 'trending', label: 'Trending', count: 'Top' },
    { id: 'new', label: 'New', count: 'New' },
    { id: 'memecoins', label: 'Memecoins', count: 'Meme' },
  ]

  return (
    <div className="min-h-screen bg-memora-light dark:bg-memora-dark pb-24">
      {/* Header */}
      <Header title="Discover" subtitle="Find tokens and traders" />

      {/* Search */}
      <div className="px-4 mb-6">
        <Input
          placeholder="Search tokens..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34c0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5c1.25 0 2.41-.38 3.39-.99l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          }
        />
      </div>

      {/* Tabs */}
      {!search && (
        <div className="flex gap-2 px-4 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-memora-purple text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-primary dark:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Tokens List */}
      <div className="px-4 space-y-3">
        {isLoading ? (
          <SkeletonCard_ count={5} />
        ) : tokens.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary dark:text-secondary-dark">
              No tokens found
            </p>
          </div>
        ) : (
          tokens.map((token) => (
            <Link
              key={token.id}
              href={`/token/${token.id}`}
            >
              <Card className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    {token.logoUrl ? (
                      <img
                        src={token.logoUrl}
                        alt={token.symbol}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xl">💰</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-primary dark:text-white truncate">
                        {token.symbol}
                      </p>
                      {token.isVerified && (
                        <span className="text-blue-500">✓</span>
                      )}
                      {token.isMeme && (
                        <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full">
                          Meme
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-secondary dark:text-secondary-dark truncate">
                      {token.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary dark:text-white">
                    {token.price ? `$${token.price.toFixed(8)}` : 'N/A'}
                  </p>
                  {token.change24h !== undefined && (
                    <PriceChange value={token.change24h} />
                  )}
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
