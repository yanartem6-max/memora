import { readFileSync } from 'fs'
import { join } from 'path'
import { pool } from '@/config/database'
import config from '@/config/environment'

async function runMigrations() {
  const client = await pool.connect()
  
  try {
    console.log('Starting database migrations...')
    
    // Read and execute migration file
    const migrationPath = join(__dirname, '../../migrations/001_initial_schema.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf-8')
    
    await client.query(migrationSQL)
    
    console.log('✅ Database migrations completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    client.release()
  }
}

runMigrations()
