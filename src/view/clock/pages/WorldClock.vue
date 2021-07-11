<template>
    <div class="min-h-full flex flex-col">
        <TopTab
            right-plus
            left-text="Edit"
            title="World Clock"
            :is-title-hide="false"
        />
        <div class="container flex-grow flex flex-col">
            <HeadTitle title="World Clock" />
            <SelectedZone />
        </div>
    </div>
</template>

<script>
import TopTab from "@/components/clock/TopTab.vue";
import HeadTitle from "@/components/clock/HeadTitle.vue";
import SelectedZone from "@/components/clock/worldClock/SelectedZone.vue";

export default {
    name: "WorldClock",
    components: {
        TopTab,
        HeadTitle,
        SelectedZone,
    },
};
</script>
