<template>
    <div>
        User: {{ useId }}
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

console.log(route);


const useId = computed(() => route.params.id)


</script>

<style scoped>

</style>