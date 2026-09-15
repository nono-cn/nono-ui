<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import {
  progressVariants,
  type ProgressContext,
  type ProgressProps,
  type ProgressSlots,
  type ProgressValue,
} from '.'
import { progressDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

defineSlots<ProgressSlots>()

const attrs = useAttrs()
const slots = useSlots()
const props = withDefaults(defineProps<ProgressProps>(), progressDefaults)
const value = defineModel<ProgressValue>('value', { default: progressDefaults.value })

const { colorStyle } = useColor(
  computed(() => props.color),
  'progress',
)
const { colorStyle: trackColorStyle } = useColor(
  computed(() => props.trackColor),
  'progress-track',
)

const percentage = computed(() => {
  if (value.value === null) return 0

  return Math.min(100, Math.max(0, (value.value / props.max) * 100))
})

const progressContext = computed<ProgressContext>(() => {
  return {
    value: value.value,
    max: props.max,
    percentage: percentage.value,
  }
})

const rootProps = computed(() => {
  return {
    ...attrs,
    max: props.max,
    getValueLabel: props.getValueLabel,
    getValueText: props.getValueText,
    'aria-label': attrs['aria-label'],
    class: cn(
      progressVariants({ size: props.size }),
      (props.label || slots.label) && 'h-4',
      props.trackColor ? 'bg-(--progress-track-color)' : props.color && 'bg-(--progress-color)/20',
      attrs.class,
    ),
    style: [colorStyle.value, trackColorStyle.value, attrs.style],
  }
})

const indicatorProps = computed(() => {
  const indicatorUI = useUi(props.ui?.indicator, progressContext.value)

  return {
    ...indicatorUI,
    class: cn(
      'h-full w-full flex-1 bg-primary transition-all',
      props.color && 'bg-(--progress-color)',
      indicatorUI.class,
    ),
    style: [{ transform: `translateX(-${100 - percentage.value}%)` }, indicatorUI.style],
  }
})

const labelProps = computed(() => {
  const labelUI = useUi(props.ui?.label, progressContext.value)

  return {
    ...labelUI,
    'aria-hidden': true,
    class: cn(
      'pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-2 text-center text-xs font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0),0_0_7px_rgb(0_0_0/0.9),0_0_12px_rgb(0_0_0/0.7)]',
      labelUI.class,
    ),
  }
})
</script>

<template>
  <ProgressRoot v-bind="rootProps" v-model="value" data-slot="progress" data-test-progress-root>
    <ProgressIndicator
      v-bind="indicatorProps"
      data-slot="progress-indicator"
      data-test-progress-indicator
    />

    <span
      v-if="props.label || $slots.label"
      v-bind="labelProps"
      data-slot="progress-label"
      data-test-progress-label
    >
      <slot name="label" v-bind="progressContext">{{ props.label }}</slot>
    </span>
  </ProgressRoot>
</template>
