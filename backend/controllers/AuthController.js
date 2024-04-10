import AuthService from "../services/AuthService.js";
import {generateTokens, verifyToken} from "../utils/index.js";

class AuthController {
    async register(req, res, next) {
        try {
            const { username, password } = req.body

            if (!username || !password) {
                return res.status(400).json({
                    message: 'Username or password is empty'
                })
            }

            const user = await AuthService.getUser(username)

            if (user) {
                return res.status(400).json({
                    message: 'User already registered'
                })
            }

            const data = await AuthService.createUser(username, password)
            res.status(200).json(data)
        }
        catch (error) {
            res.status(400).json(error)
        }
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body

            const user = await AuthService.getUser(username)

            if (!user) {
                return res.status(400).json({
                    message: 'Incorrect login or password'
                })
            }

            const isCorrect = await AuthService.checkPassword(password, user.password)

            if (!isCorrect) {
                return res.status(400).json({
                    message: 'Incorrect login or password'
                })
            }

            const { accessToken, refreshToken } = generateTokens(user.id)

            res.cookie('X-Access-Token', accessToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
            })

            res.cookie('X-Refresh-Token', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
            })

            res.status(200).send(true)
        }
        catch (e) {
            res.status(400).send(false)
        }
    }

    async logout(req, res, next) {
        try {
            res.clearCookie('X-Access-Token')
            res.clearCookie('X-Refresh-Token')
            res.status(200).send(true)
        }
        catch (e) {
            res.status(400).send(false)
        }
    }

    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies['X-Refresh-Token']

            const { userId } = await verifyToken(refreshToken)
                .catch((error) => {
                    return res.status(403).json(error)
                })

            if (!userId) return false

            const {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            } = generateTokens(userId)

            res.cookie('X-Access-Token', newAccessToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
            })

            res.cookie('X-Refresh-Token', newRefreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
            })

            res.status(200).send(true)
        }
        catch (e) {
            res.status(400).send(false)
        }
    }
}

export default new AuthController()