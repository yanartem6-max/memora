import { query } from '@/config/database'
import { TraderModel } from '@/types'

export class TraderModel_ {
  static async create(data: {
    userId: string
    username: string
    walletAddress: string
  }): Promise<TraderModel> {
    const result = await query(
      `INSERT INTO traders (user_id, username, wallet_address)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.userId, data.username, data.walletAddress]
    )
    return result.rows[0]
  }

  static async findByUsername(username: string): Promise<TraderModel | null> {
    const result = await query(
      'SELECT * FROM traders WHERE username = $1',
      [username]
    )
    return result.rows[0] || null
  }

  static async findById(id: string): Promise<TraderModel | null> {
    const result = await query(
      'SELECT * FROM traders WHERE id = $1',
      [id]
    )
    return result.rows[0] || null
  }

  static async getLeaderboard(period: '24h' | '7d' | '30d' | 'all', limit = 20): Promise<TraderModel[]> {
    const column = {
      '24h': 'pnl_24h',
      '7d': 'pnl_7d',
      '30d': 'pnl_30d',
      'all': 'total_pnl',
    }[period]

    const result = await query(
      `SELECT * FROM traders ORDER BY ${column} DESC LIMIT $1`,
      [limit]
    )
    return result.rows
  }

  static async update(id: string, data: Partial<TraderModel>): Promise<TraderModel> {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ')

    const result = await query(
      `UPDATE traders SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    )
    return result.rows[0]
  }
}
