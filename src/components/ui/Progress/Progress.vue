<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables'
import {
  progressIndicatorVariants,
  progressLabelVariants,
  progressVariants,
  type ProgressContext,
  type ProgressProps,
  type ProgressSlots,
  type ProgressValue,
} from '.'
import { progressDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const slots = defineSlots<ProgressSlots>()

const attrs = useAttrs()
const props = withDefaults(defineProps<ProgressProps>(), progressDefaults)
const value = defineModel<ProgressValue>({ default: progressDefaults.modelValue })

const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'progress',
  defaultColor: progressDefaults.color,
})
const { colorStyle: trackColorStyle } = useTheme({
  color: () => props.trackColor,
  prefix: 'progress-track',
  defaultColor: progressDefaults.color,
})

const percentage = computed(() => {
  if (value.value === null) return 0

  return Math.min(100, Math.max(0, (value.value / props.max) * 100))
})

const indicatorTransform = computed(() => {
  if (value.value === null) return undefined
  const offset = 100 - percentage.value
  const direction = props.inverted ? offset : -offset
  return props.orientation === 'vertical'
    ? `translateY(${direction}%)`
    : `translateX(${direction}%)`
})

const progressContext = computed<ProgressContext>(() => {
  return {
    value: value.value,
    max: props.max,
    percentage: percentage.value,
  }
})
const showLabel = computed(
  () => (props.size === 'xl' || props.size === '2xl') && (props.label || !!slots.label),
)

const rootProps = computed(() => {
  return {
    ...attrs,
    max: props.max,
    getValueLabel: props.getValueLabel,
    getValueText: props.getValueText,
    class: cn(
      progressVariants({
        size: props.size,
        orientation: props.orientation,
        inverted: props.inverted,
        trackColor: !!props.trackColor,
      }),
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
      progressIndicatorVariants({
        animation: props.animation,
        orientation: props.orientation,
      }),
      indicatorUI.class,
    ),
    style: [
      indicatorTransform.value ? { transform: indicatorTransform.value } : undefined,
      indicatorUI.style,
    ],
  }
})

const labelProps = computed(() => {
  const labelUI = useUi(props.ui?.label, progressContext.value)

  return {
    ...labelUI,
    'aria-hidden': true,
    class: cn(progressLabelVariants({ size: props.size }), labelUI.class),
    style: labelUI.style,
  }
})
</script>

<template>
  <slot name="indicator" v-bind="progressContext" />
  <ProgressRoot v-bind="rootProps" v-model="value" data-test-progress-root>
    <ProgressIndicator v-bind="indicatorProps" data-test-progress-indicator />

    <span v-if="showLabel" v-bind="labelProps" data-test-progress-label>
      <slot name="label" v-bind="progressContext">{{ props.label }}</slot>
    </span>
  </ProgressRoot>
</template>
