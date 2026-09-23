import type { ComponentDocConfig } from '../component-docs'
import AlertDialogBasicExample from '../../components/examples/alert-dialog/AlertDialogBasicExample.vue'
import AlertDialogIconExample from '../../components/examples/alert-dialog/AlertDialogIconExample.vue'
import AlertDialogActionsExample from '../../components/examples/alert-dialog/AlertDialogActionsExample.vue'

const alertDialogConfig: ComponentDocConfig = {
  slug: 'alert-dialog',
  title: 'AlertDialog',
  language: 'en',
  description: 'Prompts the user to explicitly confirm before performing an important action.',
  importPath: '@nono-ui/components/ui/AlertDialog',
  usage: [
    {
      title: 'Basic confirmation',
      description: 'Request confirmation before deleting an item.',
      component: AlertDialogBasicExample,
    },
  ],
  examples: [
    {
      title: 'Icon',
      description: 'Add an icon to reinforce the context of the action.',
      component: AlertDialogIconExample,
    },
    {
      title: 'Custom actions',
      description: 'Configure the action and cancel buttons with props.',
      component: AlertDialogActionsExample,
    },
  ],
  accessibility: [
    {
      title: 'Confirmation and focus',
      description:
        'Use AlertDialog for actions that require an explicit decision. It is modal, blocks outside interaction by default, manages focus, and can be dismissed with Escape. Always provide a descriptive label and a clear cancel action.',
      links: [
        {
          label: 'See the Reka UI Alert Dialog accessibility guide',
          href: 'https://www.reka-ui.com/docs/components/alert-dialog#accessibility',
        },
      ],
    },
    {
      title: 'Names and actions',
      description:
        'When using custom header, label, or description content, keep AlertDialogTitle and AlertDialogDescription to preserve the dialog’s semantic relationships. Decorative icons should use aria-hidden="true", and custom actions should retain clear visible or accessible names (aria-label / aria-labelledby). Arbitrary attributes, class, style, and ARIA passed to the component are applied to its local root.',
    },
  ],
  api: {
    props: [
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        description: 'Controls whether the alert dialog is open. Use with v-model:open.',
      },
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Dialog title and primary accessible name when the label slot is not used.',
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
        description: 'Icon displayed before the label when its configuration includes name.',
      },
      {
        name: 'actionButton',
        type: 'ButtonConfig',
        typeLink: '/components/button#button-config',
        default: 'undefined',
        description:
          'Configuration for the default action Button. Its label comes from i18n; provided values override the fallback.',
      },
      {
        name: 'cancelButton',
        type: 'ButtonConfig',
        typeLink: '/components/button#button-config',
        default: 'undefined',
        description:
          'Configuration for the default cancel Button. Uses the outline variant, secondary severity, and the i18n-provided label by default.',
      },
      {
        name: 'unmountOnHide',
        type: 'boolean',
        default: 'true',
        description:
          'Unmounts the content when the dialog is closed; when false, keeps it mounted and hidden.',
      },
      {
        name: 'forceMount',
        type: 'boolean',
        default: 'undefined',
        description:
          'Forces the content to mount for greater control over its presence and animations.',
      },
      {
        name: 'disableOutsidePointerEvents',
        type: 'boolean',
        default: 'true',
        description: 'Blocks pointer events outside the content while the dialog is open.',
      },
      {
        name: 'ui',
        type: `{
  trigger?: () => HTMLAttributes
  overlay?: () => HTMLAttributes
  content?: () => HTMLAttributes
  header?: () => HTMLAttributes
  label?: () => HTMLAttributes
  description?: () => HTMLAttributes
  body?: () => HTMLAttributes
  footer?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description: 'Resolvers for customizing the attributes and classes of internal parts.',
      },
    ],
    emits: [
      {
        name: 'update:open',
        type: '[value: boolean]',
        description: 'Emitted when the open state changes.',
      },
      {
        name: 'action',
        type: '[event: PointerEvent]',
        description: 'Emitted when the default action or action slot is activated.',
      },
      {
        name: 'cancel',
        type: '[event: PointerEvent]',
        description: 'Emitted when the default cancel button or cancel slot is activated.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Trigger content that opens the alert dialog.',
      },
      {
        name: 'content',
        type: '-',
        description: 'Additional content rendered in the dialog’s scrollable body.',
      },
      {
        name: 'header',
        type: '-',
        description: 'Replaces the entire header, including label and description.',
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
        name: 'footer',
        type: '{ close: () => void }',
        description: 'Replaces the entire footer. Receives close to dismiss the dialog.',
      },
      {
        name: 'action',
        type: '{ close: () => void }',
        description: 'Replaces the action button. Receives close to dismiss the dialog.',
      },
      {
        name: 'cancel',
        type: '{ close: () => void }',
        description: 'Replaces the cancel button. Receives close to dismiss the dialog.',
      },
    ],
    expose: [
      {
        name: 'close',
        type: '() => void',
        description: 'Closes the alert dialog using the component’s exposed API.',
      },
    ],
  },
}

export default alertDialogConfig
