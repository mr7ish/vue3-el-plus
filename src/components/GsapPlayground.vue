<template>
    <!-- <h3>Gsap playground</h3> -->
    <div class="wrapper">
        <div class="layout">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
h3 {
        text-align: center;
}
.wrapper {
    height: 100%;
    background-color: rgb(238, 238, 238);
    color: #1D1D1D;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    .layout {
        width: 100%;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        height: 100%;
    }
}
</style>