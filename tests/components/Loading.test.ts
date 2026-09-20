import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { i18n } from '@/i18n'
import { Loading, type LoadingContext, type LoadingProps } from '@/components/ui/Loading'
import { testIconConfig } from '../utils/testIconConfig'
import { testAttrs } from '../utils/testAttrs'

const casesLoading = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: true },
]

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
      testIconConfig({
        text: 'pasa las props del icono',
        id: '[data-test-loading-icon]',
        default: 'spinner',
        mount: (input) => mountLoading({ props: { loading: true, icon: input } }),
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

    describe('aria-label', () => {
      it.each(casesLoading)('solo es accesible mientras loading=$input', ({ input, expected }) => {
        const loading = mountLoading({
          props: { loading: input },
          attrs: { 'aria-label': 'Cargando usuarios' },
        })

        expect(loading.get('[data-test-loading-root]').attributes('aria-label')).toBe(
          expected ? 'Cargando usuarios' : undefined,
        )
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
