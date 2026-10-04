import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { KbdGroup, type KbdGroupProps } from '@/components/ui/Kbd'
import { testAttrs } from '../utils/testAttrs'

function mountKbdGroup(options: MountingOptions<KbdGroupProps> = {}) {
  return mount(KbdGroup, options)
}

describe('KbdGroup', () => {
  describe('variantsCss', () => {
    describe('kbdGroupVariants', () => {
      it('mantiene las clases base del grupo', () => {
        const root = mountKbdGroup().get('[data-test-kbd-group-root]')

        expect(root.element.tagName).toBe('KBD')
        expect(root.classes()).toEqual(
          expect.arrayContaining(['inline-flex', 'items-center', 'gap-1']),
        )
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-kbd-group-root]',
      mount: (attrs) => mountKbdGroup({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot predeterminado', () => {
        const group = mountKbdGroup({
          slots: {
            default: () => h('span', { 'data-test-kbd-group-slot': '' }, 'Atajo'),
          },
        })

        expect(group.get('[data-test-kbd-group-slot]').text()).toBe('Atajo')
      })
    })
  })
})
