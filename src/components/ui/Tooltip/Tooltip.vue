<script setup lang="ts">
import { computed } from 'vue'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'
import { arrowPaths } from '@/components/ui/constants'
import {
  tooltipArrowVariants,
  tooltipContentVariants,
  type TooltipArrowConfig,
  type TooltipContentConfig,
  type TooltipContext,
  type TooltipEmits,
  type TooltipProps,
  type TooltipSlots,
} from '.'
import { tooltipDefaults } from './constants'

defineOptions({ inheritAttrs: false })
defineSlots<TooltipSlots>()

// content y arrow se fusionan con sus defaults en los computed, no como default de la prop
const props = withDefaults(defineProps<TooltipProps>(), {
  ...tooltipDefaults,
  content: undefined,
  arrow: undefined,
})
defineEmits<TooltipEmits>()

const open = defineModel<boolean>('open', { default: tooltipDefaults.open })

function close() {
  open.value = false
}

const tooltipContext = computed<TooltipContext>(() => ({ open: open.value, close }))

const rootProps = computed(() => {
  return {
    delayDuration: props.delayDuration,
    disableHoverableContent: props.disableHoverableContent,
    disableClosingTrigger: props.disableClosingTrigger,
    disabled: props.disabled,
    ignoreNonKeyboardFocus: props.ignoreNonKeyboardFocus,
  }
})

const triggerProps = {
  as: 'button' as const,
  asChild: true,
}

const contentProps = computed<TooltipContentConfig>(() => ({
  ...tooltipDefaults.content,
  ...props.content,
  class: cn(tooltipContentVariants(), props.content?.class),
}))

const portalProps = {
  to: 'body',
  forceMount: false,
  defer: undefined,
  disabled: undefined,
}

const arrowProps = computed<TooltipArrowConfig>(() => ({
  ...tooltipDefaults.arrow,
  ...props.arrow,
  class: cn(tooltipArrowVariants(), props.arrow?.class),
}))
</script>

<template>
  <TooltipRoot v-bind="rootProps" v-model:open="open">
    <TooltipTrigger v-bind="triggerProps" data-test-tooltip-trigger>
      <slot v-bind="tooltipContext" />
    </TooltipTrigger>

    <TooltipPortal v-bind="portalProps">
      <TooltipContent
        v-if="$slots.content || props.text"
        v-bind="contentProps"
        data-test-tooltip-content
      >
        <slot name="content" v-bind="tooltipContext">{{ props.text }}</slot>
        <TooltipArrow v-if="props.showArrow" v-bind="arrowProps" data-test-tooltip-arrow>
          <path :d="arrowPaths.sharp" vector-effect="non-scaling-stroke" />
        </TooltipArrow>
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
