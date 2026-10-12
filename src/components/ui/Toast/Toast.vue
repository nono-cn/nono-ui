<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { ToastDescription, ToastRoot, ToastTitle } from 'reka-ui'
import { toastVariants, type ToastEmits, type ToastProps, type ToastSlots } from '.'
import { useTheme } from '@/composables'
import { cn } from '@/lib/utils'
import { toastDefaults } from './constants'

defineOptions({ inheritAttrs: false })
defineSlots<ToastSlots>()

const props = withDefaults(defineProps<ToastProps>(), toastDefaults)
const emit = defineEmits<ToastEmits>()
const open = defineModel<boolean>('open')
const attrs = useAttrs()
const slots = useSlots()
const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'toast',
  defaultColor: toastDefaults.color,
})

const rootProps = computed(() => ({
  ...attrs,
  class: cn(toastVariants({ variant: props.variant, position: props.position }), attrs.class),
  style: [colorStyle.value, attrs.style],
  as: 'div',
  asChild: false,
  duration: props.duration,
  forceMount: props.forceMount,
  toast: props.toast,
  type: props.type,
  onPause: () => emit('pause'),
  onResume: () => emit('resume'),
  onEscapeKeyDown: (event: ToastEmits['escapeKeyDown'][0]) => emit('escapeKeyDown', event),
  onSwipeStart: (event: ToastEmits['swipeStart'][0]) => emit('swipeStart', event),
  onSwipeMove: (event: ToastEmits['swipeMove'][0]) => emit('swipeMove', event),
  onSwipeCancel: (event: ToastEmits['swipeCancel'][0]) => emit('swipeCancel', event),
  onSwipeEnd: (event: ToastEmits['swipeEnd'][0]) => emit('swipeEnd', event),
}))
</script>

<template>
  <ToastRoot v-bind="rootProps" v-model:open="open" data-test-toast-root>
    <template #default="slotProps">
      <ToastTitle
        v-if="props.label !== undefined || slots.label || props.toast?.title"
        data-test-toast-title
      >
        <slot name="label">{{ props.label ?? props.toast?.title }}</slot>
      </ToastTitle>
      <ToastDescription
        v-if="props.description !== undefined || slots.description || props.toast?.description"
        data-test-toast-description
      >
        <slot name="description">{{ props.description ?? props.toast?.description }}</slot>
      </ToastDescription>
      <slot v-bind="slotProps" />
    </template>
  </ToastRoot>
</template>
