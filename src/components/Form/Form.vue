<script setup lang="ts">
import { computed, getCurrentInstance, useAttrs, useTemplateRef } from 'vue'
import { FormRoot } from 'reka-ui'
import { cn } from '@/lib/utils'
import type { FormEmits, FormProps, FormSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<FormProps>()
const emit = defineEmits<FormEmits>()
defineSlots<FormSlots>()

const attrs = useAttrs()
const instance = getCurrentInstance()
const formRoot = useTemplateRef<InstanceType<typeof FormRoot>>('formRoot')

const rootProps = computed(() => ({
  ...attrs,
  errors: props.errors,
  validationMode: props.validationMode,
  class: cn(attrs.class),
  style: attrs.style,
}))

function handleSubmit(event: SubmitEvent) {
  emit('submit', event)
}

function handleFormSubmit(values: Record<string, unknown>, event: SubmitEvent) {
  emit('formSubmit', values, event)
}

defineExpose({
  validate: (name?: string) => formRoot.value?.validate(name) ?? false,
})
</script>

<template>
  <FormRoot
    ref="formRoot"
    v-bind="rootProps"
    data-test-form-root
    @submit="handleSubmit"
    v-on="{ formSubmit: instance?.vnode.props?.onFormSubmit ? handleFormSubmit : undefined }"
  >
    <slot />
  </FormRoot>
</template>
