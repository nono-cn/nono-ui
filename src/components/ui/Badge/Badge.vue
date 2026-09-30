<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables'
import { badgeVariants, type BadgeProps, type BadgeSlots } from '.'
import { badgeDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BadgeProps>(), badgeDefaults)
defineSlots<BadgeSlots>()

const attrs = useAttrs()
const { colorStyle, radiusStyle } = useTheme({
  color: () => props.color,
  prefix: 'badge',
  defaultColor: badgeDefaults.color,
  radius: () => props.radius,
  defaultRadius: badgeDefaults.radius,
})
const rootProps = computed(() => {
  const calculatedVariants = badgeVariants({
    size: props.size,
    variant: props.variant,
  })

  return {
    ...attrs,
    class: cn(calculatedVariants, attrs.class),
    style: [colorStyle.value, radiusStyle.value, attrs.style],
  }
})

const iconProps = computed(() => {
  if (!props.icon) return undefined

  return { name: props.icon, size: props.size }
})
const trailingIconProps = computed(() => {
  if (!props.trailingIcon) return undefined

  return { name: props.trailingIcon, size: props.size }
})
</script>

<template>
  <span v-bind="rootProps" data-test-badge-root>
    <slot name="leading">
      <Icon v-if="iconProps?.name" v-bind="iconProps" data-test-badge-icon />
    </slot>

    <slot>{{ props.label }}</slot>

    <slot name="trailing">
      <Icon
        v-if="trailingIconProps?.name"
        v-bind="trailingIconProps"
        data-test-badge-trailing-icon
      />
    </slot>
  </span>
</template>
