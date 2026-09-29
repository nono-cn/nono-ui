import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Announcer, type AnnouncerProps } from '@/components/ui/Announcer'
import { testAttrs } from '../utils/testAttrs'

function mountAnnouncer(options: MountingOptions<AnnouncerProps> = {}) {
  return mount(Announcer, options)
}

const casesAtomic = [
  { input: true, expected: 'true' },
  { input: false, expected: 'false' },
  { input: undefined, expected: 'true' },
]

const casesMessage = [
  { input: 'Guardado', expected: 'Guardado' },
  { input: '', expected: '' },
  { input: undefined, expected: '' },
]

const casesPoliteness = [
  { input: 'assertive' as const, expectedLive: 'assertive', expectedRole: 'alert' },
  { input: 'polite' as const, expectedLive: 'polite', expectedRole: 'status' },
  { input: 'off' as const, expectedLive: 'off', expectedRole: undefined },
  { input: undefined, expectedLive: 'polite', expectedRole: 'status' },
]

describe('Announcer', () => {
  describe('props', () => {
    describe('atomic', () => {
      it.each(casesAtomic)(
        'renderiza atomic=$input como aria-atomic=$expected',
        ({ input, expected }) => {
          const root = mountAnnouncer({ props: { atomic: input } }).get(
            '[data-test-announcer-root]',
          )

          expect(root.attributes('aria-atomic')).toBe(expected)
        },
      )
    })

    describe('message', () => {
      it.each(casesMessage)('renderiza message=$input como "$expected"', ({ input, expected }) => {
        const root = mountAnnouncer({ props: { message: input } }).get('[data-test-announcer-root]')

        expect(root.text().trim()).toBe(expected)
      })

      it('mantiene la prop message oculta visualmente cuando no se proporciona un slot', () => {
        const root = mountAnnouncer({
          props: { message: 'Anuncio personalizado' },
        }).get('[data-test-announcer-root]')

        expect(root.classes()).toContain('sr-only')
      })
    })

    describe('politeness', () => {
      it.each(casesPoliteness)(
        'renderiza politeness=$input como aria-live=$expectedLive y role=$expectedRole',
        ({ input, expectedLive, expectedRole }) => {
          const root = mountAnnouncer({ props: { politeness: input } }).get(
            '[data-test-announcer-root]',
          )

          expect(root.attributes('aria-live')).toBe(expectedLive)
          expect(root.attributes('role')).toBe(expectedRole)
        },
      )
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-announcer-root]',
      mount: (attrs) => mountAnnouncer({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza visiblemente el slot y sustituye message', () => {
        const announcer = mountAnnouncer({
          props: { message: 'Mensaje alternativo' },
          slots: {
            default: () => h('span', { 'data-test-announcer-slot': '' }, 'Anuncio personalizado'),
          },
        })
        const root = announcer.get('[data-test-announcer-root]')

        expect(announcer.get('[data-test-announcer-slot]').text()).toBe('Anuncio personalizado')
        expect(root.text()).not.toContain('Mensaje alternativo')
        expect(root.classes()).not.toContain('sr-only')
      })
    })
  })
})
