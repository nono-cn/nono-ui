import { h } from 'vue'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui'

import {
  Tooltip,
  tooltipDefaults,
  type TooltipArrowConfig,
  type TooltipContentConfig,
  type TooltipContext,
  type TooltipProps,
  type TooltipSlots,
} from '@/components/ui/Tooltip'

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

const casesVariantsCss = [
  {
    name: 'tooltipContentVariants',
    part: 'el contenido',
    input: '[data-test-tooltip-content]',
    expected: [
      'z-50',
      'w-fit',
      'max-w-(--reka-tooltip-content-available-width)',
      'origin-(--reka-tooltip-content-transform-origin)',
      'rounded-md',
      'border',
      'bg-popover',
      'px-3',
      'py-1.5',
      'text-xs',
      'text-balance',
      'text-popover-foreground',
      'shadow-md',
    ],
  },
  {
    name: 'tooltipArrowVariants',
    part: 'la flecha',
    input: '[data-test-tooltip-arrow]',
    expected: ['fill-popover', 'stroke-border', '-translate-y-px'],
  },
] satisfies Array<{ name: string; part: string; input: string; expected: string[] }>

const casesOpen = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: tooltipDefaults.open },
] satisfies Array<{ input: TooltipProps['open']; expected: boolean }>

const casesText = [
  { input: 'Ayuda', expected: 'Ayuda' },
  { input: 'Guardar cambios', expected: 'Guardar cambios' },
] satisfies Array<{ input: TooltipProps['text']; expected: string }>

const casesDelayDuration = [
  { input: 300, expected: 300 },
  { input: 0, expected: 0 },
  { input: undefined, expected: tooltipDefaults.delayDuration },
] satisfies Array<{ input: TooltipProps['delayDuration']; expected: number }>

const casesDisableHoverableContent = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: tooltipDefaults.disableHoverableContent },
] satisfies Array<{
  input: TooltipProps['disableHoverableContent']
  expected: boolean | undefined
}>

const casesDisableClosingTrigger = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: tooltipDefaults.disableClosingTrigger },
] satisfies Array<{ input: TooltipProps['disableClosingTrigger']; expected: boolean }>

const casesDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: tooltipDefaults.disabled },
] satisfies Array<{ input: TooltipProps['disabled']; expected: boolean }>

const casesIgnoreNonKeyboardFocus = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: tooltipDefaults.ignoreNonKeyboardFocus },
] satisfies Array<{ input: TooltipProps['ignoreNonKeyboardFocus']; expected: boolean }>

const casesShowArrow = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: tooltipDefaults.showArrow },
] satisfies Array<{ input: TooltipProps['showArrow']; expected: boolean }>

const customContent = {
  side: 'bottom',
  sideOffset: 12,
  align: 'start',
  alignOffset: 6,
  collisionPadding: 16,
  avoidCollisions: false,
  ariaLabel: 'Ayuda',
} satisfies TooltipContentConfig

const casesContent = [
  { name: 'sin configuración', input: undefined, expected: tooltipDefaults.content },
  {
    name: 'con configuración',
    input: customContent,
    expected: { ...tooltipDefaults.content, ...customContent },
  },
] satisfies Array<{ name: string; input: TooltipProps['content']; expected: object }>

const customArrow = { width: 16, height: 8 } satisfies TooltipArrowConfig

const casesArrow = [
  { name: 'sin configuración', input: undefined, expected: tooltipDefaults.arrow },
  {
    name: 'con configuración',
    input: customArrow,
    expected: { ...tooltipDefaults.arrow, ...customArrow },
  },
] satisfies Array<{ name: string; input: TooltipProps['arrow']; expected: object }>

const contentAttrs = {
  input: { class: 'custom-content', style: 'opacity: 0.5', title: 'Contenido' },
  expected: { class: 'custom-content', style: 'opacity: 0.5', title: 'Contenido' },
} satisfies { input: TooltipContentConfig; expected: Record<string, string> }

const arrowAttrs = {
  input: { class: 'custom-arrow', style: 'opacity: 0.5', title: 'Flecha' },
  expected: { class: 'custom-arrow', style: 'opacity: 0.5', title: 'Flecha' },
} satisfies { input: TooltipArrowConfig; expected: Record<string, string> }

const contextFunctions = {
  close: expect.any(Function),
}

const casesTooltipContext = [
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
    expected: { open: tooltipDefaults.open },
  },
] satisfies Array<{
  name: string
  input: Partial<TooltipProps>
  expected: Omit<TooltipContext, keyof typeof contextFunctions>
}>

// contexto del tooltip abierto, usado para comprobar que llega a cada slot
const expectedTooltipContext: TooltipContext = {
  ...casesTooltipContext[0]!.expected,
  ...contextFunctions,
}

const casesSlotContext = ['default', 'content'] satisfies Array<keyof TooltipSlots>

const casesUpdateOpen = [
  { input: false, expected: true },
  { input: true, expected: false },
] satisfies Array<{ input: TooltipProps['open']; expected: boolean }>

function mountTooltip(options: ComponentMountingOptions<typeof Tooltip> = {}) {
  const { props, slots, global } = options
  // un slot a undefined quita el slot por defecto
  const tooltipSlots = Object.fromEntries(
    Object.entries({
      default: () => h('button', 'Abrir'),
      content: () => h('p', 'Contenido'),
      ...slots,
    }).filter(([, slot]) => slot !== undefined),
  )

  // el TooltipProvider lo aporta el ConfigProvider de la app
  return mount(TooltipProvider, {
    attachTo: document.body,
    global: {
      ...global,
      // el portal se pinta en línea para poder buscar el contenido dentro del wrapper
      stubs: { TooltipPortal: { template: '<div><slot /></div>' }, ...global?.stubs },
    },
    slots: { default: () => h(Tooltip, props, tooltipSlots) },
  }).findComponent(Tooltip)
}

describe('Tooltip', () => {
  describe('props', () => {
    describe('open', () => {
      it.each(casesOpen)(
        'pasa open=$input al TooltipRoot como $expected',
        ({ input, expected }) => {
          const tooltip = mountTooltip({ props: { open: input } })

          expect(tooltip.getComponent(TooltipRoot).props('open')).toBe(expected)
        },
      )
    })

    describe('text', () => {
      it.each(casesText)('renderiza text=$input dentro del contenido', ({ input, expected }) => {
        const tooltip = mountTooltip({
          props: { open: true, text: input },
          slots: { content: undefined },
        })

        expect(tooltip.get('[data-test-tooltip-content]').text()).toContain(expected)
      })
    })

    describe('delayDuration', () => {
      it.each(casesDelayDuration)(
        'pasa delayDuration=$input al TooltipRoot como $expected',
        ({ input, expected }) => {
          const tooltip = mountTooltip({ props: { delayDuration: input } })

          expect(tooltip.getComponent(TooltipRoot).props('delayDuration')).toBe(expected)
        },
      )
    })

    describe('disableHoverableContent', () => {
      it.each(casesDisableHoverableContent)(
        'pasa disableHoverableContent=$input al TooltipRoot como $expected',
        ({ input, expected }) => {
          const tooltip = mountTooltip({ props: { disableHoverableContent: input } })

          expect(tooltip.getComponent(TooltipRoot).props('disableHoverableContent')).toBe(expected)
        },
      )
    })

    describe('disableClosingTrigger', () => {
      it.each(casesDisableClosingTrigger)(
        'pasa disableClosingTrigger=$input al TooltipRoot como $expected',
        ({ input, expected }) => {
          const tooltip = mountTooltip({ props: { disableClosingTrigger: input } })

          expect(tooltip.getComponent(TooltipRoot).props('disableClosingTrigger')).toBe(expected)
        },
      )
    })

    describe('disabled', () => {
      it.each(casesDisabled)(
        'pasa disabled=$input al TooltipRoot como $expected',
        ({ input, expected }) => {
          const tooltip = mountTooltip({ props: { disabled: input } })

          expect(tooltip.getComponent(TooltipRoot).props('disabled')).toBe(expected)
        },
      )
    })

    describe('ignoreNonKeyboardFocus', () => {
      it.each(casesIgnoreNonKeyboardFocus)(
        'pasa ignoreNonKeyboardFocus=$input al TooltipRoot como $expected',
        ({ input, expected }) => {
          const tooltip = mountTooltip({ props: { ignoreNonKeyboardFocus: input } })

          expect(tooltip.getComponent(TooltipRoot).props('ignoreNonKeyboardFocus')).toBe(expected)
        },
      )
    })

    describe('trigger', () => {
      it('usa un button con asChild en el TooltipTrigger', () => {
        expect(mountTooltip().getComponent(TooltipTrigger).props()).toMatchObject({
          as: 'button',
          asChild: true,
        })
      })
    })

    describe('portal', () => {
      it('teletransporta al body con opciones de portal fijas', () => {
        const tooltip = mountTooltip({ props: { open: true } })

        expect(tooltip.getComponent(TooltipPortal).vm.$.vnode.props).toMatchObject({
          to: 'body',
          forceMount: false,
          defer: undefined,
          disabled: undefined,
        })
      })
    })

    describe('content', () => {
      it.each(casesContent)('pasa content $name al TooltipContent', ({ input, expected }) => {
        const tooltip = mountTooltip({ props: { open: true, content: input } })

        expect(tooltip.getComponent(TooltipContent).props()).toMatchObject(expected)
      })

      it('pasa la clase, el estilo y los atributos de content al contenido', () => {
        const content = mountTooltip({
          props: { open: true, content: contentAttrs.input },
        }).get('[data-test-tooltip-content]')

        expect(content.classes()).toContain(contentAttrs.expected.class)
        expect(content.attributes('style')).toContain(contentAttrs.expected.style)
        expect(content.attributes('title')).toBe(contentAttrs.expected.title)
      })
    })

    describe('arrow', () => {
      it.each(casesArrow)('pasa arrow $name al TooltipArrow', ({ input, expected }) => {
        const tooltip = mountTooltip({ props: { open: true, showArrow: true, arrow: input } })

        expect(tooltip.getComponent(TooltipArrow).props()).toMatchObject(expected)
      })

      it('pasa la clase, el estilo y los atributos de arrow a la flecha', () => {
        const arrow = mountTooltip({
          props: { open: true, showArrow: true, arrow: arrowAttrs.input },
        }).get('[data-test-tooltip-arrow]')

        expect(arrow.classes()).toContain(arrowAttrs.expected.class)
        expect(arrow.attributes('style')).toContain(arrowAttrs.expected.style)
        expect(arrow.attributes('title')).toBe(arrowAttrs.expected.title)
      })
    })

    describe('showArrow', () => {
      it.each(casesShowArrow)(
        'con showArrow=$input renderiza la flecha: $expected',
        ({ input, expected }) => {
          const tooltip = mountTooltip({ props: { open: true, showArrow: input } })

          expect(tooltip.find('[data-test-tooltip-arrow]').exists()).toBe(expected)
        },
      )
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot dentro del trigger', () => {
        expect(mountTooltip().get('[data-test-tooltip-trigger]').text()).toBe('Abrir')
      })
    })

    describe('content', () => {
      it('renderiza el slot dentro del contenido', () => {
        expect(
          mountTooltip({ props: { open: true } })
            .get('[data-test-tooltip-content]')
            .text(),
        ).toContain('Contenido')
      })

      it('prioriza el slot content sobre text', () => {
        const content = mountTooltip({ props: { open: true, text: 'Ayuda' } }).get(
          '[data-test-tooltip-content]',
        )

        expect(content.text()).toContain('Contenido')
        expect(content.text()).not.toContain('Ayuda')
      })

      it('no renderiza el contenido si no hay slot content ni text', () => {
        const tooltip = mountTooltip({ props: { open: true }, slots: { content: undefined } })

        expect(tooltip.find('[data-test-tooltip-content]').exists()).toBe(false)
      })
    })
  })

  describe('variantsCss', () => {
    it.each(casesVariantsCss)('aplica las clases base de $name a $part', ({ input, expected }) => {
      const element = mountTooltip({ props: { open: true, showArrow: true } }).get(input)

      expect(element.classes()).toEqual(expect.arrayContaining(expected))
    })
  })

  describe('context', () => {
    describe('TooltipContext', () => {
      it.each(casesTooltipContext)(
        'cumple el contrato de TooltipContext en el caso $name',
        ({ input, expected }) => {
          let context: TooltipContext | undefined
          mountTooltip({
            props: input,
            slots: {
              default: (value: TooltipContext) => {
                context = value
                return h('button', 'Abrir')
              },
            },
          })

          expect(context).toEqual({ ...expected, ...contextFunctions })
        },
      )

      it.each(casesSlotContext)('pasa TooltipContext al slot %s', (name) => {
        let context: TooltipContext | undefined
        mountTooltip({
          props: { open: true },
          slots: {
            [name]: (value: TooltipContext) => {
              context = value
              return h('span', 'Slot')
            },
          },
        })

        expect(context).toEqual(expectedTooltipContext)
      })

      it('close cierra el tooltip y emite update:open con false', () => {
        let context: TooltipContext | undefined
        const tooltip = mountTooltip({
          props: { open: true },
          slots: {
            content: (value: TooltipContext) => {
              context = value
              return h('span', 'Slot')
            },
          },
        })

        context!.close()

        expect(tooltip.emitted('update:open')).toEqual([[false]])
      })
    })
  })

  describe('emits', () => {
    describe('update:open', () => {
      it.each(casesUpdateOpen)(
        'reemite $expected cuando TooltipRoot cambia open=$input',
        ({ input, expected }) => {
          const tooltip = mountTooltip({ props: { open: input } })

          tooltip.getComponent(TooltipRoot).vm.$emit('update:open', expected)

          expect(tooltip.emitted('update:open')).toEqual([[expected]])
        },
      )
    })
  })
})
