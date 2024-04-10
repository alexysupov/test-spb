import axios from "axios";

import { defaultHandler, errorHandler } from "@/helpers/handlers";
import { useAuthInterceptors } from "@/api/interceptors";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

useAuthInterceptors(instance)

class CommentsApi {
    getAllComments() {
        return instance.get('/comments')
            .then(defaultHandler)
            .catch(errorHandler)
    }

    getPostComments(postId) {
        return instance.get(`/comments/${postId}`)
            .then(defaultHandler)
            .catch(errorHandler)
    }

    createPostComment(postId, commentData) {
        return instance
            .post(`/comments/${postId}`, commentData)
            .then(defaultHandler)
            .catch(errorHandler)
    }

    deletePostComment(commentId) {
        return instance
            .delete(`/comments/${commentId}`)
            .then(defaultHandler)
            .catch(errorHandler)
    }
}


export default new CommentsApi()
