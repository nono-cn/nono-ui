import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Chip, chipDefaults, type ChipProps } from '@/components/Chip'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountChip(options: MountingOptions<ChipProps> = {}) {
  return mount(Chip, options)
}

describe('Chip', () => {
  describe('props', () => {
    describe('size', () => {
      const casesSize = [
        {
          text: 'con size=3xs el chip mide 1 de alto y de ancho mínimo',
          input: { size: '3xs' },
          expected: {
            base: { class: ['h-1', 'min-w-1'] },
          },
        },
        {
          text: 'con size=2xs el chip mide 1.5 de alto y de ancho mínimo',
          input: { size: '2xs' },
          expected: {
            base: { class: ['h-1.5', 'min-w-1.5'] },
          },
        },
        {
          text: 'con size=xs el chip mide 1.5 de alto y de ancho mínimo',
          input: { size: 'xs' },
          expected: {
            base: { class: ['h-1.5', 'min-w-1.5'] },
          },
        },
        {
          text: 'con size=sm el chip mide 2 de alto y de ancho mínimo',
          input: { size: 'sm' },
          expected: {
            base: { class: ['h-2', 'min-w-2'] },
          },
        },
        {
          text: 'con size=md el chip mide 2 de alto y de ancho mínimo',
          input: { size: 'md' },
          expected: {
            base: { class: ['h-2', 'min-w-2'] },
          },
        },
        {
          text: 'con size=lg el chip mide 2.5 de alto y de ancho mínimo',
          input: { size: 'lg' },
          expected: {
            base: { class: ['h-2.5', 'min-w-2.5'] },
          },
        },
        {
          text: 'con size=xl el chip mide 2.5 de alto y de ancho mínimo',
          input: { size: 'xl' },
          expected: {
            base: { class: ['h-2.5', 'min-w-2.5'] },
          },
        },
        {
          text: 'con size=2xl el chip mide 3 de alto y de ancho mínimo',
          input: { size: '2xl' },
          expected: {
            base: { class: ['h-3', 'min-w-3'] },
          },
        },
        {
          text: 'con size=3xl el chip mide 3 de alto y de ancho mínimo',
          input: { size: '3xl' },
          expected: {
            base: { class: ['h-3', 'min-w-3'] },
          },
        },
      ] as const

      it.each(casesSize)('$text', ({ input, expected }) => {
        const base = mountChip({ props: input }).get('[data-test-chip-base]')

        expect({
          base: { class: base.classes() },
        }).toEqual({
          base: { class: expect.arrayContaining(expected.base.class) },
        })
      })
    })

    describe('color', () => {
      testColor({
        id: '[data-test-chip-root]',
        variable: '--chip-color',
        fallbackColor: chipDefaults.color,
        mount: (color) => mountChip({ props: { color } }),
      })

      const casesColor = [
        {
          text: 'por defecto pinta con chipDefaults.color',
          input: {},
          expected: {
            root: {
              style: [`--chip-color: var(--${chipDefaults.color}, var(--${chipDefaults.color}))`],
            },
          },
        },
      ] as const

      it.each(casesColor)('$text', ({ input, expected }) => {
        const root = mountChip({ props: input }).get('[data-test-chip-root]')

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

    describe('show', () => {
      const casesShow = [
        {
          text: 'con show=true pinta el chip',
          input: { show: true },
          expected: {
            base: { exists: true },
          },
        },
        {
          text: 'con show=false no pinta el chip',
          input: { show: false },
          expected: {
            base: { exists: false },
          },
        },
      ] as const

      it.each(casesShow)('$text', ({ input, expected }) => {
        const chip = mountChip({ props: input })

        expect({
          base: { exists: chip.find('[data-test-chip-base]').exists() },
        }).toEqual(expected)
      })
    })

    describe('position', () => {
      const casesPosition = [
        {
          text: 'con position=top-right coloca el chip en la esquina superior derecha del contenido, centrado sobre ella',
          input: { position: 'top-right' },
          expected: {
            base: { class: ['top-0', 'right-0', '-translate-y-1/2', 'translate-x-1/2'] },
          },
        },
        {
          text: 'con position=bottom-right coloca el chip en la esquina inferior derecha del contenido, centrado sobre ella',
          input: { position: 'bottom-right' },
          expected: {
            base: { class: ['bottom-0', 'right-0', 'translate-y-1/2', 'translate-x-1/2'] },
          },
        },
        {
          text: 'con position=top-left coloca el chip en la esquina superior izquierda del contenido, centrado sobre ella',
          input: { position: 'top-left' },
          expected: {
            base: { class: ['top-0', 'left-0', '-translate-y-1/2', '-translate-x-1/2'] },
          },
        },
        {
          text: 'con position=bottom-left coloca el chip en la esquina inferior izquierda del contenido, centrado sobre ella',
          input: { position: 'bottom-left' },
          expected: {
            base: { class: ['bottom-0', 'left-0', 'translate-y-1/2', '-translate-x-1/2'] },
          },
        },
      ] as const

      it.each(casesPosition)('$text', ({ input, expected }) => {
        const base = mountChip({ props: input }).get('[data-test-chip-base]')

        expect({
          base: { class: base.classes() },
        }).toEqual({
          base: { class: expect.arrayContaining(expected.base.class) },
        })
      })
    })

    describe('inset', () => {
      const casesInset = [
        {
          text: 'con inset=false el chip se desplaza para quedar centrado sobre la esquina',
          input: { position: 'top-right', inset: false },
          expected: {
            base: { translate: ['-translate-y-1/2', 'translate-x-1/2'] },
          },
        },
        {
          text: 'con inset=true el chip no se desplaza y queda dentro de la esquina',
          input: { position: 'top-right', inset: true },
          expected: {
            base: { translate: [] },
          },
        },
      ] as const

      it.each(casesInset)('$text', ({ input, expected }) => {
        const base = mountChip({ props: input }).get('[data-test-chip-base]')

        expect({
          base: {
            translate: base.classes().filter((className) => className.includes('translate')),
          },
        }).toEqual(expected)
      })
    })

    describe('standalone', () => {
      const casesStandalone = [
        {
          text: 'con standalone=false el chip es absolute para colocarse sobre el contenido',
          input: { standalone: false },
          expected: {
            base: { absolute: true },
          },
        },
        {
          text: 'con standalone=true el chip no es absolute y queda en línea junto al contenido',
          input: { standalone: true },
          expected: {
            base: { absolute: false },
          },
        },
      ] as const

      it.each(casesStandalone)('$text', ({ input, expected }) => {
        const base = mountChip({ props: input }).get('[data-test-chip-base]')

        expect({
          base: { absolute: base.classes().includes('absolute') },
        }).toEqual(expected)
      })

      const casesStandalonePosition = [
        {
          text: 'con standalone=true no aplica position: ni esquina ni desplazamiento',
          input: { standalone: true, position: 'top-right', inset: false },
          expected: {
            base: { position: [] },
          },
        },
      ] as const

      it.each(casesStandalonePosition)('$text', ({ input, expected }) => {
        const base = mountChip({ props: input }).get('[data-test-chip-base]')

        expect({
          base: {
            position: base
              .classes()
              .filter((className) => /^(top-|right-|bottom-|left-|-?translate-)/.test(className)),
          },
        }).toEqual(expected)
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('se pinta dentro del root, junto al chip', () => {
        const chip = mountChip({ slots: { default: () => h('span', 'Contenido') } })

        expect(chip.get('[data-test-chip-root]').text()).toBe('Contenido')
      })
    })
  })

  describe('nodos', () => {
    describe('root', () => {
      const casesRoot = [
        {
          text: 'es un contenedor relativo que sirve de referencia para colocar el chip',
          input: {},
          expected: {
            class: ['relative'],
          },
        },
        {
          text: 'se ajusta al contenido en una fila centrada sin encogerse',
          input: {},
          expected: {
            class: ['inline-flex', 'shrink-0', 'items-center', 'justify-center'],
          },
        },
      ] as const

      it.each(casesRoot)('$text', ({ input, expected }) => {
        const root = mountChip({ props: input }).get('[data-test-chip-root]')

        expect({ class: root.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })

      testAttrs({
        id: '[data-test-chip-root]',
        ownClass: 'items-center',
        conflictingClass: 'items-start',
        mount: (attrs) => mountChip({ attrs }),
      })
    })

    describe('base', () => {
      const casesBase = [
        {
          text: 'es un círculo relleno con --chip-color',
          input: {},
          expected: {
            class: ['rounded-full', 'bg-(--chip-color)'],
          },
        },
        {
          text: 'tiene un anillo del color de fondo para separarse del contenido',
          input: {},
          expected: {
            class: ['ring-2', 'ring-background'],
          },
        },
      ] as const

      it.each(casesBase)('$text', ({ input, expected }) => {
        const base = mountChip({ props: input }).get('[data-test-chip-base]')

        expect({ class: base.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })
  })
})
