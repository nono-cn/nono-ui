<script setup lang="ts">
import { computed, provide, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import {
  buttonGroupDefaults,
  buttonGroupSizeKey,
  buttonGroupVariants,
  type ButtonGroupProps,
  type ButtonGroupSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonGroupProps>(), buttonGroupDefaults)
defineSlots<ButtonGroupSlots>()

const attrs = useAttrs()
provide(
  buttonGroupSizeKey,
  computed(() => props.size ?? buttonGroupDefaults.size),
)
const rootProps = computed(() => {
  return {
    ...attrs,
    role: 'group',
    class: cn(buttonGroupVariants({ orientation: props.orientation }), attrs.class),
    style: attrs.style,
  }
})
</script>

<template>
  <div v-bind="rootProps" data-test-button-group-root>
    <slot />
  </div>
</template>
