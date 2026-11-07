<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables'
import { kbdVariants, type KbdProps, type KbdSlots } from '.'
import { kbdDefaults, kbdSizes, kbdVariantNames } from './constants'

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
const size = computed(() =>
  (kbdSizes as readonly unknown[]).includes(props.size) ? props.size : kbdDefaults.size,
)
const variant = computed(() =>
  (kbdVariantNames as readonly unknown[]).includes(props.variant)
    ? props.variant
    : kbdDefaults.variant,
)
const rootProps = computed(() => {
  const calculatedVariants = kbdVariants({
    size: size.value,
    variant: variant.value,
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
