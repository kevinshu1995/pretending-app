<template>
    <div class="relative flex min-h-full flex-col">
        <div class="gap container flex grow flex-col">
            Timer
            <TimeReel class="mb-12" />
            <StateBtns v-model:mode="state.mode" class="mb-6" />
            <VerticalGroupBtns />
        </div>
    </div>
</template>

<script setup>
import StateBtns from '@/components/clock/timer/StateBtns.vue'
import TimeReel from '@/components/clock/timer/TimeReel.vue'
import VerticalGroupBtns from '@/components/elements/VerticalGroupBtns.vue'

import { reactive } from 'vue'

const state = reactive({
    mode: 'default',
})
</script>
