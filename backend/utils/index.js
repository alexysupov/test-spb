import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function generateTokens(userId) {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '10m' })
    const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' })

    return { accessToken, refreshToken }
}

export function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            return error ? reject(error) : resolve(decoded)
        })
    })
}