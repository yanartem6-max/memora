import { query } from '@/config/database'
import { UserModel } from '@/types'

export class UserModel_ {
  static async create(data: {
    telegramId: number
    username: string
    firstName: string
    lastName?: string
    photoUrl?: string
    languageCode: string
  }): Promise<UserModel> {
    const result = await query(
      `INSERT INTO users (telegram_id, username, first_name, last_name, photo_url, language_code)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        data.telegramId,
        data.username,
        data.firstName,
        data.lastName || null,
        data.photoUrl || null,
        data.languageCode,
      ]
    )
    return result.rows[0]
  }

  static async findByTelegramId(telegramId: number): Promise<UserModel | null> {
    const result = await query(
      'SELECT * FROM users WHERE telegram_id = $1',
      [telegramId]
    )
    return result.rows[0] || null
  }

  static async findById(id: string): Promise<UserModel | null> {
    const result = await query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    )
    return result.rows[0] || null
  }

  static async findByUsername(username: string): Promise<UserModel | null> {
    const result = await query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    )
    return result.rows[0] || null
  }

  static async update(id: string, data: Partial<UserModel>): Promise<UserModel> {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ')

    const result = await query(
      `UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    )
    return result.rows[0]
  }

  static async getUserCount(): Promise<number> {
    const result = await query('SELECT COUNT(*) as count FROM users')
    return parseInt(result.rows[0].count, 10)
  }
}
