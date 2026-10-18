<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'
import {
  popoverArrowVariants,
  popoverContentVariants,
  popoverRootVariants,
  type PopoverArrowConfig,
  type PopoverContentConfig,
  type PopoverContext,
  type PopoverEmits,
  type PopoverProps,
  type PopoverSlots,
} from '.'
import { popoverArrowDefaults, popoverContentDefaults, popoverDefaults } from './constants'

defineOptions({ inheritAttrs: false })
defineSlots<PopoverSlots>()

const props = withDefaults(defineProps<PopoverProps>(), popoverDefaults)
defineEmits<PopoverEmits>()

const attrs = useAttrs()
const portalTarget = ref<HTMLElement>()
const open = defineModel<boolean>('open', { default: false })

function close() {
  open.value = false
}

const popoverContext = computed<PopoverContext>(() => ({ open: open.value, close }))

const rootAttrs = computed(() => ({
  ...attrs,
  class: cn(popoverRootVariants(), attrs.class),
}))

const rootProps = computed(() => {
  return {
    modal: props.modal,
  }
})

const triggerProps = {
  as: 'button' as const,
  asChild: true,
}

const contentProps = computed<PopoverContentConfig>(() => ({
  ...popoverContentDefaults,
  ...props.content,
  class: cn(popoverContentVariants(), props.content?.class),
}))

const portalProps = computed(() => ({
  to: portalTarget.value,
  forceMount: false,
  defer: undefined,
  disabled: undefined,
}))

const arrowProps = computed<PopoverArrowConfig>(() => ({
  ...popoverArrowDefaults,
  ...props.arrow,
  class: cn(popoverArrowVariants(), props.arrow?.class),
}))
</script>

<template>
  <div v-bind="rootAttrs" data-test-popover-root>
    <PopoverRoot v-bind="rootProps" v-model:open="open">
      <PopoverTrigger v-bind="triggerProps" data-test-popover-trigger>
        <slot v-bind="popoverContext" />
      </PopoverTrigger>

      <PopoverPortal v-bind="portalProps">
        <PopoverContent v-if="$slots.content" v-bind="contentProps" data-test-popover-content>
          <slot name="content" v-bind="popoverContext" />
          <PopoverArrow v-if="props.showArrow" v-bind="arrowProps" data-test-popover-arrow />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
    <div ref="portalTarget" data-test-popover-portal-target />
  </div>
</template>
