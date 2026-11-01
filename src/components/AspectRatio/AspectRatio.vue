<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { AspectRatio as AspectRatioRoot } from 'reka-ui'
import { cn } from '@/lib/utils'
import { type AspectRatioProps, type AspectRatioSlots } from '.'
import { aspectRatioDefaults } from './constants'

defineOptions({ inheritAttrs: false })

defineSlots<AspectRatioSlots>()

const props = withDefaults(defineProps<AspectRatioProps>(), aspectRatioDefaults)
const attrs = useAttrs()

const rootProps = computed(() => {
  return {
    ...attrs,
    ratio: props.ratio,
    class: cn('relative w-full', attrs.class),
    style: attrs.style,
  }
})
</script>

<template>
  <AspectRatioRoot v-bind="rootProps" data-test-aspect-ratio-root>
    <slot />
  </AspectRatioRoot>
</template>
