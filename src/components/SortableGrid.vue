<template>
    <div class="container" ref="container">
        <div
            v-for="item in totalRows * totalCols"
            :key="`item${item}`"
            class="item-wrapper"
            :style="{
                width: `${colSize - gap}px`,
                height: `${rowSize - gap}px`,
            }"
        >
            <div class="item-content">
                Item<span class="order">{{ item }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { computed, onMounted, ref } from 'vue';

gsap.registerPlugin(Draggable);

type Cell = {
    row: number
    col: number
    x: number
    y: number
}

type SortableParams = {
    cell: Cell;
    dragger: Draggable;
    element: Element;
    index: number;
    setIndex: (index: number) => void;
}

const props = withDefaults(defineProps<{
    rowSize?: number
    colSize?: number
    gap?: number
    totalRows?: number
    totalCols?: number
    isChangeIndex?: boolean
}>(), {
    rowSize: 150,
    colSize: 250,
    gap: 10,
    totalRows: 3,
    totalCols: 3,
    isChangeIndex: true
});

const {
    rowSize,
    colSize,
    gap,
    totalRows,
    totalCols,
    isChangeIndex
} = props;

// const rowSize = 150;
// const colSize = 250;
// const gap = 10;
// const totalRows = 5;
// const totalCols = 5;

const containerWidth = computed(() => `${totalCols * colSize}px`);
const containerHeight = computed(() => `${totalRows * rowSize}px`);

const clampCol = gsap.utils.clamp(0, totalCols - 1);
const clampRow = gsap.utils.clamp(0, totalRows - 1);


const mapCellLocations = (totalRows: number, totalCols: number) => {
    const _cells: Cell[] = [];
    for(let row = 0; row < totalRows; row++) {
        for(let col = 0; col < totalCols; col++) {
                _cells.push({
                    row,
                    col,
                    x: col * colSize,
                    y: row * rowSize
                });
            }
        }
        return _cells;
}

const cells: Cell[] = mapCellLocations(totalRows, totalCols);

const container = ref<Element | null>(null);
let items: Element[] = [];

const arrayMove = (array: SortableParams[], from: number, to: number) => {
    array.splice(to, 0, array.splice(from, 1)[0]);
}

onMounted(() => {
    items  = gsap.utils.toArray('.item-wrapper');

    const onSortable = (elem: Element, index: number) => {
        const content = elem.querySelector('.item-content');
        const order = elem.querySelector('.order');

        const animation = gsap.to(content, {
            duration: 0.3,
            boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
            force3D: true,
            scale: 1.1,
            paused: true
        });

        const layout = () => {
            gsap.to(elem, {
                duration: 0.3,
                x: sortableParams.cell.x,
                y: sortableParams.cell.y
            })
        }

        const setIndex = (index: number) => {
            const cell = cells[index];

            const dirty = getProp('x') !== cell.x || getProp('y') !== cell.y;

            sortableParams.cell = cell;
            sortableParams.index = index;
            
            if(order) {
                if(isChangeIndex) {
                    order.textContent = index + 1 + '';
                }
            }

            if(!dragger.isDragging && dirty) layout();
        }

        const downAction = () => {
            animation.play();
            dragger.update();
        }

        const upAction = () => {
            animation.reverse();
            layout();
        }

        const dragAction = () => {
            const col = clampCol(Math.round(dragger.x / colSize));
            const row = clampRow(Math.round(dragger.y / rowSize));

            const cell = sortableParams.cell;
            const sameCol = col === cell.col;
            const sameRow = row === cell.row;

            if(!sameRow || !sameCol) {
                const index = totalCols * row + col;
                changeIndex(sortableParams, index, sameRow, sameCol);
            }
        }

        const dragger = new Draggable(elem, {
            onDragStart: downAction,
            onRelease: upAction,
            onDrag: dragAction,
            cursor: 'grab'
        });

        const getProp = gsap.getProperty(elem);

        const sortableParams = {
            cell: cells[index],
            dragger,
            element: elem,
            index,
            setIndex
        }

        gsap.set(elem, {
            x: sortableParams.cell.x,
            y: sortableParams.cell.y
        });

        return sortableParams;
    }

    const sortables = items.map(onSortable);
    // const total = sortables.length;

    gsap.to(container.value, {
        autoAlpha: 1,
        duration: 0.5
    });

    const changeIndex = (item: SortableParams, to: number, sameRow: boolean, sameCol: boolean) => {
        if((sameRow && !sameCol) || (!sameRow && sameCol)) {
            const temp = sortables[to];
            sortables[to] = item;
            sortables[item.index] = temp;
        } else {
            arrayMove(sortables, item.index, to)
        }
        sortables.forEach(sortable => container.value?.appendChild(sortable.element));
        sortables.forEach((sortable, index) => sortable.setIndex(index));
    }
});

</script>

<style scoped lang="less">
.container {
    position: relative;
    top: 50%;
    left: 50%;  
    transform: translate(-50%, -50%);
    // width: 750px;
    // height: 450px;
    width: v-bind(containerWidth);
    height: v-bind(containerHeight);
    opacity: 0;
    visibility: hidden;

    .item-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        // width: 240px;
        // height: 140px;

        .item-content {
            height: 100%;
            border: 0px solid rgba(123, 123, 123, 0.498039);
            border-radius: 4px;
            background-color: rgb(255, 255, 255);
            font-size: 24px;
            color: rgb(153, 153, 153);
            box-shadow: rgba(0,0,0,0.2) 0px 1px 2px 0px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>