-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  telegram_id BIGINT UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  photo_url TEXT,
  language_code VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_telegram_id ON users(telegram_id);
CREATE INDEX idx_users_username ON users(username);

-- Wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  address VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50) DEFAULT 'solana',
  network VARCHAR(50) DEFAULT 'devnet',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, type, network)
);

CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_wallets_address ON wallets(address);

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  symbol VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  decimals INT DEFAULT 0,
  balance NUMERIC(65, 0) DEFAULT '0',
  usd_value NUMERIC(20, 2) DEFAULT '0',
  logo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(wallet_id, symbol)
);

CREATE INDEX idx_assets_wallet_id ON assets(wallet_id);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  from_asset VARCHAR(50) NOT NULL,
  to_asset VARCHAR(50) NOT NULL,
  from_amount NUMERIC(65, 0) NOT NULL,
  to_amount NUMERIC(65, 0) NOT NULL,
  fee NUMERIC(20, 8) DEFAULT '0',
  tx_hash VARCHAR(255),
  signature VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transactions_wallet_id ON transactions(wallet_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_tx_hash ON transactions(tx_hash);

-- Tokens table
CREATE TABLE IF NOT EXISTS tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  symbol VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  twitter TEXT,
  telegram TEXT,
  decimals INT DEFAULT 0,
  mint_address VARCHAR(255) UNIQUE NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  is_meme BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tokens_symbol ON tokens(symbol);
CREATE INDEX idx_tokens_mint_address ON tokens(mint_address);

-- Token prices table
CREATE TABLE IF NOT EXISTS token_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token_id UUID NOT NULL REFERENCES tokens(id) ON DELETE CASCADE,
  price NUMERIC(20, 8) NOT NULL,
  price_usd NUMERIC(20, 8) NOT NULL,
  change_24h NUMERIC(10, 2) DEFAULT '0',
  change_1h NUMERIC(10, 2) DEFAULT '0',
  market_cap NUMERIC(20, 2) DEFAULT '0',
  volume_24h NUMERIC(20, 2) DEFAULT '0',
  liquidity NUMERIC(20, 2) DEFAULT '0',
  holders INT DEFAULT '0',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_token_prices_token_id ON token_prices(token_id);
CREATE INDEX idx_token_prices_created_at ON token_prices(created_at);

-- Traders table
CREATE TABLE IF NOT EXISTS traders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  username VARCHAR(255) UNIQUE NOT NULL,
  wallet_address VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar TEXT,
  total_trades INT DEFAULT '0',
  win_rate NUMERIC(5, 2) DEFAULT '0',
  average_hold_time INT DEFAULT '0',
  total_pnl NUMERIC(20, 2) DEFAULT '0',
  pnl_30d NUMERIC(20, 2) DEFAULT '0',
  pnl_7d NUMERIC(20, 2) DEFAULT '0',
  pnl_24h NUMERIC(20, 2) DEFAULT '0',
  followers INT DEFAULT '0',
  following INT DEFAULT '0',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_traders_user_id ON traders(user_id);
CREATE INDEX idx_traders_username ON traders(username);

-- Trades table
CREATE TABLE IF NOT EXISTS trades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trader_id UUID NOT NULL REFERENCES traders(id) ON DELETE CASCADE,
  token_id UUID NOT NULL REFERENCES tokens(id),
  type VARCHAR(20) NOT NULL,
  amount NUMERIC(65, 0) NOT NULL,
  price NUMERIC(20, 8) NOT NULL,
  pnl NUMERIC(20, 2),
  pnl_percentage NUMERIC(10, 2),
  thesis TEXT,
  likes INT DEFAULT '0',
  comments INT DEFAULT '0',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_trades_trader_id ON trades(trader_id);
CREATE INDEX idx_trades_token_id ON trades(token_id);
CREATE INDEX idx_trades_created_at ON trades(created_at);

-- Feed posts table
CREATE TABLE IF NOT EXISTS feed_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trader_id UUID NOT NULL REFERENCES traders(id) ON DELETE CASCADE,
  trade_id UUID REFERENCES trades(id) ON DELETE CASCADE,
  text TEXT,
  likes INT DEFAULT '0',
  comments INT DEFAULT '0',
  shares INT DEFAULT '0',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_feed_posts_trader_id ON feed_posts(trader_id);
CREATE INDEX idx_feed_posts_created_at ON feed_posts(created_at);

-- Follows table
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID NOT NULL REFERENCES traders(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES traders(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(follower_id, following_id),
  CHECK(follower_id != following_id)
);

CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  feed_post_id UUID NOT NULL REFERENCES feed_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, feed_post_id)
);

CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_feed_post_id ON likes(feed_post_id);

-- Watchlist table
CREATE TABLE IF NOT EXISTS watchlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_id UUID NOT NULL REFERENCES tokens(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, token_id)
);

CREATE INDEX idx_watchlist_user_id ON watchlist(user_id);

-- Price alerts table
CREATE TABLE IF NOT EXISTS price_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_id UUID NOT NULL REFERENCES tokens(id) ON DELETE CASCADE,
  alert_type VARCHAR(20),
  price_target NUMERIC(20, 8),
  change_target NUMERIC(10, 2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_price_alerts_user_id ON price_alerts(user_id);
CREATE INDEX idx_price_alerts_token_id ON price_alerts(token_id);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  currency VARCHAR(10) DEFAULT 'USD',
  language VARCHAR(10) DEFAULT 'en',
  theme VARCHAR(20) DEFAULT 'light',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  haptic_feedback_enabled BOOLEAN DEFAULT TRUE,
  price_alerts_enabled BOOLEAN DEFAULT TRUE,
  trade_notifications_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_settings_user_id ON settings(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER trigger_users_update BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_assets_update BEFORE UPDATE ON assets
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_transactions_update BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_tokens_update BEFORE UPDATE ON tokens
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_price_alerts_update BEFORE UPDATE ON price_alerts
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_settings_update BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Default USDT token
INSERT INTO tokens (symbol, name, decimals, mint_address, is_verified)
VALUES ('USDT', 'Tether USD', 6, 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', true)
ON CONFLICT (symbol) DO NOTHING;

-- Default SOL token
INSERT INTO tokens (symbol, name, decimals, mint_address, is_verified)
VALUES ('SOL', 'Solana', 9, 'So11111111111111111111111111111111111111112', true)
ON CONFLICT (symbol) DO NOTHING;
