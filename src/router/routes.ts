import type { RouteRecordRaw } from "vue-router";
import APageVue from "@/components/APage.vue";
import HomePageVue from "@/components/HomePage.vue";
import UserPage from "@/components/UserPage.vue";
import NotFound from "@/components/NotFound.vue";
import RedItem from "@/components/RedItem.vue";
import BlueItem from "@/components/BlueItem.vue";

export default [
    {
        path: '/',
        // component: () => import('@/components/HomePage.vue')
        component: HomePageVue,
    },
    {
        path: '/pagea',
        // component: () => import('@/components/APage.vue')
        component: APageVue,
        // sensitive: true,
    },
    {
        path: '/gsap',
        component: () => import('@/components/GsapTest.vue')
    },
    {
        path: '/users/:id?',
        component: UserPage,
        sensitive: true,
        strict: true,
        children: [
            {
                path: 'red',
                component: RedItem
            },
            {
                path: 'blue',
                component: BlueItem
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound
    },

] as RouteRecordRaw[]