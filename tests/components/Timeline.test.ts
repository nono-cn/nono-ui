import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Timeline, type TimelineItemContext, type TimelineProps } from '@/components/ui/Timeline'
import { themeColors } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

const items = [
  {
    value: 'created',
    label: 'Created',
    description: 'The request was opened.',
    icon: 'file' as const,
  },
  {
    value: 'approved',
    label: 'Approved',
    description: 'The request was approved.',
    icon: 'check' as const,
  },
  {
    value: 'completed',
    label: 'Completed',
    description: 'The request is complete.',
    icon: 'success' as const,
  },
]

const casesReverse = [
  { input: undefined, expected: ['Created', 'Approved', 'Completed'] },
  { input: false, expected: ['Created', 'Approved', 'Completed'] },
  { input: true, expected: ['Completed', 'Approved', 'Created'] },
] satisfies Array<{ input: TimelineProps['reverse']; expected: string[] }>

const casesSize = [
  { input: undefined, expected: ['size-8', 'text-xl'] },
  { input: 'xs', expected: ['size-6', 'text-xs'] },
  { input: 'sm', expected: ['size-7', 'text-base'] },
  { input: 'md', expected: ['size-8', 'text-xl'] },
  { input: 'lg', expected: ['size-9', 'text-2xl'] },
  { input: 'xl', expected: ['size-10', 'text-[1.75rem]'] },
] satisfies Array<{ input: TimelineProps['size']; expected: string[] }>

const casesAlign = [
  {
    input: undefined,
    expected: { item: ['ms-5', 'ps-8'], position: ['start-0', 'start-0', 'start-0'] },
  },
  { input: 'left', expected: { item: ['me-5', 'pe-8'], position: ['end-0', 'end-0', 'end-0'] } },
  {
    input: 'right',
    expected: { item: ['ms-5', 'ps-8'], position: ['start-0', 'start-0', 'start-0'] },
  },
  {
    input: 'alternate',
    expected: {
      item: ['w-1/2', 'odd:self-start', 'even:self-end'],
      position: ['end-0', 'start-0', 'end-0'],
    },
  },
] satisfies Array<{
  input: TimelineProps['align']
  expected: { item: string[]; position: string[] }
}>

const casesOrientation = [
  {
    input: undefined,
    expected: {
      root: ['flex-col'],
      item: ['flex-col', 'not-last:pb-6'],
      fullWidth: false,
      description: ['mt-2'],
      indicator: ['top-0'],
      separator: ['top-0', 'bottom-0', 'w-0.5'],
    },
  },
  {
    input: 'vertical',
    expected: {
      root: ['flex-col'],
      item: ['flex-col', 'not-last:pb-6'],
      fullWidth: false,
      description: ['mt-2'],
      indicator: ['top-0'],
      separator: ['top-0', 'bottom-0', 'w-0.5'],
    },
  },
  {
    input: 'horizontal',
    expected: {
      root: ['flex-row', 'overflow-x-auto'],
      item: ['min-w-48', 'flex-1', 'not-last:pe-8'],
      fullWidth: true,
      description: ['mt-3', 'w-full'],
      indicator: ['start-0'],
      separator: ['start-0', 'h-0.5', 'w-full'],
    },
  },
] satisfies Array<{
  input: TimelineProps['orientation']
  expected: {
    root: string[]
    item: string[]
    fullWidth: boolean
    description: string[]
    indicator: string[]
    separator: string[]
  }
}>

const casesModelValue = [
  {
    input: undefined,
    expected: { indicator: [false, false, false], separator: [false, false, false] },
  },
  {
    input: 'missing',
    expected: { indicator: [false, false, false], separator: [false, false, false] },
  },
  {
    input: 'created',
    expected: { indicator: [true, false, false], separator: [false, false, false] },
  },
  {
    input: 'approved',
    expected: { indicator: [true, true, false], separator: [true, false, false] },
  },
  {
    input: 'completed',
    expected: { indicator: [true, true, true], separator: [true, true, false] },
  },
] satisfies Array<{
  input: TimelineProps['modelValue']
  expected: { indicator: boolean[]; separator: boolean[] }
}>

const casesColorCompleted = [
  {
    input: false,
    expected: {
      indicator: ['border-border', 'bg-background', 'text-muted-foreground'],
      separator: 'bg-border',
    },
  },
  {
    input: true,
    expected: {
      indicator: [
        'border-(--timeline-color)/20',
        'bg-(--timeline-color)',
        'text-(--timeline-color-foreground)',
      ],
      separator: 'bg-(--timeline-color)/40',
    },
  },
] satisfies Array<{ input: boolean; expected: { indicator: string[]; separator: string } }>

const casesTimelineItemContext = [
  {
    name: 'valor inicial',
    input: {},
    expected: [
      {
        modelValue: undefined,
        item: items[0]!,
        index: 0,
        active: false,
        completed: false,
        first: true,
        last: false,
        itemAlign: 'right',
      },
      {
        modelValue: undefined,
        item: items[1]!,
        index: 1,
        active: false,
        completed: false,
        first: false,
        last: false,
        itemAlign: 'right',
      },
      {
        modelValue: undefined,
        item: items[2]!,
        index: 2,
        active: false,
        completed: false,
        first: false,
        last: true,
        itemAlign: 'right',
      },
    ],
  },
  {
    name: 'valor activo intermedio',
    input: { modelValue: 'approved' },
    expected: [
      {
        modelValue: 'approved',
        item: items[0]!,
        index: 0,
        active: false,
        completed: true,
        first: true,
        last: false,
        itemAlign: 'right',
      },
      {
        modelValue: 'approved',
        item: items[1]!,
        index: 1,
        active: true,
        completed: true,
        first: false,
        last: false,
        itemAlign: 'right',
      },
      {
        modelValue: 'approved',
        item: items[2]!,
        index: 2,
        active: false,
        completed: false,
        first: false,
        last: true,
        itemAlign: 'right',
      },
    ],
  },
  {
    name: 'orden inverso y alineación alterna',
    input: { modelValue: 'approved', reverse: true, align: 'alternate' },
    expected: [
      {
        modelValue: 'approved',
        item: items[2]!,
        index: 0,
        active: false,
        completed: true,
        first: true,
        last: false,
        itemAlign: 'left',
      },
      {
        modelValue: 'approved',
        item: items[1]!,
        index: 1,
        active: true,
        completed: true,
        first: false,
        last: false,
        itemAlign: 'right',
      },
      {
        modelValue: 'approved',
        item: items[0]!,
        index: 2,
        active: false,
        completed: false,
        first: false,
        last: true,
        itemAlign: 'left',
      },
    ],
  },
] satisfies Array<{
  name: string
  input: Partial<TimelineProps>
  expected: TimelineItemContext[]
}>

function mountTimeline(options: MountingOptions<TimelineProps> = {}) {
  return mount(Timeline, { ...options, props: { items, ...options.props } })
}

describe('Timeline', () => {
  describe('props', () => {
    describe('size', () => {
      it.each(casesSize)(
        'aplica las clases de size=$input a cada indicador',
        ({ input, expected }) => {
          const indicators = mountTimeline({ props: { size: input } }).findAll(
            '[data-test-timeline-indicator]',
          )

          expect(indicators).toHaveLength(items.length)
          for (const indicator of indicators) {
            expect(indicator.classes()).toEqual(expect.arrayContaining(expected))
          }
        },
      )
    })

    describe('align', () => {
      it.each(casesAlign)('aplica las clases de align=$input', ({ input, expected }) => {
        const renderedItems = mountTimeline({ props: { align: input } }).findAll(
          '[data-test-timeline-item]',
        )

        expect(renderedItems).toHaveLength(expected.position.length)
        renderedItems.forEach((item, index) => {
          expect(item.classes()).toEqual(expect.arrayContaining(expected.item))
          expect(item.get('[data-test-timeline-indicator]').classes()).toContain(
            expected.position[index],
          )
          expect(item.get('[data-test-timeline-separator]').classes()).toContain(
            expected.position[index],
          )
        })
      })
    })

    describe('orientation', () => {
      it.each(casesOrientation)(
        'aplica las clases de orientation=$input',
        ({ input, expected }) => {
          const wrapper = mountTimeline({ props: { orientation: input } })

          expect(wrapper.get('[data-test-timeline-root]').classes()).toEqual(
            expect.arrayContaining(expected.root),
          )
          expect(wrapper.get('[data-test-timeline-item]').classes()).toEqual(
            expect.arrayContaining(expected.item),
          )
          expect(wrapper.get('[data-test-timeline-content]').classes().includes('w-full')).toBe(
            expected.fullWidth,
          )
          expect(wrapper.get('[data-test-timeline-header]').classes().includes('w-full')).toBe(
            expected.fullWidth,
          )
          expect(wrapper.get('[data-test-timeline-description]').classes()).toEqual(
            expect.arrayContaining(expected.description),
          )
          expect(wrapper.get('[data-test-timeline-indicator]').classes()).toEqual(
            expect.arrayContaining(expected.indicator),
          )
          expect(wrapper.get('[data-test-timeline-separator]').classes()).toEqual(
            expect.arrayContaining(expected.separator),
          )
        },
      )
    })

    describe('modelValue', () => {
      it.each(casesModelValue)(
        'marca los pasos completados con modelValue=$input',
        ({ input, expected }) => {
          const wrapper = mountTimeline({ props: { modelValue: input } })

          expect(
            wrapper
              .findAll('[data-test-timeline-indicator]')
              .map((indicator) => indicator.classes().includes('bg-(--timeline-color)')),
          ).toEqual(expected.indicator)
          expect(
            wrapper
              .findAll('[data-test-timeline-separator]')
              .map((separator) => separator.classes().includes('bg-(--timeline-color)/40')),
          ).toEqual(expected.separator)
        },
      )

      it('reconoce un valor numérico del item', () => {
        const wrapper = mountTimeline({
          props: { items: [{ value: 0, label: 'Start' }, ...items], modelValue: 0 },
        })

        expect(
          wrapper
            .findAll('[data-test-timeline-indicator]')
            .map((indicator) => indicator.classes().includes('bg-(--timeline-color)')),
        ).toEqual([true, false, false, false])
      })
    })

    describe('color', () => {
      for (const [node, id] of [
        ['indicador', '[data-test-timeline-indicator]'],
        ['separador', '[data-test-timeline-separator]'],
      ] as const) {
        testColor({
          text: `resuelve el color del ${node}`,
          id,
          varColor: '--timeline-color',
          defaultColor: 'var(--primary, var(--primary))',
          theme: {
            colors: themeColors,
            foregroundVar: '--timeline-color-foreground',
            solidVar: '--timeline-solid',
            solidForegroundVar: '--timeline-solid-foreground',
          },
          mount: (color) => mountTimeline({ props: { color } }),
        })
      }

      it.each(casesColorCompleted)(
        'aplica las clases de color con completed=$input',
        ({ input, expected }) => {
          const wrapper = mountTimeline({ props: { modelValue: input ? 'approved' : undefined } })

          expect(wrapper.get('[data-test-timeline-indicator]').classes()).toEqual(
            expect.arrayContaining(expected.indicator),
          )
          expect(wrapper.get('[data-test-timeline-separator]').classes()).toContain(
            expected.separator,
          )
        },
      )
    })

    describe('reverse', () => {
      it.each(casesReverse)(
        'muestra los items en el orden esperado con reverse=$input',
        ({ input, expected }) => {
          const wrapper = mountTimeline({ props: { reverse: input } })

          expect(
            wrapper.findAll('[data-test-timeline-label]').map((label) => label.text()),
          ).toEqual(expected)
        },
      )

      it('no modifica el orden del array original', () => {
        const source = [...items]
        const originalOrder = source.map((item) => item.value)

        mountTimeline({ props: { items: source, reverse: true } })

        expect(source.map((item) => item.value)).toEqual(originalOrder)
      })
    })

    describe('ui', () => {
      describe('item', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.item',
          id: '[data-test-timeline-item]',
          mount: (attrs) => mountTimeline({ props: { ui: { item: () => attrs } } }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.content',
          id: '[data-test-timeline-content]',
          mount: (attrs) => mountTimeline({ props: { ui: { content: () => attrs } } }),
        })
      })

      describe('header', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.header',
          id: '[data-test-timeline-header]',
          mount: (attrs) => mountTimeline({ props: { ui: { header: () => attrs } } }),
        })
      })

      describe('separator', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.separator',
          id: '[data-test-timeline-separator]',
          mount: (attrs) => mountTimeline({ props: { ui: { separator: () => attrs } } }),
        })
      })

      describe('indicator', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.indicator',
          id: '[data-test-timeline-indicator]',
          mount: (attrs) => mountTimeline({ props: { ui: { indicator: () => attrs } } }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.label',
          id: '[data-test-timeline-label]',
          mount: (attrs) => mountTimeline({ props: { ui: { label: () => attrs } } }),
        })
      })

      describe('description', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.description',
          id: '[data-test-timeline-description]',
          mount: (attrs) => mountTimeline({ props: { ui: { description: () => attrs } } }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-timeline-root]',
      mount: (attrs) => mountTimeline({ attrs }),
    })

    it('asigna role=list a la raíz y role=listitem a cada item', () => {
      const wrapper = mountTimeline()
      const renderedItems = wrapper.findAll('[data-test-timeline-item]')

      expect(wrapper.get('[data-test-timeline-root]').attributes('role')).toBe('list')
      expect(renderedItems).toHaveLength(items.length)
      for (const item of renderedItems) {
        expect(item.attributes('role')).toBe('listitem')
      }
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it('emite el nuevo valor cuando cambia la prop externamente', async () => {
        const wrapper = mountTimeline({ props: { modelValue: 'created' } })

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()

        await wrapper.setProps({ modelValue: 'approved' })
        await wrapper.setProps({ modelValue: 0 })
        await wrapper.setProps({ modelValue: undefined })

        expect(wrapper.emitted('update:modelValue')).toEqual([['approved'], [0], [undefined]])
      })

      it('no emite si modelValue conserva el mismo valor', async () => {
        const wrapper = mountTimeline({ props: { modelValue: 'created' } })

        await wrapper.setProps({ modelValue: 'created' })

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      })
    })
  })

  describe('slots', () => {
    describe('header', () => {
      it('renderiza el header propio y sustituye las etiquetas por defecto', () => {
        const wrapper = mountTimeline({
          slots: { header: () => h('strong', { 'data-test-slot-header': '' }, 'Custom header') },
        })

        expect(wrapper.findAll('[data-test-slot-header]')).toHaveLength(items.length)
        expect(wrapper.find('[data-test-timeline-label]').exists()).toBe(false)
      })
    })

    describe('label', () => {
      it('renderiza la etiqueta propia y sustituye las etiquetas por defecto', () => {
        const wrapper = mountTimeline({
          slots: { label: () => h('strong', { 'data-test-slot-label': '' }, 'Custom label') },
        })

        expect(wrapper.findAll('[data-test-slot-label]')).toHaveLength(items.length)
        expect(wrapper.find('[data-test-timeline-label]').exists()).toBe(false)
      })
    })

    describe('description', () => {
      it('renderiza la descripción propia y sustituye el texto por defecto', () => {
        const wrapper = mountTimeline({
          slots: {
            description: () =>
              h('strong', { 'data-test-slot-description': '' }, 'Custom description'),
          },
        })

        expect(wrapper.findAll('[data-test-slot-description]')).toHaveLength(items.length)
        for (const item of items) {
          expect(wrapper.text()).not.toContain(item.description)
        }
      })
    })

    describe('indicator', () => {
      it('renderiza el indicador propio y sustituye los iconos por defecto', () => {
        const wrapper = mountTimeline({
          slots: { indicator: () => h('span', { 'data-test-slot-indicator': '' }, '★') },
        })

        expect(wrapper.findAll('[data-test-slot-indicator]')).toHaveLength(items.length)
        expect(wrapper.find('[data-test-timeline-indicator-icon]').exists()).toBe(false)
      })
    })

    describe('header-{slot}', () => {
      it('renderiza el header del item indicado y conserva el fallback de los demás', () => {
        const wrapper = mountTimeline({
          slots: {
            'header-created': () => h('strong', { 'data-test-slot-header-created': '' }, 'Today'),
          },
        })

        expect(wrapper.get('[data-test-slot-header-created]').text()).toBe('Today')
        expect(wrapper.findAll('[data-test-timeline-label]')).toHaveLength(items.length - 1)
        expect(wrapper.get('[data-test-timeline-item]').text()).not.toContain('Created')
      })
    })

    describe('label-{slot}', () => {
      it('renderiza la etiqueta del item indicado y conserva el fallback de los demás', () => {
        const wrapper = mountTimeline({
          slots: {
            'label-created': () => h('strong', { 'data-test-slot-label-created': '' }, 'New'),
          },
        })

        expect(wrapper.get('[data-test-slot-label-created]').text()).toBe('New')
        expect(wrapper.findAll('[data-test-timeline-label]')).toHaveLength(items.length - 1)
        expect(wrapper.get('[data-test-timeline-item]').text()).not.toContain('Created')
      })
    })

    describe('description-{slot}', () => {
      it('renderiza la descripción del item indicado y conserva el fallback de los demás', () => {
        const wrapper = mountTimeline({
          slots: {
            'description-created': () =>
              h('strong', { 'data-test-slot-description-created': '' }, 'Opened today'),
          },
        })

        expect(wrapper.get('[data-test-slot-description-created]').text()).toBe('Opened today')
        expect(wrapper.get('[data-test-timeline-description]').text()).toBe('Opened today')
        expect(wrapper.findAll('[data-test-timeline-description]')[1]?.text()).toBe(
          items[1]?.description,
        )
      })
    })

    describe('indicator-{slot}', () => {
      it('renderiza el indicador del item indicado y conserva los iconos de los demás', () => {
        const wrapper = mountTimeline({
          slots: {
            'indicator-created': () => h('span', { 'data-test-slot-indicator-created': '' }, '★'),
          },
        })

        expect(wrapper.get('[data-test-slot-indicator-created]').text()).toBe('★')
        expect(wrapper.findAll('[data-test-timeline-indicator-icon]')).toHaveLength(
          items.length - 1,
        )
        expect(
          wrapper
            .get('[data-test-timeline-indicator]')
            .find('[data-test-timeline-indicator-icon]')
            .exists(),
        ).toBe(false)
      })
    })
  })

  describe('context', () => {
    describe('timelineItemContext', () => {
      it.each(casesTimelineItemContext)(
        'pasa el contrato completo a cada ui para $name',
        ({ input, expected }) => {
          const contexts = {
            item: [] as TimelineItemContext[],
            content: [] as TimelineItemContext[],
            header: [] as TimelineItemContext[],
            separator: [] as TimelineItemContext[],
            indicator: [] as TimelineItemContext[],
            label: [] as TimelineItemContext[],
            description: [] as TimelineItemContext[],
          }

          mountTimeline({
            props: {
              ...input,
              ui: {
                item: (context) => {
                  contexts.item.push(context)
                  return {}
                },
                content: (context) => {
                  contexts.content.push(context)
                  return {}
                },
                header: (context) => {
                  contexts.header.push(context)
                  return {}
                },
                separator: (context) => {
                  contexts.separator.push(context)
                  return {}
                },
                indicator: (context) => {
                  contexts.indicator.push(context)
                  return {}
                },
                label: (context) => {
                  contexts.label.push(context)
                  return {}
                },
                description: (context) => {
                  contexts.description.push(context)
                  return {}
                },
              },
            },
          })

          expect(contexts).toEqual({
            item: expected,
            content: expected,
            header: expected,
            separator: expected,
            indicator: expected,
            label: expected,
            description: expected,
          })
        },
      )

      it.each(casesTimelineItemContext)(
        'pasa el contrato completo a cada slot para $name',
        ({ input, expected }) => {
          for (const slot of ['header', 'label', 'description', 'indicator'] as const) {
            const contexts: TimelineItemContext[] = []
            mountTimeline({
              props: input,
              slots: {
                [slot]: (context: TimelineItemContext) => {
                  contexts.push(context)
                  return h('span', slot)
                },
              },
            })
            expect(contexts).toEqual(expected.map((context) => expect.objectContaining(context)))

            const itemContexts: TimelineItemContext[] = []
            const itemSlot = `${slot}-${expected[0]!.item.value}`
            mountTimeline({
              props: input,
              slots: {
                [itemSlot]: (context: TimelineItemContext) => {
                  itemContexts.push(context)
                  return h('span', itemSlot)
                },
              },
            })
            expect(itemContexts).toEqual([expect.objectContaining(expected[0])])
          }
        },
      )
    })
  })

  describe('variantsCss', () => {
    describe('timelineVariants', () => {
      it('aplica las clases base a la raíz', () => {
        expect(mountTimeline().get('[data-test-timeline-root]').classes()).toEqual(
          expect.arrayContaining(['group/timeline', 'flex', 'w-full', 'list-none']),
        )
      })
    })

    describe('timelineItemVariants', () => {
      it('aplica las clases base a cada item', () => {
        const wrapper = mountTimeline()

        for (const item of wrapper.findAll('[data-test-timeline-item]')) {
          expect(item.classes()).toEqual(
            expect.arrayContaining(['group/timeline-item', 'relative', 'min-w-0']),
          )
        }
      })
    })

    describe('timelineContentVariants', () => {
      it('aplica las clases base al contenido', () => {
        expect(mountTimeline().get('[data-test-timeline-content]').classes()).toEqual(
          expect.arrayContaining(['flex', 'min-w-0', 'flex-col', 'gap-0.5']),
        )
      })
    })

    describe('timelineHeaderVariants', () => {
      it('expande la cabecera en orientación horizontal', () => {
        expect(
          mountTimeline({ props: { orientation: 'horizontal' } })
            .get('[data-test-timeline-header]')
            .classes(),
        ).toContain('w-full')
      })
    })

    describe('timelineLabelVariants', () => {
      it('aplica las clases base a la etiqueta', () => {
        expect(mountTimeline().get('[data-test-timeline-label]').classes()).toEqual(
          expect.arrayContaining(['text-sm', 'font-semibold', 'text-foreground']),
        )
      })
    })

    describe('timelineDescriptionVariants', () => {
      it('aplica las clases base a la descripción', () => {
        expect(mountTimeline().get('[data-test-timeline-description]').classes()).toEqual(
          expect.arrayContaining(['text-sm', 'text-muted-foreground']),
        )
      })
    })

    describe('timelineIndicatorVariants', () => {
      it('aplica las clases base al indicador', () => {
        expect(mountTimeline().get('[data-test-timeline-indicator]').classes()).toEqual(
          expect.arrayContaining([
            'absolute',
            'flex',
            'rounded-full',
            'border-2',
            '[&_svg]:size-[1em]',
          ]),
        )
      })
    })

    describe('timelineSeparatorVariants', () => {
      it('aplica las clases base al separador', () => {
        expect(mountTimeline().get('[data-test-timeline-separator]').classes()).toEqual(
          expect.arrayContaining([
            'pointer-events-none',
            'absolute',
            'transition-colors',
            'group-last/timeline-item:hidden',
          ]),
        )
      })
    })
  })
})
