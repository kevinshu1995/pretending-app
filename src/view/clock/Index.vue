<template>
    <div
        class="
            w-full
            h-full
            max-h-screen
            flex
            justify-center
            items-center
            md:p-3
            bg-gray-900
            select-none
        "
    >
        <div class="w-full h-full max-w-xl">
            <div class="w-full h-full bg-black relative flex flex-col">
                <div class="flex-grow overflow-auto">
                    <router-view />
                </div>
                <BottomNavigation />
            </div>
        </div>
    </div>
</template>

<script>
import BottomNavigation from "@/components/clock/BottomNavigation.vue";
import { useStore } from "vuex";
export default {
    name: "ClockIndex",
    components: {
        BottomNavigation,
    },
    setup() {
        const store = useStore();
        updateTime();

        function updateTime() {
            setInterval(() => {
                store.dispatch("setCurrentTime");
            }, 500);
        }
    },
};
</script>

<style>
.router-link-active,
.router-link-exact-active {
    @apply text-orange-peel-500;
}
</style>
