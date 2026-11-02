import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Card, type CardProps } from '@/components/Card'
import { testAttrs } from '../utils/testAttrs'

function mountCard(options: MountingOptions<CardProps> = {}) {
  return mount(Card, options)
}

describe('Card', () => {
  describe('props', () => {
    describe('label', () => {
      const casesLabel = [
        {
          text: 'con label pinta el header y dentro el label con ese texto',
          input: { label: 'Resumen' },
          expected: {
            header: { exists: true },
            label: { exists: true, text: 'Resumen' },
          },
        },
        {
          text: 'sin label no pinta ni el header ni el label',
          input: {},
          expected: {
            header: { exists: false },
            label: { exists: false, text: undefined },
          },
        },
      ] as const

      it.each(casesLabel)('$text', ({ input, expected }) => {
        const card = mountCard({ props: input })
        const label = card.find('[data-test-card-label]')

        expect({
          header: { exists: card.find('[data-test-card-header]').exists() },
          label: {
            exists: label.exists(),
            text: label.exists() ? label.text() : undefined,
          },
        }).toEqual(expected)
      })
    })

    describe('description', () => {
      const casesDescription = [
        {
          text: 'con description pinta el header y dentro la description con ese texto',
          input: { description: 'Últimos 30 días' },
          expected: {
            header: { exists: true },
            description: { exists: true, text: 'Últimos 30 días' },
          },
        },
        {
          text: 'sin description no pinta ni el header ni la description',
          input: {},
          expected: {
            header: { exists: false },
            description: { exists: false, text: undefined },
          },
        },
      ] as const

      it.each(casesDescription)('$text', ({ input, expected }) => {
        const card = mountCard({ props: input })
        const description = card.find('[data-test-card-description]')

        expect({
          header: { exists: card.find('[data-test-card-header]').exists() },
          description: {
            exists: description.exists(),
            text: description.exists() ? description.text() : undefined,
          },
        }).toEqual(expected)
      })
    })

    describe('ui', () => {
      describe('header', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.header a la cabecera',
          id: '[data-test-card-header]',
          ownClass: 'px-6',
          conflictingClass: 'px-2',
          normalized: true,
          mount: (attrs) => mountCard({ props: { label: 'Resumen', ui: { header: () => attrs } } }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.label al título',
          id: '[data-test-card-label]',
          ownClass: 'font-semibold',
          conflictingClass: 'font-bold',
          normalized: true,
          mount: (attrs) => mountCard({ props: { label: 'Resumen', ui: { label: () => attrs } } }),
        })
      })

      describe('description', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.description a la descripción',
          id: '[data-test-card-description]',
          ownClass: 'text-sm',
          conflictingClass: 'text-lg',
          normalized: true,
          mount: (attrs) =>
            mountCard({
              props: { description: 'Últimos 30 días', ui: { description: () => attrs } },
            }),
        })
      })

      describe('action', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.action a la acción',
          id: '[data-test-card-action]',
          ownClass: 'justify-self-end',
          conflictingClass: 'justify-self-start',
          notOverridable: ['data-slot'],
          normalized: true,
          mount: (attrs) =>
            mountCard({
              props: { ui: { action: () => attrs } },
              slots: { action: 'Ver todo' },
            }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.content al contenido',
          id: '[data-test-card-content]',
          ownClass: 'px-6',
          conflictingClass: 'px-2',
          normalized: true,
          mount: (attrs) =>
            mountCard({
              props: { ui: { content: () => attrs } },
              slots: { default: 'Contenido' },
            }),
        })
      })

      describe('footer', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.footer al pie',
          id: '[data-test-card-footer]',
          ownClass: 'px-6',
          conflictingClass: 'px-2',
          normalized: true,
          mount: (attrs) =>
            mountCard({
              props: { ui: { footer: () => attrs } },
              slots: { footer: 'Pie' },
            }),
        })
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('se pinta dentro del content', () => {
        const card = mountCard({ slots: { default: () => h('p', 'Contenido') } })

        expect(card.get('[data-test-card-content]').text()).toBe('Contenido')
      })

      it('sin slot default no pinta el content', () => {
        const card = mountCard()

        expect(card.find('[data-test-card-content]').exists()).toBe(false)
      })
    })

    describe('header', () => {
      it('se pinta dentro del header', () => {
        const card = mountCard({ slots: { header: () => h('span', 'Cabecera') } })

        expect(card.get('[data-test-card-header]').text()).toBe('Cabecera')
      })

      it('sustituye al label, a la description y al action', () => {
        const card = mountCard({
          props: { label: 'Resumen', description: 'Últimos 30 días' },
          slots: { header: () => h('span', 'Cabecera'), action: () => h('button', 'Ver todo') },
        })

        expect({
          label: card.find('[data-test-card-label]').exists(),
          description: card.find('[data-test-card-description]').exists(),
          action: card.find('[data-test-card-action]').exists(),
        }).toEqual({ label: false, description: false, action: false })
      })
    })

    describe('label', () => {
      it('se pinta dentro del label', () => {
        const card = mountCard({ slots: { label: () => h('strong', 'Título') } })

        expect(card.get('[data-test-card-label]').text()).toBe('Título')
      })

      it('sustituye al texto de la prop label', () => {
        const card = mountCard({
          props: { label: 'Resumen' },
          slots: { label: () => h('strong', 'Título') },
        })

        expect(card.get('[data-test-card-label]').text()).toBe('Título')
      })
    })

    describe('description', () => {
      it('se pinta dentro de la description', () => {
        const card = mountCard({ slots: { description: () => h('em', 'Detalle') } })

        expect(card.get('[data-test-card-description]').text()).toBe('Detalle')
      })

      it('sustituye al texto de la prop description', () => {
        const card = mountCard({
          props: { description: 'Últimos 30 días' },
          slots: { description: () => h('em', 'Detalle') },
        })

        expect(card.get('[data-test-card-description]').text()).toBe('Detalle')
      })
    })

    describe('action', () => {
      it('se pinta dentro del action, en el header', () => {
        const card = mountCard({ slots: { action: () => h('button', 'Ver todo') } })

        expect(card.get('[data-test-card-header] [data-test-card-action]').text()).toBe('Ver todo')
      })

      it('sin slot action no pinta el action', () => {
        const card = mountCard({ props: { label: 'Resumen' } })

        expect(card.find('[data-test-card-action]').exists()).toBe(false)
      })
    })

    describe('footer', () => {
      it('se pinta dentro del footer', () => {
        const card = mountCard({ slots: { footer: () => h('small', 'Actualizado hoy') } })

        expect(card.get('[data-test-card-footer]').text()).toBe('Actualizado hoy')
      })

      it('sin slot footer no pinta el footer', () => {
        const card = mountCard()

        expect(card.find('[data-test-card-footer]').exists()).toBe(false)
      })
    })
  })
})
