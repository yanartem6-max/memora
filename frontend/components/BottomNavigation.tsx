'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

interface NavItem {
  name: string
  icon: React.ReactNode
  href: string
  active: boolean
}

export function BottomNavigation() {
  const pathname = usePathname()

  const items: NavItem[] = [
    {
      name: 'Home',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
      href: '/home',
      active: pathname === '/home',
    },
    {
      name: 'Discover',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      ),
      href: '/discover',
      active: pathname?.startsWith('/discover'),
    },
    {
      name: 'Activity',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
        </svg>
      ),
      href: '/activity',
      active: pathname?.startsWith('/activity'),
    },
    {
      name: 'Profile',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
      href: '/profile',
      active: pathname?.startsWith('/profile'),
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-gray-200 dark:border-gray-700 z-40">
      <div className="max-w-lg mx-auto px-4 flex items-center justify-around h-20">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-colors duration-200',
              item.active
                ? 'text-memora-purple'
                : 'text-secondary dark:text-secondary-dark hover:text-primary dark:hover:text-white'
            )}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
