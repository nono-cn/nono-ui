<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { useTheme } from '@/composables'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { ProgressValue } from '@/components/ui/Progress'
import {
  progressCircularIndicatorVariants,
  progressCircularLabelVariants,
  progressCircularSvgVariants,
  progressCircularTrackVariants,
  progressCircularVariants,
  type ProgressCircularContext,
  type ProgressCircularProps,
  type ProgressCircularSlots,
} from '.'
import { progressCircularDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const slots = defineSlots<ProgressCircularSlots>()

const attrs = useAttrs()
const props = withDefaults(defineProps<ProgressCircularProps>(), progressCircularDefaults)
const value = defineModel<ProgressValue>({ default: progressCircularDefaults.modelValue })

const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'progress-circular',
  defaultColor: progressCircularDefaults.color,
})
const { colorStyle: trackColorStyle } = useTheme({
  color: () => props.trackColor,
  prefix: 'progress-circular-track',
  defaultColor: progressCircularDefaults.color,
})

const percentage = computed(() => {
  if (value.value === null) return 0

  return Math.min(100, Math.max(0, (value.value / props.max) * 100))
})

const radius = computed(() => (100 - props.thickness) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() =>
  value.value === null
    ? circumference.value * 0.75
    : circumference.value * (1 - percentage.value / 100),
)

const progressCircularContext = computed<ProgressCircularContext>(() => {
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
    class: cn(progressCircularVariants({ size: props.size }), attrs.class),
    style: [colorStyle.value, trackColorStyle.value, attrs.style],
  }
})

const svgProps = computed(() => {
  const svgUI = useUi(props.ui?.svg, progressCircularContext.value)

  return {
    ...svgUI,
    'aria-hidden': true,
    class: cn(progressCircularSvgVariants(), svgUI.class),
  }
})

const trackProps = computed(() => {
  const trackUI = useUi(props.ui?.track, progressCircularContext.value)

  return {
    ...trackUI,
    cx: 50,
    cy: 50,
    r: radius.value,
    'stroke-width': props.thickness,
    class: cn(progressCircularTrackVariants({ trackColor: !!props.trackColor }), trackUI.class),
  }
})

const indicatorProps = computed(() => {
  const indicatorUI = useUi(props.ui?.indicator, progressCircularContext.value)

  return {
    'stroke-linecap': 'round' as const,
    ...indicatorUI,
    cx: 50,
    cy: 50,
    r: radius.value,
    'stroke-width': props.thickness,
    'stroke-dasharray': circumference.value,
    'stroke-dashoffset': dashOffset.value,
    class: cn(progressCircularIndicatorVariants(), indicatorUI.class),
  }
})

const labelProps = computed(() => {
  const labelUI = useUi(props.ui?.label, progressCircularContext.value)

  return {
    ...labelUI,
    'aria-hidden': true,
    class: cn(progressCircularLabelVariants({ size: props.size }), labelUI.class),
  }
})
</script>

<template>
  <ProgressRoot v-bind="rootProps" v-model="value" data-test-progress-circular-root>
    <svg v-bind="svgProps" viewBox="0 0 100 100" data-test-progress-circular-svg>
      <circle v-bind="trackProps" data-test-progress-circular-track />

      <ProgressIndicator as-child>
        <circle v-bind="indicatorProps" data-test-progress-circular-indicator />
      </ProgressIndicator>
    </svg>

    <span v-if="props.label || slots.label" v-bind="labelProps" data-test-progress-circular-label>
      <slot name="label" v-bind="progressCircularContext">{{ props.label }}</slot>
    </span>
  </ProgressRoot>
</template>
