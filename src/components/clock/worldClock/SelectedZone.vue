<template>
    <div class="flex-grow flex">
        <template v-if="formatZoneList.length === 0 || isLoading">
            <div class="flex-grow self-center">
                <h2 class="text-dove-gray-500 text-center text-2xl">No World Clocks</h2>
            </div>
        </template>
        <template v-else>
            <ul class="flex-grow flex flex-col">
                <transition-group
                    v-for="(zone, index) in formatZoneList"
                    :key="`zone-${index}`"
                    tag="li"
                    name="list"
                    class="flex items-center py-2.5 border-t last-of-type:border-b border-shark-500 -mr-4 overflow-x-hidden"
                >
                    <div
                        :key="`list-delete-${index}`"
                        v-if="isEdit"
                        @click="$emit('onDelete', zone.zoneData.zoneAbbr)"
                        class="inline-flex items-center h-full text-sunset-orange-500 cursor-pointer px-3"
                    >
                        <MinusCircleSolid />
                    </div>
                    <div :key="`area-${index}`" class="flex-grow flex flex-col justify-center py-1">
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
                                class="font-light text-5xl xs:text-6xl pr-4"
                            >
                                {{ zone.time }}
                            </div>
                        </template>
                        <template v-else>
                            <div
                                :key="`selectedZone-drag-${index}`"
                                class="text-dove-gray-500 h-full flex items-center cursor-pointer pl-3 pr-4"
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

<script>
import MinusCircleSolid from '@/components/svg/Minus-circle-solid.vue'
import Menu from '@/components/svg/Menu.vue'
import { computed, ref } from 'vue'
import TIME from '@/js/hooks/useTime.js'
import * as R from 'ramda'

export default {
    name: 'SelectedZone',
    props: {
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
    },
    components: {
        MinusCircleSolid,
        Menu,
    },
    emits: ['onDelete'],
    setup(props) {
        const Time = TIME()
        const isLoading = ref(false)

        const formatZoneList = computed(() => {
            const curryZoneFormat = R.curry(zoneFormat)
            return R.map(curryZoneFormat, props.selectedZones)
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

        return {
            formatZoneList,
            isLoading,
        }
    },
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
