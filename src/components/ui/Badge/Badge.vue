<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { badgeVariants, type BadgeProps, type BadgeSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BadgeProps>(), {
  label: undefined,
  size: 'md',
  variant: 'solid',
  severity: 'primary',
  color: undefined,
  icon: undefined,
  trailingIcon: undefined,
})
defineSlots<BadgeSlots>()

const attrs = useAttrs()
const { colorStyle } = useColor(
  computed(() => props.color),
  'badge',
)
const rootProps = computed(() => {
  const calculatedVariants = badgeVariants({
    size: props.size,
    variant: props.variant,
    severity: props.severity,
    color: Boolean(props.color),
  })

  return {
    ...attrs,
    class: cn(calculatedVariants, attrs.class),
    style: [colorStyle.value, attrs.style],
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
