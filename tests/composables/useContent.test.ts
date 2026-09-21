import { ref } from 'vue'
import { describe, expect, it } from 'vitest'
import type { PopoverContentConfig } from '@/components/ui/Popover'
import { useContent } from '@/composables/useContent'

describe('useContent', () => {
  it('aplica los valores por defecto de PopoverContent', () => {
    const content = useContent(ref<PopoverContentConfig | undefined>(undefined))

    expect(content.value).toMatchObject({
      align: 'center',
      alignFlip: true,
      alignOffset: 0,
      arrowPadding: 0,
      avoidCollisions: true,
      collisionPadding: 8,
      hideShiftedArrow: true,
      hideWhenDetached: false,
      positionStrategy: 'fixed',
      side: 'bottom',
      sideFlip: true,
      sideOffset: 4,
      sticky: 'partial',
      updatePositionStrategy: 'optimized',
    })
    expect(content.value.class).toContain('z-50')
  })

  it('sobrescribe los defaults y conserva atributos, clases y estilos', () => {
    const content = useContent(
      ref<PopoverContentConfig>({
        side: 'top',
        sideOffset: 12,
        id: 'content',
        class: 'custom-content',
        style: { opacity: 0.5 },
        'aria-label': 'Content',
      }),
    )

    expect(content.value).toMatchObject({
      side: 'top',
      sideOffset: 12,
      id: 'content',
      class: expect.stringContaining('custom-content'),
      style: { opacity: 0.5 },
      'aria-label': 'Content',
    })
  })

  it('conserva los callbacks de Reka como props', () => {
    const onFocusOutside = () => undefined
    const onEscapeKeyDown = () => undefined
    const content = useContent(ref<PopoverContentConfig>({ onFocusOutside, onEscapeKeyDown }))

    expect(content.value.onFocusOutside).toBe(onFocusOutside)
    expect(content.value.onEscapeKeyDown).toBe(onEscapeKeyDown)
  })

  it('recalcula la configuración cuando cambia la ref', () => {
    const input = ref<PopoverContentConfig>({ side: 'left' })
    const content = useContent(input)

    expect(content.value.side).toBe('left')
    input.value = { side: 'right', align: 'end' }

    expect(content.value).toMatchObject({ side: 'right', align: 'end' })
  })
})
