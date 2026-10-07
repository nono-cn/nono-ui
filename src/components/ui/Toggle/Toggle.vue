<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Toggle } from 'reka-ui'
import { Icon, type IconSize } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables'
import {
  createToggleContext,
  toggleVariants,
  type ToggleProps,
  type ToggleSlots,
  type ToggleValue,
} from '.'
import { toggleDefaults, toggleSizes, toggleVariantNames } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ToggleProps>(), toggleDefaults)
defineSlots<ToggleSlots>()

const attrs = useAttrs()
const modelValue = defineModel<ToggleValue>({ default: toggleDefaults.modelValue })
const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'toggle',
  defaultColor: toggleDefaults.color,
})

const toggleContext = computed(() => createToggleContext(modelValue.value))
const variant = computed(() =>
  toggleVariantNames.includes(props.variant) ? props.variant : toggleDefaults.variant,
)
const size = computed(() => (toggleSizes.includes(props.size) ? props.size : toggleDefaults.size))
const iconSize = computed<IconSize>(() => {
  switch (size.value) {
    case 'icon-xs':
      return 'xs'
    case 'icon-sm':
      return 'sm'
    case 'icon':
      return 'md'
    case 'icon-lg':
      return 'lg'
    case 'icon-xl':
      return 'xl'
    default:
      return size.value
  }
})

const rootProps = computed(() => {
  const calculatedVariants = toggleVariants({
    variant: variant.value,
    size: size.value,
  })
  return {
    ...attrs,
    as: 'button' as const,
    disabled: props.disabled,
    name: props.name,
    asChild: false,
    class: cn(calculatedVariants, attrs.class),
    style: [colorStyle.value, attrs.style],
  }
})
</script>

<template>
  <Toggle v-bind="rootProps" v-model="modelValue" data-test-toggle-root>
    <div v-if="$slots.leading || props.icon" data-test-toggle-slot-leading>
      <slot name="leading" v-bind="toggleContext">
        <Icon
          v-if="props.icon"
          :name="props.icon"
          :size="iconSize"
          data-test-toggle-icon
        />
      </slot>
    </div>

    <div v-if="$slots.default || props.label" data-test-toggle-slot-default>
      <slot v-if="$slots.default || props.label" v-bind="toggleContext">{{ props.label }}</slot>
    </div>
    <div v-if="$slots.trailing || props.trailingIcon" data-test-toggle-slot-trailing>
      <slot name="trailing" v-bind="toggleContext">
        <Icon
          v-if="props.trailingIcon"
          :name="props.trailingIcon"
          :size="iconSize"
          data-test-toggle-trailing-icon
        />
      </slot>
    </div>
  </Toggle>
</template>
