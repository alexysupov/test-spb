import axios from "axios";

import { defaultHandler, errorHandler } from "@/helpers/handlers";
import { useAuthInterceptors } from "@/api/interceptors";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

useAuthInterceptors(instance)

class AuthApi {
    getUser() {
        return instance
            .get('/users/me')
            .then(defaultHandler)
            .catch(errorHandler)
    }

    changeImage(formData) {
        return instance
            .put('/users/avatar', formData)
            .then(defaultHandler)
            .catch(errorHandler)
    }
}

export default new AuthApi()