<template>
    <div class="flex grow">
        <template v-if="formatZoneList.length === 0 || isLoading">
            <div class="grow self-center">
                <h2 class="text-center text-2xl text-dove-gray-500">No World Clocks</h2>
            </div>
        </template>
        <template v-else>
            <ul class="flex grow flex-col">
                <transition-group
                    v-for="(zone, index) in formatZoneList"
                    :key="`zone-${index}`"
                    tag="li"
                    name="list"
                    class="-mr-4 flex items-center overflow-x-hidden border-t border-shark-500 py-2.5 last-of-type:border-b"
                >
                    <div
                        :key="`list-delete-${index}`"
                        v-if="isEdit"
                        @click="$emit('onDelete', zone.zoneData.zoneAbbr)"
                        class="inline-flex h-full cursor-pointer items-center px-3 text-sunset-orange-500"
                    >
                        <MinusCircleSolid />
                    </div>
                    <div :key="`area-${index}`" class="flex grow flex-col justify-center py-1">
                        <div class="flex space-x-1 text-sm font-light text-dove-gray-500">
                            <p class="">{{ zone.relative.day }},</p>
                            <p class="flex items-center">
                                <span>
                                    {{ zone.relative.hour }}
                                </span>
                                <span>HRS</span>
                            </p>
                        </div>
                        <h2 class="text-lg xs:text-2xl">
                            {{ zone.zoneName }}
                        </h2>
                    </div>
                    <transition
                        name="fade"
                        enter-active-class="animate-fade-Out"
                        leave-active-class="animate-fade-In"
                        :key="`selectedZone-last-${index}`"
                    >
                        <template v-if="!isEdit">
                            <div
                                :key="`selectedZone-time-${index}`"
                                class="pr-4 text-5xl font-light xs:text-6xl"
                            >
                                {{ zone.time }}
                            </div>
                        </template>
                        <template v-else>
                            <div
                                :key="`selectedZone-drag-${index}`"
                                class="flex h-full cursor-pointer items-center pl-3 pr-4 text-dove-gray-500"
                            >
                                <Menu />
                            </div>
                        </template>
                    </transition>
                </transition-group>
            </ul>
        </template>
    </div>
</template>

<script setup>
import MinusCircleSolid from '@/components/svg/Minus-circle-solid.vue'
import Menu from '@/components/svg/Menu.vue'
import { computed, ref } from 'vue'
import TIME from '@/js/hooks/useTime.js'
import * as R from 'ramda'

const { isEdit, selectedZones } = defineProps({
    isEdit: {
        type: Boolean,
        default() {
            return false
        },
    },
    // * 傳進來的 zones
    selectedZones: {
        type: Array,
        default() {
            return []
        },
    },
})

const { onDelete } = defineEmits(['onDelete'])

const Time = TIME()
const isLoading = ref(false)

const formatZoneList = computed(() => {
    const curryZoneFormat = R.curry(zoneFormat)
    return R.map(curryZoneFormat, selectedZones)
})

function zoneFormat(zone) {
    const time = Time.getTargetOffsetTime(zone.zone.offset)
    const relative = Time.relativeWithLocal(zone.zone.offset)
    return {
        zoneName: zone.name,
        time: `${time.hour}:${time.minute}`,
        relative: {
            day: relative.day,
            hour: relative.hour,
        },
        zoneData: zone,
    }
}
</script>

<style scoped>
.list-leave-active {
    opacity: 0;
}
.list-enter-active {
    opacity: 0;
}
.list-move {
    transition: all 0.3s ease;
}
.fade-enter-active {
    opacity: 0;
}
.fade-leave-active {
    opacity: 1;
}
</style>
