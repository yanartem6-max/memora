import { Request, Response } from 'express'
import { TraderModel_ } from '@/models/Trader'
import { query } from '@/config/database'

export class TraderController {
  static async getLeaderboard(req: Request, res: Response) {
    try {
      const period = (req.query.period as string) || '24h'
      const limit = parseInt(req.query.limit as string) || 20

      const traders = await TraderModel_.getLeaderboard(
        period as '24h' | '7d' | '30d' | 'all',
        limit
      )

      res.json({
        success: true,
        data: traders.map(trader => ({
          id: trader.id,
          username: trader.username,
          avatar: trader.avatar,
          pnl: period === '24h' ? trader.pnl_24h : period === '7d' ? trader.pnl_7d : period === '30d' ? trader.pnl_30d : trader.total_pnl,
          trades: trader.total_trades,
          followers: trader.followers,
          winRate: trader.win_rate,
        }))
      })
    } catch (error) {
      console.error('Get leaderboard error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to get leaderboard'
      })
    }
  }

  static async getTrader(req: Request, res: Response) {
    try {
      const { username } = req.params

      const trader = await TraderModel_.findByUsername(username)

      if (!trader) {
        return res.status(404).json({
          success: false,
          error: 'Trader not found'
        })
      }

      // Get trader trades
      const tradesResult = await query(
        'SELECT * FROM trades WHERE trader_id = $1 ORDER BY created_at DESC LIMIT 10',
        [trader.id]
      )

      res.json({
        success: true,
        data: {
          id: trader.id,
          username: trader.username,
          avatar: trader.avatar,
          bio: trader.bio,
          walletAddress: trader.wallet_address,
          totalTrades: trader.total_trades,
          winRate: trader.win_rate,
          averageHoldTime: trader.average_hold_time,
          totalPnL: trader.total_pnl,
          pnL30d: trader.pnl_30d,
          pnL7d: trader.pnl_7d,
          pnL24h: trader.pnl_24h,
          followers: trader.followers,
          following: trader.following,
          recentTrades: tradesResult.rows,
        }
      })
    } catch (error) {
      console.error('Get trader error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to get trader'
      })
    }
  }

  static async followTrader(req: Request, res: Response) {
    try {
      if (!req.jwt?.userId) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized'
        })
      }

      const { traderId } = req.params

      // Check if already following
      const existingFollow = await query(
        'SELECT * FROM follows WHERE follower_id = (SELECT id FROM traders WHERE user_id = $1) AND following_id = $2',
        [req.jwt.userId, traderId]
      )

      if (existingFollow.rows.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Already following'
        })
      }

      // Get current user's trader profile
      const userTraderResult = await query(
        'SELECT id FROM traders WHERE user_id = $1',
        [req.jwt.userId]
      )

      if (userTraderResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Trader profile not found'
        })
      }

      const followerId = userTraderResult.rows[0].id

      // Create follow
      await query(
        'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)',
        [followerId, traderId]
      )

      // Increment followers count
      await query(
        'UPDATE traders SET followers = followers + 1 WHERE id = $1',
        [traderId]
      )

      res.json({
        success: true,
        data: { following: true }
      })
    } catch (error) {
      console.error('Follow trader error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to follow trader'
      })
    }
  }
}
