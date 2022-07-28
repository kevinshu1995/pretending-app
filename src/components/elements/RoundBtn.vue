<template>
    <button
        @click="emits('onClick')"
        :class="[
            'w-16 h-16 rounded-full transition text-sm',
            'ring-2 ring-offset-2 ring-offset-black',
            'active:bg-opacity-30 active:ring-opacity-30',
            ...btnStyle,
        ]"
    >
        {{ props.text }}
    </button>
</template>

<script setup>
import { computed } from '@vue/runtime-core'

const props = defineProps({
    text: {
        type: String,
        default: 'Button',
    },
    style: {
        type: String,
        default: 'green',
        validator(style) {
            return ['red', 'green', 'gray', 'orange', 'disabled'].includes(style)
        },
    },
})

const btnStyle = computed(() => {
    switch (props.style) {
        case 'red':
            return [
                'bg-sunset-orange-900 ring-sunset-orange-900 text-sunset-orange-500',
                'bg-opacity-60 ring-opacity-60',
            ]
        case 'orange':
            return ['bg-orange-peel-900 ring-orange-peel-900', 'bg-opacity-90 ring-opacity-90']
        case 'green':
            return [
                'bg-english-holly-700 ring-english-holly-700 text-english-holly-400',
                'bg-opacity-90 ring-opacity-90',
            ]
        case 'disabled':
            return ['bg-gray-600 ring-gray-600', 'bg-opacity-90 ring-opacity-90']
        case 'gray':
        default:
            return ['bg-dove-gray-900 ring-dove-gray-900', 'bg-opacity-90 ring-opacity-90']
    }
})

const emits = defineEmits(['onClick'])
</script>

<style lang="scss" scoped></style>
