<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import type { BubbleReactionsProps } from '.'
import { bubbleReactionsDefaults } from './constants'

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<BubbleReactionsProps>(), bubbleReactionsDefaults)
const attrs = useAttrs()
const rootProps = computed(() => ({
  ...attrs,
  class: cn(
    'absolute flex items-center gap-1 rounded-full bg-background px-1 py-0.5 text-xs shadow-sm',
    props.side === 'top' ? '-top-3' : '-bottom-3',
    props.align === 'start' ? 'start-2' : 'end-2',
    attrs.class,
  ),
}))
</script>

<template>
  <div v-bind="rootProps" data-test-bubble-reactions><slot /></div>
</template>
