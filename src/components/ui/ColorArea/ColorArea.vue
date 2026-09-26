<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ColorAreaArea, ColorAreaRoot, ColorAreaThumb } from 'reka-ui'
import {
  colorAreaRootVariants,
  colorAreaThumbVariants,
  type ColorAreaProps,
  type ColorAreaValue,
} from '.'
import { colorAreaDefaults } from './defaults'
import { cn } from '@/lib/utils'
import { useUi } from '@/composables/useUi'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const props = withDefaults(defineProps<ColorAreaProps>(), colorAreaDefaults)
const value = defineModel<ColorAreaValue>('value', { default: colorAreaDefaults.value })

const rootProps = computed(() => ({
  ...attrs,
  as: 'div' as const,
  asChild: false,
  colorSpace: props.colorSpace,
  xChannel: props.xChannel,
  yChannel: props.yChannel,
  disabled: props.disabled,
  required: props.required,
  xName: props.xName,
  yName: props.yName,
  class: cn(colorAreaRootVariants(), attrs.class),
  style: attrs.style,
}))

const areaProps = computed(() => {
  const ui = useUi(props.ui?.area, undefined)

  return {
    ...ui,
    class: cn('size-full', ui.class),
    style: ui.style,
  }
})

const thumbProps = computed(() => {
  const ui = useUi(props.ui?.thumb, undefined)

  return {
    ...ui,
    class: cn(colorAreaThumbVariants(), ui.class),
    style: ui.style,
  }
})
</script>

<template>
  <ColorAreaRoot v-slot="{ style }" v-model="value" v-bind="rootProps" data-test-color-area-root>
    <ColorAreaArea v-bind="areaProps" :style="[style, areaProps.style]" data-test-color-area-area>
      <ColorAreaThumb v-bind="thumbProps" data-test-color-area-thumb />
    </ColorAreaArea>
  </ColorAreaRoot>
</template>
