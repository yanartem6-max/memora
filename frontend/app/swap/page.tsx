'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { useTelegram } from '@/lib/telegram'

export default function SwapPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated } = useAppStore()
  const { hapticFeedback } = useTelegram()
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [fromToken] = useState('USDT')
  const [toToken, setToToken] = useState(searchParams.get('to') || 'SOL')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  // Simple price calculation
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    if (value) {
      const estimated = toToken === 'SOL'
        ? (parseFloat(value) / 161.29).toFixed(4)
        : parseFloat(value).toFixed(4)
      setToAmount(estimated)
    } else {
      setToAmount('')
    }
  }

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return

    setIsProcessing(true)
    hapticFeedback('impact')

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      hapticFeedback('success')
      router.push('/activity')
    } catch (error) {
      hapticFeedback('error')
      console.error('Swap failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-memora-light dark:bg-memora-dark">
      <Header title="Swap Tokens" subtitle="Exchange tokens instantly" />

      <div className="px-4 space-y-6 pt-6">
        {/* From */}
        <Input
          type="number"
          placeholder="0.00"
          value={fromAmount}
          onChange={(e) => handleFromAmountChange(e.target.value)}
          label={`You Pay (${fromToken})`}
        />

        {/* Swap Button */}
        <div className="flex justify-center">
          <button className="w-12 h-12 rounded-full bg-memora-purple text-white flex items-center justify-center hover:bg-memora-purple-dark transition-colors">
            ⇅
          </button>
        </div>

        {/* To */}
        <Input
          type="number"
          placeholder="0.00"
          value={toAmount}
          readOnly
          label={`You Receive (${toToken})`}
        />

        {/* Summary */}
        <Card>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary dark:text-secondary-dark">Rate</span>
              <span className="font-semibold text-primary dark:text-white">
                1 {toToken} = $161.29
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary dark:text-secondary-dark">Price Impact</span>
              <span className="font-semibold text-primary dark:text-white">0.12%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary dark:text-secondary-dark">Network fee</span>
              <span className="font-semibold text-primary dark:text-white">$0.00</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-center">
              <span className="font-semibold text-primary dark:text-white">Minimum Received</span>
              <span className="font-bold text-primary dark:text-white">
                {(parseFloat(toAmount) * 0.99).toFixed(4)} {toToken}
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
            onClick={handleSwap}
            disabled={!fromAmount || parseFloat(fromAmount) <= 0}
          >
            {isProcessing ? 'Swapping...' : 'Confirm Swap'}
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
