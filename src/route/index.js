import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Index',
        redirect: '/clock',
        component: () => import('@/view/Index.vue'),
    },
    {
        path: '/clock',
        name: 'Clock',
        component: () => import('@/view/clock/Index.vue'),
        children: [
            {
                path: '',
                redirect: '/worldClock',
            },
            {
                path: '/worldClock',
                name: 'WorldClock',
                component: () => import('@/view/clock/pages/WorldClock.vue'),
            },
            {
                path: '/alarm',
                name: 'Alarm',
                component: () => import('@/view/clock/pages/Alarm.vue'),
            },
            {
                path: '/stopwatch',
                name: 'Stopwatch',
                component: () => import('@/view/clock/pages/Stopwatch.vue'),
            },
            {
                path: '/timer',
                name: 'Timer',
                component: () => import('@/view/clock/pages/Timer.vue'),
            },
        ],
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})
