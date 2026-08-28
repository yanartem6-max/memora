import clsx from 'clsx'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-2xl p-4',
        'border border-gray-100 dark:border-gray-700',
        onClick && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('pb-3 border-b border-gray-100 dark:border-gray-700', className)}>{children}</div>
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('pt-3', className)}>{children}</div>
}

export function GlassCard({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        'glass rounded-2xl p-4',
        className
      )}
    >
      {children}
    </div>
  )
}
