import { describe, expect, it } from 'vitest'
import { attrsTests, Part, render, showcase } from '@test'
import { themeColors, themeRadii } from '@/components/constants'
import {
  Bubble,
  bubbleAlignments,
  bubbleDefaults,
  bubbleReactionsAlignments,
  bubbleReactionsSides,
  bubbleSizes,
  bubbleVariantNames,
  type BubbleProps,
  type BubbleSlots,
} from '..'

const ROOT = '[data-test-bubble-root]'
const SURFACE = '[data-test-bubble-surface]'
const REACTIONS = '[data-test-bubble-reactions]'

async function renderBubble(
  props: BubbleProps = {},
  slots: { [K in keyof BubbleSlots]: BubbleSlots[K] } = { default: () => 'Hello' },
) {
  const screen = await render(Bubble, { props, slots })
  const root = screen.container.querySelector<HTMLElement>(ROOT)!
  const surface = screen.container.querySelector<HTMLElement>(SURFACE)!
  const reactions = screen.container.querySelector<HTMLElement>(REACTIONS)

  return { screen, root, surface, reactions }
}

const longText =
  'A long message that does not fit on a single line, so the bubble stops growing at most of the available width and wraps the rest of the text onto the next lines.'
const alignments = [...bubbleAlignments, null, 'unknown-align'] as BubbleProps['align'][]
const variants = [...bubbleVariantNames, null, 'unknown-variant'] as BubbleProps['variant'][]
const sizes = [...bubbleSizes, null, 'unknown-size'] as BubbleProps['size'][]
const radii = [...themeRadii, 0, 8, '0.25rem']
const colors = [...themeColors, '#6366f1', 'unknown-token']
const reactionsSides = [
  ...bubbleReactionsSides,
  null,
  'unknown-side',
] as BubbleProps['reactionsSide'][]
const reactionsAlignments = [
  ...bubbleReactionsAlignments,
  null,
  'unknown-align',
] as BubbleProps['reactionsAlign'][]

describe('Bubble', () => {
  describe('props', () => {
    describe('as', () => {
      const casesAs = [
        {
          text: 'by default renders the surface as bubbleDefaults.as',
          input: {},
          expected: { surface: { tagName: bubbleDefaults.as.toUpperCase() } },
        },
        {
          text: 'renders the surface with the given element',
          input: { as: 'p' },
          expected: { surface: { tagName: 'P' } },
        },
      ] as const

      it.each(casesAs)('$text', async ({ input, expected }) => {
        const { surface } = await renderBubble(input)

        expect({ surface: { tagName: surface.tagName } }).toEqual(expected)
      })
    })

    describe('asChild', () => {
      it('with asChild the child becomes the surface', async () => {
        const { root, surface } = await renderBubble(
          { asChild: true },
          { default: () => <a href="#">Hello</a> },
        )
        const { surface: defaultSurface } = await renderBubble()

        expect({
          tagName: surface.tagName,
          parent: surface.parentElement,
          backgroundColor: getComputedStyle(surface).backgroundColor,
        }).toEqual({
          tagName: 'A',
          parent: root,
          backgroundColor: getComputedStyle(defaultSurface).backgroundColor,
        })
      })
    })

    describe('ui', () => {
      describe('surface', () => {
        attrsTests({
          component: Bubble,
          slots: { default: () => 'Hello' },
          root: SURFACE,
          toProps: (attrs) => ({ ui: { surface: () => attrs } }),
          class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
          keeps: ['backgroundColor', 'borderRadius'],
        })
      })

      describe('reactions', () => {
        attrsTests({
          component: Bubble,
          slots: { default: () => 'Hello', reactions: () => '👍' },
          root: REACTIONS,
          toProps: (attrs) => ({ ui: { reactions: () => attrs } }),
          class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
          keeps: ['backgroundColor'],
        })
      })
    })
  })

  describe('slots', () => {
    describe('reactions', () => {
      it('without the reactions slot there is no reactions node', async () => {
        const { reactions } = await renderBubble()

        expect(reactions).toBeNull()
      })

      it('shows its content in the reactions node', async () => {
        const { reactions } = await renderBubble(
          {},
          { default: () => 'Hello', reactions: () => '👍 2' },
        )

        expect(reactions?.textContent).toBe('👍 2')
      })
    })
  })

  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: Bubble,
        slots: { default: () => 'Hello' },
        root: ROOT,
        class: { value: 'max-w-none', expected: { maxWidth: 'none' } },
      })
    })
  })

  showcase({
    stories: {
      Align: () => (
        <div class="grid gap-3">
          {alignments.map((align) => (
            <Part name={String(align)} title>
              <div class="flex w-full flex-col">
                <Bubble align={align}>Hello there</Bubble>
              </div>
            </Part>
          ))}
        </div>
      ),

      'Long text': () => (
        <div class="grid gap-3">
          {bubbleAlignments.map((align) => (
            <Part name={align} title>
              <div class="flex w-full flex-col">
                <Bubble align={align}>{longText}</Bubble>
              </div>
            </Part>
          ))}
        </div>
      ),

      'Variant x color': () => (
        <div class="grid gap-3">
          {variants.map((variant) => (
            <Part name={String(variant)} title>
              <div class="flex flex-wrap items-center gap-3">
                {colors.map((color) => (
                  <Part name={`${variant} / ${color}`}>
                    <Bubble variant={variant} color={color} class="max-w-none">
                      {color}
                    </Bubble>
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),

      Size: () => (
        <div class="flex flex-wrap items-end gap-4">
          {sizes.map((size) => (
            <Part name={String(size)} caption>
              <Bubble size={size} class="max-w-none">
                Hello there
              </Bubble>
            </Part>
          ))}
        </div>
      ),

      Radius: () => (
        <div class="flex flex-wrap items-end gap-4">
          {radii.map((radius) => (
            <Part name={String(radius)} caption>
              <Bubble radius={radius} class="max-w-none">
                Hello
              </Bubble>
            </Part>
          ))}
        </div>
      ),

      'Reactions side x align': () => (
        <div class="grid gap-3">
          {reactionsSides.map((side) => (
            <Part name={String(side)} title>
              <div class="flex flex-wrap items-center gap-8 py-4">
                {reactionsAlignments.map((reactionsAlign) => (
                  <Part name={`${side} / ${reactionsAlign}`} caption={String(reactionsAlign)}>
                    <Bubble reactionsSide={side} reactionsAlign={reactionsAlign} class="max-w-none">
                      {{
                        default: () => 'A message with reactions',
                        reactions: () => '👍 2',
                      }}
                    </Bubble>
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),
    },
  })
})
