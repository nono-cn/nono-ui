import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Icon, iconDefaults, type IconProps } from '@/components/Icon'
import { testAttrs } from '../utils/testAttrs'
import { testClassMerge } from '../utils/testClassMerge'
import { testColor } from '../utils/testColor'

function mountIcon(options: MountingOptions<IconProps> = {}) {
  return mount(Icon, { props: { name: 'check' }, ...options })
}

describe('Icon', () => {
  describe('props', () => {
    describe('name', () => {
      it('pinta el icono indicado en name', () => {
        const icon = mountIcon({ props: { name: 'check' } })

        expect(icon.get('[data-test-icon-root]').classes()).toContain('lucide-check')
      })
    })

    describe('size', () => {
      it('por defecto tiene la class size-5', () => {
        const icon = mountIcon({ props: { name: 'check' } })

        expect(icon.get('[data-test-icon-root]').classes()).toContain('size-5')
      })

      const sizes = [
        { size: 'xs', expected: 'size-3' },
        { size: 'sm', expected: 'size-4' },
        { size: 'md', expected: 'size-5' },
        { size: 'lg', expected: 'size-6' },
        { size: 'xl', expected: 'size-7' },
      ] as const

      it.each(sizes)('con size=$size tiene la class $expected', ({ size, expected }) => {
        const icon = mountIcon({ props: { name: 'check', size } })

        expect(icon.get('[data-test-icon-root]').classes()).toContain(expected)
      })
    })

    describe('color', () => {
      testColor({
        id: '[data-test-icon-root]',
        variable: '--icon-color',
        fallbackColor: 'primary',
        mount: (color) => mountIcon({ props: { name: 'check', color } }),
      })

      it('por defecto hereda el color del texto', () => {
        const icon = mountIcon({ props: { name: 'check' } })

        expect(icon.get('[data-test-icon-root]').attributes('style')).toContain(
          'color: currentcolor',
        )
      })

      it('por defecto no define la variable --icon-color', () => {
        const icon = mountIcon({ props: { name: 'check' } })

        expect(icon.get('[data-test-icon-root]').attributes('style')).not.toContain('--icon-color')
      })

      it('con color=currentColor hereda el color del texto', () => {
        const icon = mountIcon({ props: { name: 'check', color: 'currentColor' } })

        expect(icon.get('[data-test-icon-root]').attributes('style')).toContain(
          'color: currentcolor',
        )
      })

      it('con un color distinto de currentColor pinta con var(--icon-color)', () => {
        const icon = mountIcon({ props: { name: 'check', color: 'error' } })

        expect(icon.get('[data-test-icon-root]').attributes('style')).toContain(
          'color: var(--icon-color)',
        )
      })
    })

    describe('stroke', () => {
      it('por defecto usa iconDefaults.stroke como stroke-width', () => {
        const icon = mountIcon({ props: { name: 'check' } })

        expect(icon.get('[data-test-icon-root]').attributes('stroke-width')).toBe(
          String(iconDefaults.stroke),
        )
      })

      it('con stroke=3 usa 3 como stroke-width', () => {
        const icon = mountIcon({ props: { name: 'check', stroke: 3 } })

        expect(icon.get('[data-test-icon-root]').attributes('stroke-width')).toBe('3')
      })

      it('con stroke=1.5 acepta decimales', () => {
        const icon = mountIcon({ props: { name: 'check', stroke: 1.5 } })

        expect(icon.get('[data-test-icon-root]').attributes('stroke-width')).toBe('1.5')
      })
    })
  })

  describe('nodos', () => {
    describe('root', () => {
      it('tiene aria-hidden=true', () => {
        const icon = mountIcon()

        expect(icon.get('[data-test-icon-root]').attributes('aria-hidden')).toBe('true')
      })

      it('tiene la class shrink-0', () => {
        const icon = mountIcon()

        expect(icon.get('[data-test-icon-root]').classes()).toContain('shrink-0')
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los attrs arbitrarios, class y style a la raíz',
      id: '[data-test-icon-root]',
      mount: (attrs) => mountIcon({ attrs }),
    })

    testClassMerge({
      id: '[data-test-icon-root]',
      ownClass: 'size-5',
      conflictingClass: 'size-8',
      mount: (attrs) => mountIcon({ attrs }),
    })

    it('con aria-hidden en attrs lo sobrescribe', () => {
      const icon = mountIcon({ attrs: { 'aria-hidden': 'false' } })

      expect(icon.get('[data-test-icon-root]').attributes('aria-hidden')).toBe('false')
    })
  })
})
