import axios from "axios";

import { defaultHandler, errorHandler } from "@/helpers/handlers";
import { useAuthInterceptors } from "@/api/interceptors";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

useAuthInterceptors(instance)

class PostsApi {
    getAllPosts({ page = 1, limit = 5 }) {
        const params = { page, limit }

        return instance.get('/posts', { params })
            .then(defaultHandler)
            .catch(errorHandler)
    }

    getOnePost(postId) {
        return instance.get(`/posts/${postId}`)
            .then(defaultHandler)
            .catch(errorHandler)
    }

    createPost(postData) {
        return instance
            .post('/posts', postData)
            .then(defaultHandler)
            .catch(errorHandler)
    }

    updatePost(postId, postData) {
        return instance
            .put(`/posts/${postId}`, postData)
            .then(defaultHandler)
            .catch(errorHandler)
    }

    likePost(postId) {
        return instance
            .post(`/likes/${postId}`)
            .then(defaultHandler)
            .catch(errorHandler)
    }
}


export default new PostsApi()
