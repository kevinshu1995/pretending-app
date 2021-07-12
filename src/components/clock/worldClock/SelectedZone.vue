<template>
    <div class="flex-grow flex">
        <template v-if="formatZones.length === 0">
            <div class="flex-grow self-center">
                <h2 class="text-dove-gray-500 text-center text-2xl">
                    No World Clocks
                </h2>
            </div>
        </template>
        <template v-else>
            <ul class="flex-grow flex flex-col">
                <li
                    v-for="(zone, index) in formatZones"
                    :key="`zone-${index}`"
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
                    <div class="flex-grow flex flex-col justify-center">
                        <div class="flex space-x-1 text-sm text-dove-gray-500">
                            <p class="">{{ zone.relative.day }},</p>
                            <p class="flex items-center">
                                <span class="font-bold">
                                    {{ zone.relative.order }}
                                </span>
                                <span class="font-bold">
                                    {{ zone.relative.hour }}
                                </span>
                                <span>HRS</span>
                            </p>
                        </div>
                        <h2 class="text-2xl">{{ zone.zoneName }}</h2>
                    </div>
                    <div class="font-light text-6xl pr-4">
                        {{ zone.time }}
                    </div>
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
import { computed } from "vue";
export default {
    name: "SelectedZone",
    props: {
        // * 傳進來的 zones
        selectedZones: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    setup(props) {
        // 根據傳進來的 zones 轉換成需要的格式
        const formatZones = computed(function () {
            return [
                {
                    zoneName: "Taipei",
                    time: "02:06",
                    relative: {
                        order: "+",
                        day: "Today",
                        hour: "0",
                    },
                },
                {
                    zoneName: "Los Angeles",
                    time: "11:06",
                    relative: {
                        order: "-",
                        day: "Yesterday",
                        hour: "15",
                    },
                },
            ];
        });

        return {
            formatZones,
        };
    },
};
</script>
