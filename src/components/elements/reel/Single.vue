<template>
    <div
        v-bind="{ ...containerProps, onScroll }"
        class="scrollbar-none inline-block h-48 overflow-auto scroll-smooth"
    >
        <div v-bind="wrapperProps">
            <div
                v-for="{ data } in list"
                :key="data.text"
                class="rotate-3d-x self-center justify-self-center px-6 py-2"
                :style="`--deg: ${data.deg}`"
            >
                <span :class="[(data.text < min || data.text > max) && 'opacity-0']">
                    {{ data.text }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useVirtualList, useElementBounding } from '@vueuse/core'
import { nextTick, onMounted, reactive, computed } from 'vue'

const { min, max, padStart, value } = defineProps({
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 60,
    },
    padStart: {
        type: Number,
        default: 2,
    },
    value: {
        type: Number,
        default: 3,
    },
})

const reel = reactive({
    scrollTop: null,
    bounding: null,
    // this is set manually
    itemHeight: 40,
    // this is set manually
    fillerNums: 2,
})

const reelChildAry = Array.from(Array(max - min + 1 + reel.fillerNums * 2).keys())

const reelChildInfo = computed(() => {
    return reelChildAry.map((index) => {
        return {
            index: index - reel.fillerNums,
            scrollToIndex: index,
            text: (index + min - reel.fillerNums).toString().padStart(padStart, '0'),
            deg: calculateDeg(index),
        }
    })
})

const calculateDeg = (index) => {
    const { scrollTop, itemHeight } = reel
    if (scrollTop === null) {
        return '0deg'
    }
    const { height } = reel.bounding
    const elementCenter = (index + 1) * itemHeight - itemHeight / 2
    const viewCenter = scrollTop + height / 2
    const offset = viewCenter - elementCenter
    if (Math.abs(offset) > height / 2) {
        return '90deg'
    }
    return (offset / (height / 2)) * 90 + 'deg'
}

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(reelChildInfo, {
    itemHeight: reel.itemHeight,
})

const currentReel = computed(() => {
    const { scrollTop, itemHeight } = reel
    if (scrollTop === null) {
        return null
    }
    const index = Math.floor(scrollTop / itemHeight) + reel.fillerNums
    return reelChildInfo.value[index]
})

const onScroll = () => {
    // * fire original scrollTop
    containerProps.onScroll()
    if (containerProps.ref) {
        reel.scrollTop = containerProps.ref.value.scrollTop
        setTimeout(() => {
            requestAnimationFrame(() => {
                scrollTo(Math.floor(reel.scrollTop / reel.itemHeight))
            })
        }, 300)
    }
}

onMounted(async () => {
    reel.bounding = useElementBounding(containerProps.ref)
    await nextTick()
    setTimeout(() => {
        const current = reelChildInfo.value.find((item) => Number(item.text) === value)
        if (current) {
            scrollTo(current.scrollToIndex)
        }
    }, 0)
})
</script>

<style scoped>
.rotate-3d-x {
    transform: rotate3d(1, 0, 0, var(--deg));
}
</style>
