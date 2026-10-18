<script setup lang="ts">
import { computed } from 'vue'
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
} from 'reka-ui'
import { cn } from '@/lib/utils'
import { arrowPaths } from '@/components/ui/constants'
import {
  hoverCardArrowVariants,
  hoverCardContentVariants,
  type HoverCardArrowConfig,
  type HoverCardContentConfig,
  type HoverCardContext,
  type HoverCardEmits,
  type HoverCardProps,
  type HoverCardSlots,
} from '.'
import { hoverCardDefaults } from './constants'

defineOptions({ inheritAttrs: false })
defineSlots<HoverCardSlots>()

const props = withDefaults(defineProps<HoverCardProps>(), {
  ...hoverCardDefaults,
  content: undefined,
  arrow: undefined,
})
defineEmits<HoverCardEmits>()

const open = defineModel<boolean>('open', { default: hoverCardDefaults.open })

function close() {
  open.value = false
}

const hoverCardContext = computed<HoverCardContext>(() => ({ open: open.value, close }))

const rootProps = computed(() => {
  return {
    openDelay: props.openDelay,
    closeDelay: props.closeDelay,
    enableTouch: props.enableTouch,
  }
})

const triggerProps = {
  as: 'div' as const,
  asChild: true,
  reference: undefined,
}

const contentProps = computed<HoverCardContentConfig>(() => ({
  ...hoverCardDefaults.content,
  ...props.content,
  class: cn(hoverCardContentVariants(), props.content?.class),
}))

const portalProps = {
  to: 'body',
  forceMount: false,
  defer: undefined,
  disabled: undefined,
}

const arrowProps = computed<HoverCardArrowConfig>(() => ({
  ...hoverCardDefaults.arrow,
  ...props.arrow,
  class: cn(hoverCardArrowVariants(), props.arrow?.class),
}))
</script>

<template>
  <HoverCardRoot v-bind="rootProps" v-model:open="open">
    <HoverCardTrigger v-bind="triggerProps" data-test-hover-card-trigger>
      <slot v-bind="hoverCardContext" />
    </HoverCardTrigger>

    <HoverCardPortal v-bind="portalProps">
      <HoverCardContent v-if="$slots.content" v-bind="contentProps" data-test-hover-card-content>
        <slot name="content" v-bind="hoverCardContext" />
        <HoverCardArrow v-if="props.showArrow" v-bind="arrowProps" data-test-hover-card-arrow>
          <path
            :d="arrowProps.rounded ? arrowPaths.rounded : arrowPaths.sharp"
            vector-effect="non-scaling-stroke"
          />
        </HoverCardArrow>
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
