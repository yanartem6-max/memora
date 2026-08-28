'use client'

import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { useEffect } from 'react'
import { BottomNavigation } from '@/components/BottomNavigation'
import { Header } from '@/components/Header'
import { Card } from '@/components/Card'

export default function ActivityPage() {
  const router = useRouter()
  const { isAuthenticated } = useAppStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const activities = [
    { id: 1, type: 'buy', token: 'MEME', amount: 2380952, price: '$100', time: 'Today, 14:32' },
    { id: 2, type: 'sell', token: 'DOGE', amount: 500, price: '$250', time: 'Yesterday, 10:15' },
    { id: 3, type: 'swap', from: 'USDT', to: 'SOL', amount: '0.62', price: '$100', time: '2 days ago' },
  ]

  return (
    <div className="min-h-screen bg-memora-light dark:bg-memora-dark pb-24">
      {/* Header */}
      <Header title="Activity" subtitle="Your transaction history" />

      {/* Filters */}
      <div className="flex gap-2 px-4 mb-6 overflow-x-auto pb-2">
        {['All', 'Buys', 'Sells', 'Swaps', 'Sends'].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap bg-gray-100 dark:bg-gray-800 text-primary dark:text-white hover:bg-memora-purple hover:text-white transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="px-4 space-y-3">
        {activities.map((activity) => (
          <Card key={activity.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-lg">
                  {activity.type === 'buy' && '📈'}
                  {activity.type === 'sell' && '📉'}
                  {activity.type === 'swap' && '🔄'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-primary dark:text-white capitalize">
                  {activity.type === 'swap'
                    ? `Swap ${activity.from} → ${activity.to}`
                    : `${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} ${activity.token}`}
                </p>
                <p className="text-xs text-secondary dark:text-secondary-dark">
                  {activity.time}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-primary dark:text-white">
                {activity.price}
              </p>
              {activity.amount && (
                <p className="text-xs text-secondary dark:text-secondary-dark">
                  {activity.amount}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
