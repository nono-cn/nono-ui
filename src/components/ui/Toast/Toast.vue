<script setup lang="ts">
import { computed, useAttrs, useSlots, watch } from 'vue'
import {
  ToastClose,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from 'reka-ui'
import { Button, toIconButtonSize } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useColor } from '@/composables'
import { useUi } from '@/composables/useUi'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import { toastDefaults } from './defaults'
import { toastVariants, toastViewportVariants } from '.'
import type { ToastContext, ToastEmits, ToastProps, ToastSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<ToastSlots>()
const emit = defineEmits<ToastEmits>()

const props = withDefaults(defineProps<ToastProps>(), toastDefaults)

const attrs = useAttrs()
const slots = useSlots()
const open = defineModel<boolean>('open', { default: true })
const { t } = useI18n()
const { colorStyle } = useColor(
  computed(() => props.color),
  'toast',
)

watch(open, (value, previousValue) => {
  if (previousValue && !value) emit('close')
})

function close() {
  open.value = false
}

const toastContext = computed<ToastContext>(() => {
  return {
    open: open.value,
    close,
  }
})

const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, toastContext.value)

  return {
    ...attrs,
    type: props.type,
    duration: props.duration,
    ...rootUI,
    class: cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:fade-in-0 data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=move]:translate-y-(--reka-toast-swipe-move-y) data-[swipe=cancel]:translate-y-0 data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=end]:animate-out data-[swipe=end]:fade-out-0 pointer-events-auto relative grid w-full grid-cols-[0_minmax(0,1fr)] items-start gap-x-3 gap-y-1 overflow-hidden rounded-lg border bg-background p-4 pr-10 text-foreground shadow-lg duration-200',
      (props.icon || slots.icon) && 'grid-cols-[auto_minmax(0,1fr)]',
      toastVariants({
        variant: props.variant,
        severity: props.severity,
        color: Boolean(props.color),
      }),
      attrs.class,
      rootUI.class,
    ),
    style: [colorStyle.value, attrs.style, rootUI.style],
  }
})

const iconProps = computed(() => props.icon)

const iconContainerProps = computed(() => {
  const ui = useUi(props.ui?.iconContainer, toastContext.value)
  return { ...ui, class: cn('row-span-2 mt-0.5 [&_svg]:size-5', ui.class) }
})

const contentProps = computed(() => {
  const ui = useUi(props.ui?.content, toastContext.value)
  return { ...ui, class: cn('col-start-2 grid min-w-0 gap-1', ui.class) }
})

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, toastContext.value)
  return { ...ui, class: cn('text-sm font-semibold', ui.class) }
})

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, toastContext.value)
  return { ...ui, class: cn('text-sm text-current/80', ui.class) }
})

const closeProps = computed(() => {
  const ui = useUi(props.ui?.close, toastContext.value)
  return {
    ...ui,
    'aria-label': ui['aria-label'] ?? t('close'),
    class: cn('absolute top-2 right-2', ui.class),
  }
})

const closeButtonProps = computed(() => {
  const button = props.closeButton
  return {
    ...button,
    size: toIconButtonSize(button?.size ?? 'xs'),
    radius: button?.radius ?? 'full',
    variant: button?.variant ?? props.variant,
    severity: button?.severity ?? props.severity,
    color: button?.color ?? props.color,
    icon: button?.icon ?? ('x' as const),
  }
})

const progressProps = computed(() => {
  const ui = useUi(props.ui?.progress, toastContext.value)
  return {
    ...ui,
    role: 'progressbar',
    'aria-label': ui['aria-label'] ?? 'Toast timeout',
    class: cn('col-span-2 mt-1 h-1 w-full overflow-hidden rounded-full bg-current/20', ui.class),
    style: ui.style,
  }
})

const viewportProps = computed(() => {
  const ui = useUi(props.ui?.viewport, toastContext.value)
  return {
    hotkey: props.hotkey,
    label: props.labelHotkey,
    ...ui,
    class: cn(
      'fixed z-100 flex max-h-screen w-full max-w-sm flex-col gap-2 p-4',
      toastViewportVariants({ position: props.position }),
      ui.class,
    ),
    style: ui.style,
  }
})

const providerProps = computed(() => ({
  disableSwipe: props.disableSwipe,
  swipeDirection: props.swipeDirection,
  swipeThreshold: props.swipeThreshold,
}))
</script>

<template>
  <ToastProvider v-bind="providerProps">
    <ToastPortal>
      <ToastRoot
        v-slot="{ remaining, duration: toastDuration }"
        v-bind="rootProps"
        v-model:open="open"
        data-test-toast-root
        @escape-key-down="emit('escapeKeyDown', $event)"
        @pause="emit('pause')"
        @resume="emit('resume')"
        @swipe-start="emit('swipeStart', $event)"
        @swipe-move="emit('swipeMove', $event)"
        @swipe-cancel="emit('swipeCancel', $event)"
        @swipe-end="emit('swipeEnd', $event)"
      >
        <slot v-bind="toastContext">
          <div
            v-if="iconProps?.name || slots.icon"
            v-bind="iconContainerProps"
            data-test-toast-icon
          >
            <slot name="icon" v-bind="toastContext">
              <Icon v-if="iconProps?.name" v-bind="iconProps" />
            </slot>
          </div>

          <div v-bind="contentProps" data-test-toast-content>
            <ToastTitle v-if="props.label || slots.label" v-bind="labelProps" data-test-toast-title>
              <slot name="label" v-bind="toastContext">{{ props.label }}</slot>
            </ToastTitle>

            <ToastDescription
              v-if="props.description || slots.description"
              v-bind="descriptionProps"
              data-test-toast-description
            >
              <slot name="description" v-bind="toastContext">{{ props.description }}</slot>
            </ToastDescription>
          </div>

          <ToastClose v-if="props.closable" v-bind="closeProps" as-child data-test-toast-close>
            <slot name="close" v-bind="toastContext">
              <Button v-bind="closeButtonProps" />
            </slot>
          </ToastClose>
        </slot>

        <div
          v-if="props.progress && toastDuration > 0 && toastDuration !== Infinity"
          v-bind="progressProps"
          data-test-toast-progress
          aria-valuemin="0"
          :aria-valuemax="toastDuration"
          :aria-valuenow="remaining"
        >
          <div
            class="h-full rounded-full bg-current transition-[width] duration-100"
            :style="{ width: `${Math.max(0, Math.min(100, (remaining / toastDuration) * 100))}%` }"
          />
        </div>
      </ToastRoot>

      <ToastViewport v-bind="viewportProps" data-test-toast-viewport />
    </ToastPortal>
  </ToastProvider>
</template>
