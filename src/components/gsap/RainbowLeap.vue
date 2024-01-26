<template>
    <div class="rainbow-leap-wrapper">
        <svg
            id="mainSVG"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
        >
            <g id="whole">
                <g
                    id="dotGroup"
                    fill="#F9EBE0"
                >
                    <circle 
                        id="endDot"
                        cx="100"
                        cy="500"
                        r="25"
                        opacity="0"
                    />
                    <circle cx="300" cy="500" r="25"/>
                    <circle cx="500" cy="500" r="25"/>
                    <circle id="startDot" cx="700" cy="500" r="25"/>
                </g>
                <path 
                    id="connector" 
                    d="M700,500c0-165.69-134.31-300-300-300S100,334.31,100,500" 
                    fill="none" 
                    stroke="#F9EBE0" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="50"
                />  
            </g>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted } from 'vue';
import  DrawSVGPlugin  from 'gsap-trial/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

onMounted(() => {
    gsap.set('svg', {
        visibility: 'visible'
    });

    const timeline = gsap.timeline({
        repeat: -1
    }).timeScale(2);

    timeline.to('#whole', {
        duration: 2,
        x: 200,
        ease: 'none'
    })
    .set('#startDot', {
        opacity: 0
    }, 0)
    .from('#connector', {
        duration: 1,
        drawSVG: '0% 0%',
        ease: 'none'
    }, 0)
    .to('#connector', {
        drawSVG: '100% 100%',
        ease: 'expo'
    }, 0.5)
    .set('#endDot', {
        opacity: 1
    }, '-=1.1')
    .to('#endDot', {
        y: -5,
        duration: 1.1,
        ease: 'wiggle({type: easeOut, wiggles: 1})'
    }, '-=1.1')


});

</script>

<style scoped lang="less">
.rainbow-leap-wrapper {
    width: 100%;
    height: 100%;
    background-color: #208AAE;
    overflow: hidden;
    
    svg {
        width: 100%;
        height: 100%;
        visibility: hidden;
    }
}
</style>