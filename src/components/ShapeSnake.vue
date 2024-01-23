<template>
    <svg
        id="svg-wrapper"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
    >
        <defs>
            <g id="allBoxes">
                <rect
                    v-for="(color, index) in [...colors ]"
                    :key="`blcok${index + 1}`"
                    :x="startPositionX + index * (width + gap)"
                    :y="startPositionY"
                    :width="width"
                    :height="height"
                    :fill="color"
                />
            </g>
        </defs>

        <use xlink:href="#allBoxes" />
        <g id="ref" >
            <use xlink:href="#allBoxes" x="-0" y="100" opacity="0.1" />
        </g>
    </svg>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted } from 'vue';

type Timeline = gsap.core.Timeline;

const props = withDefaults(defineProps<{
    colors?: string[],
    width?: number
    height?: number
    startPositionX?: number
    startPositionY?: number
}>(), {
    colors: () => [
        '#FAA027',
        '#F4CC2D',
        '#F2F230',
        '#C2F261',
        '#91F291',
        '#61F2C2',
        '#30F2F2',
    ],
    width: 50,
    height: 50,
    startPositionX: 62.92, 
    startPositionY: 231.96,
});

const {
    colors,
    width,
    height,
    startPositionX,
    startPositionY,
} = props;

const gap = width;

const select = (keyword: string) => document.querySelector(keyword);
const selectAll = (keyword: string) => document.querySelectorAll(keyword);

onMounted(() => {
    // const svgWrapper = select('#svg-wrapper');
    // console.log('svgWrapper =>', svgWrapper);

    gsap.set('svg', {
        visibility: 'visible'
    });

    // infinite repeat
    const timeline = gsap.timeline({ repeat: -1 });

    timeline
    .to(selectAll('#allBoxes rect')[0], {
        transformOrigin: '100% 50%',
        rotation: gsap.utils.wrap([75]),
    })
    .to(selectAll('#allBoxes rect')[0], {
        transformOrigin: '107% 50%',

        rotation: gsap.utils.wrap([0]),
    })
    .to('#allBoxes rect', {
        transformOrigin: '107% 50%',
        rotation: gsap.utils.wrap([180, 180]),
        stagger: {
            each: 0.25
        },
        // ease: 'back.inOut'
    }).to('#allBoxes', {
        x: -120,
        duration: (timeline.recent() as Timeline).duration(),
        ease: 'none'
    }, 0);

    gsap.set('#ref', {
        scaleY: -1,
        transformOrigin: '50% 50%'
    });

});

</script>

<style scoped lang="less">
#svg-wrapper {
    width: 100%;
    height: 100%;
    visibility: hidden;
    background-color: #1d1d1d;
}
</style>