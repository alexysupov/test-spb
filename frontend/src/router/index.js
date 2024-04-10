import { createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/Auth/Register.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Auth/Login.vue')
        },
        {
            path: '/posts',
            name: 'posts-list',
            component: () => import('@/views/Posts/PostsList.vue'),
        },
        {
            path: '/posts/:id',
            name: 'posts-article',
            component: () => import('@/views/Posts/PostsArticle.vue')
        },
        {
            path: '/posts/create',
            name: 'posts-create',
            component: () => import('@/views/Posts/PostsCreate.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: "not-found",
            component: () => import('@/views/404.vue')
        }
    ]
})
export default router