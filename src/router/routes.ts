import APageVue from "@/components/APage.vue";
import HomePageVue from "@/components/HomePage.vue";
import type { RouteRecordRaw } from "vue-router";

export default [
    {
        path: '/',
        // component: () => import('@/components/HomePage.vue')
        component: HomePageVue
    },
    {
        path: '/a',
        // component: () => import('@/components/APage.vue')
        component: APageVue
    }

] as RouteRecordRaw[]