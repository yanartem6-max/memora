'use client'

import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { useTelegram } from '@/lib/telegram'

export default function SendPage() {
  const router = useRouter()
  const { isAuthenticated } = useAppStore()
  const { hapticFeedback } = useTelegram()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleSend = async () => {
    if (!recipient || !amount || parseFloat(amount) <= 0) return

    setIsProcessing(true)
    hapticFeedback('impact')

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      hapticFeedback('success')
      router.push('/activity')
    } catch (error) {
      hapticFeedback('error')
      console.error('Send failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-memora-light dark:bg-memora-dark">
      <Header title="Send USDT" subtitle="Send cryptocurrency to an address" />

      <div className="px-4 space-y-6 pt-6">
        {/* Recipient */}
        <Input
          placeholder="Wallet address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          label="Recipient Address"
        />

        {/* Amount */}
        <Input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          label="Amount (USDT)"
        />

        {/* Summary */}
        <Card>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary dark:text-secondary-dark">You send</span>
              <span className="font-semibold text-primary dark:text-white">
                {amount} USDT
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary dark:text-secondary-dark">Network fee</span>
              <span className="font-semibold text-primary dark:text-white">$0.00</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-center">
              <span className="font-semibold text-primary dark:text-white">Total</span>
              <span className="font-bold text-lg text-primary dark:text-white">
                ${amount || '0.00'}
              </span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pt-6">
          <Button
            variant="primary"
            fullWidth
            loading={isProcessing}
            onClick={handleSend}
            disabled={!recipient || !amount || parseFloat(amount) <= 0}
          >
            {isProcessing ? 'Sending...' : 'Confirm Send'}
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
