import { Router } from 'express'
import { AuthController } from '@/controllers/AuthController'
import { authenticateToken } from '@/middleware/auth'

const router = Router()

router.post('/telegram', AuthController.authenticateTelegram)
router.get('/user', authenticateToken, AuthController.getUser)

export default router
