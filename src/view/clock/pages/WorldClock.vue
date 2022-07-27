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
                :selected-zones="selectedClientTimezone.list"
                @onDelete="deleteTimezone"
            />
        </div>
        <TimezoneList
            :is-show="isShowClientTimezoneList"
            @close-handler="toggleTimezoneList"
            @add-to-user-list="addClientTimezone"
        />
    </div>
</template>

<script>
import TopTab from '@/components/clock/TopTab.vue'
import HeadTitle from '@/components/clock/HeadTitle.vue'
import SelectedZone from '@/components/clock/worldClock/SelectedZone.vue'
import TimezoneList from '@/components/clock/worldClock/TimezoneList.vue'
import Localstorage from '@/js/utils/localstorage'
import DealData from '@/js/utils/dealData'
import { reactive, ref, watch, onMounted } from 'vue'
import * as R from 'ramda'

export default {
    name: 'WorldClock',
    components: {
        TopTab,
        HeadTitle,
        SelectedZone,
        TimezoneList,
    },
    setup() {
        const isShowClientTimezoneList = ref(false)
        const selectedClientTimezone = reactive({ list: [] })
        const isEdit = ref(false)

        onMounted(() => {
            getDefaultClientList()
        })

        watch(
            () => [...selectedClientTimezone.list],
            (zones) => {
                Localstorage.set('selectedClientTimezone', zones)
            }
        )

        function toggleTimezoneList() {
            isShowClientTimezoneList.value = !isShowClientTimezoneList.value
        }

        function getDefaultClientList() {
            selectedClientTimezone.list = [...Localstorage.get('selectedClientTimezone')]
        }

        function addClientTimezone(targetTimezone) {
            if (DealData.isRepeatByKey(selectedClientTimezone.list, targetTimezone, 'name'))
                selectedClientTimezone.list.push(targetTimezone)
            isShowClientTimezoneList.value = false
        }

        function deleteTimezone(targetAbbr) {
            const filterWithAbbr = (currentZone) => currentZone.zoneAbbr !== targetAbbr
            selectedClientTimezone.list = R.filter(filterWithAbbr, selectedClientTimezone.list)
            toggleEditMode()
        }

        function toggleEditMode() {
            isEdit.value = !isEdit.value
        }

        return {
            isShowClientTimezoneList,
            toggleTimezoneList,
            toggleEditMode,
            deleteTimezone,
            addClientTimezone,
            selectedClientTimezone,
            isEdit,
        }
    },
}
</script>
