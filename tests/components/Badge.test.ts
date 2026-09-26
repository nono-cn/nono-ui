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

const casesSeverityVariant = (
  [
    {
      severity: 'primary',
      variants: {
        solid: ['bg-primary', 'text-primary-foreground'],
        outline: ['border-primary/40', 'text-primary'],
        plain: ['border-transparent', 'text-primary'],
        subtle: ['border-primary/20', 'bg-primary/10', 'text-primary'],
        soft: ['border-transparent', 'bg-primary/10', 'text-primary'],
      },
    },
    {
      severity: 'neutral',
      variants: {
        solid: ['bg-foreground', 'text-background'],
        outline: ['border-foreground/30', 'text-foreground'],
        plain: ['border-transparent', 'text-foreground'],
        subtle: ['border-border', 'bg-muted', 'text-foreground'],
        soft: ['border-transparent', 'bg-muted', 'text-foreground'],
      },
    },
    {
      severity: 'secondary',
      variants: {
        solid: ['bg-secondary', 'text-secondary-foreground'],
        outline: ['border-secondary-foreground/30', 'text-secondary-foreground'],
        plain: ['border-transparent', 'text-secondary-foreground'],
        subtle: ['border-secondary-foreground/15', 'bg-secondary/60', 'text-secondary-foreground'],
        soft: ['border-transparent', 'bg-secondary/60', 'text-secondary-foreground'],
      },
    },
    {
      severity: 'warning',
      variants: {
        solid: ['bg-warning', 'text-warning-foreground'],
        outline: ['border-warning/40', 'text-warning'],
        plain: ['border-transparent', 'text-warning'],
        subtle: ['border-warning/20', 'bg-warning/10', 'text-warning'],
        soft: ['border-transparent', 'bg-warning/10', 'text-warning'],
      },
    },
    {
      severity: 'success',
      variants: {
        solid: ['bg-success', 'text-success-foreground'],
        outline: ['border-success/40', 'text-success'],
        plain: ['border-transparent', 'text-success'],
        subtle: ['border-success/20', 'bg-success/10', 'text-success'],
        soft: ['border-transparent', 'bg-success/10', 'text-success'],
      },
    },
    {
      severity: 'error',
      variants: {
        solid: ['bg-error', 'text-error-foreground'],
        outline: ['border-error/40', 'text-error'],
        plain: ['border-transparent', 'text-error'],
        subtle: ['border-error/20', 'bg-error/10', 'text-error'],
        soft: ['border-transparent', 'bg-error/10', 'text-error'],
      },
    },
  ] satisfies {
    severity: BadgeSeverity
    variants: Record<BadgeVariant, string[]>
  }[]
).flatMap(({ severity, variants }) =>
  (Object.entries(variants) as [BadgeVariant, string[]][]).map(([variant, semanticClasses]) => ({
    severity,
    variant,
    expected: [
      ...(variant === 'outline' || variant === 'subtle' ? ['border'] : []),
      ...(variant === 'outline' || variant === 'plain' ? ['bg-transparent'] : []),
      ...semanticClasses,
    ],
  })),
)

const casesColorVariant = [
  {
    variant: 'solid',
    expected: ['border-transparent', 'bg-(--badge-color)', 'text-(--badge-color-foreground)'],
  },
  {
    variant: 'outline',
    expected: ['border', 'border-(--badge-color)/40', 'bg-transparent', 'text-(--badge-color)'],
  },
  {
    variant: 'plain',
    expected: ['border-transparent', 'bg-transparent', 'text-(--badge-color)'],
  },
  {
    variant: 'subtle',
    expected: [
      'border',
      'border-(--badge-color)/20',
      'bg-(--badge-color)/10',
      'text-(--badge-color)',
    ],
  },
  {
    variant: 'soft',
    expected: ['border-transparent', 'bg-(--badge-color)/10', 'text-(--badge-color)'],
  },
] satisfies { variant: BadgeVariant; expected: string[] }[]

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
