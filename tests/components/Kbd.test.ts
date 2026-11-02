import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Kbd, kbdDefaults, type KbdProps } from '@/components/Kbd'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'
import { testRadius } from '../utils/testRadius'

function mountKbd(options: MountingOptions<KbdProps> = {}) {
  return mount(Kbd, options)
}

describe('Kbd', () => {
  describe('props', () => {
    describe('label', () => {
      const casesLabel = [
        {
          text: 'pinta el label como texto de la tecla',
          input: { label: 'Ctrl' },
          expected: {
            root: { text: 'Ctrl' },
          },
        },
        {
          text: 'sin label la tecla no tiene texto',
          input: {},
          expected: {
            root: { text: '' },
          },
        },
      ] as const

      it.each(casesLabel)('$text', ({ input, expected }) => {
        const root = mountKbd({ props: input }).get('[data-test-kbd-root]')

        expect({
          root: { text: root.text() },
        }).toEqual({
          root: { text: expected.root.text },
        })
      })
    })

    describe('variant', () => {
      const casesVariant = [
        {
          text: 'con variant=solid rellena con --kbd-color y el texto con su foreground, sin borde visible',
          input: { variant: 'solid' },
          expected: {
            root: {
              class: ['border-transparent', 'bg-(--kbd-color)', 'text-(--kbd-color-foreground)'],
            },
          },
        },
        {
          text: 'con variant=outline no tiene fondo y tiene borde de --kbd-color al 40%',
          input: { variant: 'outline' },
          expected: {
            root: {
              class: ['bg-transparent', 'border-(--kbd-color)/40', 'text-(--kbd-color)'],
            },
          },
        },
        {
          text: 'con variant=soft tiene fondo de --kbd-color al 10% sin borde visible',
          input: { variant: 'soft' },
          expected: {
            root: {
              class: ['border-transparent', 'bg-(--kbd-color)/10', 'text-(--kbd-color)'],
            },
          },
        },
        {
          text: 'con variant=subtle tiene fondo de --kbd-color al 10% y borde al 20%',
          input: { variant: 'subtle' },
          expected: {
            root: {
              class: ['bg-(--kbd-color)/10', 'border-(--kbd-color)/20', 'text-(--kbd-color)'],
            },
          },
        },
      ] as const

      it.each(casesVariant)('$text', ({ input, expected }) => {
        const root = mountKbd({ props: input }).get('[data-test-kbd-root]')

        expect({
          root: { class: root.classes() },
        }).toEqual({
          root: { class: expect.arrayContaining(expected.root.class) },
        })
      })
    })

    describe('size', () => {
      const casesSize = [
        {
          text: 'con size=sm mide h-4, con ancho mínimo min-w-4 y texto de 10px',
          input: { size: 'sm' },
          expected: {
            root: { class: ['h-4', 'min-w-4', 'px-1', 'text-[10px]'] },
          },
        },
        {
          text: 'con size=md mide h-5, con ancho mínimo min-w-5 y texto de 11px',
          input: { size: 'md' },
          expected: {
            root: { class: ['h-5', 'min-w-5', 'px-1', 'text-[11px]'] },
          },
        },
        {
          text: 'con size=lg mide h-6, con ancho mínimo min-w-6 y texto xs',
          input: { size: 'lg' },
          expected: {
            root: { class: ['h-6', 'min-w-6', 'px-1', 'text-xs'] },
          },
        },
      ] as const

      it.each(casesSize)('$text', ({ input, expected }) => {
        const root = mountKbd({ props: input }).get('[data-test-kbd-root]')

        expect({
          root: { class: root.classes() },
        }).toEqual({
          root: { class: expect.arrayContaining(expected.root.class) },
        })
      })
    })

    describe('color', () => {
      testColor({
        id: '[data-test-kbd-root]',
        variable: '--kbd-color',
        fallbackColor: kbdDefaults.color,
        mount: (color) => mountKbd({ props: { color } }),
      })

      const casesColor = [
        {
          text: 'por defecto pinta con kbdDefaults.color',
          input: {},
          expected: {
            root: {
              style: [`--kbd-color: var(--${kbdDefaults.color}, var(--${kbdDefaults.color}))`],
            },
          },
        },
      ] as const

      it.each(casesColor)('$text', ({ input, expected }) => {
        const root = mountKbd({ props: input }).get('[data-test-kbd-root]')

        expect({
          root: {
            style: root
              .attributes('style')
              ?.split(';')
              .map((declaration) => declaration.trim()),
          },
        }).toEqual({
          root: { style: expect.arrayContaining(expected.root.style) },
        })
      })
    })

    describe('radius', () => {
      testRadius({
        id: '[data-test-kbd-root]',
        variable: '--kbd-radius',
        mount: (radius) => mountKbd({ props: { radius } }),
      })

      const casesRadius = [
        {
          text: 'por defecto redondea con kbdDefaults.radius',
          input: {},
          expected: {
            // useTheme añade un respaldo a sm (var(--radius-sm, 0.25rem)), así que solo se mira el inicio
            root: {
              style: [expect.stringContaining(`--kbd-radius: var(--radius-${kbdDefaults.radius}`)],
            },
          },
        },
      ] as const

      it.each(casesRadius)('$text', ({ input, expected }) => {
        const root = mountKbd({ props: input }).get('[data-test-kbd-root]')

        expect({
          root: {
            style: root
              .attributes('style')
              ?.split(';')
              .map((declaration) => declaration.trim()),
          },
        }).toEqual({
          root: { style: expect.arrayContaining(expected.root.style) },
        })
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('sustituye al label', () => {
        const kbd = mountKbd({
          props: { label: 'Ctrl' },
          slots: { default: () => h('span', '⌘') },
        })

        expect(kbd.get('[data-test-kbd-root]').text()).toBe('⌘')
      })
    })
  })

  describe('nodos', () => {
    describe('root', () => {
      const casesRoot = [
        {
          text: 'se ajusta a su contenido en una fila centrada',
          input: {},
          expected: {
            class: ['inline-flex', 'w-fit', 'items-center', 'justify-center', 'gap-1'],
          },
        },
        {
          text: 'tiene borde con el radio de --kbd-radius',
          input: {},
          expected: {
            class: ['border', 'rounded-(--kbd-radius)'],
          },
        },
        {
          text: 'pinta el texto en mayúsculas, con fuente sans y negrita media',
          input: {},
          expected: {
            class: ['uppercase', 'font-sans', 'font-medium'],
          },
        },
      ] as const

      it.each(casesRoot)('$text', ({ input, expected }) => {
        const root = mountKbd({ props: input }).get('[data-test-kbd-root]')

        expect({ class: root.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })

      testAttrs({
        id: '[data-test-kbd-root]',
        ownClass: 'h-5',
        conflictingClass: 'h-8',
        mount: (attrs) => mountKbd({ attrs }),
      })
    })
  })
})
