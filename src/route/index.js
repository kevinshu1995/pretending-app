import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Hello',
        component: () => import('@/components/HelloWorld.vue')
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})