<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { FieldRoot } from 'reka-ui'
import { cn } from '@/lib/utils'
import { fieldRootVariants, type FieldProps, type FieldSlots } from '.'

defineOptions({ inheritAttrs: false })
defineSlots<FieldSlots>()

const props = defineProps<FieldProps>()
const attrs = useAttrs()

const rootProps = computed(() => ({
  ...attrs,
  name: props.name,
  disabled: props.disabled,
  required: props.required,
  class: cn(fieldRootVariants(), attrs.class),
  style: attrs.style,
}))
</script>

<template>
  <FieldRoot v-slot="slotProps" v-bind="rootProps" data-test-field-root>
    <slot v-bind="slotProps" />
  </FieldRoot>
</template>
