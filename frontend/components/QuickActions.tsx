import Link from 'next/link'
import clsx from 'clsx'

interface QuickAction {
  label: string
  icon: React.ReactNode
  href: string
  variant?: 'primary' | 'secondary'
}

interface QuickActionsProps {
  actions: QuickAction[]
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-4 gap-3 px-4 mb-6">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className={clsx(
            'flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-200',
            'active:scale-95',
            action.variant === 'secondary'
              ? 'bg-gray-100 dark:bg-gray-800 text-primary dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              : 'bg-white dark:bg-gray-800 text-primary dark:text-white hover:shadow-md border border-gray-100 dark:border-gray-700'
          )}
        >
          <div className="text-2xl">
            {action.icon}
          </div>
          <span className="text-xs font-medium text-center text-gray-700 dark:text-gray-300">
            {action.label}
          </span>
        </Link>
      ))}
    </div>
  )
}
