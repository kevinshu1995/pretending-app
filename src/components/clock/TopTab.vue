<template>
    <nav ref="topTab" class="absolute left-0 top-0 w-full">
        <div
            class="
                flex
                text-base
                xs:text-lg
                font-bold
                backdrop-blur-lg
                bg-shark-900 bg-opacity-70
            "
            :class="topTabClass"
        >
            <button
                class="px-4 py-2 text-orange-peel-500"
                :class="leftTextClass"
                :disabled="isLeftTextHide"
                @click="topTabLeftOnclick"
            >
                {{ leftText }}
            </button>
            <p
                class="flex-grow font-black text-center py-2 transition-all"
                :class="titleClass"
            >
                {{ title }}
            </p>
            <button
                class="px-4 py-2 text-orange-peel-500"
                @click="topTabRightOnclick"
            >
                <template v-if="rightPlus">
                    <Plus />
                </template>
                <template v-else>
                    {{ rightText }}
                </template>
            </button>
        </div>
    </nav>
    <div :style="stuffingStyle"></div>
</template>

<script>
import Plus from "@/components/svg/Plus.vue";
import { computed, ref, onMounted } from "vue";

export default {
    props: {
        title: {
            type: String,
            default() {
                return "Title";
            },
        },
        leftText: {},
        rightText: {},
        rightPlus: {
            type: Boolean,
            default() {
                return false;
            },
        },
        isLeftTextHide: {
            type: Boolean,
            default() {
                return false;
            },
        },
        isTitleHide: {
            type: Boolean,
            default() {
                return true;
            },
        },
    },

    components: {
        Plus,
    },

    setup(props, { emit }) {
        const topTab = ref(null);

        const stuffingStyle = ref(0);

        const titleClass = computed(function () {
            return props.isTitleHide ? ["opacity-0"] : ["opacity-100"];
        });

        const topTabClass = computed(function () {
            return props.isTitleHide ? [] : ["border-b", "border-shark-500"];
        });

        const leftTextClass = computed(function () {
            return props.isLeftTextHide ? ["opacity-0"] : [];
        });

        onMounted(() => {
            stuffingStyle.value = `height: ${topTab.value.clientHeight}px`;
        });

        function topTabLeftOnclick() {
            emit("topTabLeftOnclick");
            console.log("topTabLeftOnclick");
        }

        function topTabRightOnclick() {
            emit("topTabRightOnclick");
            console.log("topTabRightOnclick");
        }

        return {
            topTabLeftOnclick,
            topTabRightOnclick,
            titleClass,
            topTabClass,
            leftTextClass,
            topTab,
            stuffingStyle,
        };
    },
};
</script>
