import type { ComponentDocConfig } from '../component-docs'
import ScrollAreaBasicExample from '../../components/examples/scroll-area/ScrollAreaBasicExample.vue'
import ScrollAreaOrientationExample from '../../components/examples/scroll-area/ScrollAreaOrientationExample.vue'
import ScrollAreaTypeExample from '../../components/examples/scroll-area/ScrollAreaTypeExample.vue'
import ScrollAreaScrollHideDelayExample from '../../components/examples/scroll-area/ScrollAreaScrollHideDelayExample.vue'

const scrollAreaConfig: ComponentDocConfig = {
  slug: 'scroll-area',
  title: 'ScrollArea',
  language: 'en',
  description: 'Adds native scrolling with customizable scrollbars and consistent behavior.',
  importPath: '@nono-ui/components/ui/ScrollArea',
  usage: [
    {
      title: 'Vertical scrolling',
      description: 'Constrain long content to a set height with vertical scrolling.',
      component: ScrollAreaBasicExample,
    },
  ],
  examples: [
    {
      title: 'Type',
      description: 'Compare five scrollbar visibility behaviors.',
      component: ScrollAreaTypeExample,
    },
    {
      title: 'ScrollHideDelay',
      description: 'Adjust how long the scrollbar remains visible after scrolling.',
      component: ScrollAreaScrollHideDelayExample,
    },
    {
      title: 'Orientation',
      description: 'Compare vertical, horizontal, and bidirectional scrolling.',
      component: ScrollAreaOrientationExample,
    },
  ],
  accessibility: [
    {
      title: 'Native scrolling and keyboard support',
      description:
        'ScrollArea preserves native browser scrolling, including keyboard navigation. Set a constrained size when content should overflow, do not hide the only indication of scrollability, and preserve the HTML, class, style, and ARIA attributes forwarded to the root.',
      links: [
        {
          label: 'See the Reka UI ScrollArea accessibility guide',
          href: 'https://www.reka-ui.com/docs/components/scroll-area#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'type',
        type: "'auto' | 'always' | 'scroll' | 'hover' | 'glimpse'",
        default: "'hover'",
        description:
          'Defines when scrollbars are shown: when content overflows, always, while scrolling, on hover, or briefly.',
      },
      {
        name: 'scrollHideDelay',
        type: 'number',
        default: '600',
        description: 'Delay in milliseconds before hiding scrollbars when type is scroll or hover.',
      },
      {
        name: 'orientation',
        type: "'vertical' | 'horizontal' | 'both'",
        default: "'vertical'",
        description: 'Directions in which scrollbars are rendered.',
      },
      {
        name: 'forceMount',
        type: 'boolean',
        default: 'false',
        description:
          'Forces scrollbars to mount so they can be controlled with animations or other APIs.',
      },
      {
        name: 'ui',
        type: `{
  viewport?: () => HTMLAttributes
  verticalScrollbar?: () => HTMLAttributes
  horizontalScrollbar?: () => HTMLAttributes
  thumbVertical?: () => HTMLAttributes
  thumbHorizontal?: () => HTMLAttributes
  corner?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description:
          'Public resolvers for applying attributes and classes to the internal scroll area parts.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Content rendered inside the scrollable viewport.',
      },
    ],
    expose: [],
  },
}

export default scrollAreaConfig
