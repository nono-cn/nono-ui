import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Avatar } from '@/components/ui/Avatar'
import { Bubble } from '@/components/ui/Bubble'
import {
  Message,
  messageDefaults,
  type MessageAlign,
  type MessageBubbleProps,
  type MessageProps,
} from '@/components/ui/Message'
import { testAttrs } from '../utils/testAttrs'
import { testAvatarConfig } from '../utils/testAvatarConfig'
import { testBubbleConfig } from '../utils/testBubbleConfig'

function mountMessage(options: ComponentMountingOptions<typeof Message> = {}) {
  return mount(Message, options)
}

const casesMessage = [
  { input: undefined, expected: { text: { bubble: '' } } },
  { input: '', expected: { text: { bubble: '' } } },
  { input: 'Hola, ¿qué tal?', expected: { text: { bubble: 'Hola, ¿qué tal?' } } },
] satisfies Array<{
  input: MessageProps['message']
  expected: { text: { bubble: string } }
}>

const casesAlign = [
  {
    input: undefined,
    expected: {
      bubble: { align: messageDefaults.align },
      class: { root: ['flex-row'], content: ['items-start', 'text-start'] },
    },
  },
  {
    input: 'start',
    expected: {
      bubble: { align: 'start' },
      class: { root: ['flex-row'], content: ['items-start', 'text-start'] },
    },
  },
  {
    input: 'end',
    expected: {
      bubble: { align: 'end' },
      class: { root: ['flex-row-reverse'], content: ['items-end', 'text-end'] },
    },
  },
] satisfies Array<{
  input: MessageProps['align']
  expected: { bubble: { align: MessageAlign }; class: { root: string[]; content: string[] } }
}>

// bubble no admite align por tipo; si llega en tiempo de ejecución, manda el align del mensaje
const casesBubbleAlign = [
  { input: { align: 'start', bubbleAlign: 'end' }, expected: { bubble: { align: 'start' } } },
  { input: { align: 'end', bubbleAlign: 'start' }, expected: { bubble: { align: 'end' } } },
] satisfies Array<{
  input: { align: MessageAlign; bubbleAlign: MessageAlign }
  expected: { bubble: { align: MessageAlign } }
}>

// input = prop message; el slot default sustituye siempre al texto
const casesSlotDefault = [
  { input: undefined, expected: { text: { bubble: 'Contenido del slot' } } },
  { input: 'Fallback', expected: { text: { bubble: 'Contenido del slot' } } },
] satisfies Array<{
  input: MessageProps['message']
  expected: { text: { bubble: string } }
}>

// input = prop avatar; con el slot avatar, el nodo se renderiza siempre y no pinta Avatar
const casesSlotAvatar = [
  { input: undefined, expected: { text: { avatar: 'AL' }, exists: { avatarComponent: false } } },
  {
    input: { label: 'XX' },
    expected: { text: { avatar: 'AL' }, exists: { avatarComponent: false } },
  },
] satisfies Array<{
  input: MessageProps['avatar']
  expected: { text: { avatar: string }; exists: { avatarComponent: boolean } }
}>

// input = contenido del slot; sin slot el nodo no se renderiza
const casesSlotHeader = [
  { input: undefined, expected: { text: { header: [] } } },
  { input: 'Ana López', expected: { text: { header: ['Ana López'] } } },
] satisfies Array<{
  input: string | undefined
  expected: { text: { header: string[] } }
}>

// input = contenido del slot; sin slot el nodo no se renderiza
const casesSlotReactions = [
  { input: undefined, expected: { text: { reactions: [] } } },
  { input: '🎉 2', expected: { text: { reactions: ['🎉 2'] } } },
] satisfies Array<{
  input: string | undefined
  expected: { text: { reactions: string[] } }
}>

// La burbuja reserva espacio solo con el slot reactions, en el lado de bubble.reactionsSide
// (bottom por defecto en Bubble); expected.class.bubble son las clases de separación presentes
const casesReactionsSpace = [
  {
    input: { reactions: undefined, reactionsSide: undefined },
    expected: { class: { bubble: [] } },
  },
  { input: { reactions: undefined, reactionsSide: 'top' }, expected: { class: { bubble: [] } } },
  {
    input: { reactions: '🎉 2', reactionsSide: undefined },
    expected: { class: { bubble: ['mb-3'] } },
  },
  { input: { reactions: '🎉 2', reactionsSide: 'top' }, expected: { class: { bubble: ['mt-3'] } } },
  {
    input: { reactions: '🎉 2', reactionsSide: 'bottom' },
    expected: { class: { bubble: ['mb-3'] } },
  },
] satisfies Array<{
  input: { reactions: string | undefined; reactionsSide: MessageBubbleProps['reactionsSide'] }
  expected: { class: { bubble: string[] } }
}>

// input = contenido del slot; sin slot el nodo no se renderiza
const casesSlotFooter = [
  { input: undefined, expected: { text: { footer: [] } } },
  { input: '10:24', expected: { text: { footer: ['10:24'] } } },
] satisfies Array<{
  input: string | undefined
  expected: { text: { footer: string[] } }
}>

const casesNodos = [
  { input: 'root', expected: { class: ['flex', 'w-full', 'items-start', 'gap-2'], attrs: {} } },
  { input: 'avatar', expected: { class: ['shrink-0'], attrs: {} } },
  {
    input: 'content',
    expected: { class: ['flex', 'min-w-0', 'flex-1', 'flex-col', 'gap-1'], attrs: {} },
  },
  {
    input: 'header',
    expected: { class: ['text-xs', 'font-medium', 'text-muted-foreground'], attrs: {} },
  },
  { input: 'footer', expected: { class: ['text-xs', 'text-muted-foreground'], attrs: {} } },
] satisfies Array<{
  input: 'root' | 'avatar' | 'content' | 'header' | 'footer'
  expected: { class: string[]; attrs: Record<string, string> }
}>

describe('Message', () => {
  describe('props', () => {
    describe('message', () => {
      it.each(casesMessage)('renderiza message=$input en la burbuja', ({ input, expected }) => {
        expect(
          mountMessage({ props: { message: input } })
            .get('[data-test-bubble-surface]')
            .text(),
        ).toBe(expected.text.bubble)
      })
    })

    describe('align', () => {
      it.each(casesAlign)('pasa align=$input a Bubble', ({ input, expected }) => {
        expect(
          mountMessage({ props: { align: input } })
            .getComponent(Bubble)
            .props('align'),
        ).toBe(expected.bubble.align)
      })

      it.each(casesAlign)(
        'aplica las clases de align=$input a root y a content',
        ({ input, expected }) => {
          const wrapper = mountMessage({ props: { align: input } })

          expect({
            root: wrapper.get('[data-test-message-root]').classes(),
            content: wrapper.get('[data-test-message-content]').classes(),
          }).toEqual({
            root: expect.arrayContaining(expected.class.root),
            content: expect.arrayContaining(expected.class.content),
          })
        },
      )
    })

    describe('avatar', () => {
      it('no renderiza el nodo avatar sin avatar ni slot avatar', () => {
        expect(mountMessage().find('[data-test-message-avatar]').exists()).toBe(false)
      })

      testAvatarConfig({
        text: 'pasa las props de avatar a Avatar',
        mount: (input) => mountMessage({ props: { avatar: input } }),
      })
    })

    describe('bubble', () => {
      testBubbleConfig({
        text: 'pasa las props de bubble a Bubble',
        mount: (input) => mountMessage({ props: { align: input.align, bubble: input } }),
      })

      it.each(casesBubbleAlign)(
        'usa align=$input.align del mensaje aunque bubble traiga align=$input.bubbleAlign',
        ({ input, expected }) => {
          const bubble = { align: input.bubbleAlign } as MessageBubbleProps

          expect(
            mountMessage({ props: { align: input.align, bubble } })
              .getComponent(Bubble)
              .props('align'),
          ).toBe(expected.bubble.align)
        },
      )
    })

    describe('ui', () => {
      describe('content', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.content al contenido',
          id: '[data-test-message-content]',
          mount: (attrs) => mountMessage({ props: { ui: { content: () => attrs } } }),
        })
      })

      describe('header', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.header a la cabecera',
          id: '[data-test-message-header]',
          mount: (attrs) =>
            mountMessage({
              props: { ui: { header: () => attrs } },
              slots: { header: () => 'Ana López' },
            }),
        })
      })

      describe('footer', () => {
        testAttrs({
          text: 'pasa atributos mediante ui.footer al pie',
          id: '[data-test-message-footer]',
          mount: (attrs) =>
            mountMessage({
              props: { ui: { footer: () => attrs } },
              slots: { footer: () => '10:24' },
            }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-message-root]',
      mount: (attrs) => mountMessage({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it.each(casesSlotDefault)(
        'renderiza el slot default en la burbuja con message=$input',
        ({ input, expected }) => {
          expect(
            mountMessage({
              props: { message: input },
              slots: { default: () => 'Contenido del slot' },
            })
              .get('[data-test-bubble-surface]')
              .text(),
          ).toBe(expected.text.bubble)
        },
      )
    })

    describe('avatar', () => {
      it.each(casesSlotAvatar)(
        'renderiza el slot avatar en lugar de Avatar con avatar=$input',
        ({ input, expected }) => {
          const wrapper = mountMessage({
            props: { avatar: input },
            slots: { avatar: () => 'AL' },
          })

          expect({
            text: wrapper.get('[data-test-message-avatar]').text(),
            avatarComponent: wrapper.findComponent(Avatar).exists(),
          }).toEqual({
            text: expected.text.avatar,
            avatarComponent: expected.exists.avatarComponent,
          })
        },
      )
    })

    describe('header', () => {
      it.each(casesSlotHeader)(
        'renderiza la cabecera con el slot header=$input',
        ({ input, expected }) => {
          expect(
            mountMessage({ slots: input === undefined ? {} : { header: () => input } })
              .findAll('[data-test-message-header]')
              .map((header) => header.text()),
          ).toEqual(expected.text.header)
        },
      )
    })

    describe('reactions', () => {
      it.each(casesSlotReactions)(
        'renderiza las reacciones de la burbuja con el slot reactions=$input',
        ({ input, expected }) => {
          expect(
            mountMessage({ slots: input === undefined ? {} : { reactions: () => input } })
              .findAll('[data-test-bubble-reactions]')
              .map((reactions) => reactions.text()),
          ).toEqual(expected.text.reactions)
        },
      )

      it.each(casesReactionsSpace)(
        'reserva el espacio de las reacciones en la burbuja con reactions=$input.reactions y reactionsSide=$input.reactionsSide',
        ({ input, expected }) => {
          expect(
            mountMessage({
              props: { bubble: { reactionsSide: input.reactionsSide } },
              slots: input.reactions === undefined ? {} : { reactions: () => input.reactions },
            })
              .get('[data-test-bubble-root]')
              .classes()
              .filter((name) => ['mt-3', 'mb-3'].includes(name)),
          ).toEqual(expected.class.bubble)
        },
      )
    })

    describe('footer', () => {
      it.each(casesSlotFooter)(
        'renderiza el pie con el slot footer=$input',
        ({ input, expected }) => {
          expect(
            mountMessage({ slots: input === undefined ? {} : { footer: () => input } })
              .findAll('[data-test-message-footer]')
              .map((footer) => footer.text()),
          ).toEqual(expected.text.footer)
        },
      )
    })
  })

  describe('nodos', () => {
    it.each(casesNodos)(
      'aplica las class y los attrs fijos al nodo $input',
      ({ input, expected }) => {
        const node = mountMessage({
          props: { avatar: {} },
          slots: { header: () => 'Ana López', footer: () => '10:24' },
        }).get(`[data-test-message-${input}]`)

        expect({ class: node.classes(), attrs: node.attributes() }).toEqual({
          class: expect.arrayContaining(expected.class),
          attrs: expect.objectContaining(expected.attrs),
        })
      },
    )
  })
})
