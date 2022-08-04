<template>
    <div class="flex w-full justify-between">
        <RoundBtn
            :text="roundBtns.left.text"
            :style="roundBtns.left.style"
            @onClick="onClickLeft"
        />
        <RoundBtn
            :text="roundBtns.right.text"
            :style="roundBtns.right.style"
            @onClick="onClickRight"
        />
    </div>
</template>

<script>
const modes = {
    default: 'default',
    onProgress: 'onProgress',
    pause: 'pause',
}
export default {}
</script>

<script setup>
import RoundBtn from '@/components/elements/RoundBtn.vue'
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
    mode: {
        type: String,
        default: modes.default,
        validator(value) {
            return Object.values(modes).includes(value)
        },
    },
})
const emits = defineEmits(['update:mode'])

const mode = useVModel(props, 'mode', emits)

const roundBtns = computed(() => {
    const btnState = {
        left: {
            text: 'Cancel',
            style: 'disabled',
        },
        right: {
            text: 'Start',
            style: 'green',
        },
    }
    switch (props.mode) {
        case modes.default:
            btnState.left.style = 'disabled'
            btnState.right = {
                text: 'Start',
                style: 'green',
            }
            break
        case modes.onProgress:
            btnState.left.style = 'gray'
            btnState.right = {
                text: 'Pause',
                style: 'orange',
            }
            break
        case modes.pause:
            btnState.left.style = 'gray'
            btnState.right = {
                text: 'Resume',
                style: 'green',
            }
            break
    }
    return btnState
})

const onClickLeft = () => {
    if (mode.value === modes.onProgress || mode.value === modes.pause) {
        mode.value = modes.default
    }
}
const onClickRight = () => {
    if (mode.value === modes.default) {
        mode.value = modes.onProgress
        return
    }
    if (mode.value === modes.onProgress) {
        mode.value = modes.pause
        return
    }
    if (mode.value === modes.pause) {
        mode.value = modes.onProgress
    }
}
</script>
