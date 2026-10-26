import type { ComponentDocConfig } from '../component-docs'
import { loadingDefaults } from '@/components/ui/Loading'
import LoadingBasicExample from '../../components/examples/loading/LoadingBasicExample.vue'
import LoadingCustomExample from '../../components/examples/loading/LoadingCustomExample.vue'
import LoadingContentExample from '../../components/examples/loading/LoadingContentExample.vue'
import LoadingIconExample from '../../components/examples/loading/LoadingIconExample.vue'
import LoadingUiExample from '../../components/examples/loading/LoadingUiExample.vue'

const loadingConfig: ComponentDocConfig = {
  slug: 'loading',
  title: 'Loading',
  language: 'en',
  description: 'Switches between a loading indicator and content as an operation changes state.',
  importPath: '@nono-ui/components/ui/Loading',
  usage: [
    {
      title: 'Basic loading',
      description: 'Switch between the default indicator and loaded content.',
      component: LoadingBasicExample,
    },
  ],
  examples: [
    {
      title: 'Icon',
      description: 'Choose the icon name used as the loading indicator.',
      component: LoadingIconExample,
    },
    {
      title: 'UI',
      description: 'Style the loading and content containers from LoadingContext.',
      component: LoadingUiExample,
    },
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
      title: 'Roles and attributes',
      description:
        'While loading, the root is announced as a status with its own name. When loading ends, the name is removed so the content is exposed with its own.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="status"', 'Root', 'Announces changes in the loading state.'],
          ['aria-busy', 'Root', 'true while loading, false afterwards.'],
          [
            'aria-label',
            'Root',
            'Only while loading: your aria-label, or "Loading" in the current locale.',
          ],
          ['aria-hidden="true"', 'Icon', 'The spinner is decorative.'],
        ],
      },
    },
    {
      title: 'Content and spinner',
      description:
        'Do not rely on the animation or the icon alone to communicate the state. Give Loading a specific aria-label, or put text in the loading slot.',
    },
  ],
  api: {
    props: [
      {
        name: 'loading',
        type: 'boolean',
        default: String(loadingDefaults.loading),
        description: 'Determines whether to show the loading state or the default slot content.',
      },
      {
        name: 'icon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: `'${loadingDefaults.icon}'`,
        description: 'Name of the icon displayed while loading when the loading slot is not used.',
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
        default: String(loadingDefaults.ui),
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
