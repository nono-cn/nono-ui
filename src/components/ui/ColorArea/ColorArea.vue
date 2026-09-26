<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ColorAreaArea, ColorAreaRoot, ColorAreaThumb, type Color } from 'reka-ui'
import {
  colorAreaRootVariants,
  colorAreaThumbVariants,
  type ColorAreaProps,
  type ColorAreaValue,
} from '.'
import { colorAreaDefaults } from './defaults'
import { cn } from '@/lib/utils'
import { useUi } from '@/composables/useUi'
import { useI18n } from '@/i18n'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const props = withDefaults(defineProps<ColorAreaProps>(), colorAreaDefaults)
const value = defineModel<ColorAreaValue>('value', { default: colorAreaDefaults.value })
const emit = defineEmits<{
  change: [value: string]
  changeEnd: [value: string]
  'update:color': [value: Color]
}>()
const { t } = useI18n()

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
  class: cn(colorAreaRootVariants({ size: props.size, rounded: props.rounded }), attrs.class),
  style: attrs.style,
}))

const areaProps = computed(() => {
  const ui = useUi(props.ui?.area, undefined)

  return {
    ...ui,
    'aria-roledescription': t('colorAreaRoleDescription'),
    class: cn('size-full', ui.class),
    style: ui.style,
  }
})

const thumbProps = computed(() => {
  const ui = useUi(props.ui?.thumb, undefined)

  return {
    ...ui,
    'aria-roledescription': t('colorAreaThumbRoleDescription'),
    class: cn(colorAreaThumbVariants(), ui.class),
    style: ui.style,
  }
})
</script>

<template>
  <ColorAreaRoot
    v-slot="{ style }"
    v-model="value"
    v-bind="rootProps"
    data-test-color-area-root
    @change="emit('change', $event)"
    @change-end="emit('changeEnd', $event)"
    @update:color="emit('update:color', $event)"
  >
    <ColorAreaArea v-bind="areaProps" :style="[style, areaProps.style]" data-test-color-area-area>
      <ColorAreaThumb v-bind="thumbProps" data-test-color-area-thumb />
    </ColorAreaArea>
  </ColorAreaRoot>
</template>
