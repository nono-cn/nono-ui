import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { SliderRoot } from 'reka-ui'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import {
  Slider,
  sliderDefaults,
  type SliderContext,
  type SliderProps,
  type SliderThumbContext,
} from '@/components/ui/Slider'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'

// reka-ui mide cada thumb con ResizeObserver
vi.stubGlobal(
  'ResizeObserver',
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
)

const casesModelValue = [
  { input: undefined, expected: { reka: sliderDefaults.modelValue() } },
  { input: [30], expected: { reka: [30] } },
  { input: [20, 80], expected: { reka: [20, 80] } },
  { input: [10, 50, 90], expected: { reka: [10, 50, 90] } },
] satisfies Array<{ input: SliderProps['modelValue']; expected: { reka: number[] } }>

const casesMin = [
  { input: undefined, expected: { reka: sliderDefaults.min } },
  { input: 0, expected: { reka: 0 } },
  { input: 10, expected: { reka: 10 } },
] satisfies Array<{ input: SliderProps['min']; expected: { reka: number } }>

const casesMax = [
  { input: undefined, expected: { reka: sliderDefaults.max } },
  { input: 50, expected: { reka: 50 } },
  { input: 200, expected: { reka: 200 } },
] satisfies Array<{ input: SliderProps['max']; expected: { reka: number } }>

const casesStep = [
  { input: undefined, expected: { reka: sliderDefaults.step } },
  { input: 5, expected: { reka: 5 } },
  { input: 0.5, expected: { reka: 0.5 } },
] satisfies Array<{ input: SliderProps['step']; expected: { reka: number } }>

const casesMinStepsBetweenThumbs = [
  { input: undefined, expected: { reka: sliderDefaults.minStepsBetweenThumbs } },
  { input: 0, expected: { reka: 0 } },
  { input: 10, expected: { reka: 10 } },
] satisfies Array<{ input: SliderProps['minStepsBetweenThumbs']; expected: { reka: number } }>

const casesOrientation = [
  {
    input: undefined,
    expected: {
      reka: sliderDefaults.orientation,
      class: { root: ['w-full'], track: ['w-full', 'h-2'], range: ['h-full'] },
      notClass: { root: ['h-full', 'flex-col'], track: ['h-full', 'w-2'], range: ['w-full'] },
    },
  },
  {
    input: 'horizontal',
    expected: {
      reka: 'horizontal',
      class: { root: ['w-full'], track: ['w-full', 'h-2'], range: ['h-full'] },
      notClass: { root: ['h-full', 'flex-col'], track: ['h-full', 'w-2'], range: ['w-full'] },
    },
  },
  {
    input: 'vertical',
    expected: {
      reka: 'vertical',
      class: { root: ['h-full', 'flex-col'], track: ['h-full', 'w-2'], range: ['w-full'] },
      notClass: { root: ['w-full'], track: ['w-full', 'h-2'], range: ['h-full'] },
    },
  },
] satisfies Array<{
  input: SliderProps['orientation']
  expected: {
    reka: NonNullable<SliderProps['orientation']>
    class: { root: string[]; track: string[]; range: string[] }
    notClass: { root: string[]; track: string[]; range: string[] }
  }
}>

const casesInverted = [
  { input: undefined, expected: { reka: sliderDefaults.inverted } },
  { input: false, expected: { reka: false } },
  { input: true, expected: { reka: true } },
] satisfies Array<{ input: SliderProps['inverted']; expected: { reka: boolean } }>

const casesThumbAlignment = [
  { input: undefined, expected: { reka: sliderDefaults.thumbAlignment } },
  { input: 'contain', expected: { reka: 'contain' } },
  { input: 'overflow', expected: { reka: 'overflow' } },
] satisfies Array<{
  input: SliderProps['thumbAlignment']
  expected: { reka: NonNullable<SliderProps['thumbAlignment']> }
}>

const casesDisabled = [
  {
    input: undefined,
    expected: {
      reka: sliderDefaults.disabled,
      class: {
        root: [],
        thumb: ['cursor-grab', 'active:cursor-grabbing'],
      },
      notClass: {
        root: ['cursor-not-allowed', 'opacity-50'],
        thumb: ['cursor-not-allowed'],
      },
    },
  },
  {
    input: false,
    expected: {
      reka: false,
      class: {
        root: [],
        thumb: ['cursor-grab', 'active:cursor-grabbing'],
      },
      notClass: {
        root: ['cursor-not-allowed', 'opacity-50'],
        thumb: ['cursor-not-allowed'],
      },
    },
  },
  {
    input: true,
    expected: {
      reka: true,
      class: {
        root: ['cursor-not-allowed', 'opacity-50'],
        thumb: ['cursor-not-allowed'],
      },
      notClass: {
        root: [],
        thumb: ['cursor-grab', 'active:cursor-grabbing'],
      },
    },
  },
] satisfies Array<{
  input: SliderProps['disabled']
  expected: {
    reka: boolean
    class: { root: string[]; thumb: string[] }
    notClass: { root: string[]; thumb: string[] }
  }
}>

const casesName = [
  { input: undefined, expected: { reka: sliderDefaults.name } },
  { input: 'volume', expected: { reka: 'volume' } },
] satisfies Array<{ input: SliderProps['name']; expected: { reka: string | undefined } }>

const casesRequired = [
  { input: undefined, expected: { reka: sliderDefaults.required } },
  { input: false, expected: { reka: false } },
  { input: true, expected: { reka: true } },
] satisfies Array<{ input: SliderProps['required']; expected: { reka: boolean } }>

const casesSize = [
  {
    input: undefined,
    expected: { class: { track: { horizontal: ['h-2'], vertical: ['w-2'] }, thumb: ['size-4'] } },
  },
  {
    input: 'xs',
    expected: { class: { track: { horizontal: ['h-1'], vertical: ['w-1'] }, thumb: ['size-3'] } },
  },
  {
    input: 'sm',
    expected: {
      class: { track: { horizontal: ['h-1.5'], vertical: ['w-1.5'] }, thumb: ['size-3.5'] },
    },
  },
  {
    input: 'md',
    expected: { class: { track: { horizontal: ['h-2'], vertical: ['w-2'] }, thumb: ['size-4'] } },
  },
  {
    input: 'lg',
    expected: {
      class: { track: { horizontal: ['h-2.5'], vertical: ['w-2.5'] }, thumb: ['size-5'] },
    },
  },
  {
    input: 'xl',
    expected: { class: { track: { horizontal: ['h-3'], vertical: ['w-3'] }, thumb: ['size-6'] } },
  },
] satisfies Array<{
  input: SliderProps['size']
  expected: {
    class: { track: { horizontal: string[]; vertical: string[] }; thumb: string[] }
  }
}>

const casesColor = [
  {
    input: undefined,
    expected: {
      style: `--slider-color: var(--${sliderDefaults.color}, var(--primary))`,
      class: {
        track: ['bg-(--slider-color)/20'],
        range: ['bg-(--slider-color)'],
        thumb: ['border-(--slider-color)', 'focus-visible:ring-(--slider-color)/50'],
      },
    },
  },
  {
    input: 'success',
    expected: {
      style: '--slider-color: var(--success, var(--primary))',
      class: {
        track: ['bg-(--slider-color)/20'],
        range: ['bg-(--slider-color)'],
        thumb: ['border-(--slider-color)', 'focus-visible:ring-(--slider-color)/50'],
      },
    },
  },
  {
    input: '#ff0000',
    expected: {
      style: '--slider-color: #ff0000',
      class: {
        track: ['bg-(--slider-color)/20'],
        range: ['bg-(--slider-color)'],
        thumb: ['border-(--slider-color)', 'focus-visible:ring-(--slider-color)/50'],
      },
    },
  },
] satisfies Array<{
  input: SliderProps['color']
  expected: { style: string; class: { track: string[]; range: string[]; thumb: string[] } }
}>

const casesContext = [
  {
    name: 'por defecto',
    input: {},
    expected: { value: [0], disabled: false },
  },
  {
    name: 'con dos valores',
    input: { modelValue: [20, 80] },
    expected: { value: [20, 80], disabled: false },
  },
  {
    name: 'deshabilitado',
    input: { modelValue: [30], disabled: true },
    expected: { value: [30], disabled: true },
  },
] satisfies Array<{
  name: string
  input: Pick<SliderProps, 'modelValue' | 'disabled'>
  expected: SliderContext
}>

const casesThumbContext = [
  {
    name: 'con un thumb',
    input: { modelValue: [30] },
    expected: [{ value: 30, index: 0, disabled: false }],
  },
  {
    name: 'con dos thumbs',
    input: { modelValue: [20, 80] },
    expected: [
      { value: 20, index: 0, disabled: false },
      { value: 80, index: 1, disabled: false },
    ],
  },
  {
    name: 'deshabilitado',
    input: { modelValue: [20, 80], disabled: true },
    expected: [
      { value: 20, index: 0, disabled: true },
      { value: 80, index: 1, disabled: true },
    ],
  },
] satisfies Array<{
  name: string
  input: Pick<SliderProps, 'modelValue' | 'disabled'>
  expected: SliderThumbContext[]
}>

// las clases que leen --slider-color van en el test de color
const casesNodos = [
  {
    input: 'root',
    expected: {
      class: ['relative', 'flex', 'touch-none', 'items-center', 'select-none'],
      attrs: {},
    },
  },
  {
    input: 'track',
    expected: { class: ['relative', 'grow', 'overflow-hidden', 'rounded-full'], attrs: {} },
  },
  { input: 'range', expected: { class: ['absolute'], attrs: {} } },
  {
    input: 'thumb',
    expected: {
      class: [
        'block',
        'shrink-0',
        'rounded-full',
        'border-2',
        'bg-background',
        'shadow-sm',
        'transition-[color,box-shadow]',
        'outline-none',
        'focus-visible:ring-3',
      ],
      attrs: { 'aria-label': i18n.global.t('value_{n}_of_{total}', { n: 1, total: 2 }) },
    },
  },
] satisfies Array<{
  input: string
  expected: { class: string[]; attrs: Record<string, string> }
}>

// dos thumbs para que el primero se nombre "1 de 2"
function mountAllNodes() {
  return mountSlider({ props: { modelValue: [20, 80] } })
}

function mountSlider(options: ComponentMountingOptions<typeof Slider> = {}) {
  const { global, ...rest } = options
  return mount(Slider, {
    global: { ...global, plugins: [i18n, ...(global?.plugins ?? [])] },
    ...rest,
  })
}

describe('Slider', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesModelValue)(
        'pasa modelValue=$input a Reka SliderRoot',
        ({ input, expected }) => {
          const slider = mountSlider({ props: { modelValue: input } })

          expect(slider.getComponent(SliderRoot).props('modelValue')).toEqual(expected.reka)
        },
      )
    })

    describe('min', () => {
      it.each(casesMin)('pasa min=$input a Reka SliderRoot', ({ input, expected }) => {
        const slider = mountSlider({ props: { min: input } })

        expect(slider.getComponent(SliderRoot).props('min')).toBe(expected.reka)
      })
    })

    describe('max', () => {
      it.each(casesMax)('pasa max=$input a Reka SliderRoot', ({ input, expected }) => {
        const slider = mountSlider({ props: { max: input } })

        expect(slider.getComponent(SliderRoot).props('max')).toBe(expected.reka)
      })
    })

    describe('step', () => {
      it.each(casesStep)('pasa step=$input a Reka SliderRoot', ({ input, expected }) => {
        const slider = mountSlider({ props: { step: input } })

        expect(slider.getComponent(SliderRoot).props('step')).toBe(expected.reka)
      })
    })

    describe('minStepsBetweenThumbs', () => {
      it.each(casesMinStepsBetweenThumbs)(
        'pasa minStepsBetweenThumbs=$input a Reka SliderRoot',
        ({ input, expected }) => {
          const slider = mountSlider({ props: { minStepsBetweenThumbs: input } })

          expect(slider.getComponent(SliderRoot).props('minStepsBetweenThumbs')).toBe(expected.reka)
        },
      )
    })

    describe('orientation', () => {
      it.each(casesOrientation)(
        'pasa orientation=$input a Reka SliderRoot',
        ({ input, expected }) => {
          const slider = mountSlider({ props: { orientation: input } })

          expect(slider.getComponent(SliderRoot).props('orientation')).toBe(expected.reka)
        },
      )

      it.each(casesOrientation)(
        'aplica las class orientation=$input a root, track y range',
        ({ input, expected }) => {
          const slider = mountSlider({ props: { orientation: input } })
          const classesOf = (part: string) => slider.get(`[data-test-slider-${part}]`).classes()

          expect(classesOf('root')).toEqual(expect.arrayContaining(expected.class.root))
          expect(classesOf('track')).toEqual(expect.arrayContaining(expected.class.track))
          expect(classesOf('range')).toEqual(expect.arrayContaining(expected.class.range))
          expect(classesOf('root').filter((c) => expected.notClass.root.includes(c))).toEqual([])
          expect(classesOf('track').filter((c) => expected.notClass.track.includes(c))).toEqual([])
          expect(classesOf('range').filter((c) => expected.notClass.range.includes(c))).toEqual([])
        },
      )
    })

    describe('inverted', () => {
      it.each(casesInverted)('pasa inverted=$input a Reka SliderRoot', ({ input, expected }) => {
        const slider = mountSlider({ props: { inverted: input } })

        expect(slider.getComponent(SliderRoot).props('inverted')).toBe(expected.reka)
      })
    })

    describe('thumbAlignment', () => {
      it.each(casesThumbAlignment)(
        'pasa thumbAlignment=$input a Reka SliderRoot',
        ({ input, expected }) => {
          const slider = mountSlider({ props: { thumbAlignment: input } })

          expect(slider.getComponent(SliderRoot).props('thumbAlignment')).toBe(expected.reka)
        },
      )
    })

    describe('disabled', () => {
      it.each(casesDisabled)('pasa disabled=$input a Reka SliderRoot', ({ input, expected }) => {
        const slider = mountSlider({ props: { disabled: input } })

        expect(slider.getComponent(SliderRoot).props('disabled')).toBe(expected.reka)
      })

      it.each(casesDisabled)(
        'aplica los estilos de disabled a root y al thumb con disabled=$input',
        ({ input, expected }) => {
          const slider = mountSlider({ props: { disabled: input } })
          const classesOf = (part: string) => slider.get(`[data-test-slider-${part}]`).classes()

          expect(classesOf('root')).toEqual(expect.arrayContaining(expected.class.root))
          expect(classesOf('thumb')).toEqual(expect.arrayContaining(expected.class.thumb))
          expect(classesOf('root').filter((c) => expected.notClass.root.includes(c))).toEqual([])
          expect(classesOf('thumb').filter((c) => expected.notClass.thumb.includes(c))).toEqual([])
        },
      )
    })

    describe('name', () => {
      it.each(casesName)('pasa name=$input a Reka SliderRoot', ({ input, expected }) => {
        const slider = mountSlider({ props: { name: input } })

        expect(slider.getComponent(SliderRoot).props('name')).toBe(expected.reka)
      })
    })

    describe('required', () => {
      it.each(casesRequired)('pasa required=$input a Reka SliderRoot', ({ input, expected }) => {
        const slider = mountSlider({ props: { required: input } })

        expect(slider.getComponent(SliderRoot).props('required')).toBe(expected.reka)
      })
    })

    describe('size', () => {
      it.each(casesSize)(
        'aplica size=$input a la pista horizontal y vertical y al thumb',
        ({ input, expected }) => {
          const horizontal = mountSlider({ props: { size: input } })
          const vertical = mountSlider({ props: { size: input, orientation: 'vertical' } })

          expect(horizontal.get('[data-test-slider-track]').classes()).toEqual(
            expect.arrayContaining(expected.class.track.horizontal),
          )
          expect(vertical.get('[data-test-slider-track]').classes()).toEqual(
            expect.arrayContaining(expected.class.track.vertical),
          )
          expect(horizontal.get('[data-test-slider-thumb]').classes()).toEqual(
            expect.arrayContaining(expected.class.thumb),
          )
        },
      )
    })

    describe('color', () => {
      it.each(casesColor)(
        'resuelve color=$input en la raíz y lo usa en la pista, el rango y el thumb',
        ({ input, expected }) => {
          const slider = mountSlider({ props: { color: input } })
          const classesOf = (part: string) => slider.get(`[data-test-slider-${part}]`).classes()

          expect(slider.get('[data-test-slider-root]').attributes('style')).toContain(
            expected.style,
          )
          expect(classesOf('track')).toEqual(expect.arrayContaining(expected.class.track))
          expect(classesOf('range')).toEqual(expect.arrayContaining(expected.class.range))
          expect(classesOf('thumb')).toEqual(expect.arrayContaining(expected.class.thumb))
        },
      )
    })

    describe('ui', () => {
      describe('track', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.track a la pista',
          id: '[data-test-slider-track]',
          mount: (attrs) => mountSlider({ props: { ui: { track: () => attrs } } }),
        })
      })

      describe('range', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.range al rango',
          id: '[data-test-slider-range]',
          mount: (attrs) => mountSlider({ props: { ui: { range: () => attrs } } }),
        })
      })

      describe('thumb', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.thumb al thumb',
          id: '[data-test-slider-thumb]',
          mount: (attrs) => mountSlider({ props: { ui: { thumb: () => attrs } } }),
        })
      })
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it('reemite el valor cuando Reka SliderRoot cambia modelValue', async () => {
        const slider = mountSlider({ props: { modelValue: [20] } })

        slider.getComponent(SliderRoot).vm.$emit('update:modelValue', [40])
        await nextTick()

        expect(slider.emitted('update:modelValue')).toEqual([[[40]]])
      })
    })

    describe('change', () => {
      it('emite change cuando Reka SliderRoot cambia modelValue', async () => {
        const slider = mountSlider({ props: { modelValue: [20] } })

        slider.getComponent(SliderRoot).vm.$emit('update:modelValue', [40])
        await nextTick()

        expect(slider.emitted('change')).toEqual([[[40]]])
      })

      it('no emite change cuando Reka SliderRoot repite el valor actual', async () => {
        const slider = mountSlider({ props: { modelValue: [20, 80] } })

        slider.getComponent(SliderRoot).vm.$emit('update:modelValue', [20, 80])
        await nextTick()

        expect(slider.emitted('change')).toBeUndefined()
      })

      it('no emite change cuando modelValue cambia desde fuera', async () => {
        const slider = mountSlider({ props: { modelValue: [20] } })

        await slider.setProps({ modelValue: [60] })

        expect(slider.emitted('change')).toBeUndefined()
      })
    })
  })

  describe('nodos', () => {
    it.each(casesNodos)(
      'aplica las clases y los atributos fijos al nodo $input',
      ({ input, expected }) => {
        const node = mountAllNodes().get(`[data-test-slider-${input}]`)

        expect({ class: node.classes(), attrs: node.attributes() }).toEqual({
          class: expect.arrayContaining(expected.class),
          attrs: expect.objectContaining(expected.attrs),
        })
      },
    )
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-slider-root]',
      mount: (attrs) => mountSlider({ attrs }),
    })
  })

  describe('context contract', () => {
    describe('SliderContext', () => {
      it.each(casesContext)(
        'pasa el contexto $name a ui.track y ui.range',
        ({ input, expected }) => {
          const ui = { track: vi.fn(() => ({})), range: vi.fn(() => ({})) }

          mountSlider({ props: { ...input, ui } })

          expect({
            'ui.track': ui.track.mock.calls,
            'ui.range': ui.range.mock.calls,
          }).toEqual({
            'ui.track': [[expected]],
            'ui.range': [[expected]],
          })
        },
      )
    })

    describe('SliderThumbContext', () => {
      it.each(casesThumbContext)(
        'pasa el contexto de cada thumb $name a ui.thumb',
        ({ input, expected }) => {
          const ui = { thumb: vi.fn(() => ({})) }

          mountSlider({ props: { ...input, ui } })

          expect(ui.thumb.mock.calls.map(([context]) => context)).toEqual(expected)
        },
      )
    })
  })
})
