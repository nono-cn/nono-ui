<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/Icon'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables'
import {
  badgeIconVariants,
  badgeLeadingVariants,
  badgeTrailingVariants,
  badgeVariants,
  type BadgeProps,
  type BadgeSlots,
} from '.'
import { badgeDefaults, badgeSizes, badgeVariantNames } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BadgeProps>(), badgeDefaults)
const slots = defineSlots<BadgeSlots>()

const attrs = useAttrs()
const { colorStyle, radiusStyle } = useTheme({
  color: () => props.color,
  prefix: 'badge',
  defaultColor: badgeDefaults.color,
  radius: () => props.radius,
  defaultRadius: badgeDefaults.radius,
})
const size = computed(() =>
  (badgeSizes as readonly unknown[]).includes(props.size) ? props.size : badgeDefaults.size,
)
const variant = computed(() =>
  (badgeVariantNames as readonly unknown[]).includes(props.variant)
    ? props.variant
    : badgeDefaults.variant,
)

const rootProps = computed(() => {
  const calculatedVariants = badgeVariants({
    size: size.value,
    variant: variant.value,
  })

  return {
    ...attrs,
    class: cn(calculatedVariants, attrs.class),
    style: [colorStyle.value, radiusStyle.value, attrs.style],
  }
})

const leadingProps = computed(() => {
  return {
    class: badgeLeadingVariants({ size: size.value }),
  }
})

const trailingProps = computed(() => {
  return {
    class: badgeTrailingVariants({ size: size.value }),
  }
})

const iconProps = {
  class: badgeIconVariants(),
}
</script>

<template>
  <span v-bind="rootProps" data-test-badge-root>
    <span v-if="props.icon || slots.leading" v-bind="leadingProps" data-test-badge-leading>
      <slot name="leading">
        <Icon v-if="props.icon" :name="props.icon" v-bind="iconProps" data-test-badge-icon />
      </slot>
    </span>

    <slot>{{ props.label }}</slot>

    <span
      v-if="props.trailingIcon || slots.trailing"
      v-bind="trailingProps"
      data-test-badge-trailing
    >
      <slot name="trailing">
        <Icon
          v-if="props.trailingIcon"
          :name="props.trailingIcon"
          v-bind="iconProps"
          data-test-badge-trailing-icon
        />
      </slot>
    </span>
  </span>
</template>
