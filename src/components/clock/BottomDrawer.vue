<template>
    <transition
        enter-active-class="animate-slide-DownIn bg-transparent"
        leave-active-class="animate-slide-DownOut bg-transparent"
    >
        <div
            class="
                fixed
                z-40
                left-0
                right-0
                top-0
                max-w-xl
                mx-auto
                md:pb-3
                pt-10
                h-full
                w-full
                bg-gray-900 bg-opacity-70
            "
            v-if="isShow"
        >
            <div
                class="
                    h-full
                    relative
                    overflow-hidden
                    flex flex-col
                    bg-black
                    rounded-t-lg
                "
            >
                <div
                    class="
                        bg-shark-500
                        w-full
                        sticky
                        left-0
                        top-0
                        backdrop-filter backdrop-blur
                    "
                >
                    <slot name="header"></slot>
                </div>
                <div class="flex-grow overflow-y-auto w-full">
                    <slot name="main"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean,
            default() {
                return true;
            },
        },
    },
    setup(props) {},
};
</script>
