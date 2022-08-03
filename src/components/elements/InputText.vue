<template>
    <label class="relative overflow-hidden">
        <input
            :type="type"
            class="relative z-10 w-full rounded-lg bg-dove-gray-800 py-1 pl-8 caret-orange-peel-500 outline-none"
            :value="input"
            @input="emits('update:input', $event.target.value)"
            :placeholder="placeholder"
        />
        <div
            v-if="type === 'search'"
            class="absolute left-0 top-0 z-20 ml-2 cursor-text text-shark-300"
        >
            <Search class="h-5 w-5" />
        </div>
    </label>
</template>

<script setup>
import Search from '@/components/svg/Search.vue'
import { ref } from 'vue'

const { type, placeholder, input } = defineProps({
    type: {
        type: String,
        default() {
            return 'text'
        },
    },
    placeholder: {
        type: String,
        default() {
            return 'Search'
        },
    },
    input: {
        type: String,
        default() {
            return ''
        },
    },
})

const emits = defineEmits(['update:input'])
</script>
