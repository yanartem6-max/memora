import { pool } from '@/config/database'

async function rollbackMigrations() {
  const client = await pool.connect()
  
  try {
    console.log('Starting database rollback...')
    
    // Drop all tables in reverse order
    const dropSQL = `
      DROP TABLE IF EXISTS settings CASCADE;
      DROP TABLE IF EXISTS price_alerts CASCADE;
      DROP TABLE IF EXISTS watchlist CASCADE;
      DROP TABLE IF EXISTS likes CASCADE;
      DROP TABLE IF EXISTS follows CASCADE;
      DROP TABLE IF EXISTS feed_posts CASCADE;
      DROP TABLE IF EXISTS trades CASCADE;
      DROP TABLE IF EXISTS traders CASCADE;
      DROP TABLE IF EXISTS token_prices CASCADE;
      DROP TABLE IF EXISTS tokens CASCADE;
      DROP TABLE IF EXISTS transactions CASCADE;
      DROP TABLE IF EXISTS assets CASCADE;
      DROP TABLE IF EXISTS wallets CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP FUNCTION IF EXISTS update_timestamp() CASCADE;
    `
    
    await client.query(dropSQL)
    
    console.log('✅ Database rollback completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('❌ Rollback failed:', error)
    process.exit(1)
  } finally {
    client.release()
  }
}

rollbackMigrations()
