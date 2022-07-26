<template>
    <!-- 取得一個列表 -->
    <BottomDrawer :is-show="isShow">
        <template #header>
            <div class="container">
                <div class="row py-1">
                    <div class="col w-full">
                        <h3 class="py-1 text-center">Choose a City</h3>
                    </div>
                    <div class="col w-full">
                        <div class="row py-1">
                            <div class="col flex-grow">
                                <InputText
                                    :type="'search'"
                                    :placeholder="'Search'"
                                    v-model:input="searchInput"
                                />
                            </div>
                            <div class="col">
                                <button
                                    class="flex items-center w-full h-full text-orange-peel-500"
                                    @click="$emit('closeHandler')"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #main>
            <ul>
                <template v-for="(timezone, index) in timeZoneList" :key="`timezone-${index}`">
                    <li
                        v-if="isNotRepeated(timeZoneList, index)"
                        class="sticky top-0 bg-dove-gray-900 py-1"
                    >
                        <div class="container">
                            {{ timezone.name[0].toUpperCase() }}
                        </div>
                    </li>
                    <li>
                        <div class="container">
                            <!-- 換字母的第一個要取消 border-t -->
                            <button
                                class="border-dove-gray-800 py-3 block w-full text-left"
                                :class="{
                                    'border-t': !isNotRepeated(timeZoneList, index),
                                }"
                                @click="$emit('addToUserList', timezone)"
                            >
                                {{ timezone.name }}
                            </button>
                        </div>
                    </li>
                </template>
            </ul>
        </template>
    </BottomDrawer>
</template>

<script>
import BottomDrawer from '@/components/clock/BottomDrawer.vue'
import InputText from '@/components/elements/InputText.vue'
import Timezone from '@/hook/timezone.js'
import DealData from '@/hook/dealData.js'
import { ref, computed } from 'vue'

export default {
    components: {
        BottomDrawer,
        InputText,
    },
    props: {
        isShow: {
            type: Boolean,
            default() {
                return false
            },
        },
    },
    emits: ['closeHandler', 'addToUserList'],
    setup(props) {
        const searchInput = ref('')
        const timeZoneList = computed(() => {
            return props.isShow
                ? DealData.filterMatchedItems(
                      Timezone.getSortedTimezoneByName(),
                      searchInput.value,
                      ['name']
                  )
                : []
        })

        function isNotRepeated(WholeList, index) {
            if (index === 0) return true
            return (
                WholeList[index - 1].name[0].toUpperCase() !==
                WholeList[index].name[0].toUpperCase()
            )
        }

        return {
            timeZoneList,
            isNotRepeated,
            searchInput,
        }
    },
}
</script>
