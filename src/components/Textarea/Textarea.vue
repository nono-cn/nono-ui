<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useTheme } from '@/composables'
import { cn } from '@/lib/utils'
import { textareaVariants, type TextareaProps, type TextareaValue } from '.'
import { textareaDefaults, textareaSizes } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextareaProps>(), textareaDefaults)
const value = defineModel<TextareaValue>({ default: textareaDefaults.modelValue })
const resolvedSize = computed(() =>
  textareaSizes.includes(props.size) ? props.size : textareaDefaults.size,
)

const attrs = useAttrs()
const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'textarea',
  defaultColor: textareaDefaults.color,
})
const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(
      textareaVariants({
        autoresize: props.autoresize,
        size: resolvedSize.value,
        highlight: props.highlight,
        variant: props.variant,
      }),
      attrs.class,
    ),
    style: [colorStyle.value, attrs.style],
  }
})
</script>

<template>
  <textarea v-model="value" v-bind="rootProps" data-test-textarea-root />
</template>
