import { PriceChange } from '@/components/Badge'
import Link from 'next/link'

interface TraderRank {
  rank: number
  username: string
  avatar?: string
  pnl: number
  change: number
  trades: number
}

interface LeaderboardRankProps {
  traders: TraderRank[]
}

export function LeaderboardRank({ traders }: LeaderboardRankProps) {
  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${rank}`
    }
  }

  return (
    <div className="space-y-2">
      {traders.map((trader) => (
        <Link key={trader.username} href={`/trader/${trader.username}`}>
          <div className="px-4 py-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3">
            {/* Rank */}
            <div className="text-2xl w-8 flex-shrink-0">
              {getMedalEmoji(trader.rank)}
            </div>

            {/* Trader Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-primary dark:text-white truncate">
                @{trader.username}
              </p>
              <p className="text-xs text-secondary dark:text-secondary-dark">
                {trader.trades} trades
              </p>
            </div>

            {/* PnL */}
            <div className="text-right">
              <PriceChange value={trader.change} />
              <p className="text-sm font-bold text-primary dark:text-white">
                {trader.pnl > 0 ? '+' : ''}{trader.pnl.toFixed(0)}%
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
