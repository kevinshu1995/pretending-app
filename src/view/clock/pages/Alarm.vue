<template>
    <div class="relative flex min-h-full flex-col">
        <TopTab right-plus left-text="Edit" title="Alarm" :is-title-hide="false" />
        Alarm
    </div>
</template>

<script>
import TopTab from '@/components/clock/TopTab.vue'

export default {
    name: 'Alarm',
    components: {
        TopTab,
    },
}
</script>
