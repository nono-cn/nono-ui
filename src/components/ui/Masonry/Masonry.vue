<script setup lang="ts">
import {
  computed,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch,
} from 'vue'
import type { VNode } from 'vue'
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
let resizeObserver: ResizeObserver | undefined

const columnCount = computed(() => Math.max(1, Math.floor(Number(props.columns) || 1)))
const gap = computed(() => {
  const value =
    typeof props.spacing === 'number' ? props.spacing : Number.parseFloat(props.spacing) || 0
  return `${Math.max(0, value) * 0.25}rem`
})

const sourceItems = computed(() => {
  return props.items.flatMap((item, index) => {
    const content = slots.default?.({ item, index }) ?? [h('div', String(item))]
    return [{ key: `item-${index}`, content }]
  })
})

const columns = computed(() => {
  const result: Array<Array<{ key: string; content: VNode[] }>> = Array.from(
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
  measure()
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(measure)
    if (root.value) resizeObserver.observe(root.value)
    itemElements.forEach((element) => resizeObserver?.observe(element))
  }
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <div v-if="props.items.length > 0" v-bind="rootProps">
    <div v-for="(column, columnIndex) in columns" :key="columnIndex" v-bind="columnProps()">
      <div v-for="item in column" :key="item.key" v-bind="itemProps(item.key)">
        <component
          :is="content"
          v-for="(content, contentIndex) in item.content"
          :key="contentIndex"
        />
      </div>
    </div>
  </div>
</template>
