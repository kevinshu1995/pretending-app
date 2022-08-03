<template>
    <nav ref="topTab" class="sticky left-0 top-0 w-full">
        <div
            class="flex bg-shark-900/70 text-base font-bold backdrop-blur-lg xs:text-lg"
            :class="topTabClass"
        >
            <button
                class="px-4 py-2 text-orange-peel-500"
                :class="leftTextClass"
                :disabled="isLeftTextHide"
                @click="$emit('topTabLeftOnclick')"
            >
                {{ leftText }}
            </button>
            <p class="grow py-2 text-center font-black transition-all" :class="titleClass">
                {{ title }}
            </p>
            <button class="px-4 py-2 text-orange-peel-500" @click="$emit('topTabRightOnclick')">
                <template v-if="rightPlus">
                    <Plus />
                </template>
                <template v-else>
                    {{ rightText }}
                </template>
            </button>
        </div>
    </nav>
</template>

<script setup>
import Plus from '@/components/svg/Plus.vue'
import { computed, ref } from 'vue'

const { title, leftText, rightText, rightPlus, isLeftTextHide, isTitleHide } = defineProps({
    title: {
        type: String,
        default() {
            return 'Title'
        },
    },
    leftText: {},
    rightText: {},
    rightPlus: {
        type: Boolean,
        default() {
            return false
        },
    },
    isLeftTextHide: {
        type: Boolean,
        default() {
            return false
        },
    },
    isTitleHide: {
        type: Boolean,
        default() {
            return true
        },
    },
})

const { topTabLeftOnclick, topTabRightOnclick } = defineEmits([
    'topTabLeftOnclick',
    'topTabRightOnclick',
])

const topTab = ref(null)

const titleClass = computed(function () {
    return isTitleHide ? ['opacity-0'] : ['opacity-100']
})

const topTabClass = computed(function () {
    return isTitleHide ? [] : ['border-b', 'border-shark-500']
})

const leftTextClass = computed(function () {
    return isLeftTextHide ? ['opacity-0'] : []
})
</script>
