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
    console.log('to =>', to);
    console.log('from =>', from);

    if(!to.path.includes('red')) return;
    else return '/pagea';
});

export default router;