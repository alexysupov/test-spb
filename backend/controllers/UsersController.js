import UsersService from "../services/UsersService.js";
import fs from "fs/promises";
import AuthService from "../services/AuthService.js";

class UsersController {
    async getCurrentUser(req, res) {
        try {
            const data = await UsersService.getUser(req.userId)
            res.status(200).json(data)
        }
        catch ({ message }) {
            res.status(400).json({ message })
        }
    }

    async changePassword(req, res) {
        try {
            const { oldPassword, newPassword } = req.body

            const { password } = await UsersService
                .getUser(req.userId, [])

            const isCorrect = await UsersService
                .comparePasswords(oldPassword, password)

            if (!isCorrect) {
                return res.status(400).json({
                    message: 'Incorrect old password'
                })
            }

            await UsersService.updateUser(req.userId, {
                password: newPassword
            })

            res.status(200).json(true)
        }
        catch ({ message }) {
            res.status(400).json({ message })
        }

    }
}

export default new UsersController()