<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { RatingItem, RatingItemIndicator, RatingRoot } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import { ratingItemVariants } from '.'
import { ratingDefaults } from './defaults'
import type { RatingProps } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Omit<RatingProps, 'modelValue'>>(), ratingDefaults)
const model = defineModel<number>()
const attrs = useAttrs()

const rootProps = computed(() => ({
  ...attrs,
  length: props.length,
  clearable: props.clearable,
  hoverable: props.hoverable,
  loop: props.loop,
  disabled: props.disabled,
  required: props.required,
  name: props.name,
  'data-test-rating-root': '',
  class: cn('flex gap-1 data-[disabled]:opacity-50', attrs.class),
  style: attrs.style,
}))

function getItemProps(item: number) {
  return {
    item,
    'data-test-rating-item': '',
    class: ratingItemVariants({ disabled: props.disabled }),
  }
}

function getIndicatorProps(step: number) {
  return {
    step,
    'aria-label': `${step} of ${props.length}`,
    'data-test-rating-item-indicator': '',
    class:
      'group inline-flex size-8 items-center justify-center text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring',
  }
}
</script>

<template>
  <RatingRoot v-slot="{ items }" v-model="model" v-bind="rootProps">
    <RatingItem v-for="item in items" v-slot="{ steps }" :key="item" v-bind="getItemProps(item)">
      <RatingItemIndicator v-for="step in steps" :key="step" v-bind="getIndicatorProps(step)">
        <Icon
          name="star"
          class="size-6 fill-transparent group-data-[state=active]:fill-current"
          aria-hidden="true"
        />
      </RatingItemIndicator>
    </RatingItem>
  </RatingRoot>
</template>
