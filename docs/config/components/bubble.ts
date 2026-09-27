import type { ComponentDocConfig } from '../component-docs'
import BubbleBasicExample from '../../components/examples/bubble/BubbleBasicExample.vue'
import BubbleAlignExample from '../../components/examples/bubble/BubbleAlignExample.vue'
import BubbleVariantExample from '../../components/examples/bubble/BubbleVariantExample.vue'
import BubbleSeverityExample from '../../components/examples/bubble/BubbleSeverityExample.vue'
import BubbleColorExample from '../../components/examples/bubble/BubbleColorExample.vue'
import BubbleReactionsExample from '../../components/examples/bubble/BubbleReactionsExample.vue'
import BubbleElementExample from '../../components/examples/bubble/BubbleElementExample.vue'

const bubbleConfig: ComponentDocConfig = {
  slug: 'bubble',
  title: 'Bubble',
  language: 'en',
  description: 'Displays conversation messages with alignment, variants, and reactions.',
  importPath: '@nono-ui/components/ui/Bubble',
  usage: [
    {
      title: 'Basic usage',
      description: 'Show a message with the subtle variant and neutral severity by default.',
      component: BubbleBasicExample,
    },
  ],
  examples: [
    {
      title: 'Align',
      description: 'Place the bubble at the start or end of its container.',
      component: BubbleAlignExample,
    },
    {
      title: 'Variant',
      description: 'Choose the visual style applied to the bubble.',
      component: BubbleVariantExample,
    },
    {
      title: 'Severity',
      description: 'Choose the semantic color and visual style of the bubble.',
      component: BubbleSeverityExample,
    },
    {
      title: 'Color',
      description: 'Choose a custom color and see how each variant applies it.',
      component: BubbleColorExample,
    },
    {
      title: 'Reactions',
      description: 'Choose where reactions appear around the bubble.',
      component: BubbleReactionsExample,
    },
    {
      title: 'Element',
      description: 'Render the surface as a chosen element or merge it onto the child element.',
      component: BubbleElementExample,
    },
  ],
  accessibility: [
    {
      title: 'Conversation content',
      description:
        'Use clear text and do not rely only on color or alignment to identify the message sender. Interactive reactions need accessible names.',
    },
  ],
  api: {
    props: [
      {
        name: 'align',
        type: "'start' | 'end'",
        default: "'start'",
        description: 'Alignment of the bubble within its container.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'",
        default: "'subtle'",
        description: 'Visual style of the surface.',
      },
      {
        name: 'severity',
        type: "'primary' | 'neutral' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'neutral'",
        description: 'Severity used to choose the colors.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS color.',
      },
      {
        name: 'sideReaction',
        type: "'top' | 'bottom'",
        default: "'bottom'",
        description: 'Side where reactions appear.',
      },
      {
        name: 'alignReaction',
        type: "'start' | 'end'",
        default: "'end'",
        description: 'Alignment of the reactions.',
      },
      {
        name: 'as',
        type: 'AsTag | Component',
        default: "'div'",
        description: 'Root element or component for the surface.',
      },
      {
        name: 'asChild',
        type: 'boolean',
        default: 'false',
        description: 'Renders the surface on the element provided by the default slot.',
      },
      {
        name: 'ui',
        type: `{
  reactions?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description: 'Resolver for customizing the reactions container attributes and classes.',
      },
    ],
    configs: [
      {
        id: 'bubble-config',
        title: 'BubbleConfig',
        description: 'Alias of BubbleProps used to configure bubbles in composite components.',
        showDefault: false,
        rows: [
          {
            name: 'BubbleProps',
            type: 'BubbleProps',
            typeLink: '#props',
            description: 'Includes the public Bubble props.',
          },
        ],
      },
    ],
    emits: [],
    slots: [
      { name: 'default', type: '-', description: 'Main bubble content.' },
      {
        name: 'reactions',
        type: '-',
        description: 'Reactions displayed around the bubble.',
      },
    ],
    expose: [],
  },
}

export default bubbleConfig
