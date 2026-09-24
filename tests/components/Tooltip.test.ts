import { afterEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import {
  Tooltip,
  type TooltipArrowConfig,
  type TooltipContentConfig,
  type TooltipContext,
  type TooltipProps,
} from '@/components/ui/Tooltip'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot } from 'reka-ui'
import { testArrowConfig } from '../utils/testArrowConfig'
import { testAttrs } from '../utils/testAttrs'
import { testContentConfig } from '../utils/testContentConfig'

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

function mountTooltip(options: MountingOptions<TooltipProps> = {}) {
  const global = options.global ?? {}

  return mount(Tooltip, {
    ...options,
    attachTo: document.body,
    global: {
      ...global,
      stubs: {
        TooltipPortal: { template: '<div><slot /></div>' },
        ...global.stubs,
      },
    },
  })
}

function mountOpenTooltip(options: Partial<TooltipProps> = {}, arrow: TooltipArrowConfig = {}) {
  return mountTooltip({
    props: { open: true, showArrow: true, content: {}, arrow, ...options },
    slots: { content: () => h('span', 'Tooltip content') },
  })
}

const openCases = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
] as const

const delayDurationCases = [
  { input: 0, expected: 0 },
  { input: 250, expected: 250 },
  { input: undefined, expected: 0 },
] as const

const defaultFalseCases = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
] as const

const booleanValueCases = [true, false, undefined] as const

const showArrowCases = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
] as const

const tooltipAriaLabelCases = ['Tooltip accessible name', '', undefined] as const
const contentAriaLabelCases = ['Hint', '', undefined] as const

const alignCases = [
  { input: 'start', expected: 'start' },
  { input: 'center', expected: 'center' },
  { input: 'end', expected: 'end' },
  { input: undefined, expected: undefined },
] as const

const alignOffsetCases = [
  { input: -4, expected: -4 },
  { input: 0, expected: 0 },
  { input: 8, expected: 8 },
  { input: undefined, expected: undefined },
] as const

const arrowPaddingCases = [
  { input: 0, expected: 0 },
  { input: 4, expected: 4 },
  { input: undefined, expected: undefined },
] as const

const avoidCollisionsCases = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: undefined },
] as const

const collisionPadding = { top: 2, left: 4 }
const collisionPaddingCases = [
  { input: 0, expected: 0 },
  { input: 6, expected: 6 },
  { input: collisionPadding, expected: collisionPadding },
  { input: undefined, expected: undefined },
] as const

const forceMountCases = [true, false, undefined] as const
const hideWhenDetachedCases = [true, false, undefined] as const

const positionStrategyCases = [
  { input: 'fixed', expected: 'fixed' },
  { input: 'absolute', expected: 'absolute' },
  { input: undefined, expected: undefined },
] as const

const sideCases = [
  { input: 'top', expected: 'top' },
  { input: 'right', expected: 'right' },
  { input: 'bottom', expected: 'bottom' },
  { input: 'left', expected: 'left' },
  { input: undefined, expected: undefined },
] as const

const sideOffsetCases = [
  { input: 0, expected: 0 },
  { input: 6, expected: 6 },
  { input: undefined, expected: undefined },
] as const

const stickyCases = [
  { input: 'partial', expected: 'partial' },
  { input: 'always', expected: 'always' },
  { input: undefined, expected: undefined },
] as const

const updatePositionStrategyCases = [
  { input: 'optimized', expected: 'optimized' },
  { input: 'always', expected: 'always' },
  { input: undefined, expected: undefined },
] as const

const updateOpenCases = [
  { initial: false, value: true },
  { initial: true, value: false },
] as const

const contextCases = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
] as const

describe('Tooltip', () => {
  describe('props', () => {
    describe('open', () => {
      it.each(openCases)('pasa open=$input a TooltipRoot como $expected', ({ input, expected }) => {
        const wrapper = mountTooltip({ props: { open: input } })
        expect(wrapper.getComponent(TooltipRoot).props('open')).toBe(expected)
      })
    })

    describe('delayDuration', () => {
      it.each(delayDurationCases)(
        'pasa delayDuration=$input a TooltipRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountTooltip({ props: { delayDuration: input } })
          expect(wrapper.getComponent(TooltipRoot).props('delayDuration')).toBe(expected)
        },
      )
    })

    describe('disableHoverableContent', () => {
      it.each(booleanValueCases)('pasa %s a TooltipRoot', (input) => {
        const wrapper = mountTooltip({ props: { disableHoverableContent: input } })
        expect(wrapper.getComponent(TooltipRoot).props('disableHoverableContent')).toBe(input)
      })
    })

    describe('disableClosingTrigger', () => {
      it.each(defaultFalseCases)(
        'pasa disableClosingTrigger=$input a TooltipRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountTooltip({ props: { disableClosingTrigger: input } })
          expect(wrapper.getComponent(TooltipRoot).props('disableClosingTrigger')).toBe(expected)
        },
      )
    })

    describe('disabled', () => {
      it.each(defaultFalseCases)(
        'pasa disabled=$input a TooltipRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountTooltip({ props: { disabled: input } })
          expect(wrapper.getComponent(TooltipRoot).props('disabled')).toBe(expected)
        },
      )
    })

    describe('ignoreNonKeyboardFocus', () => {
      it.each(defaultFalseCases)(
        'pasa ignoreNonKeyboardFocus=$input a TooltipRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountTooltip({ props: { ignoreNonKeyboardFocus: input } })
          expect(wrapper.getComponent(TooltipRoot).props('ignoreNonKeyboardFocus')).toBe(expected)
        },
      )
    })

    describe('showArrow', () => {
      it.each(showArrowCases)(
        'renderiza showArrow=$input como $expected',
        ({ input, expected }) => {
          const wrapper = mountOpenTooltip({ showArrow: input })
          expect(wrapper.findComponent(TooltipArrow).exists()).toBe(expected)
        },
      )
    })

    describe('content', () => {
      it('usa los defaults de TooltipContent', () => {
        const wrapper = mountOpenTooltip()
        const content = wrapper.getComponent(TooltipContent)

        expect(content.props()).toMatchObject({
          align: 'center',
          alignOffset: 0,
          arrowPadding: 0,
          avoidCollisions: true,
          collisionPadding: 0,
          forceMount: false,
          hideWhenDetached: false,
          positionStrategy: 'fixed',
          side: 'top',
          sideOffset: 2,
          sticky: 'partial',
          updatePositionStrategy: 'optimized',
        })
      })

      it('permite que undefined sobrescriba un default configurado', () => {
        const wrapper = mountOpenTooltip({ content: { side: undefined } })

        expect(wrapper.getComponent(TooltipContent).vm.$.vnode.props).toHaveProperty(
          'side',
          undefined,
        )
      })

      it('renderiza atributos y clases adicionales en TooltipContent', () => {
        const wrapper = mountOpenTooltip({
          content: {
            id: 'custom-content',
            class: 'custom-tooltip-content',
            style: 'opacity: 0.5',
            'aria-label': 'Additional details',
          },
        })
        const content = wrapper.get('[data-test-tooltip-content]')

        expect(content.attributes('id')).toBe('custom-content')
        expect(wrapper.get('[role="tooltip"]').text()).toBe('Additional details')
        expect(content.classes()).toContain('custom-tooltip-content')
        expect(content.attributes('style')).toContain('opacity: 0.5')
      })

      describe('ariaLabel', () => {
        it.each(tooltipAriaLabelCases)('pasa ariaLabel=$input a TooltipContent', (input) => {
          const wrapper = mountOpenTooltip({ content: { ariaLabel: input } })
          expect(wrapper.getComponent(TooltipContent).props('ariaLabel')).toBe(input)
        })
      })

      describe('align', () => {
        it.each(alignCases)(
          'pasa align=$input a TooltipContent como $expected',
          ({ input, expected }) => {
            const wrapper = mountOpenTooltip({ content: { align: input } })
            expect(wrapper.getComponent(TooltipContent).props('align')).toBe(expected)
          },
        )
      })

      describe('alignOffset', () => {
        it.each(alignOffsetCases)(
          'pasa alignOffset=$input a TooltipContent como $expected',
          ({ input, expected }) => {
            const wrapper = mountOpenTooltip({ content: { alignOffset: input } })
            expect(wrapper.getComponent(TooltipContent).props('alignOffset')).toBe(expected)
          },
        )
      })

      describe('ariaLabel', () => {
        it.each(contentAriaLabelCases)('pasa ariaLabel=$input a TooltipContent', (input) => {
          const wrapper = mountOpenTooltip({ content: { ariaLabel: input } })
          expect(wrapper.getComponent(TooltipContent).props('ariaLabel')).toBe(input)
        })
      })

      describe('arrowPadding', () => {
        it.each(arrowPaddingCases)(
          'pasa arrowPadding=$input a TooltipContent como $expected',
          ({ input, expected }) => {
            const wrapper = mountOpenTooltip({ content: { arrowPadding: input } })
            expect(wrapper.getComponent(TooltipContent).props('arrowPadding')).toBe(expected)
          },
        )
      })

      describe('avoidCollisions', () => {
        it.each(avoidCollisionsCases)(
          'pasa avoidCollisions=$input a TooltipContent como $expected',
          ({ input, expected }) => {
            const wrapper = mountOpenTooltip({ content: { avoidCollisions: input } })
            expect(wrapper.getComponent(TooltipContent).props('avoidCollisions')).toBe(expected)
          },
        )
      })

      describe('collisionPadding', () => {
        it.each(collisionPaddingCases)(
          'pasa collisionPadding a TooltipContent',
          ({ input, expected }) => {
            const wrapper = mountOpenTooltip({ content: { collisionPadding: input } })
            expect(wrapper.getComponent(TooltipContent).props('collisionPadding')).toEqual(expected)
          },
        )
      })

      describe('forceMount', () => {
        it.each(forceMountCases)('pasa forceMount=%s a TooltipContent', (input) => {
          const wrapper = mountOpenTooltip({ content: { forceMount: input } })
          expect(wrapper.getComponent(TooltipContent).props('forceMount')).toBe(input)
        })
      })

      describe('hideWhenDetached', () => {
        it.each(hideWhenDetachedCases)('pasa hideWhenDetached=%s a TooltipContent', (input) => {
          const wrapper = mountOpenTooltip({ content: { hideWhenDetached: input } })
          expect(wrapper.getComponent(TooltipContent).props('hideWhenDetached')).toBe(input)
        })
      })

      describe('positionStrategy', () => {
        it.each(positionStrategyCases)(
          'pasa positionStrategy=$input a TooltipContent',
          ({ input, expected }) => {
            const wrapper = mountOpenTooltip({ content: { positionStrategy: input } })
            expect(wrapper.getComponent(TooltipContent).props('positionStrategy')).toBe(expected)
          },
        )
      })

      describe('side', () => {
        it.each(sideCases)(
          'pasa side=$input a TooltipContent como $expected',
          ({ input, expected }) => {
            const wrapper = mountOpenTooltip({ content: { side: input } })
            expect(wrapper.getComponent(TooltipContent).props('side')).toBe(expected)
          },
        )
      })

      describe('sideOffset', () => {
        it.each(sideOffsetCases)(
          'pasa sideOffset=$input a TooltipContent como $expected',
          ({ input, expected }) => {
            const wrapper = mountOpenTooltip({ content: { sideOffset: input } })
            expect(wrapper.getComponent(TooltipContent).props('sideOffset')).toBe(expected)
          },
        )
      })

      describe('sticky', () => {
        it.each(stickyCases)(
          'pasa sticky=$input a TooltipContent como $expected',
          ({ input, expected }) => {
            const wrapper = mountOpenTooltip({ content: { sticky: input } })
            expect(wrapper.getComponent(TooltipContent).props('sticky')).toBe(expected)
          },
        )
      })

      describe('updatePositionStrategy', () => {
        it.each(updatePositionStrategyCases)(
          'pasa updatePositionStrategy=$input a TooltipContent como $expected',
          ({ input, expected }) => {
            const wrapper = mountOpenTooltip({ content: { updatePositionStrategy: input } })
            expect(wrapper.getComponent(TooltipContent).props('updatePositionStrategy')).toBe(
              expected,
            )
          },
        )
      })
    })

    describe('arrow', () => {
      it('usa sus dimensiones por defecto', () => {
        const wrapper = mountOpenTooltip()
        expect(wrapper.getComponent(TooltipArrow).props()).toMatchObject({ width: 10, height: 5 })
      })

      it('pasa dimensiones y renderiza atributos y clases adicionales', () => {
        const wrapper = mountOpenTooltip({
          arrow: {
            width: 14,
            height: 7,
            id: 'custom-arrow',
            class: 'custom-tooltip-arrow',
            style: 'opacity: 0.5',
          },
        })
        const arrow = wrapper.get('[data-test-tooltip-arrow]')

        expect(wrapper.getComponent(TooltipArrow).props()).toMatchObject({ width: 14, height: 7 })
        expect(arrow.attributes('id')).toBe('custom-arrow')
        expect(arrow.classes()).toContain('custom-tooltip-arrow')
        expect(arrow.attributes('style')).toContain('opacity: 0.5')
      })
    })

    describe('portal', () => {
      it('apunta al target local posterior al trigger', async () => {
        const wrapper = mountTooltip({
          global: { stubs: { TooltipPortal: false } },
          slots: { default: () => h('button', 'Trigger') },
        })
        await nextTick()

        const portal = wrapper.getComponent(TooltipPortal)
        const trigger = wrapper.get('[data-test-tooltip-trigger]')
        const target = wrapper.get('[data-test-tooltip-portal-target]').element

        expect(portal.vm.$.vnode.props?.to).toBe(target)
        expect(
          trigger.element.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy()
      })
    })
  })

  describe('config integration', () => {
    testContentConfig({
      text: 'aplica la configuración de content al nodo renderizado',
      id: '[data-test-tooltip-content]',
      omit: ['aria-label'],
      mount: (content) => mountOpenTooltip({ content }),
    })

    testArrowConfig({
      text: 'aplica la configuración de arrow al nodo renderizado',
      id: '[data-test-tooltip-arrow]',
      mount: (arrow) => mountOpenTooltip({}, arrow),
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'reenvía attrs, class y style al root',
      id: '[data-test-tooltip-root]',
      mount: (attrs) => mountTooltip({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:open', () => {
      it.each(updateOpenCases)(
        'reenvía update:open=$value desde TooltipRoot',
        async ({ initial, value }) => {
          const wrapper = mountTooltip({ props: { open: initial } })
          await wrapper.getComponent(TooltipRoot).vm.$emit('update:open', value)
          expect(wrapper.emitted('update:open')).toEqual([[value]])
        },
      )
    })

    describe('escapeKeyDown', () => {
      it('llama al callback configurado desde content sin emitirlo en Tooltip', async () => {
        const callback = vi.fn()
        const event = new KeyboardEvent('keydown', { key: 'Escape' })
        const wrapper = mountOpenTooltip({ content: { onEscapeKeyDown: callback } })

        await wrapper.getComponent(TooltipContent).vm.$emit('escapeKeyDown', event)

        expect(callback).toHaveBeenCalledWith(event)
        expect(wrapper.emitted('escapeKeyDown')).toBeUndefined()
      })
    })

    describe('pointerDownOutside', () => {
      it('llama al callback configurado desde content sin emitirlo en Tooltip', async () => {
        const callback = vi.fn()
        const event = new Event('pointerdown') as Parameters<
          NonNullable<TooltipContentConfig['onPointerDownOutside']>
        >[0]
        const wrapper = mountOpenTooltip({ content: { onPointerDownOutside: callback } })

        await wrapper.getComponent(TooltipContent).vm.$emit('pointerDownOutside', event)

        expect(callback).toHaveBeenCalledWith(event)
        expect(wrapper.emitted('pointerDownOutside')).toBeUndefined()
      })
    })
  })

  describe('context contract', () => {
    it.each(contextCases)(
      'pasa open=$input y close en el contexto',
      async ({ input, expected }) => {
        let context: TooltipContext | undefined
        const wrapper = mountTooltip({
          props: { open: input },
          slots: {
            default: (slotContext: TooltipContext) => {
              context = slotContext
              return h('button', 'Trigger')
            },
          },
        })

        expect(context).toEqual({ open: expected, close: expect.any(Function) })
        context?.close()
        await nextTick()
        expect(wrapper.getComponent(TooltipRoot).props('open')).toBe(false)
      },
    )
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el trigger y sus props de contexto', () => {
        const wrapper = mountTooltip({
          props: { open: true },
          slots: {
            default: (context: TooltipContext) =>
              h('button', { 'data-test-slot-trigger': '' }, `open:${context.open}`),
          },
        })

        expect(wrapper.get('[data-test-slot-trigger]').text()).toBe('open:true')
      })
    })

    describe('content', () => {
      it('renderiza el contenido y sus props de contexto', () => {
        const wrapper = mountTooltip({
          props: { open: true },
          slots: {
            content: (context: TooltipContext) =>
              h('span', { 'data-test-slot-content': '' }, `open:${context.open}`),
          },
        })

        expect(wrapper.get('[data-test-slot-content]').text()).toBe('open:true')
      })

      it('no monta TooltipContent cuando falta el slot', () => {
        const wrapper = mountTooltip({ props: { open: true } })
        expect(wrapper.findComponent(TooltipContent).exists()).toBe(false)
        expect(wrapper.findComponent(TooltipArrow).exists()).toBe(false)
      })
    })
  })
})
