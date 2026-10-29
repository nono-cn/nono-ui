import { h } from 'vue'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Bubble, bubbleDefaults, type BubbleProps } from '@/components/ui/Bubble'
import { testAttrs } from '../utils/testAttrs'

function mountBubble(options: ComponentMountingOptions<typeof Bubble> = {}) {
  const { slots, ...rest } = options
  return mount(Bubble, {
    slots: { default: () => 'Mensaje', reactions: () => '👍', ...slots },
    ...rest,
  })
}

const casesAlign = [
  {
    input: undefined,
    expected: { class: [`self-${bubbleDefaults.align}`], notClass: ['self-end'] },
  },
  { input: 'start', expected: { class: ['self-start'], notClass: ['self-end'] } },
  { input: 'end', expected: { class: ['self-end'], notClass: ['self-start'] } },
] satisfies Array<{
  input: BubbleProps['align']
  expected: { class: string[]; notClass: string[] }
}>

const casesVariant = [
  {
    input: undefined,
    expected: {
      class: ['border-(--bubble-color)/20', 'bg-(--bubble-color)/10', 'text-(--bubble-color)'],
    },
  },
  {
    input: 'solid',
    expected: {
      class: ['border-transparent', 'bg-(--bubble-solid)', 'text-(--bubble-solid-foreground)'],
    },
  },
  {
    input: 'outline',
    expected: {
      class: ['border-(--bubble-color)/40', 'bg-transparent', 'text-(--bubble-color)'],
    },
  },
  {
    input: 'plain',
    expected: { class: ['border-transparent', 'bg-transparent', 'text-(--bubble-color)'] },
  },
  {
    input: 'subtle',
    expected: {
      class: ['border-(--bubble-color)/20', 'bg-(--bubble-color)/10', 'text-(--bubble-color)'],
    },
  },
  {
    input: 'soft',
    expected: {
      class: ['border-transparent', 'bg-(--bubble-color)/10', 'text-(--bubble-color)'],
    },
  },
] satisfies Array<{ input: BubbleProps['variant']; expected: { class: string[] } }>

const casesSize = [
  { input: undefined, expected: { class: ['px-4', 'py-2.5', 'text-sm'] } },
  { input: 'xs', expected: { class: ['px-2.5', 'py-1.5', 'text-xs'] } },
  { input: 'sm', expected: { class: ['px-3', 'py-2', 'text-sm'] } },
  { input: 'md', expected: { class: ['px-4', 'py-2.5', 'text-sm'] } },
  { input: 'lg', expected: { class: ['px-5', 'py-3', 'text-base'] } },
  { input: 'xl', expected: { class: ['px-6', 'py-3.5', 'text-lg'] } },
] satisfies Array<{ input: BubbleProps['size']; expected: { class: string[] } }>

const casesRadius = [
  {
    input: undefined,
    expected: { style: `--bubble-radius: var(--radius-${bubbleDefaults.radius})` },
  },
  { input: 'none', expected: { style: '--bubble-radius: 0' } },
  { input: 'md', expected: { style: '--bubble-radius: var(--radius-md)' } },
  { input: 'full', expected: { style: '--bubble-radius: 9999px' } },
  { input: '12px', expected: { style: '--bubble-radius: 12px' } },
  { input: 12, expected: { style: '--bubble-radius: 12px' } },
] satisfies Array<{ input: BubbleProps['radius']; expected: { style: string } }>

const casesColor = [
  {
    input: undefined,
    expected: {
      style: `--bubble-color: var(--${bubbleDefaults.color}, var(--${bubbleDefaults.color}))`,
    },
  },
  { input: 'success', expected: { style: '--bubble-color: var(--success, var(--neutral))' } },
  { input: '#ff0000', expected: { style: '--bubble-color: #ff0000' } },
] satisfies Array<{ input: BubbleProps['color']; expected: { style: string } }>

const casesReactionsSide = [
  {
    input: undefined,
    expected: { class: [`-${bubbleDefaults.reactionsSide}-3`], notClass: ['-top-3'] },
  },
  { input: 'top', expected: { class: ['-top-3'], notClass: ['-bottom-3'] } },
  { input: 'bottom', expected: { class: ['-bottom-3'], notClass: ['-top-3'] } },
] satisfies Array<{
  input: BubbleProps['reactionsSide']
  expected: { class: string[]; notClass: string[] }
}>

const casesReactionsAlign = [
  {
    input: undefined,
    expected: { class: [`${bubbleDefaults.reactionsAlign}-2`], notClass: ['start-2'] },
  },
  { input: 'start', expected: { class: ['start-2'], notClass: ['end-2'] } },
  { input: 'end', expected: { class: ['end-2'], notClass: ['start-2'] } },
] satisfies Array<{
  input: BubbleProps['reactionsAlign']
  expected: { class: string[]; notClass: string[] }
}>

const casesAs = [
  { input: undefined, expected: { tag: bubbleDefaults.as } },
  { input: 'div', expected: { tag: 'div' } },
  { input: 'article', expected: { tag: 'article' } },
] satisfies Array<{ input: BubbleProps['as']; expected: { tag: string } }>

const casesAsChild = [
  { input: undefined, expected: { tag: 'div' } },
  { input: false, expected: { tag: 'div' } },
  { input: true, expected: { tag: 'a' } },
] satisfies Array<{ input: BubbleProps['asChild']; expected: { tag: string } }>

// las clases de variant, size, align y las de reactions side/align van en sus tests
const casesNodos = [
  {
    input: 'root',
    expected: { class: ['relative', 'flex', 'w-fit', 'max-w-[80%]'], attrs: {} },
  },
  {
    input: 'surface',
    expected: {
      class: ['block', 'w-full', 'rounded-(--bubble-radius)', 'border', 'shadow-sm'],
      attrs: {},
    },
  },
  {
    input: 'reactions',
    expected: {
      class: [
        'absolute',
        'flex',
        'items-center',
        'gap-1',
        'rounded-full',
        'bg-background',
        'px-1',
        'py-0.5',
        'text-xs',
        'shadow-sm',
      ],
      attrs: {},
    },
  },
] satisfies Array<{
  input: string
  expected: { class: string[]; attrs: Record<string, string> }
}>

describe('Bubble', () => {
  describe('props', () => {
    describe('align', () => {
      it.each(casesAlign)('aplica las class align=$input a root', ({ input, expected }) => {
        const classes = mountBubble({ props: { align: input } })
          .get('[data-test-bubble-root]')
          .classes()

        expect(classes).toEqual(expect.arrayContaining(expected.class))
        expect(classes.filter((c) => expected.notClass.includes(c))).toEqual([])
      })
    })

    describe('variant', () => {
      it.each(casesVariant)(
        'aplica las class variant=$input a la surface',
        ({ input, expected }) => {
          const surface = mountBubble({ props: { variant: input } }).get(
            '[data-test-bubble-surface]',
          )

          expect(surface.classes()).toEqual(expect.arrayContaining(expected.class))
        },
      )
    })

    describe('size', () => {
      it.each(casesSize)('aplica las class size=$input a la surface', ({ input, expected }) => {
        const surface = mountBubble({ props: { size: input } }).get('[data-test-bubble-surface]')

        expect(surface.classes()).toEqual(expect.arrayContaining(expected.class))
      })
    })

    describe('radius', () => {
      it.each(casesRadius)('resuelve radius=$input en root', ({ input, expected }) => {
        const surface = mountBubble({ props: { radius: input } }).get('[data-test-bubble-surface]')

        expect(surface.attributes('style')).toContain(expected.style)
      })
    })

    describe('color', () => {
      it.each(casesColor)('resuelve color=$input en root', ({ input, expected }) => {
        const surface = mountBubble({ props: { color: input } }).get('[data-test-bubble-surface]')

        expect(surface.attributes('style')).toContain(expected.style)
      })
    })

    describe('reactionsSide', () => {
      it.each(casesReactionsSide)(
        'aplica las class reactionsSide=$input a las reacciones',
        ({ input, expected }) => {
          const classes = mountBubble({ props: { reactionsSide: input } })
            .get('[data-test-bubble-reactions]')
            .classes()

          expect(classes).toEqual(expect.arrayContaining(expected.class))
          expect(classes.filter((c) => expected.notClass.includes(c))).toEqual([])
        },
      )
    })

    describe('reactionsAlign', () => {
      it.each(casesReactionsAlign)(
        'aplica las class reactionsAlign=$input a las reacciones',
        ({ input, expected }) => {
          const classes = mountBubble({ props: { reactionsAlign: input } })
            .get('[data-test-bubble-reactions]')
            .classes()

          expect(classes).toEqual(expect.arrayContaining(expected.class))
          expect(classes.filter((c) => expected.notClass.includes(c))).toEqual([])
        },
      )
    })

    describe('as', () => {
      it.each(casesAs)(
        'renderiza surface como $expected.tag con as=$input',
        ({ input, expected }) => {
          const surface = mountBubble({ props: { as: input } }).get('[data-test-bubble-surface]')

          expect(surface.element.tagName.toLowerCase()).toBe(expected.tag)
        },
      )
    })

    describe('asChild', () => {
      it.each(casesAsChild)(
        'renderiza surface como $expected.tag con asChild=$input',
        ({ input, expected }) => {
          const surface = mountBubble({
            props: { asChild: input },
            slots: { default: () => h('a', { href: '/message' }, 'Mensaje') },
          }).get('[data-test-bubble-surface]')

          expect(surface.element.tagName.toLowerCase()).toBe(expected.tag)
        },
      )
    })

    describe('ui', () => {
      describe('surface', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.surface a la superficie',
          id: '[data-test-bubble-surface]',
          mount: (attrs) => mountBubble({ props: { ui: { surface: () => attrs } } }),
        })
      })

      describe('reactions', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.reactions a las reacciones',
          id: '[data-test-bubble-reactions]',
          mount: (attrs) => mountBubble({ props: { ui: { reactions: () => attrs } } }),
        })
      })
    })
  })

  describe('nodos', () => {
    it.each(casesNodos)(
      'aplica las clases y los atributos fijos al nodo $input',
      ({ input, expected }) => {
        const node = mountBubble().get(`[data-test-bubble-${input}]`)

        expect({ class: node.classes(), attrs: node.attributes() }).toEqual({
          class: expect.arrayContaining(expected.class),
          attrs: expect.objectContaining(expected.attrs),
        })
      },
    )
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-bubble-root]',
      mount: (attrs) => mountBubble({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot dentro de la surface', () => {
        expect(mountBubble().get('[data-test-bubble-surface]').text()).toBe('Mensaje')
      })
    })

    describe('reactions', () => {
      it('renderiza el slot dentro de las reacciones', () => {
        expect(mountBubble().get('[data-test-bubble-reactions]').text()).toBe('👍')
      })

      it('no renderiza las reacciones sin el slot', () => {
        const bubble = mount(Bubble, { slots: { } })

        expect(bubble.find('[data-test-bubble-reactions]').exists()).toBe(false)
      })
    })
  })
})
