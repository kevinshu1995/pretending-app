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
import { useVirtualList, useElementBounding, useDebounceFn } from '@vueuse/core'
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

const emits = defineEmits(['update:value'])

const reel = reactive({
    scrollTop: null,
    bounding: null,
    // this is set manually
    itemHeight: 40,
    // this is set manually
    fillerNums: 4,
})

const reelChildAry = Array.from(Array(max - min + 1 + reel.fillerNums * 2).keys())

const reelChildInfo = computed(() => {
    return reelChildAry.map((index) => {
        return {
            // might start from negative value
            index: index - reel.fillerNums,
            // for scroll to (real index)
            scrollToIndex: index,
            value: index + min - reel.fillerNums,
            text: (index + min - reel.fillerNums).toString().padStart(padStart, '0'),
            deg: calculateDeg(index),
        }
    })
})

const currentActiveReel = computed({
    get() {
        const { scrollTop, itemHeight } = reel
        if (scrollTop === null) {
            return null
        }
        const index = Math.floor(scrollTop / itemHeight) + reel.fillerNums
        return reelChildInfo.value[index]
    },
    set(currentValue) {
        emits('update:value', currentValue.value || value)
    },
})

const calculateDeg = (index) => {
    const disappear = '90deg'
    const visible = '0deg'
    const { scrollTop, itemHeight } = reel
    // if scrollTop is null, it means the component is not mounted yet
    if (scrollTop === null) {
        return visible
    }
    const { height } = reel.bounding
    const viewCenter = scrollTop + height / 2
    const elementCenter = (index + 1) * itemHeight - itemHeight / 2
    const elementOffset = viewCenter - elementCenter
    // if element is out of viewport, return disappear
    if (Math.abs(elementOffset) > height / 2) {
        return disappear
    }
    return (elementOffset / (height / 2)) * 90 + 'deg'
}

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(reelChildInfo, {
    itemHeight: reel.itemHeight,
})

const customScrollTo = (index) => {
    // !FIXME
    const minIndex = reel.fillerNums
    const maxIndex = max - 1
    const availableIndex = Math.max(Math.min(index, maxIndex), minIndex)
    scrollTo(availableIndex)
}

const debouncedOnScrollSideEffect = useDebounceFn(() => {
    customScrollTo(Math.floor(reel.scrollTop / reel.itemHeight))
}, 100)

const onScroll = () => {
    // * fire original scrollTop
    containerProps.onScroll()
    if (containerProps.ref) {
        requestAnimationFrame(() => {
            reel.scrollTop = containerProps.ref.value.scrollTop
            debouncedOnScrollSideEffect()
        })
    }
}

onMounted(async () => {
    reel.bounding = useElementBounding(containerProps.ref)
    await nextTick()
    setTimeout(() => {
        const current = reelChildInfo.value.find((item) => Number(item.text) === value)
        if (current) {
            customScrollTo(current.scrollToIndex)
        }
    }, 0)
})
</script>

<style scoped>
.rotate-3d-x {
    transform: rotate3d(1, 0, 0, var(--deg));
}
</style>
