<script setup lang="ts">
import { computed, ref, useAttrs, useSlots, watch } from 'vue'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { Separator } from '@/components/ui/Separator'
import { useContent } from '@/composables/useContent'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import type { DialogContentConfig, DialogContext, DialogEmits, DialogProps, DialogSlots } from '.'
import {
  dialogBodyVariants,
  dialogCloseVariants,
  dialogContentVariants,
  dialogDescriptionVariants,
  dialogFooterVariants,
  dialogHeaderVariants,
  dialogLabelVariants,
  dialogOverlayVariants,
  dialogRootVariants,
} from '.'
import { dialogDefaults } from './constants'

defineOptions({ inheritAttrs: false })

defineSlots<DialogSlots>()
const emit = defineEmits<DialogEmits>()

const props = withDefaults(defineProps<DialogProps>(), dialogDefaults)

const slots = useSlots()
const attrs = useAttrs()
const portalTarget = ref<HTMLElement>()
const modelOpen = defineModel<boolean>('open', { default: false })
const { t } = useI18n()

const open = computed<boolean>({
  get: () => modelOpen.value,
  set: (value) => {
    if (props.block && !value) return
    modelOpen.value = value
  },
})

watch(open, (value, previousValue) => {
  if (value === previousValue) return
  if (value) emit('show')
  else emit('close')
})

function close() {
  if (!props.block) open.value = false
}

const dialogContext = computed<DialogContext>(() => ({
  open: open.value,
  close,
}))

const rootProps = computed(() => {
  return {
    modal: props.modal,
    unmountOnHide: props.unmountOnHide,
  }
})

const triggerProps = computed(() => {
  return {
    asChild: true,
  }
})

const overlayProps = computed(() => {
  const overlayUI = useUi(props.ui?.overlay, dialogContext.value)

  return {
    ...overlayUI,
    class: cn(dialogOverlayVariants(), overlayUI.class),
    style: overlayUI.style,
  }
})

const contentConfig = computed<DialogContentConfig>(() => {
  const content = props.content ?? {}
  const normalizedContentUI = useUi(props.ui?.content, dialogContext.value)
  const {
    dir: contentDirection,
    class: uiClass,
    style: uiStyle,
    ...contentUI
  } = normalizedContentUI

  void contentDirection

  return {
    ...contentUI,
    ...content,
    disableOutsidePointerEvents: content.disableOutsidePointerEvents ?? props.modal,
    class: cn(content.class, uiClass),
    style: content.style && uiStyle ? [content.style, uiStyle] : (content.style ?? uiStyle),
  }
})
const contentProps = useContent(contentConfig, {
  class: dialogContentVariants(),
  defaults: false,
})

const headerProps = computed(() => {
  const ui = useUi(props.ui?.header, dialogContext.value)
  return {
    ...ui,
    class: cn(dialogHeaderVariants(), ui.class),
    style: ui.style,
  }
})

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, dialogContext.value)
  return {
    ...ui,
    class: cn(dialogLabelVariants(), ui.class),
    style: ui.style,
  }
})

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, dialogContext.value)
  return {
    ...ui,
    class: cn(dialogDescriptionVariants(), ui.class),
    style: ui.style,
  }
})

const bodyProps = computed(() => {
  const ui = useUi(props.ui?.body, dialogContext.value)
  return {
    ...ui,
    class: cn(dialogBodyVariants(), ui.class),
    style: ui.style,
  }
})

const footerProps = computed(() => {
  const ui = useUi(props.ui?.footer, dialogContext.value)
  return {
    ...ui,
    class: cn(dialogFooterVariants(), ui.class),
    style: ui.style,
  }
})

const closeProps = computed(() => {
  const ui = useUi(props.ui?.close, dialogContext.value)
  return {
    ...ui,
    'aria-label': ui['aria-label'] ?? t('close'),
    class: cn(dialogCloseVariants(), ui.class),
    style: ui.style,
  }
})

const icon = computed(() => props.icon)
const closeIcon = computed(() => props.closeIcon)
</script>

<template>
  <div v-bind="attrs" :class="dialogRootVariants()" data-test-dialog-root>
    <DialogRoot v-bind="rootProps" v-model:open="open" data-test-dialog-root>
      <DialogTrigger v-bind="triggerProps" data-test-dialog-trigger>
        <slot v-bind="dialogContext" />
      </DialogTrigger>

      <DialogPortal :to="portalTarget">
        <DialogOverlay v-bind="overlayProps" data-test-dialog-overlay />
        <DialogContent v-bind="contentProps" data-test-dialog-content>
          <template v-if="props.showCloseButton && !props.block">
            <slot name="close" v-bind="dialogContext">
              <DialogClose v-bind="closeProps" data-test-dialog-close>
                <slot name="closeIcon" v-bind="dialogContext">
                  <Icon v-if="closeIcon?.name" v-bind="closeIcon" data-test-dialog-close-icon />
                </slot>
              </DialogClose>
            </slot>
          </template>

          <div
            v-if="
              props.label || props.description || slots.header || slots.label || slots.description
            "
            v-bind="headerProps"
            data-test-dialog-header
          >
            <slot name="header" v-bind="dialogContext">
              <DialogTitle
                v-if="props.label || slots.label"
                v-bind="labelProps"
                data-test-dialog-label
              >
                <Icon v-if="icon?.name" v-bind="icon" :name="icon.name" data-test-dialog-icon />
                <slot name="label" v-bind="dialogContext">{{ props.label }}</slot>
              </DialogTitle>

              <DialogDescription
                v-if="props.description || slots.description"
                v-bind="descriptionProps"
                data-test-dialog-description
              >
                <slot name="description" v-bind="dialogContext">{{ props.description }}</slot>
              </DialogDescription>
            </slot>
          </div>

          <Separator />

          <div v-if="slots.content" v-bind="bodyProps" data-test-dialog-body>
            <slot name="content" v-bind="dialogContext" />
          </div>

          <Separator v-if="slots.footer" />

          <div v-if="slots.footer" v-bind="footerProps" data-test-dialog-footer>
            <slot name="footer" v-bind="dialogContext" />
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
    <div ref="portalTarget" data-test-dialog-portal-target />
  </div>
</template>
