<template>
    <div class="min-h-full flex flex-col relative">
        <TopTab
            right-plus
            left-text="Edit"
            title="World Clock"
            :is-title-hide="false"
            @topTabRightOnclick="toggleTimezoneList"
        />
        <div class="container flex-grow flex flex-col">
            <HeadTitle title="World Clock" />
            <SelectedZone :selected-zones="['taipei', 'Los angeles']" />
        </div>
        <TimezoneList
            :is-show="isShowTimezoneList"
            @close-handler="toggleTimezoneList"
            @add-to-user-list="addNewTimezone"
        />
    </div>
</template>

<script>
import TopTab from "@/components/clock/TopTab.vue";
import HeadTitle from "@/components/clock/HeadTitle.vue";
import SelectedZone from "@/components/clock/worldClock/SelectedZone.vue";
import TimezoneList from "@/components/clock/worldClock/TimezoneList.vue";
import Timezone from "@/hook/timezone";
import { ref } from "vue";

export default {
    name: "WorldClock",
    components: {
        TopTab,
        HeadTitle,
        SelectedZone,
        TimezoneList,
    },
    setup() {
        const isShowTimezoneList = ref(false);
        function toggleTimezoneList() {
            isShowTimezoneList.value = !isShowTimezoneList.value;
        }

        function addNewTimezone(targetTimezone) {
            console.log(Timezone.findZoneByAbbr(targetTimezone.zoneAbbr));
            isShowTimezoneList.value = false;
        }

        return {
            isShowTimezoneList,
            toggleTimezoneList,
            addNewTimezone,
        };
    },
};
</script>
