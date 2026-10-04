import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { i18n } from '@/i18n'
import { Loading, type LoadingContext, type LoadingProps } from '@/components/ui/Loading'
import { Icon, type IconName } from '@/components/ui/Icon'
import { testAttrs } from '../utils/testAttrs'

const casesLoading = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: true },
]

const casesIcon = [
  { input: 'spinner', expected: 'spinner' },
  { input: 'star', expected: 'star' },
  { input: undefined, expected: 'spinner' },
] satisfies { input: IconName | undefined; expected: IconName }[]

function mountLoading(options: MountingOptions<LoadingProps> = {}) {
  return mount(Loading, {
    ...options,
    global: {
      plugins: [i18n],
      ...options.global,
    },
  })
}

describe('Loading', () => {
  describe('props', () => {
    describe('loading', () => {
      it.each(casesLoading)(
        'renderiza loading=$input como aria-busy=$expected',
        ({ input, expected }) => {
          const loading = mountLoading({ props: { loading: input } })

          expect(loading.get('[data-test-loading-root]').attributes('aria-busy')).toBe(
            String(expected),
          )
          expect(loading.get('[data-test-loading-loading]').isVisible()).toBe(expected)
          expect(loading.get('[data-test-loading-content]').isVisible()).toBe(!expected)
        },
      )
    })

    describe('icon', () => {
      it.each(casesIcon)('pasa icon=$input a Icon como $expected', ({ input, expected }) => {
        const loading = mountLoading({ props: { icon: input } })

        expect(loading.getComponent(Icon).props('name')).toBe(expected)
      })
    })

    describe('ui', () => {
      describe('loading', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.loading',
          id: '[data-test-loading-loading]',
          mount: (attrs) =>
            mountLoading({
              props: { loading: true, ui: { loading: () => attrs } },
            }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.content',
          id: '[data-test-loading-content]',
          mount: (attrs) =>
            mountLoading({
              props: { loading: false, ui: { content: () => attrs } },
            }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'reenvia atributos arbitrarios, class y style a la raiz',
      id: '[data-test-loading-root]',
      mount: (attrs) => mountLoading({ attrs }),
    })
  })

  describe('variantsCss', () => {
    describe('loadingVariants', () => {
      it('aplica las clases base a la raíz', () => {
        expect(mountLoading().get('[data-test-loading-root]').classes()).toContain('w-full')
      })
    })

    describe('loadingIndicatorVariants', () => {
      it('centra el indicador de carga', () => {
        expect(mountLoading().get('[data-test-loading-loading]').classes()).toEqual(
          expect.arrayContaining(['flex', 'w-full', 'items-center', 'justify-center']),
        )
      })
    })

    describe('loadingContentVariants', () => {
      it('ocupa el ancho disponible para el contenido', () => {
        expect(mountLoading().get('[data-test-loading-content]').classes()).toContain('w-full')
      })
    })

    describe('loadingIconVariants', () => {
      it('anima el icono predeterminado', () => {
        expect(mountLoading().get('[data-test-loading-icon]').classes()).toContain('animate-spin')
      })
    })
  })

  describe('slots', () => {
    describe('loading', () => {
      it('renderiza el slot y reemplaza el icono por defecto', () => {
        const loading = mountLoading({
          props: { loading: true },
          slots: {
            loading: (context: LoadingContext) =>
              h('span', { 'data-test-loading-slot': '' }, `loading:${context.loading}`),
          },
        })

        expect(loading.get('[data-test-loading-slot]').text()).toBe('loading:true')
        expect(loading.find('[data-test-loading-icon]').exists()).toBe(false)
      })
    })

    describe('content', () => {
      it('renderiza el slot por defecto dentro del contenido', () => {
        const loading = mountLoading({
          props: { loading: false },
          slots: {
            default: (context: LoadingContext) =>
              h('span', { 'data-test-content-slot': '' }, `loading:${context.loading}`),
          },
        })

        expect(loading.get('[data-test-content-slot]').text()).toBe('loading:false')
        expect(loading.get('[data-test-loading-content]').text()).toBe('loading:false')
      })
    })
  })

  describe('context contract', () => {
    it.each(casesLoading)('pasa loading=$input a los resolvers de ui', ({ input, expected }) => {
      let indicatorContext: LoadingContext | undefined
      let contentContext: LoadingContext | undefined

      mountLoading({
        props: {
          loading: input,
          ui: {
            loading: (context) => {
              indicatorContext = context
              return {}
            },
            content: (context) => {
              contentContext = context
              return {}
            },
          },
        },
      })

      expect(indicatorContext).toEqual({ loading: expected } satisfies LoadingContext)
      expect(contentContext).toEqual({ loading: expected } satisfies LoadingContext)
    })

    it.each(casesLoading)('pasa loading=$input como $expected', ({ input, expected }) => {
      let context: LoadingContext | undefined

      mountLoading({
        props: { loading: input },
        slots: {
          default: (slotContext: LoadingContext) => {
            context = slotContext
            return h('span', 'Contenido')
          },
        },
      })

      expect(context).toEqual({ loading: expected })
    })
  })
})
