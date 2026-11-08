<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { AspectRatio as AspectRatioRoot } from 'reka-ui'
import { type AspectRatioProps, type AspectRatioSlots } from '.'
import { aspectRatioDefaults } from './constants'

defineOptions({ inheritAttrs: false })

defineSlots<AspectRatioSlots>()

const props = withDefaults(defineProps<AspectRatioProps>(), aspectRatioDefaults)
const attrs = useAttrs()

const ratio = computed(() =>
  typeof props.ratio === 'number' && Number.isFinite(props.ratio) && props.ratio > 0
    ? props.ratio
    : aspectRatioDefaults.ratio,
)

const rootProps = computed(() => {
  return {
    ...attrs,
    ratio: ratio.value,
  }
})
</script>

<template>
  <AspectRatioRoot v-bind="rootProps" data-test-aspect-ratio-root>
    <slot />
  </AspectRatioRoot>
</template>
