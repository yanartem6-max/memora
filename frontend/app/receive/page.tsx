'use client'

import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { useTelegram } from '@/lib/telegram'
import toast from 'react-hot-toast'

export default function ReceivePage() {
  const router = useRouter()
  const { isAuthenticated, wallet } = useAppStore()
  const { hapticFeedback } = useTelegram()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleCopyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      hapticFeedback('success')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-memora-light dark:bg-memora-dark">
      <Header title="Receive USDT" subtitle="Share your wallet address" />

      <div className="px-4 space-y-6 pt-6">
        {/* QR Code Placeholder */}
        <Card className="flex items-center justify-center py-12">
          <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-6xl">📱</span>
          </div>
        </Card>

        {/* Address */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Wallet Address
          </p>
          <Card className="flex items-center justify-between p-4">
            <code className="text-xs text-primary dark:text-white break-all font-mono">
              {wallet?.address || 'Loading...'}
            </code>
          </Card>
        </div>

        {/* Info */}
        <Card>
          <p className="text-sm text-secondary dark:text-secondary-dark mb-2">
            Network: <span className="font-semibold text-primary dark:text-white">Solana ({wallet?.network})</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Only send USDT tokens to this address on the Solana network.
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pt-6">
          <Button
            variant="primary"
            fullWidth
            onClick={handleCopyAddress}
          >
            {copied ? '✓ Copied' : 'Copy Address'}
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => router.back()}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
