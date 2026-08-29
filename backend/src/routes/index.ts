import { Router } from 'express'

const router = Router()

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'API is healthy'
  })
})

// Simple status endpoint - no DB required
router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'MEMORA API is running'
  })
})

// Placeholder endpoints - return mock data without DB
router.get('/tokens', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Tokens endpoint (database not connected yet)'
  })
})

router.get('/traders', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Traders endpoint (database not connected yet)'
  })
})

router.get('/wallet', (req, res) => {
  res.json({
    success: true,
    data: null,
    message: 'Wallet endpoint (authentication required)'
  })
})

router.post('/auth/telegram', (req, res) => {
  res.json({
    success: true,
    message: 'Telegram authentication endpoint'
  })
})

export default router
