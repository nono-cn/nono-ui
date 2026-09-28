<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { RatingItem, RatingItemIndicator, RatingRoot } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useColor } from '@/composables'
import { cn } from '@/lib/utils'
import {
  ratingIconVariants,
  ratingIndicatorVariants,
  ratingItemVariants,
  ratingRootVariants,
} from '.'
import { ratingDefaults } from './defaults'
import type { RatingProps, RatingSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Omit<RatingProps, 'modelValue'>>(), ratingDefaults)
defineSlots<RatingSlots>()
const model = defineModel<number>()
const attrs = useAttrs()
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
  return {
    item,
    'data-test-rating-item': '',
    class: ratingItemVariants({ disabled: props.disabled, size: props.size }),
  }
}

function getIndicatorProps(step: number) {
  return {
    step,
    'aria-label': `${step} of ${props.length}`,
    'data-test-rating-item-indicator': '',
    class: ratingIndicatorVariants({
      severity: props.color ? null : props.severity,
      color: Boolean(props.color),
    }),
  }
}
</script>

<template>
  <RatingRoot v-slot="{ items }" v-model="model" v-bind="rootProps">
    <RatingItem v-for="item in items" v-slot="{ steps }" :key="item" v-bind="getItemProps(item)">
      <RatingItemIndicator v-for="step in steps" :key="step" v-bind="getIndicatorProps(step)">
        <slot
          name="indicator"
          :item="item"
          :step="step"
          :percentage="(step % 1 || 1) * 100"
          :icon-class="ratingIconVariants({ size: props.size })"
        >
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
