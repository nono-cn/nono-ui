import { describe, expect, it } from 'vitest'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'

describe('normalizeHTMLAttributes', () => {
  it('devuelve un objeto vacío cuando no se proporcionan atributos', () => {
    expect(normalizeHTMLAttributes(undefined)).toEqual({})
  })

  it('conserva atributos nativos de HTML, SVG y MathML', () => {
    const attributes = {
      id: 'elemento',
      disabled: true,
      viewBox: '0 0 24 24',
      mathvariant: 'bold',
    }

    expect(normalizeHTMLAttributes(attributes)).toEqual(attributes)
  })

  it('conserva atributos aria y data sin modificar sus claves ni valores', () => {
    const attributes = {
      'ARIA-label': 'Cerrar',
      'DATA-test-id': 'dialog-close',
      tabindex: 0,
    }

    expect(normalizeHTMLAttributes(attributes)).toEqual(attributes)
  })

  it('elimina propiedades que no son atributos nativos', () => {
    const attributes = {
      id: 'elemento',
      variant: 'primary',
      loadingText: 'Cargando',
      onCustomEvent: () => undefined,
    }

    expect(normalizeHTMLAttributes(attributes)).toEqual({ id: 'elemento' })
  })

  it('no modifica el objeto original', () => {
    const attributes = { title: 'Título', customProp: 'valor' }

    normalizeHTMLAttributes(attributes)

    expect(attributes).toEqual({ title: 'Título', customProp: 'valor' })
  })
})
