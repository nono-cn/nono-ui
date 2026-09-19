<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { useColor } from '@/composables'
import { cn } from '@/lib/utils'
import {
  checkboxIconVariants,
  checkboxVariants,
  type CheckboxContext,
  type CheckboxModelValue,
  type CheckboxProps,
} from '.'
import { checkboxDefaults } from './default'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CheckboxProps>(), checkboxDefaults)

const value = defineModel<CheckboxModelValue>('value', {
  default: false,
})

const validateValue = (val: CheckboxModelValue) => {
  const isValid = [props.trueValue, props.falseValue, 'indeterminate'].includes(val)
  if (!isValid) return props.falseValue

  return val
}

watch(
  value,
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

const attrs = useAttrs()
const { colorStyle } = useColor(
  computed(() => props.color),
  'checkbox',
)
const rootProps = computed(() => {
  return {
    ...attrs,
    as: 'button',
    asChild: false,
    falseValue: props.falseValue,
    trueValue: props.trueValue,
    class: cn(
      'peer shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
      checkboxVariants({
        size: props.size,
        severity: props.severity,
        color: Boolean(props.color),
      }),
      attrs.class,
    ),
    style: [colorStyle.value, attrs.style],
  }
})

const indicatorProps = computed(() => {
  const ui = useUi(props.ui?.indicator, checkboxContext.value)
  return {
    ...ui,
    class: cn('grid place-content-center', ui.class),
    style: ui.style,
  }
})
</script>

<template>
  <CheckboxRoot v-bind="rootProps" v-model="value" data-test-checkbox-root>
    <CheckboxIndicator v-bind="indicatorProps" data-test-checkbox-indicator>
      <Icon
        v-bind="props.icon"
        :size="undefined"
        :color="undefined"
        :class="checkboxIconVariants({ size: props.size, class: props.icon.class })"
        data-test-checkbox-icon
      />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
