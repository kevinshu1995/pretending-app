<template>
    <div
        v-bind="{ ...containerProps, onScroll }"
        class="scrollbar-none inline-block h-48 overflow-auto scroll-smooth"
    >
        <div v-bind="wrapperProps">
            <div
                v-for="{ data } in list"
                :key="data.text"
                class="flex w-8 items-center justify-center self-center justify-self-center"
                :style="{
                    height: `${reel.itemHeight}px`,
                }"
            >
                <span
                    :class="[
                        'rotate-3d-x inline-block',
                        (data.text < props.min || data.text > props.max) && 'opacity-0',
                    ]"
                    :style="`--deg: ${data.deg}`"
                >
                    {{ data.text }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useVirtualList, useElementBounding, useDebounceFn, usePointerSwipe } from '@vueuse/core'
import { nextTick, onMounted, reactive, computed, watchEffect } from 'vue'

const props = defineProps({
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
    itemHeight: 27,
    // this is set manually
    fillerNums: 4,
    centerDistance: 3,
})

const reelChildAry = Array.from(Array(props.max - props.min + 1 + reel.fillerNums * 2).keys())

const reelChildInfo = computed(() => {
    return reelChildAry.map((index) => {
        return {
            // might start from negative value
            index: index - reel.fillerNums,
            // for scroll to (real index)
            scrollToIndex: index,
            value: index + props.min - reel.fillerNums,
            text: (index + props.min - reel.fillerNums).toString().padStart(props.padStart, '0'),
            deg: calculateDeg(index),
        }
    })
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

//  isOffset
//      -> true - place the scrollToIndex target in the center (useful for changing the value manually)
//      -> false - place the scrollToIndex target at the top (only be fired by scrollTop changes)
const customScrollTo = (scrollToIndex, isOffset = true) => {
    const { fillerNums, centerDistance } = reel
    const minIndex = fillerNums - centerDistance
    const maxIndex = props.max + fillerNums - centerDistance
    const targetIndex = scrollToIndex - (isOffset ? centerDistance : 0)
    const availableIndex = Math.max(Math.min(targetIndex, maxIndex), minIndex)
    scrollTo(availableIndex)
}

const debouncedOnScrollSideEffect = useDebounceFn(() => {
    // Make sure the reel position is right on the center
    customScrollTo(Math.round(reel.scrollTop / reel.itemHeight), false)
}, 300)

const onScroll = () => {
    // * fire original scrollTop
    if (containerProps.ref) {
        requestAnimationFrame(() => {
            containerProps.onScroll()
            reel.scrollTop = containerProps.ref.value.scrollTop
            debouncedOnScrollSideEffect()
        })
    }
}

// const { distanceY } = usePointerSwipe(containerProps.ref, {
//     threshold: 1,
//     async onSwipe(e) {
//         if (containerProps.ref) {
//             // FIXME 不滑順 QQ
//             containerProps.ref.value.scrollTop += distanceY.value / 2
//             reel.scrollTop += distanceY.value
//             onScroll()
//         }
//     },
// })

const init = async () => {
    reel.bounding = useElementBounding(containerProps.ref)
    await nextTick()
    setTimeout(() => {
        const defaultReel = reelChildInfo.value.find((item) => item.value === props.value)
        if (defaultReel === undefined) return
        customScrollTo(defaultReel.scrollToIndex)
    }, 0)
}

const currentActiveReel = computed(() => {
    const { scrollTop, itemHeight, centerDistance } = reel
    if (scrollTop === null) {
        return null
    }
    const realIndex = Math.floor(scrollTop / itemHeight) + centerDistance
    return reelChildInfo.value[realIndex]
})

watchEffect(() => {
    const { min, max, value } = props
    const currentValue = currentActiveReel.value?.value || value
    const emitValue = Math.min(Math.max(currentValue, min), max)
    emits('update:value', emitValue)
})

onMounted(init)
</script>

<style scoped>
.rotate-3d-x {
    transform: rotate3d(1, 0, 0, var(--deg));
}
</style>
