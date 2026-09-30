import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { createMemoryHistory, createRouter, RouterLink } from 'vue-router'
import { describe, expect, it } from 'vitest'

import { Button } from '@/components/ui/Button'
import { Link, type LinkProps } from '@/components/ui/Link'
import { testAttrs } from '../utils/testAttrs'
import { testButtonConfig } from '../utils/testButtonConfig'

function mountLink(options: MountingOptions<LinkProps> & Record<string, unknown> = {}) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/docs', name: 'docs', component: { template: '<div />' } },
    ],
  })
  const global = options.global ?? {}

  return mount(Link, {
    ...options,
    props: {
      to: 'https://example.com',
      ...options.props,
    },
    global: {
      ...global,
      plugins: [router, ...(global.plugins ?? [])],
    },
  })
}

const casesTo = [
  { input: '/docs', tag: 'a', expected: '/docs' },
  { input: 'https://example.com/docs', tag: 'a', expected: 'https://example.com/docs' },
  { input: undefined, tag: 'div', expected: undefined },
]

const casesReplace = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesAs = [
  { to: undefined, expected: 'div' },
  { to: '/docs', expected: 'a' },
  { to: 'https://example.com', expected: 'a' },
]

describe('Link', () => {
  describe('props', () => {
    describe('to', () => {
      it.each(casesTo)(
        'renderiza el elemento y destino correctos para to=$input',
        ({ input, tag, expected }) => {
          const link = mountLink({ props: { to: input } }).get('[data-test-link-root]')

          expect(link.element.tagName.toLowerCase()).toBe(tag)
          expect(link.attributes('href')).toBe(expected)
        },
      )

      it('renderiza objetos RouteLocationRaw', () => {
        const link = mountLink({ props: { to: { name: 'docs' } } })

        expect(link.get('[data-test-link-root]').attributes('href')).toBe('/docs')
      })
    })

    describe('replace', () => {
      it.each(casesReplace)(
        'pasa replace=$input a RouterLink como $expected',
        ({ input, expected }) => {
          const link = mountLink({ props: { to: '/docs', replace: input } })

          expect(link.getComponent(RouterLink).props('replace')).toBe(expected)
        },
      )
    })

    describe('button props', () => {
      testButtonConfig({
        text: 'pasa las props y atributos a Button',
        id: '[data-test-link-root]',
        mount: (input) =>
          mountLink({
            props: { label: input.label },
            attrs: input,
          }),
      })
    })

    describe('button configuration', () => {
      it('usa los valores actuales de color y radius por defecto', () => {
        const button = mountLink().getComponent(Button)

        expect(button.props('color')).toBe('primary')
        expect(button.props('radius')).toBe('md')
      })

      it.each(casesAs)('pasa as=$expected a Button para to=$to', ({ to, expected }) => {
        const button = mountLink({ props: { to } }).getComponent(Button)

        expect(button.props('as')).toBe(expected)
      })

      it('fuerza asChild=false y loading=false', () => {
        const button = mountLink({
          attrs: { as: 'button', asChild: true, loading: true },
        }).getComponent(Button)

        expect(button.props('asChild')).toBe(false)
        expect(button.props('loading')).toBe(false)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-link-root]',
      mount: (attrs) => mountLink({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot predeterminado', () => {
        const link = mountLink({
          slots: {
            default: () => h('span', { 'data-test-link-slot': 'default' }, 'Slot predeterminado'),
          },
        })

        expect(link.get('[data-test-link-slot="default"]').text()).toBe('Slot predeterminado')
      })
    })

    describe('leading', () => {
      it('renderiza el slot inicial', () => {
        const link = mountLink({
          slots: { leading: () => h('span', { 'data-test-link-slot': 'leading' }, 'Slot inicial') },
        })

        expect(link.get('[data-test-link-slot="leading"]').text()).toBe('Slot inicial')
      })
    })

    describe('trailing', () => {
      it('renderiza el slot final', () => {
        const link = mountLink({
          slots: {
            trailing: () => h('span', { 'data-test-link-slot': 'trailing' }, 'Slot final'),
          },
        })

        expect(link.get('[data-test-link-slot="trailing"]').text()).toBe('Slot final')
      })
    })
  })
})
