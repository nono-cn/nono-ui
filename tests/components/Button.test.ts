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
]

const casesSeverity = [
  {
    severity: 'primary',
    expectedFocus: ['focus-visible:border-primary', 'focus-visible:ring-primary/30'],
    expectedSeverity: [
      '[--button-color:var(--primary)]',
      '[--button-solid:var(--primary)]',
      '[--button-solid-foreground:var(--primary-foreground)]',
    ],
  },
  {
    severity: 'neutral',
    expectedFocus: ['focus-visible:border-foreground', 'focus-visible:ring-foreground/30'],
    expectedSeverity: [
      '[--button-color:var(--foreground)]',
      '[--button-solid:var(--foreground)]',
      '[--button-solid-foreground:var(--background)]',
      '[--button-outline-border:color-mix(in_oklab,var(--foreground)_30%,transparent)]',
      '[--button-outline-hover:var(--muted)]',
      '[--button-outline-active-border:var(--button-outline-border)]',
      '[--button-outline-active:color-mix(in_oklab,var(--muted)_80%,transparent)]',
      '[--button-plain-hover:var(--muted)]',
      '[--button-plain-active:color-mix(in_oklab,var(--muted)_80%,transparent)]',
      '[--button-subtle-border:var(--border)]',
      '[--button-subtle-bg:var(--muted)]',
      '[--button-subtle-hover:color-mix(in_oklab,var(--muted)_80%,transparent)]',
      '[--button-subtle-active:color-mix(in_oklab,var(--muted)_70%,transparent)]',
      '[--button-soft-bg:var(--muted)]',
      '[--button-soft-hover:color-mix(in_oklab,var(--muted)_80%,transparent)]',
      '[--button-soft-active:color-mix(in_oklab,var(--muted)_70%,transparent)]',
    ],
  },
  {
    severity: 'secondary',
    expectedFocus: [
      'focus-visible:border-secondary-foreground',
      'focus-visible:ring-secondary-foreground/20',
    ],
    expectedSeverity: [
      '[--button-color:var(--secondary-foreground)]',
      '[--button-solid:var(--secondary)]',
      '[--button-solid-foreground:var(--secondary-foreground)]',
      '[--button-solid-hover:color-mix(in_oklab,var(--secondary)_80%,transparent)]',
      '[--button-solid-active:color-mix(in_oklab,var(--secondary)_70%,transparent)]',
      '[--button-outline-border:color-mix(in_oklab,var(--secondary-foreground)_30%,transparent)]',
      '[--button-outline-hover:var(--secondary)]',
      '[--button-outline-active-border:var(--button-outline-border)]',
      '[--button-outline-active:color-mix(in_oklab,var(--secondary)_70%,transparent)]',
      '[--button-plain-hover:var(--secondary)]',
      '[--button-plain-active:color-mix(in_oklab,var(--secondary)_70%,transparent)]',
      '[--button-subtle-border:color-mix(in_oklab,var(--secondary-foreground)_15%,transparent)]',
      '[--button-subtle-bg:color-mix(in_oklab,var(--secondary)_60%,transparent)]',
      '[--button-subtle-hover:color-mix(in_oklab,var(--secondary)_80%,transparent)]',
      '[--button-subtle-active:var(--secondary)]',
      '[--button-soft-bg:color-mix(in_oklab,var(--secondary)_60%,transparent)]',
      '[--button-soft-hover:color-mix(in_oklab,var(--secondary)_80%,transparent)]',
      '[--button-soft-active:var(--secondary)]',
    ],
  },
  {
    severity: 'warning',
    expectedFocus: ['focus-visible:border-warning', 'focus-visible:ring-warning/30'],
    expectedSeverity: [
      '[--button-color:var(--warning)]',
      '[--button-solid:var(--warning)]',
      '[--button-solid-foreground:var(--warning-foreground)]',
    ],
  },
  {
    severity: 'success',
    expectedFocus: ['focus-visible:border-success', 'focus-visible:ring-success/30'],
    expectedSeverity: [
      '[--button-color:var(--success)]',
      '[--button-solid:var(--success)]',
      '[--button-solid-foreground:var(--success-foreground)]',
    ],
  },
  {
    severity: 'error',
    expectedFocus: ['focus-visible:border-error', 'focus-visible:ring-error/30'],
    expectedSeverity: [
      '[--button-color:var(--error)]',
      '[--button-solid:var(--error)]',
      '[--button-solid-foreground:var(--error-foreground)]',
    ],
  },
] satisfies {
  severity: ButtonSeverity
  expectedFocus: string[]
  expectedSeverity: string[]
}[]

const casesSeverityVariant = casesSeverity.flatMap(
  ({ severity, expectedFocus, expectedSeverity }) =>
    casesVariantStyles.map(({ variant, expectedNormal, expectedHover }) => ({
      severity,
      variant,
      expectedFocus,
      expectedSeverity,
      expectedNormal,
      expectedHover,
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

const expectedColorStateVariables = [
  '[--button-solid-hover:color-mix(in_oklab,var(--button-solid)_90%,transparent)]',
  '[--button-solid-active:color-mix(in_oklab,var(--button-solid)_80%,transparent)]',
  '[--button-outline-border:color-mix(in_oklab,var(--button-color)_40%,transparent)]',
  '[--button-outline-hover:color-mix(in_oklab,var(--button-color)_10%,transparent)]',
  '[--button-outline-active-border:color-mix(in_oklab,var(--button-color)_60%,transparent)]',
  '[--button-outline-active:color-mix(in_oklab,var(--button-color)_20%,transparent)]',
  '[--button-plain-hover:color-mix(in_oklab,var(--button-color)_10%,transparent)]',
  '[--button-plain-active:color-mix(in_oklab,var(--button-color)_20%,transparent)]',
  '[--button-subtle-border:color-mix(in_oklab,var(--button-color)_20%,transparent)]',
  '[--button-subtle-bg:color-mix(in_oklab,var(--button-color)_10%,transparent)]',
  '[--button-subtle-hover:color-mix(in_oklab,var(--button-color)_15%,transparent)]',
  '[--button-subtle-active:color-mix(in_oklab,var(--button-color)_25%,transparent)]',
  '[--button-soft-bg:color-mix(in_oklab,var(--button-color)_10%,transparent)]',
  '[--button-soft-hover:color-mix(in_oklab,var(--button-color)_20%,transparent)]',
  '[--button-soft-active:color-mix(in_oklab,var(--button-color)_30%,transparent)]',
]

const casesColorVariant = casesVariantStyles.map(({ variant, expectedNormal, expectedHover }) => ({
  variant,
  expected: [
    ...expectedNormal,
    ...expectedHover,
    'focus-visible:border-(--button-color)',
    'focus-visible:ring-(--button-color)/30',
    '[--button-solid:var(--button-color)]',
    '[--button-solid-foreground:var(--button-color-foreground)]',
    ...expectedColorStateVariables,
  ],
})) satisfies { variant: ButtonVariant; expected: string[] }[]

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
        ({ severity, variant, expectedNormal, expectedHover, expectedFocus, expectedSeverity }) => {
          const root = mountButton({ props: { severity, variant } }).get('[data-test-button-root]')
          const classes = root.classes()

          expect(classes).toEqual(expect.arrayContaining(expectedNormal))
          expect(classes).toEqual(expect.arrayContaining(expectedHover))
          expect(classes).toEqual(expect.arrayContaining(expectedFocus))
          expect(classes).toEqual(expect.arrayContaining(expectedSeverity))
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
