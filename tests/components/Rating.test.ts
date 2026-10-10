import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { RatingItem, RatingRoot } from 'reka-ui'
import { h } from 'vue'

import {
  Rating,
  ratingSizes,
  type RatingItemContext,
  type RatingProps,
  type RatingSize,
} from '@/components/ui/Rating'
import { themeColors } from '@/components/ui/constants'
import { Icon } from '@/components/ui/Icon'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountRating(options: MountingOptions<RatingProps> = {}) {
  return mount(Rating, {
    ...options,
    global: { plugins: [i18n], ...options.global },
  })
}

const casesModelValue = [
  { input: undefined, expected: undefined },
  { input: 0, expected: 0 },
  { input: 2.5, expected: 2.5 },
  { input: 5, expected: 5 },
] satisfies Array<{ input: RatingProps['modelValue']; expected: number | undefined }>

const casesLength = [
  { input: undefined, expected: 5 },
  { input: 1, expected: 1 },
  { input: 3, expected: 3 },
  { input: 7, expected: 7 },
] satisfies Array<{ input: RatingProps['length']; expected: number }>

const casesStep = [
  { input: undefined, expected: { value: 1, indicators: 2 } },
  { input: 0.5, expected: { value: 0.5, indicators: 4 } },
  { input: 1, expected: { value: 1, indicators: 2 } },
] satisfies Array<{
  input: RatingProps['step']
  expected: { value: number; indicators: number }
}>

const casesClearable = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{ input: RatingProps['clearable']; expected: boolean }>

const casesHoverable = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{ input: RatingProps['hoverable']; expected: boolean }>

const casesLoop = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{ input: RatingProps['loop']; expected: boolean }>

const casesDisabled = [
  { input: undefined, expected: { rekaDisabled: false, rootOpacity: false } },
  { input: false, expected: { rekaDisabled: false, rootOpacity: false } },
  { input: true, expected: { rekaDisabled: true, rootOpacity: true } },
] satisfies Array<{
  input: RatingProps['disabled']
  expected: { rekaDisabled: boolean; rootOpacity: boolean }
}>

const casesReadonly = [
  {
    input: undefined,
    expected: { rekaDisabled: false, ariaReadonly: undefined, rootOpacity: false },
  },
  { input: false, expected: { rekaDisabled: false, ariaReadonly: undefined, rootOpacity: false } },
  { input: true, expected: { rekaDisabled: true, ariaReadonly: 'true', rootOpacity: true } },
] satisfies Array<{
  input: RatingProps['readonly']
  expected: { rekaDisabled: boolean; ariaReadonly: string | undefined; rootOpacity: boolean }
}>

const casesRequired = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{ input: RatingProps['required']; expected: boolean }>

const casesName = [
  { input: undefined, expected: undefined },
  { input: '', expected: '' },
  { input: 'product-rating', expected: 'product-rating' },
] satisfies Array<{ input: RatingProps['name']; expected: string | undefined }>

const casesOrientation = [
  { input: undefined, expected: { value: 'horizontal', className: 'flex-row' } },
  { input: 'horizontal', expected: { value: 'horizontal', className: 'flex-row' } },
  { input: 'vertical', expected: { value: 'vertical', className: 'flex-col' } },
] satisfies Array<{
  input: RatingProps['orientation']
  expected: { value: string; className: string }
}>

const sizeClasses: Record<RatingSize, { root: string; item: string; icon: string }> = {
  xs: { root: 'gap-0.5', item: 'size-5', icon: 'size-4' },
  sm: { root: 'gap-0.5', item: 'size-6', icon: 'size-5' },
  md: { root: 'gap-1', item: 'size-8', icon: 'size-6' },
  lg: { root: 'gap-1.5', item: 'size-10', icon: 'size-8' },
  xl: { root: 'gap-2', item: 'size-12', icon: 'size-10' },
}
const casesSize = [
  { input: undefined, expected: sizeClasses.md },
  ...ratingSizes.map((input) => ({ input, expected: sizeClasses[input] })),
] satisfies Array<{
  input: RatingProps['size']
  expected: { root: string; item: string; icon: string }
}>

const casesIcon = [
  { input: undefined, expected: 'star' },
  { input: 'star', expected: 'star' },
  { input: 'heart', expected: 'heart' },
] satisfies Array<{ input: RatingProps['icon']; expected: RatingProps['icon'] }>

const casesUpdateModelValue = [
  { input: 0, expected: [[0]] },
  { input: 2.5, expected: [[2.5]] },
  { input: 5, expected: [[5]] },
] satisfies Array<{ input: number; expected: number[][] }>

const casesRatingItemContext = [
  {
    name: 'paso entero predeterminado',
    input: { length: 1, step: 1, size: undefined },
    expected: [
      {
        item: 1,
        step: 1,
        percentage: 100,
        iconClass:
          'absolute fill-transparent group-data-[state=active]:fill-current top-1 left-1 size-6',
      },
    ],
  },
  {
    name: 'medios pasos',
    input: { length: 1, step: 0.5, size: undefined },
    expected: [
      {
        item: 1,
        step: 0.5,
        percentage: 50,
        iconClass:
          'absolute fill-transparent group-data-[state=active]:fill-current top-1 left-1 size-6',
      },
      {
        item: 1,
        step: 1,
        percentage: 100,
        iconClass:
          'absolute fill-transparent group-data-[state=active]:fill-current top-1 left-1 size-6',
      },
    ],
  },
  {
    name: 'varios items y tamaño xs',
    input: { length: 2, step: 1, size: 'xs' },
    expected: [
      {
        item: 1,
        step: 1,
        percentage: 100,
        iconClass:
          'absolute fill-transparent group-data-[state=active]:fill-current top-0.5 left-0.5 size-4',
      },
      {
        item: 2,
        step: 2,
        percentage: 100,
        iconClass:
          'absolute fill-transparent group-data-[state=active]:fill-current top-0.5 left-0.5 size-4',
      },
    ],
  },
] satisfies Array<{
  name: string
  input: Pick<RatingProps, 'length' | 'step' | 'size'>
  expected: RatingItemContext[]
}>

describe('Rating', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesModelValue)(
        'pasa modelValue=$input a Reka RatingRoot',
        ({ input, expected }) => {
          expect(
            mountRating({ props: { modelValue: input } })
              .getComponent(RatingRoot)
              .props('modelValue'),
          ).toBe(expected)
        },
      )
    })

    describe('length', () => {
      it.each(casesLength)(
        'pasa length=$input y renderiza $expected items',
        ({ input, expected }) => {
          const rating = mountRating({ props: { length: input } })
          expect(rating.getComponent(RatingRoot).props('length')).toBe(expected)
          expect(rating.findAll('[data-test-rating-item]')).toHaveLength(expected)
        },
      )
    })

    describe('step', () => {
      it.each(casesStep)('pasa step=$input y renderiza los indicadores', ({ input, expected }) => {
        const rating = mountRating({ props: { step: input, length: 2 } })
        expect(rating.getComponent(RatingRoot).props('step')).toBe(expected.value)
        expect(rating.findAll('[data-test-rating-item-indicator]')).toHaveLength(
          expected.indicators,
        )
      })
    })

    describe('clearable', () => {
      it.each(casesClearable)('pasa clearable=$input a Reka RatingRoot', ({ input, expected }) => {
        expect(
          mountRating({ props: { clearable: input } })
            .getComponent(RatingRoot)
            .props('clearable'),
        ).toBe(expected)
      })
    })

    describe('hoverable', () => {
      it.each(casesHoverable)('pasa hoverable=$input a Reka RatingRoot', ({ input, expected }) => {
        expect(
          mountRating({ props: { hoverable: input } })
            .getComponent(RatingRoot)
            .props('hoverable'),
        ).toBe(expected)
      })
    })

    describe('loop', () => {
      it.each(casesLoop)('pasa loop=$input a Reka RatingRoot', ({ input, expected }) => {
        expect(
          mountRating({ props: { loop: input } })
            .getComponent(RatingRoot)
            .props('loop'),
        ).toBe(expected)
      })
    })

    describe('disabled', () => {
      it.each(casesDisabled)('normaliza disabled=$input', ({ input, expected }) => {
        const rating = mountRating({ props: { disabled: input } })
        expect(rating.getComponent(RatingRoot).props('disabled')).toBe(expected.rekaDisabled)
        expect(rating.get('[data-test-rating-root]').classes().includes('opacity-50')).toBe(
          expected.rootOpacity,
        )
      })
    })

    describe('readonly', () => {
      it.each(casesReadonly)('normaliza readonly=$input', ({ input, expected }) => {
        const rating = mountRating({ props: { readonly: input } })
        const root = rating.get('[data-test-rating-root]')
        expect(rating.getComponent(RatingRoot).props('disabled')).toBe(expected.rekaDisabled)
        expect(root.attributes('aria-readonly')).toBe(expected.ariaReadonly)
        expect(root.classes().includes('opacity-100')).toBe(expected.rootOpacity)
      })

      it('mantiene la apariencia disabled cuando disabled y readonly son true', () => {
        const rating = mountRating({ props: { disabled: true, readonly: true } })
        const root = rating.get('[data-test-rating-root]')
        expect(rating.getComponent(RatingRoot).props('disabled')).toBe(true)
        expect(root.attributes('aria-readonly')).toBe('true')
        expect(root.classes()).toContain('opacity-50')
        expect(root.classes()).not.toContain('opacity-100')
      })
    })

    describe('required', () => {
      it.each(casesRequired)('pasa required=$input a Reka RatingRoot', ({ input, expected }) => {
        expect(
          mountRating({ props: { required: input } })
            .getComponent(RatingRoot)
            .props('required'),
        ).toBe(expected)
      })
    })

    describe('name', () => {
      it.each(casesName)('pasa name=$input a Reka RatingRoot', ({ input, expected }) => {
        expect(
          mountRating({ props: { name: input } })
            .getComponent(RatingRoot)
            .props('name'),
        ).toBe(expected)
      })
    })

    describe('orientation', () => {
      it.each(casesOrientation)('aplica orientation=$input', ({ input, expected }) => {
        const rating = mountRating({ props: { orientation: input } })
        expect(rating.getComponent(RatingRoot).props('orientation')).toBe(expected.value)
        expect(rating.get('[data-test-rating-root]').classes()).toContain(expected.className)
      })
    })

    describe('size', () => {
      it.each(casesSize)('aplica size=$input a raíz, item e icono', ({ input, expected }) => {
        const rating = mountRating({ props: { size: input } })
        expect(rating.get('[data-test-rating-root]').classes()).toContain(expected.root)
        expect(rating.getComponent(RatingItem).classes()).toContain(expected.item)
        expect(rating.getComponent(Icon).classes()).toContain(expected.icon)
      })
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color',
        id: '[data-test-rating-root]',
        varColor: '--rating-color',
        defaultColor: 'var(--primary, var(--primary))',
        theme: {
          colors: themeColors,
          foregroundVar: '--rating-color-foreground',
          solidVar: '--rating-solid',
          solidForegroundVar: '--rating-solid-foreground',
        },
        mount: (color) => mountRating({ props: { color } }),
      })
    })

    describe('icon', () => {
      it.each(casesIcon)('pasa icon=$input a Icon.name', ({ input, expected }) => {
        expect(
          mountRating({ props: { icon: input } })
            .getComponent(Icon)
            .props('name'),
        ).toBe(expected)
      })
    })

    describe('ui', () => {
      describe('item', () => {
        testAttrs({
          text: 'pasa attrs, class y style al RatingItem',
          id: '[data-test-rating-item]',
          mount: (attrs) => mountRating({ props: { ui: { item: () => attrs } } }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-rating-root]',
      mount: (attrs) => mountRating({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it.each(casesUpdateModelValue)(
        'reemite update:modelValue=$input desde Reka RatingRoot',
        ({ input, expected }) => {
          const rating = mountRating()

          rating.getComponent(RatingRoot).vm.$emit('update:modelValue', input)

          expect(rating.emitted('update:modelValue')).toEqual(expected)
        },
      )
    })
  })

  describe('slots', () => {
    describe('item', () => {
      it('sustituye el icono y muestra el contenido del slot', () => {
        const rating = mountRating({
          props: { length: 1 },
          slots: {
            item: () => h('span', { 'data-test-custom-rating-item': '' }, 'Contenido propio'),
          },
        })

        expect(rating.find('[data-test-rating-icon]').exists()).toBe(false)
        expect(rating.get('[data-test-custom-rating-item]').text()).toBe('Contenido propio')
      })
    })
  })

  describe('context', () => {
    describe('ratingItemContext', () => {
      it.each(casesRatingItemContext)('expone el contrato para $name', ({ input, expected }) => {
        const contexts: RatingItemContext[] = []

        mountRating({
          props: input,
          slots: {
            item: ({ item, step, percentage, iconClass }) => {
              contexts.push({ item, step, percentage, iconClass })
              return h('span', 'Item')
            },
          },
        })

        expect(contexts).toEqual(expected)
      })
    })
  })

  describe('variantsCss', () => {
    describe('ratingRootVariants', () => {
      it('aplica las clases base a la raíz', () => {
        expect(mountRating().get('[data-test-rating-root]').classes()).toContain('flex')
      })
    })

    describe('ratingItemVariants', () => {
      it('aplica las clases base a los items', () => {
        expect(mountRating().get('[data-test-rating-item]').classes()).toEqual(
          expect.arrayContaining(['relative', 'inline-flex', 'transition-transform']),
        )
      })
    })

    describe('ratingIndicatorVariants', () => {
      it('aplica las clases base a los indicadores', () => {
        expect(mountRating().get('[data-test-rating-item-indicator]').classes()).toEqual(
          expect.arrayContaining([
            'group',
            'absolute',
            'text-(--rating-color)',
            'focus-visible:ring-2',
          ]),
        )
      })
    })

    describe('ratingIconVariants', () => {
      it('aplica las clases base al icono', () => {
        expect(mountRating().get('[data-test-rating-icon]').classes()).toEqual(
          expect.arrayContaining([
            'absolute',
            'fill-transparent',
            'group-data-[state=active]:fill-current',
          ]),
        )
      })
    })
  })
})
