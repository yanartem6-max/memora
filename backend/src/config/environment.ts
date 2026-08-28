import dotenv from 'dotenv'

dotenv.config()

export const config = {
  // Server
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',

  // Database
  database: {
    url: process.env.DATABASE_URL || 'postgresql://memora:memora@localhost:5432/memora',
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_in_production',
    expiresIn: '30d',
  },

  // Telegram
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    botUsername: process.env.TELEGRAM_BOT_USERNAME || '',
  },

  // Solana
  solana: {
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
    network: (process.env.SOLANA_NETWORK || 'devnet') as 'devnet' | 'mainnet-beta',
  },

  // Redis
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },

  // Encryption
  encryption: {
    key: process.env.ENCRYPTION_KEY || 'your_encryption_key_here_32_chars_long',
  },

  // Features
  features: {
    enableTrading: true,
    enableSocialFeed: true,
    enableLeaderboard: true,
    enablePriceAlerts: true,
  },
}

export default config
