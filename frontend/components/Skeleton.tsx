import clsx from 'clsx'

interface SkeletonProps {
  className?: string
  count?: number
}

export function SkeletonLine({ className }: { className?: string }) {
  return <div className={clsx('skeleton h-4 rounded-lg', className)} />
}

export function SkeletonCircle({ className }: { className?: string }) {
  return <div className={clsx('skeleton w-12 h-12 rounded-full', className)} />
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={clsx('skeleton w-full h-24 rounded-xl', className)} />
  )
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={clsx('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine
          key={i}
          className={i === lines - 1 ? 'w-4/5' : undefined}
        />
      ))}
    </div>
  )
}

export function SkeletonBalance() {
  return (
    <div className="space-y-3 p-6">
      <SkeletonLine className="w-1/3" />
      <SkeletonLine className="w-1/2 h-10" />
      <SkeletonLine className="w-2/5" />
    </div>
  )
}

export function SkeletonCard_( {count = 1}: SkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
