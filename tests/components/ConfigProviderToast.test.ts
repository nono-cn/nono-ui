import { h, toRaw } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { createToastManager, ToastProvider, ToastViewport } from 'reka-ui'
import { describe, expect, it } from 'vitest'

import { ConfigProvider } from '@/components/provider'
import { i18n } from '@/i18n'
import type { ToastProviderProps, ToastViewportConfig } from '@/components/ui/Toast'

function mountToast(options: MountingOptions<ToastProviderProps> = {}) {
  return mount(ConfigProvider, {
    props: { toast: options.props },
    slots: options.slots,
    global: { plugins: [i18n] },
  })
}

function providerProps(options: MountingOptions<ToastProviderProps> = {}) {
  const provider = mountToast(options).getComponent(ToastProvider)
  expect(provider.vm.$attrs).toHaveProperty('data-test-toast-provider')
  return provider.props()
}

const casesDisableSwipe = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
]
const casesDuration = [
  { input: undefined, expected: 5000 },
  { input: 0, expected: 0 },
  { input: 1200, expected: 1200 },
  { input: Infinity, expected: Infinity },
]
const casesLabel = [
  { input: undefined, expected: 'Notification' },
  { input: 'Aviso', expected: 'Aviso' },
  { input: '', expected: '' },
]
const casesLimit = [undefined, 0, 1, 3]
const casesSwipeDirection = [
  { input: undefined, expected: 'right' },
  { input: 'right', expected: 'right' },
  { input: 'left', expected: 'left' },
  { input: 'down', expected: 'down' },
  { input: 'up', expected: 'up' },
] as const
const casesSwipeThreshold = [
  { input: undefined, expected: 50 },
  { input: 0, expected: 0 },
  { input: 75, expected: 75 },
]

describe('ConfigProvider > ToastProvider', () => {
  describe('props', () => {
    describe('disableSwipe', () => {
      it.each(casesDisableSwipe)('pasa $input a Reka como $expected', ({ input, expected }) => {
        expect(providerProps({ props: { disableSwipe: input } }).disableSwipe).toBe(expected)
      })
    })

    describe('duration', () => {
      it.each(casesDuration)('pasa $input a Reka como $expected', ({ input, expected }) => {
        expect(providerProps({ props: { duration: input } }).duration).toBe(expected)
      })
    })

    describe('label', () => {
      it.each(casesLabel)('pasa $input a Reka como $expected', ({ input, expected }) => {
        expect(providerProps({ props: { label: input } }).label).toBe(expected)
      })
    })

    describe('limit', () => {
      it.each(casesLimit)('pasa limit=%s a Reka', (limit) => {
        expect(providerProps({ props: { limit } }).limit).toBe(limit)
      })
    })

    describe('swipeDirection', () => {
      it.each(casesSwipeDirection)('pasa $input a Reka como $expected', ({ input, expected }) => {
        expect(providerProps({ props: { swipeDirection: input } }).swipeDirection).toBe(expected)
      })
    })

    describe('swipeThreshold', () => {
      it.each(casesSwipeThreshold)('pasa $input a Reka como $expected', ({ input, expected }) => {
        expect(providerProps({ props: { swipeThreshold: input } }).swipeThreshold).toBe(expected)
      })
    })

    describe('toastManager', () => {
      it('pasa undefined cuando no se proporciona un manager', () => {
        expect(providerProps().toastManager).toBeUndefined()
      })

      it('pasa la misma instancia del manager global a Reka', () => {
        const toastManager = createToastManager()
        expect(toRaw(providerProps({ props: { toastManager } }).toastManager)).toBe(toastManager)
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el contenido de la aplicación dentro del provider', () => {
        const wrapper = mountToast({
          slots: { default: () => h('span', { 'data-test-toast-content': '' }, 'Contenido') },
        })
        expect(wrapper.getComponent(ToastProvider).get('[data-test-toast-content]').text()).toBe(
          'Contenido',
        )
      })
    })
  })
})

describe('ConfigProvider > ToastViewport', () => {
  function mountViewport(toastViewport?: ToastViewportConfig) {
    return mount(ConfigProvider, {
      props: { toastViewport },
      global: { plugins: [i18n] },
    })
  }

  it('renderiza un único viewport con la posición y el atajo predeterminados', () => {
    const wrapper = mountViewport()
    const viewport = wrapper.getComponent(ToastViewport)
    expect(wrapper.findAll('[data-test-toast-viewport]')).toHaveLength(1)
    expect(viewport.props('hotkey')).toEqual(['F8'])
    expect(viewport.props('label')).toBe('Notifications ({hotkey})')
    expect(wrapper.get('[data-test-toast-viewport]').classes()).toEqual(
      expect.arrayContaining(['fixed', 'right-4', 'bottom-4', 'z-50', 'w-80']),
    )
  })

  it('pasa hotkey, label, class y style de toastViewport a Reka', () => {
    const wrapper = mountViewport({
      hotkey: ['altKey', 'KeyT'],
      label: 'Avisos ({hotkey})',
      class: 'fixed left-4 top-4',
      style: { color: 'red' },
    })
    const viewport = wrapper.getComponent(ToastViewport)
    expect(viewport.props('hotkey')).toEqual(['altKey', 'KeyT'])
    expect(viewport.props('label')).toBe('Avisos ({hotkey})')
    expect(wrapper.get('[data-test-toast-viewport]').classes()).toEqual(
      expect.arrayContaining(['fixed', 'left-4', 'top-4']),
    )
    expect(wrapper.get('[data-test-toast-viewport]').attributes('style')).toContain('color: red')
  })
})
