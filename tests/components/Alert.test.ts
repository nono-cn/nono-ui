import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Alert, alertDefaults, type AlertProps } from '@/components/Alert'
import type { Button } from '@/components/Button'
import type { Icon } from '@/components/Icon'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountAlert(options: MountingOptions<AlertProps> = {}) {
  return mount(Alert, { ...options, global: { plugins: [i18n] } })
}

describe('Alert', () => {
  describe('props', () => {
    describe('label', () => {
      const casesLabel = [
        {
          text: 'con label pinta el label con ese texto',
          input: { label: 'Conexión inestable' },
          expected: {
            label: { exists: true, text: 'Conexión inestable' },
          },
        },
        {
          text: 'sin label no pinta el label',
          input: {},
          expected: {
            label: { exists: false, text: undefined },
          },
        },
      ] as const

      it.each(casesLabel)('$text', ({ input, expected }) => {
        const alert = mountAlert({ props: input })
        const label = alert.find('[data-test-alert-label]')

        expect({
          label: {
            exists: label.exists(),
            text: label.exists() ? label.text() : undefined,
          },
        }).toEqual(expected)
      })
    })

    describe('description', () => {
      const casesDescription = [
        {
          text: 'con description pinta la description con ese texto',
          input: { description: 'Revisa tu red e inténtalo de nuevo' },
          expected: {
            description: { exists: true, text: 'Revisa tu red e inténtalo de nuevo' },
          },
        },
        {
          text: 'sin description no pinta la description',
          input: {},
          expected: {
            description: { exists: false, text: undefined },
          },
        },
      ] as const

      it.each(casesDescription)('$text', ({ input, expected }) => {
        const alert = mountAlert({ props: input })
        const description = alert.find('[data-test-alert-description]')

        expect({
          description: {
            exists: description.exists(),
            text: description.exists() ? description.text() : undefined,
          },
        }).toEqual(expected)
      })
    })

    describe('icon', () => {
      const casesIcon = [
        {
          text: 'con icon pinta ese icono dentro del contenedor del icono',
          input: { icon: 'warning' },
          expected: {
            'icon-container': { exists: true },
            icon: { exists: true, props: { name: 'warning' } },
          },
        },
        {
          text: 'sin icon no pinta el contenedor del icono',
          input: {},
          expected: {
            'icon-container': { exists: false },
            icon: { exists: false, props: undefined },
          },
        },
      ] as const

      it.each(casesIcon)('$text', ({ input, expected }) => {
        const alert = mountAlert({ props: input })
        const icon = alert.findComponent<typeof Icon>('[data-test-alert-icon]')

        expect({
          'icon-container': { exists: alert.find('[data-test-alert-icon-container]').exists() },
          icon: {
            exists: icon.exists(),
            props: icon.exists() ? { name: icon.props('name') } : undefined,
          },
        }).toEqual(expected)
      })

      const casesIconColumns = [
        {
          text: 'con icon el root reserva una columna de 4 para el icono y lo separa del texto con gap-x-3',
          input: { icon: 'warning' },
          expected: {
            root: { class: ['grid-cols-[calc(var(--spacing)*4)_1fr_auto]', 'gap-x-3'] },
          },
        },
        {
          text: 'sin icon el root deja la columna del icono a 0',
          input: {},
          expected: {
            root: { class: ['grid-cols-[0_1fr_auto]'] },
          },
        },
      ] as const

      it.each(casesIconColumns)('$text', ({ input, expected }) => {
        const alert = mountAlert({ props: input })

        expect({
          root: { class: alert.get('[data-test-alert-root]').classes() },
        }).toEqual({
          root: { class: expect.arrayContaining(expected.root.class) },
        })
      })
    })

    describe('variant', () => {
      const casesVariant = [
        {
          text: 'con variant=solid el fondo es --alert-solid, el texto --alert-solid-foreground y el borde transparente',
          input: { variant: 'solid' },
          expected: {
            root: {
              class: [
                'border-transparent',
                'bg-(--alert-solid)',
                'text-(--alert-solid-foreground)',
              ],
            },
          },
        },
        {
          text: 'con variant=outline el borde es --alert-color al 40 %, el fondo transparente y el texto --alert-color',
          input: { variant: 'outline' },
          expected: {
            root: {
              class: ['border-(--alert-color)/40', 'bg-transparent', 'text-(--alert-color)'],
            },
          },
        },
        {
          text: 'con variant=plain el borde y el fondo son transparentes y el texto --alert-color',
          input: { variant: 'plain' },
          expected: {
            root: { class: ['border-transparent', 'bg-transparent', 'text-(--alert-color)'] },
          },
        },
        {
          text: 'con variant=subtle el borde es --alert-color al 20 %, el fondo al 10 % y el texto --alert-color',
          input: { variant: 'subtle' },
          expected: {
            root: {
              class: ['border-(--alert-color)/20', 'bg-(--alert-color)/10', 'text-(--alert-color)'],
            },
          },
        },
        {
          text: 'con variant=soft el fondo es --alert-color al 10 %, el borde transparente y el texto --alert-color',
          input: { variant: 'soft' },
          expected: {
            root: {
              class: ['border-transparent', 'bg-(--alert-color)/10', 'text-(--alert-color)'],
            },
          },
        },
      ] as const

      it.each(casesVariant)('$text', ({ input, expected }) => {
        const alert = mountAlert({ props: input })

        expect({
          root: { class: alert.get('[data-test-alert-root]').classes() },
        }).toEqual({
          root: { class: expect.arrayContaining(expected.root.class) },
        })
      })

      const casesVariantCloseButton = [
        {
          text: 'El botón de cerrar usa el mismo variant que el alert',
          input: { closable: true, variant: 'outline' },
          expected: {
            'close-button': { props: { variant: 'outline' } },
          },
        },
      ] as const

      it.each(casesVariantCloseButton)('$text', ({ input, expected }) => {
        const alert = mountAlert({ props: input })
        const closeButton = alert.findComponent<typeof Button>('[data-test-alert-close-button]')

        expect({
          'close-button': { props: { variant: closeButton.props('variant') } },
        }).toEqual(expected)
      })
    })

    describe('color', () => {
      testColor({
        id: '[data-test-alert-root]',
        variable: '--alert-color',
        fallbackColor: alertDefaults.color,
        mount: (color) => mountAlert({ props: { color } }),
      })

      const casesColor = [
        {
          text: 'por defecto pinta con alertDefaults.color',
          input: {},
          expected: {
            root: {
              style: [
                `--alert-color: var(--${alertDefaults.color}, var(--${alertDefaults.color}))`,
              ],
            },
          },
        },
      ] as const

      it.each(casesColor)('$text', ({ input, expected }) => {
        const root = mountAlert({ props: input }).get('[data-test-alert-root]')

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

      const casesColorCloseButton = [
        {
          text: 'con color=error el botón de cerrar usa ese mismo color',
          input: { closable: true, color: 'error' },
          expected: {
            'close-button': { props: { color: 'error' } },
          },
        },
      ] as const

      it.each(casesColorCloseButton)('$text', ({ input, expected }) => {
        const alert = mountAlert({ props: input })
        const closeButton = alert.findComponent<typeof Button>('[data-test-alert-close-button]')

        expect({
          'close-button': { props: { color: closeButton.props('color') } },
        }).toEqual(expected)
      })
    })

    describe('decorative', () => {
      const casesDecorative = [
        {
          text: `por defecto (decorative=${alertDefaults.decorative}) el root se anuncia como alerta con role="alert"`,
          input: {},
          expected: {
            root: { attrs: { role: 'alert' } },
          },
        },
        {
          text: 'con decorative=true el root no se anuncia y usa role="none"',
          input: { decorative: true },
          expected: {
            root: { attrs: { role: 'none' } },
          },
        },
      ] as const

      it.each(casesDecorative)('$text', ({ input, expected }) => {
        const alert = mountAlert({ props: input })

        expect({
          root: { attrs: { role: alert.get('[data-test-alert-root]').attributes('role') } },
        }).toEqual(expected)
      })
    })

    describe('closable', () => {
      const casesClosable = [
        {
          text: 'con closable=true pinta el contenedor del botón y dentro el botón de cerrar',
          input: { closable: true },
          expected: {
            'close-button-container': { exists: true },
            'close-button': { exists: true },
          },
        },
        {
          text: `por defecto (closable=${alertDefaults.closable}) no pinta ni el contenedor ni el botón de cerrar`,
          input: {},
          expected: {
            'close-button-container': { exists: false },
            'close-button': { exists: false },
          },
        },
      ] as const

      it.each(casesClosable)('$text', ({ input, expected }) => {
        const alert = mountAlert({ props: input })

        expect({
          'close-button-container': {
            exists: alert.find('[data-test-alert-close-button-container]').exists(),
          },
          'close-button': {
            exists: alert
              .find('[data-test-alert-close-button-container] [data-test-alert-close-button]')
              .exists(),
          },
        }).toEqual(expected)
      })
    })

    describe('ui', () => {
      describe('label', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.label al label',
          id: '[data-test-alert-label]',
          ownClass: 'font-medium',
          conflictingClass: 'font-bold',
          normalized: true,
          mount: (attrs) =>
            mountAlert({ props: { label: 'Conexión inestable', ui: { label: () => attrs } } }),
        })
      })

      describe('description', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.description a la description',
          id: '[data-test-alert-description]',
          ownClass: 'text-current/80',
          conflictingClass: 'text-current/60',
          normalized: true,
          mount: (attrs) =>
            mountAlert({
              props: {
                description: 'Revisa tu red e inténtalo de nuevo',
                ui: { description: () => attrs },
              },
            }),
        })
      })
    })
  })

  describe('slots', () => {
    describe('icon', () => {
      it('se pinta dentro del contenedor del icono', () => {
        const alert = mountAlert({ slots: { icon: () => h('svg', { 'data-mi-icono': '' }) } })

        expect(alert.find('[data-test-alert-icon-container] [data-mi-icono]').exists()).toBe(true)
      })

      it('sustituye al Icon de la prop icon', () => {
        const alert = mountAlert({
          props: { icon: 'warning' },
          slots: { icon: () => h('svg', { 'data-mi-icono': '' }) },
        })

        expect(alert.find('[data-test-alert-icon]').exists()).toBe(false)
      })

      it('sin prop icon el root también reserva la columna del icono', () => {
        const alert = mountAlert({ slots: { icon: () => h('svg') } })

        expect(alert.get('[data-test-alert-root]').classes()).toEqual(
          expect.arrayContaining(['grid-cols-[calc(var(--spacing)*4)_1fr_auto]', 'gap-x-3']),
        )
      })
    })

    describe('label', () => {
      it('se pinta dentro del label', () => {
        const alert = mountAlert({ slots: { label: () => h('strong', 'Sin conexión') } })

        expect(alert.get('[data-test-alert-label]').text()).toBe('Sin conexión')
      })

      it('sustituye al texto de la prop label', () => {
        const alert = mountAlert({
          props: { label: 'Conexión inestable' },
          slots: { label: () => h('strong', 'Sin conexión') },
        })

        expect(alert.get('[data-test-alert-label]').text()).toBe('Sin conexión')
      })
    })

    describe('description', () => {
      it('se pinta dentro de la description', () => {
        const alert = mountAlert({ slots: { description: () => h('em', 'Detalle') } })

        expect(alert.get('[data-test-alert-description]').text()).toBe('Detalle')
      })

      it('sustituye al texto de la prop description', () => {
        const alert = mountAlert({
          props: { description: 'Revisa tu red e inténtalo de nuevo' },
          slots: { description: () => h('em', 'Detalle') },
        })

        expect(alert.get('[data-test-alert-description]').text()).toBe('Detalle')
      })
    })

    describe('close', () => {
      it('con closable se pinta dentro del contenedor del botón y sustituye al botón por defecto', () => {
        const alert = mountAlert({
          props: { closable: true },
          slots: { close: () => h('button', 'Descartar') },
        })

        expect({
          slot: alert.get('[data-test-alert-close-button-container]').text(),
          'close-button': alert.find('[data-test-alert-close-button]').exists(),
        }).toEqual({ slot: 'Descartar', 'close-button': false })
      })

      it('sin closable no se pinta', () => {
        const alert = mountAlert({ slots: { close: () => h('button', 'Descartar') } })

        expect(alert.text()).not.toContain('Descartar')
      })

      it('al hacer click en un control del slot que llama a close emite close', async () => {
        const alert = mountAlert({
          props: { closable: true },
          slots: {
            close: ({ close }: { close: () => void }) =>
              h('button', { 'data-descartar': '', onClick: close }, 'Descartar'),
          },
        })

        await alert.get('[data-descartar]').trigger('click')

        expect(alert.emitted('close')).toEqual([[]])
      })

      it('al hacer click en un control del slot que llama a close deja de pintar el alert', async () => {
        const alert = mountAlert({
          props: { closable: true },
          slots: {
            close: ({ close }: { close: () => void }) =>
              h('button', { 'data-descartar': '', onClick: close }, 'Descartar'),
          },
        })

        await alert.get('[data-descartar]').trigger('click')

        expect(alert.find('[data-test-alert-root]').exists()).toBe(false)
      })
    })
  })

  describe('emits', () => {
    describe('close', () => {
      it('al hacer click en el botón de cerrar emite close', async () => {
        const alert = mountAlert({ props: { closable: true } })

        await alert.get('[data-test-alert-close-button]').trigger('click')

        expect(alert.emitted('close')).toEqual([[]])
      })

      it('al hacer click en el botón de cerrar deja de pintar el alert', async () => {
        const alert = mountAlert({ props: { closable: true } })

        await alert.get('[data-test-alert-close-button]').trigger('click')

        expect(alert.find('[data-test-alert-root]').exists()).toBe(false)
      })
    })
  })

  describe('nodos', () => {
    describe('root', () => {
      const casesRoot = [
        {
          text: 'coloca el icono, el texto y el botón en una rejilla alineada arriba, con gap-y-0.5 entre filas',
          input: {},
          expected: {
            class: ['grid', 'items-start', 'gap-y-0.5'],
          },
        },
        {
          text: 'ocupa todo el ancho disponible',
          input: {},
          expected: {
            class: ['w-full'],
          },
        },
        {
          text: 'dibuja una caja con borde y esquinas redondeadas lg',
          input: {},
          expected: {
            class: ['border', 'rounded-lg'],
          },
        },
        {
          text: 'deja un padding de 4 a los lados y de 3 arriba y abajo',
          input: {},
          expected: {
            class: ['px-4', 'py-3'],
          },
        },
        {
          text: 'usa texto sm',
          input: {},
          expected: {
            class: ['text-sm'],
          },
        },
      ] as const

      it.each(casesRoot)('$text', ({ input, expected }) => {
        const root = mountAlert({ props: input }).get('[data-test-alert-root]')

        expect({ class: root.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })

      testAttrs({
        id: '[data-test-alert-root]',
        ownClass: 'rounded-lg',
        conflictingClass: 'rounded-none',
        mount: (attrs) => mountAlert({ attrs }),
      })
    })

    describe('icon-container', () => {
      const casesIconContainer = [
        {
          text: 'mide 4 y centra el icono',
          input: { icon: 'warning' },
          expected: {
            class: ['flex', 'size-4', 'items-center', 'justify-center'],
          },
        },
        {
          text: 'baja el icono 0.5 para alinearlo con la primera línea del label',
          input: { icon: 'warning' },
          expected: {
            class: ['translate-y-0.5'],
          },
        },
        {
          text: 'hace que el svg de dentro ocupe todo el contenedor',
          input: { icon: 'warning' },
          expected: {
            class: ['[&>svg]:size-full'],
          },
        },
      ] as const

      it.each(casesIconContainer)('$text', ({ input, expected }) => {
        const iconContainer = mountAlert({ props: input }).get('[data-test-alert-icon-container]')

        expect({ class: iconContainer.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })

    describe('label', () => {
      const casesLabelNode = [
        {
          text: 'va en la segunda columna, junto al icono',
          input: { label: 'Conexión inestable' },
          expected: {
            class: ['col-start-2'],
          },
        },
        {
          text: 'muestra una sola línea y recorta lo que sobra',
          input: { label: 'Conexión inestable' },
          expected: {
            class: ['line-clamp-1'],
          },
        },
        {
          text: 'reserva al menos 4 de alto aunque el texto sea pequeño',
          input: { label: 'Conexión inestable' },
          expected: {
            class: ['min-h-4'],
          },
        },
        {
          text: 'destaca el título con fuente media y un tracking más ajustado',
          input: { label: 'Conexión inestable' },
          expected: {
            class: ['font-medium', 'tracking-tight'],
          },
        },
      ] as const

      it.each(casesLabelNode)('$text', ({ input, expected }) => {
        const label = mountAlert({ props: input }).get('[data-test-alert-label]')

        expect({ class: label.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })

    describe('description', () => {
      const casesDescriptionNode = [
        {
          text: 'va en la segunda columna, debajo del label',
          input: { description: 'Revisa tu red e inténtalo de nuevo' },
          expected: {
            class: ['col-start-2'],
          },
        },
        {
          text: 'atenúa el texto al 80 % del color del alert',
          input: { description: 'Revisa tu red e inténtalo de nuevo' },
          expected: {
            class: ['text-current/80'],
          },
        },
        {
          text: 'da más interlineado a los párrafos de dentro',
          input: { description: 'Revisa tu red e inténtalo de nuevo' },
          expected: {
            class: ['[&_p]:leading-relaxed'],
          },
        },
      ] as const

      it.each(casesDescriptionNode)('$text', ({ input, expected }) => {
        const description = mountAlert({ props: input }).get('[data-test-alert-description]')

        expect({ class: description.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })

    describe('close-button-container', () => {
      const casesCloseButtonContainer = [
        {
          text: 'va en la tercera columna, en la fila del label',
          input: { closable: true },
          expected: {
            class: ['col-start-3', 'row-start-1'],
          },
        },
        {
          text: 'se alinea arriba aunque la fila sea más alta',
          input: { closable: true },
          expected: {
            class: ['self-start'],
          },
        },
        {
          text: 'se acerca a la esquina con márgenes negativos (-my-1.5, -me-2)',
          input: { closable: true },
          expected: {
            class: ['-my-1.5', '-me-2'],
          },
        },
        {
          text: 'se separa del texto con ms-2',
          input: { closable: true },
          expected: {
            class: ['ms-2'],
          },
        },
      ] as const

      it.each(casesCloseButtonContainer)('$text', ({ input, expected }) => {
        const closeButtonContainer = mountAlert({ props: input }).get(
          '[data-test-alert-close-button-container]',
        )

        expect({ class: closeButtonContainer.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })

    describe('close-button', () => {
      const casesCloseButton = [
        {
          text: 'usa como aria-label la traducción de la clave "close"',
          input: { closable: true },
          expected: {
            attrs: { 'aria-label': i18n.global.t('close') },
          },
        },
      ]

      it.each(casesCloseButton)('$text', ({ input, expected }) => {
        const closeButton = mountAlert({ props: input }).get('[data-test-alert-close-button]')

        expect({
          attrs: { 'aria-label': closeButton.attributes('aria-label') },
        }).toEqual(expected)
      })

      const casesCloseButtonProps = [
        {
          text: 'es un botón de icono pequeño (icon-xs) y redondo y con icono "x"',
          input: { closable: true },
          expected: {
            props: { size: 'icon-xs', radius: 'full', icon: 'x' },
          },
        },
      ] as const

      it.each(casesCloseButtonProps)('$text', ({ input, expected }) => {
        const closeButton = mountAlert({ props: input }).findComponent<typeof Button>(
          '[data-test-alert-close-button]',
        )

        expect({ props: closeButton.props() }).toEqual({
          props: expect.objectContaining(expected.props),
        })
      })
    })
  })
})
