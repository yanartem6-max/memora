import express from 'express'
import cors from 'cors'
import config from '@/config/environment'
import apiRoutes from '@/routes'

const app = express()

// Middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cors({
  origin: config.appUrl,
  credentials: true,
}))

// Request logging
app.use((req, express, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    network: config.solana.network,
  })
})

// API routes
app.use('/api', apiRoutes)

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'MEMORA API',
    version: '1.0.0',
    description: 'Premium Telegram Mini App for Social Crypto Trading',
    docs: '/api/docs',
    status: 'running'
  })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found'
  })
})

const port = config.port
app.listen(port, () => {
  console.log(`🚀 MEMORA API Server running on port ${port}`)
  console.log(`📍 http://localhost:${port}`)
  console.log(`Environment: ${config.nodeEnv}`)
  console.log(`Database: ${config.database.url.split('@')[1]}`)
  console.log(`Solana Network: ${config.solana.network}`)
  console.log(`\nReady to handle requests...`)
})

export default app
