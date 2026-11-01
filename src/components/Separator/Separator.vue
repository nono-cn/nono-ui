<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Separator as RekaSeparator } from 'reka-ui'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables'
import { separatorDefaults } from './constants'
import {
  separatorContentVariants,
  separatorVariants,
  type SeparatorProps,
  type SeparatorSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SeparatorProps>(), separatorDefaults)
defineSlots<SeparatorSlots>()

const attrs = useAttrs()
const { colorStyle } = useTheme({
  color: () => (props.color === 'neutral' ? 'var(--border)' : props.color),
  prefix: 'separator',
  defaultColor: separatorDefaults.color,
})
const rootProps = computed(() => {
  return {
    ...attrs,
    orientation: props.orientation,
    decorative: props.decorative,
    class: cn(
      separatorVariants({
        type: props.type,
        orientation: props.orientation,
        size: props.size,
        position: props.position,
      }),
      attrs.class,
    ),
    style: [colorStyle.value, attrs.style],
  }
})
</script>

<template>
  <RekaSeparator v-bind="rootProps" data-test-separator-root>
    <div
      v-if="$slots.default || props.label"
      :class="separatorContentVariants()"
      data-test-separator-content
    >
      <slot>{{ props.label }}</slot>
    </div>
  </RekaSeparator>
</template>
