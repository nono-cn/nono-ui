import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Badge, badgeDefaults, type BadgeProps } from '@/components/Badge'
import { Icon } from '@/components/Icon'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'
import { testRadius } from '../utils/testRadius'

function mountBadge(options: MountingOptions<BadgeProps> = {}) {
  return mount(Badge, options)
}

describe('Badge', () => {
  describe('props', () => {
    describe('label', () => {
      const casesLabel = [
        {
          text: 'pinta el label como texto del badge',
          input: { label: 'Nuevo' },
          expected: {
            root: { text: 'Nuevo' },
          },
        },
        {
          text: 'sin label el badge no tiene texto',
          input: {},
          expected: {
            root: { text: '' },
          },
        },
      ] as const

      it.each(casesLabel)('$text', ({ input, expected }) => {
        const root = mountBadge({ props: input }).get('[data-test-badge-root]')

        expect({
          root: { text: root.text() },
        }).toEqual({
          root: { text: expected.root.text },
        })
      })
    })

    describe('variant', () => {
      const casesVariant = [
        {
          text: 'con variant=solid rellena con --badge-color y el texto con su foreground, sin borde visible',
          input: { variant: 'solid' },
          expected: {
            root: {
              class: [
                'border-transparent',
                'bg-(--badge-color)',
                'text-(--badge-color-foreground)',
              ],
            },
          },
        },
        {
          text: 'con variant=outline no tiene fondo y tiene borde de --badge-color al 40%',
          input: { variant: 'outline' },
          expected: {
            root: {
              class: ['bg-transparent', 'border-(--badge-color)/40', 'text-(--badge-color)'],
            },
          },
        },
        {
          text: 'con variant=plain no tiene fondo ni borde visible y el texto es --badge-color',
          input: { variant: 'plain' },
          expected: {
            root: {
              class: ['border-transparent', 'bg-transparent', 'text-(--badge-color)'],
            },
          },
        },
        {
          text: 'con variant=subtle tiene fondo de --badge-color al 10% y borde al 20%',
          input: { variant: 'subtle' },
          expected: {
            root: {
              class: ['bg-(--badge-color)/10', 'border-(--badge-color)/20', 'text-(--badge-color)'],
            },
          },
        },
        {
          text: 'con variant=soft tiene fondo de --badge-color al 10% sin borde visible',
          input: { variant: 'soft' },
          expected: {
            root: {
              class: ['border-transparent', 'bg-(--badge-color)/10', 'text-(--badge-color)'],
            },
          },
        },
      ] as const

      it.each(casesVariant)('$text', ({ input, expected }) => {
        const root = mountBadge({ props: input }).get('[data-test-badge-root]')

        expect({
          root: { class: root.classes() },
        }).toEqual({
          root: { class: expect.arrayContaining(expected.root.class) },
        })
      })
    })

    describe('size', () => {
      const casesSize = [
        {
          text: 'con size=xs tiene texto xs y huecos de icono size-3',
          input: { size: 'xs' },
          expected: {
            root: { class: ['gap-0.5', 'px-0.5', 'text-xs'] },
            leading: { class: ['size-3'] },
            trailing: { class: ['size-3'] },
          },
        },
        {
          text: 'con size=sm tiene texto sm y huecos de icono size-4',
          input: { size: 'sm' },
          expected: {
            root: { class: ['gap-0.5', 'px-0.5', 'text-sm'] },
            leading: { class: ['size-4'] },
            trailing: { class: ['size-4'] },
          },
        },
        {
          text: 'con size=md tiene texto base y huecos de icono size-5',
          input: { size: 'md' },
          expected: {
            root: { class: ['gap-1', 'px-1', 'text-base'] },
            leading: { class: ['size-5'] },
            trailing: { class: ['size-5'] },
          },
        },
        {
          text: 'con size=lg tiene texto lg y huecos de icono size-6',
          input: { size: 'lg' },
          expected: {
            root: { class: ['gap-1.5', 'px-2', 'text-lg'] },
            leading: { class: ['size-6'] },
            trailing: { class: ['size-6'] },
          },
        },
        {
          text: 'con size=xl tiene texto xl y huecos de icono size-7',
          input: { size: 'xl' },
          expected: {
            root: { class: ['gap-2', 'px-2.5', 'text-xl'] },
            leading: { class: ['size-7'] },
            trailing: { class: ['size-7'] },
          },
        },
      ] as const

      it.each(casesSize)('$text', ({ input, expected }) => {
        const badge = mountBadge({
          props: { ...input, icon: 'check', trailingIcon: 'chevronRight' },
        })

        expect({
          root: { class: badge.get('[data-test-badge-root]').classes() },
          leading: { class: badge.get('[data-test-badge-leading]').classes() },
          trailing: { class: badge.get('[data-test-badge-trailing]').classes() },
        }).toEqual({
          root: { class: expect.arrayContaining(expected.root.class) },
          leading: { class: expect.arrayContaining(expected.leading.class) },
          trailing: { class: expect.arrayContaining(expected.trailing.class) },
        })
      })
    })

    describe('color', () => {
      testColor({
        id: '[data-test-badge-root]',
        variable: '--badge-color',
        fallbackColor: badgeDefaults.color,
        mount: (color) => mountBadge({ props: { color } }),
      })

      const casesColor = [
        {
          text: 'por defecto pinta con badgeDefaults.color',
          input: {},
          expected: {
            root: {
              style: [
                `--badge-color: var(--${badgeDefaults.color}, var(--${badgeDefaults.color}))`,
              ],
            },
          },
        },
      ] as const

      it.each(casesColor)('$text', ({ input, expected }) => {
        const root = mountBadge({ props: input }).get('[data-test-badge-root]')

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

    describe('radius', () => {
      testRadius({
        id: '[data-test-badge-root]',
        variable: '--badge-radius',
        mount: (radius) => mountBadge({ props: { radius } }),
      })

      const casesRadius = [
        {
          text: 'por defecto redondea con badgeDefaults.radius',
          input: {},
          expected: {
            root: { style: [`--badge-radius: var(--radius-${badgeDefaults.radius})`] },
          },
        },
      ] as const

      it.each(casesRadius)('$text', ({ input, expected }) => {
        const root = mountBadge({ props: input }).get('[data-test-badge-root]')

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

    describe('icon', () => {
      const casesIcon = [
        {
          text: 'con icon pinta ese icono dentro del leading',
          input: { icon: 'check' },
          expected: {
            leading: { exists: true },
            icon: { exists: true, props: { name: 'check' } },
          },
        },
        {
          text: 'sin icon no pinta el leading',
          input: {},
          expected: {
            leading: { exists: false },
            icon: { exists: false, props: undefined },
          },
        },
      ] as const

      it.each(casesIcon)('$text', ({ input, expected }) => {
        const badge = mountBadge({ props: input })
        const icon = badge.findComponent<typeof Icon>('[data-test-badge-icon]')

        expect({
          leading: { exists: badge.find('[data-test-badge-leading]').exists() },
          icon: {
            exists: icon.exists(),
            props: icon.exists() ? { name: icon.props('name') } : undefined,
          },
        }).toEqual(expected)
      })
    })

    describe('trailingIcon', () => {
      const casesTrailingIcon = [
        {
          text: 'con trailingIcon pinta ese icono dentro del trailing',
          input: { trailingIcon: 'chevronRight' },
          expected: {
            trailing: { exists: true },
            'trailing-icon': { exists: true, props: { name: 'chevronRight' } },
          },
        },
        {
          text: 'sin trailingIcon no pinta el trailing',
          input: {},
          expected: {
            trailing: { exists: false },
            'trailing-icon': { exists: false, props: undefined },
          },
        },
      ] as const

      it.each(casesTrailingIcon)('$text', ({ input, expected }) => {
        const badge = mountBadge({ props: input })
        const icon = badge.findComponent<typeof Icon>('[data-test-badge-trailing-icon]')

        expect({
          trailing: { exists: badge.find('[data-test-badge-trailing]').exists() },
          'trailing-icon': {
            exists: icon.exists(),
            props: icon.exists() ? { name: icon.props('name') } : undefined,
          },
        }).toEqual(expected)
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('sustituye al label', () => {
        const badge = mountBadge({
          props: { label: 'Nuevo' },
          slots: { default: () => h('strong', 'Destacado') },
        })

        expect(badge.get('[data-test-badge-root]').text()).toBe('Destacado')
      })
    })

    describe('leading', () => {
      it('se pinta dentro del leading', () => {
        const badge = mountBadge({ slots: { leading: () => h('em', 'L') } })

        expect(badge.get('[data-test-badge-leading]').text()).toBe('L')
      })

      it('sustituye al icono leading', () => {
        const badge = mountBadge({
          props: { icon: 'check' },
          slots: { leading: () => h('em', 'L') },
        })

        expect(badge.find('[data-test-badge-icon]').exists()).toBe(false)
      })
    })

    describe('trailing', () => {
      it('se pinta dentro del trailing', () => {
        const badge = mountBadge({ slots: { trailing: () => h('em', 'T') } })

        expect(badge.get('[data-test-badge-trailing]').text()).toBe('T')
      })

      it('sustituye al icono trailing', () => {
        const badge = mountBadge({
          props: { trailingIcon: 'chevronRight' },
          slots: { trailing: () => h('em', 'T') },
        })

        expect(badge.find('[data-test-badge-trailing-icon]').exists()).toBe(false)
      })
    })
  })

  describe('nodos', () => {
    describe('root', () => {
      const casesRoot = [
        {
          text: 'se ajusta a su contenido en una fila centrada',
          input: {},
          expected: {
            class: ['inline-flex', 'w-fit', 'shrink-0', 'items-center', 'justify-center'],
          },
        },
        {
          text: 'tiene borde con el radio de --badge-radius y recorta lo que sobresale',
          input: {},
          expected: {
            class: ['border', 'rounded-(--badge-radius)', 'overflow-hidden'],
          },
        },
        {
          text: 'no parte el texto y lo pone en negrita media',
          input: {},
          expected: {
            class: ['whitespace-nowrap', 'font-medium'],
          },
        },
      ] as const

      it.each(casesRoot)('$text', ({ input, expected }) => {
        const root = mountBadge({ props: input }).get('[data-test-badge-root]')

        expect({ class: root.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })

      testAttrs({
        id: '[data-test-badge-root]',
        ownClass: 'px-1',
        conflictingClass: 'px-4',
        mount: (attrs) => mountBadge({ attrs }),
      })
    })

    describe('leading', () => {
      const casesLeading = [
        {
          text: 'centra su contenido sin encogerse',
          input: { icon: 'check' },
          expected: {
            class: ['inline-flex', 'shrink-0', 'items-center', 'justify-center'],
          },
        },
      ] as const

      it.each(casesLeading)('$text', ({ input, expected }) => {
        const leading = mountBadge({ props: input }).get('[data-test-badge-leading]')

        expect({ class: leading.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })

    describe('trailing', () => {
      const casesTrailing = [
        {
          text: 'centra su contenido sin encogerse',
          input: { trailingIcon: 'chevronRight' },
          expected: {
            class: ['inline-flex', 'shrink-0', 'items-center', 'justify-center'],
          },
        },
      ] as const

      it.each(casesTrailing)('$text', ({ input, expected }) => {
        const trailing = mountBadge({ props: input }).get('[data-test-badge-trailing]')

        expect({ class: trailing.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })

    describe('icon', () => {
      const casesIconNode = [
        {
          text: 'ocupa todo el hueco del leading',
          input: { icon: 'check' },
          expected: {
            class: ['size-full'],
          },
        },
      ] as const

      it.each(casesIconNode)('$text', ({ input, expected }) => {
        const icon = mountBadge({ props: input }).get('[data-test-badge-icon]')

        expect({ class: icon.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })

    describe('trailing-icon', () => {
      const casesTrailingIconNode = [
        {
          text: 'ocupa todo el hueco del trailing',
          input: { trailingIcon: 'chevronRight' },
          expected: {
            class: ['size-full'],
          },
        },
      ] as const

      it.each(casesTrailingIconNode)('$text', ({ input, expected }) => {
        const trailingIcon = mountBadge({ props: input }).get('[data-test-badge-trailing-icon]')

        expect({ class: trailingIcon.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })
  })
})
