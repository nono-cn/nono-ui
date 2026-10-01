<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { Icon, type IconConfig } from '@/components/ui/Icon'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { useTheme } from '@/composables'
import { cn } from '@/lib/utils'
import {
  checkboxIndicatorVariants,
  checkboxIconVariants,
  checkboxVariants,
  type CheckboxContext,
  type CheckboxModelValue,
  type CheckboxProps,
} from '.'
import { checkboxDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CheckboxProps>(), checkboxDefaults)

const value = defineModel<CheckboxModelValue>('value', {
  default: checkboxDefaults.falseValue,
})

const validateValue = (val: CheckboxModelValue) => {
  const isValid = [props.trueValue, props.falseValue, 'indeterminate'].includes(val)
  if (!isValid) return props.falseValue

  return val
}

watch(
  [value, () => props.trueValue, () => props.falseValue],
  () => {
    value.value = validateValue(value.value)
  },
  {
    immediate: true,
  },
)

const checkboxContext = computed<CheckboxContext>(() => ({
  state: value.value === 'indeterminate' ? 'indeterminate' : value.value === props.trueValue,
}))

const checkboxIcon = computed<IconConfig | undefined>(() => {
  const icon = value.value === 'indeterminate' ? props.indeterminateIcon : props.icon
  return typeof icon === 'string' ? { name: icon } : icon
})

const attrs = useAttrs()
const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'checkbox',
  defaultColor: checkboxDefaults.color,
})
const rootProps = computed(() => {
  return {
    ...attrs,
    as: 'button',
    asChild: false,
    falseValue: props.falseValue,
    trueValue: props.trueValue,
    class: cn(checkboxVariants({ size: props.size }), attrs.class),
    style: [colorStyle.value, attrs.style],
  }
})

const indicatorProps = computed(() => {
  const ui = useUi(props.ui?.indicator, checkboxContext.value)
  return {
    ...ui,
    class: checkboxIndicatorVariants({ class: ui.class }),
    style: ui.style,
  }
})
</script>

<template>
  <CheckboxRoot v-bind="rootProps" v-model="value" data-test-checkbox-root>
    <CheckboxIndicator v-bind="indicatorProps" data-test-checkbox-indicator>
      <Icon
        v-if="checkboxIcon?.name"
        v-bind="checkboxIcon"
        :size="checkboxIcon.size"
        :color="checkboxIcon.color ?? 'currentColor'"
        :class="
          cn(
            checkboxIcon.size ? undefined : checkboxIconVariants({ size: props.size }),
            checkboxIcon.class,
          )
        "
        data-test-checkbox-icon
      />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
