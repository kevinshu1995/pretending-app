<template>
    <label class="relative overflow-hidden">
        <input
            :type="type"
            class="
                relative
                z-10
                w-full
                pl-8
                py-1
                bg-dove-gray-800
                caret-orange-peel-500
                outline-none
                rounded-lg
            "
            :value="input"
            @input="$emit('update:input', $event.target.value)"
            :placeholder="placeholder"
        />
        <div
            v-if="type === 'search'"
            class="absolute z-20 ml-2 left-0 top-0 text-shark-300 cursor-text"
        >
            <Search class="w-5 h-5" />
        </div>
    </label>
</template>

<script>
import Search from "@/components/svg/Search.vue";
import { ref } from "vue";
export default {
    props: {
        type: {},
        placeholder: {},
        input: {},
    },
    components: {
        Search,
    },
    emits: ["update:input"],
    setup() {},
};
</script>
