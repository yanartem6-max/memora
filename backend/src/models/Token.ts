import { query } from '@/config/database'
import { TokenModel, TokenPriceModel } from '@/types'

export class TokenModel_ {
  static async create(data: {
    symbol: string
    name: string
    decimals: number
    mintAddress: string
    description?: string
    logoUrl?: string
    isVerified?: boolean
    isMeme?: boolean
  }): Promise<TokenModel> {
    const result = await query(
      `INSERT INTO tokens (symbol, name, decimals, mint_address, description, logo_url, is_verified, is_meme)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (symbol) DO UPDATE SET updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [
        data.symbol,
        data.name,
        data.decimals,
        data.mintAddress,
        data.description || null,
        data.logoUrl || null,
        data.isVerified || false,
        data.isMeme || false,
      ]
    )
    return result.rows[0]
  }

  static async findBySymbol(symbol: string): Promise<TokenModel | null> {
    const result = await query(
      'SELECT * FROM tokens WHERE symbol = $1',
      [symbol]
    )
    return result.rows[0] || null
  }

  static async findById(id: string): Promise<TokenModel | null> {
    const result = await query(
      'SELECT * FROM tokens WHERE id = $1',
      [id]
    )
    return result.rows[0] || null
  }

  static async findByMintAddress(mintAddress: string): Promise<TokenModel | null> {
    const result = await query(
      'SELECT * FROM tokens WHERE mint_address = $1',
      [mintAddress]
    )
    return result.rows[0] || null
  }

  static async search(query_: string, limit = 20): Promise<TokenModel[]> {
    const result = await query(
      `SELECT * FROM tokens 
       WHERE symbol ILIKE $1 OR name ILIKE $1 
       ORDER BY is_verified DESC, symbol
       LIMIT $2`,
      [`%${query_}%`, limit]
    )
    return result.rows
  }

  static async getMemecoins(limit = 20): Promise<TokenModel[]> {
    const result = await query(
      'SELECT * FROM tokens WHERE is_meme = true ORDER BY updated_at DESC LIMIT $1',
      [limit]
    )
    return result.rows
  }

  static async getVerified(limit = 20): Promise<TokenModel[]> {
    const result = await query(
      'SELECT * FROM tokens WHERE is_verified = true ORDER BY updated_at DESC LIMIT $1',
      [limit]
    )
    return result.rows
  }
}

export class TokenPriceModel_ {
  static async create(data: {
    tokenId: string
    price: number
    priceUsd: number
    change24h: number
    change1h: number
    marketCap: number
    volume24h: number
    liquidity: number
    holders: number
  }): Promise<TokenPriceModel> {
    const result = await query(
      `INSERT INTO token_prices (token_id, price, price_usd, change_24h, change_1h, market_cap, volume_24h, liquidity, holders)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        data.tokenId,
        data.price,
        data.priceUsd,
        data.change24h,
        data.change1h,
        data.marketCap,
        data.volume24h,
        data.liquidity,
        data.holders,
      ]
    )
    return result.rows[0]
  }

  static async getLatestPrice(tokenId: string): Promise<TokenPriceModel | null> {
    const result = await query(
      'SELECT * FROM token_prices WHERE token_id = $1 ORDER BY created_at DESC LIMIT 1',
      [tokenId]
    )
    return result.rows[0] || null
  }

  static async getPriceHistory(tokenId: string, hours = 24): Promise<TokenPriceModel[]> {
    const result = await query(
      `SELECT * FROM token_prices 
       WHERE token_id = $1 AND created_at > NOW() - INTERVAL '${hours} hours'
       ORDER BY created_at ASC`,
      [tokenId]
    )
    return result.rows
  }
}
