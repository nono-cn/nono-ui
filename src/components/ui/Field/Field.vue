<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { FieldLabel, FieldRoot } from 'reka-ui'
import { cn } from '@/lib/utils'
import { fieldLabelVariants, fieldRootVariants, type FieldProps, type FieldSlots } from '.'
import { fieldDefaults } from './constants'

defineOptions({ inheritAttrs: false })
defineSlots<FieldSlots>()

const props = withDefaults(defineProps<FieldProps>(), fieldDefaults)
const attrs = useAttrs()
const slots = useSlots()

const rootProps = computed(() => ({
  ...attrs,
  name: props.name,
  disabled: props.disabled,
  required: props.required,
  invalid: props.invalid,
  dirty: props.dirty,
  touched: props.touched,
  validate: props.validate,
  validationMode: props.validationMode,
  validationDebounceTime: props.validationDebounceTime,
  class: cn(fieldRootVariants(), attrs.class),
  style: attrs.style,
}))

const labelProps = computed(() => ({
  class: fieldLabelVariants(),
}))
</script>

<template>
  <FieldRoot v-slot="slotProps" v-bind="rootProps" data-test-field-root>
    <FieldLabel v-if="props.label || slots.label" v-bind="labelProps" data-test-field-label>
      <slot name="label">{{ props.label }}</slot>
    </FieldLabel>
    <slot v-bind="slotProps" />
  </FieldRoot>
</template>
