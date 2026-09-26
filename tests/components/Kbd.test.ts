import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Kbd, type KbdProps, type KbdSeverity, type KbdVariant } from '@/components/ui/Kbd'
import { testAttrs } from '../utils/testAttrs'

function mountKbd(options: MountingOptions<KbdProps> = {}) {
  return mount(Kbd, options)
}

function mountWithProp(prop: keyof KbdProps, value: unknown) {
  return mountKbd({ props: { [prop]: value } as KbdProps })
}

const casesLabel = [
  { input: 'Ctrl', expected: 'Ctrl' },
  { input: '', expected: '' },
  { input: undefined, expected: '' },
]

const casesSize = [
  { input: 'sm' as const, expected: ['h-4', 'min-w-4', 'text-[10px]'] },
  { input: 'md' as const, expected: ['h-5', 'min-w-5', 'text-[11px]'] },
  { input: 'lg' as const, expected: ['h-6', 'min-w-6', 'text-xs'] },
  { input: undefined, expected: ['h-5', 'min-w-5', 'text-[11px]'] },
]

const casesSeverityVariant = (
  [
    {
      severity: 'primary',
      variants: {
        solid: ['border-transparent', 'bg-primary', 'text-primary-foreground'],
        outline: ['bg-transparent', 'border-primary/40', 'text-primary'],
        soft: ['border-transparent', 'bg-primary/10', 'text-primary'],
        subtle: ['border', 'border-primary/20', 'bg-primary/10', 'text-primary'],
      },
    },
    {
      severity: 'neutral',
      variants: {
        solid: ['border-transparent', 'bg-foreground', 'text-background'],
        outline: ['bg-transparent', 'border-foreground/30', 'text-foreground'],
        soft: ['border-transparent', 'bg-muted', 'text-foreground'],
        subtle: ['border', 'border-border', 'bg-muted', 'text-foreground'],
      },
    },
    {
      severity: 'secondary',
      variants: {
        solid: ['border-transparent', 'bg-secondary', 'text-secondary-foreground'],
        outline: ['bg-transparent', 'border-secondary-foreground/30', 'text-secondary-foreground'],
        soft: ['border-transparent', 'bg-secondary/60', 'text-secondary-foreground'],
        subtle: [
          'border',
          'border-secondary-foreground/15',
          'bg-secondary/60',
          'text-secondary-foreground',
        ],
      },
    },
    {
      severity: 'warning',
      variants: {
        solid: ['border-transparent', 'bg-warning', 'text-warning-foreground'],
        outline: ['bg-transparent', 'border-warning/40', 'text-warning'],
        soft: ['border-transparent', 'bg-warning/10', 'text-warning'],
        subtle: ['border', 'border-warning/20', 'bg-warning/10', 'text-warning'],
      },
    },
    {
      severity: 'success',
      variants: {
        solid: ['border-transparent', 'bg-success', 'text-success-foreground'],
        outline: ['bg-transparent', 'border-success/40', 'text-success'],
        soft: ['border-transparent', 'bg-success/10', 'text-success'],
        subtle: ['border', 'border-success/20', 'bg-success/10', 'text-success'],
      },
    },
    {
      severity: 'error',
      variants: {
        solid: ['border-transparent', 'bg-error', 'text-error-foreground'],
        outline: ['bg-transparent', 'border-error/40', 'text-error'],
        soft: ['border-transparent', 'bg-error/10', 'text-error'],
        subtle: ['border', 'border-error/20', 'bg-error/10', 'text-error'],
      },
    },
  ] satisfies { severity: KbdSeverity; variants: Record<KbdVariant, string[]> }[]
).flatMap(({ severity, variants }) =>
  (Object.entries(variants) as [KbdVariant, string[]][]).map(([variant, expected]) => ({
    severity,
    variant,
    expected,
  })),
)

const casesColorVariant = [
  {
    variant: 'solid',
    expected: ['border-transparent', 'bg-(--kbd-color)', 'text-(--kbd-color-foreground)'],
  },
  {
    variant: 'outline',
    expected: ['bg-transparent', 'border-(--kbd-color)/40', 'text-(--kbd-color)'],
  },
  {
    variant: 'soft',
    expected: ['border-transparent', 'bg-(--kbd-color)/10', 'text-(--kbd-color)'],
  },
  {
    variant: 'subtle',
    expected: ['border', 'border-(--kbd-color)/20', 'bg-(--kbd-color)/10', 'text-(--kbd-color)'],
  },
] satisfies { variant: KbdVariant; expected: string[] }[]

describe('Kbd', () => {
  describe('props', () => {
    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input como "$expected"', ({ input, expected }) => {
        const root = mountKbd({ props: { label: input } }).get('[data-test-kbd-root]')

        expect(root.text()).toBe(expected)
      })
    })

    describe('size', () => {
      it.each(casesSize)('renderiza size=$input', ({ input, expected }) => {
        const root = mountWithProp('size', input).get('[data-test-kbd-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('variant', () => {
      it.each(casesSeverityVariant)(
        'renderiza severity=$severity con variant=$variant',
        ({ severity, variant, expected }) => {
          const root = mountKbd({ props: { severity, variant } }).get('[data-test-kbd-root]')

          expect(root.classes()).toEqual(expect.arrayContaining(expected))
        },
      )

      it('usa soft y severity secondary por defecto', () => {
        const root = mountKbd().get('[data-test-kbd-root]')

        expect(root.classes()).toEqual(
          expect.arrayContaining([
            'border-transparent',
            'bg-secondary/60',
            'text-secondary-foreground',
          ]),
        )
      })
    })

    describe('color', () => {
      it.each(casesColorVariant)('combina color con variant=$variant', ({ variant, expected }) => {
        const root = mountKbd({
          props: { color: '#ff0000', variant },
        }).get('[data-test-kbd-root]')

        expect(root.attributes('style')).toContain('--kbd-color: #ff0000')
        expect(root.attributes('style')).toContain('--kbd-color-foreground: #09090b')
        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-kbd-root]',
      mount: (attrs) => mountKbd({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot predeterminado y sustituye el label alternativo', () => {
        const kbd = mountKbd({
          props: { label: 'Valor alternativo' },
          slots: {
            default: () => h('span', { 'data-test-kbd-slot': '' }, 'Ctrl+K'),
          },
        })

        expect(kbd.get('[data-test-kbd-slot]').text()).toBe('Ctrl+K')
        expect(kbd.get('[data-test-kbd-root]').text()).not.toContain('Valor alternativo')
      })
    })
  })
})
