import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '@/config/environment'
import { JwtPayload } from '@/types'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    })
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload
    req.jwt = decoded
    next()
  } catch (error) {
    res.status(403).json({
      success: false,
      error: 'Invalid or expired token'
    })
  }
}

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload
      req.jwt = decoded
    } catch (error) {
      // Token invalid but it's optional, so continue
    }
  }
  next()
}

export const generateToken = (userId: string, telegramId: number): string => {
  return jwt.sign(
    {
      userId,
      telegramId,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  )
}
