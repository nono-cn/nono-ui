<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Primitive } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables'
import { buttonVariants, type ButtonEmits, type ButtonProps, type ButtonSlots } from '.'
import { buttonDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonProps>(), buttonDefaults)
const emit = defineEmits<ButtonEmits>()
defineSlots<ButtonSlots>()

const attrs = useAttrs()
const { colorStyle, radiusStyle, shadowStyle } = useTheme({
  color: () => props.color,
  radius: () => props.radius,
  shadow: () => props.shadow,
  prefix: 'button',
  defaultColor: buttonDefaults.color,
  defaultRadius: buttonDefaults.radius,
  defaultShadow: buttonDefaults.shadow,
})
const ariaDisabled = computed(() => props.loading || attrs['aria-disabled'])
const ariaBusy = computed(() => props.loading || attrs['aria-busy'])
const calculatedVariants = computed(() => {
  const classes = buttonVariants({
    variant: props.variant,
    size: props.size,
    square: props.square,
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
    as: props.as,
    asChild: props.asChild,
    'aria-busy': ariaBusy.value,
    'aria-disabled': ariaDisabled.value,
    class: cn(calculatedVariants.value, attrs.class),
    style: [colorStyle.value, radiusStyle.value, shadowStyle.value, attrs.style],
  }
})

const loadingIconProps = computed(() => {
  return {
    name: 'spinner' as const,
    size: props.size,
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
          <Icon v-if="props.icon" :name="props.icon" :size="props.size" data-test-button-icon />
        </slot>
      </template>

      <slot>{{ props.label }}</slot>

      <slot name="trailing">
        <Icon
          v-if="props.trailingIcon"
          :name="props.trailingIcon"
          :size="props.size"
          data-test-button-trailing-icon
        />
      </slot>
    </template>
  </Primitive>
</template>
