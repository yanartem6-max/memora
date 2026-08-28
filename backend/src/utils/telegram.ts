import crypto from 'crypto'
import config from '@/config/environment'
import { TelegramInitData } from '@/types'

export const validateTelegramData = (initData: string): boolean => {
  try {
    const params = new URLSearchParams(initData)
    const hash = params.get('hash')
    
    if (!hash) {
      return false
    }

    params.delete('hash')
    
    const entries: [string, string][] = []
    params.forEach((value, key) => {
      entries.push([key, value])
    })
    
    const dataCheckString = entries
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n')

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(config.telegram.botToken)
      .digest()

    const hashCheck = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex')

    return hashCheck === hash
  } catch (error) {
    console.error('Telegram validation error:', error)
    return false
  }
}

export const parseTelegramData = (initData: string): TelegramInitData | null => {
  try {
    const params = new URLSearchParams(initData)
    const user = JSON.parse(params.get('user') || '{}')
    
    return {
      query_id: params.get('query_id') || '',
      user,
      auth_date: parseInt(params.get('auth_date') || '0', 10),
      hash: params.get('hash') || '',
    }
  } catch (error) {
    console.error('Failed to parse Telegram data:', error)
    return null
  }
}
