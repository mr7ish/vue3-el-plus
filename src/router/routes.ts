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
        component: () => import('@/components/GsapPlayground.vue'),
        children: [
            {
                path: 'test',
                component: () => import('@/components/GsapTest.vue'),
            },
            {
                path: 'sortable',
                component: () => import('@/components/SortableGrid.vue'),
            },
            {
                path: 'shape-snake',
                component: () => import('@/components/ShapeSnake.vue'),
            },
            {
                path: 'plane-trails',
                component: () => import('@/components/PlaneTrails.vue'),
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