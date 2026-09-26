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

const casesVariant = [
  {
    input: 'solid' as const,
    expected: ['border-transparent', 'bg-(--kbd-solid)', 'text-(--kbd-solid-foreground)'],
  },
  {
    input: 'outline' as const,
    expected: ['border-(--kbd-color)/40', 'bg-transparent', 'text-(--kbd-color)'],
  },
  {
    input: 'soft' as const,
    expected: ['border-transparent', 'bg-(--kbd-color)/10', 'text-(--kbd-color)'],
  },
  {
    input: 'subtle' as const,
    expected: ['border-(--kbd-color)/20', 'bg-(--kbd-color)/10', 'text-(--kbd-color)'],
  },
]

const casesSeverity = [
  {
    input: 'primary' as const,
    expected: [
      '[--kbd-color:var(--primary)]',
      '[--kbd-solid:var(--primary)]',
      '[--kbd-solid-foreground:var(--primary-foreground)]',
    ],
  },
  {
    input: 'neutral' as const,
    expected: [
      '[--kbd-color:var(--foreground)]',
      '[--kbd-solid:var(--foreground)]',
      '[--kbd-solid-foreground:var(--background)]',
    ],
  },
  {
    input: 'secondary' as const,
    expected: [
      '[--kbd-color:var(--secondary-foreground)]',
      '[--kbd-solid:var(--secondary)]',
      '[--kbd-solid-foreground:var(--secondary-foreground)]',
    ],
  },
  {
    input: 'warning' as const,
    expected: [
      '[--kbd-color:var(--warning)]',
      '[--kbd-solid:var(--warning)]',
      '[--kbd-solid-foreground:var(--warning-foreground)]',
    ],
  },
  {
    input: 'success' as const,
    expected: [
      '[--kbd-color:var(--success)]',
      '[--kbd-solid:var(--success)]',
      '[--kbd-solid-foreground:var(--success-foreground)]',
    ],
  },
  {
    input: 'error' as const,
    expected: [
      '[--kbd-color:var(--error)]',
      '[--kbd-solid:var(--error)]',
      '[--kbd-solid-foreground:var(--error-foreground)]',
    ],
  },
] satisfies { input: KbdSeverity | undefined; expected: string[] }[]

const casesSeverityVariant = casesSeverity.flatMap(
  ({ input: severity, expected: severityClasses }) =>
    casesVariant.map(({ input: variant, expected: variantClasses }) => ({
      severity,
      variant,
      expected: [...severityClasses, ...variantClasses],
    })),
)

const casesColorVariant = casesVariant.map(({ input: variant, expected: variantClasses }) => ({
  variant,
  expected: [
    ...variantClasses,
    ...(variant === 'solid'
      ? ['[--kbd-solid:var(--kbd-color)]', '[--kbd-solid-foreground:var(--kbd-color-foreground)]']
      : []),
  ],
}))

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

      it('usa subtle y severity neutral por defecto', () => {
        const root = mountKbd().get('[data-test-kbd-root]')

        expect(root.classes()).toEqual(
          expect.arrayContaining([
            'border-(--kbd-color)/20',
            'bg-(--kbd-color)/10',
            'text-(--kbd-color)',
            '[--kbd-color:var(--foreground)]',
            '[--kbd-solid:var(--foreground)]',
            '[--kbd-solid-foreground:var(--background)]',
          ]),
        )
      })
    })

    describe('color', () => {
      it.each(casesColorVariant)(
        'prioriza color personalizado sobre severity=success con variant=$variant',
        ({ variant, expected }) => {
          const root = mountKbd({
            props: { color: '#ff0000', severity: 'success', variant },
          }).get('[data-test-kbd-root]')

          expect(root.classes()).toEqual(expect.arrayContaining(expected))
          expect(root.classes()).toContain('[--kbd-color:var(--success)]')
          expect(root.attributes('style')).toContain('--kbd-color: #ff0000')
          expect(root.attributes('style')).toContain('--kbd-color-foreground: #09090b')
        },
      )
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
