<script setup lang="ts">
import { computed, useAttrs, type InputHTMLAttributes } from 'vue'
import { Icon } from '@/components/Icon'
import { useTheme } from '@/composables'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { InputProps, InputSlots, InputValue } from '.'
import {
  inputFieldVariants,
  inputIconVariants,
  inputLeadingVariants,
  inputTrailingVariants,
  inputVariants,
} from '.'
import { inputDefaults, inputSizes, inputVariantNames } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputProps>(), inputDefaults)
const slots = defineSlots<InputSlots>()
const value = defineModel<InputValue>({ default: inputDefaults.modelValue })

const attrs = useAttrs()
const size = computed(() =>
  (inputSizes as readonly unknown[]).includes(props.size) ? props.size : inputDefaults.size,
)

const variant = computed(() =>
  (inputVariantNames as readonly unknown[]).includes(props.variant)
    ? props.variant
    : inputDefaults.variant,
)

const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'input',
  defaultColor: inputDefaults.color,
})

const hasLeading = computed(() => props.loading || Boolean(props.icon) || Boolean(slots.leading))
const hasTrailing = computed(() => Boolean(props.trailingIcon) || Boolean(slots.trailing))

const rootProps = computed(() => {
  const ui = useUi(props.ui?.root, undefined)

  return {
    ...ui,
    class: cn(
      inputVariants({
        size: size.value,
        variant: variant.value,
        highlight: props.highlight,
      }),
      ui.class,
    ),
    style: [colorStyle.value, ui.style],
  }
})

const fieldProps = computed(() => ({
  ...attrs,
  'aria-busy': props.loading ? true : (attrs['aria-busy'] as InputHTMLAttributes['aria-busy']),
  class: cn(
    inputFieldVariants({ leading: hasLeading.value, trailing: hasTrailing.value }),
    attrs.class,
  ),
  style: attrs.style,
}))

const leadingProps = computed(() => {
  const ui = useUi(props.ui?.leading, undefined)

  return {
    ...ui,
    class: cn(inputLeadingVariants({ size: size.value }), ui.class),
    style: ui.style,
  }
})

const trailingProps = computed(() => {
  const ui = useUi(props.ui?.trailing, undefined)

  return {
    ...ui,
    class: cn(inputTrailingVariants({ size: size.value }), ui.class),
    style: ui.style,
  }
})

const iconProps = {
  class: inputIconVariants(),
}
</script>

<template>
  <div v-bind="rootProps" data-test-input-root>
    <span v-if="hasLeading" v-bind="leadingProps" data-test-input-leading>
      <slot v-if="props.loading" name="loading">
        <Icon
          :name="props.loadingIcon"
          v-bind="iconProps"
          class="animate-spin"
          data-test-input-loading-icon
        />
      </slot>
      <slot v-else name="leading">
        <Icon v-if="props.icon" :name="props.icon" v-bind="iconProps" data-test-input-icon />
      </slot>
    </span>

    <input v-model="value" v-bind="fieldProps" data-test-input-field />

    <span v-if="hasTrailing" v-bind="trailingProps" data-test-input-trailing>
      <slot name="trailing">
        <Icon
          v-if="props.trailingIcon"
          :name="props.trailingIcon"
          v-bind="iconProps"
          data-test-input-trailing-icon
        />
      </slot>
    </span>
  </div>
</template>
