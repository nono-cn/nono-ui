import { ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import type { DialogContentConfig } from '@/components/ui/Dialog'
import { useDialogContent } from '@/composables/useDialogContent'

describe('useDialogContent', () => {
  it.each([true, false])(
    'usa modal=%s como valor por defecto para los eventos de puntero',
    (isModal) => {
      const content = useDialogContent({
        content: ref<DialogContentConfig>({}),
        modal: ref(isModal),
      })

      expect(content.value.disableOutsidePointerEvents).toBe(isModal)
      expect('side' in content.value).toBe(false)
    },
  )

  it('respeta la opción explícita y conserva atributos, clases y estilos', () => {
    const style = { opacity: 0.5 }
    const content = useDialogContent({
      content: ref<DialogContentConfig>({
        disableOutsidePointerEvents: false,
        id: 'dialog-content',
        class: 'custom-content',
        style,
        'aria-label': 'Contenido',
      }),
      modal: ref(true),
    })

    expect(content.value).toMatchObject({
      disableOutsidePointerEvents: false,
      id: 'dialog-content',
      class: 'custom-content',
      style,
      'aria-label': 'Contenido',
    })
  })

  it('conserva los seis callbacks de DialogContent como props', () => {
    const callbacks = {
      onCloseAutoFocus: vi.fn(),
      onEscapeKeyDown: vi.fn(),
      onFocusOutside: vi.fn(),
      onInteractOutside: vi.fn(),
      onOpenAutoFocus: vi.fn(),
      onPointerDownOutside: vi.fn(),
    }
    const content = useDialogContent({
      content: ref<DialogContentConfig>(callbacks),
      modal: ref(true),
    })

    for (const callback of Object.keys(callbacks) as (keyof typeof callbacks)[]) {
      expect(content.value[callback]).toBe(callbacks[callback])
    }
  })

  it('recalcula las props cuando cambian content y modal', () => {
    const input = ref<DialogContentConfig>({ forceMount: false })
    const modal = ref(true)
    const content = useDialogContent({ content: input, modal })

    input.value = { forceMount: true }
    modal.value = false
    expect(content.value.forceMount).toBe(true)
    expect(content.value.disableOutsidePointerEvents).toBe(false)
  })
})
