import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { AvatarFallback, AvatarImage } from 'reka-ui'
import { describe, expect, it } from 'vitest'

import { Avatar, avatarDefaults, type AvatarProps } from '@/components/Avatar'
import { Icon } from '@/components/Icon'

import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'
import { testRadius } from '../utils/testRadius'

function mountAvatar(options: MountingOptions<AvatarProps> = {}) {
  return mount(Avatar, options)
}

describe('Avatar', () => {
  describe('props', () => {
    describe('src', () => {
      const casesSrc = [
        {
          text: 'sin src pasa src vacío a Reka AvatarImage',
          input: {},
          expected: { reka: { src: '' } },
        },
        {
          text: 'con src pasa ese src a Reka AvatarImage',
          input: { src: 'https://example.com/avatar.png' },
          expected: { reka: { src: 'https://example.com/avatar.png' } },
        },
      ] as const

      it.each(casesSrc)('$text', ({ input, expected }) => {
        const reka = mountAvatar({ props: input }).getComponent(AvatarImage)

        expect({
          reka: { src: reka.props('src') },
        }).toEqual(expected)
      })
    })

    describe('alt', () => {
      const casesAlt = [
        {
          text: 'sin alt pinta alt vacío en la imagen para marcarla como decorativa',
          input: {},
          expected: { image: { alt: '' } },
        },
        {
          text: 'con alt pinta ese alt en la imagen',
          input: { alt: 'Foto de perfil' },
          expected: { image: { alt: 'Foto de perfil' } },
        },
      ] as const

      it.each(casesAlt)('$text', ({ input, expected }) => {
        const image = mountAvatar({ props: input }).get('[data-test-avatar-image]')

        expect({
          image: { alt: image.attributes('alt') },
        }).toEqual(expected)
      })
    })

    describe('size', () => {
      const casesSize = [
        {
          text: 'sin size usa avatarDefaults.size: size-10 y texto base',
          input: {},
          expected: { root: { class: ['size-10', 'text-base'] } },
        },
        {
          text: 'con size=xs tiene size-6 y texto xs',
          input: { size: 'xs' },
          expected: { root: { class: ['size-6', 'text-xs'] } },
        },
        {
          text: 'con size=sm tiene size-8 y texto sm',
          input: { size: 'sm' },
          expected: { root: { class: ['size-8', 'text-sm'] } },
        },
        {
          text: 'con size=md tiene size-10 y texto base',
          input: { size: 'md' },
          expected: { root: { class: ['size-10', 'text-base'] } },
        },
        {
          text: 'con size=lg tiene size-12 y texto lg',
          input: { size: 'lg' },
          expected: { root: { class: ['size-12', 'text-lg'] } },
        },
        {
          text: 'con size=xl tiene size-16 y texto xl',
          input: { size: 'xl' },
          expected: { root: { class: ['size-16', 'text-xl'] } },
        },
      ] as const

      it.each(casesSize)('$text', ({ input, expected }) => {
        const root = mountAvatar({ props: input }).get('[data-test-avatar-root]')

        expect({
          root: { class: root.classes() },
        }).toEqual({
          root: { class: expect.arrayContaining(expected.root.class) },
        })
      })
    })

    describe('radius', () => {
      testRadius({
        id: '[data-test-avatar-root]',
        variable: '--avatar-radius',
        mount: (radius) => mountAvatar({ props: { radius } }),
      })

      const casesRadius = [
        {
          text: 'por defecto redondea con avatarDefaults.radius (full)',
          input: {},
          expected: {
            root: { style: ['--avatar-radius: 9999px'] },
          },
        },
      ] as const

      it.each(casesRadius)('$text', ({ input, expected }) => {
        const root = mountAvatar({ props: input }).get('[data-test-avatar-root]')

        expect({
          root: {
            style: root
              .attributes('style')
              ?.split(';')
              .map((declaration) => declaration.trim()),
          },
        }).toEqual({
          root: { style: expect.arrayContaining(expected.root.style) },
        })
      })
    })

    describe('color', () => {
      testColor({
        id: '[data-test-avatar-root]',
        variable: '--avatar-color',
        fallbackColor: avatarDefaults.color,
        mount: (color) => mountAvatar({ props: { color } }),
      })

      const casesColor = [
        {
          text: 'por defecto pinta con avatarDefaults.color',
          input: {},
          expected: {
            root: {
              style: [
                `--avatar-color: var(--${avatarDefaults.color}, var(--${avatarDefaults.color}))`,
              ],
            },
          },
        },
      ] as const

      it.each(casesColor)('$text', ({ input, expected }) => {
        const root = mountAvatar({ props: input }).get('[data-test-avatar-root]')

        expect({
          root: {
            style: root
              .attributes('style')
              ?.split(';')
              .map((declaration) => declaration.trim()),
          },
        }).toEqual({
          root: { style: expect.arrayContaining(expected.root.style) },
        })
      })
    })

    describe('delayMs', () => {
      const casesDelayMs = [
        {
          text: 'sin delayMs no pasa delayMs a Reka AvatarFallback',
          input: {},
          expected: { reka: { delayMs: undefined } },
        },
        {
          text: 'con delayMs pasa ese delayMs a Reka AvatarFallback',
          input: { delayMs: 500 },
          expected: { reka: { delayMs: 500 } },
        },
      ] as const

      it.each(casesDelayMs)('$text', ({ input, expected }) => {
        const reka = mountAvatar({ props: input }).getComponent(AvatarFallback)

        expect({
          reka: { delayMs: reka.props('delayMs') },
        }).toEqual(expected)
      })
    })

    describe('icon', () => {
      const casesIcon = [
        {
          text: 'con icon pinta ese icono dentro del fallback',
          input: { icon: 'check' },
          expected: {
            fallback: { text: '' },
            icon: { exists: true, props: { name: 'check' } },
          },
        },
        {
          text: 'con icon y label pinta el icono en vez del label',
          input: { icon: 'check', label: 'JD' },
          expected: {
            fallback: { text: '' },
            icon: { exists: true, props: { name: 'check' } },
          },
        },
        {
          text: 'sin icon no pinta ningún icono',
          input: {},
          expected: {
            fallback: { text: '' },
            icon: { exists: false, props: undefined },
          },
        },
      ] as const

      it.each(casesIcon)('$text', ({ input, expected }) => {
        const fallback = mountAvatar({ props: input }).get('[data-test-avatar-fallback]')
        const icon = fallback.findComponent<typeof Icon>('[data-test-avatar-icon]')

        expect({
          fallback: { text: fallback.text() },
          icon: {
            exists: icon.exists(),
            props: icon.exists() ? { name: icon.props('name') } : undefined,
          },
        }).toEqual(expected)
      })
    })

    describe('label', () => {
      const casesLabel = [
        {
          text: 'con label pinta ese label dentro del fallback',
          input: { label: 'JD' },
          expected: { fallback: { text: 'JD' } },
        },
      ] as const

      it.each(casesLabel)('$text', ({ input, expected }) => {
        const fallback = mountAvatar({ props: input }).get('[data-test-avatar-fallback]')

        expect({
          fallback: { text: fallback.text() },
        }).toEqual(expected)
      })
    })

    describe('ui', () => {
      describe('image', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.image a la imagen',
          id: '[data-test-avatar-image]',
          ownClass: 'size-full',
          conflictingClass: 'size-8',
          // src y alt vienen de sus props
          notOverridable: ['src', 'alt'],
          normalized: true,
          mount: (attrs) => mountAvatar({ props: { ui: { image: () => attrs } } }),
        })
      })

      describe('fallback', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.fallback al fallback',
          id: '[data-test-avatar-fallback]',
          ownClass: 'items-center',
          conflictingClass: 'items-start',
          normalized: true,
          mount: (attrs) => mountAvatar({ props: { ui: { fallback: () => attrs } } }),
        })
      })
    })
  })

  describe('slots', () => {
    describe('fallback', () => {
      it('sustituye al icono y al label dentro del fallback', () => {
        const fallback = mountAvatar({
          props: { icon: 'check', label: 'JD' },
          slots: { fallback: () => h('strong', 'Personalizado') },
        }).get('[data-test-avatar-fallback]')

        expect({
          text: fallback.text(),
          icon: { exists: fallback.find('[data-test-avatar-icon]').exists() },
        }).toEqual({ text: 'Personalizado', icon: { exists: false } })
      })
    })
  })

  describe('nodos', () => {
    describe('root', () => {
      const casesRoot = [
        {
          text: 'es un contenedor relativo en fila que no se encoge y recorta su contenido',
          input: {},
          expected: { class: ['relative', 'flex', 'shrink-0', 'overflow-hidden'] },
        },
        {
          text: 'redondea con --avatar-radius',
          input: {},
          expected: { class: ['rounded-(--avatar-radius)'] },
        },
        {
          text: 'tiene fondo de --avatar-color al 10% y texto de --avatar-color',
          input: {},
          expected: { class: ['bg-(--avatar-color)/10', 'text-(--avatar-color)'] },
        },
      ] as const

      it.each(casesRoot)('$text', ({ input, expected }) => {
        const root = mountAvatar({ props: input }).get('[data-test-avatar-root]')

        expect({ class: root.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })

      it('es un span', () => {
        const root = mountAvatar().get('[data-test-avatar-root]')

        expect(root.element.tagName).toBe('SPAN')
      })

      testAttrs({
        id: '[data-test-avatar-root]',
        ownClass: 'overflow-hidden',
        conflictingClass: 'overflow-visible',
        mount: (attrs) => mountAvatar({ attrs }),
      })
    })

    describe('image', () => {
      const casesImage = [
        {
          text: 'es cuadrada y ocupa todo el avatar',
          input: {},
          expected: { class: ['aspect-square', 'size-full'] },
        },
      ] as const

      it.each(casesImage)('$text', ({ input, expected }) => {
        const image = mountAvatar({ props: input }).get('[data-test-avatar-image]')

        expect({ class: image.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })

      it('es un img', () => {
        const image = mountAvatar().get('[data-test-avatar-image]')

        expect(image.element.tagName).toBe('IMG')
      })
    })

    describe('fallback', () => {
      const casesFallback = [
        {
          text: 'ocupa todo el avatar y centra su contenido',
          input: {},
          expected: { class: ['flex', 'size-full', 'items-center', 'justify-center'] },
        },
      ] as const

      it.each(casesFallback)('$text', ({ input, expected }) => {
        const fallback = mountAvatar({ props: input }).get('[data-test-avatar-fallback]')

        expect({ class: fallback.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })

      it('es un span, no un div, para ser válido dentro del root', () => {
        const fallback = mountAvatar().get('[data-test-avatar-fallback]')

        expect(fallback.element.tagName).toBe('SPAN')
      })
    })

    describe('icon', () => {
      const casesIconNode = [
        {
          text: 'con el size por defecto ocupa la mitad del avatar sin un size-N propio',
          input: { icon: 'check' },
          expected: { class: ['size-1/2'], fixedSize: [] },
        },
        {
          text: 'con size=xl sigue ocupando la mitad del avatar sin un size-N propio',
          input: { icon: 'check', size: 'xl' },
          expected: { class: ['size-1/2'], fixedSize: [] },
        },
      ] as const

      it.each(casesIconNode)('$text', ({ input, expected }) => {
        const classes = mountAvatar({ props: input }).get('[data-test-avatar-icon]').classes()

        expect({
          class: classes,
          fixedSize: classes.filter((name) => /^size-\d+$/.test(name)),
        }).toEqual({
          class: expect.arrayContaining(expected.class),
          fixedSize: expected.fixedSize,
        })
      })
    })
  })
})
