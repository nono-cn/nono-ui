import { ref } from 'vue'
import { describe, expect, it } from 'vitest'
import type { PopoverArrowConfig } from '@/components/ui/Popover'
import { useArrow } from '@/composables/useArrow'

describe('useArrow', () => {
  it('aplica los valores por defecto', () => {
    const arrow = useArrow(ref<PopoverArrowConfig | undefined>(undefined))

    expect(arrow.value).toMatchObject({ width: 10, height: 5, rounded: false })
    expect(arrow.value.class).toContain('fill-popover')
  })

  it('conserva las props, atributos y estilos configurados', () => {
    const arrow = useArrow(
      ref<PopoverArrowConfig>({
        width: 12,
        height: 8,
        rounded: true,
        id: 'arrow',
        class: 'custom-arrow',
        style: { opacity: 0.5 },
        'aria-label': 'Arrow',
      }),
    )

    expect(arrow.value).toMatchObject({
      width: 12,
      height: 8,
      rounded: true,
      id: 'arrow',
      class: 'fill-popover custom-arrow',
      style: { opacity: 0.5 },
      'aria-label': 'Arrow',
    })
  })

  it('recalcula la configuración cuando cambia la ref', () => {
    const input = ref<PopoverArrowConfig>({ width: 6 })
    const arrow = useArrow(input)

    expect(arrow.value.width).toBe(6)
    input.value = { width: 14, rounded: true }

    expect(arrow.value).toMatchObject({ width: 14, height: 5, rounded: true })
  })
})
