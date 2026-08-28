import { Router } from 'express'
import { TokenController } from '@/controllers/TokenController'

const router = Router()

router.get('/trending', TokenController.getTrendingTokens)
router.get('/new', TokenController.getNewTokens)
router.get('/search', TokenController.searchTokens)
router.get('/memecoins', TokenController.getMemecoins)
router.get('/:id', TokenController.getToken)

export default router
