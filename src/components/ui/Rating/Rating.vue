<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { RatingItem, RatingItemIndicator, RatingRoot } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useColor } from '@/composables'
import { useUi } from '@/composables/useUi'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import {
  ratingIconVariants,
  ratingIndicatorVariants,
  ratingItemVariants,
  ratingRootVariants,
} from '.'
import { ratingDefaults } from './defaults'
import type { RatingItemContext, RatingProps, RatingSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Omit<RatingProps, 'modelValue'>>(), ratingDefaults)
defineSlots<RatingSlots>()
const model = defineModel<number>()
const attrs = useAttrs()
const { t } = useI18n()
const { colorStyle } = useColor(
  computed(() => props.color),
  'rating',
)

const rootProps = computed(() => ({
  ...attrs,
  length: props.length,
  clearable: props.clearable,
  hoverable: props.hoverable,
  loop: props.loop,
  disabled: props.disabled,
  required: props.required,
  name: props.name,
  step: props.step,
  orientation: props.orientation,
  'data-test-rating-root': '',
  class: cn(ratingRootVariants({ orientation: props.orientation, size: props.size }), attrs.class),
  style: [colorStyle.value, attrs.style],
}))

function getItemProps(item: number) {
  const ui = useUi(props.ui?.item, getItemContext(item, item))
  return {
    ...ui,
    item,
    'data-test-rating-item': '',
    class: cn(ratingItemVariants({ disabled: props.disabled, size: props.size }), ui.class),
    style: ui.style,
  }
}

function getIndicatorProps(item: number, step: number) {
  const ui = useUi(props.ui?.indicator, getItemContext(item, step))
  return {
    ...ui,
    step,
    'aria-label': ui['aria-label'] ?? t('ratingItemLabel', { step, length: props.length }),
    'data-test-rating-item-indicator': '',
    class: cn(
      ratingIndicatorVariants({
        severity: props.color ? null : props.severity,
        color: Boolean(props.color),
      }),
      ui.class,
    ),
    style: ui.style,
  }
}

function getItemContext(item: number, step: number): RatingItemContext {
  return {
    item,
    step,
    percentage: (step % 1 || 1) * 100,
    iconClass: ratingIconVariants({ size: props.size }),
  }
}
</script>

<template>
  <RatingRoot v-slot="{ items }" v-model="model" v-bind="rootProps">
    <RatingItem v-for="item in items" v-slot="{ steps }" :key="item" v-bind="getItemProps(item)">
      <RatingItemIndicator v-for="step in steps" :key="step" v-bind="getIndicatorProps(item, step)">
        <slot name="item" v-bind="getItemContext(item, step)">
          <Icon
            :name="props.icon"
            :class="ratingIconVariants({ size: props.size })"
            aria-hidden="true"
            data-test-rating-icon
          />
        </slot>
      </RatingItemIndicator>
    </RatingItem>
  </RatingRoot>
</template>
