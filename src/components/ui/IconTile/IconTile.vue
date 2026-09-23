<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { useColor } from '@/composables'
import { cn } from '@/lib/utils'
import { iconTileVariants, type IconTileProps } from '.'
import { iconTileDefaults } from './default'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<IconTileProps>(), iconTileDefaults)

const attrs = useAttrs()
const { colorStyle } = useColor(
  computed(() => props.color),
  'icon-tile',
)
const rootProps = computed(() => ({
  ...attrs,
  class: cn(
    iconTileVariants({
      variant: props.variant,
      size: props.size,
      shape: props.shape,
      severity: props.severity,
      color: Boolean(props.color),
    }),
    attrs.class,
  ),
  style: [colorStyle.value, attrs.style],
}))
</script>

<template>
  <div v-bind="rootProps" data-test-icon-tile-root>
    <Icon :name="props.iconName" class="relative z-10" data-test-icon-tile-icon />
  </div>
</template>
