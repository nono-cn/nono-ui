import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'

import {
  Tabs,
  type TabItem,
  type TabsContext,
  type TabsItemContext,
  type TabsProps,
} from '@/components/ui/Tabs'
import { testAttrs } from '../utils/testAttrs'
import { testIconConfig } from '../utils/testIconConfig'

const tabs: TabItem[] = [
  {
    slot: 'overview',
    value: 'overview',
    label: 'Overview',
    icon: { name: 'layoutDashboard' },
    trailingIcon: { name: 'check' },
  },
  {
    slot: 'settings',
    value: 'settings',
    label: 'Settings',
  },
  {
    slot: 'disabled',
    value: 'disabled',
    label: 'Disabled',
    disabled: true,
  },
]

function mountTabs(options: MountingOptions<TabsProps> = {}) {
  return mount(Tabs, options)
}

describe('Tabs', () => {
  describe('props', () => {
    describe('value', () => {
      it.each([
        { input: undefined, expected: undefined },
        { input: 'settings', expected: 'settings' },
        { input: 2, expected: 2 },
      ])('pasa input=$input como expected=$expected a TabsRoot', ({ input, expected }) => {
        const wrapper = mountTabs({ props: { tabs, value: input } })

        expect(wrapper.getComponent(TabsRoot).props('modelValue')).toBe(expected)
      })
    })

    describe('orientation', () => {
      it.each([
        { input: undefined, expected: 'horizontal' },
        { input: 'horizontal', expected: 'horizontal' },
        { input: 'vertical', expected: 'vertical' },
      ])('pasa input=$input como expected=$expected', ({ input, expected }) => {
        const wrapper = mountTabs({ props: { tabs, orientation: input } })
        const root = wrapper.getComponent(TabsRoot)

        expect(root.props('orientation')).toBe(expected)
      })
    })

    describe('activationMode', () => {
      it.each([
        { input: undefined, expected: 'automatic' },
        { input: 'automatic', expected: 'automatic' },
        { input: 'manual', expected: 'manual' },
      ])('pasa input=$input como expected=$expected', ({ input, expected }) => {
        const wrapper = mountTabs({ props: { tabs, activationMode: input } })

        expect(wrapper.getComponent(TabsRoot).props('activationMode')).toBe(expected)
      })
    })

    describe('unmountOnHide', () => {
      it.each([
        { input: undefined, expected: true },
        { input: true, expected: true },
        { input: false, expected: false },
      ])('pasa input=$input como expected=$expected', ({ input, expected }) => {
        const wrapper = mountTabs({ props: { tabs, unmountOnHide: input } })

        expect(wrapper.getComponent(TabsRoot).props('unmountOnHide')).toBe(expected)
      })
    })

    describe('loop', () => {
      it.each([
        { input: undefined, expected: true },
        { input: true, expected: true },
        { input: false, expected: false },
      ])('pasa input=$input como expected=$expected to TabsList', ({ input, expected }) => {
        const wrapper = mountTabs({ props: { tabs, loop: input } })

        expect(wrapper.getComponent(TabsList).props('loop')).toBe(expected)
      })
    })

    describe('variant', () => {
      it.each([
        { input: undefined, expectedListClasses: [], expectedTriggerClasses: [] },
        { input: 'default', expectedListClasses: [], expectedTriggerClasses: [] },
        {
          input: 'line',
          expectedListClasses: [
            'relative',
            'h-auto',
            'gap-1',
            'rounded-none',
            'bg-transparent',
            'p-0',
          ],
          expectedTriggerClasses: [
            'relative',
            'h-9',
            'flex-none',
            'rounded-none',
            'border-0',
            'bg-transparent',
            'px-3',
            'text-muted-foreground',
            'shadow-none',
          ],
        },
      ])(
        'pasa input=$input con las clases esperadas',
        ({ input, expectedListClasses, expectedTriggerClasses }) => {
          const wrapper = mountTabs({ props: { tabs, variant: input } })
          const list = wrapper.get('[data-test-tabs-list]')
          const trigger = wrapper.get('[data-test-tabs-trigger]')

          expect(list.classes()).toEqual(expect.arrayContaining(expectedListClasses))
          expect(trigger.classes()).toEqual(expect.arrayContaining(expectedTriggerClasses))
        },
      )
    })

    describe('tabs', () => {
      it.each([
        { input: [], expectedTriggers: 0, expectedContents: 0 },
        { input: tabs, expectedTriggers: 3, expectedContents: 3 },
      ])(
        'renderiza input=$input con el numero esperado de elementos',
        ({ input, expectedTriggers, expectedContents }) => {
          const wrapper = mountTabs({ props: { tabs: input } })

          expect(wrapper.findAll('[data-test-tabs-trigger]')).toHaveLength(expectedTriggers)
          expect(wrapper.findAll('[data-test-tabs-content]')).toHaveLength(expectedContents)
        },
      )

      it('pasa el estado del trigger a TabsTrigger', () => {
        const wrapper = mountTabs({ props: { tabs } })
        const trigger = wrapper.findAllComponents(TabsTrigger)[2]

        expect(trigger.props('value')).toBe('disabled')
        expect(trigger.props('disabled')).toBe(true)
      })

      it('pasa forceMount a TabsContent', () => {
        const input: TabItem[] = [
          {
            slot: 'one',
            value: 'one',
            label: 'One',
            forceMount: true,
          },
        ]
        const wrapper = mountTabs({ props: { tabs: input } })
        const content = wrapper.getComponent(TabsContent)

        expect(content.props('value')).toBe('one')
        expect(content.props('forceMount')).toBe(true)
      })

      describe('icon', () => {
        testIconConfig({
          text: 'renderiza el icono',
          id: '[data-test-tabs-trigger] [data-test-icon-root]',
          default: 'layoutDashboard',
          mount: (input) => mountTabs({ props: { tabs: [{ ...tabs[0], icon: input }] } }),
        })
      })

      describe('trailingIcon', () => {
        testIconConfig({
          text: 'renderiza trailingIcon',
          id: '[data-test-tabs-trigger] [data-test-icon-root]',
          default: 'check',
          mount: (input) =>
            mountTabs({ props: { tabs: [{ ...tabs[0], icon: undefined, trailingIcon: input }] } }),
        })
      })
    })

    describe('ui', () => {
      describe('root', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.root',
          id: '[data-test-tabs-root]',
          mount: (attrs) => mountTabs({ props: { ui: { root: () => attrs } } }),
        })
      })

      describe('list', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.list',
          id: '[data-test-tabs-list]',
          mount: (attrs) => mountTabs({ props: { tabs, ui: { list: () => attrs } } }),
        })
      })

      describe('contentWrapper', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.contentWrapper',
          id: '[data-test-tabs-content-wrapper]',
          mount: (attrs) => mountTabs({ props: { tabs, ui: { contentWrapper: () => attrs } } }),
        })
      })

      describe('trigger', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.trigger',
          id: '[data-test-tabs-trigger]',
          assertId: false,
          mount: (attrs) => mountTabs({ props: { tabs, ui: { trigger: () => attrs } } }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.label',
          id: '[data-test-tabs-trigger] span',
          assertId: false,
          mount: (attrs) => mountTabs({ props: { tabs, ui: { label: () => attrs } } }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.content',
          id: '[data-test-tabs-content]',
          assertId: false,
          mount: (attrs) => mountTabs({ props: { tabs, ui: { content: () => attrs } } }),
        })
      })
    })
  })

  describe('root', () => {
    it('mantiene el elemento raiz fijo como div', () => {
      const wrapper = mountTabs({ attrs: { as: 'section', asChild: true } })
      const root = wrapper.getComponent(TabsRoot)

      expect(root.props('as')).toBe('div')
      expect(root.props('asChild')).toBe(false)
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'reenvia atributos arbitrarios, class y style a la raiz',
      id: '[data-test-tabs-root]',
      mount: (attrs) => mountTabs({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it('reenvia las actualizaciones del modelo de TabsRoot', async () => {
        const wrapper = mountTabs({ props: { tabs, value: 'overview' } })

        await wrapper.getComponent(TabsRoot).vm.$emit('update:modelValue', 'settings')
        await nextTick()

        expect(wrapper.emitted('update:value')).toEqual([['settings']])
      })
    })
  })

  describe('slots', () => {
    describe('trigger', () => {
      it('renderiza el slot y sustituye el contenido del trigger por defecto', () => {
        const wrapper = mountTabs({
          props: { tabs },
          slots: {
            trigger: (context: TabsContext) =>
              h('span', { 'data-test-tabs-slot': 'trigger' }, context.tabs[0]?.label),
          },
        })

        expect(wrapper.get('[data-test-tabs-slot="trigger"]').text()).toBe('Overview')
        expect(
          wrapper.get('[data-test-tabs-trigger] [data-test-tabs-slot="trigger"]').exists(),
        ).toBe(true)
      })

      it('pasa TabsContext como slotProps', () => {
        let slotProps: TabsContext | undefined

        mountTabs({
          props: { tabs, value: 'overview' },
          slots: {
            trigger: (input: TabsContext) => {
              slotProps ??= input
              return h('span')
            },
          },
        })

        expect(slotProps).toBeDefined()
      })
    })

    describe('leading', () => {
      it('renderiza el slot y sustituye el contenido leading por defecto', () => {
        const wrapper = mountTabs({
          props: { tabs },
          slots: { leading: () => h('span', { 'data-test-tabs-slot': 'leading' }, 'Leading') },
        })

        expect(wrapper.get('[data-test-tabs-slot="leading"]').text()).toBe('Leading')
      })

      it('pasa TabsContext como slotProps', () => {
        let slotProps: TabsContext | undefined

        mountTabs({
          props: { tabs },
          slots: {
            leading: (input: TabsContext) => {
              slotProps ??= input
              return h('span')
            },
          },
        })

        expect(slotProps).toBeDefined()
      })
    })

    describe('label', () => {
      it('renderiza el slot y sustituye el label por defecto', () => {
        const wrapper = mountTabs({
          props: { tabs },
          slots: { label: () => h('span', { 'data-test-tabs-slot': 'label' }, 'Label personalizado') },
        })

        expect(wrapper.get('[data-test-tabs-slot="label"]').text()).toBe('Label personalizado')
      })

      it('pasa TabsContext como slotProps', () => {
        let slotProps: TabsContext | undefined

        mountTabs({
          props: { tabs },
          slots: {
            label: (input: TabsContext) => {
              slotProps ??= input
              return h('span')
            },
          },
        })

        expect(slotProps).toBeDefined()
      })
    })

    describe('trailing', () => {
      it('renderiza el slot y sustituye el contenido trailing por defecto', () => {
        const wrapper = mountTabs({
          props: { tabs },
          slots: { trailing: () => h('span', { 'data-test-tabs-slot': 'trailing' }, 'Trailing') },
        })

        expect(wrapper.get('[data-test-tabs-slot="trailing"]').text()).toBe('Trailing')
      })

      it('pasa TabsContext como slotProps', () => {
        let slotProps: TabsContext | undefined

        mountTabs({
          props: { tabs },
          slots: {
            trailing: (input: TabsContext) => {
              slotProps ??= input
              return h('span')
            },
          },
        })

        expect(slotProps).toBeDefined()
      })
    })

    describe('content', () => {
      it('renderiza el slot y sustituye el contenido por defecto', () => {
        const wrapper = mountTabs({
          props: { tabs, value: 'overview' },
          slots: {
            content: () => h('span', { 'data-test-tabs-slot': 'content' }, 'Contenido personalizado'),
          },
        })

        expect(wrapper.get('[data-test-tabs-slot="content"]').text()).toBe('Contenido personalizado')
      })

      it('pasa TabsContext como slotProps', () => {
        let slotProps: TabsContext | undefined

        mountTabs({
          props: { tabs, value: 'overview' },
          slots: {
            content: (input: TabsContext) => {
              slotProps ??= input
              return h('span')
            },
          },
        })

        expect(slotProps).toBeDefined()
      })
    })

    describe('trigger-{slot}', () => {
      it('renderiza el slot trigger especifico antes del slot generico', () => {
        const wrapper = mountTabs({
          props: { tabs },
          slots: {
            trigger: () => h('span', 'Generic trigger'),
            'trigger-settings': () =>
              h('span', { 'data-test-tabs-slot': 'trigger-settings' }, 'Specific trigger'),
          },
        })

        expect(wrapper.get('[data-test-tabs-slot="trigger-settings"]').text()).toBe(
          'Specific trigger',
        )
      })

      it('pasa TabsItemContext como slotProps', () => {
        let slotProps: TabsItemContext | undefined

        mountTabs({
          props: { tabs, value: 'settings' },
          slots: {
            'trigger-settings': (input: TabsItemContext) => {
              slotProps ??= input
              return h('span')
            },
          },
        })

        expect(slotProps).toBeDefined()
      })
    })

    describe('leading-{slot}', () => {
      it('renderiza el slot leading especifico', () => {
        const wrapper = mountTabs({
          props: { tabs },
          slots: {
            'leading-settings': () =>
              h('span', { 'data-test-tabs-slot': 'leading-settings' }, 'Specific leading'),
          },
        })

        expect(wrapper.get('[data-test-tabs-slot="leading-settings"]').text()).toBe(
          'Specific leading',
        )
      })

      it('pasa TabsItemContext como slotProps', () => {
        let slotProps: TabsItemContext | undefined

        mountTabs({
          props: { tabs, value: 'settings' },
          slots: {
            'leading-settings': (input: TabsItemContext) => {
              slotProps ??= input
              return h('span')
            },
          },
        })

        expect(slotProps).toBeDefined()
      })
    })

    describe('label-{slot}', () => {
      it('renderiza el slot label especifico', () => {
        const wrapper = mountTabs({
          props: { tabs },
          slots: {
            'label-settings': () =>
              h('span', { 'data-test-tabs-slot': 'label-settings' }, 'Specific label'),
          },
        })

        expect(wrapper.get('[data-test-tabs-slot="label-settings"]').text()).toBe('Specific label')
      })

      it('pasa TabsItemContext como slotProps', () => {
        let slotProps: TabsItemContext | undefined

        mountTabs({
          props: { tabs, value: 'settings' },
          slots: {
            'label-settings': (input: TabsItemContext) => {
              slotProps ??= input
              return h('span')
            },
          },
        })

        expect(slotProps).toBeDefined()
      })
    })

    describe('trailing-{slot}', () => {
      it('renderiza el slot trailing especifico', () => {
        const wrapper = mountTabs({
          props: { tabs },
          slots: {
            'trailing-settings': () =>
              h('span', { 'data-test-tabs-slot': 'trailing-settings' }, 'Specific trailing'),
          },
        })

        expect(wrapper.get('[data-test-tabs-slot="trailing-settings"]').text()).toBe(
          'Specific trailing',
        )
      })

      it('pasa TabsItemContext como slotProps', () => {
        let slotProps: TabsItemContext | undefined

        mountTabs({
          props: { tabs, value: 'settings' },
          slots: {
            'trailing-settings': (input: TabsItemContext) => {
              slotProps ??= input
              return h('span')
            },
          },
        })

        expect(slotProps).toBeDefined()
      })
    })

    describe('content-{slot}', () => {
      it('renderiza el slot content especifico', () => {
        const wrapper = mountTabs({
          props: { tabs, value: 'settings' },
          slots: {
            'content-settings': () =>
              h('span', { 'data-test-tabs-slot': 'content-settings' }, 'Specific content'),
          },
        })

        expect(wrapper.get('[data-test-tabs-slot="content-settings"]').text()).toBe(
          'Specific content',
        )
      })

      it('pasa TabsItemContext como slotProps', () => {
        let slotProps: TabsItemContext | undefined

        mountTabs({
          props: { tabs, value: 'settings' },
          slots: {
            'content-settings': (input: TabsItemContext) => {
              slotProps ??= input
              return h('span')
            },
          },
        })

        expect(slotProps).toBeDefined()
      })
    })
  })

  describe('context contract', () => {
    describe('TabsContext', () => {
      it('contains tabs', () => {
        let context: TabsContext | undefined

        mountTabs({
          props: { tabs, value: 'overview' },
          slots: {
            trigger: (input: TabsContext) => {
              context ??= input
              return h('span')
            },
          },
        })

        expect(context?.tabs).toEqual(tabs)
        expect(context).not.toHaveProperty('tab')
      })
    })

    describe('TabsItemContext', () => {
      it.each([
        {
          input: { value: 'settings', slot: 'overview' },
          expected: { tab: tabs[0], index: 0, active: false, first: true, last: false },
        },
        {
          input: { value: 'settings', slot: 'settings' },
          expected: { tab: tabs[1], index: 1, active: true, first: false, last: false },
        },
        {
          input: { value: 'settings', slot: 'disabled' },
          expected: { tab: tabs[2], index: 2, active: false, first: false, last: true },
        },
      ])('pasa input=$input como expected=$expected', ({ input, expected }) => {
        let itemContext: TabsItemContext | undefined

        mountTabs({
          props: {
            tabs,
            value: input.value,
            ui: {
              trigger: (context) => {
                if (context.tab.slot === input.slot) itemContext = context
                return {}
              },
            },
          },
        })

        expect(itemContext).toMatchObject(expected)
        expect(itemContext).not.toHaveProperty('tabs')
      })
    })
  })
})
