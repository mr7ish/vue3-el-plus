import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.onError((err) => {
    console.log('router err =>', err);
});

router.beforeEach((to, from) => {
    console.log('全局前置守卫 beforeEach =>');
});

router.beforeResolve((to, from, next) => {
    console.log('全局解析守卫 beforeResolve =>');
    next()
});

router.afterEach((to, from) => {
    console.log('全局后置守卫 afterEach =>');
})

export default router;