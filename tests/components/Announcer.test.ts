import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Announcer, type AnnouncerProps } from '@/components/Announcer'

import { testAttrs } from '../utils/testAttrs'

function mountAnnouncer(options: MountingOptions<AnnouncerProps> = {}) {
  return mount(Announcer, options)
}

describe('Announcer', () => {
  describe('props', () => {
    describe('message', () => {
      const casesMessage = [
        {
          text: 'sin message no anuncia nada',
          input: {},
          expected: { root: { text: '' } },
        },
        {
          text: 'con message pinta ese mensaje dentro de la región',
          input: { message: 'Cambios guardados' },
          expected: { root: { text: 'Cambios guardados' } },
        },
      ] as const

      it.each(casesMessage)('$text', ({ input, expected }) => {
        const root = mountAnnouncer({ props: input }).get('[data-test-announcer-root]')

        expect({
          root: { text: root.text() },
        }).toEqual(expected)
      })
    })

    describe('politeness', () => {
      const casesPoliteness = [
        {
          text: 'sin politeness usa announcerDefaults.politeness: aria-live=polite y role=status',
          input: {},
          expected: { root: { 'aria-live': 'polite', role: 'status' } },
        },
        {
          text: 'con politeness=polite tiene aria-live=polite y role=status',
          input: { politeness: 'polite' },
          expected: { root: { 'aria-live': 'polite', role: 'status' } },
        },
        {
          text: 'con politeness=assertive tiene aria-live=assertive y role=alert',
          input: { politeness: 'assertive' },
          expected: { root: { 'aria-live': 'assertive', role: 'alert' } },
        },
        {
          text: 'con politeness=off tiene aria-live=off y no tiene role',
          input: { politeness: 'off' },
          expected: { root: { 'aria-live': 'off', role: undefined } },
        },
      ] as const

      it.each(casesPoliteness)('$text', ({ input, expected }) => {
        const root = mountAnnouncer({ props: input }).get('[data-test-announcer-root]')

        expect({
          root: { 'aria-live': root.attributes('aria-live'), role: root.attributes('role') },
        }).toEqual(expected)
      })
    })

    describe('atomic', () => {
      const casesAtomic = [
        {
          text: 'sin atomic usa announcerDefaults.atomic: aria-atomic=true',
          input: {},
          expected: { root: { 'aria-atomic': 'true' } },
        },
        {
          text: 'con atomic=true tiene aria-atomic=true',
          input: { atomic: true },
          expected: { root: { 'aria-atomic': 'true' } },
        },
        {
          text: 'con atomic=false tiene aria-atomic=false',
          input: { atomic: false },
          expected: { root: { 'aria-atomic': 'false' } },
        },
      ] as const

      it.each(casesAtomic)('$text', ({ input, expected }) => {
        const root = mountAnnouncer({ props: input }).get('[data-test-announcer-root]')

        expect({
          root: { 'aria-atomic': root.attributes('aria-atomic') },
        }).toEqual(expected)
      })
    })

    describe('visible', () => {
      const casesVisible = [
        {
          text: 'sin visible usa announcerDefaults.visible: está oculto visualmente con sr-only',
          input: {},
          expected: { root: { srOnly: true } },
        },
        {
          text: 'con visible=false está oculto visualmente con sr-only',
          input: { visible: false },
          expected: { root: { srOnly: true } },
        },
        {
          text: 'con visible=true se muestra en la página sin sr-only',
          input: { visible: true },
          expected: { root: { srOnly: false } },
        },
      ] as const

      it.each(casesVisible)('$text', ({ input, expected }) => {
        const root = mountAnnouncer({ props: input }).get('[data-test-announcer-root]')

        expect({
          root: { srOnly: root.classes().includes('sr-only') },
        }).toEqual(expected)
      })

      it('con visible=true sigue siendo una región viva', () => {
        const root = mountAnnouncer({ props: { visible: true } }).get('[data-test-announcer-root]')

        expect({
          'aria-live': root.attributes('aria-live'),
          role: root.attributes('role'),
        }).toEqual({ 'aria-live': 'polite', role: 'status' })
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('sustituye al message y sigue oculto visualmente', () => {
        const root = mountAnnouncer({
          props: { message: 'Cambios guardados' },
          slots: { default: () => h('strong', 'Sincronizado') },
        }).get('[data-test-announcer-root]')

        expect({
          text: root.text(),
          class: root.classes(),
        }).toEqual({
          text: 'Sincronizado',
          class: expect.arrayContaining(['sr-only']),
        })
      })
    })
  })

  describe('nodos', () => {
    describe('root', () => {
      it('es un span', () => {
        const root = mountAnnouncer().get('[data-test-announcer-root]')

        expect(root.element.tagName).toBe('SPAN')
      })

      testAttrs({
        id: '[data-test-announcer-root]',
        ownClass: 'sr-only',
        conflictingClass: 'not-sr-only',
        // aria-live, aria-atomic y role vienen de sus props
        notOverridable: ['aria-live', 'aria-atomic', 'role'],
        mount: (attrs) => mountAnnouncer({ attrs }),
      })
    })
  })
})
