import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'

import { Avatar, type AvatarProps } from '@/components/ui/Avatar'
import { themeColors } from '@/components/ui/constants'
import { Icon } from '@/components/ui/Icon'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'
import { testRadius } from '../utils/testRadius'

function mountAvatar(options: MountingOptions<AvatarProps> = {}) {
  return mount(Avatar, options)
}

const casesSize = [
  { input: 'xs' as const, expected: ['size-6', 'text-xs'] },
  { input: 'sm' as const, expected: ['size-8', 'text-sm'] },
  { input: 'md' as const, expected: ['size-10', 'text-base'] },
  { input: 'lg' as const, expected: ['size-12', 'text-lg'] },
  { input: 'xl' as const, expected: ['size-16', 'text-xl'] },
  { input: undefined, expected: ['size-10', 'text-base'] },
]

const casesAlt = [
  { input: 'Profile photo of NC', expected: 'Profile photo of NC' },
  { input: '', expected: '' },
  { input: undefined, expected: '' },
]

const casesLabel = [
  { input: 'AL', expected: 'AL' },
  { input: undefined, expected: '' },
]

const casesIcon = [
  { input: 'user' as const, expected: 'user' },
  { input: undefined, expected: undefined },
]

describe('Avatar', () => {
  describe('props', () => {
    describe('size', () => {
      it.each(casesSize)('renderiza size=$input', ({ input, expected }) => {
        const avatar = mountAvatar({ props: { size: input, icon: 'user' } })
        const root = avatar.get('[data-test-avatar-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
        expect(avatar.getComponent(Icon).props('size')).toBe(input ?? 'md')
      })
    })

    describe('radius', () => {
      testRadius({
        id: '[data-test-avatar-root]',
        variable: '--avatar-radius',
        defaultValue: '9999px',
        mount: (radius) => mountAvatar({ props: { radius } }),
      })
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color',
        id: '[data-test-avatar-root]',
        varColor: '--avatar-color',
        defaultColor: 'var(--neutral, var(--neutral))',
        fallbackColor: 'neutral',
        theme: {
          colors: themeColors,
          foregroundVar: '--avatar-color-foreground',
          solidVar: '--avatar-solid',
          solidForegroundVar: '--avatar-solid-foreground',
        },
        mount: (color) => mountAvatar({ props: { color } }),
      })

      it('aplica el color al texto y al fondo suave', () => {
        const root = mountAvatar({ props: { color: 'success', label: 'AL' } }).get(
          '[data-test-avatar-root]',
        )

        expect(root.classes()).toContain('bg-(--avatar-color)/10')
        expect(root.classes()).toContain('text-(--avatar-color)')
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

    describe('alt', () => {
      it.each(casesAlt)('aplica alt=$input solo a la imagen', ({ input, expected }) => {
        const avatar = mountAvatar({ props: { src: 'avatar.png', alt: input, label: 'NC' } })

        expect(avatar.get('[data-test-avatar-image]').attributes('alt')).toBe(expected)
        expect(avatar.get('[data-test-avatar-fallback]').attributes('alt')).toBeUndefined()
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
      it.each(casesIcon)('renderiza icon=$input', ({ input, expected }) => {
        const avatar = mountAvatar({ props: { icon: input } })
        const icon = avatar.findComponent(Icon)

        expect(icon.exists()).toBe(expected !== undefined)
        if (expected) expect(icon.props('name')).toBe(expected)
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
