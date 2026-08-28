import { query } from '@/config/database'
import { AssetModel } from '@/types'

export class AssetModel_ {
  static async create(data: {
    walletId: string
    symbol: string
    name: string
    decimals: number
    balance: string
    usdValue: number
    logoUrl?: string
  }): Promise<AssetModel> {
    const result = await query(
      `INSERT INTO assets (wallet_id, symbol, name, decimals, balance, usd_value, logo_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [data.walletId, data.symbol, data.name, data.decimals, data.balance, data.usdValue, data.logoUrl || null]
    )
    return result.rows[0]
  }

  static async findByWalletId(walletId: string): Promise<AssetModel[]> {
    const result = await query(
      'SELECT * FROM assets WHERE wallet_id = $1 ORDER BY usd_value DESC',
      [walletId]
    )
    return result.rows
  }

  static async findByWalletAndSymbol(walletId: string, symbol: string): Promise<AssetModel | null> {
    const result = await query(
      'SELECT * FROM assets WHERE wallet_id = $1 AND symbol = $2',
      [walletId, symbol]
    )
    return result.rows[0] || null
  }

  static async updateBalance(id: string, balance: string, usdValue: number): Promise<AssetModel> {
    const result = await query(
      `UPDATE assets SET balance = $1, usd_value = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`,
      [balance, usdValue, id]
    )
    return result.rows[0]
  }

  static async getTotalUsdValue(walletId: string): Promise<number> {
    const result = await query(
      'SELECT COALESCE(SUM(usd_value), 0) as total FROM assets WHERE wallet_id = $1',
      [walletId]
    )
    return parseFloat(result.rows[0].total)
  }
}
