import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Kbd, kbdDefaults, type KbdProps, type KbdSize, type KbdVariant } from '@/components/ui/Kbd'
import { themeColors } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'
import { testRadius } from '../utils/testRadius'

function mountKbd(options: MountingOptions<KbdProps> = {}) {
  return mount(Kbd, options)
}

const casesLabel = [
  { input: 'Ctrl', expected: 'Ctrl' },
  { input: 'Ctrl + K', expected: 'Ctrl + K' },
  { input: '<Ctrl & K>', expected: '<Ctrl & K>' },
  { input: '', expected: '' },
  { input: undefined, expected: '' },
] satisfies { input: KbdProps['label']; expected: string }[]

const casesSize = [
  { input: 'sm', expected: ['h-4', 'min-w-4', 'text-[10px]'] },
  { input: 'md', expected: ['h-5', 'min-w-5', 'text-[11px]'] },
  { input: 'lg', expected: ['h-6', 'min-w-6', 'text-xs'] },
  { input: undefined, expected: ['h-5', 'min-w-5', 'text-[11px]'] },
] satisfies { input: KbdSize | undefined; expected: string[] }[]

const casesVariant = [
  {
    input: 'solid',
    expected: ['border-transparent', 'bg-(--kbd-solid)', 'text-(--kbd-solid-foreground)'],
  },
  {
    input: 'outline',
    expected: ['border-(--kbd-color)/40', 'bg-transparent', 'text-(--kbd-color)'],
  },
  {
    input: 'soft',
    expected: ['border-transparent', 'bg-(--kbd-color)/10', 'text-(--kbd-color)'],
  },
  {
    input: 'subtle',
    expected: ['border-(--kbd-color)/20', 'bg-(--kbd-color)/10', 'text-(--kbd-color)'],
  },
  {
    input: undefined,
    expected: ['border-(--kbd-color)/20', 'bg-(--kbd-color)/10', 'text-(--kbd-color)'],
  },
] satisfies { input: KbdVariant | undefined; expected: string[] }[]

describe('Kbd', () => {
  describe('props', () => {
    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input como "$expected"', ({ input, expected }) => {
        const root = mountKbd({ props: { label: input } }).get('[data-test-kbd-root]')

        expect(root.text()).toBe(expected)
      })
    })

    describe('size', () => {
      it.each(casesSize)('renderiza size=$input como "$expected"', ({ input, expected }) => {
        const root = mountKbd({ props: { size: input } }).get('[data-test-kbd-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('variant', () => {
      it.each(casesVariant)('renderiza variant=$input como "$expected"', ({ input, expected }) => {
        const root = mountKbd({ props: { variant: input } }).get('[data-test-kbd-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color',
        id: '[data-test-kbd-root]',
        varColor: '--kbd-color',
        defaultColor: `var(--${kbdDefaults.color}, var(--${kbdDefaults.color}))`,
        fallbackColor: kbdDefaults.color,
        theme: {
          colors: themeColors,
          foregroundVar: '--kbd-color-foreground',
          solidVar: '--kbd-solid',
          solidForegroundVar: '--kbd-solid-foreground',
        },
        mount: (color) => mountKbd({ props: { color } }),
      })
    })

    describe('radius', () => {
      testRadius({
        id: '[data-test-kbd-root]',
        variable: '--kbd-radius',
        defaultValue: 'var(--radius-sm, 0.25rem)',
        mount: (radius) => mountKbd({ props: { radius } }),
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

  describe('variantsCss', () => {
    describe('kbdVariants', () => {
      it('mantiene las clases base de una tecla', () => {
        const root = mountKbd().get('[data-test-kbd-root]')

        expect(root.classes()).toEqual(
          expect.arrayContaining([
            'pointer-events-none',
            'inline-flex',
            'items-center',
            'justify-center',
            'rounded-(--kbd-radius)',
            'border',
            'uppercase',
            'select-none',
          ]),
        )
      })
    })
  })
})
