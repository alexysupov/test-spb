import { defineStore } from 'pinia'
import usersApi from "@/api/usersApi";
import authApi from "@/api/authApi";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null
    }),

    actions: {
        async getUser() {
           this.user = await usersApi.getUser().catch(() => null)
        },
        async login(username, password) {
            await authApi.login(username, password).then(this.getUser)
        },
        async logout() {
            this.user = await authApi.logout().then(() => null)
        },

    }
})