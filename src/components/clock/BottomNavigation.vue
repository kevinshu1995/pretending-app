<template>
    <nav class="w-full">
        <div
            class="flex justify-between border-t border-shark-500 bg-shark-900/70 pt-1 pb-1 backdrop-blur-lg sm:pt-2"
        >
            <div
                v-for="link in navigationLinks"
                :key="`BottomNavigationLink-${link.name}`"
                class="w-1/4"
            >
                <router-link :to="link.href" class="text-dove-gray-500 transition-all">
                    <span class="flex flex-col items-center sm:space-y-1">
                        <component
                            :is="link.icon"
                            class="w-6 xs:w-8 sm:w-10"
                            width="32"
                            height="32"
                        />
                        <span class="text-xs sm:text-sm">
                            {{ link.name }}
                        </span>
                    </span>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script setup>
import WorldClock from '@/components/svg/WorldClock.vue'
import Alarm from '@/components/svg/Alarm.vue'
import Stopwatch from '@/components/svg/Stopwatch.vue'
import Timer from '@/components/svg/Timer.vue'
import { markRaw } from 'vue'

const navigationLinks = markRaw([
    {
        name: 'World Clock',
        icon: WorldClock,
        href: {
            name: 'WorldClock',
        },
    },
    {
        name: 'Alarm',
        icon: Alarm,
        href: {
            name: 'Alarm',
        },
    },
    {
        name: 'Stopwatch',
        icon: Stopwatch,
        href: {
            name: 'Stopwatch',
        },
    },
    {
        name: 'Timer',
        icon: Timer,
        href: {
            name: 'Timer',
        },
    },
])
</script>
