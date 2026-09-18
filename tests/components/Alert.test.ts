import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Alert, type AlertProps } from '@/components/ui/Alert'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'
import { testButtonConfig } from '../utils/testButtonConfig'
import { testColor } from '../utils/testColor'
import { testIconConfig, testIconSize } from '../utils/testIconConfig'

function mountAlert(options: MountingOptions<AlertProps> = {}) {
  return mount(Alert, {
    global: { plugins: [i18n], ...options.global },
    ...options,
  })
}

const casesLabel = [
  { input: 'Guardado', expected: 'Guardado' },
  { input: '', expected: undefined },
  { input: undefined, expected: undefined },
]

const casesDescription = [
  { input: 'Cambios guardados', expected: 'Cambios guardados' },
  { input: '', expected: undefined },
  { input: undefined, expected: undefined },
]

const casesVariant = [
  { input: 'solid' as const, expected: ['border-transparent', 'bg-(--alert-solid)'] },
  { input: 'outline' as const, expected: ['border-(--alert-color)/40', 'bg-transparent'] },
  { input: 'plain' as const, expected: ['border-transparent', 'bg-transparent'] },
  {
    input: 'subtle' as const,
    expected: ['border-(--alert-color)/20', 'bg-(--alert-color)/10'],
  },
  { input: 'soft' as const, expected: ['border-transparent', 'bg-(--alert-color)/10'] },
]

const casesSeverity = ['primary', 'secondary', 'warning', 'success', 'error'] as const

const casesDecorative = [
  { input: true as const, expected: 'none' },
  { input: false as const, expected: 'alert' },
  { input: undefined, expected: 'alert' },
]

const casesClosable = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

describe('Alert', () => {
  describe('props', () => {
    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input como "$expected"', ({ input, expected }) => {
        const alert = mountAlert({ props: { label: input } })
        const label = alert.find('[data-test-alert-label]')

        expect(label.exists()).toBe(expected !== undefined)
        if (expected !== undefined) expect(label.text()).toBe(expected)
      })
    })

    describe('description', () => {
      it.each(casesDescription)(
        'renderiza description=$input como "$expected"',
        ({ input, expected }) => {
          const alert = mountAlert({ props: { description: input } })
          const description = alert.find('[data-test-alert-description]')

          expect(description.exists()).toBe(expected !== undefined)
          if (expected !== undefined) expect(description.text()).toBe(expected)
        },
      )
    })

    describe('variant', () => {
      it.each(casesVariant)('renderiza variant=$input', ({ input, expected }) => {
        const root = mountAlert({ props: { variant: input } }).get('[data-test-alert-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('severity', () => {
      it.each(casesSeverity)('renderiza severity=%s', (severity) => {
        const root = mountAlert({ props: { severity } }).get('[data-test-alert-root]')

        expect(root.classes()).toContain(
          `[--alert-color:var(--${severity === 'secondary' ? 'secondary-foreground' : severity})]`,
        )
      })
    })

    describe('color', () => {
      testColor({
        text: 'renderiza color',
        id: '[data-test-alert-root]',
        varColor: '--alert-color',
        mount: (color) => mountAlert({ props: { color } }),
      })
    })

    describe('icon', () => {
      testIconConfig({
        text: 'pasa las props de icon',
        id: '[data-test-alert-icon]',
        mount: (input) => mountAlert({ props: { icon: input } }),
      })
    })

    describe('closeButton', () => {
      testButtonConfig({
        text: 'pasa la configuración de closeButton a Button',
        id: '[data-test-alert-close-button]',
        mount: (input) => mountAlert({ props: { closable: true, closeButton: input } }),
      })

      it('usa la configuración predeterminada de closeButton', () => {
        const alert = mountAlert({
          props: {
            closable: true,
            variant: 'outline',
            severity: 'warning',
            color: '#ff0000',
          },
        })
        const closeButton = alert.getComponent('[data-test-alert-close-button]')

        expect(closeButton.props()).toEqual(
          expect.objectContaining({
            icon: { name: 'x' },
            size: 'xs',
            square: true,
            rounded: true,
            variant: 'outline',
            severity: 'warning',
            color: '#ff0000',
          }),
        )
        expect(closeButton.attributes('aria-label')).toBe(i18n.global.t('close'))
      })
    })

    describe('decorative', () => {
      it.each(casesDecorative)(
        'renderiza decorative=$input como role=$expected',
        ({ input, expected }) => {
          const alert = mountAlert({ props: { decorative: input } })

          expect(alert.get('[data-test-alert-root]').attributes('role')).toBe(expected)
        },
      )
    })

    describe('closable', () => {
      it.each(casesClosable)(
        'renderiza el botón de cierre para closable=$input',
        ({ input, expected }) => {
          const alert = mountAlert({ props: { closable: input } })

          expect(alert.find('[data-test-alert-close-button]').exists()).toBe(expected)
        },
      )
    })

    describe('ui', () => {
      testAttrs({
        text: 'renderiza los atributos de ui.label',
        id: '[data-test-alert-label]',
        mount: (attrs) =>
          mountAlert({
            props: { label: 'Guardado', ui: { label: () => attrs } },
          }),
      })

      testAttrs({
        text: 'renderiza los atributos de ui.description',
        id: '[data-test-alert-description]',
        mount: (attrs) =>
          mountAlert({
            props: { description: 'Cambios guardados', ui: { description: () => attrs } },
          }),
      })

      it('renderiza los atributos de ui.closeButtonContainer', () => {
        const alert = mountAlert({
          props: {
            closable: true,
            ui: {
              closeButtonContainer: () => ({
                class: 'ui-closeButtonContainer',
                style: 'opacity: 0.8',
              }),
            },
          },
        })
        const element = alert.get('[data-test-alert-close-button]').element.parentElement

        expect(element?.classList).toContain('ui-closeButtonContainer')
        expect(element?.getAttribute('style')).toContain('opacity: 0.8')
      })
    })
  })

  describe('emits', () => {
    describe('close', () => {
      it('cierra y emite close desde el botón predeterminado', async () => {
        const alert = mountAlert({ props: { closable: true } })

        await alert.get('[data-test-alert-close-button]').trigger('click')

        expect(alert.emitted('close')).toHaveLength(1)
        expect(alert.find('[data-test-alert-root]').exists()).toBe(false)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-alert-root]',
      mount: (attrs) => mountAlert({ attrs }),
    })
  })

  describe('slots', () => {
    describe('icon', () => {
      it('renderiza el slot del icono', () => {
        const alert = mountAlert({
          props: { icon: { name: 'info' } },
          slots: {
            icon: () => h('span', { 'data-test-alert-slot': 'icon' }, 'Icono del slot'),
          },
        })

        expect(alert.get('[data-test-alert-slot="icon"]').text()).toBe('Icono del slot')
        expect(alert.find('[data-test-alert-icon]').exists()).toBe(false)
      })
    })

    describe('label', () => {
      it('renderiza el slot de label', () => {
        const alert = mountAlert({
          slots: {
            label: () => h('span', { 'data-test-alert-slot': 'label' }, 'Label del slot'),
          },
        })

        expect(alert.get('[data-test-alert-slot="label"]').text()).toBe('Label del slot')
        expect(alert.text()).not.toContain('Guardado')
      })
    })

    describe('description', () => {
      it('renderiza el slot de description', () => {
        const alert = mountAlert({
          slots: {
            description: () =>
              h('span', { 'data-test-alert-slot': 'description' }, 'Description del slot'),
          },
        })

        expect(alert.get('[data-test-alert-slot="description"]').text()).toBe(
          'Description del slot',
        )
        expect(alert.text()).not.toContain('Cambios guardados')
      })
    })

    describe('close', () => {
      it('renderiza el slot de cierre', () => {
        const alert = mountAlert({
          props: { closable: true },
          slots: {
            close: () => h('span', { 'data-test-alert-slot': 'close' }, 'Cierre del slot'),
          },
        })

        expect(alert.get('[data-test-alert-slot="close"]').text()).toBe('Cierre del slot')
        expect(alert.find('[data-test-alert-close-button]').exists()).toBe(false)
      })

      it('expone la función de cierre en las props del slot', async () => {
        const alert = mountAlert({
          props: { closable: true },
          slots: {
            close: ({ close }) =>
              h('button', { 'data-test-alert-slot': 'close', onClick: close }, 'Cierre del slot'),
          },
        })

        await alert.get('[data-test-alert-slot="close"]').trigger('click')

        expect(alert.emitted('close')).toHaveLength(1)
        expect(alert.find('[data-test-alert-root]').exists()).toBe(false)
      })
    })
  })
})
