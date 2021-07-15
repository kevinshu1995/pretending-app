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
            <SelectedZone :selected-zones="selectedZones" />
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
import { ref } from "vue";
import * as R from "ramda";

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
        const selectedZones = ref([]);

        function toggleTimezoneList() {
            isShowTimezoneList.value = !isShowTimezoneList.value;
        }

        /**
         * @param {Object} 要被比對的物件
         * @return {Boolean}
         */
        function isNoRepeat(targetTimezone) {
            return R.find(R.propEq("name", targetTimezone.name))(
                selectedZones.value
            ) === undefined
                ? false
                : true;
        }

        function addNewTimezone(targetTimezone) {
            console.log(targetTimezone);
            if (isNoRepeat(targetTimezone))
                selectedZones.value.push(targetTimezone);
            isShowTimezoneList.value = false;
        }

        function deleteTimezone(targetTimezone) {
            // selectedZones.value
            // Timezone.findZoneByAbbr(targetTimezone.zoneAbbr);
            // console.log(Timezone.findZoneByAbbr(targetTimezone.zoneAbbr));
        }

        return {
            isShowTimezoneList,
            toggleTimezoneList,
            addNewTimezone,
            selectedZones,
        };
    },
};
</script>
