<script setup lang="ts">
import { computed } from 'vue'
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'
import { useUi } from '@/composables/useUi'
import { arrowPaths } from '@/components/ui/constants'
import {
  popoverArrowVariants,
  popoverContentVariants,
  type PopoverContext,
  type PopoverEmits,
  type PopoverProps,
  type PopoverSlots,
} from '.'
import { popoverDefaults } from './constants'

defineOptions({ inheritAttrs: false })
defineSlots<PopoverSlots>()

const props = withDefaults(defineProps<PopoverProps>(), {
  ...popoverDefaults,
  content: undefined,
  arrow: undefined,
})
defineEmits<PopoverEmits>()

const open = defineModel<boolean>('open', { default: popoverDefaults.open })

function close() {
  open.value = false
}

const popoverContext = computed<PopoverContext>(() => ({ open: open.value, close }))

const rootProps = computed(() => {
  return {
    modal: props.modal,
  }
})

const triggerProps = {
  as: 'button' as const,
  asChild: true,
}

const contentProps = computed(() => {
  const { dir: _dir, class: uiClass, ...contentUI } = useUi(props.ui?.content, popoverContext.value)
  void _dir

  return {
    ...contentUI,
    ...popoverDefaults.content,
    ...props.content,
    class: cn(popoverContentVariants(), uiClass),
  }
})

const portalProps = {
  to: 'body',
  forceMount: false,
  defer: undefined,
  disabled: undefined,
}

const arrowProps = computed(() => {
  const { class: uiClass, ...arrowUI } = useUi(props.ui?.arrow, popoverContext.value)

  return {
    ...arrowUI,
    ...popoverDefaults.arrow,
    ...props.arrow,
    class: cn(popoverArrowVariants(), uiClass),
  }
})
</script>

<template>
  <PopoverRoot v-bind="rootProps" v-model:open="open">
    <PopoverTrigger v-bind="triggerProps" data-test-popover-trigger>
      <slot v-bind="popoverContext" />
    </PopoverTrigger>

    <PopoverPortal v-bind="portalProps">
      <PopoverContent v-if="$slots.content" v-bind="contentProps" data-test-popover-content>
        <slot name="content" v-bind="popoverContext" />
        <PopoverArrow v-if="props.showArrow" v-bind="arrowProps" data-test-popover-arrow>
          <path
            :d="arrowProps.rounded ? arrowPaths.rounded : arrowPaths.sharp"
            vector-effect="non-scaling-stroke"
          />
        </PopoverArrow>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
