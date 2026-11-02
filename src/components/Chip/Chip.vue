<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useTheme } from '@/composables'
import { cn } from '@/lib/utils'
import { chipBaseVariants, chipRootVariants, type ChipProps, type ChipSlots } from '.'
import { chipDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChipProps>(), chipDefaults)
defineSlots<ChipSlots>()

const attrs = useAttrs()

const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'chip',
  defaultColor: chipDefaults.color,
})

const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(chipRootVariants(), attrs.class),
    style: [colorStyle.value, attrs.style],
  }
})

const baseProps = computed(() => {
  return {
    class: chipBaseVariants({
      size: props.size,
      position: props.standalone ? undefined : props.position,
      inset: props.inset,
      standalone: props.standalone,
    }),
  }
})
</script>

<template>
  <div v-bind="rootProps" data-test-chip-root>
    <slot />

    <span v-if="props.show" v-bind="baseProps" data-test-chip-base />
  </div>
</template>
