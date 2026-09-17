<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch,
} from 'vue'
import { cn } from '@/lib/utils'
import { masonryDefaults } from './defaults'
import type { MasonryProps, MasonrySlots } from './index'

defineOptions({ inheritAttrs: false })
defineSlots<MasonrySlots>()

const props = withDefaults(defineProps<MasonryProps>(), masonryDefaults)
const attrs = useAttrs()
const slots = useSlots()
const root = ref<HTMLElement>()
const itemElements = new Map<string, HTMLElement>()
const heights = ref(new Map<string, number>())
const viewportWidth = ref(typeof window === 'undefined' ? 0 : window.innerWidth)
let resizeObserver: ResizeObserver | undefined

function updateViewportWidth() {
  viewportWidth.value = window.innerWidth
}

const columnCount = computed(() => {
  const configured = props.columns
  if (typeof configured === 'number') return Math.max(1, Math.floor(configured || 1))

  const width = viewportWidth.value
  const value =
    width >= 1024
      ? (configured.lg ?? configured.md ?? configured.sm)
      : width >= 768
        ? (configured.md ?? configured.sm ?? configured.lg)
        : width >= 640
          ? (configured.sm ?? configured.md ?? configured.lg)
          : (configured.md ?? configured.sm ?? configured.lg)

  return Math.max(1, Math.floor(value || 1))
})
const gap = computed(() => {
  const value =
    typeof props.spacing === 'number' ? props.spacing : Number.parseFloat(props.spacing) || 0
  return `${Math.max(0, value) * 0.25}rem`
})

const MasonryItem = defineComponent({
  props: {
    item: { required: true },
    index: { type: Number, required: true },
  },
  setup(itemProps, { slots: itemSlots }) {
    return () =>
      itemSlots.default?.({ item: itemProps.item, index: itemProps.index }) ??
      h('div', String(itemProps.item))
  },
})

const sourceItems = computed(() => {
  return props.items.map((item, index) => ({ key: `item-${index}`, item, index }))
})

const columns = computed(() => {
  const result: Array<Array<{ key: string; item: unknown; index: number }>> = Array.from(
    { length: columnCount.value },
    () => [],
  )
  const totals = Array(columnCount.value).fill(0) as number[]

  sourceItems.value.forEach((item, index) => {
    const target = props.sequential
      ? index % columnCount.value
      : totals.indexOf(Math.min(...totals))
    result[target].push(item)
    totals[target] += heights.value.get(item.key) ?? 1
  })

  return result
})

function setItemElement(key: string, element: Element | null) {
  if (element instanceof HTMLElement) itemElements.set(key, element)
  else itemElements.delete(key)
}

function measure() {
  const next = new Map<string, number>()
  itemElements.forEach((element, key) => next.set(key, element.getBoundingClientRect().height))
  heights.value = next
}

function itemProps(key: string) {
  return {
    ref: (element: Element | null) => setItemElement(key, element),
    class: 'min-w-0',
  }
}

function columnProps() {
  return {
    class: 'flex min-w-0 flex-1 flex-col',
    style: { gap: gap.value },
  }
}

const rootProps = computed(() => ({
  ...attrs,
  ref: root,
  class: cn('flex w-full items-start', attrs.class),
  style: [{ gap: gap.value }, attrs.style],
  'data-test-masonry-root': true,
}))

watch([sourceItems, () => props.columns, () => props.sequential], async () => {
  await nextTick()
  measure()
})

onMounted(() => {
  window.addEventListener('resize', updateViewportWidth)
  measure()
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(measure)
    if (root.value) resizeObserver.observe(root.value)
    itemElements.forEach((element) => resizeObserver?.observe(element))
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updateViewportWidth)
})
</script>

<template>
  <div v-if="props.items.length > 0" v-bind="rootProps">
    <div v-for="(column, columnIndex) in columns" :key="columnIndex" v-bind="columnProps()">
      <div v-for="item in column" :key="item.key" v-bind="itemProps(item.key)">
        <MasonryItem v-if="slots.default" :item="item.item" :index="item.index">
          <template #default="slotProps">
            <slot v-bind="slotProps" />
          </template>
        </MasonryItem>
        <MasonryItem v-else :item="item.item" :index="item.index" />
      </div>
    </div>
  </div>
</template>
