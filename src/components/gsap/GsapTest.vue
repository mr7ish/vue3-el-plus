<template>
    <main id="main">
        <div class="wrapper" ref="wrapper">
            <div class="btn" @click="toggleTimeline">start</div>

            <div class="box" id="box1">box 1</div>
            <div class="box">box 2</div>
            <div class="box">box 3</div>
            <div class="box">box 1</div>
            <div class="box">box 2</div>
            <div class="box">box 3</div>

        </div>
    </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable);

const wrapper = ref<Element>();
let timeline: gsap.core.Timeline | null  = null;
let ctx: gsap.Context | null = null;;

const toggleTimeline = () => {
    timeline?.reversed(!timeline.reversed());
}

onMounted(() => {
    ctx = gsap.context((self) => {
        const elems = self.selector?.('.box');
        timeline = gsap
        .timeline()
        // .to(elems, { x: 120, rotation: 360 }, )
        // .to(elems, { x: -120, rotation: -360 },)
        // .to(elems, { y: -240 }, )
        .to(elems[0], { x: 120, rotation: 360 }, )
        .to(elems[1], { x: -120, rotation: -360 }, '<')
        .to(elems[2], { y: -240 }, )
        .reverse();
    }, wrapper.value);
});

onUnmounted(() => {
    ctx?.revert();
});

Draggable.create('#box1', {
    type: 'rotation',
    bounds: document.querySelector('#main'),
    inertia: true,
    snap(value) {
        console.log(value);
        
        return Math.round(value / 90) * 90;
    },
    onDragEnd() {
        console.log('drag end...');
        
    },
    onClick() {
        console.log('onclik ...');
        
    }
    
})

</script>

<style scoped lang="less">
main {
    width: 100%;
    height: 100%;
    color: #fff;
    background-color: #1D1D1D;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 20px;
        .btn {
            width: 100px;
            height: 30px;
            background-color: #fff;
            color: #1D1D1D;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .box {
            width: 100px;
            height: 100px;
            background-color: #28A92B;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 1px 1px 1px #000,2px 2px 1px #000,3px 3px 1px #000;
        }
    }
}
</style>