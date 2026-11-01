<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import type { SearchSlots } from '.'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
defineSlots<SearchSlots>()

const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(attrs.class),
    style: attrs.style,
  }
})
</script>

<template>
  <form v-bind="rootProps" data-slot="search" data-test-search-root role="search">
    <slot />
  </form>
</template>
