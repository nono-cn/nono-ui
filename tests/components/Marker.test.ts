import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Icon } from '@/components/ui/Icon'
import { Marker, type MarkerProps } from '@/components/ui/Marker'
import { testAttrs } from '../utils/testAttrs'
import { testIconConfig } from '../utils/testIconConfig'

function mountMarker(options: MountingOptions<MarkerProps> = {}) {
  return mount(Marker, options)
}

describe('Marker', () => {
  describe('props', () => {
    describe('label', () => {
      it('renderiza la etiqueta cuando no hay slot default', () => {
        expect(mountMarker({ props: { label: 'Procesando' } }).text()).toBe('Procesando')
      })
    })

    describe('status', () => {
      it.each([
        [false, undefined],
        [true, 'status'],
      ] as const)('usa role=%s', (status, role) => {
        expect(mountMarker({ props: { status } }).attributes('role')).toBe(role)
      })
    })

    describe('icon', () => {
      testIconConfig({
        text: 'pasa la configuración del icono',
        id: Icon,
        mount: (icon) => mountMarker({ props: { icon } }),
      })
    })

    describe('variant', () => {
      it.each([
        ['default', false],
        ['border', true],
        ['separator', true],
      ] as const)('renderiza variant=%s', (variant, hasVariantClass) => {
        const root = mountMarker({ props: { variant } }).get('[data-test-marker-root]')
        expect(
          root.classes().includes('border-b') || root.classes().includes('before:flex-1'),
        ).toBe(hasVariantClass)
      })
    })

    describe('shimmer', () => {
      it.each([
        [false, false],
        [true, true],
      ] as const)('aplica el brillo=%s', (shimmer, hasClass) => {
        const classes = mountMarker({ props: { shimmer } }).classes()
        expect(classes.includes('animate-pulse')).toBe(hasClass)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa attrs a la raíz',
      id: '[data-test-marker-root]',
      mount: (attrs) => mountMarker({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el contenido del slot', () => {
        expect(mountMarker({ slots: { default: 'Contenido' } }).text()).toBe('Contenido')
      })
    })

    describe('icon', () => {
      it('permite personalizar el icono', () => {
        const wrapper = mountMarker({
          slots: { icon: () => h('span', { 'data-test-custom-icon': '' }) },
        })
        expect(wrapper.get('[data-test-custom-icon]').exists()).toBe(true)
        expect(wrapper.find('[data-test-marker-icon]').exists()).toBe(false)
      })
    })
  })
})
