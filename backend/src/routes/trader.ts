import { Router } from 'express'
import { TraderController } from '@/controllers/TraderController'
import { authenticateToken, optionalAuth } from '@/middleware/auth'

const router = Router()

router.get('/leaderboard', TraderController.getLeaderboard)
router.get('/:username', TraderController.getTrader)
router.post('/:traderId/follow', authenticateToken, TraderController.followTrader)

export default router
