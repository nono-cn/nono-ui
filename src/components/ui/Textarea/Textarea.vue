<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { useColor } from '@/composables'
import { cn } from '@/lib/utils'
import { textareaVariants, type TextareaProps, type TextareaValue } from '.'
import { textareaDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextareaProps>(), textareaDefaults)
const value = defineModel<TextareaValue>('value', { default: textareaDefaults.value })

watch(
  value,
  () => {
    if (typeof value.value !== 'string') value.value = ''
  },
  {
    immediate: true,
  },
)

const attrs = useAttrs()
const { colorStyle } = useColor(
  computed(() => props.color),
  'textarea',
)
const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(
      'flex w-full rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
      'focus-visible:border-primary focus-visible:ring-primary/50',
      textareaVariants({
        autoresize: props.autoresize,
        size: props.size,
        severity: props.color ? undefined : props.severity,
        color: Boolean(props.color),
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
