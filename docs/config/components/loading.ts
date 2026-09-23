import type { ComponentDocConfig } from '../component-docs'
import LoadingBasicExample from '../../components/examples/loading/LoadingBasicExample.vue'
import LoadingCustomExample from '../../components/examples/loading/LoadingCustomExample.vue'
import LoadingContentExample from '../../components/examples/loading/LoadingContentExample.vue'

const loadingConfig: ComponentDocConfig = {
  slug: 'loading',
  title: 'Loading',
  language: 'en',
  description: 'Switches between a loading indicator and content as an operation changes state.',
  importPath: '@nono-ui/components/ui/Loading',
  usage: [
    {
      title: 'Basic loading',
      description: 'Show the default indicator while an operation is in progress.',
      component: LoadingBasicExample,
    },
  ],
  examples: [
    {
      title: 'Custom loading',
      description: 'Replace the default icon using the loading slot.',
      component: LoadingCustomExample,
    },
    {
      title: 'Loaded content',
      description: 'Show the content when the operation finishes.',
      component: LoadingContentExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible loading state',
      description:
        'Loading renders role="status" and aria-busy on the root element. While loading is true, use aria-label to provide a specific name; if omitted, the configured loading translation is used. When loading completes, aria-label is removed so the content is exposed with its own accessible name.',
    },
    {
      title: 'Content and spinner',
      description:
        'Do not rely on animation or the icon alone to communicate the state. Provide clear text in the content or loading slot when needed, and mark decorative icons as hidden from assistive technologies through their configuration.',
    },
  ],
  api: {
    props: [
      {
        name: 'loading',
        type: 'boolean',
        default: 'true',
        description: 'Determines whether to show the loading state or the default slot content.',
      },
      {
        name: 'icon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: "{ name: 'spinner' }",
        description:
          'Icon configuration displayed while loading when the loading slot is not used.',
      },
      {
        name: 'ui',
        type: `{
  loading?: (context: LoadingContext) => HTMLAttributes
  content?: (context: LoadingContext) => HTMLAttributes
}`,
        typeParts: [
          { text: '{\n  loading?: (context: ' },
          { text: 'LoadingContext', link: '#loading-context' },
          { text: ') => HTMLAttributes\n  content?: (context: ' },
          { text: 'LoadingContext', link: '#loading-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers for customizing the attributes and classes of the loading and content containers.',
      },
    ],
    configs: [
      {
        id: 'loading-context',
        title: 'LoadingContext',
        description: 'Context available in ui resolvers and the default and loading slots.',
        showDefault: false,
        rows: [
          {
            name: 'loading',
            type: 'boolean',
            description: 'Indicates whether the component is showing the loading state.',
          },
        ],
      },
    ],
    emits: [],
    slots: [
      {
        name: 'loading',
        type: 'LoadingContext',
        typeLink: '#loading-context',
        description:
          'Content displayed while loading. Receives the current context and replaces the default icon.',
      },
      {
        name: 'default',
        type: 'LoadingContext',
        typeLink: '#loading-context',
        description: 'Content displayed when loading is false. Receives the current context.',
      },
    ],
    expose: [],
  },
}

export default loadingConfig
