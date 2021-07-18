<template>
    <div class="flex-grow flex">
        <template v-if="formatZones.length === 0 || isLoading">
            <div class="flex-grow self-center">
                <h2 class="text-dove-gray-500 text-center text-2xl">
                    No World Clocks
                </h2>
            </div>
        </template>
        <template v-else>
            <ul class="flex-grow flex flex-col">
                <transition-group
                    v-for="(zone, index) in formatZones"
                    :key="`zone-${index}`"
                    tag="li"
                    name="list"
                    class="
                        flex
                        py-2.5
                        border-t
                        last-of-type:border-b
                        border-shark-500
                        -mr-4
                        overflow-x-hidden
                    "
                >
                    <div
                        :key="`list-delete-${index}`"
                        v-if="isEdit"
                        @click="$emit('onDelete', zone.zoneData.zoneAbbr)"
                        class="
                            inline-flex
                            items-center
                            h-full
                            text-sunset-orange-500
                            cursor-pointer
                            px-3
                        "
                    >
                        <MinusCircleSolid />
                    </div>
                    <div
                        :key="`area-${index}`"
                        class="flex-grow flex flex-col justify-center py-1"
                    >
                        <div
                            class="
                                flex
                                space-x-1
                                text-sm
                                font-light
                                text-dove-gray-500
                            "
                        >
                            <p class="">{{ zone.relative.day }},</p>
                            <p class="flex items-center">
                                <span>
                                    {{ zone.relative.hour }}
                                </span>
                                <span>HRS</span>
                            </p>
                        </div>
                        <h2 class="text-2xl">
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
                                class="font-light text-6xl pr-4"
                            >
                                {{ zone.time }}
                            </div>
                        </template>
                        <template v-else>
                            <div
                                :key="`selectedZone-drag-${index}`"
                                class="
                                    text-dove-gray-500
                                    h-full
                                    flex
                                    items-center
                                    cursor-pointer
                                    pl-3
                                    pr-4
                                "
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
import MinusCircleSolid from "@/components/svg/Minus-circle-solid.vue";
import Menu from "@/components/svg/Menu.vue";
import { computed, onMounted, ref } from "vue";
import time from "@/hook/time.js";
import DealData from "@/hook/dealData.js";
import * as R from "ramda";

export default {
    name: "SelectedZone",
    props: {
        isEdit: {
            type: Boolean,
            default() {
                return false;
            },
        },
        // * 傳進來的 zones
        selectedZones: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    components: {
        MinusCircleSolid,
        Menu,
    },
    emits: ["onDelete"],
    setup(props) {
        const unixtimeNow = ref({});
        const isLoading = ref(false);
        onMounted(async () => {
            isLoading.value = true;
            unixtimeNow.value = await time.formateDateTime();
            isLoading.value = false;
        });

        const formatZones = computed(() => {
            const curryZoneFormat = R.curry(zoneFormat);
            console.log(R.map(curryZoneFormat, props.selectedZones));
            return R.map(curryZoneFormat, props.selectedZones);
        });

        function zoneFormat(zone) {
            const time = selectedZoneTime(zone.zone.offset);
            const relative = relativeWithLocal(zone.zone.offset);
            return {
                zoneName: zone.name,
                time: `${time.hour}:${time.minute}`,
                relative: {
                    day: relative.day,
                    hour: relative.hour,
                },
                zoneData: zone,
            };
        }

        function relativeWithLocal(targetOffset) {
            const localOffset = R.negate(new Date().getTimezoneOffset()) / 60;
            const localHour = new Date().getHours();

            // * 會超過 24 或小於 0
            const targetHour = localHour + targetOffset - localOffset;
            let day;
            if (targetHour > 23) day = "Tomorrow";
            if (targetHour < 0) day = "Yesterday";
            else day = "Today";
            const offsetHour = () =>
                targetOffset - localOffset > 0
                    ? `+${targetOffset - localOffset}`
                    : targetOffset - localOffset;
            return {
                day,
                hour: offsetHour(),
            };
        }

        function selectedZoneTime(targetOffset) {
            // * 傳入的 offset
            const offsetAllMinutes = targetOffset * 60;
            const divideMinute = R.divide(R.__, 60);

            const currentTime = {
                hour: unixtimeNow.value.hour || 0,
                minute: unixtimeNow.value.minute || 0,
            };

            // TODO 個位數要補零
            const target_minute = R.modulo(
                Number(currentTime.minute) + offsetAllMinutes,
                60
            );

            const target_hour = R.modulo(
                Number(currentTime.hour) +
                    divideMinute(
                        Number(currentTime.minute) +
                            offsetAllMinutes -
                            target_minute
                    ),
                24
            );

            const deal_negative_time = time =>
                R.cond([
                    [R.equals(-0), R.always(0)],
                    [R.gt(0), x => time + x],
                    [R.T, x => x],
                ]);

            return {
                hour: DealData.pad_with_zeros(
                    deal_negative_time(24)(target_hour)
                ),
                minute: DealData.pad_with_zeros(
                    deal_negative_time(60)(target_minute)
                ),
            };
        }

        return {
            formatZones,
            isLoading,
        };
    },
};
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
