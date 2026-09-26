import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Chip, type ChipProps, type ChipSeverity } from '@/components/ui/Chip'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountChip(options: MountingOptions<ChipProps> = {}) {
  return mount(Chip, options)
}

const casesSize = [
  { input: '3xs' as const, expected: ['h-1', 'min-w-1', 'text-[4px]'] },
  { input: '2xs' as const, expected: ['h-1.5', 'min-w-1.5', 'text-[5px]'] },
  { input: 'xs' as const, expected: ['h-1.5', 'min-w-1.5', 'text-[6px]'] },
  { input: 'sm' as const, expected: ['h-2', 'min-w-2', 'text-[7px]'] },
  { input: 'md' as const, expected: ['h-2', 'min-w-2', 'text-[8px]'] },
  { input: 'lg' as const, expected: ['h-2.5', 'min-w-2.5', 'text-[9px]'] },
  { input: 'xl' as const, expected: ['h-2.5', 'min-w-2.5', 'text-[10px]'] },
  { input: '2xl' as const, expected: ['h-3', 'min-w-3', 'text-[11px]'] },
  { input: '3xl' as const, expected: ['h-3', 'min-w-3', 'text-xs'] },
]

const casesSeverity = [
  { input: 'primary', expected: ['bg-primary', 'text-primary-foreground'] },
  { input: 'neutral', expected: ['bg-foreground', 'text-background'] },
  { input: 'secondary', expected: ['bg-secondary', 'text-secondary-foreground'] },
  { input: 'warning', expected: ['bg-warning', 'text-warning-foreground'] },
  { input: 'success', expected: ['bg-success', 'text-success-foreground'] },
  { input: 'error', expected: ['bg-error', 'text-error-foreground'] },
  { input: undefined, expected: ['bg-primary', 'text-primary-foreground'] },
] satisfies Array<{ input: ChipSeverity | undefined; expected: string[] }>

const casesPosition = [
  {
    input: 'top-right' as const,
    expected: ['top-0', 'right-0', '-translate-y-1/2', 'translate-x-1/2'],
  },
  {
    input: 'bottom-right' as const,
    expected: ['bottom-0', 'right-0', 'translate-y-1/2', 'translate-x-1/2'],
  },
  {
    input: 'top-left' as const,
    expected: ['top-0', 'left-0', '-translate-y-1/2', '-translate-x-1/2'],
  },
  {
    input: 'bottom-left' as const,
    expected: ['bottom-0', 'left-0', 'translate-y-1/2', '-translate-x-1/2'],
  },
]

const casesInset = [
  { input: true, expectedTransform: false },
  { input: false, expectedTransform: true },
  { input: undefined, expectedTransform: true },
]

describe('Chip', () => {
  describe('props', () => {
    describe('size', () => {
      it.each(casesSize)('renderiza size=$input', ({ input, expected }) => {
        const base = mountChip({ props: { size: input } }).get('[data-test-chip-base]')

        expect(base.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('severity', () => {
      it.each(casesSeverity)('renderiza severity=$input', ({ input, expected }) => {
        const base = mountChip({ props: { severity: input } }).get('[data-test-chip-base]')

        expect(base.classes()).toEqual(expect.arrayContaining(expected))
      })

      it('da prioridad al color personalizado sobre severity', () => {
        const base = mountChip({ props: { color: '#8b5cf6', severity: 'error' } }).get(
          '[data-test-chip-base]',
        )

        expect(base.classes()).toEqual(
          expect.arrayContaining(['bg-(--chip-color)', 'text-(--chip-color-foreground)']),
        )
        expect(base.classes()).not.toEqual(
          expect.arrayContaining(['bg-error', 'text-error-foreground']),
        )
      })
    })

    describe('position', () => {
      it.each(casesPosition)('renderiza position=$input', ({ input, expected }) => {
        const root = mountChip({ props: { position: input } }).get('[data-test-chip-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('inset', () => {
      it.each(casesInset)('renderiza inset=$input', ({ input, expectedTransform }) => {
        const root = mountChip({ props: { inset: input } }).get('[data-test-chip-root]')

        expect(root.classes().includes('-translate-y-1/2')).toBe(expectedTransform)
      })
    })

    describe('standalone', () => {
      it('no posiciona el chip de forma absoluta cuando está activado', () => {
        const root = mountChip({ props: { standalone: true } }).get('[data-test-chip-root]')

        expect(root.classes()).not.toContain('absolute')
      })
    })

    describe('color', () => {
      testColor({
        text: 'pasa color a Chip',
        id: '[data-test-chip-root]',
        varColor: '--chip-color',
        mount: (color) => mountChip({ props: { color } }),
      })
    })

    describe('show', () => {
      it('muestra el chip por defecto y admite v-model:show', async () => {
        const chip = mountChip({ props: { show: false } })

        expect(chip.find('[data-test-chip-base]').exists()).toBe(false)

        await chip.setProps({ show: true })

        expect(chip.find('[data-test-chip-base]').exists()).toBe(true)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-chip-root]',
      mount: (attrs) => mountChip({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot predeterminado dentro de la raíz', () => {
        const chip = mountChip({
          slots: {
            default: () => h('button', { 'data-test-chip-content': '' }, 'Bandeja de entrada'),
          },
        })

        expect(chip.get('[data-test-chip-content]').text()).toBe('Bandeja de entrada')
      })

      it('usa el slot predeterminado como contexto de posición del chip', () => {
        const chip = mountChip({
          slots: { default: () => h('div', { 'data-test-chip-content': '' }, 'Avatar') },
        })

        const root = chip.get('[data-test-chip-root]')
        const base = chip.get('[data-test-chip-base]')

        expect(root.classes()).not.toContain('absolute')
        expect(base.classes()).toEqual(
          expect.arrayContaining(['absolute', 'top-0', 'right-0', '-translate-y-1/2']),
        )
      })
    })
  })
})
