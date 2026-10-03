<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { InputGroupAddon } from '@/components/internal/InputGroup'
import { Icon } from '@/components/ui/Icon'
import { useTheme } from '@/composables'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { InputProps, InputSlots, InputValue } from '.'
import { inputFieldVariants, inputVariants } from '.'
import { inputDefaults, inputSizes } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputProps>(), inputDefaults)
defineSlots<InputSlots>()
const value = defineModel<InputValue>({ default: inputDefaults.modelValue })
const resolvedSize = computed(() =>
  inputSizes.includes(props.size) ? props.size : inputDefaults.size,
)

const attrs = useAttrs()
const slots = useSlots()
const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'input',
  defaultColor: inputDefaults.color,
})

const rootProps = computed(() => {
  const ui = useUi(props.ui?.root, undefined)

  return {
    ...ui,
    class: cn(
      inputVariants({
        size: resolvedSize.value,
        variant: props.variant,
        highlight: props.highlight,
      }),
      ui.class,
    ),
    style: [colorStyle.value, ui.style],
  }
})

const inputProps = computed(() => {
  return {
    ...attrs,
    'aria-busy': props.loading || attrs['aria-busy'],
    class: cn(
      inputFieldVariants({
        leading: props.loading || Boolean(props.icon) || Boolean(slots.leading),
      }),
      attrs.class,
    ),
    style: [attrs.style],
  }
})

const leadingAddonProps = computed(() => {
  const ui = useUi(props.ui?.leading, undefined)
  return { ...ui, class: cn(ui.class), style: ui.style }
})

const trailingAddonProps = computed(() => {
  const ui = useUi(props.ui?.trailing, undefined)
  return { ...ui, class: cn(ui.class), style: ui.style }
})
</script>

<template>
  <div v-bind="rootProps" data-test-input-group-root>
    <InputGroupAddon v-if="props.loading || props.icon || slots.leading" v-bind="leadingAddonProps">
      <slot v-if="props.loading" name="loading">
        <Icon
          :name="props.loadingIcon"
          :size="resolvedSize"
          class="animate-spin"
          data-test-input-loading-icon
        />
      </slot>
      <slot v-else name="leading">
        <Icon v-if="props.icon" :name="props.icon" :size="resolvedSize" data-test-input-leading-icon/>
      </slot>
    </InputGroupAddon>

    <input v-model="value" v-bind="inputProps" data-test-input-root />

    <InputGroupAddon
      v-if="slots.trailing || props.trailingIcon"
      v-bind="trailingAddonProps"
      align="inline-end"
    >
      <slot name="trailing">
        <Icon
          v-if="props.trailingIcon"
          :name="props.trailingIcon"
          :size="resolvedSize"
          data-test-input-trailing-icon
        />
      </slot>
    </InputGroupAddon>
  </div>
</template>
