import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { testAttrs } from '../utils/testAttrs'
import { testIconConfig, testIconSize } from '../utils/testIconConfig'

function mountBadge(options: MountingOptions<BadgeProps> = {}) {
  return mount(Badge, options)
}

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
      it.each([
        {
          input: 'solid' as const,
          expected: ['border-transparent', 'bg-primary', 'text-primary-foreground'],
        },
        {
          input: 'outline' as const,
          expected: ['border', 'border-primary/40', 'bg-transparent', 'text-primary'],
        },
        {
          input: 'plain' as const,
          expected: ['border-transparent', 'bg-transparent', 'text-primary'],
        },
        {
          input: 'subtle' as const,
          expected: ['border', 'border-primary/20', 'bg-primary/10', 'text-primary'],
        },
        {
          input: 'soft' as const,
          expected: ['border-transparent', 'bg-primary/10', 'text-primary'],
        },
      ])('renderiza variant=$input', ({ input, expected }) => {
        const root = mountBadge({ props: { variant: input } }).get('[data-test-badge-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('severity', () => {
      it.each([
        { input: 'primary' as const, expected: ['bg-primary', 'text-primary-foreground'] },
        { input: 'secondary' as const, expected: ['bg-secondary', 'text-secondary-foreground'] },
        { input: 'warning' as const, expected: ['bg-warning', 'text-warning-foreground'] },
        { input: 'success' as const, expected: ['bg-success', 'text-success-foreground'] },
        { input: 'error' as const, expected: ['bg-error', 'text-error-foreground'] },
      ])('renderiza severity=$input', ({ input, expected }) => {
        const root = mountBadge({ props: { severity: input } }).get('[data-test-badge-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('color', () => {
      it('aplica un color personalizado', () => {
        const root = mountBadge({ props: { color: '#ff0000' } }).get('[data-test-badge-root]')

        expect(root.attributes('style')).toContain('--badge-color: #ff0000')
        expect(root.attributes('style')).toContain('--badge-color-foreground: #09090b')
        expect(root.classes()).toEqual(
          expect.arrayContaining([
            'bg-(--badge-color)',
            'text-(--badge-color-foreground)',
            'focus-visible:border-(--badge-color)',
          ]),
        )
      })
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
