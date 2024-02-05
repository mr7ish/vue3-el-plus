<template>
    <div>
        User: {{ useId }}
        <div class="color-item">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const $route = useRoute();
const $router = useRouter();

// $router.go();

console.log($route);

const useId = computed(() => $route.params.id)

onBeforeRouteUpdate(() => {
    console.log('组件内守卫 onBeforeRouteUpdate=>');
})

onBeforeRouteLeave(() => {
    console.log('组件内守卫 onBeforeRouteLeave=>');
})

</script>

<style scoped>
.color-item {
    padding: 50px;
    height: 50px;
}
</style>