import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import {
  Chip,
  chipDefaults,
  chipPositions,
  type ChipPosition,
  type ChipProps,
  type ChipSize,
} from '@/components/ui/Chip'
import { themeColors } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountChip(options: MountingOptions<ChipProps> = {}) {
  return mount(Chip, options)
}

const casesSize = [
  { input: '3xs', expected: ['h-1', 'min-w-1', 'text-[4px]'] },
  { input: '2xs', expected: ['h-1.5', 'min-w-1.5', 'text-[5px]'] },
  { input: 'xs', expected: ['h-1.5', 'min-w-1.5', 'text-[6px]'] },
  { input: 'sm', expected: ['h-2', 'min-w-2', 'text-[7px]'] },
  { input: 'md', expected: ['h-2', 'min-w-2', 'text-[8px]'] },
  { input: 'lg', expected: ['h-2.5', 'min-w-2.5', 'text-[9px]'] },
  { input: 'xl', expected: ['h-2.5', 'min-w-2.5', 'text-[10px]'] },
  { input: '2xl', expected: ['h-3', 'min-w-3', 'text-[11px]'] },
  { input: '3xl', expected: ['h-3', 'min-w-3', 'text-xs'] },
  { input: undefined, expected: ['h-3', 'min-w-3', 'text-xs'] },
] satisfies { input: ChipSize | undefined; expected: string[] }[]

const positionClasses = {
  'top-right': ['top-0', 'right-0', '-translate-y-1/2', 'translate-x-1/2'],
  'bottom-right': ['bottom-0', 'right-0', 'translate-y-1/2', 'translate-x-1/2'],
  'top-left': ['top-0', 'left-0', '-translate-y-1/2', '-translate-x-1/2'],
  'bottom-left': ['bottom-0', 'left-0', 'translate-y-1/2', '-translate-x-1/2'],
} satisfies Record<ChipPosition, string[]>

const casesPosition = chipPositions.map((input) => ({ input, expected: positionClasses[input] }))

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

    describe('color', () => {
      testColor({
        text: 'resuelve el color de Chip',
        id: '[data-test-chip-root]',
        varColor: '--chip-color',
        defaultColor: 'var(--primary, var(--primary))',
        fallbackColor: chipDefaults.color,
        theme: {
          colors: themeColors,
          foregroundVar: '--chip-color-foreground',
          solidVar: '--chip-solid',
          solidForegroundVar: '--chip-solid-foreground',
        },
        mount: (color) => mountChip({ props: { color } }),
      })
    })

    describe('position', () => {
      it.each(casesPosition)('renderiza position=$input', ({ input, expected }) => {
        const root = mountChip({ props: { position: input } }).get('[data-test-chip-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })

      it.each(casesPosition)(
        'aplica position=$input al indicador con slot',
        ({ input, expected }) => {
          const chip = mountChip({ props: { position: input }, slots: { default: 'Avatar' } })
          const root = chip.get('[data-test-chip-root]')
          const base = chip.get('[data-test-chip-base]')

          expect(root.classes()).not.toEqual(expect.arrayContaining(expected))
          expect(base.classes()).toEqual(expect.arrayContaining(expected))
        },
      )

      it('usa la posición predeterminada exportada', () => {
        const root = mountChip().get('[data-test-chip-root]')

        expect(chipDefaults.position).toBe('top-right')
        expect(root.classes()).toEqual(
          expect.arrayContaining(['top-0', 'right-0', '-translate-y-1/2', 'translate-x-1/2']),
        )
      })
    })

    describe('inset', () => {
      it.each(casesInset)('renderiza inset=$input', ({ input, expectedTransform }) => {
        const root = mountChip({ props: { inset: input } }).get('[data-test-chip-root]')

        expect(root.classes().includes('-translate-y-1/2')).toBe(expectedTransform)
      })

      it.each(casesInset)(
        'aplica inset=$input al indicador con slot',
        ({ input, expectedTransform }) => {
          const chip = mountChip({ props: { inset: input }, slots: { default: 'Avatar' } })
          const base = chip.get('[data-test-chip-base]')

          expect(base.classes().includes('-translate-y-1/2')).toBe(expectedTransform)
        },
      )
    })

    describe('standalone', () => {
      it.each([
        { input: false, expectedAbsolute: true },
        { input: true, expectedAbsolute: false },
        { input: undefined, expectedAbsolute: true },
      ])('renderiza standalone=$input sin slot', ({ input, expectedAbsolute }) => {
        const root = mountChip({ props: { standalone: input } }).get('[data-test-chip-root]')

        expect(root.classes().includes('absolute')).toBe(expectedAbsolute)
      })

      it.each([
        { input: false, expectedAbsolute: true },
        { input: true, expectedAbsolute: false },
        { input: undefined, expectedAbsolute: true },
      ])('renderiza standalone=$input con slot', ({ input, expectedAbsolute }) => {
        const chip = mountChip({ props: { standalone: input }, slots: { default: 'Avatar' } })
        const root = chip.get('[data-test-chip-root]')
        const base = chip.get('[data-test-chip-base]')

        expect(root.classes()).not.toContain('absolute')
        expect(base.classes().includes('absolute')).toBe(expectedAbsolute)
      })
    })

    describe('show', () => {
      it.each([
        { input: undefined, expectedVisible: true },
        { input: true, expectedVisible: true },
        { input: false, expectedVisible: false },
      ])('renderiza show=$input', ({ input, expectedVisible }) => {
        const chip = mountChip({ props: { show: input } })

        expect(chip.find('[data-test-chip-base]').exists()).toBe(expectedVisible)
      })

      it('actualiza la visibilidad al cambiar el valor controlado', async () => {
        const chip = mountChip({ props: { show: false } })

        expect(chip.find('[data-test-chip-base]').exists()).toBe(false)

        await chip.setProps({ show: true })
        expect(chip.find('[data-test-chip-base]').exists()).toBe(true)

        await chip.setProps({ show: false })
        expect(chip.find('[data-test-chip-base]').exists()).toBe(false)
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

  describe('emits', () => {
    describe('update:show', () => {
      it('no emite al recibir una actualización externa del valor controlado', async () => {
        const chip = mountChip({ props: { show: true } })

        await chip.setProps({ show: false })

        expect(chip.emitted('update:show')).toBeUndefined()
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('mantiene el indicador en la raíz cuando el slot no se proporciona', () => {
        const chip = mountChip()
        const root = chip.get('[data-test-chip-root]')
        const base = chip.get('[data-test-chip-base]')

        expect(root.classes()).toEqual(
          expect.arrayContaining(['absolute', 'top-0', 'right-0', '-translate-y-1/2']),
        )
        expect(base.classes()).not.toContain('absolute')
      })

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
