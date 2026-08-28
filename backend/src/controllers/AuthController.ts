import { Request, Response } from 'express'
import { validateTelegramData, parseTelegramData } from '@/utils/telegram'
import { generateToken } from '@/middleware/auth'
import { UserModel_ } from '@/models/User'
import { WalletModel_ } from '@/models/Wallet'
import { query } from '@/config/database'
import { v4 as uuidv4 } from 'uuid'

export class AuthController {
  static async authenticateTelegram(req: Request, res: Response) {
    try {
      const { initData } = req.body

      if (!initData) {
        return res.status(400).json({
          success: false,
          error: 'initData is required'
        })
      }

      // Validate Telegram data
      if (!validateTelegramData(initData)) {
        return res.status(401).json({
          success: false,
          error: 'Invalid Telegram authentication data'
        })
      }

      const telegramData = parseTelegramData(initData)
      if (!telegramData || !telegramData.user) {
        return res.status(401).json({
          success: false,
          error: 'Failed to parse Telegram data'
        })
      }

      const { user } = telegramData

      // Find or create user
      let dbUser = await UserModel_.findByTelegramId(user.id)

      if (!dbUser) {
        // Create new user
        dbUser = await UserModel_.create({
          telegramId: user.id,
          username: user.username || `user_${user.id}`,
          firstName: user.first_name,
          lastName: user.last_name,
          photoUrl: user.photo_url,
          languageCode: user.language_code || 'en',
        })

        // Create default wallet for new user
        const walletAddress = `wallet_${uuidv4().slice(0, 8)}`
        await WalletModel_.create({
          userId: dbUser.id,
          address: walletAddress,
          type: 'solana',
          network: 'devnet',
        })

        // Create default settings
        await query(
          `INSERT INTO settings (user_id, language, currency)
           VALUES ($1, $2, $3)`,
          [dbUser.id, user.language_code || 'en', 'USD']
        )
      }

      // Generate JWT token
      const token = generateToken(dbUser.id, dbUser.telegram_id)

      // Get user wallet
      const wallet = await WalletModel_.findByUserId(dbUser.id)

      res.json({
        success: true,
        data: {
          user: {
            id: dbUser.id,
            telegramId: dbUser.telegram_id,
            username: dbUser.username,
            firstName: dbUser.first_name,
            lastName: dbUser.last_name,
            photoUrl: dbUser.photo_url,
            languageCode: dbUser.language_code,
          },
          wallet: {
            id: wallet?.id,
            address: wallet?.address,
            network: wallet?.network,
          },
          token,
        }
      })
    } catch (error) {
      console.error('Auth error:', error)
      res.status(500).json({
        success: false,
        error: 'Authentication failed'
      })
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      if (!req.jwt?.userId) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized'
        })
      }

      const user = await UserModel_.findById(req.jwt.userId)

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        })
      }

      res.json({
        success: true,
        data: {
          id: user.id,
          telegramId: user.telegram_id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          photoUrl: user.photo_url,
          languageCode: user.language_code,
        }
      })
    } catch (error) {
      console.error('Get user error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to get user'
      })
    }
  }
}
