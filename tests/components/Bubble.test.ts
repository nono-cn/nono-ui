import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Bubble, type BubbleProps } from '@/components/ui/Bubble'
import BubbleReactions from '@/components/ui/Bubble/BubbleReactions.vue'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountBubble(options: MountingOptions<BubbleProps> = {}) {
  return mount(Bubble, options)
}

describe('Bubble', () => {
  describe('props', () => {
    describe('align', () => {
      it.each([
        ['start', 'self-start'],
        ['end', 'self-end'],
      ] as const)('alinea %s', (align, expected) => {
        expect(
          mountBubble({ props: { align } }).get('[data-test-bubble-root]').classes(),
        ).toContain(expected)
      })
    })

    describe('variant', () => {
      it.each([
        ['solid', 'bg-(--bubble-solid)'],
        ['outline', 'border-(--bubble-color)/40'],
        ['plain', 'bg-transparent'],
        ['subtle', 'bg-(--bubble-color)/10'],
        ['soft', 'bg-(--bubble-color)/10'],
        ['muted', 'bg-muted'],
      ] as const)('renderiza %s', (variant, expected) => {
        expect(
          mountBubble({ props: { variant } }).get('[data-test-bubble-surface]').classes(),
        ).toContain(expected)
      })
    })

    describe('severity', () => {
      it.each(['primary', 'secondary', 'warning', 'success', 'error'] as const)(
        '%s define su color',
        (severity) => {
          const expected =
            severity === 'secondary' ? 'var(--secondary-foreground)' : `var(--${severity})`
          expect(
            mountBubble({ props: { severity } }).get('[data-test-bubble-surface]').classes(),
          ).toContain(`[--bubble-color:${expected}]`)
        },
      )
    })

    describe('color', () => {
      testColor({
        text: 'aplica color personalizado',
        id: '[data-test-bubble-surface]',
        varColor: '--bubble-color',
        mount: (color) => mountBubble({ props: { color } }),
      })
    })

    describe('reaction', () => {
      it('pasa sideReaction y alignReaction al componente interno', () => {
        const wrapper = mountBubble({
          props: { sideReaction: 'top', alignReaction: 'start' },
          slots: { reactions: '👍' },
        })
        expect(wrapper.getComponent(BubbleReactions).props()).toMatchObject({
          side: 'top',
          align: 'start',
        })
      })
    })

    describe('as y asChild', () => {
      it.each(['div', 'button', 'a'] as const)('renderiza as=%s', (as) => {
        expect(
          mountBubble({ props: { as } })
            .get('[data-test-bubble-surface]')
            .element.tagName.toLowerCase(),
        ).toBe(as)
      })

      it('fusiona attrs con el hijo y conserva reactions', () => {
        const wrapper = mountBubble({
          props: { asChild: true },
          slots: { default: h('a', { href: '/message' }, 'Mensaje'), reactions: '👍' },
        })
        expect(wrapper.get('[data-test-bubble-surface]').attributes('href')).toBe('/message')
        expect(wrapper.get('[data-test-bubble-reactions]').text()).toBe('👍')
      })
    })

    describe('ui', () => {
      describe('reactions', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.reactions',
          id: '[data-test-bubble-reactions]',
          mount: (attrs) =>
            mountBubble({
              props: { ui: { reactions: () => attrs } },
              slots: { reactions: '👍' },
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
        const wrapper = mountBubble({ slots: { reactions: '👍' } })
        expect(wrapper.get('[data-test-bubble-reactions]').text()).toBe('👍')
      })

      it('no crea el contenedor si falta el slot', () => {
        expect(mountBubble().find('[data-test-bubble-reactions]').exists()).toBe(false)
      })
    })
  })
})
