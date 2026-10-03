<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { useTheme } from '@/composables'
import { cn } from '@/lib/utils'
import { iconTileVariants, type IconTileProps } from '.'
import { iconTileDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<IconTileProps>(), iconTileDefaults)

const attrs = useAttrs()
const { colorStyle, radiusStyle } = useTheme({
  color: () => props.color,
  prefix: 'icon-tile',
  defaultColor: iconTileDefaults.color,
  radius: () => props.radius,
  defaultRadius: iconTileDefaults.radius,
})
const rootProps = computed(() => ({
  ...attrs,
  class: cn(
    iconTileVariants({
      variant: props.variant,
      size: props.size,
    }),
    attrs.class,
  ),
  style: [colorStyle.value, radiusStyle.value, attrs.style],
}))
</script>

<template>
  <div v-bind="rootProps" data-test-icon-tile-root>
    <Icon :name="props.icon" class="relative z-10" data-test-icon-tile-icon />
  </div>
</template>
