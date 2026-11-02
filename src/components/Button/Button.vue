<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue'
import { Primitive } from 'reka-ui'
import { Icon } from '@/components/Icon'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables'
import {
  buttonIconVariants,
  buttonLeadingVariants,
  buttonTrailingVariants,
  buttonVariants,
  type ButtonEmits,
  type ButtonProps,
  type ButtonSlots,
} from '.'
import { buttonDefaults } from './constants'
import { buttonGroupSizeKey } from '@/components/ButtonGroup'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonProps>(), { ...buttonDefaults, size: undefined })
const emit = defineEmits<ButtonEmits>()
const slots = defineSlots<ButtonSlots>()

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
const isNativeButton = computed(() => props.as === 'button')
const ariaDisabled = computed(
  () => props.loading || (props.disabled && !isNativeButton.value) || attrs['aria-disabled'],
)
const ariaBusy = computed(() => props.loading || attrs['aria-busy'])
const calculatedVariants = computed(() => {
  const classes = buttonVariants({
    variant: props.variant,
    size: size.value,
    disabled: props.disabled,
  })

  if (props.as === 'button' || props.as === 'a') return classes

  return classes
    .split(/\s+/)
    .filter((className) => !className.startsWith('hover:') && !className.startsWith('active:'))
    .join(' ')
})

const rootProps = computed(() => {
  return {
    type: isNativeButton.value ? 'button' : undefined,
    ...attrs,
    as: props.as ?? buttonDefaults.as,
    asChild: false,
    disabled: isNativeButton.value && props.disabled ? true : undefined,
    'aria-busy': ariaBusy.value,
    'aria-disabled': ariaDisabled.value,
    class: cn(calculatedVariants.value, attrs.class),
    style: [colorStyle.value, radiusStyle.value, attrs.style],
  }
})

const leadingProps = computed(() => {
  return {
    class: buttonLeadingVariants({ size: size.value }),
  }
})

const trailingProps = computed(() => {
  return {
    class: buttonTrailingVariants({ size: size.value }),
  }
})

const iconProps = {
  class: buttonIconVariants(),
}

const loadingIconProps = {
  name: 'spinner' as const,
  class: cn(buttonIconVariants(), 'animate-spin'),
}

function handleClick(event: PointerEvent) {
  if (props.disabled || ariaDisabled.value === true || ariaDisabled.value === 'true') {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  emit('click', event)
}
</script>

<template>
  <Primitive v-bind="rootProps" data-button-ui="root" data-test-button-root @click="handleClick">
    <span
      v-if="props.loading || props.icon || slots.leading"
      v-bind="leadingProps"
      data-button-ui="leading"
      data-test-button-leading
    >
      <slot v-if="props.loading" name="loading">
        <Icon v-bind="loadingIconProps" data-test-button-loading-icon />
      </slot>
      <slot v-else name="leading">
        <Icon v-if="props.icon" :name="props.icon" v-bind="iconProps" data-test-button-icon />
      </slot>
    </span>

    <slot>{{ props.label }}</slot>

    <span
      v-if="props.trailingIcon || slots.trailing"
      v-bind="trailingProps"
      data-button-ui="trailing"
      data-test-button-trailing
    >
      <slot name="trailing">
        <Icon
          v-if="props.trailingIcon"
          :name="props.trailingIcon"
          v-bind="iconProps"
          data-test-button-trailing-icon
        />
      </slot>
    </span>
  </Primitive>
</template>
