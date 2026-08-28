import clsx from 'clsx'
import { ReactNode } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = clsx(
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-xl transition-all duration-200',
    'active:scale-95',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    {
      'w-full': fullWidth,
    }
  )

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const variantClasses = {
    primary: 'bg-memora-purple text-white hover:bg-memora-purple-dark',
    secondary: 'bg-gray-100 text-primary hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
    danger: 'bg-danger text-white hover:bg-red-600',
    ghost: 'text-primary hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800',
  }

  return (
    <button
      className={clsx(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}

export function ButtonGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('flex gap-2', className)}>
      {children}
    </div>
  )
}
