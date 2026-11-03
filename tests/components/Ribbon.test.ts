import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import {
  Ribbon,
  ribbonItemDefaults,
  type RibbonItemContext,
  type RibbonProps,
} from '@/components/Ribbon'

import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountRibbon(options: MountingOptions<RibbonProps> = {}) {
  return mount(Ribbon, options)
}

describe('Ribbon', () => {
  describe('props', () => {
    describe('ribbons', () => {
      const casesRibbons = [
        {
          text: 'sin ribbons no pinta ninguna banda, pero sí el root y el content',
          input: {},
          expected: {
            root: { exists: true },
            content: { exists: true },
            bands: [],
          },
        },
        {
          text: 'con varios ribbons pinta una banda por item, en el mismo orden',
          input: { ribbons: [{ label: 'Nuevo' }, { label: 'Oferta' }, { label: 'Agotado' }] },
          expected: {
            root: { exists: true },
            content: { exists: true },
            bands: ['Nuevo', 'Oferta', 'Agotado'],
          },
        },
      ] as const

      it.each(casesRibbons)('$text', ({ input, expected }) => {
        const ribbon = mountRibbon({ props: input })

        expect({
          root: { exists: ribbon.find('[data-test-ribbon-root]').exists() },
          content: { exists: ribbon.find('[data-test-ribbon-content]').exists() },
          bands: ribbon.findAll('[data-test-ribbon-band]').map((band) => band.text()),
        }).toEqual(expected)
      })
    })

    describe('ribbons[].label', () => {
      const casesLabel = [
        {
          text: 'con label pinta item.label dentro de la label',
          input: { ribbons: [{ label: 'Nuevo' }] },
          expected: { label: { text: 'Nuevo' } },
        },
        {
          text: 'sin label pinta la label vacía',
          input: { ribbons: [{}] },
          expected: { label: { text: '' } },
        },
      ] as const

      it.each(casesLabel)('$text', ({ input, expected }) => {
        const label = mountRibbon({ props: input }).get('[data-test-ribbon-label]')

        expect({
          label: { text: label.text() },
        }).toEqual(expected)
      })
    })

    describe('ribbons[].position', () => {
      const casesPosition = [
        {
          text: 'sin position coloca la banda arriba a la derecha y la gira 45deg',
          input: { ribbons: [{}] },
          expected: {
            band: { class: ['top-5', 'right-[-3.5rem]'], transform: 'rotate(45deg)' },
          },
        },
        {
          text: 'con position=top-right coloca la banda arriba a la derecha y la gira 45deg',
          input: { ribbons: [{ position: 'top-right' }] },
          expected: {
            band: { class: ['top-5', 'right-[-3.5rem]'], transform: 'rotate(45deg)' },
          },
        },
        {
          text: 'con position=top-left coloca la banda arriba a la izquierda y la gira -45deg',
          input: { ribbons: [{ position: 'top-left' }] },
          expected: {
            band: { class: ['top-5', 'left-[-3.5rem]'], transform: 'rotate(-45deg)' },
          },
        },
        {
          text: 'con position=bottom-right coloca la banda abajo a la derecha y la gira -45deg',
          input: { ribbons: [{ position: 'bottom-right' }] },
          expected: {
            band: { class: ['bottom-5', 'right-[-3.5rem]'], transform: 'rotate(-45deg)' },
          },
        },
        {
          text: 'con position=bottom-left coloca la banda abajo a la izquierda y la gira 45deg',
          input: { ribbons: [{ position: 'bottom-left' }] },
          expected: {
            band: { class: ['bottom-5', 'left-[-3.5rem]'], transform: 'rotate(45deg)' },
          },
        },
      ] as const

      it.each(casesPosition)('$text', ({ input, expected }) => {
        const band = mountRibbon({ props: input }).get<HTMLElement>('[data-test-ribbon-band]')

        expect({
          band: { class: band.classes(), transform: band.element.style.transform },
        }).toEqual({
          band: {
            class: expect.arrayContaining(expected.band.class),
            transform: expected.band.transform,
          },
        })
      })
    })

    describe('ribbons[].rotate', () => {
      const casesRotate = [
        {
          text: 'con rotate=30 gira la banda 30deg en vez de los 45deg de top-right',
          input: { ribbons: [{ position: 'top-right', rotate: 30 }] },
          expected: { band: { transform: 'rotate(30deg)' } },
        },
        {
          text: 'con rotate=0 no gira la banda en vez de los -45deg de top-left',
          input: { ribbons: [{ position: 'top-left', rotate: 0 }] },
          expected: { band: { transform: 'rotate(0deg)' } },
        },
      ] as const

      it.each(casesRotate)('$text', ({ input, expected }) => {
        const band = mountRibbon({ props: input }).get<HTMLElement>('[data-test-ribbon-band]')

        expect({
          band: { transform: band.element.style.transform },
        }).toEqual(expected)
      })
    })

    describe('ribbons[].color', () => {
      testColor({
        id: '[data-test-ribbon-band]',
        variable: '--ribbon-color',
        fallbackColor: ribbonItemDefaults.color,
        mount: (color) => mountRibbon({ props: { ribbons: [{ color }] } }),
        setColor: (wrapper, color) => wrapper.setProps({ ribbons: [{ color }] }),
      })

      const casesColor = [
        {
          text: 'sin color define --ribbon-color con ribbonItemDefaults.color',
          input: { ribbons: [{}] },
          expected: {
            band: {
              style: [
                `--ribbon-color: var(--${ribbonItemDefaults.color}, var(--${ribbonItemDefaults.color}))`,
              ],
            },
          },
        },
      ] as const

      it.each(casesColor)('$text', ({ input, expected }) => {
        const band = mountRibbon({ props: input }).get('[data-test-ribbon-band]')

        expect({
          band: {
            style: band
              .attributes('style')
              ?.split(';')
              .map((declaration) => declaration.trim()),
          },
        }).toEqual({
          band: { style: expect.arrayContaining(expected.band.style) },
        })
      })
    })

    describe('ribbons[].zIndex', () => {
      const casesZIndex = [
        {
          text: 'sin zIndex cada banda usa ribbonItemDefaults.zIndex más su índice',
          input: { ribbons: [{}, {}, {}] },
          expected: {
            bands: [
              { zIndex: `${ribbonItemDefaults.zIndex}` },
              { zIndex: `${ribbonItemDefaults.zIndex + 1}` },
              { zIndex: `${ribbonItemDefaults.zIndex + 2}` },
            ],
          },
        },
        {
          text: 'con zIndex la banda usa ese valor y el resto sigue con el de por defecto',
          input: { ribbons: [{ zIndex: 5 }, {}] },
          expected: {
            bands: [{ zIndex: '5' }, { zIndex: `${ribbonItemDefaults.zIndex + 1}` }],
          },
        },
      ] as const

      it.each(casesZIndex)('$text', ({ input, expected }) => {
        const bands = mountRibbon({ props: input }).findAll<HTMLElement>('[data-test-ribbon-band]')

        expect({
          bands: bands.map((band) => ({ zIndex: band.element.style.zIndex })),
        }).toEqual(expected)
      })
    })

    describe('ui', () => {
      describe('band', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.band a cada banda',
          id: '[data-test-ribbon-band]',
          ownClass: 'top-5',
          conflictingClass: 'top-0',
          normalized: true,
          mount: (attrs) => mountRibbon({ props: { ribbons: [{}], ui: { band: () => attrs } } }),
        })

        it('llama a ui.band con el RibbonItemContext de cada banda', () => {
          const band = vi.fn(() => ({}))
          const ribbons = [{ label: 'Nuevo' }, { label: 'Oferta' }]
          mountRibbon({ props: { ribbons, ui: { band } } })

          expect(band.mock.calls).toEqual([
            [{ item: ribbons[0], index: 0 }],
            [{ item: ribbons[1], index: 1 }],
          ])
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.label a cada label',
          id: '[data-test-ribbon-label]',
          normalized: true,
          mount: (attrs) => mountRibbon({ props: { ribbons: [{}], ui: { label: () => attrs } } }),
        })

        it('llama a ui.label con el RibbonItemContext de cada banda', () => {
          const label = vi.fn(() => ({}))
          const ribbons = [{ label: 'Nuevo' }, { label: 'Oferta' }]
          mountRibbon({ props: { ribbons, ui: { label } } })

          expect(label.mock.calls).toEqual([
            [{ item: ribbons[0], index: 0 }],
            [{ item: ribbons[1], index: 1 }],
          ])
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.content al content',
          id: '[data-test-ribbon-content]',
          ownClass: 'z-10',
          conflictingClass: 'z-30',
          normalized: true,
          mount: (attrs) => mountRibbon({ props: { ui: { content: () => attrs } } }),
        })
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('se pinta dentro del content', () => {
        const ribbon = mountRibbon({
          props: { ribbons: [{ label: 'Nuevo' }] },
          slots: { default: () => h('span', 'Contenido') },
        })

        expect(ribbon.get('[data-test-ribbon-content]').text()).toBe('Contenido')
      })
    })

    describe('label', () => {
      it('sustituye a item.label en todas las bandas', () => {
        const labels = mountRibbon({
          props: { ribbons: [{ label: 'Nuevo' }, { label: 'Oferta' }] },
          slots: { label: () => h('strong', 'Destacado') },
        }).findAll('[data-test-ribbon-label]')

        expect(labels.map((label) => label.text())).toEqual(['Destacado', 'Destacado'])
      })

      it('recibe de slotProps: RibbonItemContext', () => {
        const labels = mountRibbon({
          props: { ribbons: [{ label: 'Nuevo' }, { label: 'Oferta' }] },
          slots: {
            label: ({ item, index }: RibbonItemContext) => h('strong', `${index}-${item.label}`),
          },
        }).findAll('[data-test-ribbon-label]')

        expect(labels.map((label) => label.text())).toEqual(['0-Nuevo', '1-Oferta'])
      })
    })
  })

  describe('context', () => {
    describe('RibbonItemContext', () => {
      const casesRibbonItemContext = [
        {
          text: 'con un ribbon tiene ese item e index=0',
          input: { ribbons: [{ label: 'Nuevo', color: 'error' }] },
          expected: [{ item: { label: 'Nuevo', color: 'error' }, index: 0 }],
        },
        {
          text: 'con varios ribbons cada banda tiene su item y su index, en el mismo orden',
          input: { ribbons: [{ label: 'Nuevo' }, { label: 'Oferta', position: 'top-left' }] },
          expected: [
            { item: { label: 'Nuevo' }, index: 0 },
            { item: { label: 'Oferta', position: 'top-left' }, index: 1 },
          ],
        },
      ] as const

      it.each(casesRibbonItemContext)('$text', ({ input, expected }) => {
        const contexts: RibbonItemContext[] = []
        mountRibbon({
          props: input,
          slots: {
            label: ({ item, index }: RibbonItemContext) => {
              contexts.push({ item, index })
              return h('strong', item.label)
            },
          },
        })

        expect(contexts).toEqual(expected)
      })
    })
  })

  describe('nodos', () => {
    describe('root', () => {
      const casesRoot = [
        {
          text: 'es un contenedor relativo que recorta las bandas que sobresalen',
          input: {},
          expected: {
            class: ['relative', 'overflow-hidden'],
          },
        },
        {
          text: 'crea su propio contexto de apilamiento para que el z-index de las bandas no salga de él',
          input: {},
          expected: {
            class: ['isolate'],
          },
        },
      ] as const

      it.each(casesRoot)('$text', ({ input, expected }) => {
        const root = mountRibbon({ props: input }).get('[data-test-ribbon-root]')

        expect({ class: root.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })

      testAttrs({
        id: '[data-test-ribbon-root]',
        ownClass: 'overflow-hidden',
        conflictingClass: 'overflow-visible',
        mount: (attrs) => mountRibbon({ attrs }),
      })
    })

    describe('band', () => {
      const casesBand = [
        {
          text: 'es una banda absoluta con fondo y borde de --ribbon-color',
          input: { ribbons: [{}] },
          expected: {
            class: ['absolute', 'bg-(--ribbon-color)', 'border-y', 'border-(--ribbon-color)'],
          },
        },
        {
          text: 'pinta el texto con --ribbon-color-foreground sin partirlo',
          input: { ribbons: [{}] },
          expected: {
            class: ['text-(--ribbon-color-foreground)', 'whitespace-nowrap'],
          },
        },
        {
          text: 'no recibe eventos del puntero para no tapar el contenido',
          input: { ribbons: [{}] },
          expected: {
            class: ['pointer-events-none'],
          },
        },
      ] as const

      it.each(casesBand)('$text', ({ input, expected }) => {
        const band = mountRibbon({ props: input }).get('[data-test-ribbon-band]')

        expect({ class: band.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })

    describe('content', () => {
      const casesContent = [
        {
          text: 'es relativo con z-10 para quedar por debajo de las bandas',
          input: {},
          expected: {
            class: ['relative', 'z-10'],
          },
        },
      ] as const

      it.each(casesContent)('$text', ({ input, expected }) => {
        const content = mountRibbon({ props: input }).get('[data-test-ribbon-content]')

        expect({ class: content.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })
  })
})
