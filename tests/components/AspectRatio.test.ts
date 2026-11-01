import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { AspectRatio, type AspectRatioProps } from '@/components/AspectRatio'
import { testAttrs } from '../utils/testAttrs'

function mountAspectRatio(options: MountingOptions<AspectRatioProps> = {}) {
  return mount(AspectRatio, options)
}

const casesRatio = [
  { input: undefined, expected: '100%' },
  { input: 16 / 9, expected: '56.25%' },
  { input: 4 / 3, expected: '75%' },
]

describe('AspectRatio', () => {
  describe('props', () => {
    describe('ratio', () => {
      it.each(casesRatio)(
        'renderiza ratio=$input con padding-bottom: $expected',
        ({ input, expected }) => {
          const wrapper = mountAspectRatio({ props: { ratio: input } }).get(
            '[data-reka-aspect-ratio-wrapper]',
          )

          expect(wrapper.attributes('style')).toContain(`padding-bottom: ${expected}`)
        },
      )
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-aspect-ratio-root]',
      mount: (attrs) => mountAspectRatio({ attrs }),
    })
  })

  describe('slots', () => {
    it('renderiza el slot predeterminado', () => {
      const aspectRatio = mountAspectRatio({
        slots: {
          default: () => h('span', { 'data-test-aspect-ratio-content': '' }, 'Contenido'),
        },
      })

      expect(aspectRatio.get('[data-test-aspect-ratio-content]').text()).toBe('Contenido')
    })
  })
})
