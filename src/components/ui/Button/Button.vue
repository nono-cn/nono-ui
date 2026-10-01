<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue'
import { Primitive } from 'reka-ui'
import { Icon, type IconSize } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables'
import { buttonVariants, type ButtonEmits, type ButtonProps, type ButtonSlots } from '.'
import { buttonDefaults } from './constants'
import { buttonGroupSizeKey } from '@/components/ui/ButtonGroup'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonProps>(), { ...buttonDefaults, size: undefined })
const emit = defineEmits<ButtonEmits>()
defineSlots<ButtonSlots>()

const attrs = useAttrs()
const groupSize = inject(buttonGroupSizeKey, undefined)
const size = computed(() => props.size ?? groupSize?.value ?? buttonDefaults.size)
const { colorStyle, radiusStyle } = useTheme({
  color: () => props.color,
  prefix: 'button',
  defaultColor: buttonDefaults.color,
  radius: () => props.radius,
  defaultRadius: buttonDefaults.radius,
})
const ariaDisabled = computed(() => props.loading || attrs['aria-disabled'])
const ariaBusy = computed(() => props.loading || attrs['aria-busy'])
const iconSize = computed<IconSize>(() => {
  if (size.value === 'icon') return 'md'
  return size.value.startsWith('icon-') ? (size.value.slice(5) as IconSize) : size.value
})
const calculatedVariants = computed(() => {
  const classes = buttonVariants({
    variant: props.variant,
    size: size.value,
  })

  if (props.as === 'button' || props.as === 'a') return classes

  return classes
    .split(/\s+/)
    .filter((className) => !className.startsWith('hover:') && !className.startsWith('active:'))
    .join(' ')
})

const rootProps = computed(() => {
  return {
    ...attrs,
    as: props.as ?? buttonDefaults.as,
    asChild: props.asChild ?? buttonDefaults.asChild,
    'aria-busy': ariaBusy.value,
    'aria-disabled': ariaDisabled.value,
    class: cn(calculatedVariants.value, attrs.class),
    style: [colorStyle.value, radiusStyle.value, attrs.style],
  }
})

const loadingIconProps = computed(() => {
  return {
    name: 'spinner' as const,
    size: iconSize.value,
    class: 'animate-spin',
  }
})

function handleClick(event: PointerEvent) {
  if (ariaDisabled.value === true || ariaDisabled.value === 'true') {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  emit('click', event)
}
</script>

<template>
  <Primitive v-bind="rootProps" data-button-ui="root" data-test-button-root @click="handleClick">
    <slot v-if="props.asChild" />
    <template v-else>
      <template v-if="props.loading">
        <slot name="loading">
          <Icon v-bind="loadingIconProps" data-test-button-loading-icon />
        </slot>
      </template>
      <template v-else>
        <slot name="leading">
          <Icon v-if="props.icon" :name="props.icon" :size="iconSize" data-test-button-icon />
        </slot>
      </template>

      <slot>{{ props.label }}</slot>

      <slot name="trailing">
        <Icon
          v-if="props.trailingIcon"
          :name="props.trailingIcon"
          :size="iconSize"
          data-test-button-trailing-icon
        />
      </slot>
    </template>
  </Primitive>
</template>
