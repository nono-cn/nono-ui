<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui'
import { cn } from '@/lib/utils'
import type { TooltipContext, TooltipEmits, TooltipProps, TooltipSlots } from '.'
import { tooltipArrowDefaults, tooltipContentDefaults, tooltipDefaults } from './default'

defineOptions({ inheritAttrs: false })

defineSlots<TooltipSlots>()

const props = withDefaults(defineProps<TooltipProps>(), tooltipDefaults)
defineEmits<TooltipEmits>()
const attrs = useAttrs()
const slots = useSlots()

const portalTarget = ref<HTMLElement>()
const open = defineModel<boolean>('open', { default: false })

function close() {
  open.value = false
}

const tooltipContext = computed<TooltipContext>(() => ({
  open: open.value,
  close,
}))

const rootProps = computed(() => ({
  delayDuration: props.delayDuration,
  disableHoverableContent: props.disableHoverableContent,
  disableClosingTrigger: props.disableClosingTrigger,
  disabled: props.disabled,
  ignoreNonKeyboardFocus: props.ignoreNonKeyboardFocus,
}))

const contentProps = computed(() => {
  const content = props.content ?? {}
  return {
    ...tooltipContentDefaults,
    ...content,
    class: cn(
      'data-[state=closed]:animate-out data-[state=delayed-open]:animate-in data-[state=instant-open]:animate-in data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=instant-open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95 data-[state=instant-open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--reka-tooltip-content-transform-origin) rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background border border-zinc-200 bg-white text-zinc-950 shadow-md',
      content?.class,
    ),
    style: content?.style,
  }
})

const arrowProps = computed(() => {
  const arrow = props.arrow ?? {}
  return {
    ...tooltipArrowDefaults,
    ...arrow,
    class: cn(arrow.class),
    style: arrow.style,
  }
})
</script>

<template>
  <div v-bind="attrs" class="contents" data-test-tooltip-root>
    <TooltipProvider>
      <TooltipRoot v-bind="rootProps" v-model:open="open">
        <TooltipTrigger as-child data-test-tooltip-trigger>
          <slot v-bind="tooltipContext" />
        </TooltipTrigger>

        <TooltipPortal :to="portalTarget">
          <TooltipContent v-if="slots.content" v-bind="contentProps" data-test-tooltip-content>
            <slot name="content" v-bind="tooltipContext" />
            <TooltipArrow v-if="props.showArrow" v-bind="arrowProps" data-test-tooltip-arrow />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
      <div ref="portalTarget" data-test-tooltip-portal-target />
    </TooltipProvider>
  </div>
</template>
