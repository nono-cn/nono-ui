<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type {
  SplitterEmits,
  SplitterItem,
  SplitterItemContext,
  SplitterProps,
  SplitterSlots,
} from '.'
import { splitterDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SplitterProps>(), splitterDefaults)
const emit = defineEmits<SplitterEmits>()
defineSlots<SplitterSlots>()

const attrs = useAttrs()
const layout = ref<number[]>([])

const itemContexts = computed<SplitterItemContext[]>(() =>
  props.items.map((item, index) => ({
    layout: layout.value,
    item,
    index,
    first: index === 0,
    last: index === props.items.length - 1,
    nextItem: props.items[index + 1],
  })),
)

const rootProps = computed(() => {
  return {
    ...attrs,
    id: props.id,
    autoSaveId: props.autoSaveId,
    direction: props.direction,
    keyboardResizeBy: props.keyboardResizeBy,
    storage: props.storage,
    class: cn('flex h-full w-full data-[orientation=vertical]:flex-col', attrs.class),
    style: attrs.style,
  }
})

function getPanelProps(context: SplitterItemContext) {
  const ui = useUi(props.ui?.panel, context)

  return {
    id: context.item.id,
    collapsedSize: context.item.collapsedSize,
    collapsible: context.item.collapsible,
    defaultSize: context.item.defaultSize,
    maxSize: context.item.maxSize,
    minSize: context.item.minSize,
    order: context.item.order,
    sizeUnit: context.item.sizeUnit,
    ...ui,
    class: cn('min-h-0 min-w-0 overflow-auto', context.item.class, ui.class),
    style: [context.item.style, ui.style],
  }
}

function getResizeHandleProps(context: SplitterItemContext) {
  const ui = useUi(props.ui?.resizeHandle, context)

  return {
    hitAreaMargins: props.hitAreaMargins,
    tabindex: props.tabindex,
    disabled: props.disabled,
    nonce: props.nonce,
    ...ui,
    class: cn(
      'relative z-10 flex w-px shrink-0 touch-none items-center justify-center bg-transparent select-none after:absolute after:inset-y-0 after:start-1/2 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-border after:shadow-sm after:transition-colors hover:after:bg-foreground/40 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none focus-visible:after:bg-foreground/60 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:inset-x-0 data-[orientation=vertical]:after:inset-y-1/2 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-x-0 data-[orientation=vertical]:after:-translate-y-1/2',
      ui.class,
    ),
    style: ui.style,
  }
}

function handleLayout(nextLayout: number[]) {
  layout.value = nextLayout
  emit('layout', nextLayout)
}

function handleCollapse() {
  emit('collapse')
}

function handleExpand() {
  emit('expand')
}

function handleResize(size: number, previousSize: number | undefined) {
  emit('resize', size, previousSize)
}

function getPanelKey(item: SplitterItem, index: number) {
  return item.id ?? `panel-${index}`
}

function getPanelSlotName(slot?: string) {
  return slot ? `panel-${slot}` : 'default'
}

function getHandleSlotName(slot?: string) {
  return slot ? `handle-${slot}` : 'handle'
}
</script>

<template>
  <SplitterGroup v-bind="rootProps" data-test-splitter-root @layout="handleLayout">
    <template v-for="context in itemContexts" :key="getPanelKey(context.item, context.index)">
      <SplitterPanel
        v-bind="getPanelProps(context)"
        data-test-splitter-panel
        @collapse="handleCollapse"
        @expand="handleExpand"
        @resize="(size, previousSize) => handleResize(size, previousSize)"
      >
        <template #default="{ isCollapsed, isExpanded }">
          <slot
            :name="getPanelSlotName(context.item.slot)"
            v-bind="{ isCollapsed, isExpanded, ...context }"
          />
        </template>
      </SplitterPanel>

      <SplitterResizeHandle
        v-if="!context.last"
        v-bind="getResizeHandleProps(context)"
        data-test-splitter-resize-handle
      >
        <slot :name="getHandleSlotName(context.item.slot)" v-bind="context" />
      </SplitterResizeHandle>
    </template>
  </SplitterGroup>
</template>
