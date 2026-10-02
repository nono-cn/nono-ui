import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { FieldSet, type FieldSetProps } from '@/components/ui/FieldSet'
import { testAttrs } from '../utils/testAttrs'

function mountFieldSet(options: MountingOptions<FieldSetProps> = {}) {
  return mount(FieldSet, options)
}

const casesLegend = [
  { input: 'Perfil', expected: 'Perfil' },
  { input: '', expected: undefined },
  { input: undefined, expected: undefined },
]

const casesDescription = [
  { input: 'Datos de contacto', expected: 'Datos de contacto' },
  { input: '', expected: undefined },
  { input: undefined, expected: undefined },
]

const casesLegendVariant = [
  { input: 'legend' as const, expected: 'text-base' },
  { input: 'label' as const, expected: 'text-sm' },
  { input: undefined, expected: 'text-base' },
]

describe('FieldSet', () => {
  it('renderiza un fieldset con el contenido dentro del grupo', () => {
    const fieldSet = mountFieldSet({ slots: { default: () => h('input', { id: 'field' }) } })

    expect(fieldSet.get('[data-test-field-set-root]').element.tagName).toBe('FIELDSET')
    expect(fieldSet.get('[data-test-field-set-group] input').attributes('id')).toBe('field')
  })

  describe('props', () => {
    describe('legend', () => {
      it.each(casesLegend)('renderiza legend=$input', ({ input, expected }) => {
        const fieldSet = mountFieldSet({ props: { legend: input } })

        expect(fieldSet.find('[data-test-field-set-legend]').exists()).toBe(Boolean(expected))
        if (expected) expect(fieldSet.get('[data-test-field-set-legend]').text()).toBe(expected)
      })
    })

    describe('description', () => {
      it.each(casesDescription)('renderiza description=$input', ({ input, expected }) => {
        const fieldSet = mountFieldSet({ props: { description: input } })

        expect(fieldSet.find('[data-test-field-set-description]').exists()).toBe(Boolean(expected))
        if (expected) {
          expect(fieldSet.get('[data-test-field-set-description]').text()).toBe(expected)
        }
      })
    })

    describe('legendVariant', () => {
      it.each(casesLegendVariant)('renderiza legendVariant=$input', ({ input, expected }) => {
        const legend = mountFieldSet({ props: { legend: 'Perfil', legendVariant: input } }).get(
          '[data-test-field-set-legend]',
        )

        expect(legend.classes()).toContain(expected)
      })
    })

    describe('ui', () => {
      describe('legend', () => {
        testAttrs({
          text: 'pasa los atributos de ui.legend',
          id: '[data-test-field-set-legend]',
          mount: (attrs) =>
            mountFieldSet({
              props: { legend: 'Perfil', ui: { legend: () => attrs } },
            }),
        })
      })

      describe('description', () => {
        testAttrs({
          text: 'pasa los atributos de ui.description',
          id: '[data-test-field-set-description]',
          mount: (attrs) =>
            mountFieldSet({
              props: { description: 'Datos de contacto', ui: { description: () => attrs } },
            }),
        })
      })

      describe('group', () => {
        testAttrs({
          text: 'pasa los atributos de ui.group',
          id: '[data-test-field-set-group]',
          mount: (attrs) => mountFieldSet({ props: { ui: { group: () => attrs } } }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-field-set-root]',
      mount: (attrs) => mountFieldSet({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot predeterminado', () => {
        const fieldSet = mountFieldSet({
          slots: {
            default: () =>
              h('span', { 'data-test-field-set-slot': 'default' }, 'Slot predeterminado'),
          },
        })

        expect(fieldSet.get('[data-test-field-set-slot="default"]').text()).toBe(
          'Slot predeterminado',
        )
      })
    })

    describe('legend', () => {
      it('renderiza la leyenda cuando solo se proporciona el slot', () => {
        const fieldSet = mountFieldSet({ slots: { legend: () => h('span', 'Leyenda') } })

        expect(fieldSet.get('[data-test-field-set-legend]').text()).toBe('Leyenda')
      })

      it('renderiza el slot legend y oculta el valor alternativo', () => {
        const fieldSet = mountFieldSet({
          props: { legend: 'Leyenda alternativa' },
          slots: {
            legend: () =>
              h('span', { 'data-test-field-set-slot': 'legend' }, 'Leyenda personalizada'),
          },
        })

        expect(fieldSet.get('[data-test-field-set-slot="legend"]').text()).toBe(
          'Leyenda personalizada',
        )
        expect(fieldSet.get('[data-test-field-set-root]').text()).not.toContain(
          'Leyenda alternativa',
        )
      })
    })

    describe('description', () => {
      it('renderiza la descripción cuando solo se proporciona el slot', () => {
        const fieldSet = mountFieldSet({
          slots: { description: () => h('span', 'Ayuda') },
        })

        expect(fieldSet.get('[data-test-field-set-description]').text()).toBe('Ayuda')
      })

      it('renderiza el slot description y oculta el valor alternativo', () => {
        const fieldSet = mountFieldSet({
          props: { description: 'Descripción alternativa' },
          slots: {
            description: () =>
              h('span', { 'data-test-field-set-slot': 'description' }, 'Descripción personalizada'),
          },
        })

        expect(fieldSet.get('[data-test-field-set-slot="description"]').text()).toBe(
          'Descripción personalizada',
        )
        expect(fieldSet.get('[data-test-field-set-root]').text()).not.toContain(
          'Descripción alternativa',
        )
      })
    })
  })
})
