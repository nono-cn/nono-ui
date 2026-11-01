<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { ScrollAreaProps, ScrollAreaSlots } from '.'
import { scrollAreaDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

defineSlots<ScrollAreaSlots>()

const props = withDefaults(defineProps<ScrollAreaProps>(), scrollAreaDefaults)

const attrs = useAttrs()
const rootProps = computed(() => {
  const { as: _as, asChild: _asChild, dir: _dir, ...rootAttrs } = attrs
  void _as
  void _asChild
  void _dir

  return {
    ...rootAttrs,
    type: props.type,
    scrollHideDelay: props.scrollHideDelay,
    class: cn('relative', attrs.class),
    style: attrs.style,
  }
})

const viewportProps = computed(() => {
  const viewportUI = useUi(props.ui?.viewport, undefined)

  return {
    ...viewportUI,
    class: cn(
      'size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1',
      viewportUI.class,
    ),
  }
})

const verticalScrollbarProps = computed(() => {
  const verticalScrollbarUI = useUi(props.ui?.verticalScrollbar, undefined)

  return {
    ...verticalScrollbarUI,
    orientation: 'vertical' as const,
    forceMount: props.forceMount,
    class: cn(
      'flex touch-none p-px transition-colors select-none h-full w-2.5 border-l border-l-transparent',
      verticalScrollbarUI.class,
    ),
  }
})

const thumbVerticalProps = computed(() => {
  const thumbVerticalUI = useUi(props.ui?.thumbVertical, undefined)

  return {
    ...thumbVerticalUI,
    class: cn('relative flex-1 rounded-full bg-border', thumbVerticalUI.class),
  }
})

const horizontalScrollbarProps = computed(() => {
  const horizontalScrollbarUI = useUi(props.ui?.horizontalScrollbar, undefined)

  return {
    ...horizontalScrollbarUI,
    orientation: 'horizontal' as const,
    forceMount: props.forceMount,
    class: cn(
      'flex touch-none p-px transition-colors select-none h-2.5 flex-col border-t border-t-transparent',
      horizontalScrollbarUI.class,
    ),
  }
})

const thumbHorizontalProps = computed(() => {
  const thumbHorizontalUI = useUi(props.ui?.thumbHorizontal, undefined)

  return {
    ...thumbHorizontalUI,
    class: cn('relative flex-1 rounded-full bg-border', thumbHorizontalUI.class),
  }
})

const cornerProps = computed(() => {
  const cornerUI = useUi(props.ui?.corner, undefined)

  return {
    ...cornerUI,
    class: cn('bg-border', cornerUI.class),
  }
})
</script>

<template>
  <ScrollAreaRoot v-bind="rootProps" data-test-scroll-area-root>
    <ScrollAreaViewport v-bind="viewportProps" data-test-scroll-area-viewport>
      <slot />
    </ScrollAreaViewport>

    <ScrollAreaScrollbar
      v-if="props.orientation === 'vertical' || props.orientation === 'both'"
      v-bind="verticalScrollbarProps"
      data-test-scroll-area-vertical-scrollbar
    >
      <ScrollAreaThumb v-bind="thumbVerticalProps" data-test-scroll-area-vertical-thumb />
    </ScrollAreaScrollbar>

    <ScrollAreaScrollbar
      v-if="props.orientation === 'horizontal' || props.orientation === 'both'"
      v-bind="horizontalScrollbarProps"
      data-test-scroll-area-horizontal-scrollbar
    >
      <ScrollAreaThumb v-bind="thumbHorizontalProps" data-test-scroll-area-horizontal-thumb />
    </ScrollAreaScrollbar>

    <ScrollAreaCorner
      v-if="props.orientation === 'both'"
      v-bind="cornerProps"
      data-test-scroll-area-corner
    />
  </ScrollAreaRoot>
</template>
