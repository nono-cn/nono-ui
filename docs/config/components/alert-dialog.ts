import type { ComponentDocConfig } from '../component-docs'
import { alertDialogCancelButtonDefaults, alertDialogDefaults } from '@/components/ui/AlertDialog'
import AlertDialogBasicExample from '../../components/examples/alert-dialog/AlertDialogBasicExample.vue'
import AlertDialogTitleExample from '../../components/examples/alert-dialog/AlertDialogTitleExample.vue'
import AlertDialogDescriptionExample from '../../components/examples/alert-dialog/AlertDialogDescriptionExample.vue'
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
      title: 'Title',
      description: 'Customize the title shown in the confirmation dialog.',
      component: AlertDialogTitleExample,
    },
    {
      title: 'Description',
      description: 'Customize the title and supporting description.',
      component: AlertDialogDescriptionExample,
    },
    {
      title: 'Icon',
      description: 'Choose an icon to reinforce the context of the action.',
      component: AlertDialogIconExample,
    },
    {
      title: 'Custom Actions',
      description: 'Customize the labels and appearance of the dialog actions.',
      component: AlertDialogActionsExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Use AlertDialog for actions that need an explicit decision. While it is open, the rest of the page is hidden from assistive technology and cannot be clicked.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['aria-haspopup="dialog"', 'Trigger', 'Announces that the trigger opens a dialog.'],
          ['aria-expanded', 'Trigger', 'true while the dialog is open.'],
          ['aria-controls', 'Trigger', 'Id of the dialog content.'],
          [
            'role="alertdialog"',
            'Content',
            'Announces the content as a dialog that needs a response.',
          ],
          [
            'aria-labelledby',
            'Content',
            'Id of the h2 that renders label, so the dialog is named by it.',
          ],
          ['aria-describedby', 'Content', 'Id of the paragraph that renders description.'],
          ['aria-hidden="true"', 'Rest of the page', 'Set while the dialog is open.'],
        ],
      },
    },
    {
      title: 'Focus and keyboard',
      description:
        'When the dialog opens, focus moves to the cancel button, so the safe choice is the default. Focus stays inside the dialog until it closes, and then returns to the trigger. Clicking outside does not close it.',
      table: {
        columns: ['Key', 'Action'],
        rows: [
          ['Tab', 'Moves focus to the next focusable element inside the dialog.'],
          ['Shift + Tab', 'Moves focus to the previous focusable element inside the dialog.'],
          ['Space, Enter', 'Activates the focused button.'],
          ['Escape', 'Closes the dialog, like the cancel button.'],
        ],
      },
    },
    {
      title: 'Custom content',
      description:
        'When you replace the label or description with slots, keep the text inside them so the dialog stays named and described. Custom actions need a visible or accessible name, and decorative icons need aria-hidden="true".',
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
        default: String(alertDialogDefaults.label),
        description: 'Dialog title and primary accessible name when the label slot is not used.',
      },
      {
        name: 'description',
        type: 'string',
        default: String(alertDialogDefaults.description),
        description: 'Supporting text displayed below the label.',
      },
      {
        name: 'icon',
        type: 'IconName',
        default: String(alertDialogDefaults.icon),
        description: 'Name of the icon displayed before the label.',
      },
      {
        name: 'actionButton',
        type: 'ButtonConfig',
        typeLink: '/components/button#button-config',
        default: String(alertDialogDefaults.actionButton),
        description:
          'Configuration for the default action Button. Its label comes from i18n; provided values override the fallback.',
      },
      {
        name: 'cancelButton',
        type: 'ButtonConfig',
        typeLink: '/components/button#button-config',
        default: String(alertDialogDefaults.cancelButton),
        description: `Configuration for the default cancel Button. Uses the ${alertDialogCancelButtonDefaults.variant} variant, ${alertDialogCancelButtonDefaults.color} color, and the i18n-provided label by default.`,
      },
      {
        name: 'unmountOnHide',
        type: 'boolean',
        default: String(alertDialogDefaults.unmountOnHide),
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
        default: String(alertDialogDefaults.disableOutsidePointerEvents),
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
        default: String(alertDialogDefaults.ui),
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
