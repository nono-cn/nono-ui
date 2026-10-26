<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { useTheme } from '@/composables'
import { useUi } from '@/composables/useUi'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import {
  sliderRangeVariants,
  sliderThumbVariants,
  sliderTrackVariants,
  sliderVariants,
  type SliderContext,
  type SliderEmits,
  type SliderProps,
  type SliderThumbContext,
} from '.'
import { sliderDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SliderProps>(), sliderDefaults)
const emit = defineEmits<SliderEmits>()

const attrs = useAttrs()
const modelValue = defineModel<number[]>({ default: sliderDefaults.modelValue })
const { t } = useI18n()

const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'slider',
  defaultColor: sliderDefaults.color,
})

const context = computed<SliderContext>(() => ({
  value: modelValue.value,
  disabled: props.disabled,
}))

const thumbContexts = computed<SliderThumbContext[]>(() =>
  modelValue.value.map((value, index) => ({
    value,
    index,
    disabled: props.disabled,
  })),
)

const rootProps = computed(() => ({
  ...attrs,
  min: props.min,
  max: props.max,
  step: props.step,
  minStepsBetweenThumbs: props.minStepsBetweenThumbs,
  orientation: props.orientation,
  inverted: props.inverted,
  disabled: props.disabled,
  thumbAlignment: props.thumbAlignment,
  name: props.name,
  required: props.required,
  class: cn(
    sliderVariants({ orientation: props.orientation, disabled: props.disabled }),
    attrs.class,
  ),
  style: [colorStyle.value, attrs.style],
}))

const trackProps = computed(() => {
  const ui = useUi(props.ui?.track, context.value)

  return {
    ...ui,
    class: cn(sliderTrackVariants({ orientation: props.orientation, size: props.size }), ui.class),
  }
})

const rangeProps = computed(() => {
  const ui = useUi(props.ui?.range, context.value)

  return {
    ...ui,
    class: cn(sliderRangeVariants({ orientation: props.orientation }), ui.class),
  }
})

function getThumbProps(thumbContext: SliderThumbContext) {
  const ui = useUi(props.ui?.thumb, thumbContext)

  return {
    'aria-label': t('value_{n}_of_{total}', {
      n: thumbContext.index + 1,
      total: modelValue.value.length,
    }),
    ...ui,
    class: cn(sliderThumbVariants({ size: props.size, disabled: props.disabled }), ui.class),
  }
}

function onUpdateModelValue(value: number[] | undefined) {
  if (!value) return
  if (value.length === modelValue.value.length && value.every((v, i) => v === modelValue.value[i]))
    return
  modelValue.value = value
  emit('change', value)
}
</script>

<template>
  <SliderRoot
    :model-value="modelValue"
    v-bind="rootProps"
    data-test-slider-root
    @update:model-value="onUpdateModelValue"
  >
    <SliderTrack v-bind="trackProps" data-test-slider-track>
      <SliderRange v-bind="rangeProps" data-test-slider-range />
    </SliderTrack>

    <SliderThumb
      v-for="thumbContext in thumbContexts"
      :key="thumbContext.index"
      v-bind="getThumbProps(thumbContext)"
      :data-test-slider-thumb="thumbContext.index"
    />
  </SliderRoot>
</template>
