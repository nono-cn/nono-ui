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
] satisfies { variant: BubbleVariant; expected: string[] }[]

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

const casesSeverityVariant = casesSeverity.flatMap(({ severity, expected: severityClasses }) =>
  casesVariant.map(({ variant, expected: variantClasses }) => ({
    severity,
    variant,
    expected: [...severityClasses, ...variantClasses],
  })),
)

const casesColorVariant = casesVariant.map(({ variant, expected: variantClasses }) => ({
  variant,
  expected: [
    ...variantClasses,
    ...(variant === 'solid'
      ? [
          '[--bubble-solid:var(--bubble-color)]',
          '[--bubble-solid-foreground:var(--bubble-color-foreground)]',
        ]
      : []),
  ],
}))

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
      it.each(casesSeverityVariant)(
        'combina severity=$severity con variant=$variant',
        ({ severity, variant, expected }) => {
          const surface = mountBubble({ props: { severity, variant } }).get(
            '[data-test-bubble-surface]',
          )

          expect(surface.classes()).toEqual(expect.arrayContaining(expected))
        },
      )

      it('usa subtle y neutral por defecto', () => {
        const surface = mountBubble().get('[data-test-bubble-surface]')

        expect(surface.classes()).toEqual(
          expect.arrayContaining([
            'border-(--bubble-color)/20',
            'bg-(--bubble-color)/10',
            'text-(--bubble-color)',
            '[--bubble-color:var(--foreground)]',
            '[--bubble-solid:var(--foreground)]',
            '[--bubble-solid-foreground:var(--background)]',
          ]),
        )
      })
    })

    describe('color', () => {
      it.each(casesColorVariant)(
        'combina color personalizado y severity=success con variant=$variant',
        ({ variant, expected }) => {
          const surface = mountBubble({
            props: { color: '#ff0000', severity: 'success', variant },
          }).get('[data-test-bubble-surface]')

          expect(surface.attributes('style')).toContain('--bubble-color: #ff0000')
          expect(surface.attributes('style')).toContain('--bubble-color-foreground: #09090b')
          expect(surface.classes()).toContain('[--bubble-color:var(--success)]')
          expect(surface.classes()).toEqual(expect.arrayContaining(expected))
        },
      )

      it('prioriza color personalizado sobre severity en la variante solid', () => {
        const surface = mountBubble({
          props: { color: '#ff0000', severity: 'success', variant: 'solid' },
        }).get('[data-test-bubble-surface]')

        expect(surface.classes()).toEqual(
          expect.arrayContaining([
            '[--bubble-color:var(--success)]',
            '[--bubble-solid:var(--bubble-color)]',
            '[--bubble-solid-foreground:var(--bubble-color-foreground)]',
            'bg-(--bubble-solid)',
            'text-(--bubble-solid-foreground)',
          ]),
        )
        expect(surface.attributes('style')).toContain('--bubble-color: #ff0000')
        expect(surface.attributes('style')).toContain('--bubble-color-foreground: #09090b')
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
