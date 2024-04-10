import axios from "axios";

import { defaultHandler, errorHandler } from "@/helpers/handlers";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

class AuthApi {
    register(username, password) {
        return instance.post('/auth/register', {
            username,
            password
        })
    }

    login(username, password) {
        return instance.post('/auth/login', {
            username,
            password
        })
    }

    logout() {
        return instance.post('/auth/logout')
    }
}

export default new AuthApi()