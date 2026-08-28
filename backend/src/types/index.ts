// Database models
export interface UserModel {
  id: string
  telegram_id: number
  username: string
  first_name: string
  last_name?: string
  photo_url?: string
  language_code: string
  created_at: Date
  updated_at: Date
}

export interface WalletModel {
  id: string
  user_id: string
  address: string
  type: string
  network: string
  created_at: Date
}

export interface AssetModel {
  id: string
  wallet_id: string
  symbol: string
  name: string
  decimals: number
  balance: string
  usd_value: number
  logo_url?: string
}

export interface TransactionModel {
  id: string
  wallet_id: string
  type: 'send' | 'receive' | 'buy' | 'sell' | 'swap'
  status: 'pending' | 'confirmed' | 'failed'
  from_asset: string
  to_asset: string
  from_amount: string
  to_amount: string
  fee: string
  tx_hash?: string
  signature?: string
  created_at: Date
  updated_at: Date
}

export interface TokenModel {
  id: string
  symbol: string
  name: string
  description?: string
  logo_url?: string
  website?: string
  twitter?: string
  telegram?: string
  decimals: number
  mint_address: string
  is_verified: boolean
  is_meme: boolean
  created_at: Date
  updated_at: Date
}

export interface TokenPriceModel {
  id: string
  token_id: string
  price: number
  price_usd: number
  change_24h: number
  change_1h: number
  market_cap: number
  volume_24h: number
  liquidity: number
  holders: number
  created_at: Date
}

export interface TraderModel {
  id: string
  user_id: string
  username: string
  wallet_address: string
  bio?: string
  avatar?: string
  total_trades: number
  win_rate: number
  average_hold_time: number
  total_pnl: number
  pnl_30d: number
  pnl_7d: number
  pnl_24h: number
  followers: number
  following: number
  created_at: Date
}

export interface TradeModel {
  id: string
  trader_id: string
  token_id: string
  type: 'buy' | 'sell'
  amount: string
  price: string
  pnl?: string
  pnl_percentage?: number
  thesis?: string
  likes: number
  comments: number
  created_at: Date
}

export interface FeedPostModel {
  id: string
  trader_id: string
  trade_id?: string
  text?: string
  likes: number
  comments: number
  shares: number
  created_at: Date
}

// Request/Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T = any> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Auth types
export interface TelegramInitData {
  query_id: string
  user: {
    id: number
    is_bot: boolean
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
    photo_url?: string
  }
  auth_date: number
  hash: string
}

export interface JwtPayload {
  userId: string
  telegramId: number
  iat: number
  exp: number
}

// Express custom types
declare global {
  namespace Express {
    interface Request {
      user?: UserModel
      jwt?: JwtPayload
    }
  }
}
