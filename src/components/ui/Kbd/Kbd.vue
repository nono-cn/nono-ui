<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables'
import { kbdVariants, type KbdProps, type KbdSlots } from '.'
import { kbdDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<KbdProps>(), kbdDefaults)
defineSlots<KbdSlots>()

const attrs = useAttrs()
const { colorStyle, radiusStyle } = useTheme({
  color: () => props.color,
  prefix: 'kbd',
  defaultColor: kbdDefaults.color,
  radius: () => props.radius,
  defaultRadius: kbdDefaults.radius,
})
const rootProps = computed(() => {
  const calculatedVariants = kbdVariants({
    size: props.size,
    variant: props.variant,
  })

  return {
    ...attrs,
    class: cn(calculatedVariants, attrs.class),
    style: [colorStyle.value, radiusStyle.value, attrs.style],
  }
})
</script>

<template>
  <kbd v-bind="rootProps" data-test-kbd-root>
    <slot>{{ props.label }}</slot>
  </kbd>
</template>
