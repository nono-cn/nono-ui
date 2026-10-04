<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Label } from 'reka-ui'
import { cn } from '@/lib/utils'
import { labelVariants, type LabelProps, type LabelSlots } from '.'
import { labelDefaults } from './constants'

defineOptions({ inheritAttrs: false })

defineSlots<LabelSlots>()

const props = withDefaults(defineProps<LabelProps>(), labelDefaults)
const attrs = useAttrs()

const rootProps = computed(() => {
  return {
    ...attrs,
    for: props.for,
    class: cn(labelVariants(), attrs.class),
    style: attrs.style,
  }
})
</script>

<template>
  <Label v-bind="rootProps" data-test-label-root>
    <slot />
  </Label>
</template>
