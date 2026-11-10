<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { Icon } from '@/components/Icon'
import { useUi } from '@/composables/useUi'
import { useTheme } from '@/composables'
import { cn } from '@/lib/utils'
import {
  checkboxIconVariants,
  checkboxIndicatorVariants,
  checkboxVariants,
  createCheckboxContext,
  type CheckboxModelValue,
  type CheckboxProps,
} from '.'
import { checkboxDefaults, checkboxSizes } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CheckboxProps>(), checkboxDefaults)
const value = defineModel<CheckboxModelValue>('value', { default: checkboxDefaults.falseValue })

const checkboxContext = computed(() => createCheckboxContext(value.value, props.trueValue))
const checkboxIcon = computed(() =>
  checkboxContext.value.state === 'indeterminate' ? props.indeterminateIcon : props.icon,
)

const attrs = useAttrs()
const size = computed(() =>
  (checkboxSizes as readonly unknown[]).includes(props.size) ? props.size : checkboxDefaults.size,
)

const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'checkbox',
  defaultColor: checkboxDefaults.color,
})

const rootProps = computed(() => ({
  ...attrs,
  as: 'button',
  asChild: false,
  trueValue: props.trueValue,
  falseValue: props.falseValue,
  class: cn(checkboxVariants({ size: size.value }), attrs.class),
  style: [colorStyle.value, attrs.style],
}))

const indicatorProps = computed(() => {
  const ui = useUi(props.ui?.indicator, checkboxContext.value)

  return {
    ...ui,
    class: cn(checkboxIndicatorVariants(), ui.class),
    style: ui.style,
  }
})

const iconProps = computed(() => ({
  name: checkboxIcon.value,
  color: 'currentColor',
  class: checkboxIconVariants({ size: size.value }),
}))
</script>

<template>
  <CheckboxRoot v-bind="rootProps" v-model="value" data-test-checkbox-root>
    <CheckboxIndicator v-bind="indicatorProps" data-test-checkbox-indicator>
      <Icon v-if="iconProps.name" v-bind="iconProps" data-test-checkbox-icon />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
