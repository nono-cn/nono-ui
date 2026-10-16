import { h } from 'vue'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PopoverArrow, PopoverContent, PopoverRoot } from 'reka-ui'

import {
  Popover,
  type PopoverContext,
  type PopoverProps,
  type PopoverSlots,
} from '@/components/ui/Popover'
import { testArrowConfig } from '../utils/testArrowConfig'
import { testAttrs } from '../utils/testAttrs'
import { testContentConfig } from '../utils/testContentConfig'

// reka-ui posiciona el contenido con floating-ui, que necesita ResizeObserver
vi.stubGlobal(
  'ResizeObserver',
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
)

afterEach(() => {
  document.body.innerHTML = ''
})

const casesModal = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
] satisfies Array<{ input: PopoverProps['modal']; expected: boolean }>

const casesOpen = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
] satisfies Array<{ input: PopoverProps['open']; expected: boolean }>

const casesShowArrow = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
] satisfies Array<{ input: PopoverProps['showArrow']; expected: boolean }>

const contextFunctions = {
  close: expect.any(Function),
}

const casesPopoverContext = [
  {
    name: 'abierto',
    input: { open: true },
    expected: { open: true },
  },
  {
    name: 'cerrado',
    input: { open: false },
    expected: { open: false },
  },
  {
    name: 'open por defecto',
    input: { open: undefined },
    expected: { open: false },
  },
] satisfies Array<{
  name: string
  input: Partial<PopoverProps>
  expected: Omit<PopoverContext, keyof typeof contextFunctions>
}>

// contexto del popover abierto, usado para comprobar que llega a cada slot
const expectedPopoverContext: PopoverContext = {
  ...casesPopoverContext[0]!.expected,
  ...contextFunctions,
}

const casesSlotContext = ['default', 'content'] satisfies Array<keyof PopoverSlots>

const casesUpdateOpen = [
  { input: false, expected: true },
  { input: true, expected: false },
] satisfies Array<{ input: PopoverProps['open']; expected: boolean }>

function mountPopover(options: ComponentMountingOptions<typeof Popover> = {}) {
  const { slots, global, ...rest } = options
  return mount(Popover, {
    attachTo: document.body,
    global: {
      ...global,
      // el portal se pinta en línea para poder buscar el contenido dentro del wrapper
      stubs: { PopoverPortal: { template: '<div><slot /></div>' }, ...global?.stubs },
    },
    // un slot a undefined quita el slot por defecto (vue test utils no acepta slots undefined)
    slots: Object.fromEntries(
      Object.entries({
        default: () => h('button', 'Abrir'),
        content: () => h('p', 'Contenido'),
        ...slots,
      }).filter(([, slot]) => slot !== undefined),
    ),
    ...rest,
  })
}

describe('Popover', () => {
  describe('props', () => {
    describe('modal', () => {
      it.each(casesModal)(
        'pasa modal=$input al PopoverRoot como $expected',
        ({ input, expected }) => {
          const popover = mountPopover({ props: { modal: input } })

          expect(popover.getComponent(PopoverRoot).props('modal')).toBe(expected)
        },
      )
    })

    describe('open', () => {
      it.each(casesOpen)(
        'pasa open=$input al PopoverRoot como $expected',
        ({ input, expected }) => {
          const popover = mountPopover({ props: { open: input } })

          expect(popover.getComponent(PopoverRoot).props('open')).toBe(expected)
        },
      )
    })

    describe('content', () => {
      testContentConfig({
        text: 'pasa la configuración de content al PopoverContent',
        id: '[data-test-popover-content]',
        mount: (content) => mountPopover({ props: { open: true, content } }),
        getProps: (popover) => popover.getComponent(PopoverContent).props(),
      })
    })

    describe('arrow', () => {
      testArrowConfig({
        text: 'pasa la configuración de arrow al PopoverArrow',
        id: '[data-test-popover-arrow]',
        mount: (arrow) => mountPopover({ props: { open: true, showArrow: true, arrow } }),
        getProps: (popover) => popover.getComponent(PopoverArrow).props(),
      })
    })

    describe('showArrow', () => {
      it.each(casesShowArrow)(
        'con showArrow=$input renderiza la flecha: $expected',
        ({ input, expected }) => {
          const popover = mountPopover({ props: { open: true, showArrow: input } })

          expect(popover.find('[data-test-popover-arrow]').exists()).toBe(expected)
        },
      )
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-popover-root]',
      mount: (attrs) => mountPopover({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot dentro del trigger', () => {
        expect(mountPopover().get('[data-test-popover-trigger]').text()).toBe('Abrir')
      })
    })

    describe('content', () => {
      it('renderiza el slot dentro del contenido', () => {
        expect(
          mountPopover({ props: { open: true } })
            .get('[data-test-popover-content]')
            .text(),
        ).toBe('Contenido')
      })

      it('no renderiza el contenido si no hay slot content', () => {
        const popover = mountPopover({ props: { open: true }, slots: { content: undefined } })

        expect(popover.find('[data-test-popover-content]').exists()).toBe(false)
      })
    })
  })

  describe('variantsCss', () => {
    describe('popoverRootVariants', () => {
      it('aplica las clases base a la raíz', () => {
        expect(mountPopover().get('[data-test-popover-root]').classes()).toContain('contents')
      })
    })

    describe('popoverContentVariants', () => {
      it('aplica las clases base al contenido', () => {
        expect(
          mountPopover({ props: { open: true } })
            .get('[data-test-popover-content]')
            .classes(),
        ).toEqual(
          expect.arrayContaining([
            'z-50',
            'w-72',
            'rounded-md',
            'border',
            'bg-popover',
            'p-4',
            'text-popover-foreground',
            'shadow-md',
            'outline-hidden',
          ]),
        )
      })
    })

    describe('popoverArrowVariants', () => {
      it('aplica las clases base a la flecha', () => {
        expect(
          mountPopover({ props: { open: true, showArrow: true } })
            .get('[data-test-popover-arrow]')
            .classes(),
        ).toEqual(
          expect.arrayContaining([
            'fill-popover',
            '-translate-y-px',
            'drop-shadow-[0_1px_0_var(--color-border)]',
          ]),
        )
      })
    })
  })

  describe('context', () => {
    describe('PopoverContext', () => {
      it.each(casesPopoverContext)(
        'cumple el contrato de PopoverContext en el caso $name',
        ({ input, expected }) => {
          let context: PopoverContext | undefined
          mountPopover({
            props: input,
            slots: {
              default: (value: PopoverContext) => {
                context = value
                return h('button', 'Abrir')
              },
            },
          })

          expect(context).toEqual({ ...expected, ...contextFunctions })
        },
      )

      it.each(casesSlotContext)('pasa PopoverContext al slot %s', (name) => {
        let context: PopoverContext | undefined
        mountPopover({
          props: { open: true },
          slots: {
            [name]: (value: PopoverContext) => {
              context = value
              return h('span', 'Slot')
            },
          },
        })

        expect(context).toEqual(expectedPopoverContext)
      })
    })
  })

  describe('emits', () => {
    describe('update:open', () => {
      it.each(casesUpdateOpen)(
        'reemite $expected cuando PopoverRoot cambia open=$input',
        ({ input, expected }) => {
          const popover = mountPopover({ props: { open: input } })

          popover.getComponent(PopoverRoot).vm.$emit('update:open', expected)

          expect(popover.emitted('update:open')).toEqual([[expected]])
        },
      )
    })
  })
})
