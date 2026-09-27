import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import {
  Bubble,
  type BubbleProps,
  type BubbleSeverity,
  type BubbleVariant,
} from '@/components/ui/Bubble'
import BubbleReactions from '@/components/ui/Bubble/BubbleReactions.vue'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

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

const casesSeverity = [
  {
    severity: 'primary',
    expected: [
      '[--bubble-color:var(--primary)]',
      '[--bubble-solid:var(--primary)]',
      '[--bubble-solid-foreground:var(--primary-foreground)]',
    ],
  },
  {
    severity: 'neutral',
    expected: [
      '[--bubble-color:var(--foreground)]',
      '[--bubble-solid:var(--foreground)]',
      '[--bubble-solid-foreground:var(--background)]',
    ],
  },
  {
    severity: 'secondary',
    expected: [
      '[--bubble-color:var(--secondary-foreground)]',
      '[--bubble-solid:var(--secondary)]',
      '[--bubble-solid-foreground:var(--secondary-foreground)]',
    ],
  },
  {
    severity: 'warning',
    expected: [
      '[--bubble-color:var(--warning)]',
      '[--bubble-solid:var(--warning)]',
      '[--bubble-solid-foreground:var(--warning-foreground)]',
    ],
  },
  {
    severity: 'success',
    expected: [
      '[--bubble-color:var(--success)]',
      '[--bubble-solid:var(--success)]',
      '[--bubble-solid-foreground:var(--success-foreground)]',
    ],
  },
  {
    severity: 'error',
    expected: [
      '[--bubble-color:var(--error)]',
      '[--bubble-solid:var(--error)]',
      '[--bubble-solid-foreground:var(--error-foreground)]',
    ],
  },
] satisfies { severity: BubbleSeverity; expected: string[] }[]

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

    describe('severity', () => {
      it.each(casesSeverity)('renderiza severity=$severity', ({ severity, expected }) => {
        const surface = mountBubble({ props: { severity } }).get('[data-test-bubble-surface]')

        expect(surface.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('color', () => {
      testColor({
        text: 'aplica color personalizado',
        id: '[data-test-bubble-surface]',
        varColor: '--bubble-color',
        mount: (color) => mountBubble({ props: { color } }),
      })

      it('da prioridad al color personalizado sobre severity', () => {
        const surface = mountBubble({
          props: { color: '#ff0000', severity: 'success' },
        }).get('[data-test-bubble-surface]')

        expect(surface.attributes('style')).toContain('--bubble-color: #ff0000')
        expect(surface.classes()).toContain('[--bubble-color:var(--success)]')
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
