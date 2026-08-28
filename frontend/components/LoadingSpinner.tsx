import clsx from 'clsx'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <div className={clsx(
        'border-2 border-memora-light dark:border-gray-700',
        'border-t-memora-purple dark:border-t-memora-purple-light',
        'rounded-full animate-spin',
        sizeClasses[size]
      )} />
    </div>
  )
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-memora-light dark:bg-memora-dark z-50">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-primary dark:text-white font-medium">Initializing MEMORA...</p>
      </div>
    </div>
  )
}
