<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui'
import { cn } from '@/lib/utils'
import {
  tooltipArrowVariants,
  tooltipContentVariants,
  tooltipRootVariants,
  type TooltipArrowConfig,
  type TooltipContentConfig,
  type TooltipContext,
  type TooltipEmits,
  type TooltipProps,
  type TooltipSlots,
} from '.'
import { tooltipArrowDefaults, tooltipContentDefaults, tooltipDefaults } from './constants'

defineOptions({ inheritAttrs: false })
defineSlots<TooltipSlots>()

const props = withDefaults(defineProps<TooltipProps>(), tooltipDefaults)
defineEmits<TooltipEmits>()

const attrs = useAttrs()
const portalTarget = ref<HTMLElement>()
const open = defineModel<boolean>('open', { default: false })

function close() {
  open.value = false
}

const tooltipContext = computed<TooltipContext>(() => ({ open: open.value, close }))

const rootAttrs = computed(() => ({
  ...attrs,
  class: cn(tooltipRootVariants(), attrs.class),
}))

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
  ...tooltipContentDefaults,
  ...props.content,
  class: cn(tooltipContentVariants(), props.content?.class),
}))

const portalProps = computed(() => ({
  to: portalTarget.value,
  forceMount: false,
  defer: undefined,
  disabled: undefined,
}))

const arrowProps = computed<TooltipArrowConfig>(() => ({
  ...tooltipArrowDefaults,
  ...props.arrow,
  class: cn(tooltipArrowVariants(), props.arrow?.class),
}))
</script>

<template>
  <div v-bind="rootAttrs" data-test-tooltip-root>
    <TooltipProvider>
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
            <TooltipArrow v-if="props.showArrow" v-bind="arrowProps" data-test-tooltip-arrow />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
    <div ref="portalTarget" data-test-tooltip-portal-target />
  </div>
</template>
