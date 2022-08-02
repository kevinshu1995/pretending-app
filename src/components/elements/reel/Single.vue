<template>
    <div
        class="inline-flex flex-col h-48 overflow-scroll snap-y gap-1 scrollbar-none"
        ref="dom_reel"
    >
        <div
            v-for="{ text } in reelChildInfo"
            :key="text"
            class="justify-self-center self-center px-6 snap-center"
        >
            <span>
                {{ text }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, reactive } from 'vue'
const { min, max, padStart } = defineProps({
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
        default: 0,
    },
})

const dom_reel = ref(null)

const reelChildInfo = ref(
    Array(max - min + 1)
        .fill(0)
        .map((_, i) => {
            return {
                text: (i + min).toString().padStart(padStart, '0'),
            }
        })
)

const initReelChildInfo = () => {
    reelChildInfo.value = reelChildInfo.value.map((item, i) => {
        return {
            ...item,
            ...getReelChildOffset(i),
        }
    })
}

const getReelChildOffset = (index) => {
    if (dom_reel === null) return {}
    const reelDom = dom_reel.value
    const { top: reelTop } = reelDom.getBoundingClientRect()
    const { top: reelChildTop, height: childrenHeight } =
        reelDom.children[index].getBoundingClientRect()
    const reelChildOffsetTop = reelChildTop - reelTop
    return {
        top: reelChildOffsetTop,
        center: reelChildOffsetTop + childrenHeight / 2,
        bottom: reelChildOffsetTop - childrenHeight / 2,
    }
}

onMounted(async () => {
    await nextTick()
    initReelChildInfo()
})
</script>

<style scoped>
.rotate-3d-x {
    transform: rotate3d(1, 0, 0, var(--deg));
}
</style>
