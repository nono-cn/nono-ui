import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { ProgressRoot } from 'reka-ui'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import type { ProgressValue } from '@/components/ui/Progress'
import {
  ProgressCircular,
  progressCircularDefaults,
  type ProgressCircularContext,
  type ProgressCircularProps,
} from '@/components/ui/ProgressCircular'
import { testAttrs } from '../utils/testAttrs'

function mountProgressCircular(options: ComponentMountingOptions<typeof ProgressCircular> = {}) {
  return mount(ProgressCircular, options)
}

// Con thickness=8 y max=100: r = (100 - 8) / 2 = 46 y circunferencia = 2π·46 ≈ 289.03.
// stroke-dashoffset = circunferencia · (1 - valor / 100); con null, circunferencia · 0.75
const casesModelValue = [
  {
    input: undefined,
    expected: {
      reka: progressCircularDefaults.modelValue,
      attrs: { indicator: { 'stroke-dashoffset': 289.03 } },
    },
  },
  {
    input: null,
    expected: { reka: null, attrs: { indicator: { 'stroke-dashoffset': 216.77 } } },
  },
  {
    input: 0,
    expected: { reka: 0, attrs: { indicator: { 'stroke-dashoffset': 289.03 } } },
  },
  {
    input: 35,
    expected: { reka: 35, attrs: { indicator: { 'stroke-dashoffset': 187.87 } } },
  },
  {
    input: 100,
    expected: { reka: 100, attrs: { indicator: { 'stroke-dashoffset': 0 } } },
  },
] satisfies Array<{
  input: ProgressCircularProps['modelValue']
  expected: { reka: ProgressValue; attrs: { indicator: { 'stroke-dashoffset': number } } }
}>

// Fuera de [0, max] el porcentaje se recorta a [0, 100] antes de calcular el stroke-dashoffset.
// Reka los considera inválidos (console.error), por eso no se comprueba lo que recibe
const casesModelValueFueraDeRango = [
  { input: -10, expected: { attrs: { indicator: { 'stroke-dashoffset': 289.03 } } } },
  { input: 150, expected: { attrs: { indicator: { 'stroke-dashoffset': 0 } } } },
] satisfies Array<{
  input: ProgressCircularProps['modelValue']
  expected: { attrs: { indicator: { 'stroke-dashoffset': number } } }
}>

// Con modelValue=50 y thickness=8: circunferencia ≈ 289.03.
// stroke-dashoffset = circunferencia · (1 - min(100, 50 / max · 100) / 100)
const casesMax = [
  {
    input: undefined,
    expected: {
      reka: progressCircularDefaults.max,
      attrs: { indicator: { 'stroke-dashoffset': 144.51 } },
    },
  },
  {
    input: 25,
    expected: { reka: 25, attrs: { indicator: { 'stroke-dashoffset': 0 } } },
  },
  {
    input: 50,
    expected: { reka: 50, attrs: { indicator: { 'stroke-dashoffset': 0 } } },
  },
  {
    input: 200,
    expected: { reka: 200, attrs: { indicator: { 'stroke-dashoffset': 216.77 } } },
  },
  {
    input: 400,
    expected: { reka: 400, attrs: { indicator: { 'stroke-dashoffset': 252.9 } } },
  },
] satisfies Array<{
  input: ProgressCircularProps['max']
  expected: { reka: number; attrs: { indicator: { 'stroke-dashoffset': number } } }
}>

// Con modelValue=35 y max=100; sin función, Reka usa su etiqueta por defecto (porcentaje)
const casesGetValueLabel = [
  { input: undefined, expected: { attrs: { root: { 'aria-label': '35%' } } } },
  {
    input: (value: ProgressValue | undefined, max: number) => `${value} de ${max}`,
    expected: { attrs: { root: { 'aria-label': '35 de 100' } } },
  },
] satisfies Array<{
  input: ProgressCircularProps['getValueLabel']
  expected: { attrs: { root: { 'aria-label': string } } }
}>

// Con modelValue=35 y max=100; sin función, Reka no pone aria-valuetext
const casesGetValueText = [
  { input: undefined, expected: { attrs: { root: { 'aria-valuetext': undefined } } } },
  {
    input: (value: ProgressValue | undefined, max: number) => `${value} de ${max} archivos`,
    expected: { attrs: { root: { 'aria-valuetext': '35 de 100 archivos' } } },
  },
] satisfies Array<{
  input: ProgressCircularProps['getValueText']
  expected: { attrs: { root: { 'aria-valuetext': string | undefined } } }
}>

// Sin texto (y sin slot) la etiqueta no se renderiza
const casesLabel = [
  { input: undefined, expected: { text: { label: [] } } },
  { input: '', expected: { text: { label: [] } } },
  { input: '35%', expected: { text: { label: ['35%'] } } },
  { input: 'Subiendo', expected: { text: { label: ['Subiendo'] } } },
] satisfies Array<{
  input: ProgressCircularProps['label']
  expected: { text: { label: string[] } }
}>

const casesSize = [
  { input: undefined, expected: { class: { root: ['size-16'], label: ['text-xs'] } } },
  { input: 'xs', expected: { class: { root: ['size-8'], label: ['text-[0.5rem]'] } } },
  { input: 'sm', expected: { class: { root: ['size-12'], label: ['text-[0.625rem]'] } } },
  { input: 'md', expected: { class: { root: ['size-16'], label: ['text-xs'] } } },
  { input: 'lg', expected: { class: { root: ['size-20'], label: ['text-sm'] } } },
  { input: 'xl', expected: { class: { root: ['size-24'], label: ['text-base'] } } },
] satisfies Array<{
  input: ProgressCircularProps['size']
  expected: { class: { root: string[]; label: string[] } }
}>

// Sin trackColor, la pista usa el color con opacidad
const casesColor = [
  {
    input: undefined,
    expected: {
      style: `--progress-circular-color: var(--${progressCircularDefaults.color}, var(--primary))`,
      class: {
        track: ['stroke-(--progress-circular-color)/20'],
        indicator: ['stroke-(--progress-circular-color)'],
      },
    },
  },
  {
    input: 'success',
    expected: {
      style: '--progress-circular-color: var(--success, var(--primary))',
      class: {
        track: ['stroke-(--progress-circular-color)/20'],
        indicator: ['stroke-(--progress-circular-color)'],
      },
    },
  },
  {
    input: '#ff0000',
    expected: {
      style: '--progress-circular-color: #ff0000',
      class: {
        track: ['stroke-(--progress-circular-color)/20'],
        indicator: ['stroke-(--progress-circular-color)'],
      },
    },
  },
] satisfies Array<{
  input: ProgressCircularProps['color']
  expected: { style: string; class: { track: string[]; indicator: string[] } }
}>

// Sin trackColor la variable se resuelve igualmente, pero la pista no la usa: usa color con opacidad
const casesTrackColor = [
  {
    input: undefined,
    expected: {
      style: `--progress-circular-track-color: var(--${progressCircularDefaults.color}, var(--primary))`,
      class: { track: ['stroke-(--progress-circular-color)/20'] },
    },
  },
  {
    input: 'success',
    expected: {
      style: '--progress-circular-track-color: var(--success, var(--primary))',
      class: { track: ['stroke-(--progress-circular-track-color)'] },
    },
  },
  {
    input: '#ff0000',
    expected: {
      style: '--progress-circular-track-color: #ff0000',
      class: { track: ['stroke-(--progress-circular-track-color)'] },
    },
  },
] satisfies Array<{
  input: ProgressCircularProps['trackColor']
  expected: { style: string; class: { track: string[] } }
}>

// r = (100 - thickness) / 2 y stroke-dasharray = circunferencia = 2π·r
const casesThickness = [
  {
    input: undefined,
    expected: {
      attrs: {
        track: { r: 46, 'stroke-width': progressCircularDefaults.thickness },
        indicator: {
          r: 46,
          'stroke-width': progressCircularDefaults.thickness,
          'stroke-dasharray': 289.03,
        },
      },
    },
  },
  {
    input: 4,
    expected: {
      attrs: {
        track: { r: 48, 'stroke-width': 4 },
        indicator: { r: 48, 'stroke-width': 4, 'stroke-dasharray': 301.59 },
      },
    },
  },
  {
    input: 10,
    expected: {
      attrs: {
        track: { r: 45, 'stroke-width': 10 },
        indicator: { r: 45, 'stroke-width': 10, 'stroke-dasharray': 282.74 },
      },
    },
  },
  {
    input: 20,
    expected: {
      attrs: {
        track: { r: 40, 'stroke-width': 20 },
        indicator: { r: 40, 'stroke-width': 20, 'stroke-dasharray': 251.33 },
      },
    },
  },
] satisfies Array<{
  input: ProgressCircularProps['thickness']
  expected: {
    attrs: {
      track: { r: number; 'stroke-width': number }
      indicator: { r: number; 'stroke-width': number; 'stroke-dasharray': number }
    }
  }
}>

// Montado con modelValue=20; si Reka emite el mismo valor, el modelo no cambia y no se reemite
const casesUpdateModelValue = [
  { input: 0, expected: { emitted: [[0]] } },
  { input: 20, expected: { emitted: undefined } },
  { input: 35, expected: { emitted: [[35]] } },
  { input: 100, expected: { emitted: [[100]] } },
  { input: null, expected: { emitted: [[null]] } },
] satisfies Array<{
  input: ProgressValue
  expected: { emitted: Array<[ProgressValue]> | undefined }
}>

// input = prop label; con el slot label, label se renderiza siempre con el contenido del slot
const casesSlotLabel = [
  { input: undefined, expected: { text: { label: ['Contenido del slot'] } } },
  { input: 'Fallback', expected: { text: { label: ['Contenido del slot'] } } },
] satisfies Array<{
  input: ProgressCircularProps['label']
  expected: { text: { label: string[] } }
}>

// percentage = value / max · 100; con null (indeterminado) es 0
const casesContext = [
  {
    input: { modelValue: undefined, max: undefined },
    expected: {
      value: progressCircularDefaults.modelValue,
      max: progressCircularDefaults.max,
      percentage: 0,
    },
  },
  { input: { modelValue: 0, max: 100 }, expected: { value: 0, max: 100, percentage: 0 } },
  { input: { modelValue: 50, max: 200 }, expected: { value: 50, max: 200, percentage: 25 } },
  { input: { modelValue: 100, max: 100 }, expected: { value: 100, max: 100, percentage: 100 } },
  { input: { modelValue: null, max: 100 }, expected: { value: null, max: 100, percentage: 0 } },
] satisfies Array<{
  input: Pick<ProgressCircularProps, 'modelValue' | 'max'>
  expected: ProgressCircularContext
}>

// Clases y atributos fijos de cada nodo; los que dependen de una prop se prueban en esa prop
const casesNodos = [
  {
    input: 'root',
    expected: {
      class: ['group', 'relative', 'inline-grid', 'shrink-0', 'place-items-center'],
      attrs: { role: 'progressbar', 'aria-valuemin': '0' },
    },
  },
  {
    input: 'svg',
    expected: {
      class: ['size-full', '-rotate-90', 'group-data-[state=indeterminate]:animate-spin'],
      attrs: { 'aria-hidden': 'true', viewBox: '0 0 100 100' },
    },
  },
  { input: 'track', expected: { class: ['fill-none'], attrs: { cx: '50', cy: '50' } } },
  {
    input: 'indicator',
    expected: {
      class: [
        'fill-none',
        'stroke-(--progress-circular-color)',
        'transition-[stroke-dashoffset]',
        'duration-300',
        'ease-out',
      ],
      attrs: { cx: '50', cy: '50', 'stroke-linecap': 'round' },
    },
  },
  {
    input: 'label',
    expected: {
      class: [
        'pointer-events-none',
        'absolute',
        'inset-0',
        'flex',
        'items-center',
        'justify-center',
        'text-center',
        'font-semibold',
      ],
      attrs: { 'aria-hidden': 'true' },
    },
  },
] satisfies Array<{
  input: 'root' | 'svg' | 'track' | 'indicator' | 'label'
  expected: { class: string[]; attrs: Record<string, string> }
}>

describe('ProgressCircular', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesModelValue)(
        'pasa modelValue=$input a Reka ProgressRoot',
        ({ input, expected }) => {
          expect(
            mountProgressCircular({ props: { modelValue: input } })
              .getComponent(ProgressRoot)
              .props('modelValue'),
          ).toBe(expected.reka)
        },
      )

      it.each(casesModelValue)(
        'calcula el stroke-dashoffset del indicador con modelValue=$input',
        ({ input, expected }) => {
          const indicator = mountProgressCircular({
            props: { modelValue: input, max: 100, thickness: 8 },
          }).get('[data-test-progress-circular-indicator]')

          expect(Number(indicator.attributes('stroke-dashoffset'))).toBeCloseTo(
            expected.attrs.indicator['stroke-dashoffset'],
            2,
          )
        },
      )

      it.each(casesModelValueFueraDeRango)(
        'recorta el stroke-dashoffset del indicador con modelValue=$input fuera de rango',
        ({ input, expected }) => {
          const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

          const indicator = mountProgressCircular({
            props: { modelValue: input, max: 100, thickness: 8 },
          }).get('[data-test-progress-circular-indicator]')

          expect(Number(indicator.attributes('stroke-dashoffset'))).toBeCloseTo(
            expected.attrs.indicator['stroke-dashoffset'],
            2,
          )

          consoleError.mockRestore()
        },
      )
    })

    describe('max', () => {
      it.each(casesMax)('pasa max=$input a Reka ProgressRoot', ({ input, expected }) => {
        expect(
          mountProgressCircular({ props: { max: input } })
            .getComponent(ProgressRoot)
            .props('max'),
        ).toBe(expected.reka)
      })

      it.each(casesMax)(
        'calcula el stroke-dashoffset del indicador con max=$input',
        ({ input, expected }) => {
          const indicator = mountProgressCircular({
            props: { modelValue: 50, max: input, thickness: 8 },
          }).get('[data-test-progress-circular-indicator]')

          expect(Number(indicator.attributes('stroke-dashoffset'))).toBeCloseTo(
            expected.attrs.indicator['stroke-dashoffset'],
            2,
          )
        },
      )
    })

    describe('getValueLabel', () => {
      it.each(casesGetValueLabel)(
        'aplica el aria-label de la raíz con getValueLabel=$input',
        ({ input, expected }) => {
          expect(
            mountProgressCircular({ props: { modelValue: 35, max: 100, getValueLabel: input } })
              .get('[data-test-progress-circular-root]')
              .attributes('aria-label'),
          ).toBe(expected.attrs.root['aria-label'])
        },
      )
    })

    describe('getValueText', () => {
      it.each(casesGetValueText)(
        'aplica el aria-valuetext de la raíz con getValueText=$input',
        ({ input, expected }) => {
          expect(
            mountProgressCircular({ props: { modelValue: 35, max: 100, getValueText: input } })
              .get('[data-test-progress-circular-root]')
              .attributes('aria-valuetext'),
          ).toBe(expected.attrs.root['aria-valuetext'])
        },
      )
    })

    describe('label', () => {
      it.each(casesLabel)('renderiza la etiqueta con label=$input', ({ input, expected }) => {
        expect(
          mountProgressCircular({ props: { label: input } })
            .findAll('[data-test-progress-circular-label]')
            .map((label) => label.text()),
        ).toEqual(expected.text.label)
      })
    })

    describe('size', () => {
      it.each(casesSize)(
        'aplica las clases de size=$input a root y a label',
        ({ input, expected }) => {
          const wrapper = mountProgressCircular({ props: { size: input, label: '35%' } })

          expect({
            root: wrapper.get('[data-test-progress-circular-root]').classes(),
            label: wrapper.get('[data-test-progress-circular-label]').classes(),
          }).toEqual({
            root: expect.arrayContaining(expected.class.root),
            label: expect.arrayContaining(expected.class.label),
          })
        },
      )
    })

    describe('color', () => {
      it.each(casesColor)('resuelve color=$input en el style de root', ({ input, expected }) => {
        expect(
          mountProgressCircular({ props: { color: input } })
            .get('[data-test-progress-circular-root]')
            .attributes('style'),
        ).toContain(expected.style)
      })

      it.each(casesColor)(
        'usa el color en las class de track e indicator con color=$input',
        ({ input, expected }) => {
          const wrapper = mountProgressCircular({ props: { color: input } })

          expect({
            track: wrapper.get('[data-test-progress-circular-track]').classes(),
            indicator: wrapper.get('[data-test-progress-circular-indicator]').classes(),
          }).toEqual({
            track: expect.arrayContaining(expected.class.track),
            indicator: expect.arrayContaining(expected.class.indicator),
          })
        },
      )
    })

    describe('trackColor', () => {
      it.each(casesTrackColor)(
        'resuelve trackColor=$input en el style de root',
        ({ input, expected }) => {
          expect(
            mountProgressCircular({ props: { trackColor: input } })
              .get('[data-test-progress-circular-root]')
              .attributes('style'),
          ).toContain(expected.style)
        },
      )

      it.each(casesTrackColor)(
        'aplica la class de color de track con trackColor=$input',
        ({ input, expected }) => {
          expect(
            mountProgressCircular({ props: { trackColor: input } })
              .get('[data-test-progress-circular-track]')
              .classes(),
          ).toEqual(expect.arrayContaining(expected.class.track))
        },
      )
    })

    describe('thickness', () => {
      it.each(casesThickness)(
        'calcula el r de track e indicator con thickness=$input',
        ({ input, expected }) => {
          const wrapper = mountProgressCircular({ props: { thickness: input } })

          expect({
            track: Number(wrapper.get('[data-test-progress-circular-track]').attributes('r')),
            indicator: Number(
              wrapper.get('[data-test-progress-circular-indicator]').attributes('r'),
            ),
          }).toEqual({ track: expected.attrs.track.r, indicator: expected.attrs.indicator.r })
        },
      )

      it.each(casesThickness)(
        'aplica el stroke-width de track e indicator con thickness=$input',
        ({ input, expected }) => {
          const wrapper = mountProgressCircular({ props: { thickness: input } })

          expect({
            track: Number(
              wrapper.get('[data-test-progress-circular-track]').attributes('stroke-width'),
            ),
            indicator: Number(
              wrapper.get('[data-test-progress-circular-indicator]').attributes('stroke-width'),
            ),
          }).toEqual({
            track: expected.attrs.track['stroke-width'],
            indicator: expected.attrs.indicator['stroke-width'],
          })
        },
      )

      it.each(casesThickness)(
        'calcula el stroke-dasharray de indicator con thickness=$input',
        ({ input, expected }) => {
          const indicator = mountProgressCircular({ props: { thickness: input } }).get(
            '[data-test-progress-circular-indicator]',
          )

          expect(Number(indicator.attributes('stroke-dasharray'))).toBeCloseTo(
            expected.attrs.indicator['stroke-dasharray'],
            2,
          )
        },
      )
    })

    describe('ui', () => {
      describe('svg', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.svg al svg',
          id: '[data-test-progress-circular-svg]',
          mount: (attrs) => mountProgressCircular({ props: { ui: { svg: () => attrs } } }),
        })
      })

      describe('track', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.track a la pista',
          id: '[data-test-progress-circular-track]',
          mount: (attrs) => mountProgressCircular({ props: { ui: { track: () => attrs } } }),
        })
      })

      describe('indicator', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.indicator al indicador',
          id: '[data-test-progress-circular-indicator]',
          mount: (attrs) => mountProgressCircular({ props: { ui: { indicator: () => attrs } } }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.label a la etiqueta',
          id: '[data-test-progress-circular-label]',
          mount: (attrs) =>
            mountProgressCircular({ props: { label: '35%', ui: { label: () => attrs } } }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-progress-circular-root]',
      mount: (attrs) => mountProgressCircular({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it.each(casesUpdateModelValue)(
        'reemite update:modelValue=$input desde Reka ProgressRoot',
        async ({ input, expected }) => {
          const wrapper = mountProgressCircular({ props: { modelValue: 20 } })

          wrapper.getComponent(ProgressRoot).vm.$emit('update:modelValue', input)
          await nextTick()

          expect(wrapper.emitted('update:modelValue')).toEqual(expected.emitted)
        },
      )
    })
  })

  describe('slots', () => {
    describe('label', () => {
      it.each(casesSlotLabel)(
        'renderiza el slot label en label con label=$input',
        ({ input, expected }) => {
          expect(
            mountProgressCircular({
              props: { label: input },
              slots: { label: () => 'Contenido del slot' },
            })
              .findAll('[data-test-progress-circular-label]')
              .map((label) => label.text()),
          ).toEqual(expected.text.label)
        },
      )
    })
  })

  describe('context', () => {
    it.each(casesContext)(
      'expone el contrato a ui y al slot label con modelValue=$input.modelValue y max=$input.max',
      ({ input, expected }) => {
        const contexts: Record<string, ProgressCircularContext> = {}
        const capture = (node: string) => (context: ProgressCircularContext) => {
          contexts[node] = context
          return {}
        }

        mountProgressCircular({
          props: {
            ...input,
            label: '35%',
            ui: {
              svg: capture('svg'),
              track: capture('track'),
              indicator: capture('indicator'),
              label: capture('label'),
            },
          },
          slots: {
            label: (context: ProgressCircularContext) => {
              contexts.slotLabel = context
              return 'Contenido del slot'
            },
          },
        })

        expect(contexts).toEqual({
          svg: expected,
          track: expected,
          indicator: expected,
          label: expected,
          slotLabel: expected,
        })
      },
    )
  })

  describe('nodos', () => {
    it.each(casesNodos)(
      'aplica las class y los attrs fijos al nodo $input',
      ({ input, expected }) => {
        const node = mountProgressCircular({ props: { label: '35%' } }).get(
          `[data-test-progress-circular-${input}]`,
        )

        expect({ class: node.classes(), attrs: node.attributes() }).toEqual({
          class: expect.arrayContaining(expected.class),
          attrs: expect.objectContaining(expected.attrs),
        })
      },
    )
  })
})
