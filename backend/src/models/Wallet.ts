import { query } from '@/config/database'
import { WalletModel } from '@/types'

export class WalletModel_ {
  static async create(data: {
    userId: string
    address: string
    type: string
    network: string
  }): Promise<WalletModel> {
    const result = await query(
      `INSERT INTO wallets (user_id, address, type, network)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [data.userId, data.address, data.type, data.network]
    )
    return result.rows[0]
  }

  static async findByAddress(address: string): Promise<WalletModel | null> {
    const result = await query(
      'SELECT * FROM wallets WHERE address = $1',
      [address]
    )
    return result.rows[0] || null
  }

  static async findByUserId(userId: string): Promise<WalletModel | null> {
    const result = await query(
      'SELECT * FROM wallets WHERE user_id = $1 LIMIT 1',
      [userId]
    )
    return result.rows[0] || null
  }

  static async findById(id: string): Promise<WalletModel | null> {
    const result = await query(
      'SELECT * FROM wallets WHERE id = $1',
      [id]
    )
    return result.rows[0] || null
  }

  static async findByUserAndNetwork(userId: string, network: string): Promise<WalletModel | null> {
    const result = await query(
      'SELECT * FROM wallets WHERE user_id = $1 AND network = $2',
      [userId, network]
    )
    return result.rows[0] || null
  }
}
