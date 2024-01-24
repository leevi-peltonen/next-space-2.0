import * as jwt from 'jsonwebtoken'

declare module 'jsonwebtoken' {
    export interface UserJwtPayload extends jwt.JwtPayload {
        id: number,
        username: string,
        password: string,
        createdAt: Date
    }
}