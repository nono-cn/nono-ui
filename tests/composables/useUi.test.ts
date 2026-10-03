import { describe, expect, it, vi } from 'vitest'
import { useUi } from '@/composables/useUi'

describe('useUi', () => {
  it('normaliza el valor devuelto por la función', () => {
    const ui = () => ({ class: 'text-primary', 'aria-label': 'Guardar', invalid: true })

    expect(useUi(ui, { disabled: false })).toEqual({
      class: 'text-primary',
      'aria-label': 'Guardar',
    })
  })

  it('resuelve una función con el contexto recibido', () => {
    const context = { active: true, size: 'lg' }
    const resolveUi = vi.fn((value: typeof context) => ({
      class: value.active ? `button-${value.size}-active` : `button-${value.size}`,
    }))

    expect(useUi(resolveUi, context)).toEqual({ class: 'button-lg-active' })
    expect(resolveUi).toHaveBeenCalledOnce()
    expect(resolveUi).toHaveBeenCalledWith(context)
  })

  it('devuelve un objeto vacío cuando no se proporciona un valor', () => {
    expect(useUi(undefined, { disabled: false })).toEqual({})
  })
})
