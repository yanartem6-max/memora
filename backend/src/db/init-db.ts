import { readFileSync } from 'fs'
import { join } from 'path'
import { pool } from '@/config/database'
import config from '@/config/environment'

async function initializeDatabase() {
  const client = await pool.connect()

  try {
    console.log('🗄️  Initializing database...')

    // Read migration file
    const migrationPath = join(__dirname, '../../migrations/001_initial_schema.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf-8')

    // Execute migration
    console.log('📋 Running migrations...')
    await client.query(migrationSQL)

    console.log('✅ Database initialized successfully!')

    // Verify tables were created
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `)

    console.log('📊 Created tables:')
    result.rows.forEach(row => {
      console.log(`   ✓ ${row.table_name}`)
    })

    console.log('✅ Database ready!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    process.exit(1)
  } finally {
    client.release()
  }
}

// Auto-run if this is the main module
if (require.main === module) {
  initializeDatabase()
}

export default initializeDatabase
