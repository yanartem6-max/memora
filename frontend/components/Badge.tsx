import clsx from 'clsx'
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'secondary'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'primary', size = 'sm', className }: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }

  const variantClasses = {
    primary: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  }

  return (
    <span className={clsx(baseClasses, sizeClasses[size], variantClasses[variant], className)}>
      {children}
    </span>
  )
}

export function PriceChange({ value, className }: { value: number; className?: string }) {
  const isPositive = value >= 0
  return (
    <span
      className={clsx(
        'font-semibold',
        isPositive ? 'text-green-600 dark:text-green-400' : 'text-danger dark:text-danger-dark',
        className
      )}
    >
      {isPositive ? '+' : ''}{value.toFixed(2)}%
    </span>
  )
}
