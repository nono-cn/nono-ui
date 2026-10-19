import { h } from 'vue'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'

import {
  Popover,
  popoverDefaults,
  type PopoverArrowConfig,
  type PopoverContentConfig,
  type PopoverContext,
  type PopoverProps,
  type PopoverSlots,
  type PopoverUI,
} from '@/components/ui/Popover'
import { arrowPaths } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'

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
  { input: undefined, expected: popoverDefaults.modal },
] satisfies Array<{ input: PopoverProps['modal']; expected: boolean }>

const casesOpen = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: popoverDefaults.open },
] satisfies Array<{ input: PopoverProps['open']; expected: boolean }>

const casesShowArrow = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: popoverDefaults.showArrow },
] satisfies Array<{ input: PopoverProps['showArrow']; expected: boolean }>

const customContent = {
  side: 'top',
  sideOffset: 12,
  align: 'start',
  alignOffset: 6,
  collisionPadding: 16,
  avoidCollisions: false,
  disableOutsidePointerEvents: true,
} satisfies PopoverContentConfig

const casesContent = [
  { name: 'sin configuración', input: undefined, expected: popoverDefaults.content },
  {
    name: 'con configuración',
    input: customContent,
    expected: { ...popoverDefaults.content, ...customContent },
  },
] satisfies Array<{ name: string; input: PopoverProps['content']; expected: object }>

const customArrow = { width: 16, height: 8, rounded: true } satisfies PopoverArrowConfig

const casesArrow = [
  { name: 'sin configuración', input: undefined, expected: popoverDefaults.arrow },
  {
    name: 'con configuración',
    input: customArrow,
    expected: { ...popoverDefaults.arrow, ...customArrow },
  },
] satisfies Array<{ name: string; input: PopoverProps['arrow']; expected: object }>

const casesArrowPath = [
  { name: 'redondeado', input: true, expected: arrowPaths.rounded },
  { name: 'recto', input: false, expected: arrowPaths.sharp },
  { name: 'por defecto', input: undefined, expected: arrowPaths.sharp },
] satisfies Array<{ name: string; input: PopoverArrowConfig['rounded']; expected: string }>

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
    expected: { open: popoverDefaults.open },
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

const casesUiContext = ['content', 'arrow'] satisfies Array<keyof PopoverUI>

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

    describe('trigger', () => {
      it('usa un button con asChild en el PopoverTrigger', () => {
        expect(mountPopover().getComponent(PopoverTrigger).props()).toMatchObject({
          as: 'button',
          asChild: true,
        })
      })
    })

    describe('portal', () => {
      it('teletransporta al body con opciones de portal fijas', () => {
        const popover = mountPopover({ props: { open: true } })

        expect(popover.getComponent(PopoverPortal).vm.$.vnode.props).toMatchObject({
          to: 'body',
          forceMount: false,
          defer: undefined,
          disabled: undefined,
        })
      })
    })

    describe('content', () => {
      it.each(casesContent)('pasa content $name al PopoverContent', ({ input, expected }) => {
        const popover = mountPopover({ props: { open: true, content: input } })

        expect(popover.getComponent(PopoverContent).props()).toMatchObject(expected)
      })
    })

    describe('arrow', () => {
      it.each(casesArrow)('pasa arrow $name al PopoverArrow', ({ input, expected }) => {
        const popover = mountPopover({ props: { open: true, showArrow: true, arrow: input } })

        expect(popover.getComponent(PopoverArrow).props()).toMatchObject(expected)
      })

      it.each(casesArrowPath)('con rounded=$input pinta el path $name', ({ input, expected }) => {
        const arrow = mountPopover({
          props: { open: true, showArrow: true, arrow: { rounded: input } },
        }).get('[data-test-popover-arrow] path')

        expect(arrow.attributes('d')).toBe(expected)
      })
    })

    describe('ui', () => {
      testAttrs({
        text: 'pasa atributos mediante ui.content',
        id: '[data-test-popover-content]',
        // reka-ui fija el id del contenido para enlazarlo con aria-controls del trigger
        assertId: false,
        mount: (attrs) => mountPopover({ props: { open: true, ui: { content: () => attrs } } }),
      })

      testAttrs({
        text: 'pasa atributos mediante ui.arrow',
        id: '[data-test-popover-arrow]',
        mount: (attrs) =>
          mountPopover({ props: { open: true, showArrow: true, ui: { arrow: () => attrs } } }),
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
        ).toEqual(expect.arrayContaining(['fill-popover', 'stroke-border', '-translate-y-px']))
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

      it.each(casesUiContext)('pasa PopoverContext a ui.%s', (name) => {
        const resolver = vi.fn(() => ({}))
        mountPopover({ props: { open: true, showArrow: true, ui: { [name]: resolver } } })

        expect(resolver).toHaveBeenCalledWith(expectedPopoverContext)
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
