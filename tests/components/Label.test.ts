import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Label, type LabelProps } from '@/components/ui/Label'
import { testAttrs } from '../utils/testAttrs'

function mountLabel(options: MountingOptions<LabelProps> = {}) {
  return mount(Label, options)
}

const casesFor = [
  { input: 'email', expected: 'email' },
  { input: undefined, expected: undefined },
]

describe('Label', () => {
  describe('props', () => {
    describe('for', () => {
      it.each(casesFor)('renderiza for=$input como $expected', ({ input, expected }) => {
        const root = mountLabel({ props: { for: input } }).get('[data-test-label-root]')

        expect(root.attributes('for')).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-label-root]',
      mount: (attrs) => mountLabel({ attrs }),
    })
  })

  describe('variantsCss', () => {
    describe('labelVariants', () => {
      it('mantiene las clases base del label', () => {
        const root = mountLabel().get('[data-test-label-root]')

        expect(root.element.tagName).toBe('LABEL')
        expect(root.classes()).toEqual(
          expect.arrayContaining([
            'flex',
            'items-center',
            'select-none',
            'group-data-[disabled=true]:pointer-events-none',
            'peer-disabled:cursor-not-allowed',
          ]),
        )
      })
    })
  })

  describe('slots', () => {
    it('renderiza el slot predeterminado', () => {
      const label = mountLabel({
        slots: {
          default: () => h('span', { 'data-test-label-slot': '' }, 'Dirección de correo'),
        },
      })

      expect(label.get('[data-test-label-slot]').text()).toBe('Dirección de correo')
    })
  })
})
