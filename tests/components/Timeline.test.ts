import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import {
  Timeline,
  type TimelineContext,
  type TimelineItem,
  type TimelineItemContext,
  type TimelineProps,
} from '@/components/ui/Timeline'
import { testAttrs } from '../utils/testAttrs'
import { testIconConfig } from '../utils/testIconConfig'

const baseItems: TimelineItem[] = [
  { value: 'created', label: 'Creado', description: 'El pedido fue creado.' },
  { value: 'review', label: 'En revisión', description: 'El pedido está en revisión.' },
  { value: 'sent', label: 'Enviado', description: 'El pedido fue enviado.' },
]

function mountTimeline(options: MountingOptions<TimelineProps> = {}) {
  const props = typeof options.props === 'function' ? {} : options.props

  return mount(Timeline, {
    ...options,
    props: {
      items: baseItems,
      ...(props ?? {}),
    },
  })
}

describe('Timeline', () => {
  describe('props', () => {
    describe('items', () => {
      it('renderiza los items, sus labels y sus descripciones', () => {
        const wrapper = mountTimeline()

        expect(wrapper.findAll('[data-test-timeline-item]')).toHaveLength(baseItems.length)
        expect(wrapper.findAll('[data-test-timeline-label]').map((item) => item.text())).toEqual([
          'Creado',
          'En revisión',
          'Enviado',
        ])
        expect(
          wrapper.findAll('[data-test-timeline-description]').map((item) => item.text()),
        ).toEqual([
          'El pedido fue creado.',
          'El pedido está en revisión.',
          'El pedido fue enviado.',
        ])
      })

      it('admite valores string y number en los items', () => {
        const items: TimelineItem[] = [
          { value: 1, label: 'Uno' },
          { value: 'two', label: 'Dos' },
        ]
        const wrapper = mountTimeline({ props: { items, value: 'two' } })

        expect(wrapper.findAll('[data-test-timeline-label]').map((item) => item.text())).toEqual([
          'Uno',
          'Dos',
        ])
        expect(wrapper.findAll('[data-test-timeline-item]')[1].attributes('data-completed')).toBe(
          'true',
        )
      })

      it('renderiza el icono configurado en cada item', () => {
        const wrapper = mountTimeline({
          props: { items: [{ ...baseItems[0], icon: { name: 'search', size: 'sm' } }] },
        })

        const icon = wrapper.get('[data-test-timeline-indicator-icon]')
        expect(icon.attributes('data-test-icon-root')).toBeDefined()
        expect(icon.classes()).toContain('size-4')
      })

      testIconConfig({
        text: 'pasa las props del icono a Icon',
        id: '[data-test-timeline-indicator-icon]',
        mount: (icon) => mountTimeline({ props: { items: [{ ...baseItems[0], icon: icon! }] } }),
      })

      it('usa item.slot como clave de los slots dinámicos', () => {
        const items: TimelineItem[] = [
          { ...baseItems[0], slot: 'first-event' },
          { ...baseItems[1], slot: 'current-event' },
        ]
        const wrapper = mountTimeline({
          props: { items },
          slots: {
            'label-current-event': () =>
              h('strong', { 'data-test-timeline-slot-key': true }, 'Clave custom'),
          },
        })

        expect(wrapper.get('[data-test-timeline-slot-key]').text()).toBe('Clave custom')
        expect(wrapper.find('[data-test-timeline-label]').exists()).toBe(true)
      })
    })

    describe('value', () => {
      it.each([
        { value: undefined, activeIndex: -1 },
        { value: 'review' as const, activeIndex: 1 },
        { value: 'sent' as const, activeIndex: 2 },
        { value: 2, activeIndex: -1 },
      ])('calcula los estados con value=$value', ({ value, activeIndex }) => {
        const wrapper = mountTimeline({ props: { value } })
        const items = wrapper.findAll('[data-test-timeline-item]')
        const indicators = wrapper.findAll('[data-test-timeline-indicator]')

        items.forEach((item, index) => {
          const completed = activeIndex >= 0 && index <= activeIndex
          expect(item.attributes('data-completed')).toBe(completed ? 'true' : undefined)
          expect(indicators[index].attributes('data-completed')).toBe(
            completed ? 'true' : undefined,
          )
        })

        expect(wrapper.findAll('[data-test-timeline-separator]')).toHaveLength(3)
        expect(
          wrapper
            .findAll('[data-test-timeline-separator]')
            .map((separator) => separator.attributes('data-completed')),
        ).toEqual(
          activeIndex < 0
            ? [undefined, undefined, undefined]
            : [
                activeIndex > 0 ? 'true' : undefined,
                activeIndex > 1 ? 'true' : undefined,
                undefined,
              ],
        )
      })

      it('marca como activo únicamente el item cuyo value coincide exactamente', () => {
        const contexts: TimelineItemContext[] = []
        mountTimeline({
          props: {
            value: 'review',
            ui: {
              item: (context) => {
                contexts.push(context)
                return {}
              },
            },
          },
        })

        expect(contexts.map(({ active }) => active)).toEqual([false, true, false])
      })
    })

    describe('orientation', () => {
      it.each([
        { value: 'vertical' as const, rootClass: 'flex-col', itemClass: 'flex-col' },
        { value: 'horizontal' as const, rootClass: 'flex-row', itemClass: 'flex-1' },
      ])('aplica orientation=$value', ({ value, rootClass, itemClass }) => {
        const wrapper = mountTimeline({ props: { orientation: value } })

        expect(wrapper.attributes('data-orientation')).toBe(value)
        expect(wrapper.classes()).toContain(rootClass)
        expect(wrapper.get('[data-test-timeline-item]').classes()).toContain(itemClass)
      })

      it('usa vertical como orientación predeterminada', () => {
        expect(mountTimeline().attributes('data-orientation')).toBe('vertical')
      })
    })

    describe('align', () => {
      it.each([
        { value: 'left' as const, expected: ['left', 'left', 'left'] },
        { value: 'right' as const, expected: ['right', 'right', 'right'] },
        { value: 'alternate' as const, expected: ['left', 'right', 'left'] },
      ])('calcula itemAlign para align=$value', ({ value, expected }) => {
        const wrapper = mountTimeline({ props: { align: value } })

        expect(
          wrapper.findAll('[data-test-timeline-item]').map((item) => item.attributes('data-align')),
        ).toEqual(expected)
      })
    })

    describe('sizeIndicator', () => {
      it.each([
        { value: 'sm' as const, className: 'size-7' },
        { value: 'md' as const, className: 'size-8' },
        { value: 'lg' as const, className: 'size-9' },
        { value: 'xl' as const, className: 'size-10' },
      ])('aplica tamaño $value al indicador', ({ value, className }) => {
        expect(
          mountTimeline({ props: { sizeIndicator: value } })
            .get('[data-test-timeline-indicator]')
            .classes(),
        ).toContain(className)
      })
    })

    describe('severity', () => {
      it.each([
        { value: 'primary' as const, className: 'text-primary' },
        { value: 'secondary' as const, className: 'text-secondary-foreground' },
        { value: 'warning' as const, className: 'text-warning' },
        { value: 'success' as const, className: 'text-success' },
        { value: 'error' as const, className: 'text-error' },
      ])('aplica severity=$value', ({ value, className }) => {
        const wrapper = mountTimeline({ props: { severity: value, value: 'review' } })

        expect(wrapper.get('[data-test-timeline-indicator]').classes()).toContain(className)
        expect(wrapper.get('[data-test-timeline-separator]').classes()).toContain(
          value === 'secondary' ? 'bg-secondary-foreground/40' : `bg-${value}/40`,
        )
      })
    })

    describe('color', () => {
      it('aplica el color y sus variables CSS a indicadores y separadores', () => {
        const wrapper = mountTimeline({ props: { color: '#2563eb', value: 'review' } })

        expect(wrapper.get('[data-test-timeline-indicator]').attributes('style')).toContain(
          '--timeline-color: #2563eb',
        )
        expect(wrapper.get('[data-test-timeline-separator]').attributes('style')).toContain(
          '--timeline-color: #2563eb',
        )
        expect(wrapper.get('[data-test-timeline-indicator]').classes()).toContain(
          'text-(--timeline-color)',
        )
      })
    })

    describe('reverse', () => {
      it('muestra los items en orden inverso y recalcula first, last y los estados', () => {
        const contexts: TimelineItemContext[] = []
        const wrapper = mountTimeline({
          props: {
            value: 'review',
            reverse: true,
            ui: {
              item: (context) => {
                contexts.push(context)
                return {}
              },
            },
          },
        })

        expect(wrapper.findAll('[data-test-timeline-label]').map((item) => item.text())).toEqual([
          'Enviado',
          'En revisión',
          'Creado',
        ])
        expect(contexts.map(({ first, last, completed }) => ({ first, last, completed }))).toEqual([
          { first: true, last: false, completed: true },
          { first: false, last: false, completed: true },
          { first: false, last: true, completed: false },
        ])
      })
    })

    describe('ui', () => {
      testAttrs({
        text: 'pasa atributos mediante ui.root',
        id: '[data-test-timeline-root]',
        mount: (attrs) => mountTimeline({ props: { ui: { root: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa atributos mediante ui.item',
        id: '[data-test-timeline-item]',
        mount: (attrs) => mountTimeline({ props: { ui: { item: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa atributos mediante ui.content',
        id: '[data-test-timeline-content]',
        mount: (attrs) => mountTimeline({ props: { ui: { content: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa atributos mediante ui.header',
        id: '[data-test-timeline-header]',
        mount: (attrs) => mountTimeline({ props: { ui: { header: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa atributos mediante ui.label',
        id: '[data-test-timeline-label]',
        mount: (attrs) => mountTimeline({ props: { ui: { label: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa atributos mediante ui.description',
        id: '[data-test-timeline-description]',
        mount: (attrs) => mountTimeline({ props: { ui: { description: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa atributos mediante ui.indicator',
        id: '[data-test-timeline-indicator]',
        mount: (attrs) => mountTimeline({ props: { ui: { indicator: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa atributos mediante ui.separator',
        id: '[data-test-timeline-separator]',
        mount: (attrs) => mountTimeline({ props: { ui: { separator: () => attrs } } }),
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa atributos arbitrarios, class y style a la raíz',
      id: '[data-test-timeline-root]',
      mount: (attrs) => mountTimeline({ attrs }),
    })

    it('conserva role=list aunque se proporcione un role en attrs', () => {
      expect(mountTimeline({ attrs: { role: 'tree' } }).attributes('role')).toBe('list')
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it('refleja los cambios externos del modelo controlado', async () => {
        const wrapper = mountTimeline({ props: { value: 'created' } })

        await wrapper.setProps({ value: 'review' })

        expect(wrapper.findAll('[data-test-timeline-item]')[1].attributes('data-completed')).toBe(
          'true',
        )
      })
    })
  })

  describe('slots', () => {
    describe('header', () => {
      it('sustituye el encabezado y el label alternativo', () => {
        const wrapper = mountTimeline({
          slots: {
            header: (context: TimelineItemContext) =>
              h('strong', { 'data-test-timeline-header-slot': true }, context.item.label),
          },
        })

        expect(wrapper.get('[data-test-timeline-header-slot]').text()).toBe('Creado')
        expect(wrapper.find('[data-test-timeline-label]').exists()).toBe(false)
      })
    })

    describe('label', () => {
      it('sustituye el label alternativo y recibe el contexto', () => {
        const contexts: TimelineItemContext[] = []
        const wrapper = mountTimeline({
          slots: {
            label: (slotContext: TimelineItemContext) => {
              contexts.push(slotContext)
              return h('strong', { 'data-test-timeline-label-slot': true }, 'Etiqueta custom')
            },
          },
        })

        expect(wrapper.get('[data-test-timeline-label-slot]').text()).toBe('Etiqueta custom')
        expect(wrapper.find('[data-test-timeline-label]').exists()).toBe(false)
        expect(contexts).toHaveLength(3)
        expect(contexts[0].item).toEqual(baseItems[0])
      })
    })

    describe('description', () => {
      it('sustituye la descripción alternativa', () => {
        const wrapper = mountTimeline({
          slots: {
            description: () => h('span', { 'data-test-timeline-description-slot': true }, 'Custom'),
          },
        })

        expect(wrapper.get('[data-test-timeline-description-slot]').text()).toBe('Custom')
        expect(wrapper.text()).not.toContain('El pedido fue creado.')
      })
    })

    describe('indicator', () => {
      it('sustituye el icono alternativo', () => {
        const wrapper = mountTimeline({
          props: { items: [{ ...baseItems[0], icon: { name: 'search' } }] },
          slots: {
            indicator: () => h('span', { 'data-test-timeline-indicator-slot': true }, '1'),
          },
        })

        expect(wrapper.get('[data-test-timeline-indicator-slot]').text()).toBe('1')
        expect(wrapper.find('[data-test-timeline-indicator-icon]').exists()).toBe(false)
      })
    })

    describe('slots dinámicos', () => {
      it('prioriza los slots con sufijo value para un único item', () => {
        const wrapper = mountTimeline({
          slots: {
            'header-review': () => h('span', { 'data-test-dynamic-header': true }, 'Header review'),
            'label-review': () => h('span', { 'data-test-dynamic-label': true }, 'Label review'),
            'description-review': () =>
              h('span', { 'data-test-dynamic-description': true }, 'Description review'),
            'indicator-review': () => h('span', { 'data-test-dynamic-indicator': true }, '2'),
          },
        })

        expect(wrapper.get('[data-test-dynamic-header]').text()).toBe('Header review')
        expect(wrapper.get('[data-test-dynamic-description]').text()).toBe('Description review')
        expect(wrapper.get('[data-test-dynamic-indicator]').text()).toBe('2')
        expect(wrapper.find('[data-test-dynamic-label]').exists()).toBe(false)
      })
    })
  })

  describe('context contract', () => {
    it('pasa TimelineContext completo al resolver de root', () => {
      let context: TimelineContext | undefined

      mountTimeline({
        props: {
          value: 'review',
          ui: {
            root: (rootContext) => {
              context = rootContext
              return {}
            },
          },
        },
      })

      expect(context).toEqual({
        props: {
          value: 'review',
          items: baseItems,
          orientation: 'vertical',
          align: 'right',
          sizeIndicator: 'md',
          color: undefined,
          severity: 'primary',
          reverse: false,
        },
        value: 'review',
      })
    })

    it.each([
      { value: undefined, completed: [false, false, false], active: [false, false, false] },
      { value: 'created' as const, completed: [true, false, false], active: [true, false, false] },
      { value: 'review' as const, completed: [true, true, false], active: [false, true, false] },
    ])('pasa el TimelineItemContext completo para value=$value', ({ value, completed, active }) => {
      const contexts: TimelineItemContext[] = []

      mountTimeline({
        props: {
          value,
          ui: {
            item: (itemContext) => {
              contexts.push(itemContext)
              return {}
            },
          },
        },
      })

      expect(contexts).toHaveLength(3)
      expect(
        contexts.map(({ item, index, first, last, itemAlign }) => ({
          item,
          index,
          first,
          last,
          itemAlign,
        })),
      ).toEqual([
        { item: baseItems[0], index: 0, first: true, last: false, itemAlign: 'right' },
        { item: baseItems[1], index: 1, first: false, last: false, itemAlign: 'right' },
        { item: baseItems[2], index: 2, first: false, last: true, itemAlign: 'right' },
      ])
      expect(contexts.map(({ completed }) => completed)).toEqual(completed)
      expect(contexts.map(({ active }) => active)).toEqual(active)
      expect(contexts.map(({ props: contextProps }) => contextProps)).toEqual(
        contexts.map(() => ({
          value,
          items: baseItems,
          orientation: 'vertical',
          align: 'right',
          sizeIndicator: 'md',
          color: undefined,
          severity: 'primary',
          reverse: false,
        })),
      )
      expect(contexts.every(({ value: contextValue }) => Object.is(contextValue, value))).toBe(true)
    })
  })
})
