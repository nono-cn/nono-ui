import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { createMemoryHistory, createRouter, RouterLink } from 'vue-router'
import { describe, expect, it } from 'vitest'

import { Button } from '@/components/ui/Button'
import { Link, type LinkProps } from '@/components/ui/Link'
import { testAttrs } from '../utils/testAttrs'
import { testButtonConfig } from '../utils/testButtonConfig'

export function mountLink(options: MountingOptions<LinkProps> & Record<string, unknown> = {}) {
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
  {
    name: 'sin destino',
    input: undefined,
    expected: { tag: 'DIV', href: undefined, router: false },
  },
  { name: 'una ruta interna', input: '/docs', expected: { tag: 'A', href: '/docs', router: true } },
  {
    name: 'una ruta interna con query y hash',
    input: '/docs?tab=api#props',
    expected: { tag: 'A', href: '/docs?tab=api#props', router: true },
  },
  {
    name: 'una ruta por nombre',
    input: { name: 'docs' },
    expected: { tag: 'A', href: '/docs', router: true },
  },
  {
    name: 'una ruta por objeto con query',
    input: { path: '/docs', query: { tab: 'api' } },
    expected: { tag: 'A', href: '/docs?tab=api', router: true },
  },
  {
    name: 'una URL externa',
    input: 'https://example.com/docs',
    expected: { tag: 'A', href: 'https://example.com/docs', router: false },
  },
  {
    name: 'una URL sin protocolo explícito',
    input: '//example.com/docs',
    expected: { tag: 'A', href: '//example.com/docs', router: false },
  },
  {
    name: 'un enlace de correo',
    input: 'mailto:hello@example.com',
    expected: { tag: 'A', href: 'mailto:hello@example.com', router: false },
  },
] satisfies {
  name: string
  input: LinkProps['to']
  expected: { tag: string; href?: string; router: boolean }
}[]

const casesReplace = [
  { name: 'el valor por defecto', input: undefined, expected: false },
  { name: 'activado', input: true, expected: true },
  { name: 'desactivado', input: false, expected: false },
]

const casesSlotDestinations = [
  { name: 'externo', to: 'https://example.com' },
  { name: 'interno', to: '/docs' },
  { name: 'sin destino', to: undefined },
]

const casesButtonRoot = [
  { name: 'sin destino', to: undefined, as: 'div' },
  { name: 'con destino interno', to: '/docs', as: 'a' },
  { name: 'con destino externo', to: 'https://example.com', as: 'a' },
] satisfies { name: string; to: LinkProps['to']; as: string }[]

describe('Link', () => {
  describe('props', () => {
    describe('to', () => {
      it.each(casesTo)('renderiza $name', ({ input, expected }) => {
        const wrapper = mountLink({ props: { to: input } })
        const root = wrapper.get('[data-test-link-root]')

        expect(root.element.tagName).toBe(expected.tag)
        expect(root.attributes('href')).toBe(expected.href)
        expect(wrapper.findComponent(RouterLink).exists()).toBe(expected.router)
      })
    })

    describe('replace', () => {
      it.each(casesReplace)('pasa $name a RouterLink', ({ input, expected }) => {
        const wrapper = mountLink({ props: { to: '/docs', replace: input } })

        expect(wrapper.getComponent(RouterLink).props('replace')).toBe(expected)
      })

      it('no usa RouterLink para una URL externa', () => {
        const wrapper = mountLink({ props: { to: 'https://example.com', replace: true } })

        expect(wrapper.findComponent(RouterLink).exists()).toBe(false)
        expect(wrapper.get('[data-test-link-root]').attributes('href')).toBe('https://example.com')
      })
    })

    describe('props de Button', () => {
      testButtonConfig({
        text: 'pasa la configuración de button',
        id: '[data-test-link-root]',
        mount: (input) => mountLink({ props: input }),
      })

      it.each(casesButtonRoot)('fija as, asChild y loading $name', ({ to, as }) => {
        const button = mountLink({ props: { to } }).getComponent(Button)

        expect(button.props('as')).toBe(as)
        expect(button.props('asChild')).toBe(false)
        expect(button.props('loading')).toBe(false)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos, la clase y el estilo al enlace externo',
      id: '[data-test-link-root]',
      mount: (attrs) => mountLink({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it.each(casesSlotDestinations)('sustituye label en un enlace $name', ({ to }) => {
        const root = mountLink({
          props: { to, label: 'Etiqueta' },
          slots: {
            default: () => h('span', { 'data-test-link-slot': 'default' }, 'Contenido'),
          },
        }).get('[data-test-link-root]')

        expect(root.get('[data-test-link-slot="default"]').text()).toBe('Contenido')
        expect(root.text()).toBe('Contenido')
      })
    })

    describe('leading', () => {
      it.each(casesSlotDestinations)('sustituye icon en un enlace $name', ({ to }) => {
        const root = mountLink({
          props: { to, icon: 'star', label: 'Etiqueta' },
          slots: {
            leading: () => h('span', { 'data-test-link-slot': 'leading' }, 'Inicio'),
          },
        }).get('[data-test-link-root]')

        expect(root.get('[data-test-link-slot="leading"]').text()).toBe('Inicio')
        expect(root.element.firstElementChild?.getAttribute('data-test-link-slot')).toBe('leading')
        expect(root.find('[data-test-button-icon]').exists()).toBe(false)
      })
    })

    describe('trailing', () => {
      it.each(casesSlotDestinations)('sustituye trailingIcon en un enlace $name', ({ to }) => {
        const root = mountLink({
          props: { to, trailingIcon: 'chevronRight', label: 'Etiqueta' },
          slots: {
            trailing: () => h('span', { 'data-test-link-slot': 'trailing' }, 'Final'),
          },
        }).get('[data-test-link-root]')

        expect(root.get('[data-test-link-slot="trailing"]').text()).toBe('Final')
        expect(root.element.lastElementChild?.getAttribute('data-test-link-slot')).toBe('trailing')
        expect(root.find('[data-test-button-trailing-icon]').exists()).toBe(false)
      })
    })
  })
})
