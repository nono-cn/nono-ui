import { h, nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, type MountingOptions } from '@vue/test-utils'
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot } from 'reka-ui'

import {
  Popover,
  type PopoverArrowConfig,
  type PopoverContentConfig,
  type PopoverContext,
  type PopoverProps,
} from '@/components/ui/Popover'
import { testAttrs } from '../utils/testAttrs'
import { testArrowConfig } from '../utils/testArrowConfig'
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

function mountPopover(options: MountingOptions<PopoverProps> = {}) {
  return mount(Popover, {
    attachTo: document.body,
    global: {
      stubs: { PopoverPortal: { template: '<div><slot /></div>' }, ...options.global?.stubs },
      ...options.global,
    },
    ...options,
  })
}

function getContent(wrapper: ReturnType<typeof mountPopover>) {
  const content = wrapper.findComponent(PopoverContent)
  if (!content.exists()) throw new Error('Expected PopoverContent')
  return content
}

function mountOpenPopover(content: PopoverContentConfig = {}, arrow: PopoverArrowConfig = {}) {
  return mountPopover({
    props: { open: true, content, arrow, showArrow: true },
    slots: { content: () => h('span', 'Contenido') },
  })
}

const openCases = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
] as const

const modalCases = [{ input: true }, { input: false }, { input: undefined }] as const

const showArrowCases = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
] as const

const contextCases = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
] as const

const updateOpenCases = [
  { initial: false, value: true },
  { initial: true, value: false },
] as const

describe('Popover', () => {
  describe('props', () => {
    describe('open', () => {
      it.each(openCases)('pasa open=$input a PopoverRoot como $expected', ({ input, expected }) => {
        expect(
          mountPopover({ props: { open: input } })
            .getComponent(PopoverRoot)
            .props('open'),
        ).toBe(expected)
      })
    })

    describe('modal', () => {
      it.each(modalCases)('pasa modal=$input a PopoverRoot', ({ input }) => {
        const wrapper = mountPopover({ props: { modal: input } })
        expect(wrapper.getComponent(PopoverRoot).props('modal')).toBe(input ?? false)
      })
    })

    describe('showArrow', () => {
      it.each(showArrowCases)(
        'renderiza showArrow=$input como $expected',
        async ({ input, expected }) => {
          const wrapper = mountOpenPopover({}, {})
          await wrapper.setProps({ showArrow: input })
          expect(wrapper.findComponent(PopoverArrow).exists()).toBe(expected)
        },
      )
    })

    describe('content', () => {
      testContentConfig({
        text: 'renderiza la configuración de content',
        id: '[data-test-popover-content]',
        omit: ['id'],
        mount: (content) => mountOpenPopover(content),
      })
    })

    describe('arrow', () => {
      testArrowConfig({
        text: 'renderiza la configuración de arrow',
        id: '[data-test-popover-arrow]',
        mount: (arrow) => mountOpenPopover({}, arrow),
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'reenvía attrs al root',
      id: '[data-test-popover-root]',
      mount: (attrs) => mountPopover({ attrs }),
    })
  })

  describe('portal', () => {
    it('apunta al target local posterior al trigger', async () => {
      const wrapper = mountPopover({ slots: { default: () => h('button', 'Abrir') } })
      await nextTick()
      const trigger = wrapper.get('[data-test-popover-trigger]')
      const target = wrapper.get('[data-test-popover-portal-target]').element
      expect(wrapper.getComponent(PopoverPortal).vm.$.vnode.props?.to).toBe(target)
      expect(
        trigger.element.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy()
    })
  })

  describe('context contract', () => {
    it.each(contextCases)('pasa open=$input y close en el contexto', ({ input, expected }) => {
      let context: PopoverContext | undefined
      mountPopover({
        props: { open: input },
        slots: {
          default: (value: PopoverContext) => {
            context = value
            return h('button', 'Disparador')
          },
        },
      })
      expect(context).toEqual({ open: expected, close: expect.any(Function) })
    })
  })

  describe('slots', () => {
    it('renderiza los slots default y content', async () => {
      const wrapper = mountPopover({
        props: { open: true },
        slots: {
          default: () => h('span', { 'data-test-slot': 'default' }, 'Disparador'),
          content: () => h('span', { 'data-test-slot': 'content' }, 'Contenido'),
        },
      })
      await nextTick()
      expect(wrapper.get('[data-test-slot="default"]').text()).toBe('Disparador')
      expect(wrapper.get('[data-test-slot="content"]').text()).toBe('Contenido')
    })
  })

  describe('emits', () => {
    it('emite show al abrirse', async () => {
      const wrapper = mountPopover({ props: { open: false } })
      await wrapper.setProps({ open: true })
      expect(wrapper.emitted('show')).toEqual([[]])
    })

    it('emite close al cerrarse', async () => {
      const wrapper = mountPopover({ props: { open: true } })
      await wrapper.setProps({ open: false })
      expect(wrapper.emitted('close')).toEqual([[]])
    })

    it.each(updateOpenCases)('reenvía update:open=$value', async ({ initial, value }) => {
      const wrapper = mountPopover({ props: { open: initial } })
      await wrapper.getComponent(PopoverRoot).vm.$emit('update:open', value)
      expect(wrapper.emitted('update:open')).toEqual([[value]])
    })
  })
})
