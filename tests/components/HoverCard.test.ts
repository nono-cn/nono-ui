import { h, nextTick } from 'vue'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
} from 'reka-ui'
import {
  HoverCard,
  hoverCardArrowDefaults,
  hoverCardContentDefaults,
  type HoverCardArrowConfig,
  type HoverCardContentConfig,
  type HoverCardContext,
  type HoverCardProps,
} from '@/components/ui/HoverCard'
import { testAttrs } from '../utils/testAttrs'

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

function mountHoverCard(options: ComponentMountingOptions<typeof HoverCard> = {}) {
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

const customContent = {
  side: 'top',
  sideOffset: 12,
  align: 'start',
  alignOffset: 6,
  collisionPadding: 16,
  avoidCollisions: false,
} satisfies HoverCardContentConfig

const casesContent = [
  { name: 'sin configuración', input: undefined, expected: hoverCardContentDefaults },
  {
    name: 'con configuración',
    input: customContent,
    expected: { ...hoverCardContentDefaults, ...customContent },
  },
] satisfies Array<{ name: string; input: HoverCardProps['content']; expected: object }>

const customArrow = { width: 16, height: 8, rounded: true } satisfies HoverCardArrowConfig

const casesArrow = [
  { name: 'sin configuración', input: undefined, expected: hoverCardArrowDefaults },
  {
    name: 'con configuración',
    input: customArrow,
    expected: { ...hoverCardArrowDefaults, ...customArrow },
  },
] satisfies Array<{ name: string; input: HoverCardProps['arrow']; expected: object }>

const contentAttrs = {
  input: { class: 'custom-content', style: 'opacity: 0.5', title: 'Contenido' },
  expected: { class: 'custom-content', style: 'opacity: 0.5', title: 'Contenido' },
} satisfies { input: HoverCardContentConfig; expected: Record<string, string> }

const arrowAttrs = {
  input: { class: 'custom-arrow', style: 'opacity: 0.5', title: 'Flecha' },
  expected: { class: 'custom-arrow', style: 'opacity: 0.5', title: 'Flecha' },
} satisfies { input: HoverCardArrowConfig; expected: Record<string, string> }
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
      it.each(casesContent)('pasa content $name al HoverCardContent', ({ input, expected }) => {
        const wrapper = mountOpen({ content: input })

        expect(wrapper.getComponent(HoverCardContent).props()).toMatchObject(expected)
      })

      it('pasa la clase, el estilo y los atributos de content al contenido', () => {
        const content = mountOpen({ content: contentAttrs.input }).get(
          '[data-test-hover-card-content]',
        )

        expect(content.classes()).toContain(contentAttrs.expected.class)
        expect(content.attributes('style')).toContain(contentAttrs.expected.style)
        expect(content.attributes('title')).toBe(contentAttrs.expected.title)
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
      it.each(casesArrow)('pasa arrow $name al HoverCardArrow', ({ input, expected }) => {
        const wrapper = mountOpen({ showArrow: true, arrow: input })

        expect(wrapper.getComponent(HoverCardArrow).props()).toMatchObject(expected)
      })

      it('pasa la clase, el estilo y los atributos de arrow a la flecha', () => {
        const arrow = mountOpen({ showArrow: true, arrow: arrowAttrs.input }).get(
          '[data-test-hover-card-arrow]',
        )

        expect(arrow.classes()).toContain(arrowAttrs.expected.class)
        expect(arrow.attributes('style')).toContain(arrowAttrs.expected.style)
        expect(arrow.attributes('title')).toBe(arrowAttrs.expected.title)
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
