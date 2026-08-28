import { Pool, PoolConfig } from 'pg'
import config from './environment'

const poolConfig: PoolConfig = {
  connectionString: config.database.url,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

export const pool = new Pool(poolConfig)

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params)
}

export const getClient = async () => {
  return pool.connect()
}

export default pool
