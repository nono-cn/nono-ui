<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { masonryDefaults } from './constants'
import { masonryColumnVariants, masonryItemVariants, masonryVariants } from './index'
import type { MasonryItem, MasonryProps, MasonrySlots } from './index'

defineOptions({ inheritAttrs: false })
defineSlots<MasonrySlots>()

const props = withDefaults(defineProps<MasonryProps>(), masonryDefaults)
const attrs = useAttrs()
const viewportWidth = ref(typeof window === 'undefined' ? 0 : window.innerWidth)

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

const sourceItems = computed(() => {
  return props.items.map((item, index) => ({ key: `item-${index}`, item, index }))
})

const columns = computed(() => {
  const result: Array<Array<{ key: string; item: MasonryItem; index: number }>> = Array.from(
    { length: columnCount.value },
    () => [],
  )
  const totals = Array(columnCount.value).fill(0) as number[]

  sourceItems.value.forEach((item, index) => {
    const target = props.sequential
      ? index % columnCount.value
      : totals.indexOf(Math.min(...totals))
    result[target].push(item)
    totals[target] += item.item.height
  })

  return result
})

function itemProps(height: number) {
  return {
    class: masonryItemVariants(),
    style: { height: `${height}px` },
    'data-test-masonry-item': true,
  }
}

function columnProps() {
  return {
    class: masonryColumnVariants(),
    style: { gap: gap.value },
    'data-test-masonry-column': true,
  }
}

const rootProps = computed(() => ({
  ...attrs,
  class: cn(masonryVariants(), attrs.class),
  style: [{ gap: gap.value }, attrs.style],
  'data-test-masonry-root': true,
}))

onMounted(() => {
  window.addEventListener('resize', updateViewportWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewportWidth)
})
</script>

<template>
  <div v-if="props.items.length > 0" v-bind="rootProps">
    <div v-for="(column, columnIndex) in columns" :key="columnIndex" v-bind="columnProps()">
      <div v-for="entry in column" :key="entry.key" v-bind="itemProps(entry.item.height)">
        <slot v-if="$slots.default" :item="entry.item" :index="entry.index" />
        <div v-else>{{ String(entry.item) }}</div>
      </div>
    </div>
  </div>
</template>
