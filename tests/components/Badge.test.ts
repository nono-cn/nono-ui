import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import {
  Badge,
  type BadgeProps,
  type BadgeSeverity,
  type BadgeVariant,
} from '@/components/ui/Badge'
import { testAttrs } from '../utils/testAttrs'
import { testIconConfig, testIconSize } from '../utils/testIconConfig'

function mountBadge(options: MountingOptions<BadgeProps> = {}) {
  return mount(Badge, options)
}

const casesVariant = [
  {
    variant: 'solid',
    expected: ['border-transparent', 'bg-(--badge-solid)', 'text-(--badge-solid-foreground)'],
  },
  {
    variant: 'outline',
    expected: ['border-(--badge-color)/40', 'bg-transparent', 'text-(--badge-color)'],
  },
  {
    variant: 'plain',
    expected: ['border-transparent', 'bg-transparent', 'text-(--badge-color)'],
  },
  {
    variant: 'subtle',
    expected: ['border-(--badge-color)/20', 'bg-(--badge-color)/10', 'text-(--badge-color)'],
  },
  {
    variant: 'soft',
    expected: ['border-transparent', 'bg-(--badge-color)/10', 'text-(--badge-color)'],
  },
] satisfies { variant: BadgeVariant; expected: string[] }[]

const casesSeverity = [
  {
    severity: 'primary',
    expected: [
      '[--badge-color:var(--primary)]',
      '[--badge-solid:var(--primary)]',
      '[--badge-solid-foreground:var(--primary-foreground)]',
      'focus-visible:border-primary',
      'focus-visible:ring-primary/30',
    ],
  },
  {
    severity: 'neutral',
    expected: [
      '[--badge-color:var(--foreground)]',
      '[--badge-solid:var(--foreground)]',
      '[--badge-solid-foreground:var(--background)]',
      'focus-visible:border-foreground',
      'focus-visible:ring-foreground/30',
    ],
  },
  {
    severity: 'secondary',
    expected: [
      '[--badge-color:var(--secondary-foreground)]',
      '[--badge-solid:var(--secondary)]',
      '[--badge-solid-foreground:var(--secondary-foreground)]',
      'focus-visible:border-secondary-foreground',
      'focus-visible:ring-secondary-foreground/20',
    ],
  },
  {
    severity: 'warning',
    expected: [
      '[--badge-color:var(--warning)]',
      '[--badge-solid:var(--warning)]',
      '[--badge-solid-foreground:var(--warning-foreground)]',
      'focus-visible:border-warning',
      'focus-visible:ring-warning/30',
    ],
  },
  {
    severity: 'success',
    expected: [
      '[--badge-color:var(--success)]',
      '[--badge-solid:var(--success)]',
      '[--badge-solid-foreground:var(--success-foreground)]',
      'focus-visible:border-success',
      'focus-visible:ring-success/30',
    ],
  },
  {
    severity: 'error',
    expected: [
      '[--badge-color:var(--error)]',
      '[--badge-solid:var(--error)]',
      '[--badge-solid-foreground:var(--error-foreground)]',
      'focus-visible:border-error',
      'focus-visible:ring-error/30',
    ],
  },
] satisfies { severity: BadgeSeverity; expected: string[] }[]

const casesSeverityVariant = casesSeverity.flatMap(({ severity, expected: severityClasses }) =>
  casesVariant.map(({ variant, expected: variantClasses }) => ({
    severity,
    variant,
    expected: [...severityClasses, ...variantClasses],
  })),
)

const casesColorVariant = casesVariant.map(({ variant, expected: variantClasses }) => ({
  variant,
  expected: [
    ...variantClasses,
    'focus-visible:border-(--badge-color)',
    'focus-visible:ring-(--badge-color)/30',
    ...(variant === 'solid'
      ? [
          '[--badge-solid:var(--badge-color)]',
          '[--badge-solid-foreground:var(--badge-color-foreground)]',
        ]
      : []),
  ],
}))

describe('Badge', () => {
  describe('props', () => {
    describe('label', () => {
      it.each([
        { input: 'Status', expected: 'Status' },
        { input: undefined, expected: '' },
      ])('renderiza label=$input como "$expected"', ({ input, expected }) => {
        const badge = mountBadge({ props: { label: input } })

        expect(badge.get('[data-test-badge-root]').text()).toBe(expected)
      })
    })

    describe('size', () => {
      it.each([
        { input: 'sm' as const, expected: ['gap-0.5', 'px-0.5', 'text-sm'] },
        { input: 'md' as const, expected: ['gap-1', 'px-1', 'text-base'] },
        { input: 'lg' as const, expected: ['gap-1.5', 'px-2', 'text-lg'] },
      ])('renderiza size=$input', ({ input, expected }) => {
        const root = mountBadge({ props: { size: input } }).get('[data-test-badge-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('variant', () => {
      it.each(casesSeverityVariant)(
        'renderiza severity=$severity con variant=$variant',
        ({ severity, variant, expected }) => {
          const root = mountBadge({ props: { severity, variant } }).get('[data-test-badge-root]')

          expect(root.classes()).toEqual(expect.arrayContaining(expected))
          expect(root.classes()).toContain(
            `focus-visible:border-${
              severity === 'neutral'
                ? 'foreground'
                : severity === 'secondary'
                  ? 'secondary-foreground'
                  : severity
            }`,
          )
        },
      )
    })

    describe('color', () => {
      it.each(casesColorVariant)(
        'aplica un color personalizado con variant=$variant',
        ({ variant, expected }) => {
          const root = mountBadge({
            props: { color: '#ff0000', variant },
          }).get('[data-test-badge-root]')

          expect(root.attributes('style')).toContain('--badge-color: #ff0000')
          expect(root.attributes('style')).toContain('--badge-color-foreground: #09090b')
          expect(root.classes()).toEqual(
            expect.arrayContaining([...expected, 'focus-visible:border-(--badge-color)']),
          )
        },
      )
    })

    describe('icon', () => {
      testIconConfig({
        text: 'pasa las props de icon',
        id: '[data-test-badge-icon]',
        mount: (input) => mountBadge({ props: { icon: input } }),
      })

      testIconSize({
        text: 'hace que icon herede el tamaño de Badge',
        id: '[data-test-badge-icon]',
        mount: (size) => mountBadge({ props: { size, icon: { name: 'check' } } }),
      })

      it('prioriza el tamaño explícito de icon sobre el tamaño de Badge', () => {
        const badge = mountBadge({
          props: { size: 'lg', icon: { name: 'check', size: 'sm' } },
        })

        expect(badge.getComponent('[data-test-badge-icon]').props('size')).toBe('sm')
      })
    })

    describe('trailingIcon', () => {
      testIconConfig({
        text: 'pasa las props de trailingIcon',
        id: '[data-test-badge-trailing-icon]',
        mount: (input) => mountBadge({ props: { trailingIcon: input } }),
      })

      testIconSize({
        text: 'hace que el icono final herede el tamaño de Badge',
        id: '[data-test-badge-trailing-icon]',
        mount: (size) => mountBadge({ props: { size, trailingIcon: { name: 'chevronRight' } } }),
      })

      it('prioriza el tamaño explícito del icono final sobre el tamaño de Badge', () => {
        const badge = mountBadge({
          props: { size: 'lg', trailingIcon: { name: 'chevronRight', size: 'sm' } },
        })

        expect(badge.getComponent('[data-test-badge-trailing-icon]').props('size')).toBe('sm')
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-badge-root]',
      mount: (attrs) => mountBadge({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot predeterminado y oculta el label alternativo', () => {
        const badge = mountBadge({
          props: { label: 'Label fallback' },
          slots: { default: () => h('span', { 'data-test-badge-slot': 'default' }, 'Default') },
        })

        expect(badge.get('[data-test-badge-slot="default"]').text()).toBe('Default')
        expect(badge.get('[data-test-badge-root]').text()).not.toContain('Label fallback')
      })
    })

    describe('leading', () => {
      it('renderiza el slot inicial y oculta el icono alternativo', () => {
        const badge = mountBadge({
          props: { icon: { name: 'check' } },
          slots: { leading: () => h('span', { 'data-test-badge-slot': 'leading' }, 'Leading') },
        })

        expect(badge.get('[data-test-badge-slot="leading"]').text()).toBe('Leading')
        expect(badge.find('[data-test-badge-icon]').exists()).toBe(false)
      })
    })

    describe('trailing', () => {
      it('renderiza el slot final y oculta el icono alternativo', () => {
        const badge = mountBadge({
          props: { trailingIcon: { name: 'chevronRight' } },
          slots: {
            trailing: () => h('span', { 'data-test-badge-slot': 'trailing' }, 'Trailing'),
          },
        })

        expect(badge.get('[data-test-badge-slot="trailing"]').text()).toBe('Trailing')
        expect(badge.find('[data-test-badge-trailing-icon]').exists()).toBe(false)
      })
    })
  })
})
