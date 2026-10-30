import type { ComponentDocConfig } from '../component-docs'
import { messageAligns, messageDefaults } from '@/components/ui/Message'
import MessageBasicExample from '../../components/examples/message/MessageBasicExample.vue'
import MessageAlignExample from '../../components/examples/message/MessageAlignExample.vue'
import MessageAvatarExample from '../../components/examples/message/MessageAvatarExample.vue'
import MessageBubbleExample from '../../components/examples/message/MessageBubbleExample.vue'
import MessageHeaderFooterExample from '../../components/examples/message/MessageHeaderFooterExample.vue'
import MessageReactionsExample from '../../components/examples/message/MessageReactionsExample.vue'
import MessageUiExample from '../../components/examples/message/MessageUiExample.vue'

const union = (values: readonly string[]) => values.map((value) => `'${value}'`).join(' | ')

const messageConfig: ComponentDocConfig = {
  slug: 'message',
  title: 'Message',
  language: 'en',
  description: 'Display a chat message with its avatar, bubble, header and footer.',
  importPath: '@nono-ui/components/ui/Message',
  usage: [
    {
      title: 'Basic usage',
      description: 'Show a chat message inside a bubble.',
      component: MessageBasicExample,
    },
  ],
  examples: [
    {
      title: 'Align',
      description: 'Place the message at the start or end; end puts the avatar on the other side.',
      component: MessageAlignExample,
    },
    {
      title: 'Avatar',
      description: 'Pass Avatar props to show who sent the message.',
      component: MessageAvatarExample,
    },
    {
      title: 'Bubble',
      description: 'Pass Bubble props, except align, to change its variant, color or radius.',
      component: MessageBubbleExample,
    },
    {
      title: 'Header and footer',
      description: 'Use the header and footer slots for the sender name, time or delivery state.',
      component: MessageHeaderFooterExample,
    },
    {
      title: 'Reactions',
      description:
        'The reactions slot is passed to the bubble, which reserves space on the reactions side so they do not cover the header, the footer or nearby messages.',
      component: MessageReactionsExample,
    },
    {
      title: 'UI resolver',
      description: 'Add attributes and classes to the content, header and footer.',
      component: MessageUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description: 'Message is a generic container with no role; its parts are plain elements.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          [
            'role',
            'Root, avatar, content, header, footer',
            'None; they are generic div containers.',
          ],
          ['alt', 'Avatar image', 'Taken from avatar.alt; describe who sent the message.'],
        ],
      },
    },
    {
      title: 'Sender',
      description:
        'Alignment and color do not tell who sent a message. Show the sender in the header, or give the avatar an alt text.',
    },
    {
      title: 'Conversations',
      description:
        'For a conversation, wrap the messages in a list or a role="log" container so new messages can be announced.',
    },
  ],
  api: {
    props: [
      {
        name: 'message',
        type: 'string',
        default: 'undefined',
        description: 'Text of the bubble when the default slot is not used.',
      },
      {
        name: 'align',
        type: union(messageAligns),
        default: `'${messageDefaults.align}'`,
        description:
          'Side of the message; end reverses the avatar and aligns the bubble at the end.',
      },
      {
        name: 'avatar',
        type: 'AvatarProps',
        typeLink: '/components/avatar',
        default: 'undefined',
        description:
          'Props of the Avatar; it is only shown when set or when the avatar slot is used.',
      },
      {
        name: 'bubble',
        type: "Omit<BubbleProps, 'align'>",
        typeLink: '/components/bubble',
        default: 'undefined',
        description: 'Props of the Bubble; its align always comes from the message align.',
      },
      {
        name: 'ui',
        type: `{
  content?: () => HTMLAttributes
  header?: () => HTMLAttributes
  footer?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description: 'Resolvers for attributes on the message parts.',
      },
    ],
    emits: [],
    slots: [
      { name: 'default', type: '-', description: 'Content of the bubble; replaces message.' },
      { name: 'avatar', type: '-', description: 'Replaces the Avatar.' },
      {
        name: 'header',
        type: '-',
        description: 'Content above the bubble; only rendered when used.',
      },
      { name: 'reactions', type: '-', description: 'Reactions placed on the bubble edge.' },
      {
        name: 'footer',
        type: '-',
        description: 'Content below the bubble; only rendered when used.',
      },
    ],
    configs: [],
    expose: [],
  },
}

export default messageConfig
