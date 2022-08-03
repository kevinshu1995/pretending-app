<template>
    <transition
        enter-active-class="animate-slide-DownIn bg-transparent"
        leave-active-class="animate-slide-DownOut bg-transparent"
    >
        <div
            class="fixed left-0 right-0 top-0 z-40 mx-auto h-full w-full max-w-xl bg-gray-900/70 pt-10 md:pb-3"
            v-if="isShow"
        >
            <div class="relative flex h-full flex-col overflow-hidden rounded-t-lg bg-black">
                <div class="sticky left-0 top-0 w-full bg-shark-500 backdrop-blur">
                    <slot name="header"></slot>
                </div>
                <div class="w-full grow overflow-y-auto">
                    <slot name="main"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
const { isShow } = defineProps({
    isShow: Boolean,
})
</script>
