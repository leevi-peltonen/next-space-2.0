'use server'
 
import { redirect } from 'next/navigation'
import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
 
export async function navigate(path: string) {
  redirect(path)
}

export const generateToken = (user: User) => {
    const payload = { ...user, password: '' }
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    })
    return token
}

export const verifyToken = (token: string): User | null => {
    try {
      const { id, username, password, createdAt } = <jwt.UserJwtPayload>jwt.verify(token, process.env.JWT_SECRET as string)
      return { id, username, password, createdAt }
    } catch (error) {
      return null
    }
}

