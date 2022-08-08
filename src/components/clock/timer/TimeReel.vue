<template>
    <div>
        <ReelSingle v-model:value="time.minutes" />
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import ReelSingle from '@/components/elements/reel/Single.vue'

const time = reactive({
    minutes: 10,
})
</script>
