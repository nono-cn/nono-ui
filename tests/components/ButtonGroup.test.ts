import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { ButtonGroup, type ButtonGroupProps } from '@/components/ui/ButtonGroup'
import { testAttrs } from '../utils/testAttrs'

function mountButtonGroup(options: MountingOptions<ButtonGroupProps> = {}) {
  return mount(ButtonGroup, options)
}

const casesOrientation = [
  { input: 'horizontal' as const, expected: ['flex-row', 'rounded-l-none', 'border-l-0'] },
  { input: 'vertical' as const, expected: ['flex-col', 'rounded-t-none', 'border-t-0'] },
  { input: undefined, expected: ['flex-row', 'rounded-l-none', 'border-l-0'] },
]

const casesSize = [
  { input: 'xs' as const, expected: ['h-7', 'text-xs', 'size-3'] },
  { input: 'sm' as const, expected: ['h-8', 'text-sm', 'size-4'] },
  { input: 'md' as const, expected: ['h-9', 'text-base', 'size-5'] },
  { input: 'lg' as const, expected: ['h-10', 'text-lg', 'size-6'] },
  { input: 'xl' as const, expected: ['h-11', 'text-xl', 'size-7'] },
  { input: undefined, expected: ['h-9', 'text-base', 'size-5'] },
]

describe('ButtonGroup', () => {
  describe('props', () => {
    describe('orientation', () => {
      it.each(casesOrientation)('renderiza orientation=$input', ({ input, expected }) => {
        const root = mountButtonGroup({ props: { orientation: input } }).get(
          '[data-test-button-group-root]',
        )

        expect(root.classes().join(' ')).toEqual(expect.stringContaining(expected[0]))
        expect(root.classes().join(' ')).toEqual(expect.stringContaining(expected[1]))
        expect(root.classes().join(' ')).toEqual(expect.stringContaining(expected[2]))
      })
    })

    describe('size', () => {
      it.each(casesSize)('renderiza size=$input', ({ input, expected }) => {
        const classes = mountButtonGroup({ props: { size: input } })
          .get('[data-test-button-group-root]')
          .classes()
          .join(' ')

        expect(classes).toEqual(expect.stringContaining(expected[0]))
        expect(classes).toEqual(expect.stringContaining(expected[1]))
        expect(classes).toEqual(expect.stringContaining(expected[2]))
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-button-group-root]',
      mount: (attrs) => mountButtonGroup({ attrs }),
    })

    it('renderiza el rol group en la raíz', () => {
      expect(mountButtonGroup().get('[data-test-button-group-root]').attributes('role')).toBe(
        'group',
      )
    })
  })

  describe('slots', () => {
    it('renderiza el slot predeterminado', () => {
      const group = mountButtonGroup({
        slots: { default: () => h('button', { 'data-test-button-group-item': '' }, 'Acción') },
      })

      expect(group.get('[data-test-button-group-item]').text()).toBe('Acción')
    })
  })
})
