import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ColorAreaRoot, type Color } from 'reka-ui'

import { ColorArea, type ColorAreaProps, type ColorAreaValue } from '@/components/ui/ColorArea'

const casesValue: Array<{ input: ColorAreaValue | undefined; expected: ColorAreaValue }> = [
  { input: '#56d799', expected: '#56d799' },
  {
    input: { space: 'rgb', r: 86, g: 215, b: 153, alpha: 1 } satisfies Color,
    expected: { space: 'rgb', r: 86, g: 215, b: 153, alpha: 1 },
  },
  {
    input: { space: 'hsl', h: 150, s: 60, l: 59, alpha: 1 } satisfies Color,
    expected: { space: 'hsl', h: 150, s: 60, l: 59, alpha: 1 },
  },
  {
    input: { space: 'hsb', h: 150, s: 60, b: 84, alpha: 1 } satisfies Color,
    expected: { space: 'hsb', h: 150, s: 60, b: 84, alpha: 1 },
  },
  { input: undefined, expected: '#ff0000' },
]

const casesColorSpace = [
  { input: 'hsl' as const, expected: 'hsl' },
  { input: 'hsb' as const, expected: 'hsb' },
  { input: 'rgb' as const, expected: 'rgb' },
  { input: undefined, expected: 'hsl' },
]

function mountColorArea(options: MountingOptions<ColorAreaProps> = {}) {
  return mount(ColorArea, options)
}

describe('ColorArea', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)(
        'pasa value=$input a ColorAreaRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountColorArea({ props: { value: input } })

          expect(wrapper.getComponent(ColorAreaRoot).props('modelValue')).toEqual(expected)
        },
      )
    })

    describe('colorSpace', () => {
      it.each(casesColorSpace)(
        'pasa colorSpace=$input a ColorAreaRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountColorArea({ props: { colorSpace: input } })

          expect(wrapper.getComponent(ColorAreaRoot).props('colorSpace')).toBe(expected)
        },
      )
    })
  })
})
