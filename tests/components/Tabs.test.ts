import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { h } from 'vue'

import {
  Tabs,
  type TabItem,
  type TabsContext,
  type TabsItemContext,
  type TabsProps,
} from '@/components/ui/Tabs'
import { themeColors } from '@/components/ui/constants'
import { Icon } from '@/components/ui/Icon'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

const tabs = [
  { slot: 'first', value: 'first', label: 'First' },
  { slot: 'second', value: 'second', label: 'Second' },
]

const slotTabs: TabItem[] = [
  { slot: 'first', value: 'first', label: 'First', icon: 'star', trailingIcon: 'heart' },
  { slot: 'second', value: 'second', label: 'Second' },
]

const casesModelValue = [
  { input: undefined, expected: undefined },
  { input: '', expected: '' },
  { input: 0, expected: 0 },
  { input: 1, expected: 1 },
  { input: 'first', expected: 'first' },
  { input: 'second', expected: 'second' },
  { input: 'missing', expected: 'missing' },
] satisfies Array<{ input: TabsProps['modelValue']; expected: TabsProps['modelValue'] }>

const casesUpdateModelValue = [
  { input: undefined, expected: [[undefined]] },
  { input: '', expected: [['']] },
  { input: 0, expected: [[0]] },
  { input: 'second', expected: [['second']] },
] satisfies Array<{ input: TabsProps['modelValue']; expected: Array<[TabsProps['modelValue']]> }>

const casesOrientation = [
  { input: undefined, expected: { rekaValue: 'horizontal', rootClass: 'flex-col' } },
  { input: 'horizontal', expected: { rekaValue: 'horizontal', rootClass: 'flex-col' } },
  { input: 'vertical', expected: { rekaValue: 'vertical', rootClass: 'flex-row' } },
] satisfies Array<{
  input: TabsProps['orientation']
  expected: { rekaValue: string; rootClass: string }
}>

const casesActivationMode = [
  { input: undefined, expected: 'automatic' },
  { input: 'automatic', expected: 'automatic' },
  { input: 'manual', expected: 'manual' },
] satisfies Array<{ input: TabsProps['activationMode']; expected: string }>

const casesLoop = [
  { input: undefined, expected: true },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{ input: TabsProps['loop']; expected: boolean }>

const casesUnmountOnHide = [
  { input: undefined, expected: true },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{ input: TabsProps['unmountOnHide']; expected: boolean }>

const defaultVariantClasses = {
  list: ['h-9', 'rounded-lg', 'bg-muted', 'p-[3px]'],
  trigger:
    'h-[calc(100%-1px)] flex-1 rounded-md border px-2 text-foreground data-[state=active]:bg-(--tabs-color) data-[state=active]:text-(--tabs-color-foreground) data-[state=active]:shadow-sm dark:data-[state=active]:border-input dark:data-[state=active]:bg-(--tabs-color) dark:data-[state=active]:text-(--tabs-color-foreground)'.split(
      ' ',
    ),
}

const lineVariantClasses = {
  list: 'relative h-auto gap-1 rounded-none bg-transparent p-0'.split(' '),
  trigger:
    'relative h-9 flex-none rounded-none border-0 bg-transparent px-3 text-muted-foreground shadow-none after:absolute after:bg-(--tabs-color) after:opacity-0 after:transition-opacity data-[state=active]:bg-transparent data-[state=active]:text-(--tabs-color) data-[state=active]:shadow-none data-[state=active]:after:opacity-100 dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-(--tabs-color)'.split(
      ' ',
    ),
}

const casesVariant = [
  {
    input: undefined,
    orientation: undefined,
    expected: { value: 'default', classes: defaultVariantClasses },
  },
  {
    input: 'default',
    orientation: undefined,
    expected: { value: 'default', classes: defaultVariantClasses },
  },
  {
    input: 'line',
    orientation: undefined,
    expected: {
      value: 'line',
      classes: {
        list: lineVariantClasses.list,
        trigger: [
          ...lineVariantClasses.trigger,
          'after:inset-x-0',
          'after:bottom-0',
          'after:h-0.5',
        ],
      },
    },
  },
  {
    input: 'line',
    orientation: 'vertical',
    expected: {
      value: 'line',
      classes: {
        list: [...lineVariantClasses.list, 'items-stretch'],
        trigger: [...lineVariantClasses.trigger, 'after:inset-y-0', 'after:left-0', 'after:w-0.5'],
      },
    },
  },
] satisfies Array<{
  input: TabsProps['variant']
  orientation?: TabsProps['orientation']
  expected: { value: string; classes: { list: string[]; trigger: string[] } }
}>

const casesTabValue = [
  { input: 'first', expected: 'first' },
  { input: '', expected: '' },
  { input: 0, expected: 0 },
  { input: 2, expected: 2 },
] satisfies Array<{ input: TabItem['value']; expected: TabItem['value'] }>

const casesTabLabel = [
  { input: undefined, expected: '' },
  { input: '', expected: '' },
  { input: 'Profile', expected: 'Profile' },
] satisfies Array<{ input: TabItem['label']; expected: string }>

const casesTabIcon = [
  { input: undefined, expected: undefined },
  { input: 'star', expected: 'star' },
  { input: 'heart', expected: 'heart' },
] satisfies Array<{ input: TabItem['icon']; expected: TabItem['icon'] }>

const casesTabTrailingIcon = [
  { input: undefined, expected: undefined },
  { input: 'star', expected: 'star' },
  { input: 'heart', expected: 'heart' },
] satisfies Array<{
  input: TabItem['trailingIcon']
  expected: TabItem['trailingIcon']
}>

const casesTabDisabled = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{ input: TabItem['disabled']; expected: boolean }>

const casesTabForceMount = [
  { input: undefined, expected: undefined },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{ input: TabItem['forceMount']; expected: TabItem['forceMount'] }>

const contextTabs: TabItem[] = [
  { slot: 'first', value: 'first', label: 'First', icon: 'star' },
  { slot: 'second', value: 0, label: 'Second', disabled: true },
  { slot: 'third', value: 'third', label: 'Third', trailingIcon: 'heart' },
]

const casesTabsContext = [
  {
    name: 'un tab',
    input: [contextTabs[0]!],
    expected: { tabs: [contextTabs[0]!] },
  },
  {
    name: 'varios tabs',
    input: contextTabs,
    expected: { tabs: contextTabs },
  },
] satisfies Array<{ name: string; input: TabItem[]; expected: TabsContext }>

const casesTabsItemContext = [
  {
    name: 'un tab activo',
    input: { tabs: [contextTabs[0]!], modelValue: 'first' },
    expected: [{ tab: contextTabs[0]!, index: 0, active: true, first: true, last: true }],
  },
  {
    name: 'un tab sin selección',
    input: { tabs: [contextTabs[0]!], modelValue: 'missing' },
    expected: [{ tab: contextTabs[0]!, index: 0, active: false, first: true, last: true }],
  },
  {
    name: 'primer tab activo',
    input: { tabs: contextTabs, modelValue: 'first' },
    expected: [
      { tab: contextTabs[0]!, index: 0, active: true, first: true, last: false },
      { tab: contextTabs[1]!, index: 1, active: false, first: false, last: false },
      { tab: contextTabs[2]!, index: 2, active: false, first: false, last: true },
    ],
  },
  {
    name: 'tab central activo con valor numérico',
    input: { tabs: contextTabs, modelValue: 0 },
    expected: [
      { tab: contextTabs[0]!, index: 0, active: false, first: true, last: false },
      { tab: contextTabs[1]!, index: 1, active: true, first: false, last: false },
      { tab: contextTabs[2]!, index: 2, active: false, first: false, last: true },
    ],
  },
  {
    name: 'último tab activo',
    input: { tabs: contextTabs, modelValue: 'third' },
    expected: [
      { tab: contextTabs[0]!, index: 0, active: false, first: true, last: false },
      { tab: contextTabs[1]!, index: 1, active: false, first: false, last: false },
      { tab: contextTabs[2]!, index: 2, active: true, first: false, last: true },
    ],
  },
] satisfies Array<{
  name: string
  input: Pick<TabsProps, 'tabs' | 'modelValue'>
  expected: TabsItemContext[]
}>

function mountTabs(options: MountingOptions<TabsProps> = {}) {
  return mount(Tabs, {
    ...options,
    props: { modelValue: 'first', tabs, ...options.props },
  })
}

describe('Tabs', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesModelValue)('pasa modelValue=$input a Reka TabsRoot', ({ input, expected }) => {
        const wrapper = mountTabs({ props: { modelValue: input } })
        expect(wrapper.getComponent(TabsRoot).props('modelValue')).toBe(expected)
      })
    })

    describe('orientation', () => {
      it.each(casesOrientation)('aplica orientation=$input', ({ input, expected }) => {
        const wrapper = mountTabs({ props: { orientation: input } })

        expect(wrapper.getComponent(TabsRoot).props('orientation')).toBe(expected.rekaValue)
        expect(wrapper.get('[data-test-tabs-root]').classes()).toContain(expected.rootClass)
      })
    })

    describe('activationMode', () => {
      it.each(casesActivationMode)(
        'pasa activationMode=$input a Reka TabsRoot',
        ({ input, expected }) => {
          const wrapper = mountTabs({ props: { activationMode: input } })
          expect(wrapper.getComponent(TabsRoot).props('activationMode')).toBe(expected)
        },
      )
    })

    describe('loop', () => {
      it.each(casesLoop)('pasa loop=$input a Reka TabsList', ({ input, expected }) => {
        const wrapper = mountTabs({ props: { loop: input } })
        expect(wrapper.getComponent(TabsList).props('loop')).toBe(expected)
      })
    })

    describe('unmountOnHide', () => {
      it.each(casesUnmountOnHide)(
        'pasa unmountOnHide=$input a Reka TabsRoot',
        ({ input, expected }) => {
          const wrapper = mountTabs({ props: { unmountOnHide: input } })
          expect(wrapper.getComponent(TabsRoot).props('unmountOnHide')).toBe(expected)
        },
      )
    })

    describe('variant', () => {
      it.each(casesVariant)(
        'aplica variant=$input orientation=$orientation',
        ({ input, expected, orientation }) => {
          const wrapper = mountTabs({ props: { variant: input, orientation } })
          const root = wrapper.get('[data-test-tabs-root]')
          const list = wrapper.get('[data-test-tabs-list]')
          const trigger = wrapper.get('[data-test-tabs-trigger]')

          expect(root.attributes('data-variant')).toBe(expected.value)
          expect(list.attributes('data-variant')).toBe(expected.value)
          expect(trigger.attributes('data-variant')).toBe(expected.value)
          expect(list.classes()).toEqual(expect.arrayContaining(expected.classes.list))
          expect(trigger.classes()).toEqual(expect.arrayContaining(expected.classes.trigger))
        },
      )
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color',
        id: '[data-test-tabs-root]',
        varColor: '--tabs-color',
        defaultColor: 'var(--primary, var(--primary))',
        theme: {
          colors: themeColors,
          foregroundVar: '--tabs-color-foreground',
          solidVar: '--tabs-solid',
          solidForegroundVar: '--tabs-solid-foreground',
        },
        mount: (color) => mountTabs({ props: { color } }),
      })
    })

    describe('tabs', () => {
      describe('value', () => {
        it.each(casesTabValue)('pasa value=$input a trigger y content', ({ input, expected }) => {
          const wrapper = mountTabs({
            props: { modelValue: input, tabs: [{ slot: 'item', value: input }] },
          })

          expect(wrapper.getComponent(TabsTrigger).props('value')).toBe(expected)
          expect(wrapper.getComponent(TabsContent).props('value')).toBe(expected)
        })
      })

      describe('label', () => {
        it.each(casesTabLabel)('renderiza label=$input', ({ input, expected }) => {
          const wrapper = mountTabs({
            props: { tabs: [{ slot: 'item', value: 'first', label: input }] },
          })

          expect(wrapper.get('[data-test-tabs-trigger]').text()).toBe(expected)
        })
      })

      describe('icon', () => {
        it.each(casesTabIcon)('renderiza icon=$input', ({ input, expected }) => {
          const wrapper = mountTabs({
            props: { tabs: [{ slot: 'item', value: 'first', icon: input }] },
          })
          const icon = wrapper.findComponent(Icon)

          expect(icon.exists()).toBe(expected !== undefined)
          if (expected) expect(icon.props('name')).toBe(expected)
        })
      })

      describe('trailingIcon', () => {
        it.each(casesTabTrailingIcon)('renderiza trailingIcon=$input', ({ input, expected }) => {
          const wrapper = mountTabs({
            props: { tabs: [{ slot: 'item', value: 'first', trailingIcon: input }] },
          })
          const icon = wrapper.findComponent(Icon)

          expect(icon.exists()).toBe(expected !== undefined)
          if (expected) expect(icon.props('name')).toBe(expected)
        })
      })

      describe('disabled', () => {
        it.each(casesTabDisabled)('pasa disabled=$input a TabsTrigger', ({ input, expected }) => {
          const wrapper = mountTabs({
            props: { tabs: [{ slot: 'item', value: 'first', disabled: input }] },
          })

          expect(wrapper.getComponent(TabsTrigger).props('disabled')).toBe(expected)
        })
      })

      describe('forceMount', () => {
        it.each(casesTabForceMount)(
          'pasa forceMount=$input a TabsContent',
          ({ input, expected }) => {
            const wrapper = mountTabs({
              props: { tabs: [{ slot: 'item', value: 'first', forceMount: input }] },
            })

            expect(wrapper.getComponent(TabsContent).props('forceMount')).toBe(expected)
          },
        )
      })
    })

    describe('ui', () => {
      describe('list', () => {
        testAttrs({
          text: 'pasa attrs, class y style a TabsList',
          id: '[data-test-tabs-list]',
          mount: (attrs) => mountTabs({ props: { ui: { list: () => attrs } } }),
        })
      })

      describe('contentWrapper', () => {
        testAttrs({
          text: 'pasa attrs, class y style al contenedor de paneles',
          id: '[data-test-tabs-content-wrapper]',
          mount: (attrs) => mountTabs({ props: { ui: { contentWrapper: () => attrs } } }),
        })
      })

      describe('trigger', () => {
        testAttrs({
          text: 'pasa attrs, class y style a TabsTrigger',
          id: '[data-test-tabs-trigger]',
          assertId: false,
          mount: (attrs) => mountTabs({ props: { ui: { trigger: () => attrs } } }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'pasa attrs, class y style a la etiqueta',
          id: '[data-test-tabs-trigger] span',
          mount: (attrs) => mountTabs({ props: { ui: { label: () => attrs } } }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'pasa attrs, class y style a TabsContent',
          id: '[data-test-tabs-content]',
          assertId: false,
          mount: (attrs) => mountTabs({ props: { ui: { content: () => attrs } } }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-tabs-root]',
      mount: (attrs) => mountTabs({ attrs }),
    })

    it.each([
      { as: undefined, asChild: undefined },
      { as: 'button', asChild: true },
    ])('mantiene la raíz como div con asChild=false para attrs=$as/$asChild', (attrs) => {
      const wrapper = mountTabs({ attrs })
      const rekaRoot = wrapper.getComponent(TabsRoot)

      expect(rekaRoot.props('as')).toBe('div')
      expect(rekaRoot.props('asChild')).toBe(false)
      expect(wrapper.get('[data-test-tabs-root]').element.tagName).toBe('DIV')
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it.each(casesUpdateModelValue)(
        'reemite update:modelValue=$input desde Reka TabsRoot',
        ({ input, expected }) => {
          const wrapper = mountTabs()

          wrapper.getComponent(TabsRoot).vm.$emit('update:modelValue', input)

          expect(wrapper.emitted('update:modelValue')).toEqual(expected)
        },
      )
    })
  })

  describe('slots', () => {
    describe('trigger', () => {
      it('sustituye el contenido de los triggers', () => {
        const wrapper = mountTabs({
          props: { tabs: slotTabs },
          slots: { trigger: () => h('span', 'Custom trigger') },
        })

        expect(
          wrapper.findAll('[data-test-tabs-trigger]').map((trigger) => trigger.text()),
        ).toEqual(['Custom trigger', 'Custom trigger'])
        expect(wrapper.findAllComponents(Icon)).toHaveLength(0)
      })
    })

    describe('leading', () => {
      it('sustituye el icono inicial', () => {
        const wrapper = mountTabs({
          props: { tabs: slotTabs },
          slots: { leading: () => h('span', 'Custom leading') },
        })

        expect(wrapper.get('[data-test-tabs-trigger]').text()).toContain('Custom leading')
        expect(wrapper.findAllComponents(Icon)).toHaveLength(1)
      })
    })

    describe('label', () => {
      it('sustituye la etiqueta', () => {
        const wrapper = mountTabs({
          props: { tabs: slotTabs },
          slots: { label: () => h('span', 'Custom label') },
        })

        expect(wrapper.get('[data-test-tabs-trigger]').text()).toBe('Custom label')
      })
    })

    describe('trailing', () => {
      it('sustituye el icono final', () => {
        const wrapper = mountTabs({
          props: { tabs: slotTabs },
          slots: { trailing: () => h('span', 'Custom trailing') },
        })

        expect(wrapper.get('[data-test-tabs-trigger]').text()).toContain('Custom trailing')
        expect(wrapper.findAllComponents(Icon)).toHaveLength(1)
      })
    })

    describe('content', () => {
      it('muestra el contenido personalizado del panel', () => {
        const wrapper = mountTabs({
          props: { tabs: slotTabs },
          slots: { content: () => h('p', 'Custom content') },
        })

        expect(wrapper.get('[data-test-tabs-content]').text()).toBe('Custom content')
      })
    })

    describe('trigger-[slot]', () => {
      it('sustituye solo el trigger indicado', () => {
        const wrapper = mountTabs({
          props: { tabs: slotTabs },
          slots: { 'trigger-first': () => h('span', 'Custom first trigger') },
        })

        expect(
          wrapper.findAll('[data-test-tabs-trigger]').map((trigger) => trigger.text()),
        ).toEqual(['Custom first trigger', 'Second'])
      })
    })

    describe('leading-[slot]', () => {
      it('sustituye solo el icono inicial indicado', () => {
        const wrapper = mountTabs({
          props: { tabs: slotTabs },
          slots: { 'leading-first': () => h('span', 'Custom first leading') },
        })

        expect(wrapper.get('[data-test-tabs-trigger]').text()).toContain('Custom first leading')
        expect(wrapper.findAllComponents(Icon)).toHaveLength(1)
      })
    })

    describe('label-[slot]', () => {
      it('sustituye solo la etiqueta indicada', () => {
        const wrapper = mountTabs({
          props: { tabs: slotTabs },
          slots: { 'label-first': () => h('span', 'Custom first label') },
        })

        expect(
          wrapper.findAll('[data-test-tabs-trigger]').map((trigger) => trigger.text()),
        ).toEqual(['Custom first label', 'Second'])
      })
    })

    describe('trailing-[slot]', () => {
      it('sustituye solo el icono final indicado', () => {
        const wrapper = mountTabs({
          props: { tabs: slotTabs },
          slots: { 'trailing-first': () => h('span', 'Custom first trailing') },
        })

        expect(wrapper.get('[data-test-tabs-trigger]').text()).toContain('Custom first trailing')
        expect(wrapper.findAllComponents(Icon)).toHaveLength(1)
      })
    })

    describe('content-[slot]', () => {
      it('muestra el contenido personalizado del panel indicado', () => {
        const wrapper = mountTabs({
          props: { tabs: slotTabs },
          slots: { 'content-first': () => h('p', 'Custom first content') },
        })

        expect(wrapper.get('[data-test-tabs-content]').text()).toBe('Custom first content')
      })
    })
  })

  describe('context', () => {
    describe('TabsContext', () => {
      it.each(casesTabsContext)('expone el contrato para $name', ({ input, expected }) => {
        const contexts: TabsContext[] = []

        mountTabs({
          props: { tabs: input },
          slots: {
            trigger: (context: TabsContext) => {
              contexts.push({ tabs: context.tabs })
              return h('span', 'Trigger')
            },
          },
        })

        expect(contexts).toHaveLength(input.length)
        for (const context of contexts) expect(context).toEqual(expected)
      })
    })

    describe('TabsItemContext', () => {
      it.each(casesTabsItemContext)('expone el contrato para $name', ({ input, expected }) => {
        const contexts = new Map<number, TabsItemContext>()
        const slots = Object.fromEntries(
          input.tabs!.map(({ slot }) => [
            `trigger-${slot}`,
            (context: TabsItemContext) => {
              const { tab, index, active, first, last } = context
              contexts.set(index, { tab, index, active, first, last })
              return h('span', 'Trigger')
            },
          ]),
        )

        mountTabs({ props: input, slots })

        expect([...contexts.values()]).toEqual(expected)
      })
    })
  })

  describe('variantsCss', () => {
    describe('tabsVariants.root', () => {
      it('aplica las clases base a la raíz', () => {
        expect(mountTabs().get('[data-test-tabs-root]').classes()).toEqual(
          expect.arrayContaining(['flex', 'gap-2']),
        )
      })
    })

    describe('tabsVariants.list', () => {
      it('aplica las clases base a la lista', () => {
        expect(mountTabs().get('[data-test-tabs-list]').classes()).toEqual(
          expect.arrayContaining(
            'inline-flex w-fit items-center justify-center text-muted-foreground aria-[orientation=vertical]:h-fit aria-[orientation=vertical]:flex-col'.split(
              ' ',
            ),
          ),
        )
      })
    })

    describe('tabsVariants.trigger', () => {
      it('aplica las clases base a cada tab', () => {
        for (const trigger of mountTabs().findAll('[data-test-tabs-trigger]')) {
          expect(trigger.classes()).toEqual(
            expect.arrayContaining(
              'inline-flex items-center justify-center gap-1.5 border-transparent py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-(--tabs-color) focus-visible:ring-3 focus-visible:ring-(--tabs-color)/50 focus-visible:outline-1 focus-visible:outline-(--tabs-color) disabled:pointer-events-none disabled:opacity-50 dark:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'.split(
                ' ',
              ),
            ),
          )
        }
      })
    })

    describe('tabsVariants.contentWrapper', () => {
      it('aplica las clases base al contenedor de paneles', () => {
        expect(mountTabs().get('[data-test-tabs-content-wrapper]').classes()).toEqual(
          expect.arrayContaining(['min-w-0', 'flex-1']),
        )
      })
    })

    describe('tabsVariants.content', () => {
      it('aplica las clases base al panel', () => {
        expect(mountTabs().get('[data-test-tabs-content]').classes()).toEqual(
          expect.arrayContaining([
            'flex-1',
            'outline-none',
            'rounded-md',
            'focus-visible:ring-3',
            'focus-visible:ring-(--tabs-color)/50',
          ]),
        )
      })
    })
  })
})
