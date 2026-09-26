import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import {
  Button,
  type ButtonProps,
  type ButtonSeverity,
  type ButtonVariant,
} from '@/components/ui/Button'
import { testAttrs } from '../utils/testAttrs'
import { testIconConfig, testIconSize } from '../utils/testIconConfig'

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
]

const casesRaised = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesSeverityVariant = (
  [
    {
      severity: 'primary',
      expectedFocus: ['focus-visible:border-primary', 'focus-visible:ring-primary/30'],
      variants: [
        {
          variant: 'solid',
          expectedNormal: ['bg-primary', 'text-primary-foreground'],
          expectedHover: ['hover:bg-primary/90'],
        },
        {
          variant: 'outline',
          expectedNormal: ['border', 'bg-transparent', 'border-primary/40', 'text-primary'],
          expectedHover: ['hover:bg-primary/10'],
        },
        {
          variant: 'plain',
          expectedNormal: ['bg-transparent', 'text-primary'],
          expectedHover: ['hover:bg-primary/10'],
        },
        {
          variant: 'subtle',
          expectedNormal: ['border', 'border-primary/20', 'bg-primary/10', 'text-primary'],
          expectedHover: ['hover:bg-primary/15'],
        },
        {
          variant: 'soft',
          expectedNormal: ['bg-primary/10', 'text-primary'],
          expectedHover: ['hover:bg-primary/20'],
        },
        {
          variant: 'link',
          expectedNormal: ['bg-transparent', 'underline', 'underline-offset-4', 'text-primary'],
          expectedHover: ['hover:no-underline'],
        },
      ],
    },
    {
      severity: 'neutral',
      expectedFocus: ['focus-visible:border-foreground', 'focus-visible:ring-foreground/30'],
      variants: [
        {
          variant: 'solid',
          expectedNormal: ['bg-foreground', 'text-background'],
          expectedHover: ['hover:bg-foreground/90'],
        },
        {
          variant: 'outline',
          expectedNormal: ['border', 'bg-transparent', 'border-foreground/30', 'text-foreground'],
          expectedHover: ['hover:bg-muted'],
        },
        {
          variant: 'plain',
          expectedNormal: ['bg-transparent', 'text-foreground'],
          expectedHover: ['hover:bg-muted'],
        },
        {
          variant: 'subtle',
          expectedNormal: ['border', 'border-border', 'bg-muted', 'text-foreground'],
          expectedHover: ['hover:bg-muted/80'],
        },
        {
          variant: 'soft',
          expectedNormal: ['bg-muted', 'text-foreground'],
          expectedHover: ['hover:bg-muted/80'],
        },
        {
          variant: 'link',
          expectedNormal: ['bg-transparent', 'underline', 'underline-offset-4', 'text-foreground'],
          expectedHover: ['hover:no-underline'],
        },
      ],
    },
    {
      severity: 'secondary',
      expectedFocus: [
        'focus-visible:border-secondary-foreground',
        'focus-visible:ring-secondary-foreground/20',
      ],
      variants: [
        {
          variant: 'solid',
          expectedNormal: ['bg-secondary', 'text-secondary-foreground'],
          expectedHover: ['hover:bg-secondary/80'],
        },
        {
          variant: 'outline',
          expectedNormal: [
            'border',
            'bg-transparent',
            'border-secondary-foreground/30',
            'text-secondary-foreground',
          ],
          expectedHover: ['hover:bg-secondary'],
        },
        {
          variant: 'plain',
          expectedNormal: ['bg-transparent', 'text-secondary-foreground'],
          expectedHover: ['hover:bg-secondary'],
        },
        {
          variant: 'subtle',
          expectedNormal: [
            'border',
            'border-secondary-foreground/15',
            'bg-secondary/60',
            'text-secondary-foreground',
          ],
          expectedHover: ['hover:bg-secondary/80'],
        },
        {
          variant: 'soft',
          expectedNormal: ['bg-secondary/60', 'text-secondary-foreground'],
          expectedHover: ['hover:bg-secondary/80'],
        },
        {
          variant: 'link',
          expectedNormal: [
            'bg-transparent',
            'underline',
            'underline-offset-4',
            'text-secondary-foreground',
          ],
          expectedHover: ['hover:no-underline'],
        },
      ],
    },
    {
      severity: 'warning',
      expectedFocus: ['focus-visible:border-warning', 'focus-visible:ring-warning/30'],
      variants: [
        {
          variant: 'solid',
          expectedNormal: ['bg-warning', 'text-warning-foreground'],
          expectedHover: ['hover:bg-warning/90'],
        },
        {
          variant: 'outline',
          expectedNormal: ['border', 'bg-transparent', 'border-warning/40', 'text-warning'],
          expectedHover: ['hover:bg-warning/10'],
        },
        {
          variant: 'plain',
          expectedNormal: ['bg-transparent', 'text-warning'],
          expectedHover: ['hover:bg-warning/10'],
        },
        {
          variant: 'subtle',
          expectedNormal: ['border', 'border-warning/20', 'bg-warning/10', 'text-warning'],
          expectedHover: ['hover:bg-warning/15'],
        },
        {
          variant: 'soft',
          expectedNormal: ['bg-warning/10', 'text-warning'],
          expectedHover: ['hover:bg-warning/20'],
        },
        {
          variant: 'link',
          expectedNormal: ['bg-transparent', 'underline', 'underline-offset-4', 'text-warning'],
          expectedHover: ['hover:no-underline'],
        },
      ],
    },
    {
      severity: 'success',
      expectedFocus: ['focus-visible:border-success', 'focus-visible:ring-success/30'],
      variants: [
        {
          variant: 'solid',
          expectedNormal: ['bg-success', 'text-success-foreground'],
          expectedHover: ['hover:bg-success/90'],
        },
        {
          variant: 'outline',
          expectedNormal: ['border', 'bg-transparent', 'border-success/40', 'text-success'],
          expectedHover: ['hover:bg-success/10'],
        },
        {
          variant: 'plain',
          expectedNormal: ['bg-transparent', 'text-success'],
          expectedHover: ['hover:bg-success/10'],
        },
        {
          variant: 'subtle',
          expectedNormal: ['border', 'border-success/20', 'bg-success/10', 'text-success'],
          expectedHover: ['hover:bg-success/15'],
        },
        {
          variant: 'soft',
          expectedNormal: ['bg-success/10', 'text-success'],
          expectedHover: ['hover:bg-success/20'],
        },
        {
          variant: 'link',
          expectedNormal: ['bg-transparent', 'underline', 'underline-offset-4', 'text-success'],
          expectedHover: ['hover:no-underline'],
        },
      ],
    },
    {
      severity: 'error',
      expectedFocus: ['focus-visible:border-error', 'focus-visible:ring-error/30'],
      variants: [
        {
          variant: 'solid',
          expectedNormal: ['bg-error', 'text-error-foreground'],
          expectedHover: ['hover:bg-error/90'],
        },
        {
          variant: 'outline',
          expectedNormal: ['border', 'bg-transparent', 'border-error/40', 'text-error'],
          expectedHover: ['hover:bg-error/10'],
        },
        {
          variant: 'plain',
          expectedNormal: ['bg-transparent', 'text-error'],
          expectedHover: ['hover:bg-error/10'],
        },
        {
          variant: 'subtle',
          expectedNormal: ['border', 'border-error/20', 'bg-error/10', 'text-error'],
          expectedHover: ['hover:bg-error/15'],
        },
        {
          variant: 'soft',
          expectedNormal: ['bg-error/10', 'text-error'],
          expectedHover: ['hover:bg-error/20'],
        },
        {
          variant: 'link',
          expectedNormal: ['bg-transparent', 'underline', 'underline-offset-4', 'text-error'],
          expectedHover: ['hover:no-underline'],
        },
      ],
    },
  ] satisfies {
    severity: ButtonSeverity
    expectedFocus: string[]
    variants: {
      variant: ButtonVariant
      expectedNormal: string[]
      expectedHover: string[]
    }[]
  }[]
).flatMap(({ severity, expectedFocus, variants }) =>
  variants.map(({ variant, expectedNormal, expectedHover }) => ({
    severity,
    variant,
    expectedNormal,
    expectedHover,
    expectedFocus,
  })),
)

const casesShape = [
  { prop: 'rounded' as const, expected: 'rounded-full' },
  { prop: 'square' as const, expected: 'size-9' },
]

const casesLoading = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesClick = [
  { loading: false, ariaDisabled: false, expected: 1 },
  { loading: true, ariaDisabled: undefined, expected: 0 },
  { loading: false, ariaDisabled: true, expected: 0 },
]

const casesColorVariant = [
  {
    variant: 'solid',
    expected: [
      'bg-(--button-color)',
      'text-(--button-color-foreground)',
      'hover:bg-(--button-color)/90',
      'active:bg-(--button-color)/80',
    ],
  },
  {
    variant: 'outline',
    expected: [
      'border-(--button-color)/40',
      'text-(--button-color)',
      'hover:bg-(--button-color)/10',
      'active:border-(--button-color)/60',
      'active:bg-(--button-color)/20',
    ],
  },
  {
    variant: 'plain',
    expected: [
      'text-(--button-color)',
      'hover:bg-(--button-color)/10',
      'active:bg-(--button-color)/20',
    ],
  },
  {
    variant: 'subtle',
    expected: [
      'border-(--button-color)/20',
      'bg-(--button-color)/10',
      'text-(--button-color)',
      'hover:bg-(--button-color)/15',
      'active:bg-(--button-color)/25',
    ],
  },
  {
    variant: 'soft',
    expected: [
      'bg-(--button-color)/10',
      'text-(--button-color)',
      'hover:bg-(--button-color)/20',
      'active:bg-(--button-color)/30',
    ],
  },
  { variant: 'link', expected: ['text-(--button-color)'] },
] satisfies { variant: ButtonVariant; expected: string[] }[]

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
      it.each(casesSeverityVariant)(
        'renderiza severity=$severity con variant=$variant',
        ({ severity, variant, expectedNormal, expectedHover, expectedFocus }) => {
          const root = mountButton({ props: { severity, variant } }).get('[data-test-button-root]')
          const classes = root.classes()

          expect(classes).toEqual(expect.arrayContaining(expectedNormal))
          expect(classes).toEqual(expect.arrayContaining(expectedHover))
          expect(classes).toEqual(expect.arrayContaining(expectedFocus))
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

    describe('shape', () => {
      it.each(casesShape)('renderiza $prop=true', ({ prop, expected }) => {
        const root = mountButton({ props: { [prop]: true } }).get('[data-test-button-root]')

        expect(root.classes()).toContain(expected)
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
      testIconConfig({
        text: 'pasa las props de icon',
        id: '[data-test-button-icon]',
        mount: (input) => mountButton({ props: { icon: input } }),
      })

      it('oculta el icono inicial durante la carga', () => {
        const button = mountButton({ props: { icon: { name: 'save' }, loading: true } })

        expect(button.find('[data-test-button-icon]').exists()).toBe(false)
        expect(button.find('[data-test-button-loading-icon]').exists()).toBe(true)
      })

      testIconSize({
        text: 'hace que icon herede el tamaño de Button',
        id: '[data-test-button-icon]',
        mount: (size) => mountButton({ props: { size, icon: { name: 'save' } } }),
      })

      it('prioriza un tamaño explícito de icon', () => {
        const button = mountButton({
          props: { size: 'lg', icon: { name: 'save', size: 'xs' } },
        })

        expect(button.getComponent('[data-test-button-icon]').props('size')).toBe('xs')
      })
    })

    describe('trailingIcon', () => {
      testIconConfig({
        text: 'pasa las props de trailingIcon',
        id: '[data-test-button-trailing-icon]',
        mount: (input) => mountButton({ props: { trailingIcon: input } }),
      })

      it('mantiene visible el icono final durante la carga', () => {
        const button = mountButton({
          props: { trailingIcon: { name: 'chevronRight' }, loading: true },
        })

        expect(button.find('[data-test-button-trailing-icon]').exists()).toBe(true)
        expect(button.find('[data-test-button-loading-icon]').exists()).toBe(true)
      })

      testIconSize({
        text: 'hace que el icono final herede el tamaño de Button',
        id: '[data-test-button-trailing-icon]',
        mount: (size) => mountButton({ props: { size, trailingIcon: { name: 'chevronRight' } } }),
      })

      it('prioriza un tamaño explícito del icono final', () => {
        const button = mountButton({
          props: {
            size: 'lg',
            trailingIcon: { name: 'chevronRight', size: 'xs' },
          },
        })

        expect(button.getComponent('[data-test-button-trailing-icon]').props('size')).toBe('xs')
      })
    })

    describe('color', () => {
      it.each(casesColorVariant)(
        'aplica un color personalizado con variant=$variant',
        ({ variant, expected }) => {
          const root = mountButton({
            props: { color: '#ff0000', variant },
          }).get('[data-test-button-root]')

          expect(root.attributes('style')).toContain('--button-color: #ff0000')
          expect(root.attributes('style')).toContain('--button-color-foreground: #09090b')
          expect(root.classes()).toEqual(expect.arrayContaining(expected))
        },
      )
    })

    describe('as', () => {
      it('renderiza el elemento configurado', () => {
        const root = mountButton({ props: { as: 'a', label: 'Open', href: '/docs' } }).get(
          '[data-test-button-root]',
        )

        expect(root.element.tagName.toLowerCase()).toBe('a')
        expect(root.attributes('href')).toBe('/docs')
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
          props: { icon: { name: 'save' } },
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
          props: { trailingIcon: { name: 'chevronRight' } },
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
