'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { useTelegram } from '@/lib/telegram'

export default function BuyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated } = useAppStore()
  const { hapticFeedback } = useTelegram()
  const [amount, setAmount] = useState('')
  const [tokenSymbol] = useState(searchParams.get('token') || 'MEME')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const quickAmounts = [25, 50, 100, 250]
  const estimatedReceive = amount ? (parseFloat(amount) / 0.0001).toLocaleString() : '0'

  const handleBuy = async () => {
    if (!amount || parseFloat(amount) <= 0) return

    setIsProcessing(true)
    hapticFeedback('impact')

    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000))

      hapticFeedback('success')
      router.push('/activity')
    } catch (error) {
      hapticFeedback('error')
      console.error('Buy failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-memora-light dark:bg-memora-dark">
      <Header title={`Buy ${tokenSymbol}`} subtitle="Enter amount to purchase" />

      <div className="px-4 space-y-6 pt-6">
        {/* Input */}
        <div>
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            label="You Pay (USDT)"
          />
        </div>

        {/* Quick amounts */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Amount</p>
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className="py-2 px-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-primary dark:text-white hover:bg-memora-purple hover:text-white transition-colors"
              >
                ${quickAmount}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <Card>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary dark:text-secondary-dark">You receive</span>
              <span className="font-semibold text-primary dark:text-white">
                ≈ {estimatedReceive} {tokenSymbol}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary dark:text-secondary-dark">Network fee</span>
              <span className="font-semibold text-primary dark:text-white">$0.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary dark:text-secondary-dark">Platform fee</span>
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
            onClick={handleBuy}
            disabled={!amount || parseFloat(amount) <= 0}
          >
            {isProcessing ? 'Processing...' : 'Confirm Purchase'}
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
