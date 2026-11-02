import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Kbd, KbdGroup, type KbdGroupProps } from '@/components/Kbd'
import { testAttrs } from '../utils/testAttrs'

function mountKbdGroup(options: MountingOptions<KbdGroupProps> = {}) {
  return mount(KbdGroup, options)
}

describe('KbdGroup', () => {
  describe('slots', () => {
    describe('default', () => {
      it('pinta las teclas que recibe', () => {
        const group = mountKbdGroup({
          slots: { default: () => [h(Kbd, { label: 'Ctrl' }), h(Kbd, { label: 'K' })] },
        })

        expect(group.findAll('[data-test-kbd-root]').map((kbd) => kbd.text())).toEqual([
          'Ctrl',
          'K',
        ])
      })
    })
  })

  describe('nodos', () => {
    describe('root', () => {
      const casesRoot = [
        {
          text: 'coloca las teclas en fila, centradas y separadas con gap-1',
          input: {},
          expected: {
            class: ['inline-flex', 'items-center', 'gap-1'],
          },
        },
      ] as const

      it.each(casesRoot)('$text', ({ input, expected }) => {
        const root = mountKbdGroup({ props: input }).get('[data-test-kbd-group-root]')

        expect({ class: root.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })

      testAttrs({
        id: '[data-test-kbd-group-root]',
        ownClass: 'gap-1',
        conflictingClass: 'gap-3',
        mount: (attrs) => mountKbdGroup({ attrs }),
      })
    })
  })
})
