import { computed, type Ref } from 'vue'
import type { DialogContentConfig } from '@/components/ui/Dialog'

interface DialogContentOptions {
  content: Ref<DialogContentConfig>
  modal: Ref<boolean>
}

export function useDialogContent({ content, modal }: DialogContentOptions) {
  return computed(() => {
    const {
      onCloseAutoFocus,
      onEscapeKeyDown,
      onFocusOutside,
      onInteractOutside,
      onOpenAutoFocus,
      onPointerDownOutside,
      ...config
    } = content.value

    return {
      ...config,
      disableOutsidePointerEvents: config.disableOutsidePointerEvents ?? modal.value,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onFocusOutside,
      onInteractOutside,
      onOpenAutoFocus,
      onPointerDownOutside,
    }
  })
}
