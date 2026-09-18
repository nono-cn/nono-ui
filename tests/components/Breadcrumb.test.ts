import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it, vi } from 'vitest'

import {
  Breadcrumb,
  type BreadcrumbEllipsisContext,
  type BreadcrumbItem,
  type BreadcrumbItemContext,
  type BreadcrumbProps,
} from '@/components/ui/Breadcrumb'
import { Link } from '@/components/ui/Link'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'
import { testIconConfig } from '../utils/testIconConfig'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Inicio', to: '/' },
  { slot: 'library', label: 'Biblioteca', to: '/library' },
  { slot: 'current', label: 'Actual', icon: { name: 'check' } },
]

const casesSlot = [{ input: 'home' }, { input: 'section' }]

const casesEllipsisIndex = [
  { input: undefined, visible: false },
  { input: [0, 1] as [number, number], visible: true },
  { input: [-1, 1] as [number, number], visible: false },
  { input: [2, 1] as [number, number], visible: false },
  { input: [3, 3] as [number, number], visible: false },
]

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/library', name: 'library', component: { template: '<div />' } },
    ],
  })
}

function mountBreadcrumb(options: MountingOptions<BreadcrumbProps> = {}) {
  const router = createTestRouter()
  const global = options.global ?? {}

  return mount(Breadcrumb, {
    ...options,
    global: {
      ...global,
      plugins: [i18n, router, ...(global.plugins ?? [])],
    },
  })
}

describe('Breadcrumb', () => {
  describe('props', () => {
    describe('items', () => {
      it('no renderiza items por defecto', () => {
        const wrapper = mountBreadcrumb()

        expect(wrapper.find('[data-test-breadcrumb-item]').exists()).toBe(false)
        expect(wrapper.get('[data-test-breadcrumb-list]').exists()).toBe(true)
      })

      describe('slot', () => {
        it.each(casesSlot)('usa slot=$input para identificar el item', ({ input }) => {
          const wrapper = mountBreadcrumb({
            props: { items: [{ slot: input, label: 'Elemento' }] },
          })

          expect(wrapper.get(`[data-test-breadcrumb-item="${input}"]`).exists()).toBe(true)
        })
      })

      describe('item', () => {
        it.each(items)('pasa los campos del item slot=$slot a Link', (item) => {
          const wrapper = mountBreadcrumb({ props: { items: [item] } })
          const link = wrapper.getComponent(Link)

          expect(link.props()).toMatchObject({
            label: item.label,
            icon: item.icon,
            to: item.to,
          })
        })
      })

      describe('command', () => {
        it('ejecuta command al hacer clic en un item enlazado', async () => {
          const command = vi.fn()
          const wrapper = mountBreadcrumb({
            props: { items: [{ ...items[0], command }] },
          })

          await wrapper.get('[data-test-breadcrumb-link]').trigger('click')

          expect(command).toHaveBeenCalledTimes(1)
          expect(command).toHaveBeenCalledWith(expect.any(Event))
        })

        it('no ejecuta command en el item de la página actual', async () => {
          const command = vi.fn()
          const wrapper = mountBreadcrumb({
            props: { items: [{ ...items[2], command }] },
          })

          await wrapper.get('[data-test-breadcrumb-page]').trigger('click')

          expect(command).not.toHaveBeenCalled()
        })
      })
    })

    describe('ellipsisIndex', () => {
      it.each(casesEllipsisIndex)(
        'renderiza ellipsis=$visible para range=$input',
        ({ input, visible }) => {
          const wrapper = mountBreadcrumb({ props: { items, ellipsisIndex: input } })

          expect(wrapper.find('[data-test-breadcrumb-ellipsis]').exists()).toBe(visible)
        },
      )

      it('oculta los items afectados y mantiene visible el item de elipsis', () => {
        const wrapper = mountBreadcrumb({ props: { items, ellipsisIndex: [0, 1] } })

        expect(wrapper.get('[data-test-breadcrumb-ellipsis]').exists()).toBe(true)
        expect(wrapper.findAll('[data-test-breadcrumb-item]')).toHaveLength(1)
        expect(wrapper.get('[data-test-breadcrumb-page]').text()).toBe('Actual')
        expect(wrapper.find('[data-test-breadcrumb-item="home"]').exists()).toBe(false)
        expect(wrapper.find('[data-test-breadcrumb-item="library"]').exists()).toBe(false)
        expect(wrapper.find('[data-test-breadcrumb-item="current"]').exists()).toBe(true)
      })
    })

    describe('ellipsisIcon', () => {
      testIconConfig({
        text: 'renderiza ellipsisIcon',
        id: '[data-test-breadcrumb-ellipsis] [data-test-icon-root]',
        default: 'moreHorizontal',
        mount: (input) =>
          mountBreadcrumb({
            props: { items, ellipsisIndex: [0, 1], ellipsisIcon: input },
          }),
      })
    })

    describe('separatorIcon', () => {
      testIconConfig({
        text: 'renderiza separatorIcon',
        id: '[data-test-breadcrumb-separator] [data-test-icon-root]',
        default: 'chevronRight',
        mount: (input) => mountBreadcrumb({ props: { items, separatorIcon: input } }),
      })
    })

    describe('ui', () => {
      testAttrs({
        text: 'pasa atributos, clase y estilo mediante ui.list',
        id: '[data-test-breadcrumb-list]',
        mount: (attrs) => mountBreadcrumb({ props: { items, ui: { list: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa atributos, clase y estilo mediante ui.ellipsisContainer',
        id: '[data-test-breadcrumb-ellipsis]',
        mount: (attrs) =>
          mountBreadcrumb({
            props: { items, ellipsisIndex: [0, 1], ui: { ellipsisContainer: () => attrs } },
          }),
      })

      testAttrs({
        text: 'pasa atributos, clase y estilo mediante ui.separatorContainer',
        id: '[data-test-breadcrumb-separator]',
        mount: (attrs) =>
          mountBreadcrumb({ props: { items, ui: { separatorContainer: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa atributos, clase y estilo mediante ui.item',
        id: '[data-test-breadcrumb-item]',
        mount: (attrs) => mountBreadcrumb({ props: { items, ui: { item: () => attrs } } }),
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-breadcrumb-root]',
      mount: (attrs) => mountBreadcrumb({ attrs }),
    })
  })

  describe('context contract', () => {
    it('pasa el itemContext completo', () => {
      let uiContext: BreadcrumbItemContext | undefined
      let slotContext: BreadcrumbItemContext | undefined

      mountBreadcrumb({
        props: {
          items,
          ui: {
            item: (context) => {
              uiContext ??= context
              return {}
            },
          },
        },
        slots: {
          item: (context: BreadcrumbItemContext) => {
            slotContext ??= context
            return h('span', 'Elemento personalizado')
          },
        },
      })

      expect(uiContext).toEqual({
        item: items[0],
        index: 0,
        first: true,
        last: false,
        linked: true,
        ellipsis: false,
      })
      const { ref_for: _slotRefFor, ...slotContextWithoutRenderMetadata } =
        slotContext as BreadcrumbItemContext & {
          ref_for?: boolean
        }
      void _slotRefFor

      expect(slotContextWithoutRenderMetadata).toEqual(uiContext)
    })

    it('pasa solo los items afectados a ellipsisContext', () => {
      let context: BreadcrumbEllipsisContext | undefined

      mountBreadcrumb({
        props: { items, ellipsisIndex: [0, 1] },
        slots: {
          ellipsis: (slotContext: BreadcrumbEllipsisContext) => {
            context = slotContext
            return h('span', 'Más')
          },
        },
      })

      const { ref_for: _refFor, ...contextWithoutRenderMetadata } =
        context as BreadcrumbEllipsisContext & {
          ref_for?: boolean
        }
      void _refFor

      expect(contextWithoutRenderMetadata).toEqual({ items: [items[1]] })
    })
  })

  describe('slots', () => {
    it('renderiza el slot ellipsis', () => {
      const wrapper = mountBreadcrumb({
        props: { items, ellipsisIndex: [0, 1] },
        slots: { ellipsis: () => h('span', { 'data-test-breadcrumb-slot': 'ellipsis' }, 'Más') },
      })

      expect(wrapper.get('[data-test-breadcrumb-slot="ellipsis"]').text()).toBe('Más')
      expect(wrapper.find('[data-test-breadcrumb-ellipsis] [data-test-icon-root]').exists()).toBe(
        false,
      )
    })

    it('renderiza el slot separator', () => {
      const wrapper = mountBreadcrumb({
        props: { items },
        slots: { separator: () => h('span', { 'data-test-breadcrumb-slot': 'separator' }, '|') },
      })

      expect(wrapper.get('[data-test-breadcrumb-slot="separator"]').text()).toBe('|')
    })

    it('renderiza el slot item', () => {
      const wrapper = mountBreadcrumb({
        props: { items },
        slots: {
          item: () => h('span', { 'data-test-breadcrumb-slot': 'item' }, 'Elemento personalizado'),
        },
      })

      expect(wrapper.get('[data-test-breadcrumb-slot="item"]').text()).toBe(
        'Elemento personalizado',
      )
    })

    it('renderiza el slot item específico del item', () => {
      const wrapper = mountBreadcrumb({
        props: { items },
        slots: {
          'item-home': () =>
            h('span', { 'data-test-breadcrumb-slot': 'item-home' }, 'Slot de inicio'),
        },
      })

      expect(wrapper.get('[data-test-breadcrumb-slot="item-home"]').text()).toBe('Slot de inicio')
    })
  })
})
