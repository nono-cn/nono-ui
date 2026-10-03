import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
} from 'reka-ui'
import { HoverCard, type HoverCardContext, type HoverCardProps } from '@/components/ui/HoverCard'
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

function mountHoverCard(options: MountingOptions<HoverCardProps> = {}) {
  const { slots, global, ...rest } = options
  return mount(HoverCard, {
    attachTo: document.body,
    global: {
      ...global,
      stubs: { HoverCardPortal: { template: '<div><slot /></div>' }, ...global?.stubs },
    },
    slots: {
      default: () => h('a', { href: '#profile' }, 'Profile'),
      content: () => h('p', 'Card content'),
      ...slots,
    },
    ...rest,
  })
}

function mountOpen(props: HoverCardProps = {}) {
  return mountHoverCard({ props: { open: true, ...props } })
}

const casesOpen = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
]
const casesOpenDelay = [undefined, 0, 250]
const casesCloseDelay = [undefined, 0, 250]
const casesEnableTouch = [undefined, false, true]
const casesShowArrow = [undefined, false, true]
const casesUpdateOpen = [
  { initial: false, value: true },
  { initial: true, value: false },
]
const casesContext = casesOpen.map(({ input }) => input)

describe('HoverCard', () => {
  describe('props', () => {
    describe('open', () => {
      it.each(casesOpen)('passes open=$input as $expected', ({ input, expected }) => {
        expect(
          mountHoverCard({ props: { open: input } })
            .getComponent(HoverCardRoot)
            .props('open'),
        ).toBe(expected)
      })
    })

    describe('openDelay', () => {
      it.each(casesOpenDelay)('passes openDelay=%s', (input) => {
        expect(
          mountHoverCard({ props: { openDelay: input } })
            .getComponent(HoverCardRoot)
            .props('openDelay'),
        ).toBe(input ?? 700)
      })
    })

    describe('closeDelay', () => {
      it.each(casesCloseDelay)('passes closeDelay=%s', (input) => {
        expect(
          mountHoverCard({ props: { closeDelay: input } })
            .getComponent(HoverCardRoot)
            .props('closeDelay'),
        ).toBe(input ?? 300)
      })
    })

    describe('enableTouch', () => {
      it.each(casesEnableTouch)('passes enableTouch=%s', (input) => {
        expect(
          mountHoverCard({ props: { enableTouch: input } })
            .getComponent(HoverCardRoot)
            .props('enableTouch'),
        ).toBe(input ?? false)
      })
    })

    describe('trigger', () => {
      it('uses a div with asChild and no custom reference', () => {
        const wrapper = mountHoverCard()
        expect(wrapper.getComponent(HoverCardTrigger).props()).toMatchObject({
          asChild: true,
          as: 'div',
          reference: undefined,
        })
      })
    })

    describe('content', () => {
      testContentConfig({
        text: 'renders the content configuration',
        id: '[data-test-hover-card-content]',
        mount: (content) => mountOpen({ content }),
        getProps: (wrapper) => wrapper.getComponent(HoverCardContent).props(),
      })
    })

    describe('portal', () => {
      it('uses a local target with fixed portal options', async () => {
        const wrapper = mountOpen()
        await nextTick()
        const target = wrapper.get('[data-test-hover-card-portal-target]').element
        expect(wrapper.getComponent(HoverCardPortal).vm.$.vnode.props).toMatchObject({
          to: target,
          disabled: undefined,
          defer: undefined,
          forceMount: false,
        })
      })
    })

    describe('arrow', () => {
      testArrowConfig({
        text: 'renders the arrow configuration',
        id: '[data-test-hover-card-arrow]',
        mount: (arrow) => mountOpen({ showArrow: true, arrow }),
        getProps: (wrapper) => wrapper.getComponent(HoverCardArrow).props(),
      })
    })

    describe('showArrow', () => {
      it.each(casesShowArrow)('renders default arrow for %s', (value) => {
        expect(mountOpen({ showArrow: value }).findComponent(HoverCardArrow).exists()).toBe(
          value ?? false,
        )
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards attributes to root',
      id: '[data-test-hover-card-root]',
      mount: (attrs) => mountHoverCard({ attrs }),
    })
  })

  describe('emits', () => {
    it.each(casesUpdateOpen)('forwards update:open=$value', async ({ initial, value }) => {
      const wrapper = mountHoverCard({ props: { open: initial } })
      wrapper.getComponent(HoverCardRoot).vm.$emit('update:open', value)
      await nextTick()
      expect(wrapper.emitted('update:open')).toEqual([[value]])
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renders the trigger', () => {
        expect(mountOpen().get('[data-test-hover-card-trigger]').text()).toContain('Profile')
      })
    })

    describe('content', () => {
      it('renders the card content', () => {
        expect(mountOpen().get('[data-test-hover-card-content]').text()).toContain('Card content')
      })
    })
  })

  describe('context contract', () => {
    it.each(casesContext)('passes the complete context for open=%s', (open) => {
      const contexts: HoverCardContext[] = []
      const wrapper = mountHoverCard({
        props: { open },
        slots: {
          default: (context: HoverCardContext) => {
            contexts.push(context)
            return h('a', { href: '#profile' }, 'Profile')
          },
          content: (context: HoverCardContext) => {
            contexts.push(context)
            return h('p', 'Content')
          },
        },
      })
      expect(contexts).toHaveLength(open ? 2 : 1)
      for (const context of contexts) {
        expect(context).toEqual({
          open: open ?? false,
          close: expect.any(Function),
        })
      }
      expect(wrapper.exists()).toBe(true)
    })
  })
})
