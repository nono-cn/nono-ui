import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'

import {
  Breadcrumb,
  type BreadcrumbEllipsisContext,
  type BreadcrumbItem,
  type BreadcrumbItemContext,
  type BreadcrumbProps,
  type BreadcrumbVariant,
} from '@/components/ui/Breadcrumb'
import { Icon } from '@/components/ui/Icon'
import { Link } from '@/components/ui/Link'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Inicio', to: '/' },
  { slot: 'library', label: 'Biblioteca', to: '/library' },
  { slot: 'current', label: 'Actual', icon: 'check' },
]

const casesSlot = [{ input: 'home' }, { input: 'section' }]
const casesVariant: BreadcrumbVariant[] = ['plain', 'outlined', 'frame']

const casesEllipsisIndex = [
  { input: undefined, visible: false },
  { input: [0, 1] as [number, number], visible: true },
  { input: [0, 0] as [number, number], visible: false },
  { input: [0, 2] as [number, number], visible: false },
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

      describe('label', () => {
        it('pasa el texto al Link', () => {
          const wrapper = mountBreadcrumb({
            props: { items: [{ slot: 'current', label: 'Actual' }] },
          })
          expect(wrapper.getComponent(Link).props('label')).toBe('Actual')
        })
      })

      describe('icon', () => {
        it('pasa el nombre del icono como string al Link', () => {
          const wrapper = mountBreadcrumb({
            props: { items: [{ slot: 'current', icon: 'check' }] },
          })
          expect(wrapper.getComponent(Link).props('icon')).toBe('check')
        })
      })

      describe('to', () => {
        it('pasa la ruta al Link', () => {
          const wrapper = mountBreadcrumb({ props: { items: [{ slot: 'home', to: '/' }] } })
          expect(wrapper.getComponent(Link).props('to')).toBe('/')
          expect(
            wrapper.get('[data-test-breadcrumb-item="home"] > a[data-test-link-root]').exists(),
          ).toBe(true)
        })

        it('renderiza un Link sin navegación cuando no hay to', () => {
          const wrapper = mountBreadcrumb({ props: { items: [{ slot: 'current' }] } })
          expect(
            wrapper
              .get('[data-test-breadcrumb-item="current"] > div[data-test-link-root]')
              .exists(),
          ).toBe(true)
        })
      })

      describe('size', () => {
        it('pasa el tamaño al Link', () => {
          const wrapper = mountBreadcrumb({
            props: { items: [{ slot: 'home', size: 'sm' }] },
          })
          expect(wrapper.getComponent(Link).props('size')).toBe('sm')
        })
      })

      describe('replace', () => {
        it('pasa replace al Link', () => {
          const wrapper = mountBreadcrumb({
            props: { items: [{ slot: 'home', to: '/', replace: true }] },
          })
          expect(wrapper.getComponent(Link).props('replace')).toBe(true)
        })
      })

      describe('trailingIcon', () => {
        it('pasa el icono final al Link', () => {
          const wrapper = mountBreadcrumb({
            props: { items: [{ slot: 'home', trailingIcon: 'chevronRight' }] },
          })
          expect(wrapper.getComponent(Link).props('trailingIcon')).toBe('chevronRight')
        })
      })

      describe('radius', () => {
        it('pasa radius al Link', () => {
          const wrapper = mountBreadcrumb({
            props: { items: [{ slot: 'home', radius: 'lg' }] },
          })
          expect(wrapper.getComponent(Link).props('radius')).toBe('lg')
        })
      })

      it('marca solo la página actual con aria-current="page"', () => {
        const wrapper = mountBreadcrumb({ props: { items, ellipsisIndex: [0, 1] } })

        expect(wrapper.get('[data-test-breadcrumb-page]').attributes('aria-current')).toBe('page')
        expect(
          wrapper.get('[data-test-breadcrumb-item="current"]').attributes('aria-current'),
        ).toBeUndefined()
        expect(
          wrapper.find('[data-test-breadcrumb-ellipsis]').attributes('aria-current'),
        ).toBeUndefined()
      })

      it('no pasa slot como atributo del Link', () => {
        const wrapper = mountBreadcrumb({ props: { items: [{ slot: 'home', to: '/' }] } })
        expect(wrapper.getComponent(Link).attributes('slot')).toBeUndefined()
      })

      it('mantiene el mismo espaciado con y sin icono, sin destacar el último item en negrita', () => {
        const wrapper = mountBreadcrumb({ props: { items } })
        const links = wrapper.findAllComponents(Link)

        expect(links.map((link) => link.classes().includes('px-2'))).toEqual([true, true, true])
        expect(links.map((link) => link.classes().includes('has-[>svg]:px-2'))).toEqual([
          true,
          true,
          true,
        ])
        expect(wrapper.get('[data-test-breadcrumb-page]').classes()).not.toContain('font-bold')
      })
    })

    describe('link variant', () => {
      it('usa plain en todos los items', () => {
        const wrapper = mountBreadcrumb({ props: { items } })
        expect(wrapper.findAllComponents(Link).map((link) => link.props('variant'))).toEqual([
          'plain',
          'plain',
          'plain',
        ])
      })
    })

    describe('variant', () => {
      it('usa plain sin borde visible y con el mismo tamaño que outlined', () => {
        const wrapper = mountBreadcrumb({ props: { items } })
        const root = wrapper.get('[data-test-breadcrumb-root]')

        expect(root.classes()).toContain('border-transparent')
        expect(root.classes()).toContain('px-3')
        expect(root.classes()).toContain('py-2')
        expect(root.classes()).not.toContain('bg-muted/50')
        expect(wrapper.get('[data-test-breadcrumb-link]').classes()).toContain('px-2')
      })

      it.each(casesVariant)('mantiene Link plain con variant=%s', (variant) => {
        const wrapper = mountBreadcrumb({ props: { items, variant } })
        expect(wrapper.findAllComponents(Link).map((link) => link.props('variant'))).toEqual([
          'plain',
          'plain',
          'plain',
        ])
      })

      it('outlined añade un borde al contenedor', () => {
        const wrapper = mountBreadcrumb({ props: { items, variant: 'outlined' } })
        const root = wrapper.get('[data-test-breadcrumb-root]')

        expect(root.classes()).toContain('border')
        expect(root.classes()).toContain('rounded-xl')
        expect(wrapper.get('[data-test-breadcrumb-link]').classes()).toContain('px-2')
      })

      it('frame añade un borde exterior y otro interior sin destacar el Link', () => {
        const wrapper = mountBreadcrumb({ props: { items, variant: 'frame' } })
        const root = wrapper.get('[data-test-breadcrumb-root]')
        const list = wrapper.get('[data-test-breadcrumb-list]')

        expect(root.classes()).toContain('rounded-xl')
        expect(root.classes()).toContain('border')
        expect(root.classes()).toContain('bg-muted')
        expect(list.classes()).toContain('rounded-lg')
        expect(list.classes()).toContain('border')
        expect(list.classes()).toContain('bg-background')
        expect(wrapper.get('[data-test-breadcrumb-link]').classes()).toContain('px-2')
        expect(wrapper.get('[data-test-breadcrumb-page]').classes()).not.toContain('bg-background')
      })
    })

    describe('estilos de los items', () => {
      it('muestra los enlaces en gris y los oscurece al hover, con foco gris', () => {
        const wrapper = mountBreadcrumb({ props: { items } })
        const link = wrapper.get('[data-test-breadcrumb-link]')

        expect(link.classes()).toContain('text-muted-foreground')
        expect(link.classes()).toContain('hover:text-foreground')
        expect(link.classes()).toContain('hover:bg-transparent')
        expect(link.classes()).toContain('focus-visible:border-muted-foreground')
        expect(link.classes()).toContain('focus-visible:ring-0')
        expect(wrapper.findAllComponents(Link)[0].props('color')).toBe('neutral')
      })

      it('muestra el item sin enlace en color de texto base', () => {
        const wrapper = mountBreadcrumb({ props: { items } })
        const page = wrapper.get('[data-test-breadcrumb-page]')

        expect(page.classes()).toContain('text-foreground')
        expect(page.classes()).not.toContain('text-muted-foreground')
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

      it('mantiene visible la página actual si el rango intenta ocultarla', () => {
        const wrapper = mountBreadcrumb({ props: { items, ellipsisIndex: [0, 2] } })

        expect(wrapper.find('[data-test-breadcrumb-ellipsis]').exists()).toBe(false)
        expect(wrapper.get('[data-test-breadcrumb-page]').text()).toBe('Actual')
      })
    })

    describe('ellipsisIcon', () => {
      it('usa moreHorizontal por defecto', () => {
        const wrapper = mountBreadcrumb({ props: { items, ellipsisIndex: [0, 1] } })
        expect(
          wrapper.get('[data-test-breadcrumb-ellipsis]').getComponent(Icon).props('name'),
        ).toBe('moreHorizontal')
      })

      it('acepta el nombre del icono como string', () => {
        const wrapper = mountBreadcrumb({
          props: { items, ellipsisIndex: [0, 1], ellipsisIcon: 'info' },
        })
        expect(
          wrapper.get('[data-test-breadcrumb-ellipsis]').getComponent(Icon).props('name'),
        ).toBe('info')
      })
    })

    describe('separatorIcon', () => {
      it('usa chevronRight por defecto', () => {
        const wrapper = mountBreadcrumb({ props: { items } })
        expect(
          wrapper.get('[data-test-breadcrumb-separator]').getComponent(Icon).props('name'),
        ).toBe('chevronRight')
      })

      it('acepta el nombre del icono como string', () => {
        const wrapper = mountBreadcrumb({ props: { items, separatorIcon: 'minus' } })
        expect(
          wrapper.get('[data-test-breadcrumb-separator]').getComponent(Icon).props('name'),
        ).toBe('minus')
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

    it('prioriza el slot específico sobre el slot item', () => {
      const wrapper = mountBreadcrumb({
        props: { items: [items[0]] },
        slots: {
          item: () => h('span', 'Genérico'),
          'item-home': () => h('span', 'Específico'),
        },
      })

      expect(wrapper.get('[data-test-breadcrumb-item="home"]').text()).toBe('Específico')
    })
  })
})
