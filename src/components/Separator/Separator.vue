<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Separator as RekaSeparator } from 'reka-ui'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables'
import {
  separatorDefaults,
  separatorOrientations,
  separatorPositions,
  separatorSizes,
  separatorTypes,
} from './constants'
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
  defaultColor: 'border',
})
const orientation = computed(() =>
  (separatorOrientations as readonly unknown[]).includes(props.orientation)
    ? props.orientation
    : separatorDefaults.orientation,
)
const type = computed(() =>
  (separatorTypes as readonly unknown[]).includes(props.type) ? props.type : separatorDefaults.type,
)
const size = computed(() =>
  (separatorSizes as readonly unknown[]).includes(props.size) ? props.size : separatorDefaults.size,
)
const position = computed(() =>
  (separatorPositions as readonly unknown[]).includes(props.position)
    ? props.position
    : separatorDefaults.position,
)

const rootProps = computed(() => {
  return {
    ...attrs,
    orientation: orientation.value,
    decorative: props.decorative,
    class: cn(
      separatorVariants({
        type: type.value,
        orientation: orientation.value,
        size: size.value,
        position: position.value,
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
