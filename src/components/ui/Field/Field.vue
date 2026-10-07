<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { FieldRoot } from 'reka-ui'
import { cn } from '@/lib/utils'
import { fieldRootVariants, type FieldProps, type FieldSlots } from '.'
import { fieldDefaults } from './constants'

defineOptions({ inheritAttrs: false })
defineSlots<FieldSlots>()

const props = withDefaults(defineProps<FieldProps>(), fieldDefaults)
const attrs = useAttrs()

const rootProps = computed(() => ({
  ...attrs,
  name: props.name,
  disabled: props.disabled,
  required: props.required,
  dirty: props.dirty,
  touched: props.touched,
  class: cn(fieldRootVariants(), attrs.class),
  style: attrs.style,
}))
</script>

<template>
  <FieldRoot v-slot="slotProps" v-bind="rootProps" data-test-field-root>
    <slot v-bind="slotProps" />
  </FieldRoot>
</template>
