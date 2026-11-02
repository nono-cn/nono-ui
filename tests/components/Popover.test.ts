import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { describe, expect, it, vi } from 'vitest'

import {
  Popover,
  popoverDefaults,
  type PopoverContext,
  type PopoverProps,
} from '@/components/Popover'
import { testAttrs } from '../utils/testAttrs'

// abierto, con trigger y contenido; el teleport pinta su slot en sitio para encontrar el contenido en el wrapper
function mountPopover(options: MountingOptions<PopoverProps> = {}) {
  return mount(Popover, {
    ...options,
    props: { open: true, ...options.props },
    slots: {
      default: () => h('button', 'Abrir'),
      content: () => 'Contenido',
      ...options.slots,
    },
    global: {
      ...options.global,
      stubs: { teleport: { template: '<div><slot /></div>' }, ...options.global?.stubs },
    },
  })
}

describe('Popover', () => {
  describe('props', () => {
    describe('modal', () => {
      const casesModal = [
        {
          text: 'con modal=false pasa modal=false a Reka PopoverRoot',
          input: { modal: false },
          expected: { reka: { modal: false } },
        },
        {
          text: 'con modal=true pasa modal=true a Reka PopoverRoot',
          input: { modal: true },
          expected: { reka: { modal: true } },
        },
      ] as const

      it.each(casesModal)('$text', ({ input, expected }) => {
        const popover = mountPopover({ props: input })

        expect({
          reka: { modal: popover.getComponent(PopoverRoot).props('modal') },
        }).toEqual(expected)
      })
    })

    describe('open', () => {
      const casesOpen = [
        {
          text: 'con open=false pasa open=false a Reka PopoverRoot',
          input: { open: false },
          expected: { reka: { open: false } },
        },
        {
          text: 'con open=true pasa open=true a Reka PopoverRoot',
          input: { open: true },
          expected: { reka: { open: true } },
        },
      ] as const

      it.each(casesOpen)('$text', ({ input, expected }) => {
        const popover = mountPopover({ props: input })

        expect({
          reka: { open: popover.getComponent(PopoverRoot).props('open') },
        }).toEqual(expected)
      })
    })

    describe('content', () => {
      const names = Object.keys(popoverDefaults.content) as Array<
        keyof typeof popoverDefaults.content
      >

      const casesContent = [
        {
          text: 'sin content pasa los defaults a Reka PopoverContent',
          input: {},
          expected: { reka: popoverDefaults.content },
        },
        {
          text: 'con content sustituye esos defaults y mantiene el resto',
          input: { content: { side: 'top', sideOffset: 8 } },
          expected: { reka: { ...popoverDefaults.content, side: 'top', sideOffset: 8 } },
        },
      ] as const

      it.each(casesContent)('$text', ({ input, expected }) => {
        const reka = mountPopover({ props: input }).getComponent(PopoverContent)

        expect({
          reka: Object.fromEntries(names.map((name) => [name, reka.props(name)])),
        }).toEqual(expected)
      })

      it('pasa los callbacks de content a los emits de Reka PopoverContent', () => {
        const onEscapeKeyDown = vi.fn()
        const event = new KeyboardEvent('keydown', { key: 'Escape' })
        const popover = mountPopover({ props: { content: { onEscapeKeyDown } } })

        popover.getComponent(PopoverContent).vm.$emit('escapeKeyDown', event)

        expect(onEscapeKeyDown).toHaveBeenCalledWith(event)
      })
    })

    describe('showArrow', () => {
      const casesShowArrow = [
        {
          text: 'con showArrow=false no pinta el arrow',
          input: { showArrow: false },
          expected: { arrow: { exists: false } },
        },
        {
          text: 'con showArrow=true pinta el arrow',
          input: { showArrow: true },
          expected: { arrow: { exists: true } },
        },
      ] as const

      it.each(casesShowArrow)('$text', ({ input, expected }) => {
        const popover = mountPopover({ props: input })

        expect({
          arrow: { exists: popover.find('[data-test-popover-arrow]').exists() },
        }).toEqual(expected)
      })
    })

    describe('arrow', () => {
      const names = Object.keys(popoverDefaults.arrow) as Array<keyof typeof popoverDefaults.arrow>

      const casesArrow = [
        {
          text: 'sin arrow pasa los defaults a Reka PopoverArrow',
          input: {},
          expected: { reka: popoverDefaults.arrow },
        },
        {
          text: 'con arrow sustituye esos defaults y mantiene el resto',
          input: { arrow: { width: 16, rounded: true } },
          expected: { reka: { ...popoverDefaults.arrow, width: 16, rounded: true } },
        },
      ] as const

      it.each(casesArrow)('$text', ({ input, expected }) => {
        const reka = mountPopover({ props: { showArrow: true, ...input } }).getComponent(
          PopoverArrow,
        )

        expect({
          reka: Object.fromEntries(names.map((name) => [name, reka.props(name)])),
        }).toEqual(expected)
      })
    })

    describe('ui', () => {
      describe('content', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.content al contenido',
          id: '[data-test-popover-content]',
          ownClass: 'w-72',
          conflictingClass: 'w-96',
          // fixed attrs Reka PopoverContent d
          notOverridable: [
            'id',
            'role',
            'aria-labelledby',
            'data-state',
            'data-side',
            'data-align',
            'dir',
            'forcemount',
          ],
          normalized: true,
          mount: (attrs) => mountPopover({ props: { ui: { content: () => attrs } } }),
        })

        it('llama a ui.content con PopoverContext', () => {
          const content = vi.fn(() => ({}))
          mountPopover({ props: { ui: { content } } })

          expect(content).toHaveBeenLastCalledWith({ open: true, close: expect.any(Function) })
        })
      })

      describe('arrow', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.arrow al arrow',
          id: '[data-test-popover-arrow]',
          ownClass: 'fill-popover',
          conflictingClass: 'fill-red-500',
          // fixed attrs Reka PopoverArrow
          notOverridable: ['width', 'height', 'rounded'],
          normalized: true,
          mount: (attrs) =>
            mountPopover({ props: { showArrow: true, ui: { arrow: () => attrs } } }),
        })

        it('llama a ui.arrow con PopoverContext', () => {
          const arrow = vi.fn(() => ({}))
          mountPopover({ props: { showArrow: true, ui: { arrow } } })

          expect(arrow).toHaveBeenLastCalledWith({ open: true, close: expect.any(Function) })
        })
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('Recibe como slotProps: PopoverContext', () => {
        const slot = vi.fn(() => h('button', 'Abrir'))
        mountPopover({ slots: { default: slot } })

        expect(slot).toHaveBeenLastCalledWith({ open: true, close: expect.any(Function) })
      })
    })

    describe('content', () => {
      it('Se pinta el contenido del popover', () => {
        const popover = mountPopover({ slots: { content: () => h('p', 'Hola') } })

        expect(popover.get('[data-test-popover-content]').text()).toBe('Hola')
      })

      it('Recibe como slotProps: PopoverContext', () => {
        const slot = vi.fn(() => 'Hola')
        mountPopover({ slots: { content: slot } })

        expect(slot).toHaveBeenLastCalledWith({ open: true, close: expect.any(Function) })
      })
    })
  })

  describe('emits', () => {
    describe('update:open', () => {
      const casesUpdateOpen = [
        {
          text: 'cuando Reka PopoverRoot emite update:open=false emite update:open=false',
          input: { open: true, reka: false },
          expected: { emitted: [[false]] },
        },
        {
          text: 'cuando Reka PopoverRoot emite update:open=true emite update:open=true',
          input: { open: false, reka: true },
          expected: { emitted: [[true]] },
        },
      ] as const

      it.each(casesUpdateOpen)('$text', async ({ input, expected }) => {
        const popover = mountPopover({ props: { open: input.open } })

        popover.getComponent(PopoverRoot).vm.$emit('update:open', input.reka)
        await popover.vm.$nextTick()

        expect({ emitted: popover.emitted('update:open') }).toEqual(expected)
      })
    })
  })

  describe('context', () => {
    describe('PopoverContext', () => {
      const casesPopoverContext = [
        {
          text: 'con open=true tiene open=true y close() emite update:open=false',
          input: { open: true },
          expected: { open: true, emitted: [[false]] },
        },
        {
          text: 'con open=false tiene open=false y close() no emite porque ya está cerrado',
          input: { open: false },
          expected: { open: false, emitted: undefined },
        },
      ] as const

      it.each(casesPopoverContext)('$text', async ({ input, expected }) => {
        let context: PopoverContext | undefined
        const popover = mountPopover({
          props: input,
          slots: {
            default: (slotProps: PopoverContext) => {
              context = slotProps
              return h('button', 'Abrir')
            },
          },
        })
        const open = context?.open

        context?.close()
        await popover.vm.$nextTick()

        expect({ open, emitted: popover.emitted('update:open') }).toEqual(expected)
      })
    })
  })

  describe('nodos', () => {
    describe('trigger', () => {
      const casesTrigger = [
        {
          text: 'es el elemento del slot default como button',
          input: {},
          expected: { reka: { as: 'button', asChild: true } },
        },
      ] as const

      it.each(casesTrigger)('$text', ({ input, expected }) => {
        const popover = mountPopover({ props: input })

        expect({ reka: popover.getComponent(PopoverTrigger).props() }).toEqual({
          reka: expect.objectContaining(expected.reka),
        })
      })
    })

    describe('portal', () => {
      const casesPortal = [
        {
          text: 'lleva el contenido al body',
          input: {},
          expected: { reka: { to: 'body' } },
        },
      ] as const

      it.each(casesPortal)('$text', ({ input, expected }) => {
        const popover = mountPopover({ props: input })

        expect({ reka: popover.getComponent(PopoverPortal).props() }).toEqual({
          reka: expect.objectContaining(expected.reka),
        })
      })
    })

    describe('content', () => {
      const casesContent = [
        {
          text: 'es un div propio',
          input: {},
          expected: { class: [], reka: { as: 'div', asChild: false } },
        },
        {
          text: 'queda por encima del resto y crece desde el lado del trigger',
          input: {},
          expected: {
            class: ['z-50', 'origin-(--reka-popover-content-transform-origin)'],
            reka: {},
          },
        },
        {
          text: 'mide 72 de ancho sin pasar del espacio disponible',
          input: {},
          expected: {
            class: ['w-72', 'max-w-(--reka-popover-content-available-width)'],
            reka: {},
          },
        },
        {
          text: 'tiene borde redondeado, fondo y texto de popover, padding y sombra',
          input: {},
          expected: {
            class: [
              'rounded-md',
              'border',
              'bg-popover',
              'text-popover-foreground',
              'p-4',
              'shadow-md',
              'outline-hidden',
            ],
            reka: {},
          },
        },
        {
          text: 'aparece y desaparece con fundido y zoom',
          input: {},
          expected: {
            class: [
              'data-[state=open]:animate-in',
              'data-[state=closed]:animate-out',
              'data-[state=open]:fade-in-0',
              'data-[state=closed]:fade-out-0',
              'data-[state=open]:zoom-in-95',
              'data-[state=closed]:zoom-out-95',
            ],
            reka: {},
          },
        },
        {
          text: 'entra deslizándose desde el lado del trigger',
          input: {},
          expected: {
            class: [
              'data-[side=top]:slide-in-from-bottom-2',
              'data-[side=right]:slide-in-from-left-2',
              'data-[side=bottom]:slide-in-from-top-2',
              'data-[side=left]:slide-in-from-right-2',
            ],
            reka: {},
          },
        },
      ] as const

      it.each(casesContent)('$text', ({ input, expected }) => {
        const popover = mountPopover({ props: input })

        expect({
          class: popover.get('[data-test-popover-content]').classes(),
          reka: popover.getComponent(PopoverContent).props(),
        }).toEqual({
          class: expect.arrayContaining(expected.class),
          reka: expect.objectContaining(expected.reka),
        })
      })
    })

    describe('arrow', () => {
      const casesArrow = [
        {
          text: 'es un svg propio',
          input: { showArrow: true },
          expected: { class: [], reka: { as: 'svg', asChild: false } },
        },
        {
          text: 'tiene el fondo y el borde del contenido',
          input: { showArrow: true },
          expected: { class: ['fill-popover', 'stroke-border'], reka: {} },
        },
        {
          text: 'sube 1px para tapar el borde del contenido',
          input: { showArrow: true },
          expected: { class: ['-translate-y-px'], reka: {} },
        },
        {
          text: 'su trazo no se escala con el tamaño del arrow',
          input: { showArrow: true },
          expected: { class: ['[&>path]:[vector-effect:non-scaling-stroke]'], reka: {} },
        },
      ] as const

      it.each(casesArrow)('$text', ({ input, expected }) => {
        const popover = mountPopover({ props: input })

        expect({
          class: popover.get('[data-test-popover-arrow]').classes(),
          reka: popover.getComponent(PopoverArrow).props(),
        }).toEqual({
          class: expect.arrayContaining(expected.class),
          reka: expect.objectContaining(expected.reka),
        })
      })
    })
  })
})
