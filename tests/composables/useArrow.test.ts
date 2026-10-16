import { shallowRef, type StyleValue } from 'vue'
import { describe, expect, it } from 'vitest'
import { useArrow } from '@/composables/useArrow'

// cualquier config de flecha: class y style más atributos y props de reka
type ArrowConfig = { class?: string; style?: StyleValue; [key: string]: unknown }

describe('useArrow', () => {
  it('aplica los valores por defecto', () => {
    const arrow = useArrow(shallowRef<ArrowConfig | undefined>(undefined))

    expect(arrow.value).toMatchObject({ width: 10, height: 5, rounded: false })
    expect(arrow.value.class).toBe('')
  })

  it('conserva las props, atributos y estilos configurados', () => {
    const arrow = useArrow(
      shallowRef<ArrowConfig>({
        width: 12,
        height: 8,
        rounded: true,
        class: 'fill-popover custom-arrow',
        style: { opacity: 0.5 },
        'aria-label': 'Arrow',
      }),
    )

    expect(arrow.value).toMatchObject({
      width: 12,
      height: 8,
      rounded: true,
      class: 'fill-popover custom-arrow',
      style: { opacity: 0.5 },
      'aria-label': 'Arrow',
    })
  })

  it('recalcula la configuración cuando cambia la ref', () => {
    const input = shallowRef<ArrowConfig>({ width: 6 })
    const arrow = useArrow(input)

    expect(arrow.value.width).toBe(6)
    input.value = { width: 14, rounded: true }

    expect(arrow.value).toMatchObject({ width: 14, height: 5, rounded: true })
  })
})
