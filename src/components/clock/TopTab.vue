<template>
    <nav ref="topTab" class="sticky left-0 top-0 w-full">
        <div
            class="flex text-base xs:text-lg font-bold backdrop-blur-lg bg-shark-900/70"
            :class="topTabClass"
        >
            <button
                class="px-4 py-2 text-orange-peel-500"
                :class="leftTextClass"
                :disabled="isLeftTextHide"
                @click="$emit('topTabLeftOnclick')"
            >
                {{ leftText }}
            </button>
            <p class="grow font-black text-center py-2 transition-all" :class="titleClass">
                {{ title }}
            </p>
            <button class="px-4 py-2 text-orange-peel-500" @click="$emit('topTabRightOnclick')">
                <template v-if="rightPlus">
                    <Plus />
                </template>
                <template v-else>
                    {{ rightText }}
                </template>
            </button>
        </div>
    </nav>
</template>

<script>
import Plus from '@/components/svg/Plus.vue'
import { computed, ref } from 'vue'

export default {
    props: {
        title: {
            type: String,
            default() {
                return 'Title'
            },
        },
        leftText: {},
        rightText: {},
        rightPlus: {
            type: Boolean,
            default() {
                return false
            },
        },
        isLeftTextHide: {
            type: Boolean,
            default() {
                return false
            },
        },
        isTitleHide: {
            type: Boolean,
            default() {
                return true
            },
        },
    },

    emits: ['topTabRightOnclick', 'topTabLeftOnclick'],

    components: {
        Plus,
    },

    setup(props) {
        const topTab = ref(null)

        const titleClass = computed(function () {
            return props.isTitleHide ? ['opacity-0'] : ['opacity-100']
        })

        const topTabClass = computed(function () {
            return props.isTitleHide ? [] : ['border-b', 'border-shark-500']
        })

        const leftTextClass = computed(function () {
            return props.isLeftTextHide ? ['opacity-0'] : []
        })

        return {
            titleClass,
            topTabClass,
            leftTextClass,
            topTab,
        }
    },
}
</script>
