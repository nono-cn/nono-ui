import { nextTick } from 'vue'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { RadioGroupItem as RekaRadioGroupItem, RadioGroupRoot } from 'reka-ui'
import { describe, expect, it } from 'vitest'

import {
  RadioGroup,
  radioGroupDefaults,
  type RadioGroupItem,
  type RadioGroupItemContext,
  type RadioGroupProps,
} from '@/components/ui/RadioGroup'
import { themeColors } from '@/components/ui/constants'
import { Icon } from '@/components/ui/Icon'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

const items = [
  { label: 'Sistema', value: 'system' },
  { label: 'Claro', value: 'light' },
] satisfies RadioGroupItem[]

function mountRadioGroup(options: ComponentMountingOptions<typeof RadioGroup> = {}) {
  const { props, ...rest } = options
  return mount(RadioGroup, {
    props: { items, ...props },
    ...rest,
  })
}

const casesModelValue = [
  { input: undefined, expected: { reka: undefined } },
  { input: 'system', expected: { reka: 'system' } },
  { input: 1, expected: { reka: 1 } },
] satisfies Array<{
  input: RadioGroupProps['modelValue']
  expected: { reka: RadioGroupProps['modelValue'] }
}>

const casesItems = [
  { input: undefined, expected: { length: radioGroupDefaults.items().length } },
  { input: [], expected: { length: 0 } },
  {
    input: [
      { label: 'Sistema', value: 'system' },
      { label: 'Claro', value: 'light' },
      { label: 'Oscuro', value: 'dark' },
    ],
    expected: { length: 3 },
  },
] satisfies Array<{ input: RadioGroupProps['items']; expected: { length: number } }>

const casesItemLabel = [
  { input: 'Sistema', expected: { visible: true, text: 'Sistema' } },
  { input: '', expected: { visible: false, text: undefined } },
  { input: undefined, expected: { visible: false, text: undefined } },
] satisfies Array<{
  input: RadioGroupItem['label']
  expected: { visible: boolean; text: string | undefined }
}>

const casesItemDescription = [
  { input: 'Sigue al sistema', expected: { visible: true, text: 'Sigue al sistema' } },
  { input: '', expected: { visible: false, text: undefined } },
  { input: undefined, expected: { visible: false, text: undefined } },
] satisfies Array<{
  input: RadioGroupItem['description']
  expected: { visible: boolean; text: string | undefined }
}>

const casesItemDisabled = [
  { input: undefined, expected: { reka: false, class: { item: ['cursor-pointer'] } } },
  { input: false, expected: { reka: false, class: { item: ['cursor-pointer'] } } },
  {
    input: true,
    expected: { reka: true, class: { item: ['cursor-not-allowed', 'opacity-50'] } },
  },
] satisfies Array<{
  input: RadioGroupItem['disabled']
  expected: { reka: boolean; class: { item: string[] } }
}>

const casesItemValue = [
  { input: 'system', expected: { reka: 'system' } },
  { input: 1, expected: { reka: 1 } },
] satisfies Array<{
  input: RadioGroupItem['value']
  expected: { reka: RadioGroupItem['value'] }
}>

// con indicator hidden, que es cuando se pinta el icono
const casesItemIcon = [
  { input: 'heart', expected: { visible: true, name: 'heart' } },
  { input: '', expected: { visible: false, name: undefined } },
  { input: undefined, expected: { visible: false, name: undefined } },
] satisfies Array<{
  input: RadioGroupItem['icon']
  expected: { visible: boolean; name: string | undefined }
}>

const casesLegend = [
  { input: 'Tema', expected: { visible: true, text: 'Tema' } },
  { input: '', expected: { visible: false, text: undefined } },
  { input: undefined, expected: { visible: false, text: undefined } },
] satisfies Array<{
  input: RadioGroupProps['legend']
  expected: { visible: boolean; text: string | undefined }
}>

const casesDisabled = [
  {
    input: undefined,
    expected: { reka: radioGroupDefaults.disabled, class: { item: ['cursor-pointer'] } },
  },
  { input: false, expected: { reka: false, class: { item: ['cursor-pointer'] } } },
  {
    input: true,
    expected: { reka: true, class: { item: ['cursor-not-allowed', 'opacity-50'] } },
  },
] satisfies Array<{
  input: RadioGroupProps['disabled']
  expected: { reka: boolean; class: { item: string[] } }
}>

const casesLoop = [
  { input: undefined, expected: { reka: radioGroupDefaults.loop } },
  { input: false, expected: { reka: false } },
  { input: true, expected: { reka: true } },
] satisfies Array<{ input: RadioGroupProps['loop']; expected: { reka: boolean } }>

const casesName = [
  { input: undefined, expected: { reka: radioGroupDefaults.name } },
  { input: 'theme', expected: { reka: 'theme' } },
] satisfies Array<{ input: RadioGroupProps['name']; expected: { reka: string | undefined } }>

const casesRequired = [
  { input: undefined, expected: { reka: radioGroupDefaults.required } },
  { input: false, expected: { reka: false } },
  { input: true, expected: { reka: true } },
] satisfies Array<{ input: RadioGroupProps['required']; expected: { reka: boolean } }>

const casesOrientation = [
  {
    input: undefined,
    expected: {
      reka: radioGroupDefaults.orientation,
      class: { list: ['flex-col'] },
      variant: {
        table: {
          class: {
            list: ['gap-0', '-space-y-px'],
            item: ['first-of-type:rounded-t-lg', 'last-of-type:rounded-b-lg'],
          },
        },
      },
    },
  },
  {
    input: 'vertical',
    expected: {
      reka: 'vertical',
      class: { list: ['flex-col'] },
      variant: {
        table: {
          class: {
            list: ['gap-0', '-space-y-px'],
            item: ['first-of-type:rounded-t-lg', 'last-of-type:rounded-b-lg'],
          },
        },
      },
    },
  },
  {
    input: 'horizontal',
    expected: {
      reka: 'horizontal',
      class: { list: ['flex-row'] },
      variant: {
        table: {
          class: {
            list: ['gap-0', '-space-x-px'],
            item: ['first-of-type:rounded-s-lg', 'last-of-type:rounded-e-lg'],
          },
        },
      },
    },
  },
] satisfies Array<{
  input: RadioGroupProps['orientation']
  expected: {
    reka: string
    class: { list: string[] }
    variant: { table: { class: { list: string[]; item: string[] } } }
  }
}>

const casesSize = [
  {
    input: undefined,
    expected: {
      class: {
        legend: ['text-sm'],
        list: ['gap-y-1'],
        item: ['text-sm'],
        container: ['h-5'],
        base: ['size-4'],
        indicator: ['after:size-1.5'],
        icon: ['size-4'],
      },
      variant: { card: { class: { item: ['p-3.5'] } } },
    },
  },
  {
    input: 'xs',
    expected: {
      class: {
        legend: ['text-xs'],
        list: ['gap-y-0.5'],
        item: ['text-xs'],
        container: ['h-4'],
        base: ['size-3'],
        indicator: ['after:size-1'],
        icon: ['size-3'],
      },
      variant: { card: { class: { item: ['p-2.5'] } } },
    },
  },
  {
    input: 'sm',
    expected: {
      class: {
        legend: ['text-xs'],
        list: ['gap-y-0.5'],
        item: ['text-xs'],
        container: ['h-4'],
        base: ['size-3.5'],
        indicator: ['after:size-1'],
        icon: ['size-3.5'],
      },
      variant: { card: { class: { item: ['p-3'] } } },
    },
  },
  {
    input: 'md',
    expected: {
      class: {
        legend: ['text-sm'],
        list: ['gap-y-1'],
        item: ['text-sm'],
        container: ['h-5'],
        base: ['size-4'],
        indicator: ['after:size-1.5'],
        icon: ['size-4'],
      },
      variant: { card: { class: { item: ['p-3.5'] } } },
    },
  },
  {
    input: 'lg',
    expected: {
      class: {
        legend: ['text-sm'],
        list: ['gap-y-1'],
        item: ['text-sm'],
        container: ['h-5'],
        base: ['size-4.5'],
        indicator: ['after:size-1.5'],
        icon: ['size-4.5'],
      },
      variant: { card: { class: { item: ['p-4'] } } },
    },
  },
  {
    input: 'xl',
    expected: {
      class: {
        legend: ['text-base'],
        list: ['gap-y-1.5'],
        item: ['text-base'],
        container: ['h-6'],
        base: ['size-5'],
        indicator: ['after:size-2'],
        icon: ['size-5'],
      },
      variant: { card: { class: { item: ['p-4.5'] } } },
    },
  },
] satisfies Array<{
  input: RadioGroupProps['size']
  expected: {
    class: {
      legend: string[]
      list: string[]
      item: string[]
      container: string[]
      base: string[]
      indicator: string[]
      icon: string[]
    }
    variant: { card: { class: { item: string[] } } }
  }
}>

const casesVariant = [
  {
    input: undefined,
    expected: {
      class: {
        list: ['flex-wrap'],
        item: [],
        base: [
          'focus-visible:border-(--radio-group-color)',
          'focus-visible:ring-3',
          'focus-visible:ring-(--radio-group-color)/30',
        ],
      },
    },
  },
  {
    input: 'list',
    expected: {
      class: {
        list: ['flex-wrap'],
        item: [],
        base: [
          'focus-visible:border-(--radio-group-color)',
          'focus-visible:ring-3',
          'focus-visible:ring-(--radio-group-color)/30',
        ],
      },
    },
  },
  {
    input: 'card',
    expected: {
      class: {
        list: ['flex-wrap'],
        item: [
          'rounded-lg',
          'border',
          'border-border',
          'transition-colors',
          'p-3.5',
          'hover:not-has-data-[state=checked]:bg-muted/50',
          'has-data-[state=checked]:border-(--radio-group-color)/50',
          'has-data-[state=checked]:bg-(--radio-group-color)/10',
          'has-focus-visible:z-[3]',
          'has-focus-visible:border-(--radio-group-color)',
          'has-focus-visible:ring-3',
          'has-focus-visible:ring-(--radio-group-color)/30',
        ],
        base: [],
      },
    },
  },
  {
    input: 'table',
    expected: {
      class: {
        list: ['gap-0'],
        item: [
          'border',
          'border-border',
          'transition-colors',
          'p-3.5',
          'hover:not-has-data-[state=checked]:bg-muted/50',
          'has-data-[state=checked]:z-[2]',
          'has-data-[state=checked]:border-(--radio-group-color)/50',
          'has-data-[state=checked]:bg-(--radio-group-color)/10',
          'has-focus-visible:z-[3]',
          'has-focus-visible:border-(--radio-group-color)',
          'has-focus-visible:ring-3',
          'has-focus-visible:ring-(--radio-group-color)/30',
        ],
        base: [],
      },
    },
  },
] satisfies Array<{
  input: RadioGroupProps['variant']
  expected: { class: { list: string[]; item: string[]; base: string[] } }
}>

// con la variante por defecto (list)
const casesIndicator = [
  {
    input: undefined,
    expected: {
      class: {
        item: ['flex-row'],
        container: [],
        base: ['focus-visible:ring-3', 'focus-visible:ring-(--radio-group-color)/30'],
        wrapper: ['ms-2'],
      },
    },
  },
  {
    input: 'start',
    expected: {
      class: {
        item: ['flex-row'],
        container: [],
        base: ['focus-visible:ring-3', 'focus-visible:ring-(--radio-group-color)/30'],
        wrapper: ['ms-2'],
      },
    },
  },
  {
    input: 'end',
    expected: {
      class: {
        item: ['flex-row-reverse'],
        container: [],
        base: ['focus-visible:ring-3', 'focus-visible:ring-(--radio-group-color)/30'],
        wrapper: ['me-2'],
      },
    },
  },
  {
    input: 'hidden',
    expected: {
      class: {
        item: [
          'rounded-md',
          'has-focus-visible:ring-3',
          'has-focus-visible:ring-(--radio-group-color)/30',
          'has-data-[state=checked]:text-(--radio-group-color)',
        ],
        container: ['h-auto'],
        base: ['sr-only'],
        wrapper: ['flex', 'flex-col', 'items-center', 'gap-1', 'text-center'],
      },
      // clases de list que el ítem no debe llevar con estas variantes
      variant: {
        card: {
          class: { item: ['rounded-md', 'has-data-[state=checked]:text-(--radio-group-color)'] },
        },
        table: {
          class: { item: ['rounded-md', 'has-data-[state=checked]:text-(--radio-group-color)'] },
        },
      },
    },
  },
] satisfies Array<{
  input: RadioGroupProps['indicator']
  expected: {
    class: { item: string[]; container: string[]; base: string[]; wrapper: string[] }
    variant?: { card: { class: { item: string[] } }; table: { class: { item: string[] } } }
  }
}>

const casesNodos = [
  { input: 'root', expected: { class: ['flex', 'flex-col'], attrs: { role: 'radiogroup' } } },
  {
    input: 'legend',
    expected: { class: ['mb-1', 'block', 'font-medium', 'text-foreground'], attrs: {} },
  },
  { input: 'list', expected: { class: ['flex', 'gap-x-2'], attrs: {} } },
  { input: 'item', expected: { class: ['relative', 'flex', 'items-start'], attrs: {} } },
  { input: 'container', expected: { class: ['flex', 'items-center'], attrs: {} } },
  {
    input: 'base',
    expected: {
      class: [
        'shrink-0',
        'overflow-hidden',
        'rounded-full',
        'border',
        'border-input',
        'shadow-xs',
        'outline-none',
        'transition-[color,box-shadow]',
      ],
      attrs: { role: 'radio', type: 'button' },
    },
  },
  {
    input: 'indicator',
    expected: {
      class: [
        'flex',
        'size-full',
        'items-center',
        'justify-center',
        'after:rounded-full',
        'after:bg-(--radio-group-color-foreground)',
      ],
      attrs: {},
    },
  },
  { input: 'wrapper', expected: { class: ['w-full'], attrs: {} } },
  { input: 'icon', expected: { class: ['shrink-0'], attrs: { 'aria-hidden': 'true' } } },
  { input: 'label', expected: { class: ['block', 'font-medium'], attrs: {} } },
  { input: 'description', expected: { class: ['block', 'text-muted-foreground'], attrs: {} } },
] satisfies Array<{
  input: string
  expected: { class: string[]; attrs: Record<string, string> }
}>

// pinta todos los nodos: legend, indicador seleccionado, icono y descripción
function mountAllNodes() {
  return mountRadioGroup({
    props: {
      legend: 'Tema',
      modelValue: 'system',
      indicator: 'hidden',
      items: [
        { label: 'Sistema', description: 'Sigue al sistema', value: 'system', icon: 'heart' },
      ],
    },
  })
}

describe('RadioGroup', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesModelValue)(
        'pasa modelValue=$input a Reka RadioGroupRoot',
        ({ input, expected }) => {
          const radioGroup = mountRadioGroup({ props: { modelValue: input } })

          expect(radioGroup.getComponent(RadioGroupRoot).props('modelValue')).toBe(expected.reka)
        },
      )
    })

    describe('items', () => {
      it.each(casesItems)(
        'pinta $expected.length ítems con items=$input',
        ({ input, expected }) => {
          const radioItems = mountRadioGroup({ props: { items: input } }).findAll(
            '[data-test-radio-group-item]',
          )

          expect(radioItems).toHaveLength(expected.length)
        },
      )

      describe('value', () => {
        it.each(casesItemValue)(
          'pasa value=$input del ítem a Reka RadioGroupItem',
          ({ input, expected }) => {
            const radioGroup = mountRadioGroup({
              props: { items: [{ label: 'Sistema', value: input }] },
            })

            expect(radioGroup.getComponent(RekaRadioGroupItem).props('value')).toBe(expected.reka)
          },
        )
      })

      describe('label', () => {
        it.each(casesItemLabel)('muestra el label con label=$input', ({ input, expected }) => {
          const label = mountRadioGroup({
            props: { items: [{ label: input, value: 'system' }] },
          }).element.querySelector('[data-test-radio-group-label]')

          expect({ visible: label !== null, text: label?.textContent?.trim() }).toEqual(expected)
        })

        it.each(casesItemLabel)(
          'nombra el radio con su label mediante aria-labelledby con label=$input',
          ({ input }) => {
            const radioGroup = mountRadioGroup({
              props: { items: [{ label: input, value: 'system' }] },
            })
            const label = radioGroup.element.querySelector('[data-test-radio-group-label]')

            expect(
              radioGroup.get('[data-test-radio-group-base]').attributes('aria-labelledby'),
            ).toBe(label?.id)
          },
        )
      })

      describe('description', () => {
        it.each(casesItemDescription)(
          'muestra la descripción con description=$input',
          ({ input, expected }) => {
            const description = mountRadioGroup({
              props: { items: [{ label: 'Sistema', description: input, value: 'system' }] },
            }).element.querySelector('[data-test-radio-group-description]')

            expect({
              visible: description !== null,
              text: description?.textContent?.trim(),
            }).toEqual(expected)
          },
        )

        it.each(casesItemDescription)(
          'describe el radio con su descripción mediante aria-describedby con description=$input',
          ({ input }) => {
            const radioGroup = mountRadioGroup({
              props: { items: [{ label: 'Sistema', description: input, value: 'system' }] },
            })
            const description = radioGroup.element.querySelector(
              '[data-test-radio-group-description]',
            )

            expect(
              radioGroup.get('[data-test-radio-group-base]').attributes('aria-describedby'),
            ).toBe(description?.id)
          },
        )
      })

      describe('disabled', () => {
        it.each(casesItemDisabled)(
          'pasa disabled=$input del ítem a Reka RadioGroupItem',
          ({ input, expected }) => {
            const radioGroup = mountRadioGroup({
              props: { items: [{ label: 'Sistema', value: 'system', disabled: input }] },
            })

            expect(radioGroup.getComponent(RekaRadioGroupItem).props('disabled')).toBe(
              expected.reka,
            )
          },
        )

        it.each(casesItemDisabled)(
          'aplica las clases de disabled=$input del ítem al nodo item',
          ({ input, expected }) => {
            const item = mountRadioGroup({
              props: { items: [{ label: 'Sistema', value: 'system', disabled: input }] },
            }).get('[data-test-radio-group-item]')

            expect(item.classes()).toEqual(expect.arrayContaining(expected.class.item))
          },
        )
      })

      describe('icon', () => {
        it.each(casesItemIcon)('muestra el icono con icon=$input', ({ input, expected }) => {
          const icon = mountRadioGroup({
            props: {
              indicator: 'hidden',
              items: [{ label: 'Sistema', value: 'system', icon: input }],
            },
          }).findComponent(Icon)

          expect({
            visible: icon.exists(),
            name: icon.exists() ? icon.props('name') : undefined,
          }).toEqual(expected)
        })

        it('no muestra el icono si el indicador no está oculto', () => {
          const icon = mountRadioGroup({
            props: { items: [{ label: 'Sistema', value: 'system', icon: 'heart' }] },
          }).findComponent(Icon)

          expect(icon.exists()).toBe(false)
        })
      })
    })

    describe('legend', () => {
      it.each(casesLegend)('muestra la legend con legend=$input', ({ input, expected }) => {
        const legend = mountRadioGroup({ props: { legend: input } }).element.querySelector(
          '[data-test-radio-group-legend]',
        )

        expect({ visible: legend !== null, text: legend?.textContent?.trim() }).toEqual(expected)
      })

      it('nombra el grupo con la legend mediante aria-labelledby', () => {
        const radioGroup = mountRadioGroup({ props: { legend: 'Tema' } })
        const legend = radioGroup.get('[data-test-radio-group-legend]')

        expect(radioGroup.get('[data-test-radio-group-root]').attributes('aria-labelledby')).toBe(
          legend.attributes('id'),
        )
      })
    })

    describe('disabled', () => {
      it.each(casesDisabled)(
        'pasa disabled=$input a Reka RadioGroupRoot',
        ({ input, expected }) => {
          const radioGroup = mountRadioGroup({ props: { disabled: input } })

          expect(radioGroup.getComponent(RadioGroupRoot).props('disabled')).toBe(expected.reka)
        },
      )

      it.each(casesDisabled)(
        'aplica las clases de disabled=$input al nodo item',
        ({ input, expected }) => {
          const item = mountRadioGroup({ props: { disabled: input } }).get(
            '[data-test-radio-group-item]',
          )

          expect(item.classes()).toEqual(expect.arrayContaining(expected.class.item))
        },
      )

      it('no aplica el hover a los ítems con variant card', () => {
        const item = mountRadioGroup({ props: { disabled: true, variant: 'card' } }).get(
          '[data-test-radio-group-item]',
        )

        expect(item.classes()).not.toContain('hover:not-has-data-[state=checked]:bg-muted/50')
      })
    })

    describe('loop', () => {
      it.each(casesLoop)('pasa loop=$input a Reka RadioGroupRoot', ({ input, expected }) => {
        const radioGroup = mountRadioGroup({ props: { loop: input } })

        expect(radioGroup.getComponent(RadioGroupRoot).props('loop')).toBe(expected.reka)
      })
    })

    describe('name', () => {
      it.each(casesName)('pasa name=$input a Reka RadioGroupRoot', ({ input, expected }) => {
        const radioGroup = mountRadioGroup({ props: { name: input } })

        expect(radioGroup.getComponent(RadioGroupRoot).props('name')).toBe(expected.reka)
      })
    })

    describe('required', () => {
      it.each(casesRequired)(
        'pasa required=$input a Reka RadioGroupRoot',
        ({ input, expected }) => {
          const radioGroup = mountRadioGroup({ props: { required: input } })

          expect(radioGroup.getComponent(RadioGroupRoot).props('required')).toBe(expected.reka)
        },
      )
    })

    describe('orientation', () => {
      it.each(casesOrientation)(
        'pasa orientation=$input a Reka RadioGroupRoot como $expected.reka',
        ({ input, expected }) => {
          const radioGroup = mountRadioGroup({ props: { orientation: input } })

          expect(radioGroup.getComponent(RadioGroupRoot).props('orientation')).toBe(expected.reka)
        },
      )

      it.each(casesOrientation)(
        'aplica las clases de orientation=$input al nodo list',
        ({ input, expected }) => {
          const list = mountRadioGroup({ props: { orientation: input } }).get(
            '[data-test-radio-group-list]',
          )

          expect(list.classes()).toEqual(expect.arrayContaining(expected.class.list))
        },
      )

      it.each(casesOrientation)(
        'aplica las clases de orientation=$input al nodo list e item con variant table',
        ({ input, expected }) => {
          const radioGroup = mountRadioGroup({ props: { orientation: input, variant: 'table' } })
          const classesOf = (part: string) =>
            radioGroup.get(`[data-test-radio-group-${part}]`).classes()

          expect({
            list: classesOf('list'),
            item: classesOf('item'),
          }).toEqual({
            list: expect.arrayContaining(expected.variant.table.class.list),
            item: expect.arrayContaining(expected.variant.table.class.item),
          })
        },
      )
    })

    describe('size', () => {
      it.each(casesSize)(
        'aplica las clases de size=$input al nodo legend, list, item, container, base, indicator e icon',
        ({ input, expected }) => {
          // seleccionado para que se pinte el indicador
          const radioGroup = mountRadioGroup({
            props: { size: input, legend: 'Tema', modelValue: 'system' },
          })
          const withIcon = mountRadioGroup({
            props: {
              size: input,
              indicator: 'hidden',
              items: [{ label: 'Sistema', value: 'system', icon: 'heart' }],
            },
          })
          const classesOf = (part: string) =>
            radioGroup.get(`[data-test-radio-group-${part}]`).classes()

          expect({
            legend: classesOf('legend'),
            list: classesOf('list'),
            item: classesOf('item'),
            container: classesOf('container'),
            base: classesOf('base'),
            indicator: classesOf('indicator'),
            icon: withIcon.get('[data-test-radio-group-icon]').classes(),
          }).toEqual({
            legend: expect.arrayContaining(expected.class.legend),
            list: expect.arrayContaining(expected.class.list),
            item: expect.arrayContaining(expected.class.item),
            container: expect.arrayContaining(expected.class.container),
            base: expect.arrayContaining(expected.class.base),
            indicator: expect.arrayContaining(expected.class.indicator),
            icon: expect.arrayContaining(expected.class.icon),
          })
        },
      )

      it.each(casesSize)(
        'aplica las clases de size=$input al nodo item con variant card',
        ({ input, expected }) => {
          const item = mountRadioGroup({ props: { size: input, variant: 'card' } }).get(
            '[data-test-radio-group-item]',
          )

          expect(item.classes()).toEqual(expect.arrayContaining(expected.variant.card.class.item))
        },
      )
    })

    describe('variant', () => {
      it.each(casesVariant)(
        'aplica las clases de variant=$input al nodo list, item y base',
        ({ input, expected }) => {
          const radioGroup = mountRadioGroup({ props: { variant: input } })
          const classesOf = (part: string) =>
            radioGroup.get(`[data-test-radio-group-${part}]`).classes()

          expect({
            list: classesOf('list'),
            item: classesOf('item'),
            base: classesOf('base'),
          }).toEqual({
            list: expect.arrayContaining(expected.class.list),
            item: expect.arrayContaining(expected.class.item),
            base: expect.arrayContaining(expected.class.base),
          })
        },
      )
    })

    describe('indicator', () => {
      it.each(casesIndicator)(
        'aplica las clases de indicator=$input al nodo item, container, base y wrapper',
        ({ input, expected }) => {
          const radioGroup = mountRadioGroup({ props: { indicator: input } })
          const classesOf = (part: string) =>
            radioGroup.get(`[data-test-radio-group-${part}]`).classes()

          expect({
            item: classesOf('item'),
            container: classesOf('container'),
            base: classesOf('base'),
            wrapper: classesOf('wrapper'),
          }).toEqual({
            item: expect.arrayContaining(expected.class.item),
            container: expect.arrayContaining(expected.class.container),
            base: expect.arrayContaining(expected.class.base),
            wrapper: expect.arrayContaining(expected.class.wrapper),
          })
        },
      )

      it.each(casesIndicator.filter(({ input }) => input === 'hidden'))(
        'no aplica las clases de list al nodo item con indicator=$input y variant card o table',
        ({ input, expected }) => {
          const listClassesOf = (variant: 'card' | 'table') =>
            mountRadioGroup({ props: { indicator: input, variant } })
              .get('[data-test-radio-group-item]')
              .classes()
              .filter((name) => expected.variant![variant].class.item.includes(name))

          expect({ card: listClassesOf('card'), table: listClassesOf('table') }).toEqual({
            card: [],
            table: [],
          })
        },
      )
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color de RadioGroup',
        id: '[data-test-radio-group-root]',
        varColor: '--radio-group-color',
        defaultColor: 'var(--primary, var(--primary))',
        fallbackColor: radioGroupDefaults.color,
        theme: {
          colors: themeColors,
          foregroundVar: '--radio-group-color-foreground',
          solidVar: '--radio-group-solid',
          solidForegroundVar: '--radio-group-solid-foreground',
        },
        mount: (color) => mountRadioGroup({ props: { color } }),
      })
    })

    describe('ui', () => {
      describe('legend', () => {
        // el id lo fija el componente para el aria-labelledby del grupo
        testAttrs({
          text: 'pasa atributos mediante ui.legend a la legend',
          id: '[data-test-radio-group-legend]',
          assertId: false,
          mount: (attrs) =>
            mountRadioGroup({ props: { legend: 'Tema', ui: { legend: () => attrs } } }),
        })
      })

      describe('list', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.list a la lista',
          id: '[data-test-radio-group-list]',
          mount: (attrs) => mountRadioGroup({ props: { ui: { list: () => attrs } } }),
        })
      })

      describe('item', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.item al ítem',
          id: '[data-test-radio-group-item]',
          mount: (attrs) => mountRadioGroup({ props: { ui: { item: () => attrs } } }),
        })
      })

      describe('container', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.container al contenedor',
          id: '[data-test-radio-group-container]',
          mount: (attrs) => mountRadioGroup({ props: { ui: { container: () => attrs } } }),
        })
      })

      describe('base', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.base al radio',
          id: '[data-test-radio-group-base]',
          mount: (attrs) => mountRadioGroup({ props: { ui: { base: () => attrs } } }),
        })
      })

      describe('indicator', () => {
        // seleccionado para que se pinte el indicador
        testAttrs({
          text: 'pasa atributos mediante ui.indicator al indicador',
          id: '[data-test-radio-group-indicator]',
          mount: (attrs) =>
            mountRadioGroup({ props: { modelValue: 'system', ui: { indicator: () => attrs } } }),
        })
      })

      describe('wrapper', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.wrapper al wrapper',
          id: '[data-test-radio-group-wrapper]',
          mount: (attrs) => mountRadioGroup({ props: { ui: { wrapper: () => attrs } } }),
        })
      })

      describe('icon', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.icon al icono',
          id: '[data-test-radio-group-icon]',
          mount: (attrs) =>
            mountRadioGroup({
              props: {
                indicator: 'hidden',
                items: [{ label: 'Sistema', value: 'system', icon: 'heart' }],
                ui: { icon: () => attrs },
              },
            }),
        })
      })

      describe('label', () => {
        // el id lo fija el componente para el aria-labelledby del radio
        testAttrs({
          text: 'pasa atributos mediante ui.label al label',
          id: '[data-test-radio-group-label]',
          assertId: false,
          mount: (attrs) => mountRadioGroup({ props: { ui: { label: () => attrs } } }),
        })
      })

      describe('description', () => {
        // el id lo fija el componente para el aria-describedby del radio
        testAttrs({
          text: 'pasa atributos mediante ui.description a la descripción',
          id: '[data-test-radio-group-description]',
          assertId: false,
          mount: (attrs) =>
            mountRadioGroup({
              props: {
                items: [{ label: 'Sistema', description: 'Sigue al sistema', value: 'system' }],
                ui: { description: () => attrs },
              },
            }),
        })
      })
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it('reemite el valor cuando Reka RadioGroupRoot cambia modelValue', async () => {
        const radioGroup = mountRadioGroup({ props: { modelValue: 'system' } })

        radioGroup.getComponent(RadioGroupRoot).vm.$emit('update:modelValue', 'light')
        await nextTick()

        expect(radioGroup.emitted('update:modelValue')).toEqual([['light']])
      })
    })

    describe('change', () => {
      it('emite change cuando se selecciona un radio del componente', async () => {
        const radioGroup = mountRadioGroup({
          props: {
            modelValue: 'system',
            items: [
              { label: 'Sistema', value: 'system' },
              { label: 'Claro', value: 'light' },
            ],
          },
        })

        await radioGroup.findAll('[data-test-radio-group-base]')[1]!.trigger('click')

        expect(radioGroup.emitted('change')).toEqual([['light']])
      })

      it('no emite change al pulsar el radio ya seleccionado', async () => {
        const radioGroup = mountRadioGroup({
          props: {
            modelValue: 'system',
            items: [
              { label: 'Sistema', value: 'system' },
              { label: 'Claro', value: 'light' },
            ],
          },
        })

        await radioGroup.findAll('[data-test-radio-group-base]')[0]!.trigger('click')

        expect(radioGroup.emitted('change')).toBeUndefined()
      })

      it('no emite change cuando modelValue cambia desde fuera', async () => {
        const radioGroup = mountRadioGroup({ props: { modelValue: 'system' } })

        await radioGroup.setProps({ modelValue: 'light' })

        expect(radioGroup.emitted('change')).toBeUndefined()
      })
    })
  })

  describe('nodos', () => {
    it.each(casesNodos)('aplica las clases fijas al nodo $input', ({ input, expected }) => {
      const node = mountAllNodes().get(`[data-test-radio-group-${input}]`)

      expect(node.classes()).toEqual(expect.arrayContaining(expected.class))
    })

    it.each(casesNodos)('aplica los atributos fijos al nodo $input', ({ input, expected }) => {
      const node = mountAllNodes().get(`[data-test-radio-group-${input}]`)

      expect(node.attributes()).toMatchObject(expected.attrs)
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-radio-group-root]',
      mount: (attrs) => mountRadioGroup({ attrs }),
    })

    it('conserva el aria-labelledby recibido cuando no hay legend', () => {
      const root = mountRadioGroup({
        props: { legend: undefined },
        attrs: { 'aria-labelledby': 'external-label' },
      }).get('[data-test-radio-group-root]')

      expect(root.attributes('aria-labelledby')).toBe('external-label')
    })
  })

  describe('slots', () => {
    describe('legend', () => {
      it('reemplaza el contenido de la legend', () => {
        const legend = mountRadioGroup({
          props: { legend: 'Tema' },
          slots: { legend: () => 'Tema de la interfaz' },
        }).get('[data-test-radio-group-legend]')

        expect(legend.text()).toBe('Tema de la interfaz')
      })

      it('muestra la legend sin la prop legend', () => {
        const legend = mountRadioGroup({
          props: { legend: undefined },
          slots: { legend: () => 'Tema de la interfaz' },
        }).get('[data-test-radio-group-legend]')

        expect(legend.text()).toBe('Tema de la interfaz')
      })
    })

    describe('label', () => {
      it('reemplaza el label de todos los ítems', () => {
        const labels = mountRadioGroup({
          props: {
            items: [
              { label: 'Sistema', value: 'system' },
              { label: 'Claro', value: 'light' },
            ],
          },
          slots: { label: ({ item }: RadioGroupItemContext) => `★ ${item.label}` },
        })
          .findAll('[data-test-radio-group-label]')
          .map((label) => label.text())

        expect(labels).toEqual(['★ Sistema', '★ Claro'])
      })

      it('muestra el label del slot aunque el ítem no tenga label', () => {
        const label = mountRadioGroup({
          props: { items: [{ value: 'system' }] },
          slots: { label: () => 'Sistema' },
        }).get('[data-test-radio-group-label]')

        expect(label.text()).toBe('Sistema')
      })
    })

    describe('description', () => {
      it('reemplaza la descripción de todos los ítems', () => {
        const descriptions = mountRadioGroup({
          props: {
            items: [
              { label: 'Sistema', description: 'Sigue al sistema', value: 'system' },
              { label: 'Claro', description: 'Fondo claro', value: 'light' },
            ],
          },
          slots: { description: ({ item }: RadioGroupItemContext) => `★ ${item.description}` },
        })
          .findAll('[data-test-radio-group-description]')
          .map((description) => description.text())

        expect(descriptions).toEqual(['★ Sigue al sistema', '★ Fondo claro'])
      })

      it('muestra la descripción del slot aunque el ítem no tenga description', () => {
        const description = mountRadioGroup({
          props: { items: [{ label: 'Sistema', value: 'system' }] },
          slots: { description: () => 'Sigue al sistema' },
        }).get('[data-test-radio-group-description]')

        expect(description.text()).toBe('Sigue al sistema')
      })
    })
  })
})
