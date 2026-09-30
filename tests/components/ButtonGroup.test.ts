import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, inject } from 'vue'

import { ButtonGroup, buttonGroupSizeKey, type ButtonGroupProps } from '@/components/ui/ButtonGroup'
import { testAttrs } from '../utils/testAttrs'

function mountButtonGroup(options: MountingOptions<ButtonGroupProps> = {}) {
  return mount(ButtonGroup, options)
}

const casesOrientation = [
  { input: 'horizontal' as const, expected: ['flex-row', 'rounded-l-none', 'border-l-0'] },
  { input: 'vertical' as const, expected: ['flex-col', 'rounded-t-none', 'border-t-0'] },
  { input: undefined, expected: ['flex-row', 'rounded-l-none', 'border-l-0'] },
]

const SizeConsumer = defineComponent({
  setup() {
    const size = inject(buttonGroupSizeKey)
    return () => h('span', { 'data-test-button-group-size': '' }, size?.value ?? 'missing')
  },
})

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

  describe('provides', () => {
    describe('buttonGroupSizeKey', () => {
      it('proporciona props.size', () => {
        const group = mountButtonGroup({
          props: { size: 'lg' },
          slots: { default: () => h(SizeConsumer) },
        })

        expect(group.get('[data-test-button-group-size]').text()).toBe('lg')
      })

      it('proporciona md por defecto', () => {
        const group = mountButtonGroup({ slots: { default: () => h(SizeConsumer) } })

        expect(group.get('[data-test-button-group-size]').text()).toBe('md')
      })

      it('actualiza el tamaño proporcionado cuando cambia la prop', async () => {
        const group = mountButtonGroup({
          props: { size: 'xs' },
          slots: { default: () => h(SizeConsumer) },
        })

        await group.setProps({ size: 'xl' })

        expect(group.get('[data-test-button-group-size]').text()).toBe('xl')
      })
    })
  })
})
