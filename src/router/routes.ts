import type { RouteRecordRaw } from "vue-router";

export default [
    {
        path: '/',
        component: () => import('@/components/HomePage.vue')
    },
    {
        path: '/pagea',
        component: () => import('@/components/APage.vue')
        // sensitive: true,
    },
    {
        path: '/gsap',
        component: () => import('@/components/gsap/GsapPlayground.vue'),
        children: [
            {
                path: 'test',
                component: () => import('@/components/gsap/GsapTest.vue'),
            },
            {
                path: 'sortable',
                component: () => import('@/components/gsap/SortableGrid.vue'),
            },
            {
                path: 'shape-snake',
                component: () => import('@/components/gsap/ShapeSnake.vue'),
            },
            {
                path: 'plane-trails',
                component: () => import('@/components/gsap/PlaneTrails.vue'),
            },
            {
                path: 'rainbow-leap',
                component: () => import('@/components/gsap/RainbowLeap.vue'),
            },
            {
                path: 'motion-path',
                component: () => import('@/components/gsap/MotionPath.vue'),
            }
        ]
    },
    {
        path: '/users/:id?',
        component: () => import('@/components/UserPage.vue'),
        sensitive: true,
        strict: true,
        children: [
            {
                path: 'red',
                component: () => import('@/components/RedItem.vue')
            },
            {
                path: 'blue',
                component: () => import('@/components/BlueItem.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/components/NotFound.vue'),
    },

] as RouteRecordRaw[]