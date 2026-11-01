<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Primitive } from 'reka-ui'
import { useTheme } from '@/composables'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  bubbleReactionsVariants,
  bubbleSurfaceVariants,
  bubbleVariants,
  type BubbleProps,
  type BubbleSlots,
} from '.'
import { bubbleDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BubbleProps>(), bubbleDefaults)
defineSlots<BubbleSlots>()

const attrs = useAttrs()

const { colorStyle, radiusStyle } = useTheme({
  color: () => props.color,
  prefix: 'bubble',
  defaultColor: bubbleDefaults.color,
  radius: () => props.radius,
  defaultRadius: bubbleDefaults.radius,
})

const rootProps = computed(() => ({
  ...attrs,
  class: cn(bubbleVariants({ align: props.align }), attrs.class),
}))

const surfaceProps = computed(() => {
  const ui = useUi(props.ui?.surface, undefined)

  return {
    ...ui,
    as: props.as,
    asChild: props.asChild,
    class: cn(bubbleSurfaceVariants({ variant: props.variant, size: props.size }), ui.class),
    style: [colorStyle.value, radiusStyle.value, ui.style],
  }
})

const reactionsProps = computed(() => {
  const ui = useUi(props.ui?.reactions, undefined)

  return {
    ...ui,
    class: cn(
      bubbleReactionsVariants({ side: props.reactionsSide, align: props.reactionsAlign }),
      ui.class,
    ),
  }
})
</script>

<template>
  <div v-bind="rootProps" data-test-bubble-root>
    <Primitive v-bind="surfaceProps" data-test-bubble-surface>
      <slot />
    </Primitive>

    <div v-if="$slots.reactions" v-bind="reactionsProps" data-test-bubble-reactions>
      <slot name="reactions" />
    </div>
  </div>
</template>
