import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Button, type ButtonProps, type ButtonVariant } from '@/components/ui/Button'
import { themeColors } from '../../docs/config/constants'
import { Icon } from '@/components/ui/Icon'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountButton(options: MountingOptions<ButtonProps> & Record<string, unknown> = {}) {
  return mount(Button, options)
}

const casesLabel = [
  { prop: 'label' as const, value: 'Save', expected: 'Save' },
  { prop: 'label' as const, value: undefined, expected: '' },
]

const casesSize = [
  { input: 'xs' as const, expected: ['h-7', 'text-xs'] },
  { input: 'sm' as const, expected: ['h-8', 'text-sm'] },
  { input: 'md' as const, expected: ['h-9', 'text-base'] },
  { input: 'lg' as const, expected: ['h-10', 'text-lg'] },
  { input: undefined, expected: ['h-9', 'text-base'] },
]

const casesRaised = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesVariantStyles = [
  {
    variant: 'solid' as const,
    expectedNormal: ['bg-(--button-solid)', 'text-(--button-solid-foreground)'],
    expectedHover: ['hover:bg-(--button-solid-hover)', 'active:bg-(--button-solid-active)'],
  },
  {
    variant: 'outline' as const,
    expectedNormal: [
      'border',
      'bg-transparent',
      'border-(--button-outline-border)',
      'text-(--button-color)',
    ],
    expectedHover: [
      'hover:bg-(--button-outline-hover)',
      'active:border-(--button-outline-active-border)',
      'active:bg-(--button-outline-active)',
    ],
  },
  {
    variant: 'plain' as const,
    expectedNormal: ['bg-transparent', 'text-(--button-color)'],
    expectedHover: ['hover:bg-(--button-plain-hover)', 'active:bg-(--button-plain-active)'],
  },
  {
    variant: 'subtle' as const,
    expectedNormal: [
      'border',
      'border-(--button-subtle-border)',
      'bg-(--button-subtle-bg)',
      'text-(--button-color)',
    ],
    expectedHover: ['hover:bg-(--button-subtle-hover)', 'active:bg-(--button-subtle-active)'],
  },
  {
    variant: 'soft' as const,
    expectedNormal: ['bg-(--button-soft-bg)', 'text-(--button-color)'],
    expectedHover: ['hover:bg-(--button-soft-hover)', 'active:bg-(--button-soft-active)'],
  },
  {
    variant: 'link' as const,
    expectedNormal: ['bg-transparent', 'underline', 'underline-offset-4', 'text-(--button-color)'],
    expectedHover: ['hover:no-underline'],
  },
  {
    variant: undefined,
    expectedNormal: ['bg-(--button-solid)', 'text-(--button-solid-foreground)'],
    expectedHover: ['hover:bg-(--button-solid-hover)', 'active:bg-(--button-solid-active)'],
  },
] satisfies {
  variant: ButtonVariant | undefined
  expectedNormal: string[]
  expectedHover: string[]
}[]

const casesRounded = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesSquare = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesLoading = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesIcon = [
  { input: 'save' as const, expected: true },
  { input: undefined, expected: false },
]

const casesTrailingIcon = [
  { input: 'chevronRight' as const, expected: true },
  { input: undefined, expected: false },
]

const casesAs = [
  { input: 'button' as const, expected: 'button' },
  { input: 'a' as const, expected: 'a' },
  { input: undefined, expected: 'button' },
]

const casesAsChild = [
  { input: true, expected: 'a' },
  { input: false, expected: 'button' },
  { input: undefined, expected: 'button' },
]

const casesClick = [
  { loading: false, ariaDisabled: false, expected: 1 },
  { loading: true, ariaDisabled: undefined, expected: 0 },
  { loading: false, ariaDisabled: true, expected: 0 },
]

describe('Button', () => {
  describe('props', () => {
    describe('label', () => {
      it.each(casesLabel)(
        'renderiza label=$value como "$expected"',
        ({ prop, value, expected }) => {
          const button = mountButton({ props: { [prop]: value } })

          expect(button.get('[data-test-button-root]').text()).toBe(expected)
        },
      )
    })

    describe('size', () => {
      it.each(casesSize)('renderiza size=$input', ({ input, expected }) => {
        const root = mountButton({ props: { size: input } }).get('[data-test-button-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('variant', () => {
      it.each(casesVariantStyles)(
        'renderiza variant=$variant',
        ({ variant, expectedNormal, expectedHover }) => {
          const classes = mountButton({ props: { variant } })
            .get('[data-test-button-root]')
            .classes()

          expect(classes).toEqual(expect.arrayContaining(expectedNormal))
          expect(classes).toEqual(expect.arrayContaining(expectedHover))
        },
      )
    })

    describe('raised', () => {
      it.each(casesRaised)(
        'renderiza raised=$input como shadow=$expected',
        ({ input, expected }) => {
          const root = mountButton({ props: { raised: input } }).get('[data-test-button-root]')

          expect(root.classes().includes('shadow-sm')).toBe(expected)
        },
      )
    })

    describe('rounded', () => {
      it.each(casesRounded)('renderiza rounded=$input como $expected', ({ input, expected }) => {
        const classes = mountButton({ props: { rounded: input } })
          .get('[data-test-button-root]')
          .classes()

        expect(classes.includes('rounded-full')).toBe(expected)
      })
    })

    describe('square', () => {
      it.each(casesSquare)('renderiza square=$input como $expected', ({ input, expected }) => {
        const classes = mountButton({ props: { square: input } })
          .get('[data-test-button-root]')
          .classes()

        expect(classes.includes('size-(--button-square-size)')).toBe(expected)
        expect(classes.includes('p-0')).toBe(expected)
      })
    })

    describe('loading', () => {
      it.each(casesLoading)('renderiza loading=$input como $expected', ({ input, expected }) => {
        const button = mountButton({ props: { loading: input } })
        const root = button.get('[data-test-button-root]')

        expect(button.find('[data-test-button-loading-icon]').exists()).toBe(expected)
        expect(root.attributes('aria-busy')).toBe(expected ? 'true' : undefined)
        expect(root.attributes('aria-disabled')).toBe(expected ? 'true' : undefined)
      })
    })

    describe('icon', () => {
      it.each(casesIcon)(
        'renderiza icon=$input cuando expected=$expected',
        ({ input, expected }) => {
          const button = mountButton({ props: { icon: input } })
          const icon = button.find('[data-test-button-icon]')

          expect(icon.exists()).toBe(expected)
          if (expected) expect(button.getComponent(Icon).props('name')).toBe(input)
        },
      )

      it('oculta el icono inicial durante la carga', () => {
        const button = mountButton({ props: { icon: 'save', loading: true } })

        expect(button.find('[data-test-button-icon]').exists()).toBe(false)
        expect(button.find('[data-test-button-loading-icon]').exists()).toBe(true)
      })
    })

    describe('trailingIcon', () => {
      it.each(casesTrailingIcon)(
        'renderiza trailingIcon=$input cuando expected=$expected',
        ({ input, expected }) => {
          const button = mountButton({ props: { trailingIcon: input } })
          const icon = button.find('[data-test-button-trailing-icon]')

          expect(icon.exists()).toBe(expected)
          if (expected) expect(button.getComponent(Icon).props('name')).toBe(input)
        },
      )

      it('mantiene visible el icono final durante la carga', () => {
        const button = mountButton({
          props: { trailingIcon: 'chevronRight', loading: true },
        })

        expect(button.find('[data-test-button-trailing-icon]').exists()).toBe(true)
        expect(button.find('[data-test-button-loading-icon]').exists()).toBe(true)
      })
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color',
        id: '[data-test-button-root]',
        varColor: '--button-color',
        defaultColor: 'var(--primary, var(--primary))',
        theme: {
          colors: themeColors,
          foregroundVar: '--button-color-foreground',
          solidVar: '--button-solid',
          solidForegroundVar: '--button-solid-foreground',
        },
        mount: (color) => mountButton({ props: { color } }),
      })
    })

    describe('as', () => {
      it.each(casesAs)('renderiza as=$input como $expected', ({ input, expected }) => {
        const root = mountButton({ props: { as: input } }).get('[data-test-button-root]')

        expect(root.element.tagName.toLowerCase()).toBe(expected)
      })
    })

    describe('asChild', () => {
      it.each(casesAsChild)('renderiza asChild=$input como $expected', ({ input, expected }) => {
        const root = mountButton({
          props: { asChild: input },
          slots: { default: () => h('a', { href: '/docs' }, 'Open') },
        }).get('[data-test-button-root]')

        expect(root.element.tagName.toLowerCase()).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-button-root]',
      mount: (attrs) => mountButton({ attrs }),
    })
  })

  describe('emits', () => {
    it.each(casesClick)(
      'emite click=$expected para loading=$loading ariaDisabled=$ariaDisabled',
      async ({ loading, ariaDisabled, expected }) => {
        const button = mountButton({
          props: { loading },
          attrs: { 'aria-disabled': ariaDisabled },
        })

        await button.get('[data-test-button-root]').trigger('click')

        expect(button.emitted('click')?.length ?? 0).toBe(expected)
      },
    )
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot predeterminado y oculta el label alternativo', () => {
        const button = mountButton({
          props: { label: 'Label fallback' },
          slots: { default: () => h('span', { 'data-test-button-slot': 'default' }, 'Default') },
        })

        expect(button.get('[data-test-button-slot="default"]').text()).toBe('Default')
        expect(button.get('[data-test-button-root]').text()).not.toContain('Label fallback')
      })
    })

    describe('leading', () => {
      it('renderiza el slot inicial y oculta el icono alternativo', () => {
        const button = mountButton({
          props: { icon: 'save' },
          slots: {
            leading: () => h('span', { 'data-test-button-slot': 'leading' }, 'Leading'),
          },
        })

        expect(button.get('[data-test-button-slot="leading"]').text()).toBe('Leading')
        expect(button.find('[data-test-button-icon]').exists()).toBe(false)
      })
    })

    describe('loading', () => {
      it('renderiza el slot de carga y oculta el slot inicial', () => {
        const button = mountButton({
          props: { loading: true },
          slots: {
            leading: () => h('span', { 'data-test-button-slot': 'leading' }, 'Leading'),
            loading: () => h('span', { 'data-test-button-slot': 'loading' }, 'Loading'),
          },
        })

        expect(button.get('[data-test-button-slot="loading"]').text()).toBe('Loading')
        expect(button.find('[data-test-button-slot="leading"]').exists()).toBe(false)
        expect(button.find('[data-test-button-loading-icon]').exists()).toBe(false)
      })
    })

    describe('trailing', () => {
      it('renderiza el slot final y oculta el icono alternativo', () => {
        const button = mountButton({
          props: { trailingIcon: 'chevronRight' },
          slots: {
            trailing: () => h('span', { 'data-test-button-slot': 'trailing' }, 'Trailing'),
          },
        })

        expect(button.get('[data-test-button-slot="trailing"]').text()).toBe('Trailing')
        expect(button.find('[data-test-button-trailing-icon]').exists()).toBe(false)
      })
    })
  })
})
