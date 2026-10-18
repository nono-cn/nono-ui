import { h } from 'vue'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { TooltipArrow, TooltipContent, TooltipRoot } from 'reka-ui'

import {
  Tooltip,
  tooltipArrowDefaults,
  tooltipContentDefaults,
  type TooltipArrowConfig,
  type TooltipContentConfig,
  type TooltipProps,
} from '@/components/ui/Tooltip'
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

const casesVariantsCss = [
  {
    name: 'tooltipRootVariants',
    part: 'la raíz',
    input: '[data-test-tooltip-root]',
    expected: ['contents'],
  },
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
    expected: ['fill-popover', '-translate-y-px', 'drop-shadow-[0_1px_0_var(--color-border)]'],
  },
] satisfies Array<{ name: string; part: string; input: string; expected: string[] }>

const casesOpen = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
] satisfies Array<{ input: TooltipProps['open']; expected: boolean }>

const casesText = [
  { input: 'Ayuda', expected: 'Ayuda' },
  { input: 'Guardar cambios', expected: 'Guardar cambios' },
] satisfies Array<{ input: TooltipProps['text']; expected: string }>

const casesDelayDuration = [
  { input: 300, expected: 300 },
  { input: 0, expected: 0 },
  { input: undefined, expected: 0 },
] satisfies Array<{ input: TooltipProps['delayDuration']; expected: number }>

const casesDisableHoverableContent = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: undefined },
] satisfies Array<{
  input: TooltipProps['disableHoverableContent']
  expected: boolean | undefined
}>

const casesDisableClosingTrigger = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
] satisfies Array<{ input: TooltipProps['disableClosingTrigger']; expected: boolean }>

const casesDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
] satisfies Array<{ input: TooltipProps['disabled']; expected: boolean }>

const casesIgnoreNonKeyboardFocus = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
] satisfies Array<{ input: TooltipProps['ignoreNonKeyboardFocus']; expected: boolean }>

const casesShowArrow = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
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
  { name: 'sin configuración', input: undefined, expected: tooltipContentDefaults },
  {
    name: 'con configuración',
    input: customContent,
    expected: { ...tooltipContentDefaults, ...customContent },
  },
] satisfies Array<{ name: string; input: TooltipProps['content']; expected: object }>

const customArrow = { width: 16, height: 8 } satisfies TooltipArrowConfig

const casesArrow = [
  { name: 'sin configuración', input: undefined, expected: tooltipArrowDefaults },
  {
    name: 'con configuración',
    input: customArrow,
    expected: { ...tooltipArrowDefaults, ...customArrow },
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

const casesUpdateOpen = [
  { input: false, expected: true },
  { input: true, expected: false },
] satisfies Array<{ input: TooltipProps['open']; expected: boolean }>

function mountTooltip(options: ComponentMountingOptions<typeof Tooltip> = {}) {
  const { slots, global, ...rest } = options
  return mount(Tooltip, {
    attachTo: document.body,
    global: {
      ...global,
      // el portal se pinta en línea para poder buscar el contenido dentro del wrapper
      stubs: { TooltipPortal: { template: '<div><slot /></div>' }, ...global?.stubs },
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

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-tooltip-root]',
      mount: (attrs) => mountTooltip({ attrs }),
    })
  })

  describe('variantsCss', () => {
    it.each(casesVariantsCss)('aplica las clases base de $name a $part', ({ input, expected }) => {
      const element = mountTooltip({ props: { open: true, showArrow: true } }).get(input)

      expect(element.classes()).toEqual(expect.arrayContaining(expected))
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
