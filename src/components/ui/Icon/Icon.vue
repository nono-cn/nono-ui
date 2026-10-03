<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ICONS } from '@/assets/icon/icons'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables'
import { iconVariants, type IconProps } from '.'
import { iconDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<IconProps>(), iconDefaults)

const attrs = useAttrs()
const icon = computed(() => ICONS[props.name])
const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'icon',
  defaultColor: 'primary',
})

const rootProps = computed(() => {
  return {
    'aria-hidden': true,
    ...attrs,
    'stroke-width': props.stroke,
    class: cn(iconVariants({ size: props.size }), attrs.class),
    style: [
      props.color === 'currentColor'
        ? { color: 'currentColor' }
        : [colorStyle.value, { color: 'var(--icon-color)' }],
      attrs.style,
    ],
  }
})
</script>

<template>
  <component v-bind="rootProps" :is="icon" data-test-icon-root />
</template>
