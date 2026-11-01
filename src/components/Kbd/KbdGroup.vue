<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { kbdGroupVariants, type KbdGroupSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<KbdGroupSlots>()

const attrs = useAttrs()
const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(kbdGroupVariants(), attrs.class),
    style: attrs.style,
  }
})
</script>

<template>
  <kbd v-bind="rootProps" data-test-kbd-group-root>
    <slot />
  </kbd>
</template>
