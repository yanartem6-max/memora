import { Request, Response } from 'express'
import { WalletModel_ } from '@/models/Wallet'
import { AssetModel_ } from '@/models/Asset'

export class WalletController {
  static async getWallet(req: Request, res: Response) {
    try {
      if (!req.jwt?.userId) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized'
        })
      }

      const wallet = await WalletModel_.findByUserId(req.jwt.userId)

      if (!wallet) {
        return res.status(404).json({
          success: false,
          error: 'Wallet not found'
        })
      }

      const assets = await AssetModel_.findByWalletId(wallet.id)
      const totalUsdValue = await AssetModel_.getTotalUsdValue(wallet.id)

      res.json({
        success: true,
        data: {
          id: wallet.id,
          address: wallet.address,
          type: wallet.type,
          network: wallet.network,
          assets,
          totalUsdValue,
        }
      })
    } catch (error) {
      console.error('Get wallet error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to get wallet'
      })
    }
  }

  static async getWalletBalance(req: Request, res: Response) {
    try {
      if (!req.jwt?.userId) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized'
        })
      }

      const wallet = await WalletModel_.findByUserId(req.jwt.userId)

      if (!wallet) {
        return res.status(404).json({
          success: false,
          error: 'Wallet not found'
        })
      }

      const totalBalance = await AssetModel_.getTotalUsdValue(wallet.id)

      res.json({
        success: true,
        data: {
          balance: totalBalance,
          usdValue: totalBalance,
          currency: 'USD'
        }
      })
    } catch (error) {
      console.error('Get balance error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to get balance'
      })
    }
  }

  static async getWalletAddress(req: Request, res: Response) {
    try {
      if (!req.jwt?.userId) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized'
        })
      }

      const wallet = await WalletModel_.findByUserId(req.jwt.userId)

      if (!wallet) {
        return res.status(404).json({
          success: false,
          error: 'Wallet not found'
        })
      }

      res.json({
        success: true,
        data: {
          address: wallet.address,
          type: wallet.type,
          network: wallet.network,
        }
      })
    } catch (error) {
      console.error('Get address error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to get address'
      })
    }
  }
}
