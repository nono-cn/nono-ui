import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'

import {
  MeterGroup,
  type MeterGroupItem,
  type MeterGroupItemContext,
  type MeterGroupProps,
  type MeterGroupStatusContext,
} from '@/components/ui/MeterGroup'
import { meterGroupDefaults } from '@/components/ui/MeterGroup/defaults'
import { testAttrs } from '../utils/testAttrs'
import { testIconConfig } from '../utils/testIconConfig'

function mountMeterGroup(options: MountingOptions<MeterGroupProps> = {}) {
  return mount(MeterGroup, options)
}

function mountWithProp(prop: keyof MeterGroupProps, value: unknown) {
  return mountMeterGroup({ props: { [prop]: value } as MeterGroupProps })
}

const baseItems: MeterGroupItem[] = [
  { label: 'Sistema', value: 42, color: '#2563eb' },
  { label: 'Aplicaciones', value: 18, color: '#7c3aed' },
]

const casesMax = [
  { input: 1, expected: 1 },
  { input: 50, expected: 50 },
  { input: 200, expected: 200 },
  { input: 0, expected: meterGroupDefaults.max },
  { input: -10, expected: meterGroupDefaults.max },
  { input: undefined, expected: meterGroupDefaults.max },
]

const casesItemValues = [
  { items: [{ value: 0 }], expectedTotal: 0 },
  { items: [{ value: 25 }, { value: 15 }], expectedTotal: 40 },
  { items: [{ value: -10 }, { value: 80 }], expectedTotal: 80 },
]

const casesItemLabels = [
  { input: 'Sistema', expected: 'Sistema', visible: true },
  { input: '', expected: '', visible: false },
  { input: undefined, expected: '', visible: false },
]

const casesItemColors = [
  { input: '#ff0000', expected: 'background-color: rgb(255, 0, 0)' },
  { input: undefined, expected: undefined },
]

const casesOrientation = [
  { input: 'horizontal' as const, expected: 'horizontal', class: 'h-2' },
  { input: 'vertical' as const, expected: 'vertical', class: 'w-2' },
  { input: undefined, expected: meterGroupDefaults.orientation, class: 'h-2' },
]

const casesSize = [
  { input: '2xs' as const, horizontal: 'h-px', vertical: 'w-px' },
  { input: 'xs' as const, horizontal: 'h-0.5', vertical: 'w-0.5' },
  { input: 'sm' as const, horizontal: 'h-1', vertical: 'w-1' },
  { input: 'md' as const, horizontal: 'h-2', vertical: 'w-2' },
  { input: 'lg' as const, horizontal: 'h-3', vertical: 'w-3' },
  { input: 'xl' as const, horizontal: 'h-4', vertical: 'w-4' },
  { input: '2xl' as const, horizontal: 'h-5', vertical: 'w-5' },
]

const casesStatusContext = [
  { items: [{ value: 0 }], max: 100, expected: { total: 0, percentage: 0 } },
  { items: [{ value: 25 }, { value: 25 }], max: 100, expected: { total: 50, percentage: 50 } },
  { items: [{ value: 80 }, { value: 40 }], max: 100, expected: { total: 100, percentage: 100 } },
  { items: [{ value: -20 }], max: 100, expected: { total: 0, percentage: 0 } },
]

const casesItemContext = [
  {
    items: baseItems,
    max: 100,
    expected: [
      { item: baseItems[0], index: 0, percentage: 42 },
      { item: baseItems[1], index: 1, percentage: 18 },
    ],
  },
  {
    items: [{ label: 'Supera el máximo', value: 120 }],
    max: 100,
    expected: [{ item: { label: 'Supera el máximo', value: 120 }, index: 0, percentage: 100 }],
  },
]

describe('MeterGroup', () => {
  describe('props', () => {
    describe('items', () => {
      describe('value', () => {
        it.each(casesItemValues)('calcula total=$expectedTotal', ({ items, expectedTotal }) => {
          const wrapper = mountMeterGroup({ props: { items } })

          expect(wrapper.findAllComponents(ProgressIndicator)).toHaveLength(items.length)
          expect(wrapper.getComponent(ProgressRoot).props('modelValue')).toBe(expectedTotal)
        })

        it('limita los valores negativos y escala los segmentos cuando el total supera el máximo', () => {
          const items = [
            { value: -10, color: '#111111' },
            { value: 80, color: '#222222' },
            { value: 40, color: '#333333' },
          ]
          const wrapper = mountMeterGroup({ props: { items, max: 100 } })
          const indicators = wrapper.findAllComponents(ProgressIndicator)

          expect(wrapper.getComponent(ProgressRoot).props('modelValue')).toBe(100)
          expect(indicators[0].attributes('style')).toContain('width: 0%')
          expect(indicators[1].attributes('style')).toMatch(/width: 66\.6/)
          expect(indicators[2].attributes('style')).toMatch(/width: 33\.3/)
        })
      })

      describe('label', () => {
        it.each(casesItemLabels)(
          'renderiza label=$input como visible=$visible',
          ({ input, expected, visible }) => {
            const wrapper = mountMeterGroup({
              props: { items: [{ value: 40, label: input }] },
            })
            const list = wrapper.find('[data-test-meter-group-list]')

            expect(list.exists()).toBe(visible)
            if (visible) expect(wrapper.get('[data-test-meter-group-label]').text()).toBe(expected)
          },
        )
      })

      describe('color', () => {
        it.each(casesItemColors)('renderiza color=$input', ({ input, expected }) => {
          const wrapper = mountMeterGroup({
            props: { items: [{ value: 40, label: 'Color', color: input }] },
          })
          const indicator = wrapper.getComponent(ProgressIndicator)
          const leading = wrapper.get('[data-test-meter-group-leading]')

          if (expected) {
            expect(indicator.attributes('style')).toContain(expected)
            expect(leading.attributes('style')).toContain(expected)
          } else {
            expect(indicator.attributes('style') ?? '').not.toContain('background-color')
            expect(leading.attributes('style') ?? '').not.toContain('background-color')
          }
        })
      })

      describe('icon', () => {
        testIconConfig({
          text: 'pasa las props de item.icon y el color del item a Icon',
          id: '[data-test-meter-group-icon]',
          mount: (input) =>
            mountMeterGroup({
              props: {
                items: [{ label: 'Elemento', value: 20, color: input?.color, icon: input }],
              },
            }),
        })
      })

      describe('fallback inicial', () => {
        it('renderiza el contenido inicial cuando el elemento no tiene icono', () => {
          const wrapper = mountMeterGroup({ props: { items: [baseItems[0]] } })

          expect(wrapper.find('[data-test-meter-group-icon]').exists()).toBe(false)
          expect(wrapper.get('[data-test-meter-group-leading]').attributes('style')).toContain(
            'background-color: rgb(37, 99, 235)',
          )
        })
      })
    })

    describe('max', () => {
      it.each(casesMax)('normaliza max=$input a $expected', ({ input, expected }) => {
        const root = mountWithProp('max', input).getComponent(ProgressRoot)

        expect(root.props('max')).toBe(expected)
      })
    })

    describe('orientation', () => {
      it.each(casesOrientation)(
        'pasa orientation=$input a ProgressRoot y aplica las clases $expected',
        ({ input, expected, class: expectedClass }) => {
          const wrapper = mountWithProp('orientation', input)
          const root = wrapper.getComponent(ProgressRoot)

          expect(root.attributes('orientation')).toBe(expected)
          expect(root.classes()).toContain(expectedClass)
        },
      )
    })

    describe('size', () => {
      it.each(casesSize)('aplica el tamaño horizontal=$input', ({ input, horizontal }) => {
        const root = mountMeterGroup({
          props: { orientation: 'horizontal', size: input },
        }).getComponent(ProgressRoot)

        expect(root.classes()).toContain(horizontal)
      })

      it.each(casesSize)('aplica el tamaño vertical=$input', ({ input, vertical }) => {
        const root = mountMeterGroup({
          props: { orientation: 'vertical', size: input },
        }).getComponent(ProgressRoot)

        expect(root.classes()).toContain(vertical)
      })
    })

    describe('status', () => {
      it('no renderiza el estado de forma predeterminada', () => {
        expect(mountMeterGroup().find('[data-test-meter-group-status]').exists()).toBe(false)
      })

      it('renderiza el porcentaje total cuando es true', () => {
        const wrapper = mountMeterGroup({ props: { items: baseItems, status: true } })

        expect(wrapper.get('[data-test-meter-group-status]').text()).toBe('60%')
      })
    })

    describe('ui', () => {
      testAttrs({
        text: 'pasa los atributos mediante ui.status',
        id: '[data-test-meter-group-status]',
        mount: (attrs) => mountMeterGroup({ props: { status: true, ui: { status: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa los atributos mediante ui.meter',
        id: '[data-test-meter-group-meter]',
        mount: (attrs) => mountMeterGroup({ props: { ui: { meter: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa los atributos mediante ui.list',
        id: '[data-test-meter-group-list]',
        mount: (attrs) =>
          mountMeterGroup({ props: { items: baseItems, ui: { list: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa los atributos mediante ui.item',
        id: '[data-test-meter-group-item]',
        mount: (attrs) =>
          mountMeterGroup({ props: { items: baseItems, ui: { item: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa los atributos mediante ui.label',
        id: '[data-test-meter-group-label]',
        mount: (attrs) =>
          mountMeterGroup({ props: { items: baseItems, ui: { label: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa los atributos mediante ui.leading',
        id: '[data-test-meter-group-leading]',
        mount: (attrs) =>
          mountMeterGroup({ props: { items: baseItems, ui: { leading: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa los atributos mediante ui.trailing',
        id: '[data-test-meter-group-trailing]',
        mount: (attrs) =>
          mountMeterGroup({ props: { items: baseItems, ui: { trailing: () => attrs } } }),
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-meter-group-root]',
      mount: (attrs) => mountMeterGroup({ attrs }),
    })
  })

  describe('slots', () => {
    describe('status', () => {
      it('renderiza el slot y sustituye el contenido alternativo', () => {
        const wrapper = mountMeterGroup({
          props: { items: baseItems, status: true },
          slots: {
            status: () => h('span', { 'data-test-status-slot': true }, 'Estado personalizado'),
          },
        })

        expect(wrapper.get('[data-test-status-slot]').text()).toBe('Estado personalizado')
        expect(wrapper.get('[data-test-meter-group-status]').text()).not.toContain('60%')
      })

      it('pasa el contexto completo', () => {
        let context: MeterGroupStatusContext | undefined

        mountMeterGroup({
          props: { items: baseItems, status: true },
          slots: {
            status: (slotContext: MeterGroupStatusContext) => {
              context = slotContext
              return h('span')
            },
          },
        })

        expect(context).toEqual({ total: 60, percentage: 60 })
      })
    })

    describe('item', () => {
      it('renderiza el slot y sustituye el contenido alternativo', () => {
        const wrapper = mountMeterGroup({
          props: { items: baseItems },
          slots: {
            item: () => h('strong', { 'data-test-item-slot': true }, 'Elemento personalizado'),
          },
        })

        expect(wrapper.get('[data-test-item-slot]').text()).toBe('Elemento personalizado')
        expect(wrapper.find('[data-test-meter-group-label]').exists()).toBe(false)
      })

      it('pasa el contexto completo', () => {
        const contexts: MeterGroupItemContext[] = []

        mountMeterGroup({
          props: { items: baseItems },
          slots: {
            item: (slotContext: MeterGroupItemContext) => {
              contexts.push(slotContext)
              return h('span')
            },
          },
        })

        expect(
          contexts.map(({ item, index, percentage }) => ({ item, index, percentage })),
        ).toEqual([
          { item: baseItems[0], index: 0, percentage: 42 },
          { item: baseItems[1], index: 1, percentage: 18 },
        ])
      })
    })

    describe('item-leading', () => {
      it('renderiza el slot y sustituye el icono y el contenido inicial alternativo', () => {
        const wrapper = mountMeterGroup({
          props: {
            items: [
              { label: 'Documentos', value: 24, color: '#db2777', icon: { name: 'fileText' } },
            ],
          },
          slots: {
            'item-leading': (context: MeterGroupItemContext) =>
              h('strong', { 'data-test-leading-slot': true }, `${context.index}`),
          },
        })

        expect(wrapper.get('[data-test-leading-slot]').text()).toBe('0')
        expect(wrapper.find('[data-test-meter-group-icon]').exists()).toBe(false)
      })

      it('pasa el contexto completo', () => {
        const contexts: MeterGroupItemContext[] = []

        mountMeterGroup({
          props: { items: baseItems },
          slots: {
            'item-leading': (slotContext: MeterGroupItemContext) => {
              contexts.push(slotContext)
              return h('span')
            },
          },
        })

        expect(
          contexts.map(({ item, index, percentage }) => ({ item, index, percentage })),
        ).toEqual([
          { item: baseItems[0], index: 0, percentage: 42 },
          { item: baseItems[1], index: 1, percentage: 18 },
        ])
      })
    })

    describe('item-label', () => {
      it('renderiza el slot y sustituye el label alternativo del elemento', () => {
        const wrapper = mountMeterGroup({
          props: { items: baseItems },
          slots: {
            'item-label': (context: MeterGroupItemContext) =>
              h('strong', { 'data-test-label-slot': true }, `${context.item.label}-personalizado`),
          },
        })

        expect(wrapper.get('[data-test-label-slot]').text()).toBe('Sistema-personalizado')
        expect(wrapper.find('[data-test-meter-group-label]').exists()).toBe(false)
      })

      it('pasa el contexto completo', () => {
        const contexts: MeterGroupItemContext[] = []

        mountMeterGroup({
          props: { items: baseItems },
          slots: {
            'item-label': (slotContext: MeterGroupItemContext) => {
              contexts.push(slotContext)
              return h('span')
            },
          },
        })

        expect(
          contexts.map(({ item, index, percentage }) => ({ item, index, percentage })),
        ).toEqual([
          { item: baseItems[0], index: 0, percentage: 42 },
          { item: baseItems[1], index: 1, percentage: 18 },
        ])
      })
    })

    describe('item-trailing', () => {
      it('renderiza el slot y sustituye el porcentaje alternativo', () => {
        const wrapper = mountMeterGroup({
          props: { items: baseItems },
          slots: {
            'item-trailing': (context: MeterGroupItemContext) =>
              h('strong', { 'data-test-trailing-slot': true }, `${context.percentage}%`),
          },
        })

        expect(wrapper.get('[data-test-trailing-slot]').text()).toBe('42%')
        expect(wrapper.find('[data-test-meter-group-trailing]').exists()).toBe(false)
      })

      it('pasa el contexto completo', () => {
        const contexts: MeterGroupItemContext[] = []

        mountMeterGroup({
          props: { items: baseItems },
          slots: {
            'item-trailing': (slotContext: MeterGroupItemContext) => {
              contexts.push(slotContext)
              return h('span')
            },
          },
        })

        expect(
          contexts.map(({ item, index, percentage }) => ({ item, index, percentage })),
        ).toEqual([
          { item: baseItems[0], index: 0, percentage: 42 },
          { item: baseItems[1], index: 1, percentage: 18 },
        ])
      })
    })
  })

  describe('context contract', () => {
    describe('status context', () => {
      it.each(casesStatusContext)(
        'pasa total y porcentaje para items=$items y max=$max',
        ({ items, max, expected }) => {
          let statusContext: MeterGroupStatusContext | undefined
          let meterContext: MeterGroupStatusContext | undefined

          mountMeterGroup({
            props: {
              items,
              max,
              status: true,
              ui: {
                status: (context) => {
                  statusContext = context
                  return {}
                },
                meter: (context) => {
                  meterContext = context
                  return {}
                },
              },
            },
          })

          expect(statusContext).toEqual(expected)
          expect(meterContext).toEqual(expected)
        },
      )
    })

    describe('item context', () => {
      it.each(casesItemContext)(
        'pasa item, index y porcentaje para items=$items y max=$max',
        ({ items, max, expected }) => {
          const itemContexts: MeterGroupItemContext[] = []

          mountMeterGroup({
            props: {
              items,
              max,
              ui: {
                item: (context) => {
                  itemContexts.push(context)
                  return {}
                },
              },
            },
          })

          expect(itemContexts).toEqual(expected)
        },
      )
    })
  })
})
