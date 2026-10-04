<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import { markerVariants, type MarkerProps, type MarkerSlots } from '.'
import { markerDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<MarkerProps>(), markerDefaults)
defineSlots<MarkerSlots>()

const attrs = useAttrs()
const rootProps = computed(() => ({
  ...attrs,
  role: props.status ? 'status' : attrs.role,
  class: cn(markerVariants({ variant: props.variant, shimmer: props.shimmer }), attrs.class),
  style: attrs.style,
}))
</script>

<template>
  <div v-bind="rootProps" data-test-marker-root>
    <slot name="icon">
      <Icon v-if="props.icon" :name="props.icon" aria-hidden="true" data-test-marker-icon />
    </slot>
    <slot>{{ props.label }}</slot>
  </div>
</template>
