import crypto from 'crypto'
import config from '@/config/environment'

const ALGORITHM = 'aes-256-gcm'
const SALT_LENGTH = 16
const TAG_LENGTH = 16
const IV_LENGTH = 12

export const encryptData = (data: string): string => {
  try {
    const iv = crypto.randomBytes(IV_LENGTH)
    const salt = crypto.randomBytes(SALT_LENGTH)
    
    const key = crypto.pbkdf2Sync(
      config.encryption.key,
      salt,
      100000,
      32,
      'sha256'
    )

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
    
    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    const tag = cipher.getAuthTag()
    
    return `${iv.toString('hex')}:${salt.toString('hex')}:${tag.toString('hex')}:${encrypted}`
  } catch (error) {
    throw new Error(`Encryption failed: ${error}`)
  }
}

export const decryptData = (encryptedData: string): string => {
  try {
    const parts = encryptedData.split(':')
    if (parts.length !== 4) {
      throw new Error('Invalid encrypted data format')
    }

    const iv = Buffer.from(parts[0], 'hex')
    const salt = Buffer.from(parts[1], 'hex')
    const tag = Buffer.from(parts[2], 'hex')
    const encrypted = parts[3]

    const key = crypto.pbkdf2Sync(
      config.encryption.key,
      salt,
      100000,
      32,
      'sha256'
    )

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(tag)

    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    throw new Error(`Decryption failed: ${error}`)
  }
}

export const hashData = (data: string): string => {
  return crypto.createHash('sha256').update(data).digest('hex')
}
