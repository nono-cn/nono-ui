<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useTheme } from '@/composables'
import { cn } from '@/lib/utils'
import { textareaVariants, type TextareaProps, type TextareaValue } from '.'
import { textareaDefaults, textareaSizes, textareaVariantNames } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextareaProps>(), textareaDefaults)
const value = defineModel<TextareaValue>({ default: textareaDefaults.modelValue })

const attrs = useAttrs()
const size = computed(() =>
  (textareaSizes as readonly unknown[]).includes(props.size) ? props.size : textareaDefaults.size,
)

const variant = computed(() =>
  (textareaVariantNames as readonly unknown[]).includes(props.variant)
    ? props.variant
    : textareaDefaults.variant,
)

const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'textarea',
  defaultColor: textareaDefaults.color,
})

const rootProps = computed(() => ({
  ...attrs,
  class: cn(
    textareaVariants({
      autoresize: props.autoresize,
      size: size.value,
      variant: variant.value,
      highlight: props.highlight,
    }),
    attrs.class,
  ),
  style: [colorStyle.value, attrs.style],
}))
</script>

<template>
  <textarea v-model="value" v-bind="rootProps" data-test-textarea-root />
</template>
