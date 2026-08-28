'use client'

import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { useEffect } from 'react'
import { BottomNavigation } from '@/components/BottomNavigation'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'

export default function ProfilePage() {
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAppStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    logout()
    router.push('/')
  }

  const menuItems = [
    {
      category: 'Preferences',
      items: [
        { label: 'Language', icon: '🌐', href: '/profile/settings/language' },
        { label: 'Currency', icon: '💱', href: '/profile/settings/currency' },
        { label: 'Appearance', icon: '🎨', href: '/profile/settings/appearance' },
        { label: 'Notifications', icon: '🔔', href: '/profile/settings/notifications' },
      ]
    },
    {
      category: 'Security',
      items: [
        { label: 'Passcode', icon: '🔐', href: '/profile/settings/passcode' },
        { label: 'Biometric', icon: '👆', href: '/profile/settings/biometric' },
      ]
    },
    {
      category: 'Wallet',
      items: [
        { label: 'Address', icon: '📍', href: '/profile/wallet' },
        { label: 'Recovery', icon: '🔑', href: '/profile/recovery' },
      ]
    },
    {
      category: 'Support',
      items: [
        { label: 'Help Center', icon: '❓', href: 'https://help.memora.app' },
        { label: 'Terms', icon: '📄', href: 'https://memora.app/terms' },
        { label: 'Privacy', icon: '🔒', href: 'https://memora.app/privacy' },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-memora-light dark:bg-memora-dark pb-24">
      {/* Header */}
      <div className="px-4 pt-safe-top pb-6">
        <h1 className="text-3xl font-bold text-primary dark:text-white mb-4">
          Profile
        </h1>

        {/* User Info */}
        <Card className="flex items-center gap-4">
          <div className="w-16 h-16 bg-memora-purple rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
            {user?.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={user.firstName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              user?.firstName?.charAt(0).toUpperCase() || 'U'
            )}
          </div>
          <div className="flex-1">
            <p className="font-bold text-primary dark:text-white">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-secondary dark:text-secondary-dark">
              @{user?.username}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Telegram ID: {user?.telegramId}
            </p>
          </div>
        </Card>
      </div>

      {/* Settings Sections */}
      <div className="px-4 space-y-6">
        {menuItems.map((section) => (
          <div key={section.category}>
            <h2 className="text-xs font-semibold text-secondary dark:text-secondary-dark uppercase px-4 mb-2">
              {section.category}
            </h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block"
                >
                  <Card className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium text-primary dark:text-white">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-secondary dark:text-secondary-dark">
                      →
                    </span>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-8 mb-4">
        <Button
          variant="danger"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
