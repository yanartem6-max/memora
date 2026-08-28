import { Router } from 'express'
import { WalletController } from '@/controllers/WalletController'
import { authenticateToken } from '@/middleware/auth'

const router = Router()

router.get('/', authenticateToken, WalletController.getWallet)
router.get('/balance', authenticateToken, WalletController.getWalletBalance)
router.get('/address', authenticateToken, WalletController.getWalletAddress)

export default router
