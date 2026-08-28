// User Types
export interface TelegramUser {
  id: number
  is_bot: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
}

export interface User {
  id: string
  telegramId: number
  username: string
  firstName: string
  lastName?: string
  photoUrl?: string
  languageCode: string
  createdAt: Date
  updatedAt: Date
}

// Wallet Types
export interface Wallet {
  id: string
  userId: string
  address: string
  type: 'solana'
  network: 'devnet' | 'mainnet-beta'
  createdAt: Date
}

export interface Asset {
  id: string
  walletId: string
  symbol: string
  name: string
  decimals: number
  balance: string
  usdValue: number
  logoUrl?: string
}

// Transaction Types
export type TransactionType = 'send' | 'receive' | 'buy' | 'sell' | 'swap'
export type TransactionStatus = 'pending' | 'confirmed' | 'failed'

export interface Transaction {
  id: string
  walletId: string
  type: TransactionType
  status: TransactionStatus
  fromAsset: string
  toAsset: string
  fromAmount: string
  toAmount: string
  fee: string
  txHash?: string
  signature?: string
  createdAt: Date
  updatedAt: Date
}

// Token Types
export interface TokenInfo {
  id: string
  symbol: string
  name: string
  decimals: number
  mintAddress: string
  logoUrl?: string
}

export interface TokenPrice {
  tokenId: string
  price: number
  priceUsd: number
  change24h: number
  change1h: number
  marketCap: number
  volume24h: number
  liquidity: number
  holders: number
  timestamp: Date
}

export interface Token {
  id: string
  symbol: string
  name: string
  description?: string
  logoUrl?: string
  website?: string
  twitter?: string
  telegram?: string
  decimals: number
  mintAddress: string
  isVerified: boolean
  isMeme: boolean
  price: number
  priceUsd: number
  change24h: number
  change1h: number
  marketCap: number
  volume24h: number
  liquidity: number
  holders: number
  topHolders?: TokenHolder[]
  createdAt: Date
  updatedAt: Date
}

export interface TokenHolder {
  address: string
  amount: string
  percentage: number
}

// Social Types
export interface Trader {
  id: string
  userId: string
  username: string
  walletAddress: string
  bio?: string
  avatar?: string
  totalTrades: number
  winRate: number
  averageHoldTime: number
  totalPnL: number
  pnL30d: number
  pnL7d: number
  pnL24h: number
  followers: number
  following: number
  createdAt: Date
}

export interface Trade {
  id: string
  traderId: string
  tokenId: string
  type: 'buy' | 'sell'
  amount: string
  price: string
  pnl?: string
  pnlPercentage?: number
  thesis?: string
  likes: number
  comments: number
  createdAt: Date
}

export interface FeedPost {
  id: string
  traderId: string
  trader: Trader
  trade?: Trade
  text?: string
  likes: number
  comments: number
  shares: number
  liked: boolean
  createdAt: Date
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number
  trader: Trader
  pnl: number
  change: number
  trades: number
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Auth Types
export interface AuthPayload {
  user: any
  hash: string
}

// Settings Types
export interface UserSettings {
  userId: string
  currency: 'USD' | 'EUR' | 'GBP' | 'UAH'
  language: 'en' | 'ru' | 'uk'
  theme: 'light' | 'dark' | 'system'
  notificationsEnabled: boolean
  hapticFeedbackEnabled: boolean
  priceAlerts: boolean
  tradeNotifications: boolean
}
