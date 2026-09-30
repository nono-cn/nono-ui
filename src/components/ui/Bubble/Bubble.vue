<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Primitive } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { useTheme } from '@/composables'
import { cn } from '@/lib/utils'
import { bubbleVariants, bubbleWrapperVariants, type BubbleProps, type BubbleSlots } from '.'
import BubbleReactions from './BubbleReactions.vue'
import { bubbleDefaults } from './defaults'

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

const wrapperProps = computed(() => ({
  class: bubbleWrapperVariants({ align: props.align }),
}))

const surfaceProps = computed(() => {
  return {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    class: cn(
      bubbleVariants({
        variant: props.variant,
      }),
      attrs.class,
    ),
    style: [colorStyle.value, radiusStyle.value, attrs.style],
  }
})

const reactionProps = computed(() => {
  const ui = useUi(props.ui?.reactions, undefined)
  return {
    side: props.sideReaction,
    align: props.alignReaction,
    ...ui,
    class: cn(ui.class),
  }
})
</script>

<template>
  <div v-bind="wrapperProps" data-test-bubble-root>
    <Primitive v-bind="surfaceProps" data-test-bubble-surface><slot /></Primitive>
    <BubbleReactions v-if="$slots.reactions" v-bind="reactionProps">
      <slot name="reactions" />
    </BubbleReactions>
  </div>
</template>
