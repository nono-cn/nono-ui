import { h } from 'vue'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import {
  Ribbon,
  ribbonItemDefaults,
  ribbonPositions,
  ribbonRotations,
  type RibbonItem,
  type RibbonItemContext,
  type RibbonPosition,
  type RibbonProps,
  type RibbonUI,
} from '@/components/ui/Ribbon'
import { themeColors } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

const casesVariantsCss = [
  {
    name: 'ribbonVariants',
    part: 'la raíz',
    input: '[data-test-ribbon-root]',
    expected: ['relative', 'isolate', 'block', 'overflow-hidden'],
  },
  {
    name: 'ribbonBandVariants',
    part: 'la banda',
    input: '[data-test-ribbon-band]',
    expected: [
      'pointer-events-none',
      'absolute',
      'h-8',
      'w-48',
      'border-(--ribbon-color)',
      'bg-(--ribbon-color)',
      'text-(--ribbon-color-foreground)',
      'whitespace-nowrap',
      'shadow-md',
    ],
  },
  {
    name: 'ribbonContentVariants',
    part: 'el contenido',
    input: '[data-test-ribbon-content]',
    expected: ['relative', 'z-10'],
  },
] satisfies Array<{ name: string; part: string; input: string; expected: string[] }>

const casesRibbons = [
  { name: 'sin cintas', input: undefined, expected: 0 },
  { name: 'una cinta', input: [{ label: 'Nuevo' }], expected: 1 },
  { name: 'dos cintas', input: [{ label: 'Nuevo' }, { label: 'Oferta' }], expected: 2 },
] satisfies Array<{ name: string; input: RibbonProps['ribbons']; expected: number }>

const casesPosition = [
  { input: 'top-right', expected: ['top-5', 'right-[-3.5rem]'] },
  { input: 'top-left', expected: ['top-5', 'left-[-3.5rem]'] },
  { input: 'bottom-right', expected: ['bottom-5', 'right-[-3.5rem]'] },
  { input: 'bottom-left', expected: ['bottom-5', 'left-[-3.5rem]'] },
  { input: undefined, expected: ['top-5', 'right-[-3.5rem]'] },
] satisfies Array<{ input: RibbonItem['position']; expected: string[] }>

const casesRotate = [
  ...ribbonPositions.map((position) => ({
    name: `por defecto en ${position}`,
    input: { position } as RibbonItem,
    expected: `rotate(${ribbonRotations[position]}deg)`,
  })),
  { name: 'personalizada', input: { rotate: 30 }, expected: 'rotate(30deg)' },
] satisfies Array<{ name: string; input: RibbonItem; expected: string }>

const casesZIndex = [
  { name: 'por defecto en la primera', input: undefined, index: 0, expected: '20' },
  { name: 'por defecto en la segunda', input: undefined, index: 1, expected: '21' },
  { name: 'personalizado', input: 5, index: 0, expected: '5' },
] satisfies Array<{ name: string; input: RibbonItem['zIndex']; index: number; expected: string }>

const ribbonsContext = [
  { label: 'Nuevo', slot: 'new' },
  { label: 'Oferta', color: 'success', position: 'top-left' as RibbonPosition },
] satisfies RibbonItem[]

const casesRibbonContext = ribbonsContext.map((item, index) => ({
  name: item.label,
  input: item,
  expected: { item, index },
})) satisfies Array<{ name: string; input: RibbonItem; expected: RibbonItemContext }>

const casesUiItemContext = ['band', 'label'] satisfies Array<keyof RibbonUI>

function mountRibbon(options: ComponentMountingOptions<typeof Ribbon> = {}) {
  const { slots, ...rest } = options
  return mount(Ribbon, {
    slots: { default: () => h('p', 'Contenido'), ...slots },
    ...rest,
  })
}

describe('Ribbon', () => {
  describe('props', () => {
    describe('ribbons', () => {
      it.each(casesRibbons)('renderiza una banda por cinta con $name', ({ input, expected }) => {
        const ribbon = mountRibbon({ props: { ribbons: input } })

        expect(ribbon.findAll('[data-test-ribbon-band]')).toHaveLength(expected)
      })

      it('renderiza el label de cada cinta', () => {
        const labels = mountRibbon({ props: { ribbons: casesRibbons[2]!.input } })
          .findAll('[data-test-ribbon-label]')
          .map((label) => label.text())

        expect(labels).toEqual(['Nuevo', 'Oferta'])
      })

      it('oculta las bandas a las tecnologías de asistencia', () => {
        const band = mountRibbon({ props: { ribbons: [{ label: 'Nuevo' }] } }).get(
          '[data-test-ribbon-band]',
        )

        expect(band.attributes('aria-hidden')).toBe('true')
      })
    })

    describe('position', () => {
      it.each(casesPosition)('con position=$input coloca la banda', ({ input, expected }) => {
        const band = mountRibbon({ props: { ribbons: [{ label: 'Nuevo', position: input }] } }).get(
          '[data-test-ribbon-band]',
        )

        expect(band.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('rotate', () => {
      it.each(casesRotate)('aplica la rotación $name', ({ input, expected }) => {
        const band = mountRibbon({ props: { ribbons: [{ label: 'Nuevo', ...input }] } }).get(
          '[data-test-ribbon-band]',
        )

        expect(band.attributes('style')).toContain(`transform: ${expected}`)
      })
    })

    describe('zIndex', () => {
      it.each(casesZIndex)('aplica el zIndex $name', ({ input, index, expected }) => {
        const ribbons = [{ label: 'Nuevo' }, { label: 'Oferta' }].map((item, itemIndex) =>
          itemIndex === index ? { ...item, zIndex: input } : item,
        )
        const band = mountRibbon({ props: { ribbons } }).findAll('[data-test-ribbon-band]')[index]!

        expect(band.attributes('style')).toContain(`z-index: ${expected}`)
      })
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color de la banda',
        id: '[data-test-ribbon-band]',
        varColor: '--ribbon-color',
        defaultColor: `var(--${ribbonItemDefaults.color}, var(--${ribbonItemDefaults.color}))`,
        theme: {
          colors: themeColors,
          foregroundVar: '--ribbon-color-foreground',
          solidVar: '--ribbon-solid',
          solidForegroundVar: '--ribbon-solid-foreground',
        },
        mount: (color) => mountRibbon({ props: { ribbons: [{ label: 'Nuevo', color }] } }),
      })
    })

   

    describe('ui', () => {
      testAttrs({
        text: 'pasa atributos mediante ui.band',
        id: '[data-test-ribbon-band]',
        mount: (attrs) =>
          mountRibbon({ props: { ribbons: [{ label: 'Nuevo' }], ui: { band: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa atributos mediante ui.label',
        id: '[data-test-ribbon-label]',
        mount: (attrs) =>
          mountRibbon({ props: { ribbons: [{ label: 'Nuevo' }], ui: { label: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa atributos mediante ui.content',
        id: '[data-test-ribbon-content]',
        mount: (attrs) => mountRibbon({ props: { ui: { content: () => attrs } } }),
      })
    })
  })

   describe('attrs', () => {
      testAttrs({
        text: 'pasa atributos a la raíz',
        id: '[data-test-ribbon-root]',
        mount: (attrs) => mountRibbon({ attrs }),
      })
    })
    
  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot dentro del contenido', () => {
        expect(mountRibbon().get('[data-test-ribbon-content]').text()).toBe('Contenido')
      })
    })

    describe('label', () => {
      it('reemplaza el label de todas las cintas', () => {
        const labels = mountRibbon({
          props: { ribbons: [{ label: 'Nuevo' }, { label: 'Oferta' }] },
          slots: { label: ({ item }: RibbonItemContext) => `★ ${item.label}` },
        })
          .findAll('[data-test-ribbon-label]')
          .map((label) => label.text())

        expect(labels).toEqual(['★ Nuevo', '★ Oferta'])
      })
    })

    describe('label-[slot]', () => {
      it('reemplaza solo el label de la cinta con ese slot', () => {
        const labels = mountRibbon({
          props: { ribbons: [{ label: 'Nuevo', slot: 'new' }, { label: 'Oferta' }] },
          slots: {
            'label-new': () => 'Recién llegado',
            label: ({ item }: RibbonItemContext) => `★ ${item.label}`,
          },
        })
          .findAll('[data-test-ribbon-label]')
          .map((label) => label.text())

        expect(labels).toEqual(['Recién llegado', '★ Oferta'])
      })

      it('usa el slot label cuando la cinta con slot no tiene slot específico', () => {
        const label = mountRibbon({
          props: { ribbons: [{ label: 'Nuevo', slot: 'new' }] },
          slots: { label: ({ item }: RibbonItemContext) => `★ ${item.label}` },
        }).get('[data-test-ribbon-label]')

        expect(label.text()).toBe('★ Nuevo')
      })
    })
  })

  describe('variantsCss', () => {
    it.each(casesVariantsCss)('aplica las clases base de $name a $part', ({ input, expected }) => {
      const element = mountRibbon({ props: { ribbons: [{ label: 'Nuevo' }] } }).get(input)

      expect(element.classes()).toEqual(expect.arrayContaining(expected))
    })
  })

  describe('context', () => {
    describe('RibbonItemContext', () => {
      it.each(casesRibbonContext)(
        'cumple el contrato de RibbonItemContext en la cinta $name',
        ({ expected }) => {
          const contexts: RibbonItemContext[] = []
          mountRibbon({
            props: { ribbons: ribbonsContext },
            slots: {
              // Vue añade ref_for a los slots dentro de un v-for; no es parte del contexto
              label: (slotProps: RibbonItemContext & { ref_for?: boolean }) => {
                const { ref_for: _refFor, ...value } = slotProps
                void _refFor
                contexts.push(value)
                return 'Slot'
              },
            },
          })

          expect(contexts[expected.index]).toEqual(expected)
        },
      )

      it('pasa RibbonItemContext al slot label-[slot]', () => {
        let context: RibbonItemContext | undefined
        mountRibbon({
          props: { ribbons: ribbonsContext },
          slots: {
            'label-new': (slotProps: RibbonItemContext & { ref_for?: boolean }) => {
              const { ref_for: _refFor, ...value } = slotProps
              void _refFor
              context = value
              return 'Slot'
            },
          },
        })

        expect(context).toEqual(casesRibbonContext[0]!.expected)
      })

      it.each(casesUiItemContext)('pasa RibbonItemContext a ui.%s', (name) => {
        const resolver = vi.fn(() => ({}))
        mountRibbon({ props: { ribbons: ribbonsContext, ui: { [name]: resolver } } })

        expect(resolver.mock.calls).toEqual(casesRibbonContext.map(({ expected }) => [expected]))
      })

      it('llama a ui.content sin contexto', () => {
        const resolver = vi.fn(() => ({}))
        mountRibbon({ props: { ui: { content: resolver } } })

        expect(resolver).toHaveBeenCalledWith(undefined)
      })
    })
  })
})
