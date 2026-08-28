import { PublicKey } from '@solana/web3.js'

export const isValidSolanaAddress = (address: string): boolean => {
  try {
    new PublicKey(address)
    return true
  } catch {
    return false
  }
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidUsername = (username: string): boolean => {
  // 3-32 chars, alphanumeric + underscore
  return /^[a-zA-Z0-9_]{3,32}$/.test(username)
}

export const validateAmount = (amount: string | number): boolean => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return !isNaN(num) && num > 0
}

export const validateTokenSymbol = (symbol: string): boolean => {
  return /^[A-Z0-9]{1,20}$/.test(symbol)
}

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .slice(0, 500)
    .replace(/[<>]/g, '')
}
