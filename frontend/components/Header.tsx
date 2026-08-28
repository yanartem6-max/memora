import clsx from 'clsx'
import { ReactNode } from 'react'

interface HeaderProps {
  title?: string
  subtitle?: string
  children?: ReactNode
  actions?: ReactNode
  className?: string
}

export function Header({ title, subtitle, children, actions, className }: HeaderProps) {
  return (
    <header className={clsx('px-4 pt-safe-top pb-4', className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          {title && (
            <h1 className="text-3xl font-bold text-primary dark:text-white">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-secondary dark:text-secondary-dark mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
      {children}
    </header>
  )
}

export function PageHeader({ greeting, time }: { greeting?: string; time?: string }) {
  return (
    <div className="px-4 pt-safe-top pb-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary dark:text-secondary-dark">
            {greeting || 'Good evening'}
          </p>
        </div>
        {time && (
          <p className="text-xs text-secondary dark:text-secondary-dark">
            {time}
          </p>
        )}
      </div>
    </div>
  )
}
