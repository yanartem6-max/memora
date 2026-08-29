// Простой PostgreSQL клиент без зависимостей
const { Client } = require('pg');

let db = null;

async function connectDB() {
  if (db) return db;
  
  const DATABASE_URL = process.env.DATABASE_URL;
  
  if (!DATABASE_URL) {
    console.log('⚠️  DATABASE_URL not found, using in-memory storage');
    return null;
  }
  
  try {
    db = new Client({
      connectionString: DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    await db.connect();
    console.log('✅ PostgreSQL connected!');
    
    // Создаём таблицы если их нет
    await initTables();
    
    return db;
  } catch (error) {
    console.error('❌ DB connection error:', error.message);
    return null;
  }
}

async function initTables() {
  if (!db) return;
  
  try {
    // Таблица пользователей
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        telegram_id BIGINT UNIQUE NOT NULL,
        username VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Таблица токенов
    await db.query(`
      CREATE TABLE IF NOT EXISTS tokens (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        symbol VARCHAR(50) NOT NULL,
        contract_address VARCHAR(255),
        price DECIMAL(20, 8),
        change_24h DECIMAL(10, 2),
        volume_24h DECIMAL(20, 2),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Таблица трейдеров
    await db.query(`
      CREATE TABLE IF NOT EXISTS traders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        wallet_address VARCHAR(255),
        total_profit DECIMAL(20, 2),
        win_rate DECIMAL(5, 2),
        trades_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    console.log('✅ Database tables created');
  } catch (error) {
    console.error('❌ Table creation error:', error.message);
  }
}

async function query(sql, params = []) {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db.query(sql, params);
}

module.exports = {
  connectDB,
  query,
  getDB: () => db
};
