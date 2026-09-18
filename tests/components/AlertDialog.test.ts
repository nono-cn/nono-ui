import { mount, type MountingOptions } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
} from 'reka-ui'
import { AlertDialog, type AlertDialogProps } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import { i18n } from '@/i18n'
import { testButtonConfig } from '../utils/testButtonConfig'
import { testAttrs } from '../utils/testAttrs'
import { testIconConfig } from '../utils/testIconConfig'

afterEach(() => {
  document.body.innerHTML = ''
})

function mountAlertDialog(options: MountingOptions<AlertDialogProps> = {}) {
  return mount(AlertDialog, {
    ...options,
    attachTo: document.body,
    global: { plugins: [i18n], ...options.global },
    props: {
      label: 'Diálogo de prueba',
      description: 'Descripción del diálogo de prueba',
      ...options.props,
    },
  })
}

const casesOpen = [
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesLabel = [{ input: 'Eliminar proyecto', expected: 'Eliminar proyecto' }]

const casesDescription = [
  { input: 'Esta acción no se puede deshacer.', expected: 'Esta acción no se puede deshacer.' },
]

const casesUnmountOnHide = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: true },
]

const casesForceMount = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: undefined },
]

const casesDisableOutsidePointerEvents = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: true },
]

function mountAlertDialogInline(options: MountingOptions<AlertDialogProps> = {}) {
  return mount(AlertDialog, {
    ...options,
    attachTo: document.body,
    global: {
      plugins: [i18n],
      stubs: { AlertDialogPortal: { template: '<div><slot /></div>' } },
      ...options.global,
    },
    props: {
      label: 'Diálogo de prueba',
      description: 'Descripción del diálogo de prueba',
      ...options.props,
    },
  })
}

function getRendered(wrapper: ReturnType<typeof mountAlertDialog>, selector: string) {
  return wrapper.get(selector).element
}

describe('AlertDialog', () => {
  describe('props', () => {
    describe('portal', () => {
      it('apunta al destino local después del trigger', async () => {
        const alertDialog = mountAlertDialog({
          slots: { default: () => h('button', 'Abrir') },
        })
        await nextTick()

        const portal = alertDialog.getComponent(AlertDialogPortal)
        const trigger = alertDialog.get('[data-test-alert-dialog-trigger]')
        const target = alertDialog.get('[data-test-alert-dialog-portal-target]').element

        expect(portal.vm.$.vnode.props?.to).toBe(target)
        expect(
          trigger.element.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy()
      })
    })

    describe('open', () => {
      it.each(casesOpen)('pasa open=$input a AlertDialogRoot', ({ input, expected }) => {
        const alertDialog = mountAlertDialog({ props: { open: input } })

        expect(alertDialog.getComponent(AlertDialogRoot).props('open')).toBe(expected)
      })
    })

    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input', async ({ input, expected }) => {
        const alertDialog = mountAlertDialog({ props: { open: true, label: input } })
        await nextTick()

        expect(getRendered(alertDialog, '[data-test-alert-dialog-label]').textContent).toBe(
          expected,
        )
      })
    })

    describe('description', () => {
      it.each(casesDescription)('renderiza description=$input', async ({ input, expected }) => {
        const alertDialog = mountAlertDialog({ props: { open: true, description: input } })
        await nextTick()

        expect(getRendered(alertDialog, '[data-test-alert-dialog-description]').textContent).toBe(
          expected,
        )
      })
    })

    describe('icon', () => {
      testIconConfig({
        text: 'pasa las props de icon',
        id: '[data-test-alert-dialog-icon]',
        mount: async (input) => {
          const alertDialog = mountAlertDialog({
            props: { open: true, label: 'Advertencia', icon: input },
          })
          await nextTick()
          return alertDialog
        },
      })
    })

    describe('actionButton', () => {
      testButtonConfig({
        text: 'pasa la configuración de actionButton a Button',
        id: '[data-test-alert-dialog-action-button]',
        mount: async (input) => {
          const alertDialog = mountAlertDialog({
            props: { open: true, actionButton: input },
          })
          await nextTick()
          return alertDialog
        },
      })
    })

    describe('cancelButton', () => {
      testButtonConfig({
        text: 'pasa la configuración de cancelButton a Button',
        id: '[data-test-alert-dialog-cancel-button]',
        mount: async (input) => {
          const alertDialog = mountAlertDialog({
            props: { open: true, cancelButton: input },
          })
          await nextTick()
          return alertDialog
        },
      })
    })

    describe('unmountOnHide', () => {
      it.each(casesUnmountOnHide)(
        'pasa unmountOnHide=$input a AlertDialogRoot',
        ({ input, expected }) => {
          const alertDialog = mountAlertDialog({ props: { unmountOnHide: input } })
          const root = alertDialog.getComponent(AlertDialogRoot)

          expect(root.props('unmountOnHide')).toBe(expected)
        },
      )
    })

    describe('forceMount', () => {
      it.each(casesForceMount)(
        'pasa forceMount=$input a AlertDialogContent',
        ({ input, expected }) => {
          const alertDialog = mountAlertDialogInline({ props: { open: true, forceMount: input } })
          const content = alertDialog
            .findAllComponents(AlertDialogContent)
            .find(
              (component) => component.attributes('data-test-alert-dialog-content') !== undefined,
            )
          if (!content) throw new Error('Se esperaba AlertDialogContent')

          expect(content.props('forceMount')).toBe(expected)
        },
      )
    })

    describe('disableOutsidePointerEvents', () => {
      it.each(casesDisableOutsidePointerEvents)(
        'pasa disableOutsidePointerEvents=$input a AlertDialogContent',
        ({ input, expected }) => {
          const alertDialog = mountAlertDialogInline({
            props: { open: true, disableOutsidePointerEvents: input },
          })
          const content = alertDialog
            .findAllComponents(AlertDialogContent)
            .find(
              (component) => component.attributes('data-test-alert-dialog-content') !== undefined,
            )
          if (!content) throw new Error('Se esperaba AlertDialogContent')

          expect(content.props('disableOutsidePointerEvents')).toBe(expected)
        },
      )
    })

    describe('ui', () => {
      describe('trigger', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.trigger',
          id: '[data-test-alert-dialog-trigger]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { ui: { trigger: () => attrs } },
              slots: { default: () => h('button', 'Abrir') },
            }),
        })
      })

      describe('overlay', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.overlay',
          id: '[data-test-alert-dialog-overlay]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { overlay: () => attrs } },
            }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.content',
          id: '[data-test-alert-dialog-content]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { content: () => attrs } },
            }),
        })
      })

      describe('header', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.header',
          id: '[data-test-alert-dialog-header]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { header: () => attrs } },
            }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.label',
          id: '[data-test-alert-dialog-label]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { label: () => attrs } },
            }),
        })
      })

      describe('description', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.description',
          id: '[data-test-alert-dialog-description]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { description: () => attrs } },
            }),
        })
      })

      describe('body', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.body',
          id: '[data-test-alert-dialog-body]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { body: () => attrs } },
              slots: { content: () => h('span', 'Contenido') },
            }),
        })
      })

      describe('footer', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.footer',
          id: '[data-test-alert-dialog-footer]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { footer: () => attrs } },
            }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-alert-dialog-root]',
      mount: (attrs) => mountAlertDialog({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot predeterminado en el trigger', () => {
        const alertDialog = mountAlertDialog({
          slots: {
            default: () =>
              h('span', { 'data-test-alert-dialog-slot': 'default' }, 'Slot predeterminado'),
          },
        })

        expect(alertDialog.get('[data-test-alert-dialog-slot="default"]').text()).toBe(
          'Slot predeterminado',
        )
      })
    })

    describe('content', () => {
      it('renderiza el slot de contenido', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: { content: () => h('span', 'Contenido del slot') },
        })
        await nextTick()

        expect(getRendered(alertDialog, '[data-test-alert-dialog-content]').textContent).toContain(
          'Contenido del slot',
        )
      })
    })

    describe('header', () => {
      it('renderiza el slot de encabezado', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: {
            header: () =>
              h('div', [
                h(AlertDialogTitle, null, () => 'Encabezado del slot'),
                h(AlertDialogDescription, null, () => 'Descripción del encabezado del slot'),
              ]),
          },
        })
        await nextTick()

        expect(getRendered(alertDialog, '[data-test-alert-dialog-header]').textContent).toContain(
          'Encabezado del slot',
        )
      })
    })

    describe('label', () => {
      it('renderiza el slot de label', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true, label: 'Label predeterminado' },
          slots: { label: () => h('span', 'Label del slot') },
        })
        await nextTick()

        const label = getRendered(alertDialog, '[data-test-alert-dialog-label]')
        expect(label.textContent).toContain('Label del slot')
        expect(label.textContent).not.toContain('Label predeterminado')
      })
    })

    describe('description', () => {
      it('renderiza el slot de descripción', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true, description: 'Descripción predeterminada' },
          slots: { description: () => h('span', 'Descripción del slot') },
        })
        await nextTick()

        const description = getRendered(alertDialog, '[data-test-alert-dialog-description]')
        expect(description.textContent).toContain('Descripción del slot')
        expect(description.textContent).not.toContain('Descripción predeterminada')
      })
    })

    describe('footer', () => {
      it('renderiza el slot del pie', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: { footer: () => h('span', 'Pie del slot') },
        })
        await nextTick()

        expect(getRendered(alertDialog, '[data-test-alert-dialog-footer]').textContent).toBe(
          'Pie del slot',
        )
      })
    })

    describe('action', () => {
      it('renderiza el slot de acción', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: { action: () => h('button', 'Acción del slot') },
        })
        await nextTick()

        expect(getRendered(alertDialog, '[data-test-alert-dialog-footer]').textContent).toContain(
          'Acción del slot',
        )
        expect(alertDialog.find('[data-test-alert-dialog-action-button]').exists()).toBe(false)
      })

      it('expone close en las props del slot', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: {
            action: ({ close }) =>
              h('button', { 'data-test-alert-dialog-slot': 'action', onClick: close }, 'Acción'),
          },
        })
        await nextTick()

        await alertDialog.get('[data-test-alert-dialog-slot="action"]').trigger('click')

        expect(alertDialog.emitted('update:open')).toEqual([[false]])
      })
    })

    describe('cancel', () => {
      it('renderiza el slot de cancelación', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: { cancel: () => h('button', 'Cancelación del slot') },
        })
        await nextTick()

        expect(getRendered(alertDialog, '[data-test-alert-dialog-footer]').textContent).toContain(
          'Cancelación del slot',
        )
        expect(alertDialog.find('[data-test-alert-dialog-cancel-button]').exists()).toBe(false)
      })

      it('expone close en las props del slot', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: {
            cancel: ({ close }) =>
              h('button', { 'data-test-alert-dialog-slot': 'cancel', onClick: close }, 'Cancelar'),
          },
        })
        await nextTick()

        await alertDialog.get('[data-test-alert-dialog-slot="cancel"]').trigger('click')

        expect(alertDialog.emitted('update:open')).toEqual([[false]])
      })
    })
  })

  describe('emits', () => {
    describe('action', () => {
      it('emite action desde el botón de acción', async () => {
        const alertDialog = mountAlertDialog({ props: { open: true } })
        await nextTick()
        const actionButton = alertDialog.getComponent('[data-test-alert-dialog-action-button]')

        await actionButton.trigger('click')

        expect(alertDialog.emitted('action')).toEqual([[expect.any(Event)]])
      })
    })

    describe('cancel', () => {
      it('emite cancel desde el botón de cancelación', async () => {
        const alertDialog = mountAlertDialog({ props: { open: true } })
        await nextTick()
        const cancelButton = alertDialog.getComponent('[data-test-alert-dialog-cancel-button]')

        await cancelButton.trigger('click')

        expect(alertDialog.emitted('cancel')).toEqual([[expect.any(Event)]])
      })
    })
  })
})
