<template>
    <div :id="toggle.id.toggle" class="inline-block w-8 h-5">
        <label class="w-full h-full relative inline-block">
            <input
                :id="toggle.id.checkbox"
                type="checkbox"
                v-model="toggle.value"
                @change="toggleOnChange"
                class="
                    peer
                    appearance-none
                    absolute
                    w-5
                    h-full
                    bg-white
                    rounded-full
                    transition-all
                    translate-x-0
                    border border-white
                    checked:translate-x-3 checked:border-malachite-500
                    z-10
                "
            />
            <div
                class="
                    absolute
                    top-0
                    w-8
                    h-full
                    bg-gray-300
                    peer-checked:bg-malachite-500
                    rounded-full
                    block
                    transition-all
                "
            />
        </label>
    </div>
</template>

<script>
export default {
    name: "InputToggle",

    data() {
        return {
            toggle: {
                id: {
                    toggle: "default-toggle",
                    checkbox: "default-checkbox",
                },
                value: true,
            },
        };
    },

    created() {
        this.setComponentId();
    },

    methods: {
        toggleOnChange($event) {
            this.$emit("toggleOnChange", $event.target.checked);
        },

        setToggle(value = false) {
            this.toggle.value = value;
        },

        getTimestamp() {
            return new Date().getTime();
        },

        getComponentName() {
            return "inputToggle";
        },

        setComponentId() {
            const timestamp = this.getTimestamp();
            const componentName = this.getComponentName();
            this.toggle.id.toggle = `${componentName}-toggle-${timestamp}`;
            this.toggle.id.checkbox = `${componentName}-checkbox-${timestamp}`;
        },
    },
};
</script>
