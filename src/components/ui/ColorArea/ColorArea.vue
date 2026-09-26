<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ColorAreaArea, ColorAreaRoot, ColorAreaThumb } from 'reka-ui'
import { colorAreaRootVariants, colorAreaThumbVariants, type ColorAreaValue } from '.'
import { colorAreaDefaults } from './defaults'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const value = defineModel<ColorAreaValue>('value', { default: colorAreaDefaults.value })

const rootProps = computed(() => ({
  ...attrs,
  class: cn(colorAreaRootVariants(), attrs.class),
  style: attrs.style,
}))

const areaProps = computed(() => ({
  class: 'size-full',
}))

const thumbProps = computed(() => ({
  class: colorAreaThumbVariants(),
}))
</script>

<template>
  <ColorAreaRoot v-slot="{ style }" v-model="value" v-bind="rootProps" data-test-color-area-root>
    <ColorAreaArea v-bind="areaProps" :style="style" data-test-color-area-area>
      <ColorAreaThumb v-bind="thumbProps" data-test-color-area-thumb />
    </ColorAreaArea>
  </ColorAreaRoot>
</template>
