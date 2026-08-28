import { Router } from 'express'
import authRoutes from './auth'
import walletRoutes from './wallet'
import tokenRoutes from './token'
import traderRoutes from './trader'

const router = Router()

router.use('/auth', authRoutes)
router.use('/wallet', walletRoutes)
router.use('/tokens', tokenRoutes)
router.use('/traders', traderRoutes)

export default router
