import { h, nextTick } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import { mount, type MountingOptions } from '@vue/test-utils'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { Dialog, type DialogContext, type DialogProps } from '@/components/ui/Dialog'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'
import { testIconConfig } from '../utils/testIconConfig'

afterEach(() => {
  document.body.innerHTML = ''
})

function mountDialog(options: MountingOptions<DialogProps> = {}) {
  return mount(Dialog, {
    attachTo: document.body,
    global: {
      plugins: [i18n],
      stubs: { DialogPortal: { template: '<div><slot /></div>' } },
      ...options.global,
    },
    ...options,
  })
}

function getContent(wrapper: ReturnType<typeof mountDialog>) {
  const content = wrapper
    .findAllComponents(DialogContent)
    .find((component) => component.attributes('data-test-dialog-content') !== undefined)

  if (!content) throw new Error('Se esperaba DialogContent')
  return content
}

const casesOpen = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesModal = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: true },
]

const casesUnmountOnHide = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: true },
]

const casesBlock = [
  { input: true, closeButton: false, openAfterClose: true },
  { input: false, closeButton: true, openAfterClose: false },
  { input: undefined, closeButton: true, openAfterClose: false },
]

const casesLabel = [
  { input: 'Título del diálogo', expected: true },
  { input: '', expected: false },
  { input: undefined, expected: false },
]

const casesDescription = [
  { input: 'Descripción del diálogo', expected: true },
  { input: '', expected: false },
  { input: undefined, expected: false },
]

const casesShowCloseButton = [
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
  { input: false, expected: false },
  { input: true, expected: true },
  { input: undefined, expected: true },
]

const casesContext = [
  { name: 'valores predeterminados', input: undefined, expected: false },
  { name: 'cerrado', input: false, expected: false },
  { name: 'abierto', input: true, expected: true },
]

const casesContentEmits = [
  { event: 'openAutoFocus', input: new Event('focus') },
  { event: 'closeAutoFocus', input: new Event('blur') },
  { event: 'escapeKeyDown', input: new KeyboardEvent('keydown') },
  { event: 'pointerDownOutside', input: new Event('pointerdown') },
  { event: 'focusOutside', input: new Event('focusout') },
  { event: 'interactOutside', input: new Event('click') },
]

describe('Dialog', () => {
  describe('props', () => {
    describe('portal', () => {
      it('apunta al destino local después del trigger en el DOM', async () => {
        const wrapper = mountDialog({ slots: { default: () => h('button', 'Abrir') } })
        await nextTick()

        const portal = wrapper.getComponent(DialogPortal)
        const trigger = wrapper.get('[data-test-dialog-trigger]')
        const target = wrapper.get('[data-test-dialog-portal-target]').element

        expect(portal.vm.$.vnode.props?.to).toBe(target)
        expect(
          trigger.element.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy()
      })
    })

    describe('open', () => {
      it.each(casesOpen)('pasa open=$input a DialogRoot como $expected', ({ input, expected }) => {
        const wrapper = mountDialog({
          props: { open: input, label: 'Título', description: 'Descripción' },
        })

        expect(wrapper.getComponent(DialogRoot).props('open')).toBe(expected)
      })
    })

    describe('modal', () => {
      it.each(casesModal)(
        'pasa modal=$input a DialogRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountDialog({ props: { modal: input } })

          expect(wrapper.getComponent(DialogRoot).props('modal')).toBe(expected)
        },
      )
    })

    describe('unmountOnHide', () => {
      it.each(casesUnmountOnHide)(
        'pasa unmountOnHide=$input a DialogRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountDialog({
            props: { unmountOnHide: input, label: 'Título', description: 'Descripción' },
          })

          expect(wrapper.getComponent(DialogRoot).props('unmountOnHide')).toBe(expected)
        },
      )
    })

    describe('block', () => {
      it.each(casesBlock)(
        'renderiza el botón de cierre y controla el cierre para block=$input',
        async ({ input, closeButton, openAfterClose }) => {
          let context: DialogContext | undefined
          const wrapper = mountDialog({
            props: {
              open: true,
              block: input,
              label: 'Título',
              description: 'Descripción',
            },
            slots: {
              default: (slotContext: DialogContext) => {
                context = slotContext
                return h('button', 'Disparador')
              },
            },
          })
          await nextTick()

          expect(wrapper.findComponent(DialogClose).exists()).toBe(closeButton)

          context?.close()
          await nextTick()

          expect(wrapper.getComponent(DialogRoot).props('open')).toBe(openAfterClose)
        },
      )
    })

    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input como $expected', async ({ input, expected }) => {
        const wrapper = mountDialog({
          props: {
            open: expected,
            label: input,
            description: expected ? 'Descripción' : undefined,
          },
        })
        await nextTick()

        expect(wrapper.findComponent(DialogTitle).exists()).toBe(expected)
        if (expected) expect(wrapper.getComponent(DialogTitle).text()).toBe(input)
      })
    })

    describe('description', () => {
      it.each(casesDescription)(
        'renderiza description=$input como $expected',
        async ({ input, expected }) => {
          const wrapper = mountDialog({
            props: {
              open: expected,
              label: expected ? 'Título' : undefined,
              description: input,
            },
          })
          await nextTick()

          expect(wrapper.findComponent(DialogDescription).exists()).toBe(expected)
          if (expected) expect(wrapper.getComponent(DialogDescription).text()).toBe(input)
        },
      )
    })

    describe('icon', () => {
      testIconConfig({
        text: 'pasa las props de icon',
        id: '[data-test-dialog-icon]',
        mount: async (input) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Título',
              description: 'Descripción',
              icon: input,
              showCloseButton: false,
            },
          })
          await nextTick()
          return wrapper
        },
      })
    })

    describe('closeIcon', () => {
      testIconConfig({
        text: 'pasa las props de closeIcon',
        id: '[data-test-dialog-close-icon]',
        default: 'x',
        mount: async (input) => {
          const wrapper = mountDialog({
            props: { open: true, label: 'Título', description: 'Descripción', closeIcon: input },
          })
          await nextTick()
          return wrapper
        },
      })
    })

    describe('showCloseButton', () => {
      it.each(casesShowCloseButton)(
        'renderiza showCloseButton=$input como $expected',
        async ({ input, expected }) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Título',
              description: 'Descripción',
              showCloseButton: input,
            },
          })
          await nextTick()

          expect(wrapper.findComponent(DialogClose).exists()).toBe(expected)
        },
      )
    })

    describe('forceMount', () => {
      it.each(casesForceMount)(
        'pasa forceMount=$input a DialogContent como $expected',
        async ({ input, expected }) => {
          const wrapper = mountDialog({
            props: { open: true, label: 'Título', description: 'Descripción', forceMount: input },
          })
          await nextTick()

          expect(getContent(wrapper).props('forceMount')).toBe(expected)
        },
      )
    })

    describe('disableOutsidePointerEvents', () => {
      it.each(casesDisableOutsidePointerEvents)(
        'pasa disableOutsidePointerEvents=$input a DialogContent como $expected',
        async ({ input, expected }) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Título',
              description: 'Descripción',
              disableOutsidePointerEvents: input,
            },
          })
          await nextTick()

          expect(getContent(wrapper).props('disableOutsidePointerEvents')).toBe(expected)
        },
      )
    })

    describe('ui', () => {
      testAttrs({
        text: 'pasa atributos mediante ui.overlay',
        id: '[data-test-dialog-overlay]',
        mount: async (attrs) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Título',
              description: 'Descripción',
              ui: { overlay: () => attrs },
            },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'pasa atributos mediante ui.content',
        id: '[data-test-dialog-content]',
        mount: async (attrs) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Título',
              description: 'Descripción',
              ui: { content: () => attrs },
            },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'pasa atributos mediante ui.header',
        id: '[data-test-dialog-header]',
        mount: async (attrs) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Título',
              description: 'Descripción',
              ui: { header: () => attrs },
            },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'pasa atributos mediante ui.label',
        id: '[data-test-dialog-label]',
        assertId: false,
        mount: async (attrs) => {
          const { id: _id, ...labelAttrs } = attrs
          void _id
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Título',
              description: 'Descripción',
              ui: { label: () => labelAttrs },
            },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'pasa atributos mediante ui.description',
        id: '[data-test-dialog-description]',
        assertId: false,
        mount: async (attrs) => {
          const { id: _id, ...descriptionAttrs } = attrs
          void _id
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Título',
              description: 'Descripción',
              ui: { description: () => descriptionAttrs },
            },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'pasa atributos mediante ui.body',
        id: '[data-test-dialog-body]',
        mount: async (attrs) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Título',
              description: 'Descripción',
              ui: { body: () => attrs },
            },
            slots: { content: () => h('span', 'Cuerpo') },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'pasa atributos mediante ui.footer',
        id: '[data-test-dialog-footer]',
        mount: async (attrs) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Título',
              description: 'Descripción',
              ui: { footer: () => attrs },
            },
            slots: { footer: () => h('span', 'Pie') },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'pasa atributos mediante ui.close',
        id: '[data-test-dialog-close]',
        mount: async (attrs) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Título',
              description: 'Descripción',
              ui: { close: () => attrs },
            },
          })
          await nextTick()
          return wrapper
        },
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-dialog-root]',
      mount: (attrs) => mountDialog({ attrs }),
    })
  })

  describe('context contract', () => {
    it.each(casesContext)('pasa el contrato con $name', async ({ input, expected }) => {
      let context: DialogContext | undefined

      const wrapper = mountDialog({
        props: { open: input, label: 'Título', description: 'Descripción' },
        slots: {
          default: (slotContext: DialogContext) => {
            context = slotContext
            return h('button', 'Disparador')
          },
        },
      })

      expect(context).toEqual({
        open: expected,
        close: expect.any(Function),
      })

      context?.close()
      await nextTick()

      expect(wrapper.getComponent(DialogRoot).props('open')).toBe(false)
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot predeterminado', async () => {
        const wrapper = mountDialog({
          slots: {
            default: () => h('span', { 'data-test-dialog-slot': 'default' }, 'Slot predeterminado'),
          },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="default"]').text()).toBe('Slot predeterminado')
      })
    })

    describe('content', () => {
      it('renderiza el slot content', async () => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Título', description: 'Descripción' },
          slots: {
            content: () => h('span', { 'data-test-dialog-slot': 'content' }, 'Contenido del slot'),
          },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="content"]').text()).toBe('Contenido del slot')
      })
    })

    describe('header', () => {
      it('renderiza el slot header', async () => {
        const wrapper = mountDialog({
          props: { open: true },
          slots: {
            header: () =>
              h('div', [
                h(DialogTitle, null, { default: () => 'Título de cabecera' }),
                h(DialogDescription, null, { default: () => 'Descripción de cabecera' }),
                h('span', { 'data-test-dialog-slot': 'header' }, 'Cabecera personalizada'),
              ]),
          },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="header"]').text()).toBe(
          'Cabecera personalizada',
        )
      })
    })

    describe('label', () => {
      it('renderiza el slot label', async () => {
        const wrapper = mountDialog({
          props: { open: true, description: 'Descripción' },
          slots: {
            label: () => h('span', { 'data-test-dialog-slot': 'label' }, 'Etiqueta del slot'),
          },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="label"]').text()).toBe('Etiqueta del slot')
      })
    })

    describe('description', () => {
      it('renderiza el slot description', async () => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Título' },
          slots: {
            description: () =>
              h('span', { 'data-test-dialog-slot': 'description' }, 'Descripción del slot'),
          },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="description"]').text()).toBe(
          'Descripción del slot',
        )
      })
    })

    describe('footer', () => {
      it('renderiza el slot footer', async () => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Título', description: 'Descripción' },
          slots: { footer: () => h('span', { 'data-test-dialog-slot': 'footer' }, 'Pie del slot') },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="footer"]').text()).toBe('Pie del slot')
      })
    })

    describe('close', () => {
      it('renderiza el slot close', async () => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Título', description: 'Descripción' },
          slots: {
            close: () => h('span', { 'data-test-dialog-slot': 'close' }, 'Cierre personalizado'),
          },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="close"]').text()).toBe('Cierre personalizado')
      })
    })

    describe('closeIcon', () => {
      it('renderiza el slot closeIcon', async () => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Título', description: 'Descripción' },
          slots: {
            closeIcon: () => h('span', { 'data-test-dialog-slot': 'closeIcon' }, 'Icono de cierre'),
          },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="closeIcon"]').text()).toBe('Icono de cierre')
      })
    })
  })

  describe('emits', () => {
    describe('show', () => {
      it('emite show cuando se abre el diálogo', async () => {
        const wrapper = mountDialog({
          props: { open: false, label: 'Título', description: 'Descripción' },
        })

        await wrapper.setProps({ open: true })

        expect(wrapper.emitted('show')).toEqual([[]])
      })
    })

    describe('close', () => {
      it('emite close cuando se cierra el diálogo', async () => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Título', description: 'Descripción' },
        })

        await wrapper.setProps({ open: false })

        expect(wrapper.emitted('close')).toEqual([[]])
      })
    })

    describe('emits de Reka DialogContent', () => {
      it.each(casesContentEmits)(
        'emite $event desde Reka DialogContent',
        async ({ event, input }) => {
          const wrapper = mountDialog({
            props: { open: true, label: 'Título', description: 'Descripción' },
          })
          await nextTick()

          getContent(wrapper).vm.$emit(event, input)

          expect(wrapper.emitted(event)).toEqual([[input]])
        },
      )
    })
  })
})
