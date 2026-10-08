<script setup lang="ts">
import { computed, useAttrs, useId, useSlots } from 'vue'
import { FieldDescription, FieldLabel, FieldRoot } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  fieldDescriptionVariants,
  fieldLabelVariants,
  fieldRootVariants,
  type FieldProps,
  type FieldSlots,
} from '.'
import { fieldDefaults } from './constants'
import { provideField } from '@/composables/useField'

defineOptions({ inheritAttrs: false })
defineSlots<FieldSlots>()

const props = withDefaults(defineProps<FieldProps>(), fieldDefaults)
const attrs = useAttrs()
const slots = useSlots()
const id = useId()
const fieldFor = `label-${id}`
const labelId = `field-label-${id}`
const descriptionId = `description-${id}`

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

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, undefined)
  return {
    ...ui,
    id: ui.id ?? labelId,
    for: fieldFor,
    class: cn(fieldLabelVariants(), ui.class),
    style: ui.style,
  }
})

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, undefined)
  return {
    ...ui,
    id: ui.id ?? descriptionId,
    class: cn(fieldDescriptionVariants(), ui.class),
    style: ui.style,
  }
})

provideField({
  for: fieldFor,
  get ariaLabelledby() {
    return props.label || slots.label ? labelProps.value.id : undefined
  },
  get ariaDescribedby() {
    return props.description || slots.description ? descriptionProps.value.id : undefined
  },
})
</script>

<template>
  <FieldRoot v-slot="slotProps" v-bind="rootProps" data-test-field-root>
    <FieldLabel v-if="props.label || slots.label" v-bind="labelProps" data-test-field-label>
      <slot name="label">{{ props.label }}</slot>
    </FieldLabel>
    <slot v-bind="slotProps" />
    <FieldDescription
      v-if="props.description || slots.description"
      :key="descriptionProps.id"
      v-bind="descriptionProps"
      data-test-field-description
    >
      <slot name="description">{{ props.description }}</slot>
    </FieldDescription>
  </FieldRoot>
</template>
