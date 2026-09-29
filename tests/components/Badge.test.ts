import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import {
  Badge,
  type BadgeProps,
  type BadgeSeverity,
  type BadgeSize,
  type BadgeVariant,
} from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountBadge(options: MountingOptions<BadgeProps> = {}) {
  return mount(Badge, options)
}

const casesSize = [
  { input: 'sm', expected: ['gap-0.5', 'px-0.5', 'text-sm'] },
  { input: 'md', expected: ['gap-1', 'px-1', 'text-base'] },
  { input: 'lg', expected: ['gap-1.5', 'px-2', 'text-lg'] },
  { input: undefined, expected: ['gap-1', 'px-1', 'text-base'] },
] satisfies { input: BadgeSize | undefined; expected: string[] }[]

const casesVariant = [
  {
    input: 'solid',
    expected: ['border-transparent', 'bg-(--badge-solid)', 'text-(--badge-solid-foreground)'],
  },
  {
    input: 'outline',
    expected: ['border-(--badge-color)/40', 'bg-transparent', 'text-(--badge-color)'],
  },
  {
    input: 'plain',
    expected: ['border-transparent', 'bg-transparent', 'text-(--badge-color)'],
  },
  {
    input: 'subtle',
    expected: ['border-(--badge-color)/20', 'bg-(--badge-color)/10', 'text-(--badge-color)'],
  },
  {
    input: 'soft',
    expected: ['border-transparent', 'bg-(--badge-color)/10', 'text-(--badge-color)'],
  },
  {
    input: undefined,
    expected: ['border-transparent', 'bg-(--badge-solid)', 'text-(--badge-solid-foreground)'],
  },
] satisfies { input: BadgeVariant | undefined; expected: string[] }[]

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
  {
    severity: undefined,
    expected: [
      '[--badge-color:var(--primary)]',
      '[--badge-solid:var(--primary)]',
      '[--badge-solid-foreground:var(--primary-foreground)]',
      'focus-visible:border-primary',
      'focus-visible:ring-primary/30',
    ],
  },
] satisfies { severity: BadgeSeverity | undefined; expected: string[] }[]

const casesIcon = [
  { input: 'check' as const, expected: 'check' },
  { input: undefined, expected: undefined },
]

const casesTrailingIcon = [
  { input: 'chevronRight' as const, expected: 'chevronRight' },
  { input: undefined, expected: undefined },
]

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
      it.each(casesSize)('renderiza size=$input', ({ input, expected }) => {
        const badge = mountBadge({
          props: { size: input, icon: 'check', trailingIcon: 'chevronRight' },
        })
        const root = badge.get('[data-test-badge-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
        expect(badge.findAllComponents(Icon).map((icon) => icon.props('size'))).toEqual([
          input ?? 'md',
          input ?? 'md',
        ])
      })
    })

    describe('variant', () => {
      it.each(casesVariant)('renderiza variant=$input', ({ input, expected }) => {
        const root = mountBadge({ props: { variant: input } }).get('[data-test-badge-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('severity', () => {
      it.each(casesSeverity)('renderiza severity=$severity', ({ severity, expected }) => {
        const root = mountBadge({ props: { severity } }).get('[data-test-badge-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('color', () => {
      testColor({
        text: 'aplica color personalizado',
        id: '[data-test-badge-root]',
        varColor: '--badge-color',
        mount: (color) => mountBadge({ props: { color } }),
      })
    })

    describe('icon', () => {
      it.each(casesIcon)('renderiza icon=$input', ({ input, expected }) => {
        const badge = mountBadge({ props: { icon: input } })
        const icon = badge.findComponent(Icon)

        expect(icon.exists()).toBe(expected !== undefined)
        if (expected) expect(icon.props('name')).toBe(expected)
      })
    })

    describe('trailingIcon', () => {
      it.each(casesTrailingIcon)('renderiza trailingIcon=$input', ({ input, expected }) => {
        const badge = mountBadge({ props: { trailingIcon: input } })
        const icon = badge.findComponent(Icon)

        expect(icon.exists()).toBe(expected !== undefined)
        if (expected) expect(icon.props('name')).toBe(expected)
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
          props: { icon: 'check' },
          slots: { leading: () => h('span', { 'data-test-badge-slot': 'leading' }, 'Leading') },
        })

        expect(badge.get('[data-test-badge-slot="leading"]').text()).toBe('Leading')
        expect(badge.find('[data-test-badge-icon]').exists()).toBe(false)
      })
    })

    describe('trailing', () => {
      it('renderiza el slot final y oculta el icono alternativo', () => {
        const badge = mountBadge({
          props: { trailingIcon: 'chevronRight' },
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
