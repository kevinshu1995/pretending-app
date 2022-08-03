<template>
    <div
        class="flex h-full max-h-screen w-full select-none items-center justify-center bg-gray-900 md:p-3"
    >
        <div class="h-full w-full max-w-xl">
            <div class="relative flex h-full w-full flex-col bg-black">
                <div class="grow overflow-auto">
                    <router-view />
                </div>
                <BottomNavigation />
            </div>
        </div>
    </div>
</template>

<script setup>
import BottomNavigation from '@/components/clock/BottomNavigation.vue'
import { useStore } from 'vuex'

const store = useStore()
updateTime()

function updateTime() {
    setInterval(() => {
        store.dispatch('setCurrentTime')
    }, 500)
}
</script>

<style>
.router-link-active,
.router-link-exact-active {
    @apply text-orange-peel-500;
}
</style>
