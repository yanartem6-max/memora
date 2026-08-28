import { formatCurrency } from '@/lib/format'
import clsx from 'clsx'

interface BalanceCardProps {
  balance: number
  change: number
  changePercent: number
  currency?: string
  isLoading?: boolean
}

export function BalanceCard({
  balance,
  change,
  changePercent,
  currency = 'USDT',
  isLoading = false,
}: BalanceCardProps) {
  const isPositive = change >= 0

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6">
        <div className="skeleton h-6 w-24 mb-3" />
        <div className="skeleton h-12 w-48 mb-3" />
        <div className="skeleton h-5 w-32" />
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-memora-purple to-memora-purple-dark rounded-2xl p-6 mb-6 text-white shadow-lg">
      {/* Label */}
      <p className="text-sm font-medium opacity-90 mb-2">
        Total Balance
      </p>

      {/* Amount */}
      <h2 className="text-5xl font-bold mb-4 text-hero">
        {formatCurrency(balance)}
      </h2>

      {/* Change */}
      <div className="flex items-center gap-2">
        <span className={clsx(
          'text-sm font-semibold',
          isPositive ? 'text-green-300' : 'text-red-300'
        )}>
          {isPositive ? '+' : ''}{formatCurrency(change)}
        </span>
        <span className={clsx(
          'text-sm font-semibold',
          isPositive ? 'text-green-300' : 'text-red-300'
        )}>
          {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
        </span>
        <span className="text-xs font-medium opacity-75">
          Today
        </span>
      </div>

      {/* Currency info */}
      <p className="text-xs opacity-75 mt-3">
        Primary Currency: {currency}
      </p>
    </div>
  )
}
