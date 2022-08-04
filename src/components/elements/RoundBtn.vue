<template>
    <button
        @click="style !== 'disabled' && emits('onClick')"
        :class="[
            'h-16 w-16 rounded-full text-sm transition',
            'ring-2 ring-offset-2 ring-offset-black',
            style === 'disabled' && 'cursor-auto',
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
            return [
                'bg-orange-peel-900 ring-orange-peel-900 text-orange-peel-500',
                'bg-opacity-50 ring-opacity-50',
                'active:bg-opacity-40 active:ring-opacity-40',
            ]
        case 'green':
            return [
                'bg-english-holly-600 ring-english-holly-600 text-malachite-500',
                'active:bg-opacity-80 active:ring-opacity-80',
            ]
        case 'disabled':
            return ['bg-gray-300 ring-gray-300 text-gray-500', 'bg-opacity-10 ring-opacity-10']
        case 'gray':
        default:
            return [
                'bg-dove-gray-900 ring-dove-gray-900',
                'bg-opacity-60 ring-opacity-60',
                'active:bg-opacity-40 active:ring-opacity-40',
            ]
    }
})

const emits = defineEmits(['onClick'])
</script>

<style lang="scss" scoped></style>
