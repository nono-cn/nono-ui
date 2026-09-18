import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'

import { Avatar, type AvatarProps } from '@/components/ui/Avatar'
import { testAttrs } from '../utils/testAttrs'
import { testIconConfig, testIconSize } from '../utils/testIconConfig'

function mountAvatar(options: MountingOptions<AvatarProps> = {}) {
  return mount(Avatar, options)
}

const casesSize = [
  { input: 'xs' as const, expected: ['size-6', 'text-xs'] },
  { input: 'sm' as const, expected: ['size-8', 'text-sm'] },
  { input: 'md' as const, expected: ['size-10', 'text-base'] },
  { input: 'lg' as const, expected: ['size-12', 'text-lg'] },
  { input: undefined, expected: ['size-10', 'text-base'] },
]

const casesShape = [
  { input: 'rounded' as const, expected: 'rounded-full' },
  { input: 'square' as const, expected: 'rounded-none' },
  { input: undefined, expected: 'rounded-full' },
]

const casesLabel = [
  { input: 'AL', expected: 'AL' },
  { input: undefined, expected: '' },
]

describe('Avatar', () => {
  describe('props', () => {
    describe('size', () => {
      it.each(casesSize)('renderiza size=$input', ({ input, expected }) => {
        const root = mountAvatar({ props: { size: input } }).get('[data-test-avatar-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('shape', () => {
      it.each(casesShape)('renderiza shape=$input', ({ input, expected }) => {
        const root = mountAvatar({ props: { shape: input } }).get('[data-test-avatar-root]')

        expect(root.classes()).toContain(expected)
      })
    })

    describe('src', () => {
      it('renderiza los atributos de la imagen', () => {
        const avatar = mountAvatar({
          props: { src: 'avatar.png' },
        })
        const image = avatar.get('[data-test-avatar-image]')

        expect(image.attributes('src')).toBe('avatar.png')
      })
    })

    describe('delayMs', () => {
      it('pasa delayMs a AvatarFallback', async () => {
        vi.useFakeTimers()

        try {
          const avatar = mountAvatar({ props: { delayMs: 300 } })

          vi.advanceTimersByTime(300)
          await nextTick()

          expect(avatar.getComponent('[data-test-avatar-fallback]').props('delayMs')).toBe(300)
        } finally {
          vi.useRealTimers()
        }
      })
    })

    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input en AvatarFallback', ({ input, expected }) => {
        expect(mountAvatar({ props: { label: input } }).text()).toBe(expected)
      })
    })

    describe('icon', () => {
      testIconConfig({
        text: 'pasa las props del objeto icon',
        id: '[data-test-avatar-icon]',
        mount: (input) => mountAvatar({ props: { icon: input } }),
      })

      testIconSize({
        text: 'pasa el tamaño de icon',
        id: '[data-test-avatar-icon]',
        input: 'sm',
        mount: (size) => mountAvatar({ props: { icon: { name: 'info', size } } }),
      })
    })
  })

  describe('internal props', () => {
    it('usa la configuración fija de la raíz', () => {
      const root = mountAvatar().getComponent('[data-test-avatar-root]')

      expect(root.props('as')).toBe('span')
      expect(root.props('asChild')).toBe(false)
    })

    it('usa la configuración fija de la imagen', () => {
      const image = mountAvatar({ props: { src: 'avatar.png' } }).getComponent(
        '[data-test-avatar-image]',
      )

      expect(image.props('as')).toBe('img')
      expect(image.props('asChild')).toBe(false)
    })

    it('usa la configuración fija del contenido alternativo', () => {
      const fallback = mountAvatar().getComponent('[data-test-avatar-fallback]')

      expect(fallback.props('as')).toBe('div')
      expect(fallback.props('asChild')).toBe(false)
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos a AvatarImage',
      id: '[data-test-avatar-image]',
      mount: (attrs) => mountAvatar({ props: { src: 'avatar.png' }, attrs }),
    })

    testAttrs({
      text: 'pasa los atributos a AvatarFallback',
      id: '[data-test-avatar-fallback]',
      mount: (attrs) => mountAvatar({ props: { label: 'AL' }, attrs }),
    })
  })

  describe('slots', () => {
    it('renderiza el slot alternativo', () => {
      const avatar = mountAvatar({
        slots: { fallback: () => h('span', { 'data-test-avatar-slot': '' }, 'Custom fallback') },
      })

      expect(avatar.get('[data-test-avatar-slot]').text()).toBe('Custom fallback')
    })
  })
})
