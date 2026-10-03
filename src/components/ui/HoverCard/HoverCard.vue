<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
} from 'reka-ui'
import { useContent } from '@/composables/useContent'
import { useArrow } from '@/composables/useArrow'
import { cn } from '@/lib/utils'
import {
  hoverCardArrowVariants,
  hoverCardContentVariants,
  hoverCardRootVariants,
  type HoverCardArrowConfig,
  type HoverCardContext,
  type HoverCardEmits,
  type HoverCardProps,
  type HoverCardSlots,
} from '.'
import { hoverCardDefaults } from './constants'

defineOptions({ inheritAttrs: false })
defineSlots<HoverCardSlots>()

const props = withDefaults(defineProps<HoverCardProps>(), hoverCardDefaults)
defineEmits<HoverCardEmits>()

const attrs = useAttrs()
const portalTarget = ref<HTMLElement>()
const open = defineModel<boolean>('open', { default: false })

function close() {
  open.value = false
}

const hoverCardContext = computed<HoverCardContext>(() => ({ open: open.value, close }))

const rootAttrs = computed(() => ({
  ...attrs,
  class: cn(hoverCardRootVariants(), attrs.class),
}))

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

const contentProps = useContent(
  computed(() => props.content),
  {
    class: hoverCardContentVariants(),
  },
)

const portalProps = computed(() => ({
  to: portalTarget.value,
  forceMount: false,
  defer: undefined,
  disabled: undefined,
}))

const arrowConfig = computed<HoverCardArrowConfig>(() => ({
  ...props.arrow,
  class: cn(hoverCardArrowVariants(), props.arrow?.class),
}))

const arrowProps = useArrow(arrowConfig)
</script>

<template>
  <div v-bind="rootAttrs" data-test-hover-card-root>
    <HoverCardRoot v-bind="rootProps" v-model:open="open">
      <HoverCardTrigger v-bind="triggerProps" data-test-hover-card-trigger>
        <slot v-bind="hoverCardContext" />
      </HoverCardTrigger>

      <HoverCardPortal v-bind="portalProps">
        <HoverCardContent v-if="$slots.content" v-bind="contentProps" data-test-hover-card-content>
          <slot name="content" v-bind="hoverCardContext" />
          <HoverCardArrow v-if="props.showArrow" v-bind="arrowProps" data-test-hover-card-arrow />
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>
    <div ref="portalTarget" data-test-hover-card-portal-target />
  </div>
</template>
