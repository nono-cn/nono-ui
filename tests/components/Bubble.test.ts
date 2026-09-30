import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Bubble, type BubbleProps, type BubbleVariant } from '@/components/ui/Bubble'
import { themeColors } from '@/components/ui/constants'
import BubbleReactions from '@/components/ui/Bubble/BubbleReactions.vue'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'
import { testRadius } from '../utils/testRadius'

function mountBubble(options: MountingOptions<BubbleProps> = {}) {
  return mount(Bubble, options)
}

const casesVariant = [
  {
    variant: 'solid',
    expected: ['border-transparent', 'bg-(--bubble-solid)', 'text-(--bubble-solid-foreground)'],
  },
  {
    variant: 'outline',
    expected: ['border-(--bubble-color)/40', 'bg-transparent', 'text-(--bubble-color)'],
  },
  { variant: 'plain', expected: ['border-transparent', 'bg-transparent', 'text-(--bubble-color)'] },
  {
    variant: 'subtle',
    expected: ['border-(--bubble-color)/20', 'bg-(--bubble-color)/10', 'text-(--bubble-color)'],
  },
  {
    variant: 'soft',
    expected: ['border-transparent', 'bg-(--bubble-color)/10', 'text-(--bubble-color)'],
  },
  {
    variant: undefined,
    expected: ['border-(--bubble-color)/20', 'bg-(--bubble-color)/10', 'text-(--bubble-color)'],
  },
] satisfies { variant: BubbleVariant | undefined; expected: string[] }[]

const casesAlign = [
  { align: 'start', expected: 'self-start' },
  { align: 'end', expected: 'self-end' },
  { align: undefined, expected: 'self-start' },
] as const

const casesReactions = [
  { sideReaction: 'top', alignReaction: 'start', expected: { side: 'top', align: 'start' } },
  { sideReaction: 'top', alignReaction: 'end', expected: { side: 'top', align: 'end' } },
  { sideReaction: 'bottom', alignReaction: 'start', expected: { side: 'bottom', align: 'start' } },
  { sideReaction: 'bottom', alignReaction: 'end', expected: { side: 'bottom', align: 'end' } },
  { sideReaction: undefined, alignReaction: undefined, expected: { side: 'bottom', align: 'end' } },
] as const

const casesAs = [
  { as: 'div', expected: 'div' },
  { as: 'button', expected: 'button' },
  { as: 'a', expected: 'a' },
  { as: undefined, expected: 'div' },
] as const

const casesAsChild = [
  { asChild: false, expected: 'div' },
  { asChild: true, expected: 'a' },
  { asChild: undefined, expected: 'div' },
] as const

describe('Bubble', () => {
  describe('props', () => {
    describe('align', () => {
      it.each(casesAlign)('alinea con align=$align', ({ align, expected }) => {
        expect(
          mountBubble({ props: { align } }).get('[data-test-bubble-root]').classes(),
        ).toContain(expected)
      })
    })

    describe('variant', () => {
      it.each(casesVariant)('renderiza variant=$variant', ({ variant, expected }) => {
        const surface = mountBubble({ props: { variant } }).get('[data-test-bubble-surface]')

        expect(surface.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('radius', () => {
      testRadius({
        id: '[data-test-bubble-surface]',
        variable: '--bubble-radius',
        defaultValue: 'var(--radius-xl)',
        mount: (radius) => mountBubble({ props: { radius } }),
      })
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color',
        id: '[data-test-bubble-surface]',
        varColor: '--bubble-color',
        defaultColor: 'var(--neutral, var(--neutral))',
        fallbackColor: 'neutral',
        theme: {
          colors: themeColors,
          foregroundVar: '--bubble-color-foreground',
          solidVar: '--bubble-solid',
          solidForegroundVar: '--bubble-solid-foreground',
        },
        mount: (color) => mountBubble({ props: { color } }),
      })
    })

    describe('reaction', () => {
      it.each(casesReactions)(
        'pasa sideReaction=$sideReaction y alignReaction=$alignReaction al componente interno',
        ({ sideReaction, alignReaction, expected }) => {
          const wrapper = mountBubble({
            props: { sideReaction, alignReaction },
            slots: { reactions: '\u{1F44D}' },
          })
          expect(wrapper.getComponent(BubbleReactions).props()).toMatchObject(expected)
        },
      )
    })

    describe('as y asChild', () => {
      it.each(casesAs)('renderiza as=$as', ({ as, expected }) => {
        expect(
          mountBubble({ props: { as } })
            .get('[data-test-bubble-surface]')
            .element.tagName.toLowerCase(),
        ).toBe(expected)
      })
      it.each(casesAsChild)(
        'renderiza asChild=$asChild con elemento $expected',
        ({ asChild, expected }) => {
          const wrapper = mountBubble({
            props: { asChild },
            slots: { default: h('a', { href: '/message' }, 'Mensaje') },
          })

          expect(wrapper.get('[data-test-bubble-surface]').element.tagName.toLowerCase()).toBe(
            expected,
          )
        },
      )
    })

    describe('ui', () => {
      describe('reactions', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.reactions',
          id: '[data-test-bubble-reactions]',
          mount: (attrs) =>
            mountBubble({
              props: { ui: { reactions: () => attrs } },
              slots: { reactions: '\u{1F44D}' },
            }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa attrs a la superficie visual',
      id: '[data-test-bubble-surface]',
      mount: (attrs) => mountBubble({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el contenido del slot', () => {
        const wrapper = mountBubble({
          slots: { default: () => h('span', { 'data-test-slot': 'default' }, 'Contenido') },
        })
        expect(wrapper.get('[data-test-slot="default"]').text()).toBe('Contenido')
      })
    })

    describe('reactions', () => {
      it('renderiza el slot dentro de su contenedor interno', () => {
        const wrapper = mountBubble({ slots: { reactions: '\u{1F44D}' } })
        expect(wrapper.get('[data-test-bubble-reactions]').text()).toBe('\u{1F44D}')
      })

      it('no crea el contenedor si falta el slot', () => {
        expect(mountBubble().find('[data-test-bubble-reactions]').exists()).toBe(false)
      })
    })
  })
})
