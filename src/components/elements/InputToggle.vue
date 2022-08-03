<template>
    <div :id="toggle.id.toggle" class="inline-block h-5 w-8">
        <label class="relative inline-block h-full w-full">
            <input
                :id="toggle.id.checkbox"
                type="checkbox"
                v-model="toggle.value"
                @change="toggleOnChange"
                class="peer absolute z-10 h-full w-5 translate-x-0 appearance-none rounded-full border border-white bg-white transition-all checked:translate-x-3 checked:border-malachite-500"
            />
            <div
                class="absolute top-0 block h-full w-8 rounded-full bg-gray-300 transition-all peer-checked:bg-malachite-500"
            />
        </label>
    </div>
</template>

<script>
export default {
    name: 'InputToggle',

    data() {
        return {
            toggle: {
                id: {
                    toggle: 'default-toggle',
                    checkbox: 'default-checkbox',
                },
                value: true,
            },
        }
    },

    created() {
        this.setComponentId()
    },

    methods: {
        toggleOnChange($event) {
            this.$emit('toggleOnChange', $event.target.checked)
        },

        setToggle(value = false) {
            this.toggle.value = value
        },

        getTimestamp() {
            return new Date().getTime()
        },

        getComponentName() {
            return 'inputToggle'
        },

        setComponentId() {
            const timestamp = this.getTimestamp()
            const componentName = this.getComponentName()
            this.toggle.id.toggle = `${componentName}-toggle-${timestamp}`
            this.toggle.id.checkbox = `${componentName}-checkbox-${timestamp}`
        },
    },
}
</script>
