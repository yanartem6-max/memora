import { Request, Response } from 'express'
import { TokenModel_, TokenPriceModel_ } from '@/models/Token'

export class TokenController {
  static async getTrendingTokens(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 20

      // For MVP, return verified tokens
      const tokens = await TokenModel_.getVerified(limit)

      res.json({
        success: true,
        data: tokens.map(token => ({
          id: token.id,
          symbol: token.symbol,
          name: token.name,
          logoUrl: token.logo_url,
          isVerified: token.is_verified,
          isMeme: token.is_meme,
        }))
      })
    } catch (error) {
      console.error('Get trending tokens error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to get trending tokens'
      })
    }
  }

  static async getNewTokens(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 20

      const result = await (await require('@/config/database')).query(
        'SELECT * FROM tokens ORDER BY created_at DESC LIMIT $1',
        [limit]
      )

      res.json({
        success: true,
        data: result.rows
      })
    } catch (error) {
      console.error('Get new tokens error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to get new tokens'
      })
    }
  }

  static async searchTokens(req: Request, res: Response) {
    try {
      const { q } = req.query

      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        })
      }

      const tokens = await TokenModel_.search(q, 20)

      res.json({
        success: true,
        data: tokens.map(token => ({
          id: token.id,
          symbol: token.symbol,
          name: token.name,
          logoUrl: token.logo_url,
          isVerified: token.is_verified,
          isMeme: token.is_meme,
        }))
      })
    } catch (error) {
      console.error('Search tokens error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to search tokens'
      })
    }
  }

  static async getToken(req: Request, res: Response) {
    try {
      const { id } = req.params

      const token = await TokenModel_.findById(id)

      if (!token) {
        return res.status(404).json({
          success: false,
          error: 'Token not found'
        })
      }

      const latestPrice = await TokenPriceModel_.getLatestPrice(id)

      res.json({
        success: true,
        data: {
          id: token.id,
          symbol: token.symbol,
          name: token.name,
          description: token.description,
          logoUrl: token.logo_url,
          website: token.website,
          twitter: token.twitter,
          telegram: token.telegram,
          decimals: token.decimals,
          mintAddress: token.mint_address,
          isVerified: token.is_verified,
          isMeme: token.is_meme,
          price: latestPrice?.price_usd || 0,
          change24h: latestPrice?.change_24h || 0,
          marketCap: latestPrice?.market_cap || 0,
          volume24h: latestPrice?.volume_24h || 0,
          liquidity: latestPrice?.liquidity || 0,
          holders: latestPrice?.holders || 0,
        }
      })
    } catch (error) {
      console.error('Get token error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to get token'
      })
    }
  }

  static async getMemecoins(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 20

      const tokens = await TokenModel_.getMemecoins(limit)

      res.json({
        success: true,
        data: tokens.map(token => ({
          id: token.id,
          symbol: token.symbol,
          name: token.name,
          logoUrl: token.logo_url,
          isVerified: token.is_verified,
          isMeme: token.is_meme,
        }))
      })
    } catch (error) {
      console.error('Get memecoins error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to get memecoins'
      })
    }
  }
}
