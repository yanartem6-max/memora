import express from 'express'
import cors from 'cors'

const app = express()

// Middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cors({
  origin: '*',
  credentials: true,
}))

// Request logging
app.use((req: any, res: any, next: any) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Health check
app.get('/health', (req: any, res: any) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

// Root route
app.get('/', (req: any, res: any) => {
  res.json({
    name: 'MEMORA API',
    version: '1.0.0',
    description: 'Premium Telegram Mini App for Social Crypto Trading',
    status: 'running'
  })
})

// API routes
app.get('/api/health', (req: any, res: any) => {
  res.json({ status: 'ok' })
})

app.get('/api/tokens', (req: any, res: any) => {
  res.json({
    success: true,
    data: [],
    message: 'Tokens endpoint'
  })
})

app.get('/api/traders', (req: any, res: any) => {
  res.json({
    success: true,
    data: [],
    message: 'Traders endpoint'
  })
})

app.get('/api/wallet', (req: any, res: any) => {
  res.json({
    success: true,
    data: null,
    message: 'Wallet endpoint'
  })
})

app.post('/api/auth/telegram', (req: any, res: any) => {
  res.json({
    success: true,
    message: 'Telegram authentication endpoint'
  })
})

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  })
})

// 404 handler
app.use((req: any, res: any) => {
  res.status(404).json({
    success: false,
    error: 'Not Found'
  })
})

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`🚀 MEMORA API Server running on port ${port}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`Ready to handle requests...`)
})

export default app
