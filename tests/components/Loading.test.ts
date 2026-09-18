import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { i18n } from '@/i18n'
import { Loading, type LoadingContext, type LoadingProps } from '@/components/ui/Loading'
import { testIconConfig } from '../utils/testIconConfig'
import { testAttrs } from '../utils/testAttrs'

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
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: true },
      ])('renderiza loading=$input como aria-busy=$expected', ({ input, expected }) => {
        const loading = mountLoading({ props: { loading: input } })

        expect(loading.get('[data-test-loading-root]').attributes('aria-busy')).toBe(
          String(expected),
        )
        expect(loading.get('[data-test-loading-loading]').isVisible()).toBe(expected)
        expect(loading.get('[data-test-loading-content]').isVisible()).toBe(!expected)
      })
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
  })

  describe('context contract', () => {
    it.each([
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: true },
    ])('pasa loading=$input como $expected', ({ input, expected }) => {
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

  describe('slots', () => {
    it('pasa el contexto al slot loading', () => {
      const loading = mountLoading({
        props: { loading: true },
        slots: {
          loading: (context: LoadingContext) =>
            h('span', { 'data-test-loading-slot': '' }, `loading:${context.loading}`),
        },
      })

      expect(loading.get('[data-test-loading-slot]').text()).toBe('loading:true')
    })

    it('pasa el contexto al slot por defecto', () => {
      const loading = mountLoading({
        props: { loading: false },
        slots: {
          default: (context: LoadingContext) =>
            h('span', { 'data-test-content-slot': '' }, `loading:${context.loading}`),
        },
      })

      expect(loading.get('[data-test-content-slot]').text()).toBe('loading:false')
    })
  })
})
