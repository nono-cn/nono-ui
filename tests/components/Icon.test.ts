import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Icon, iconDefaults, type IconProps } from '@/components/Icon'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountIcon(options: MountingOptions<IconProps> = {}) {
  return mount(Icon, { props: { name: 'check' }, ...options })
}

describe('Icon', () => {
  describe('props', () => {
    describe('name', () => {
      const casesName = [
        {
          text: 'con name=check pinta el icono check de Lucide',
          input: { name: 'check' },
          expected: {
            root: { class: ['lucide-check'] },
          },
        },
        {
          text: 'con name=x pinta el icono x de Lucide',
          input: { name: 'x' },
          expected: {
            root: { class: ['lucide-x'] },
          },
        },
      ] as const

      it.each(casesName)('$text', ({ input, expected }) => {
        const root = mountIcon({ props: input }).get('[data-test-icon-root]')

        expect({
          root: { class: root.classes() },
        }).toEqual({
          root: { class: expect.arrayContaining(expected.root.class) },
        })
      })
    })

    describe('size', () => {
      it('por defecto usa iconDefaults.size', () => {
        const icon = mountIcon()
        const withDefault = mountIcon({ props: { name: 'check', size: iconDefaults.size } })

        expect(icon.get('[data-test-icon-root]').classes()).toEqual(
          withDefault.get('[data-test-icon-root]').classes(),
        )
      })

      const casesSize = [
        {
          text: 'con size=xs mide size-3',
          input: { name: 'check', size: 'xs' },
          expected: {
            root: { class: ['size-3'] },
          },
        },
        {
          text: 'con size=sm mide size-4',
          input: { name: 'check', size: 'sm' },
          expected: {
            root: { class: ['size-4'] },
          },
        },
        {
          text: 'con size=md mide size-5',
          input: { name: 'check', size: 'md' },
          expected: {
            root: { class: ['size-5'] },
          },
        },
        {
          text: 'con size=lg mide size-6',
          input: { name: 'check', size: 'lg' },
          expected: {
            root: { class: ['size-6'] },
          },
        },
        {
          text: 'con size=xl mide size-7',
          input: { name: 'check', size: 'xl' },
          expected: {
            root: { class: ['size-7'] },
          },
        },
      ] as const

      it.each(casesSize)('$text', ({ input, expected }) => {
        const root = mountIcon({ props: input }).get('[data-test-icon-root]')

        expect({
          root: { class: root.classes() },
        }).toEqual({
          root: { class: expect.arrayContaining(expected.root.class) },
        })
      })
    })

    describe('color', () => {
      testColor({
        id: '[data-test-icon-root]',
        variable: '--icon-color',
        fallbackColor: 'primary',
        mount: (color) => mountIcon({ props: { name: 'check', color } }),
      })

      const casesColor = [
        {
          text: 'por defecto hereda el color del texto y no define --icon-color',
          input: { name: 'check' },
          expected: {
            root: { style: { color: 'currentcolor', '--icon-color': '' } },
          },
        },
        {
          text: 'con un color distinto de currentColor pinta con var(--icon-color)',
          input: { name: 'check', color: 'error' },
          expected: {
            root: {
              style: { color: 'var(--icon-color)', '--icon-color': 'var(--error, var(--primary))' },
            },
          },
        },
      ] as const

      it.each(casesColor)('$text', ({ input, expected }) => {
        const root = mountIcon({ props: input }).get('[data-test-icon-root]')
        const style = (root.element as SVGElement).style

        expect({
          root: {
            style: {
              color: style.getPropertyValue('color'),
              '--icon-color': style.getPropertyValue('--icon-color'),
            },
          },
        }).toEqual(expected)
      })
    })

    describe('stroke', () => {
      const casesStroke = [
        {
          text: 'por defecto usa iconDefaults.stroke como stroke-width',
          input: { name: 'check' },
          expected: {
            root: { attrs: { 'stroke-width': String(iconDefaults.stroke) } },
          },
        },
        {
          text: 'con stroke=3 usa 3 como stroke-width',
          input: { name: 'check', stroke: 3 },
          expected: {
            root: { attrs: { 'stroke-width': '3' } },
          },
        },
        {
          text: 'con stroke=1.5 acepta decimales',
          input: { name: 'check', stroke: 1.5 },
          expected: {
            root: { attrs: { 'stroke-width': '1.5' } },
          },
        },
      ] as const

      it.each(casesStroke)('$text', ({ input, expected }) => {
        const root = mountIcon({ props: input }).get('[data-test-icon-root]')

        expect({
          root: { attrs: { 'stroke-width': root.attributes('stroke-width') } },
        }).toEqual(expected)
      })
    })
  })

  describe('nodos', () => {
    describe('root', () => {
      const casesRoot = [
        {
          text: 'no se encoge dentro de un contenedor flex',
          input: {},
          expected: {
            class: ['shrink-0'],
            attrs: {},
          },
        },
        {
          text: 'se oculta a los lectores de pantalla porque es decorativo',
          input: {},
          expected: {
            class: [],
            attrs: { 'aria-hidden': 'true' },
          },
        },
      ] as const

      it.each(casesRoot)('$text', ({ input, expected }) => {
        const root = mountIcon({ props: { name: 'check', ...input } }).get('[data-test-icon-root]')

        expect({ class: root.classes(), attrs: root.attributes() }).toEqual({
          class: expect.arrayContaining(expected.class),
          attrs: expect.objectContaining(expected.attrs),
        })
      })

      testAttrs({
        id: '[data-test-icon-root]',
        ownClass: 'size-5',
        conflictingClass: 'size-8',
        // width, height y stroke los impone Lucide
        notOverridable: ['stroke-width', 'width', 'height', 'stroke'],
        mount: (attrs) => mountIcon({ attrs }),
      })
    })
  })
})
