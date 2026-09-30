import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Icon, type IconProps } from '@/components/ui/Icon'
import { themeColors } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountIcon(options: MountingOptions<IconProps> = {}) {
  return mount(Icon, { props: { name: 'check' }, ...options })
}

const casesName = [
  { input: 'check' as const, expected: 'lucide-check' },
  { input: 'chevronRight' as const, expected: 'lucide-chevron-right' },
  { input: 'error' as const, expected: 'lucide-circle-alert' },
]

const casesSize = [
  { input: 'xs' as const, expected: 'size-3' },
  { input: 'sm' as const, expected: 'size-4' },
  { input: 'md' as const, expected: 'size-5' },
  { input: 'lg' as const, expected: 'size-6' },
  { input: 'xl' as const, expected: 'size-7' },
  { input: undefined, expected: 'size-5' },
]

const casesInheritedColor = [
  { input: 'currentColor', expected: 'color: currentcolor' },
  { input: undefined, expected: 'color: currentcolor' },
]

const casesStroke = [
  { input: 1, expected: '1' },
  { input: 1.5, expected: '1.5' },
  { input: 3, expected: '3' },
  { input: undefined, expected: '2' },
]

describe('Icon', () => {
  describe('props', () => {
    describe('name', () => {
      it.each(casesName)('renderiza name=$input', ({ input, expected }) => {
        const root = mountIcon({ props: { name: input } }).get('[data-test-icon-root]')

        expect(root.classes()).toContain(expected)
      })
    })

    describe('size', () => {
      it.each(casesSize)('renderiza size=$input', ({ input, expected }) => {
        const root = mountIcon({ props: { name: 'check', size: input } }).get(
          '[data-test-icon-root]',
        )

        expect(root.classes()).toContain(expected)
      })
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color',
        id: '[data-test-icon-root]',
        varColor: '--icon-color',
        mount: (color) => mountIcon({ props: { name: 'check', color } }),
        theme: {
          colors: themeColors,
          foregroundVar: '--icon-color-foreground',
          solidVar: '--icon-solid',
          solidForegroundVar: '--icon-solid-foreground',
        },
      })

      it.each(casesInheritedColor)('renderiza color=$input', ({ input, expected }) => {
        const root = mountIcon({ props: { name: 'check', color: input } }).get(
          '[data-test-icon-root]',
        )

        expect(root.attributes('style')).toContain(expected)
      })
    })

    describe('stroke', () => {
      it.each(casesStroke)('aplica stroke=$input como $expected', ({ input, expected }) => {
        const root = mountIcon({ props: { name: 'check', stroke: input } }).get(
          '[data-test-icon-root]',
        )

        expect(root.attributes('stroke-width')).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos, la clase y el estilo a la raíz',
      id: '[data-test-icon-root]',
      mount: (attrs) => mountIcon({ attrs }),
    })
  })
})
