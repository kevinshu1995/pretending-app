<template>
    <label class="relative overflow-hidden">
        <input
            :type="type"
            class="relative z-10 w-full pl-8 py-1 bg-dove-gray-800 caret-orange-peel-500 outline-none rounded-lg"
            :value="input"
            @input="emits('update:input', $event.target.value)"
            :placeholder="placeholder"
        />
        <div
            v-if="type === 'search'"
            class="absolute z-20 ml-2 left-0 top-0 text-shark-300 cursor-text"
        >
            <Search class="w-5 h-5" />
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
