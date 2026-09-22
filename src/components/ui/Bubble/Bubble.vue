<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Primitive } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { useColor } from '@/composables'
import { cn } from '@/lib/utils'
import { bubbleVariants, bubbleWrapperVariants, type BubbleProps, type BubbleSlots } from '.'
import BubbleReactions from './BubbleReactions.vue'
import { bubbleDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BubbleProps>(), bubbleDefaults)
defineSlots<BubbleSlots>()

const attrs = useAttrs()
const { colorStyle } = useColor(
  computed(() => props.color),
  'bubble',
)
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
        severity: props.severity,
        color: Boolean(props.color),
      }),
      attrs.class,
    ),
    style: [colorStyle.value, attrs.style],
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
