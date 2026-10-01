<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'reka-ui'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import {
  type AlertDialogExpose,
  type AlertDialogEmits,
  type AlertDialogProps,
  type AlertDialogSlots,
} from '.'
import { alertDialogCancelButtonDefaults, alertDialogDefaults } from './constants'

defineOptions({ inheritAttrs: false })

defineSlots<AlertDialogSlots>()
const emit = defineEmits<AlertDialogEmits>()

const props = withDefaults(defineProps<AlertDialogProps>(), alertDialogDefaults)

const slots = useSlots()
const attrs = useAttrs()
const portalTarget = ref<HTMLElement>()
const open = defineModel<boolean>('open')
const { t } = useI18n()

function close() {
  open.value = false
}

defineExpose<AlertDialogExpose>({ close })

const rootProps = computed(() => {
  return {
    unmountOnHide: props.unmountOnHide,
    defaultOpen: false,
  }
})

const triggerProps = computed(() => {
  const triggerUI = useUi(props.ui?.trigger, undefined)
  return {
    ...triggerUI,
    as: 'div',
    asChild: true,
    class: cn(triggerUI.class),
  }
})

const overlayProps = computed(() => {
  const overlayUI = useUi(props.ui?.overlay, undefined)
  return {
    ...overlayUI,
    class: cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
      overlayUI.class,
    ),
    style: overlayUI.style,
  }
})

const contentProps = computed(() => {
  const normalizedContentUI = useUi(props.ui?.content, undefined)
  const { dir: contentDirection, ...contentUI } = normalizedContentUI

  void contentDirection

  return {
    ...contentUI,
    as: 'div',
    asChild: false,
    disableOutsidePointerEvents: props.disableOutsidePointerEvents,
    forceMount: props.forceMount,
    class: cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 pointer-events-auto fixed top-1/2 left-1/2 z-50 grid max-h-[90dvh] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_minmax(0,1fr)_auto] gap-4 overflow-hidden rounded-lg border bg-background p-6 shadow-lg duration-200 sm:max-w-lg',
      contentUI.class,
    ),
  }
})

const headerProps = computed(() => {
  const ui = useUi(props.ui?.header, undefined)
  return { ...ui, class: cn('flex flex-col gap-2 text-center sm:text-left', ui.class) }
})

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, undefined)
  return {
    ...ui,
    class: cn('flex items-center gap-2 text-lg leading-none font-semibold', ui.class),
  }
})

const iconProps = computed(() => props.icon)

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, undefined)
  return { ...ui, class: cn('text-sm text-muted-foreground', ui.class) }
})

const bodyProps = computed(() => {
  const ui = useUi(props.ui?.body, undefined)
  return { ...ui, class: cn('min-h-0 overflow-y-auto', ui.class) }
})

const footerProps = computed(() => {
  const ui = useUi(props.ui?.footer, undefined)
  return { ...ui, class: cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', ui.class) }
})

const cancelButtonProps = computed(() => ({
  label: t('cancel'),
  ...alertDialogCancelButtonDefaults,
  ...props.cancelButton,
}))

const actionButtonProps = computed(() => ({
  label: t('continue'),
  ...props.actionButton,
}))
</script>

<template>
  <div v-bind="attrs" class="contents" data-test-alert-dialog-root>
    <AlertDialogRoot v-bind="rootProps" v-model:open="open" data-test-alert-dialog-root>
      <AlertDialogTrigger v-bind="triggerProps" data-test-alert-dialog-trigger>
        <slot />
      </AlertDialogTrigger>

      <AlertDialogPortal :to="portalTarget">
        <AlertDialogOverlay v-bind="overlayProps" data-test-alert-dialog-overlay />
        <AlertDialogContent v-bind="contentProps" data-test-alert-dialog-content>
          <div
            v-if="
              props.label || props.description || slots.header || slots.label || slots.description
            "
            v-bind="headerProps"
            data-test-alert-dialog-header
          >
            <slot name="header">
              <AlertDialogTitle
                v-if="props.label || slots.label"
                v-bind="labelProps"
                data-test-alert-dialog-label
              >
                <Icon v-if="iconProps" :name="iconProps" data-test-alert-dialog-icon />
                <slot name="label">
                  {{ props.label }}
                </slot>
              </AlertDialogTitle>

              <AlertDialogDescription
                v-if="props.description || slots.description"
                v-bind="descriptionProps"
                data-test-alert-dialog-description
              >
                <slot name="description">
                  {{ props.description }}
                </slot>
              </AlertDialogDescription>
            </slot>
          </div>

          <div v-if="slots.content" v-bind="bodyProps" data-test-alert-dialog-body>
            <slot name="content" />
          </div>

          <div v-bind="footerProps" data-test-alert-dialog-footer>
            <slot name="footer" :close="close">
              <AlertDialogCancel
                as-child
                data-test-alert-dialog-cancel
                @click="emit('cancel', $event)"
              >
                <slot name="cancel" :close="close">
                  <Button v-bind="cancelButtonProps" data-test-alert-dialog-cancel-button />
                </slot>
              </AlertDialogCancel>

              <AlertDialogAction
                as-child
                data-test-alert-dialog-action
                @click="emit('action', $event)"
              >
                <slot name="action" :close="close">
                  <Button v-bind="actionButtonProps" data-test-alert-dialog-action-button />
                </slot>
              </AlertDialogAction>
            </slot>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogRoot>
    <div ref="portalTarget" data-test-alert-dialog-portal-target />
  </div>
</template>
