<template>
    <div class="relative flex min-h-full flex-col">
        Timer
        <TimeReel />
        <div class="flex w-full justify-between">
            <RoundBtn />
            <RoundBtn />
        </div>
        <VerticalGroupBtns />
    </div>
</template>

<script setup>
import RoundBtn from '@/components/elements/RoundBtn.vue'
import TimeReel from '@/components/clock/timer/TimeReel.vue'
import VerticalGroupBtns from '@/components/elements/VerticalGroupBtns.vue'
</script>
