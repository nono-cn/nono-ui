import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import {
  Accordion,
  createAccordionItemContext,
  type AccordionItemContext,
  type AccordionProps,
  type AccordionVariant,
  type AccordionValue,
} from '@/components/ui/Accordion'
import { Icon } from '@/components/ui/Icon'
import { testAttrs } from '../utils/testAttrs'

const items = [
  {
    value: 'first',
    label: 'Primero',
    description: 'Descripción del primero',
    icon: 'info' as const,
    unmountOnHide: true,
  },
  {
    value: 'second',
    label: 'Segundo',
    description: 'Descripción del segundo',
    icon: 'error' as const,
    unmountOnHide: false,
  },
  {
    value: 'disabled',
    label: 'Deshabilitado',
    description: 'Descripción del elemento deshabilitado',
    disabled: true,
    unmountOnHide: undefined,
  },
]

const casesDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesCollapsible = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesUnmountOnHide = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: true },
]

const casesType = [
  { input: 'single' as const, expected: 'single' },
  { input: 'multiple' as const, expected: 'multiple' },
  { input: undefined, expected: 'single' },
]

const casesVariantStyles = [
  {
    input: 'default' as const,
    root: [],
    item: ['border-b', 'last:border-b-0'],
    trigger: ['font-bold', 'hover:underline'],
    content: ['text-muted-foreground', 'pl-6'],
  },
  {
    input: 'separated' as const,
    root: ['space-y-2'],
    item: ['rounded-md', 'border', 'px-4'],
    trigger: ['font-bold', 'hover:no-underline'],
    content: ['text-muted-foreground', 'pl-6'],
  },
  {
    input: 'bordered' as const,
    root: ['rounded-md', 'border', 'px-4'],
    item: ['border-b', 'last:border-b-0'],
    trigger: ['font-bold', 'hover:no-underline'],
    content: ['text-muted-foreground', 'pl-6'],
  },
  {
    input: 'frame' as const,
    root: [
      'relative',
      'overflow-hidden',
      'rounded-xl',
      'border',
      'border-border',
      'bg-muted',
      'p-1',
      'shadow-sm',
      'before:pointer-events-none',
      'before:absolute',
      'before:inset-1',
      'before:z-10',
      'before:rounded-lg',
      'before:border',
      'before:border-border',
    ],
    item: ['bg-background'],
    trigger: ['font-bold', 'gap-3', 'rounded-none', 'px-4', 'py-3', 'focus-visible:rounded-md'],
    content: ['text-muted-foreground', 'pb-3', 'pl-10', 'pr-3'],
  },
  {
    input: undefined,
    root: [],
    item: ['border-b', 'last:border-b-0'],
    trigger: ['font-bold', 'hover:underline'],
    content: ['text-muted-foreground', 'pl-6'],
  },
] satisfies {
  input: AccordionVariant | undefined
  root: string[]
  item: string[]
  trigger: string[]
  content: string[]
}[]

const casesHighlight = [
  { input: true, expected: ['data-[state=open]:bg-muted'] },
  { input: false, expected: [] },
  { input: undefined, expected: [] },
]

const casesValue = [
  { input: 'item' as AccordionValue, expected: 'item' },
  { input: ['first', 'second'] as AccordionValue, expected: ['first', 'second'] },
  { input: undefined, expected: undefined },
]

const casesItemDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: undefined },
]

const casesItemUnmountOnHide = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: true },
]

const casesItemLabel = [
  { input: 'Etiqueta', expected: 'Etiqueta' },
  { input: undefined, expected: '' },
]

const casesDescription = [
  {
    name: 'elemento abierto',
    input: { description: 'Descripción', open: true },
    expected: { exists: true, text: 'Descripción' },
  },
  {
    name: 'elemento abierto sin descripción',
    input: { description: undefined, open: true },
    expected: { exists: true, text: '' },
  },
  {
    name: 'elemento cerrado con unmountOnHide=true',
    input: { description: 'Descripción', open: false, itemUnmountOnHide: true },
    expected: { exists: false },
  },
  {
    name: 'elemento cerrado con unmountOnHide=false',
    input: { description: 'Descripción', open: false, itemUnmountOnHide: false },
    expected: { exists: true, text: 'Descripción' },
  },
  {
    name: 'elemento cerrado heredando unmountOnHide=true de la raíz',
    input: { description: 'Descripción', open: false, rootUnmountOnHide: true },
    expected: { exists: false },
  },
  {
    name: 'elemento cerrado heredando unmountOnHide=false de la raíz',
    input: { description: 'Descripción', open: false, rootUnmountOnHide: false },
    expected: { exists: true, text: 'Descripción' },
  },
]

const casesContext = [
  {
    name: 'primer elemento abierto en modo single',
    input: { index: 0, value: 'first' as AccordionValue },
    expected: { open: true, first: true, last: false },
  },
  {
    name: 'elemento intermedio cerrado en modo single',
    input: { index: 1, value: 'first' as AccordionValue },
    expected: { open: false, first: false, last: false },
  },
  {
    name: 'último elemento abierto en modo multiple',
    input: { index: 2, value: ['first', 'last'] as AccordionValue },
    expected: { open: true, first: false, last: true },
  },
  {
    name: 'elemento intermedio cerrado en modo multiple',
    input: { index: 1, value: ['first', 'last'] as AccordionValue },
    expected: { open: false, first: false, last: false },
  },
  {
    name: 'primer elemento cerrado sin valor',
    input: { index: 0, value: undefined },
    expected: { open: false, first: true, last: false },
  },
]

const casesUpdateValue = [
  {
    name: 'abre un elemento en modo single',
    input: { type: 'single' as const, value: undefined, collapsible: false },
    expected: 'first',
  },
  {
    name: 'cierra un elemento en modo single colapsable',
    input: { type: 'single' as const, value: 'first', collapsible: true },
    expected: undefined,
  },
  {
    name: 'abre un elemento en modo multiple',
    input: { type: 'multiple' as const, value: ['second'] as string[], collapsible: false },
    expected: ['second', 'first'],
  },
]

const slotCases = [
  { input: 'trigger' as const, replaced: '[data-test-accordion-label="item"]' },
  { input: 'leading' as const, replaced: '[data-test-accordion-icon="item"]' },
  { input: 'label' as const, replaced: '[data-test-accordion-label="item"]' },
  {
    input: 'iconDropdown' as const,
    replaced: '[data-test-accordion-icon-dropdown="item"]',
  },
  { input: 'content' as const, replaced: '[data-test-accordion-description="item"]' },
]

const itemSlotCases = [
  { input: 'trigger' as const, replaced: '[data-test-accordion-label="item"]' },
  { input: 'leading' as const, replaced: '[data-test-accordion-icon="item"]' },
  { input: 'label' as const, replaced: '[data-test-accordion-label="item"]' },
  { input: 'content' as const, replaced: '[data-test-accordion-description="item"]' },
]

function mountAccordion(options: MountingOptions<AccordionProps> = {}) {
  const wrapper = mount(Accordion, {
    ...options,
    props: {
      items,
      ...options.props,
      'onUpdate:modelValue': async (modelValue: AccordionValue) => {
        await wrapper.setProps({ modelValue })
      },
    },
  })

  return wrapper
}

describe('Accordion', () => {
  describe('props', () => {
    /** Reka prop */
    describe('disabled', () => {
      it.each(casesDisabled)(
        'pasa disabled=$input a la raíz como $expected',
        ({ input, expected }) => {
          const accordion = mountAccordion({
            props: {
              disabled: input,
            },
          })

          expect(accordion.getComponent('[data-test-accordion-root]').props('disabled')).toBe(
            expected,
          )
        },
      )
    })

    /** Reka prop */
    describe('collapsible', () => {
      it.each(casesCollapsible)(
        'pasa collapsible=$input a la raíz como $expected',
        ({ input, expected }) => {
          const accordion = mountAccordion({
            props: {
              collapsible: input,
            },
          })

          expect(accordion.getComponent('[data-test-accordion-root]').props('collapsible')).toBe(
            expected,
          )
        },
      )
    })

    /** Reka prop */
    describe('unmountOnHide', () => {
      it.each(casesUnmountOnHide)(
        'pasa unmountOnHide=$input a la raíz como $expected',
        ({ input, expected }) => {
          const accordion = mountAccordion({
            props: {
              unmountOnHide: input,
            },
          })

          expect(accordion.getComponent('[data-test-accordion-root]').props('unmountOnHide')).toBe(
            expected,
          )
        },
      )
    })

    /** Reka prop */
    describe('type', () => {
      it.each(casesType)('pasa type=$input a la raíz como $expected', ({ input, expected }) => {
        const accordion = mountAccordion({
          props: {
            type: input,
          },
        })

        expect(accordion.getComponent('[data-test-accordion-root]').props('type')).toBe(expected)
      })
    })

    describe('variant', () => {
      it.each(casesVariantStyles)(
        'renderiza variant=$input en cada nodo',
        ({ input, ...expected }) => {
          const accordion = mountAccordion({
            props: {
              variant: input,
              modelValue: 'first',
            },
          })
          const root = accordion.get('[data-test-accordion-root]')
          const item = accordion.get('[data-test-accordion-item="first"]')
          const trigger = accordion.get('[data-test-accordion-trigger="first"]')
          const content = accordion.get('[data-test-accordion-content="first"]')

          expect(root.classes()).toEqual(expect.arrayContaining(expected.root))
          expect(item.classes()).toEqual(expect.arrayContaining(expected.item))
          expect(trigger.classes()).toEqual(expect.arrayContaining(expected.trigger))
          expect(content.classes()).toEqual(expect.arrayContaining(expected.content))
        },
      )
    })

    describe('highlight', () => {
      it.each(casesHighlight)(
        'applies highlight=$input to the selected item',
        ({ input, expected }) => {
          const accordion = mountAccordion({
            props: {
              highlight: input,
              modelValue: 'first',
            },
          })
          const item = accordion.get('[data-test-accordion-item="first"]')

          expect(item.classes()).toEqual(expect.arrayContaining(expected))
          if (!input) expect(item.classes()).not.toContain('data-[state=open]:bg-muted/60')
        },
      )
    })

    describe('modelValue', () => {
      it.each(casesValue)('pasa modelValue=$input a la raíz', ({ input, expected }) => {
        const accordion = mountAccordion({
          props: {
            modelValue: input,
            type: Array.isArray(input) ? 'multiple' : 'single',
            items: [{ value: 'first' }, { value: 'second' }],
          },
        })

        expect(accordion.getComponent('[data-test-accordion-root]').props('modelValue')).toEqual(
          expected,
        )
      })
    })

    describe('iconDropDownOpen', () => {
      it.each([
        { input: 'minus' as const, expected: 'minus' },
        { input: undefined, expected: 'chevronUp' },
      ])('renderiza iconDropDownOpen=$input como $expected', ({ input, expected }) => {
        const accordion = mountAccordion({
          props: { modelValue: 'item', items: [{ value: 'item' }], iconDropDownOpen: input },
        })

        expect(accordion.getComponent(Icon).props('name')).toBe(expected)
      })
    })

    describe('iconDropDownClose', () => {
      it.each([
        { input: 'plus' as const, expected: 'plus' },
        { input: undefined, expected: 'chevronDown' },
      ])('renderiza iconDropDownClose=$input como $expected', ({ input, expected }) => {
        const accordion = mountAccordion({
          props: { items: [{ value: 'item' }], iconDropDownClose: input },
        })

        expect(accordion.getComponent(Icon).props('name')).toBe(expected)
      })
    })

    describe('items', () => {
      it('no renderiza elementos cuando items es undefined', () => {
        const accordion = mountAccordion({
          props: {
            items: undefined,
          },
        })

        expect(accordion.findAll('[data-test-accordion-item]').length).toBe(0)
      })

      it('renderiza todos los elementos cuando items está definido', () => {
        const accordion = mountAccordion({
          props: {
            items: [
              { value: 'first', label: 'Primero' },
              { value: 'second', label: 'Segundo' },
            ],
          },
        })

        expect(accordion.findAll('[data-test-accordion-item]').length).toBe(2)
      })

      // Reka props item
      describe('disabled', () => {
        it.each(casesItemDisabled)(
          'pasa item disabled=$input como $expected',
          ({ input, expected }) => {
            const accordion = mountAccordion({
              props: {
                items: [{ value: 'item', disabled: input }],
              },
            })

            expect(
              accordion.getComponent('[data-test-accordion-item="item"]').props('disabled'),
            ).toBe(expected)
          },
        )
      })

      /** Reka props item */
      describe('unmountOnHide', () => {
        it.each(casesItemUnmountOnHide)(
          'pasa item unmountOnHide=$input como $expected',
          ({ input, expected }) => {
            const accordion = mountAccordion({
              props: {
                items: [{ value: 'item', unmountOnHide: input }],
              },
            })

            expect(
              accordion.getComponent('[data-test-accordion-item="item"]').props('unmountOnHide'),
            ).toBe(expected)
          },
        )
      })

      describe('label', () => {
        it.each(casesItemLabel)(
          'renderiza item label=$input como "$expected"',
          ({ input, expected }) => {
            const accordion = mountAccordion({
              props: {
                items: [{ value: 'item', label: input }],
              },
            })

            expect(accordion.get('[data-test-accordion-label="item"]').text()).toBe(expected)
          },
        )
      })

      describe('description', () => {
        it.each(casesDescription)('renderiza la descripción para $name', ({ input, expected }) => {
          const accordion = mountAccordion({
            props: {
              modelValue: input.open ? 'item' : undefined,
              unmountOnHide: input.rootUnmountOnHide,
              items: [
                {
                  value: 'item',
                  description: input.description,
                  unmountOnHide: input.itemUnmountOnHide,
                },
              ],
            },
          })
          const description = accordion.find('[data-test-accordion-description="item"]')

          expect(description.exists()).toBe(expected.exists)

          if (expected.exists) expect(description.text()).toBe(expected.text)
        })
      })

      describe('icon', () => {
        it.each([
          { input: 'info' as const, expected: true },
          { input: undefined, expected: false },
        ])('renderiza item.icon=$input cuando expected=$expected', ({ input, expected }) => {
          const accordion = mountAccordion({
            props: { items: [{ value: 'item', icon: input }] },
          })
          const icon = accordion.find('[data-test-accordion-icon="item"]')

          expect(icon.exists()).toBe(expected)
          if (expected) expect(accordion.getComponent(Icon).props('name')).toBe(input)
        })
      })
    })

    describe('ui', () => {
      describe('item', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.item',
          id: '[data-test-accordion-item="item"]',
          mount: (attrs) =>
            mountAccordion({
              props: {
                items: [{ value: 'item' }],
                ui: { item: () => attrs },
              },
            }),
        })
      })

      describe('trigger', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.trigger',
          id: '[data-test-accordion-trigger="item"]',
          mount: (attrs) =>
            mountAccordion({
              props: {
                items: [{ value: 'item' }],
                ui: { trigger: () => attrs },
              },
            }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.content',
          id: '[data-test-accordion-content="item"]',
          assertId: false,
          mount: (attrs) =>
            mountAccordion({
              props: {
                modelValue: 'item',
                items: [{ value: 'item' }],
                ui: { content: () => attrs },
              },
            }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-accordion-root]',
      mount: (attrs) => mountAccordion({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it.each(casesUpdateValue)('$name', async ({ input, expected }) => {
        const accordion = mountAccordion({
          props: {
            type: input.type,
            modelValue: input.value,
            collapsible: input.collapsible,
            items: [
              { value: 'first', label: '1' },
              { value: 'second', label: '2' },
            ],
          },
        })

        await accordion.get('[data-test-accordion-trigger="first"]').trigger('click')

        expect(accordion.emitted('update:modelValue')).toEqual([[expected]])
      })
    })
  })

  describe('slots', () => {
    describe('global', () => {
      it.each(slotCases)(
        'renderiza el slot $input en lugar del contenido por defecto',
        ({ input, replaced }) => {
          const accordion = mountAccordion({
            props: { modelValue: 'item', items: [{ value: 'item', icon: 'info' }] },
            slots: {
              [input]: () => h('span', { 'data-test-accordion-slot': input }, `Slot ${input}`),
            },
          })

          expect(accordion.get(`[data-test-accordion-slot="${input}"]`).text()).toBe(
            `Slot ${input}`,
          )
          expect(accordion.find(replaced).exists()).toBe(false)
        },
      )

      it('prioriza el slot global cuando el item también tiene slot', () => {
        const accordion = mountAccordion({
          props: { modelValue: 'item', items: [{ value: 'item', slot: 'custom' }] },
          slots: {
            trigger: () => h('span', { 'data-test-accordion-slot': 'trigger' }, 'Trigger global'),
          },
        })

        expect(accordion.get('[data-test-accordion-slot="trigger"]').text()).toBe('Trigger global')
      })
    })

    describe('item-specific', () => {
      it.each(itemSlotCases)(
        'renderiza el slot $input-{item.slot} en lugar del contenido por defecto',
        ({ input, replaced }) => {
          const slotName = `${input}-custom`
          const accordion = mountAccordion({
            props: {
              modelValue: 'item',
              items: [{ value: 'item', slot: 'custom', icon: 'info' }],
            },
            slots: {
              [slotName]: () => h('span', { 'data-test-accordion-slot': input }, `Slot ${input}`),
            },
          })

          expect(accordion.get(`[data-test-accordion-slot="${input}"]`).text()).toBe(
            `Slot ${input}`,
          )
          expect(accordion.find(replaced).exists()).toBe(false)
        },
      )
    })
  })

  describe('context contract', () => {
    describe('AccordionItemContext', () => {
      it.each(casesContext)('crea el contrato para $name', ({ input, expected }) => {
        const contextItems = [{ value: 'first' }, { value: 'middle' }, { value: 'last' }]
        const item = contextItems[input.index]
        const context = createAccordionItemContext(
          item,
          input.index,
          input.value,
          contextItems.length,
        )

        expect(context).toEqual({
          item,
          index: input.index,
          ...expected,
        } satisfies AccordionItemContext)
      })
    })
  })
})
