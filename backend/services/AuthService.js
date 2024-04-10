import {Users} from "../models/index.js";
import bcrypt from "bcrypt";

class AuthService {
    async getUser(username) {
        try {
            return await Users.findOne({ where: { username } })
        }
        catch (e) {
            throw Error('Error check user is exists')
        }
    }

    async checkPassword(rawPassword, hashPassword) {
        try {
            return await bcrypt.compare(rawPassword, hashPassword)
        }
        catch (e) {
            throw Error('Error compare passwords')
        }
    }

    async createUser(username, password) {
        try {
            return await Users.create({ username, password })
        }
        catch (e) {
            throw Error('Error create user')
        }
    }

}

export default new AuthService()