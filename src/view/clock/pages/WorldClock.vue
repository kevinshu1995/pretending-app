<template>
    <div class="min-h-full flex flex-col relative">
        <TopTab
            right-plus
            left-text="Edit"
            title="World Clock"
            :is-title-hide="false"
            @topTabRightOnclick="toggleTimezoneList"
            @topTabLeftOnclick="toggleEditMode"
        />
        <div class="container flex-grow flex flex-col">
            <HeadTitle title="World Clock" />
            <SelectedZone
                :is-edit="isEdit"
                :selected-zones="selectedZoneList.list"
                @onDelete="deleteTimezone"
            />
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
import Localstorage from "@/hook/localstorage";
import DealData from "@/hook/dealData";
import { reactive, ref, watch, onMounted } from "vue";
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
        const selectedZoneList = reactive({ list: [] });
        const isEdit = ref(false);

        onMounted(() => {
            getDefaultZoneList();
        });

        watch(
            () => [...selectedZoneList.list],
            zones => {
                Localstorage.set("selectedZoneList", zones);
            }
        );

        function toggleTimezoneList() {
            isShowTimezoneList.value = !isShowTimezoneList.value;
        }

        /**
         * @param {Object} 要被比對的物件
         * @return {Boolean}
         */
        function isRepeat(targetTimezone) {
            return R.find(R.propEq("name", targetTimezone.name))(
                selectedZoneList.list
            ) === undefined
                ? true
                : false;
        }

        function getDefaultZoneList() {
            selectedZoneList.list = [...Localstorage.get("selectedZoneList")];
        }

        function addNewTimezone(targetTimezone) {
            if (isRepeat(targetTimezone))
                selectedZoneList.list.push(targetTimezone);
            isShowTimezoneList.value = false;
        }

        function deleteTimezone(targetAbbr) {
            const filterWithAbbr = currentZone =>
                currentZone.zoneAbbr !== targetAbbr;
            selectedZoneList.list = R.filter(
                filterWithAbbr,
                selectedZoneList.list
            );
            toggleEditMode();
        }

        function toggleEditMode() {
            isEdit.value = !isEdit.value;
        }

        return {
            isShowTimezoneList,
            toggleTimezoneList,
            toggleEditMode,
            deleteTimezone,
            addNewTimezone,
            selectedZoneList,
            isEdit,
        };
    },
};
</script>
