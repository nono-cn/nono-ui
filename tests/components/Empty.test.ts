import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Empty, emptyMediaVariantNames, type EmptyProps } from '@/components/ui/Empty'
import { testAttrs } from '../utils/testAttrs'

function mountEmpty(options: MountingOptions<EmptyProps> = {}) {
  return mount(Empty, options)
}

const casesLabel = [
  { input: 'Sin resultados', expected: 'Sin resultados' },
  { input: '', expected: undefined },
  { input: undefined, expected: undefined },
]

const casesDescription = [
  { input: 'Prueba otra búsqueda.', expected: 'Prueba otra búsqueda.' },
  { input: '', expected: undefined },
  { input: undefined, expected: undefined },
]

const casesMediaVariant = [
  ...emptyMediaVariantNames.map((input) => ({ input, expected: input })),
  { input: undefined, expected: 'default' as const },
]

describe('Empty', () => {
  describe('props', () => {
    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input', ({ input, expected }) => {
        const empty = mountEmpty({ props: { label: input } })

        expect(empty.find('[data-test-empty-label]').exists()).toBe(Boolean(expected))
        if (expected) expect(empty.get('[data-test-empty-label]').text()).toBe(expected)
      })
    })

    describe('description', () => {
      it.each(casesDescription)('renderiza description=$input', ({ input, expected }) => {
        const empty = mountEmpty({ props: { description: input } })

        expect(empty.find('[data-test-empty-description]').exists()).toBe(Boolean(expected))
        if (expected) expect(empty.get('[data-test-empty-description]').text()).toBe(expected)
      })
    })

    describe('mediaVariant', () => {
      it.each(casesMediaVariant)('renderiza mediaVariant=$input', ({ input, expected }) => {
        const empty = mountEmpty({
          props: { mediaVariant: input },
          slots: { media: () => h('span', 'Contenido multimedia') },
        })

        const media = empty.get('[data-test-empty-media]')

        expect(media.attributes('data-variant')).toBe(expected)
        expect(media.classes().includes('size-10')).toBe(expected === 'icon')
        expect(media.classes().includes('bg-muted')).toBe(expected === 'icon')
        expect(media.classes().includes('text-foreground')).toBe(expected === 'icon')
      })
    })

    describe('ui', () => {
      describe('header', () => {
        testAttrs({
          text: 'pasa los atributos de ui.header',
          id: '[data-test-empty-header]',
          mount: (attrs) =>
            mountEmpty({ props: { label: 'Sin resultados', ui: { header: () => attrs } } }),
        })
      })

      describe('media', () => {
        testAttrs({
          text: 'pasa los atributos de ui.media',
          id: '[data-test-empty-media]',
          mount: (attrs) =>
            mountEmpty({
              props: { ui: { media: () => attrs } },
              slots: { media: () => h('span', 'Contenido multimedia') },
            }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'pasa los atributos de ui.label',
          id: '[data-test-empty-label]',
          mount: (attrs) =>
            mountEmpty({ props: { label: 'Sin resultados', ui: { label: () => attrs } } }),
        })
      })

      describe('description', () => {
        testAttrs({
          text: 'pasa los atributos de ui.description',
          id: '[data-test-empty-description]',
          mount: (attrs) =>
            mountEmpty({
              props: {
                description: 'Prueba otra búsqueda.',
                ui: { description: () => attrs },
              },
            }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'pasa los atributos de ui.content',
          id: '[data-test-empty-content]',
          mount: (attrs) =>
            mountEmpty({
              props: { ui: { content: () => attrs } },
              slots: { default: () => h('button', 'Acción') },
            }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-empty-root]',
      mount: (attrs) => mountEmpty({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot predeterminado dentro de content', () => {
        const empty = mountEmpty({
          slots: {
            default: () => h('span', { 'data-test-empty-slot': 'default' }, 'Slot predeterminado'),
          },
        })

        expect(empty.get('[data-test-empty-slot="default"]').text()).toBe('Slot predeterminado')
        expect(empty.get('[data-test-empty-content]')).toBeTruthy()
      })
    })

    describe('media', () => {
      it('renderiza el slot media', () => {
        const empty = mountEmpty({
          slots: {
            media: () => h('span', { 'data-test-empty-slot': 'media' }, 'Contenido multimedia'),
          },
        })

        expect(empty.get('[data-test-empty-slot="media"]').text()).toBe('Contenido multimedia')
        expect(empty.find('[data-test-empty-media]').exists()).toBe(true)
      })
    })

    describe('label', () => {
      it('sustituye la prop label', () => {
        const empty = mountEmpty({
          props: { label: 'Etiqueta predeterminada' },
          slots: {
            label: () => h('span', { 'data-test-empty-slot': 'label' }, 'Etiqueta personalizada'),
          },
        })

        expect(empty.get('[data-test-empty-slot="label"]').text()).toBe('Etiqueta personalizada')
        expect(empty.text()).not.toContain('Etiqueta predeterminada')
      })
    })

    describe('description', () => {
      it('sustituye la prop description', () => {
        const empty = mountEmpty({
          props: { description: 'Descripción predeterminada' },
          slots: {
            description: () =>
              h('span', { 'data-test-empty-slot': 'description' }, 'Descripción personalizada'),
          },
        })

        expect(empty.get('[data-test-empty-slot="description"]').text()).toBe(
          'Descripción personalizada',
        )
        expect(empty.text()).not.toContain('Descripción predeterminada')
      })
    })
  })
})
