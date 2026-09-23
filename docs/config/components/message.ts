import type { ComponentDocConfig } from '../component-docs'
import MessageBasicExample from '../../components/examples/message/MessageBasicExample.vue'
import MessageAlignExample from '../../components/examples/message/MessageAlignExample.vue'
import MessageAvatarExample from '../../components/examples/message/MessageAvatarExample.vue'
import MessageSlotsExample from '../../components/examples/message/MessageSlotsExample.vue'
import MessageBubbleExample from '../../components/examples/message/MessageBubbleExample.vue'

const messageConfig: ComponentDocConfig = {
  slug: 'message',
  title: 'Message',
  language: 'en',
  description: 'Composes a conversation message with a bubble, avatar, metadata, and reactions.',
  importPath: '@nono-ui/components/ui/Message',
  usage: [
    {
      title: 'Basic message',
      description: 'Displays a message with the default content and styling.',
      component: MessageBasicExample,
    },
  ],
  examples: [
    {
      title: 'Align',
      description: 'Aligns the message to the start or end of its container.',
      component: MessageAlignExample,
    },
    {
      title: 'Avatar',
      description: 'Adds an avatar to identify the sender.',
      component: MessageAvatarExample,
    },
    {
      title: 'Bubble',
      description: 'Customizes the variant and severity of the inner bubble.',
      component: MessageBubbleExample,
    },
    {
      title: 'Slots',
      description: 'Customizes the message header, reactions, and footer.',
      component: MessageSlotsExample,
    },
  ],
  accessibility: [
    {
      title: 'Conversation content',
      description:
        'Message renders a div and does not add a conversational role by itself. Use clear text to identify the content, and do not rely only on alignment, color, or the avatar to show who sent the message. If the avatar identifies a person, provide an accessible name through the avatar slot and attributes such as aria-label or alt on the relevant content. HTML attributes, class, style, data-*, and ARIA are forwarded to the root element.',
    },
  ],
  api: {
    props: [
      {
        name: 'align',
        type: "'start' | 'end'",
        default: "'start'",
        description: 'Alignment of the message and bubble within their container.',
      },
      {
        name: 'avatar',
        type: 'AvatarConfig',
        typeLink: '/components/avatar#avatar-config',
        default: 'undefined',
        description:
          'Configuration for the avatar shown next to the message when the avatar slot is not used.',
      },
      {
        name: 'bubble',
        type: 'BubbleConfig',
        typeLink: '/components/bubble#bubble-config',
        default: 'undefined',
        description:
          "Bubble configuration. Message's align prop is also passed to Bubble and takes precedence over bubble.align.",
      },
      {
        name: 'message',
        type: 'string',
        default: 'undefined',
        description: 'Text rendered when no content is provided in the default slot.',
      },
      {
        name: 'ui',
        type: `{
  header?: () => HTMLAttributes
  footer?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers for customizing attributes on the header and footer slot containers.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'avatar',
        type: '-',
        description: 'Content shown next to the message; replaces the avatar fallback.',
      },
      {
        name: 'header',
        type: '-',
        description: 'Content shown above Bubble, such as the author or time.',
      },
      {
        name: 'default',
        type: '-',
        description: "Main content forwarded to Bubble's default slot.",
      },
      {
        name: 'reaction',
        type: '-',
        description: "Content forwarded to Bubble's reactions slot.",
      },
      {
        name: 'footer',
        type: '-',
        description: 'Content shown below Bubble, such as the read status.',
      },
    ],
    expose: [],
  },
}

export default messageConfig
