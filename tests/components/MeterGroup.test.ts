import { h } from 'vue'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Icon } from '@/components/ui/Icon'
import {
  MeterGroup,
  meterGroupDefaults,
  meterGroupItemDefaults,
  type MeterGroupContext,
  type MeterGroupItem,
  type MeterGroupItemContext,
  type MeterGroupProps,
  type MeterGroupUI,
} from '@/components/ui/MeterGroup'
import { themeColors } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

const items = [
  { label: 'Apps', value: 20 },
  { label: 'Fotos', value: 30, color: 'success' },
] satisfies MeterGroupItem[]

const casesVariantsCss = [
  {
    name: 'meterGroupVariants',
    part: 'la raíz',
    input: '[data-test-meter-group-root]',
    expected: ['grid', 'gap-2'],
  },
  {
    name: 'meterGroupStatusVariants',
    part: 'el estado',
    input: '[data-test-meter-group-status]',
    expected: ['text-right', 'font-medium', 'tabular-nums'],
  },
  {
    name: 'meterGroupBodyVariants',
    part: 'el cuerpo',
    input: '[data-test-meter-group-body]',
    expected: ['gap-2'],
  },
  {
    name: 'meterGroupTrackVariants',
    part: 'la pista',
    input: '[data-test-meter-group-track]',
    expected: ['relative', 'flex', 'overflow-hidden', 'rounded-full', 'bg-muted'],
  },
  {
    name: 'meterGroupIndicatorVariants',
    part: 'el indicador',
    input: '[data-test-meter-group-indicator]',
    expected: ['shrink-0', 'bg-(--meter-group-color)'],
  },
  {
    name: 'meterGroupListVariants',
    part: 'la lista',
    input: '[data-test-meter-group-list]',
    expected: ['grid', 'text-muted-foreground'],
  },
  {
    name: 'meterGroupItemVariants',
    part: 'el ítem',
    input: '[data-test-meter-group-item]',
    expected: ['flex', 'items-center', 'gap-2'],
  },
  {
    name: 'meterGroupLeadingVariants',
    part: 'el marcador',
    input: '[data-test-meter-group-leading]',
    expected: ['shrink-0', 'rounded-full', 'bg-(--meter-group-color)'],
  },
  {
    name: 'meterGroupLabelVariants',
    part: 'el label',
    input: '[data-test-meter-group-label]',
    expected: ['min-w-0', 'flex-1', 'truncate'],
  },
  {
    name: 'meterGroupTrailingVariants',
    part: 'el porcentaje',
    input: '[data-test-meter-group-trailing]',
    expected: ['ms-2', 'shrink-0', 'tabular-nums'],
  },
] satisfies Array<{ name: string; part: string; input: string; expected: string[] }>

const casesSize = [
  {
    input: undefined,
    expected: {
      root: 'text-sm',
      track: 'h-2',
      verticalTrack: 'w-2',
      leading: 'size-2',
      icon: 'size-4',
    },
  },
  {
    input: '2xs',
    expected: {
      root: 'text-xs',
      track: 'h-px',
      verticalTrack: 'w-px',
      leading: 'size-1.5',
      icon: 'size-3',
    },
  },
  {
    input: 'xs',
    expected: {
      root: 'text-xs',
      track: 'h-0.5',
      verticalTrack: 'w-0.5',
      leading: 'size-1.5',
      icon: 'size-3',
    },
  },
  {
    input: 'sm',
    expected: {
      root: 'text-sm',
      track: 'h-1',
      verticalTrack: 'w-1',
      leading: 'size-2',
      icon: 'size-4',
    },
  },
  {
    input: 'md',
    expected: {
      root: 'text-sm',
      track: 'h-2',
      verticalTrack: 'w-2',
      leading: 'size-2',
      icon: 'size-4',
    },
  },
  {
    input: 'lg',
    expected: {
      root: 'text-sm',
      track: 'h-3',
      verticalTrack: 'w-3',
      leading: 'size-2',
      icon: 'size-4',
    },
  },
  {
    input: 'xl',
    expected: {
      root: 'text-base',
      track: 'h-4',
      verticalTrack: 'w-4',
      leading: 'size-2.5',
      icon: 'size-5',
    },
  },
  {
    input: '2xl',
    expected: {
      root: 'text-base',
      track: 'h-5',
      verticalTrack: 'w-5',
      leading: 'size-2.5',
      icon: 'size-5',
    },
  },
] satisfies Array<{
  input: MeterGroupProps['size']
  expected: { root: string; track: string; verticalTrack: string; leading: string; icon: string }
}>

const casesStatus = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: meterGroupDefaults.status },
] satisfies Array<{ input: MeterGroupProps['status']; expected: boolean }>

const casesOrientation = [
  {
    input: undefined,
    expected: {
      body: ['grid'],
      track: ['w-full'],
      indicator: ['h-full', 'transition-[width]'],
      list: ['gap-1'],
      style: 'width: 25%',
    },
  },
  {
    input: 'horizontal',
    expected: {
      body: ['grid'],
      track: ['w-full'],
      indicator: ['h-full', 'transition-[width]'],
      list: ['gap-1'],
      style: 'width: 25%',
    },
  },
  {
    input: 'vertical',
    expected: {
      body: ['flex', 'h-48', 'flex-row', 'justify-center'],
      track: ['h-full', 'flex-col-reverse', 'self-center'],
      indicator: ['w-full', 'transition-[height]'],
      list: ['content-center', 'gap-1'],
      style: 'height: 25%',
    },
  },
] satisfies Array<{
  input: MeterGroupProps['orientation']
  expected: { body: string[]; track: string[]; indicator: string[]; list: string[]; style: string }
}>

const casesMax = [
  { input: undefined, expected: meterGroupDefaults.max },
  { input: 200, expected: 200 },
  { input: 0, expected: meterGroupDefaults.max },
  { input: -10, expected: meterGroupDefaults.max },
] satisfies Array<{ input: MeterGroupProps['max']; expected: number }>

const casesMaxIndicator = [
  {
    name: 'en proporción a max cuando la suma no lo supera',
    input: { items: [{ value: 20 }, { value: 30 }], max: 100 },
    expected: ['width: 20%', 'width: 30%'],
  },
  {
    name: 'en proporción a un max menor',
    input: { items: [{ value: 20 }, { value: 30 }], max: 50 },
    expected: ['width: 40%', 'width: 60%'],
  },
  {
    name: 'escalados para caber en la pista cuando la suma supera max',
    input: { items: [{ value: 20 }, { value: 30 }], max: 25 },
    expected: ['width: 40%', 'width: 60%'],
  },
] satisfies Array<{ name: string; input: MeterGroupProps; expected: string[] }>

const casesIconColor = [
  { input: undefined, expected: meterGroupItemDefaults.color },
  { input: 'success', expected: 'success' },
  { input: '#ff0000', expected: '#ff0000' },
] satisfies Array<{ input: MeterGroupItem['color']; expected: string }>

const casesItemValue = [
  { input: 25, expected: 'width: 25%' },
  { input: 0, expected: 'width: 0%' },
  { input: -10, expected: 'width: 0%' },
] satisfies Array<{ input: MeterGroupItem['value']; expected: string }>

const casesItemValueTotal = [
  {
    name: 'la suma de los valores',
    input: [{ value: 20 }, { value: 30 }],
    expected: 50,
  },
  {
    name: 'sin restar los valores negativos',
    input: [{ value: -10 }, { value: 30 }],
    expected: 30,
  },
] satisfies Array<{ name: string; input: MeterGroupItem[]; expected: number }>

const casesItemLabel = [
  {
    name: 'muestra en la leyenda todos los ítems cuando todos tienen label',
    input: [
      { label: 'Apps', value: 20 },
      { label: 'Fotos', value: 30 },
    ],
    expected: { list: true, labels: ['Apps', 'Fotos'] },
  },
  {
    name: 'deja fuera de la leyenda los ítems sin label',
    input: [{ label: 'Apps', value: 20 }, { value: 30 }],
    expected: { list: true, labels: ['Apps'] },
  },
  {
    name: 'no muestra la leyenda cuando ningún ítem tiene label',
    input: [{ value: 20 }, { value: 30 }],
    expected: { list: false, labels: [] },
  },
] satisfies Array<{
  name: string
  input: MeterGroupItem[]
  expected: { list: boolean; labels: string[] }
}>

const casesItemIcon = [
  { input: undefined, expected: { icon: false, leading: true } },
  { input: 'image', expected: { icon: true, leading: false } },
] satisfies Array<{ input: MeterGroupItem['icon']; expected: { icon: boolean; leading: boolean } }>

const getValueText = () => '50 GB de 100 GB usados'

const casesGetValueText = [
  { name: 'por defecto', input: undefined, expected: meterGroupDefaults.getValueText },
  { name: 'personalizado', input: getValueText, expected: getValueText },
] satisfies Array<{
  name: string
  input: MeterGroupProps['getValueText']
  expected: MeterGroupProps['getValueText']
}>

const casesStatusText = [
  {
    name: 'sumando los valores sobre max',
    input: { items: [{ value: 20 }, { value: 30 }], max: 100 },
    expected: '50%',
  },
  {
    name: 'redondeado',
    input: { items: [{ value: 1 }], max: 3 },
    expected: '33%',
  },
  {
    name: 'limitado a 100% cuando la suma supera max',
    input: { items: [{ value: 80 }, { value: 40 }], max: 100 },
    expected: '100%',
  },
] satisfies Array<{ name: string; input: MeterGroupProps; expected: string }>

const itemsContext = [
  { label: 'Apps', value: 20, slot: 'apps' },
  { label: 'Fotos', value: -10, color: 'success' },
] satisfies MeterGroupItem[]

const propsContext = { items: itemsContext, max: 50 } satisfies MeterGroupProps

// 20 de 50, el valor negativo cuenta como 0
const expectedContext = { value: 20, max: 50, percentage: 40 } satisfies MeterGroupContext

const expectedItemContexts = [
  { item: itemsContext[0], index: 0, value: 20, percentage: 40 },
  { item: itemsContext[1], index: 1, value: 0, percentage: 0 },
] satisfies MeterGroupItemContext[]

const casesUiContext = ['status', 'track', 'list'] satisfies Array<keyof MeterGroupUI>

const casesSlotItemContext = ['leading', 'label', 'trailing'] as const

const casesUiItemContext = ['indicator', 'item', 'leading', 'label', 'trailing'] satisfies Array<
  keyof MeterGroupUI
>

function mountMeterGroup(options: ComponentMountingOptions<typeof MeterGroup> = {}) {
  const { props, ...rest } = options
  return mount(MeterGroup, {
    props: { items, ...props },
    ...rest,
  })
}

describe('MeterGroup', () => {
  describe('props', () => {
    describe('items', () => {
      describe('color', () => {
        testColor({
          text: 'resuelve el color del indicador',
          id: '[data-test-meter-group-indicator]',
          varColor: '--meter-group-color',
          defaultColor: `var(--${meterGroupItemDefaults.color}, var(--${meterGroupItemDefaults.color}))`,
          theme: {
            colors: themeColors,
            foregroundVar: '--meter-group-color-foreground',
            solidVar: '--meter-group-solid',
            solidForegroundVar: '--meter-group-solid-foreground',
          },
          mount: (color) =>
            mountMeterGroup({ props: { items: [{ label: 'Fotos', value: 30, color }] } }),
        })

        testColor({
          text: 'resuelve el color del ítem de la leyenda',
          id: '[data-test-meter-group-item]',
          varColor: '--meter-group-color',
          defaultColor: `var(--${meterGroupItemDefaults.color}, var(--${meterGroupItemDefaults.color}))`,
          theme: {
            colors: themeColors,
            foregroundVar: '--meter-group-color-foreground',
            solidVar: '--meter-group-solid',
            solidForegroundVar: '--meter-group-solid-foreground',
          },
          mount: (color) =>
            mountMeterGroup({ props: { items: [{ label: 'Fotos', value: 30, color }] } }),
        })

        it.each(casesIconColor)(
          'pasa color=$input al icono como $expected',
          ({ input, expected }) => {
            const icon = mountMeterGroup({
              props: { items: [{ label: 'Fotos', value: 30, icon: 'image', color: input }] },
            }).getComponent(Icon)

            expect(icon.props('color')).toBe(expected)
          },
        )
      })

      describe('label', () => {
        it('muestra el label en la leyenda', () => {
          const label = mountMeterGroup({
            props: { items: [{ label: 'Fotos', value: 30 }] },
          }).get('[data-test-meter-group-label]')

          expect(label.text()).toBe('Fotos')
        })

        it.each(casesItemLabel)('$name', ({ input, expected }) => {
          const meterGroup = mountMeterGroup({ props: { items: input } })

          expect({
            list: meterGroup.find('[data-test-meter-group-list]').exists(),
            labels: meterGroup
              .findAll('[data-test-meter-group-label]')
              .map((label) => label.text()),
          }).toEqual(expected)
        })
      })

      describe('icon', () => {
        it.each(casesItemIcon)(
          'con icon=$input muestra el icono: $expected.icon y el marcador: $expected.leading',
          ({ input, expected }) => {
            const meterGroup = mountMeterGroup({
              props: { items: [{ label: 'Fotos', value: 30, icon: input }] },
            })

            expect({
              icon: meterGroup.find('[data-test-meter-group-icon]').exists(),
              leading: meterGroup.find('[data-test-meter-group-leading]').exists(),
            }).toEqual(expected)
          },
        )

        it('pasa el nombre del icono al Icon', () => {
          const icon = mountMeterGroup({
            props: { items: [{ label: 'Fotos', value: 30, icon: 'image' }] },
          }).getComponent(Icon)

          expect(icon.props('name')).toBe('image')
        })
      })

      describe('value', () => {
        it.each(casesItemValue)(
          'con value=$input dimensiona el indicador con $expected',
          ({ input, expected }) => {
            const indicator = mountMeterGroup({
              props: { items: [{ value: input }], max: 100 },
            }).get('[data-test-meter-group-indicator]')

            expect(indicator.attributes('style')).toContain(expected)
          },
        )

        it.each(casesItemValueTotal)(
          'pasa como modelValue al meter $name',
          ({ input, expected }) => {
            const track = mountMeterGroup({ props: { items: input, max: 100 } }).getComponent(
              '[data-test-meter-group-track]',
            )

            expect(track.props('modelValue')).toBe(expected)
          },
        )
      })
    })

    describe('size', () => {
      it.each(casesSize)(
        'aplica size=$input al texto, a la pista horizontal y vertical, al marcador y al icono',
        ({ input, expected }) => {
          const horizontal = mountMeterGroup({ props: { size: input } })
          const vertical = mountMeterGroup({ props: { size: input, orientation: 'vertical' } })
          const withIcon = mountMeterGroup({
            props: { size: input, items: [{ label: 'Fotos', value: 30, icon: 'image' }] },
          })

          expect({
            root: horizontal.get('[data-test-meter-group-root]').classes(expected.root),
            track: horizontal.get('[data-test-meter-group-track]').classes(expected.track),
            verticalTrack: vertical
              .get('[data-test-meter-group-track]')
              .classes(expected.verticalTrack),
            leading: horizontal.get('[data-test-meter-group-leading]').classes(expected.leading),
            icon: withIcon.get('[data-test-meter-group-icon]').classes(expected.icon),
          }).toEqual({
            root: true,
            track: true,
            verticalTrack: true,
            leading: true,
            icon: true,
          })
        },
      )
    })

    describe('orientation', () => {
      it.each(casesOrientation)(
        'aplica orientation=$input al cuerpo, la pista, el indicador y la lista',
        ({ input, expected }) => {
          const meterGroup = mountMeterGroup({ props: { orientation: input } })
          const classesOf = (id: string) =>
            meterGroup.get(`[data-test-meter-group-${id}]`).classes()

          expect({
            body: classesOf('body'),
            track: classesOf('track'),
            indicator: classesOf('indicator'),
            list: classesOf('list'),
          }).toEqual({
            body: expect.arrayContaining(expected.body),
            track: expect.arrayContaining(expected.track),
            indicator: expect.arrayContaining(expected.indicator),
            list: expect.arrayContaining(expected.list),
          })
        },
      )

      it.each(casesOrientation)(
        'con orientation=$input dimensiona el indicador con $expected.style',
        ({ input, expected }) => {
          const indicator = mountMeterGroup({
            props: { orientation: input, items: [{ value: 25 }], max: 100 },
          }).get('[data-test-meter-group-indicator]')

          expect(indicator.attributes('style')).toContain(expected.style)
        },
      )
    })

    describe('max', () => {
      it.each(casesMax)(
        'con max=$input pasa $expected como max al meter',
        ({ input, expected }) => {
          const track = mountMeterGroup({ props: { max: input } }).getComponent(
            '[data-test-meter-group-track]',
          )

          expect(track.props('max')).toBe(expected)
        },
      )

      it('pasa max como modelValue al meter cuando la suma lo supera', () => {
        const track = mountMeterGroup({
          props: { items: [{ value: 20 }, { value: 30 }], max: 40 },
        }).getComponent('[data-test-meter-group-track]')

        expect(track.props('modelValue')).toBe(40)
      })

      it.each(casesMaxIndicator)('dimensiona los indicadores $name', ({ input, expected }) => {
        const styles = mountMeterGroup({ props: input })
          .findAll('[data-test-meter-group-indicator]')
          .map((indicator) => indicator.attributes('style'))

        expect(styles).toEqual(expected.map((style) => expect.stringContaining(style)))
      })
    })

    describe('status', () => {
      it.each(casesStatus)(
        'con status=$input muestra el estado: $expected',
        ({ input, expected }) => {
          const status = mountMeterGroup({ props: { status: input } }).find(
            '[data-test-meter-group-status]',
          )

          expect(status.exists()).toBe(expected)
        },
      )

      it.each(casesStatusText)('muestra el porcentaje total $name', ({ input, expected }) => {
        const status = mountMeterGroup({ props: { ...input, status: true } }).get(
          '[data-test-meter-group-status]',
        )

        expect(status.text()).toBe(expected)
      })
    })

    describe('getValueLabel', () => {
      it('pasa getValueLabel a la pista', () => {
        const getValueLabel = () => 'Uso del almacenamiento'
        const track = mountMeterGroup({ props: { getValueLabel } }).getComponent(
          '[data-test-meter-group-track]',
        )

        expect(track.props('getValueLabel')).toBe(getValueLabel)
      })
    })

    describe('getValueText', () => {
      it.each(casesGetValueText)('pasa getValueText $name a la pista', ({ input, expected }) => {
        const track = mountMeterGroup({ props: { getValueText: input } }).getComponent(
          '[data-test-meter-group-track]',
        )

        expect(track.props('getValueText')).toBe(expected)
      })
    })

    describe('ui', () => {
      describe('status', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.status al estado',
          id: '[data-test-meter-group-status]',
          mount: (attrs) =>
            mountMeterGroup({ props: { status: true, ui: { status: () => attrs } } }),
        })
      })

      describe('track', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.track a la pista',
          id: '[data-test-meter-group-track]',
          mount: (attrs) => mountMeterGroup({ props: { ui: { track: () => attrs } } }),
        })
      })

      describe('indicator', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.indicator al indicador',
          id: '[data-test-meter-group-indicator]',
          mount: (attrs) => mountMeterGroup({ props: { ui: { indicator: () => attrs } } }),
        })
      })

      describe('list', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.list a la lista',
          id: '[data-test-meter-group-list]',
          mount: (attrs) => mountMeterGroup({ props: { ui: { list: () => attrs } } }),
        })
      })

      describe('item', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.item al ítem',
          id: '[data-test-meter-group-item]',
          mount: (attrs) => mountMeterGroup({ props: { ui: { item: () => attrs } } }),
        })
      })

      describe('leading', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.leading al marcador',
          id: '[data-test-meter-group-leading]',
          mount: (attrs) => mountMeterGroup({ props: { ui: { leading: () => attrs } } }),
        })

        testAttrs({
          text: 'pasa atributos mediante ui.leading al icono',
          id: '[data-test-meter-group-icon]',
          mount: (attrs) =>
            mountMeterGroup({
              props: {
                items: [{ label: 'Fotos', value: 30, icon: 'image' }],
                ui: { leading: () => attrs },
              },
            }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.label al label',
          id: '[data-test-meter-group-label]',
          mount: (attrs) => mountMeterGroup({ props: { ui: { label: () => attrs } } }),
        })
      })

      describe('trailing', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.trailing al porcentaje',
          id: '[data-test-meter-group-trailing]',
          mount: (attrs) => mountMeterGroup({ props: { ui: { trailing: () => attrs } } }),
        })
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
      it('reemplaza el contenido del status', () => {
        const status = mountMeterGroup({
          props: { status: true },
          slots: { status: () => 'Almacenamiento casi lleno' },
        }).get('[data-test-meter-group-status]')

        expect(status.text()).toBe('Almacenamiento casi lleno')
      })

      it('no renderiza el slot cuando status es false', () => {
        const status = mountMeterGroup({
          props: { status: false },
          slots: { status: () => 'Almacenamiento casi lleno' },
        }).find('[data-test-meter-group-status]')

        expect(status.exists()).toBe(false)
      })
    })

    describe('leading', () => {
      it('reemplaza el marcador y el icono de todos los ítems', () => {
        const meterGroup = mountMeterGroup({
          props: {
            items: [
              { label: 'Apps', value: 20 },
              { label: 'Fotos', value: 30, icon: 'image' },
            ],
          },
          slots: {
            leading: ({ item }: MeterGroupItemContext) =>
              h('span', { 'data-test-custom-leading': item.label }, '★'),
          },
        })

        expect({
          custom: meterGroup
            .findAll('[data-test-custom-leading]')
            .map((leading) => leading.attributes('data-test-custom-leading')),
          leading: meterGroup.find('[data-test-meter-group-leading]').exists(),
          icon: meterGroup.find('[data-test-meter-group-icon]').exists(),
        }).toEqual({ custom: ['Apps', 'Fotos'], leading: false, icon: false })
      })
    })

    describe('leading-[slot]', () => {
      it('sobrescribe el slot leading y oculta el icono del ítem con ese slot', () => {
        const meterGroup = mountMeterGroup({
          props: {
            items: [
              { label: 'Apps', value: 20, slot: 'apps', icon: 'image' },
              { label: 'Fotos', value: 30 },
            ],
          },
          slots: {
            leading: ({ item }: MeterGroupItemContext) =>
              h('span', { 'data-test-custom-leading': item.label }, '★'),
            'leading-apps': ({ item }: MeterGroupItemContext) =>
              h('span', { 'data-test-custom-leading-apps': item.label }, '◆'),
          },
        })

        expect({
          specific: meterGroup
            .findAll('[data-test-custom-leading-apps]')
            .map((leading) => leading.attributes('data-test-custom-leading-apps')),
          shared: meterGroup
            .findAll('[data-test-custom-leading]')
            .map((leading) => leading.attributes('data-test-custom-leading')),
          icon: meterGroup.find('[data-test-meter-group-icon]').exists(),
        }).toEqual({ specific: ['Apps'], shared: ['Fotos'], icon: false })
      })
    })

    describe('label', () => {
      it('reemplaza el label de todos los ítems', () => {
        const labels = mountMeterGroup({
          props: {
            items: [
              { label: 'Apps', value: 20 },
              { label: 'Fotos', value: 30 },
            ],
          },
          slots: { label: ({ item }: MeterGroupItemContext) => `★ ${item.label}` },
        })
          .findAll('[data-test-meter-group-label]')
          .map((label) => label.text())

        expect(labels).toEqual(['★ Apps', '★ Fotos'])
      })
    })

    describe('label-[slot]', () => {
      it('sobrescribe el slot label del ítem con ese slot', () => {
        const labels = mountMeterGroup({
          props: {
            items: [
              { label: 'Apps', value: 20, slot: 'apps' },
              { label: 'Fotos', value: 30 },
            ],
          },
          slots: {
            label: ({ item }: MeterGroupItemContext) => `★ ${item.label}`,
            'label-apps': ({ item }: MeterGroupItemContext) => `◆ ${item.label}`,
          },
        })
          .findAll('[data-test-meter-group-label]')
          .map((label) => label.text())

        expect(labels).toEqual(['◆ Apps', '★ Fotos'])
      })

      it('muestra en la leyenda el ítem sin label que tiene su slot', () => {
        const labels = mountMeterGroup({
          props: {
            items: [{ value: 20, slot: 'apps' }, { value: 30 }],
          },
          slots: { 'label-apps': () => 'Aplicaciones' },
        })
          .findAll('[data-test-meter-group-label]')
          .map((label) => label.text())

        expect(labels).toEqual(['Aplicaciones'])
      })
    })

    describe('trailing', () => {
      it('reemplaza el porcentaje de todos los ítems', () => {
        const trailings = mountMeterGroup({
          props: {
            items: [
              { label: 'Apps', value: 20 },
              { label: 'Fotos', value: 30 },
            ],
          },
          slots: { trailing: ({ value }: MeterGroupItemContext) => `${value} GB` },
        })
          .findAll('[data-test-meter-group-trailing]')
          .map((trailing) => trailing.text())

        expect(trailings).toEqual(['20 GB', '30 GB'])
      })
    })

    describe('trailing-[slot]', () => {
      it('sobrescribe el slot trailing del ítem con ese slot', () => {
        const trailings = mountMeterGroup({
          props: {
            items: [
              { label: 'Apps', value: 20, slot: 'apps' },
              { label: 'Fotos', value: 30 },
            ],
          },
          slots: {
            trailing: ({ value }: MeterGroupItemContext) => `${value} GB`,
            'trailing-apps': () => 'Sin límite',
          },
        })
          .findAll('[data-test-meter-group-trailing]')
          .map((trailing) => trailing.text())

        expect(trailings).toEqual(['Sin límite', '30 GB'])
      })
    })
  })

  describe('variantsCss', () => {
    it.each(casesVariantsCss)('aplica las clases base de $name a $part', ({ input, expected }) => {
      const element = mountMeterGroup({ props: { status: true } }).get(input)

      expect(element.classes()).toEqual(expect.arrayContaining(expected))
    })
  })

  describe('context', () => {
    describe('MeterGroupContext', () => {
      it('cumple el contrato de MeterGroupContext en el slot status', () => {
        let context: MeterGroupContext | undefined
        mountMeterGroup({
          props: { ...propsContext, status: true },
          slots: {
            status: (value: MeterGroupContext) => {
              context = value
              return 'Slot'
            },
          },
        })

        expect(context).toEqual(expectedContext)
      })

      it.each(casesUiContext)('pasa MeterGroupContext a ui.%s', (name) => {
        const resolver = vi.fn(() => ({}))
        mountMeterGroup({ props: { ...propsContext, status: true, ui: { [name]: resolver } } })

        expect(resolver.mock.calls).toEqual([[expectedContext]])
      })
    })

    describe('MeterGroupItemContext', () => {
      it.each(casesSlotItemContext)(
        'cumple el contrato de MeterGroupItemContext en el slot %s',
        (name) => {
          const contexts: MeterGroupItemContext[] = []
          mountMeterGroup({
            props: propsContext,
            slots: {
              // Vue añade ref_for a los slots dentro de un v-for; no es parte del contexto
              [name]: (slotProps: MeterGroupItemContext & { ref_for?: boolean }) => {
                const { ref_for: _refFor, ...value } = slotProps
                void _refFor
                contexts.push(value)
                return 'Slot'
              },
            },
          })

          expect(contexts).toEqual(expectedItemContexts)
        },
      )

      it.each(casesSlotItemContext)('pasa MeterGroupItemContext al slot %s-[slot]', (name) => {
        let context: MeterGroupItemContext | undefined
        mountMeterGroup({
          props: propsContext,
          slots: {
            [`${name}-apps`]: (slotProps: MeterGroupItemContext & { ref_for?: boolean }) => {
              const { ref_for: _refFor, ...value } = slotProps
              void _refFor
              context = value
              return 'Slot'
            },
          },
        })

        expect(context).toEqual(expectedItemContexts[0])
      })

      it.each(casesUiItemContext)('pasa MeterGroupItemContext a ui.%s', (name) => {
        const resolver = vi.fn(() => ({}))
        mountMeterGroup({ props: { ...propsContext, ui: { [name]: resolver } } })

        expect(resolver.mock.calls).toEqual(expectedItemContexts.map((context) => [context]))
      })
    })
  })
})
