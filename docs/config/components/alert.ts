import type { ComponentDocConfig } from '../component-docs'
import AlertBasicExample from '../../components/examples/alert/AlertBasicExample.vue'
import AlertVariantExample from '../../components/examples/alert/AlertVariantExample.vue'
import AlertSeverityExample from '../../components/examples/alert/AlertSeverityExample.vue'
import AlertColorExample from '../../components/examples/alert/AlertColorExample.vue'
import AlertIconExample from '../../components/examples/alert/AlertIconExample.vue'
import AlertClosableExample from '../../components/examples/alert/AlertClosableExample.vue'
import AlertCloseButtonExample from '../../components/examples/alert/AlertCloseButtonExample.vue'
import AlertDecorativeExample from '../../components/examples/alert/AlertDecorativeExample.vue'

const alertConfig: ComponentDocConfig = {
  slug: 'alert',
  title: 'Alert',
  language: 'en',
  description: 'Communicates important information, statuses, and actions within an interface.',
  importPath: '@nono-ui/components/ui/Alert',
  usage: [
    {
      title: 'Basic usage',
      description: 'Show a title and description with the default styling.',
      component: AlertBasicExample,
    },
  ],
  examples: [
    {
      title: 'Variant',
      description: 'Compare the five available visual styles.',
      component: AlertVariantExample,
    },
    {
      title: 'Severity',
      description: 'Compare the available semantic colors.',
      component: AlertSeverityExample,
    },
    {
      title: 'Color',
      description: 'Apply a custom CSS color to the alert style.',
      component: AlertColorExample,
    },
    {
      title: 'Icon',
      description: 'Display a leading icon using the icon prop.',
      component: AlertIconExample,
    },
    {
      title: 'Closable',
      description: 'Allow the alert to be dismissed with the default close button.',
      component: AlertClosableExample,
    },
    {
      title: 'CloseButton',
      description: 'Customize the close button configuration.',
      component: AlertCloseButtonExample,
    },
    {
      title: 'Decorative',
      description: 'Compare the default alert role with decorative mode.',
      component: AlertDecorativeExample,
    },
  ],
  accessibility: [
    {
      title: 'Informative and decorative alerts',
      description:
        'Alert uses role="alert" by default. Set decorative=true only for visual content that should not be announced. Give informative icons an accessible name (aria-label / aria-labelledby) and ensure custom close controls have a clear accessible name. Do not rely on color alone to communicate severity.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Short title displayed on the first line of the alert.',
      },
      {
        name: 'description',
        type: 'string',
        default: 'undefined',
        description: 'Supporting text displayed below the label.',
      },
      {
        name: 'icon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Icon configuration displayed at the start when the icon slot is not used.',
      },
      {
        name: 'closeButton',
        type: 'ButtonConfig',
        typeLink: '/components/button#button-config',
        default: 'undefined',
        description:
          'Configuration for the default close button. Only shown when closable is true.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'",
        default: "'soft'",
        description: 'Visual style applied to the alert.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'primary'",
        description: 'Severity used to choose the alert colors.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS color applied to the alert style.',
      },
      {
        name: 'closable',
        type: 'boolean',
        default: 'false',
        description: 'Shows the default close button or the close slot.',
      },
      {
        name: 'decorative',
        type: 'boolean',
        default: 'false',
        description: 'Uses role="none" instead of role="alert" for purely visual content.',
      },
      {
        name: 'ui',
        type: `{
  label?: () => HTMLAttributes
  description?: () => HTMLAttributes
  closeButtonContainer?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description:
          'Resolver object for customizing the attributes and classes of label, description, and closeButtonContainer.',
      },
    ],
    emits: [
      {
        name: 'close',
        type: '[]',
        description: 'Emitted when the alert is closed using the button or the close slot.',
      },
    ],
    slots: [
      {
        name: 'icon',
        type: '-',
        description: 'Content displayed at the start; overrides the icon fallback.',
      },
      {
        name: 'label',
        type: '-',
        description: 'Title content; overrides the label fallback.',
      },
      {
        name: 'description',
        type: '-',
        description: 'Description content; overrides the description fallback.',
      },
      {
        name: 'close',
        type: '{ close: () => void }',
        description:
          'Close control content. Receives the close function to dismiss the alert and emit close.',
      },
    ],
    expose: [],
  },
}

export default alertConfig
