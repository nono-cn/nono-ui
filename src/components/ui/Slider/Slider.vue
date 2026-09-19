<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import { useColor } from '@/composables'
import {
  sliderVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
  type SliderContext,
  type SliderProps,
  type SliderThumbContext,
  type SliderValue,
} from '.'
import { sliderDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SliderProps>(), sliderDefaults)
const emit = defineEmits<{
  valueCommit: [value: number[]]
}>()

const attrs = useAttrs()
const value = defineModel<SliderValue>('value', { default: () => [...sliderDefaults.value()] })

const validateValue = (val: SliderValue) => {
  if (val === null) return [0]

  const values = (val ?? []).filter((item) => item >= props.min && item <= props.max)
  if (values.length === 0) return val.length === 1 && val[0] === 0 ? val : [0]
  if (values.length === val.length && val.length <= 2) return val

  return values.slice(0, 2) as SliderValue
}

watch(
  [value, () => props.min, () => props.max],
  () => {
    value.value = validateValue(value.value)
  },
  { immediate: true },
)

const { t } = useI18n()
const { colorStyle } = useColor(
  computed(() => props.color),
  'slider',
)

function createSliderContext(values: number[]): SliderContext {
  return { values }
}

function createSliderThumbContext(
  values: number[],
  index: number,
  thumbValue: number,
): SliderThumbContext {
  return {
    values,
    index,
    value: thumbValue,
    first: index === 0,
    last: index === values.length - 1,
  }
}

const sliderContext = computed<SliderContext>(() => createSliderContext(value.value))

const rootProps = computed(() => {
  return {
    ...attrs,
    disabled: props.disabled,
    orientation: props.orientation,
    inverted: props.inverted,
    min: props.min,
    max: props.max,
    step: props.step,
    minStepsBetweenThumbs: props.minStepsBetweenThumbs,
    thumbAlignment: props.thumbAlignment,
    name: props.name,
    required: props.required,
    class: cn(sliderVariants({ orientation: props.orientation }), attrs.class),
    style: attrs.style,
  }
})

const trackProps = computed(() => {
  const ui = useUi(props.ui?.track, sliderContext.value)

  return {
    ...ui,
    class: cn(
      sliderTrackVariants({
        orientation: props.orientation,
        size: props.size,
        severity: props.severity,
        color: Boolean(props.color),
      }),
      ui.class,
    ),
    style: [colorStyle.value, ui.style],
  }
})

const rangeProps = computed(() => {
  const ui = useUi(props.ui?.range, sliderContext.value)
  return {
    ...ui,
    class: cn(
      sliderRangeVariants({
        orientation: props.orientation,
        severity: props.severity,
        color: Boolean(props.color),
      }),
      ui.class,
    ),
    style: [colorStyle.value, ui.style],
  }
})

const thumbContexts = computed<SliderThumbContext[]>(() =>
  value.value.map((thumbValue, index, values) =>
    createSliderThumbContext(values, index, thumbValue),
  ),
)

function getThumbProps(context: SliderThumbContext) {
  const ui = useUi(props.ui?.thumb, context)
  const rangeAriaLabel =
    context.values.length === 2 ? (context.index === 0 ? t('minimum') : t('maximum')) : undefined

  return {
    ...ui,
    'aria-label': ui['aria-label'] ?? rangeAriaLabel,
    class: cn(
      sliderThumbVariants({
        disabled: props.disabled,
        size: props.size,
        severity: props.severity,
        color: Boolean(props.color),
      }),
      ui.class,
    ),
    style: [colorStyle.value, ui.style],
  }
}
</script>

<template>
  <SliderRoot
    v-model="value"
    v-bind="rootProps"
    data-test-slider-root
    @value-commit="emit('valueCommit', $event)"
  >
    <SliderTrack v-bind="trackProps" data-test-slider-track>
      <SliderRange v-bind="rangeProps" data-test-slider-range />
    </SliderTrack>

    <SliderThumb
      v-for="thumbContext in thumbContexts"
      :key="thumbContext.index"
      :data-test-slider-thumb="thumbContext.index"
      v-bind="getThumbProps(thumbContext)"
    />
  </SliderRoot>
</template>
