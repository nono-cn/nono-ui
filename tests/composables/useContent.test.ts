import { shallowRef, type StyleValue } from 'vue'
import { describe, expect, it } from 'vitest'
import { useContent } from '@/composables/useContent'

// cualquier config de contenido: class y style más atributos, props y callbacks de reka
type ContentConfig = { class?: string; style?: StyleValue; [key: string]: unknown }

describe('useContent', () => {
  it('aplica los valores por defecto del contenido', () => {
    const content = useContent(shallowRef<ContentConfig | undefined>(undefined))

    expect(content.value).toMatchObject({
      align: 'center',
      alignFlip: true,
      alignOffset: 0,
      arrowPadding: 0,
      avoidCollisions: true,
      collisionPadding: 8,
      disableUpdateOnLayoutShift: false,
      hideShiftedArrow: true,
      hideWhenDetached: false,
      positionStrategy: 'fixed',
      prioritizePosition: false,
      side: 'bottom',
      sideFlip: true,
      sideOffset: 4,
      sticky: 'partial',
      updatePositionStrategy: 'optimized',
    })
    expect(content.value.class).toBe('')
  })

  it('sobrescribe los defaults y conserva atributos, clases y estilos', () => {
    const content = useContent(
      shallowRef<ContentConfig>({
        side: 'top',
        sideOffset: 12,
        class: 'custom-content',
        style: { opacity: 0.5 },
        'aria-label': 'Content',
      }),
    )

    expect(content.value).toMatchObject({
      side: 'top',
      sideOffset: 12,
      class: 'custom-content',
      style: { opacity: 0.5 },
      'aria-label': 'Content',
    })
  })

  it('conserva los callbacks de Reka como props', () => {
    const onFocusOutside = () => undefined
    const onEscapeKeyDown = () => undefined
    const content = useContent(shallowRef<ContentConfig>({ onFocusOutside, onEscapeKeyDown }))

    expect(content.value.onFocusOutside).toBe(onFocusOutside)
    expect(content.value.onEscapeKeyDown).toBe(onEscapeKeyDown)
  })

  it('recalcula la configuración cuando cambia la ref', () => {
    const input = shallowRef<ContentConfig>({ side: 'left' })
    const content = useContent(input)

    expect(content.value.side).toBe('left')
    input.value = { side: 'right', align: 'end' }

    expect(content.value).toMatchObject({ side: 'right', align: 'end' })
  })
})
