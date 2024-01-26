<template>
    <div class="plane-trails-wrapper">
        <!-- the grid background-->
        <svg
            id="patternSVG"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    :width="gridCellSize"
                    :height="gridCellSize"
                    patternUnits="userSpaceOnUse"
                    id="sqrs"
                    :viewBox="`0 0 ${gridCellSize} ${gridCellSize}`"
                >
                    <rect
                        class="grid-rect"
                        x="0"
                        y="0"
                        :width="gridCellSize"
                        :height="gridCellSize"
                        fill="none"
                    />
                </pattern>
            </defs>

            <rect 
                id="grid"
                class="grid"
                y="-100"
                fill="url(#sqrs)"
                width="100%"
                height="200%"
                stroke="none"
            />
        </svg>

        <!-- the planes -->
        <svg
            id="mainSVG"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 600"
        >
            <defs>
                <filter
                    id="glow"
                    x="-100%"
                    y="-100%"
                    width="250%"
                    height="250%"
                >
                    <feGaussianBlur
                        stdDeviation="8" 
                        result="coloredBlur"
                    />
                    <feOffset dx="0" dy="0" result="offsetblur"></feOffset>
                    <feFlood id="glow-alpha" flood-color="#FFF" flood-opacity="1"></feFlood>
                    <feComposite in2="offsetblur" operator="in"></feComposite>
                    <feMerge>
                        <feMergeNode/>          
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
            </defs>

            <g >
                <polyline
                    v-for="(_line, lineIndex) in planeColors"    
                    :key="`trail${lineIndex}`"
                    class="trail-line"
                />
                <path
                    v-for="(_plane, planeIndex) in planeColors"    
                    :key="`plane${planeIndex}`"
                    class="plane"
                    d="M20,13.7v-1.4l-8.6-5.1V3.5c0-1-0.6-3.5-1.4-3.5S8.6,2.4,8.6,3.5v3.7L0,12.2v1.4l8.6-1.8l0.5,5l-2.5,1.9V20 
                    l3.5-0.8l3.5,0.8v-1.2L11,16.9l0.5-5L20,13.7z"
                />
            </g>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted } from 'vue';
import { CustomEase } from 'gsap/all';

gsap.registerPlugin(CustomEase);

const select = <T extends Element>(selector: string) => document.querySelector<T>(selector);
const selectAll = <T extends Element>(selector: string) => document.querySelectorAll<T>(selector);

const props = withDefaults(defineProps<{
    planeColors?: string[]
    gridCellSize?: number
    planeFillColor?: string
    lineWidth?: number
    gridBackgroundColor?: string
    gridOpacity?: number
}>(), {
    planeColors: () => [
        "#04BCE8",
        "#EA6360",
        "#4EBE92",
        "#A83395",
        "#4A52A6",
        "#F2CD5D",
    ],
    gridCellSize: 50,
    planeFillColor: '#ccc',
    lineWidth: 1.5,
    gridBackgroundColor: '#141723',
    gridOpacity: 0.085,
});

const {
    planeColors,
    gridCellSize,
    planeFillColor,
    lineWidth,
    gridBackgroundColor,
    gridOpacity,
} = props;

onMounted(() => {
    const mainSVG = select<SVGSVGElement>('#mainSVG');
    if(!mainSVG) return;

    const numPoints = 400;
    const svgHeight = 600;
    const height = svgHeight;

    const allPlanes: SVGPathElement[] = gsap.utils.toArray('.plane');
    const allTrailLines = selectAll<SVGPolylineElement>('.trail-line');

    const allTrailPoints: typeof planeInitArray[] = [];

    const planeWidth = allPlanes[0].getBBox().width;
    const pivotFrame = 60;

    gsap.defaults({
        lazy: true
    });

    gsap.set('svg', {
        visibility: 'visible'
    });

    gsap.set(allPlanes, {
        transformOrigin: '50% 100%',
        yPercent: -20
    });

    const p = CustomEase.create(
        'trail',
        "M0,0 C0,0 0.08957,0.04997 0.14563,0.07332 0.17361,0.08497 0.19406,0.08816 0.22447,0.09346 0.25234,0.09831 0.27245,0.10281 0.29876,0.1 0.3304,0.09662 0.3574,0.09206 0.38526,0.07627 0.46146,0.0331 0.50906,-0.01658 0.58698,-0.06332 0.61735,-0.08154 0.64322,-0.09168 0.67604,-0.09815 0.70315,-0.10349 0.72556,-0.09999 0.75503,-0.09644 0.7862,-0.09269 0.8064,-0.0881 0.83671,-0.07879 0.87049,-0.06842 0.89148,-0.06013 0.92338,-0.04473 0.95378,-0.03007 1,0 1,0 "
    );

    const planeInitArray: {
        x: number
        y: number
    }[] = [];

    const duration = gsap.utils.random(5, 20);

    const swayPlane = (_id: number) => {
        gsap.set(allPlanes[_id], {
            x: allTrailPoints[_id][0].x - planeWidth / 2,
            y: allTrailPoints[_id][0].y - planeWidth
        });

        gsap.to(allPlanes[_id], {
            duration: 0.1,
            rotation: (planeInitArray[_id].x - allTrailPoints[_id][pivotFrame].x) * 0.72,
            ease: 'sine.inOut'
        });
    }

    for(let j = 0; j < allPlanes.length; j++) {
        const trailLine = allTrailLines[j];
        const pointX = gsap.utils.random(250, 350);
        const pointArray = [];
        const heightMultiplier = gsap.utils.random(0.11, 0.8);
        gsap.set(allTrailLines[j], {
            stroke: planeColors[j]
        });

        for(let i = 0; i < numPoints; i++) {
            const point = trailLine.points.appendItem(mainSVG.createSVGPoint());
            pointArray.push(point);
            point.x = pointX;
            point.y = height * heightMultiplier + i * (height / numPoints);
        }

        allTrailPoints.push(pointArray);
        planeInitArray.push({
            x: pointArray[0].x,
            y: pointArray[0].y
        });

        const timeline = gsap.timeline();
        timeline.to(allTrailPoints[j], {
            duration: gsap.utils.random(7, 14),
            x: '-=' + gsap.utils.random(-600, 600),
            stagger: {
                each: duration / 1000,
                repeat: -1
            },
            onUpdate: swayPlane,
            onUpdateParams: [j],
            ease: 'trail'
        }).seek(gsap.utils.random(300, 1000));
    }

    const extraTimeline = gsap.timeline();
    extraTimeline.to('#grid', {
        duration: 1,
        y: '+=40',
        ease: 'none',
        repeat: -1
    });

    allTrailLines.forEach((item, index) => {
        const timeline = gsap.timeline();
        timeline.to(item, {
            strokeDashoffset: -(14 * 4),
            duration: gsap.utils.random(0.5, 0.76),
            repeat: -1,
            ease: 'none'
        });
        extraTimeline.add(timeline, 0);
    });
});

</script>

<style scoped lang="less">
.plane-trails-wrapper {
    width: 100%;
    height: 100%;
    background-color: v-bind(gridBackgroundColor);
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    --line-stroke: #0074b3;
	--line-stroke-width: v-bind(lineWidth);
	--circle-fill: #00adef;
	--circle-stroke: #0074b3;

    svg {
        position: absolute;
        width: 100%;
        height: 100%;
        visibility: hidden;
        overflow: visible;
    }

    .trail-line {
        stroke: var(--line-stroke);
        stroke-width: var(--line-stroke-width);
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 4 10;
    }

    .grid-rect {
        stroke: var(--circle-stroke);
    }

    #grid {
        opacity: v-bind(gridOpacity);
    }

    #glow-alpha {
        flood-color: var(--circle-stroke);
    }

    .plane {
        fill: v-bind(planeFillColor);
    }
}
</style>