import type { ComponentDocConfig } from '../component-docs'
import { dialogDefaults } from '@/components/ui/Dialog'
import DialogBasicExample from '../../components/examples/dialog/DialogBasicExample.vue'
import DialogContentExample from '../../components/examples/dialog/DialogContentExample.vue'
import DialogControlledExample from '../../components/examples/dialog/DialogControlledExample.vue'

const dialogConfig: ComponentDocConfig = {
  slug: 'dialog',
  title: 'Dialog',
  language: 'en',
  description: 'Displays content in a modal or non-modal layer above the page.',
  importPath: '@nono-ui/components/ui/Dialog',
  usage: [
    {
      title: 'Basic dialog',
      description: 'Open a dialog with a title, description, and body content.',
      component: DialogBasicExample,
    },
  ],
  examples: [
    {
      title: 'Content configuration',
      description: 'Pass DialogContent props, event callbacks, and attributes through content.',
      component: DialogContentExample,
    },
    {
      title: 'Controlled state',
      description: 'Control the open state from the parent component.',
      component: DialogControlledExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Provide a label and a description so assistive technology can identify the dialog and its purpose.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['aria-haspopup="dialog"', 'Trigger', 'Announces that the trigger opens a dialog.'],
          ['aria-expanded', 'Trigger', 'true while the dialog is open.'],
          ['aria-controls', 'Trigger', 'Id of the dialog content.'],
          ['role="dialog"', 'Content', 'Announces the content as a dialog.'],
          [
            'aria-labelledby',
            'Content',
            'Id of the h2 that renders label, so the dialog is named by it.',
          ],
          ['aria-describedby', 'Content', 'Id of the paragraph that renders description.'],
          [
            'aria-label',
            'Close button',
            '"Close" in the current locale, unless ui sets another one.',
          ],
          ['aria-hidden="true"', 'Rest of the page', 'Set while a modal dialog is open.'],
        ],
      },
    },
    {
      title: 'Focus and keyboard',
      description:
        'When the dialog opens, focus moves inside it, and when it closes focus returns to the trigger. A modal dialog keeps focus inside and blocks the page behind it; with modal set to false, focus can leave and the page stays usable.',
      table: {
        columns: ['Key', 'Action'],
        rows: [
          [
            'Tab',
            'Moves focus to the next focusable element. In a modal dialog it wraps inside the dialog.',
          ],
          ['Shift + Tab', 'Moves focus to the previous focusable element.'],
          ['Escape', 'Closes the dialog, unless block is true.'],
        ],
      },
    },
    {
      title: 'Blocked dialogs',
      description:
        'With block set to true, Escape, clicking outside, and the close function do nothing, and the close button is hidden. Always offer an action inside the dialog that resolves it, so keyboard users are not trapped.',
    },
  ],
  api: {
    props: [
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        description: 'Controls whether the dialog is open. Use with v-model:open.',
      },
      {
        name: 'modal',
        type: 'boolean',
        default: String(dialogDefaults.modal),
        description: 'Prevents interaction with the page behind the dialog while it is open.',
      },
      {
        name: 'unmountOnHide',
        type: 'boolean',
        default: String(dialogDefaults.unmountOnHide),
        description: 'Unmounts dialog content when closed; false keeps it mounted and hidden.',
      },
      {
        name: 'content',
        type: 'DialogContentConfig',
        typeLink: '#dialog-content-config',
        default: 'undefined',
        description: 'Grouped DialogContent props, event callbacks, and HTML attributes.',
      },
      {
        name: 'block',
        type: 'boolean',
        default: String(dialogDefaults.block),
        description: 'Prevents closing through the close button and the close function in slots.',
      },
      {
        name: 'label',
        type: 'string',
        default: String(dialogDefaults.label),
        description: 'Visible dialog title and accessible name when the label slot is not used.',
      },
      {
        name: 'description',
        type: 'string',
        default: String(dialogDefaults.description),
        description: 'Supporting text associated with the dialog.',
      },
      {
        name: 'icon',
        type: 'IconName',
        default: String(dialogDefaults.icon),
        description: 'Icon rendered before the title.',
      },
      {
        name: 'closeIcon',
        type: 'IconName',
        default: "'x'",
        description: 'Icon rendered in the close button.',
      },
      {
        name: 'showCloseButton',
        type: 'boolean',
        default: String(dialogDefaults.showCloseButton),
        description: 'Displays the close button in the dialog content.',
      },
      {
        name: 'ui',
        type: `{
  overlay?: (context: DialogContext) => HTMLAttributes
  content?: (context: DialogContext) => HTMLAttributes
  header?: (context: DialogContext) => HTMLAttributes
  label?: (context: DialogContext) => HTMLAttributes
  description?: (context: DialogContext) => HTMLAttributes
  body?: (context: DialogContext) => HTMLAttributes
  footer?: (context: DialogContext) => HTMLAttributes
  close?: (context: DialogContext) => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          { text: '{\n  overlay?: (context: ' },
          { text: 'DialogContext', link: '#dialog-context' },
          { text: ') => HTMLAttributes\n  content?: (context: ' },
          { text: 'DialogContext', link: '#dialog-context' },
          { text: ') => HTMLAttributes\n  header?: (context: ' },
          { text: 'DialogContext', link: '#dialog-context' },
          { text: ') => HTMLAttributes\n  label?: (context: ' },
          { text: 'DialogContext', link: '#dialog-context' },
          { text: ') => HTMLAttributes\n  description?: (context: ' },
          { text: 'DialogContext', link: '#dialog-context' },
          { text: ') => HTMLAttributes\n  body?: (context: ' },
          { text: 'DialogContext', link: '#dialog-context' },
          { text: ') => HTMLAttributes\n  footer?: (context: ' },
          { text: 'DialogContext', link: '#dialog-context' },
          { text: ') => HTMLAttributes\n  close?: (context: ' },
          { text: 'DialogContext', link: '#dialog-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        default: String(dialogDefaults.ui),
        description:
          'Resolvers for attributes and classes on internal parts. Each receives DialogContext.',
      },
    ],
    configs: [
      {
        id: 'dialog-content-config',
        title: 'DialogContentConfig',
        description:
          'Combines the listed Reka UI content props and event callbacks with HTML attributes such as id, class, style, and ARIA attributes.',
        rows: [
          {
            name: 'forceMount',
            type: 'boolean',
            default: 'undefined',
            description: 'Keeps the content mounted for custom presence and animation handling.',
          },
          {
            name: 'disableOutsidePointerEvents',
            type: 'boolean',
            default: 'modal',
            description:
              'Defaults to the modal value; set it explicitly to override that behavior.',
          },
          {
            name: 'onOpenAutoFocus',
            type: '(event: Event) => void',
            default: 'undefined',
            description: 'Handles the event fired when focus moves into the dialog.',
          },
          {
            name: 'onCloseAutoFocus',
            type: '(event: Event) => void',
            default: 'undefined',
            description: 'Handles the event fired when focus returns after closing.',
          },
          {
            name: 'onEscapeKeyDown',
            type: '(event: KeyboardEvent) => void',
            default: 'undefined',
            description: 'Handles Escape before the dialog dismisses.',
          },
          {
            name: 'onPointerDownOutside',
            type: '(event: PointerDownOutsideEvent) => void',
            default: 'undefined',
            description: 'Handles a pointer interaction outside the content.',
          },
          {
            name: 'onFocusOutside',
            type: '(event: FocusOutsideEvent) => void',
            default: 'undefined',
            description: 'Handles focus moving outside the content.',
          },
          {
            name: 'onInteractOutside',
            type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void',
            default: 'undefined',
            description: 'Handles pointer or focus interaction outside the content.',
          },
        ],
      },
      {
        id: 'dialog-context',
        title: 'DialogContext',
        typeLabel: 'slotProps',
        showDefault: false,
        rows: [
          { name: 'open', type: 'boolean', description: 'Indicates whether the dialog is open.' },
          {
            name: 'close',
            type: '() => void',
            description: 'Closes the dialog unless block is true.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:open',
        type: '[value: boolean]',
        description: 'Emitted when the open state changes.',
      },
      { name: 'show', type: '[]', description: 'Emitted when the dialog opens.' },
      { name: 'close', type: '[]', description: 'Emitted when the dialog closes.' },
    ],
    slots: [
      {
        name: 'default',
        type: 'DialogContext',
        typeLink: '#dialog-context',
        description: 'Trigger content. Receives open and close.',
      },
      {
        name: 'content',
        type: 'DialogContext',
        typeLink: '#dialog-context',
        description: 'Scrollable body content. Receives open and close.',
      },
      {
        name: 'header',
        type: 'DialogContext',
        typeLink: '#dialog-context',
        description: 'Replaces the entire header, including the title and description.',
      },
      {
        name: 'label',
        type: 'DialogContext',
        typeLink: '#dialog-context',
        description: 'Replaces the title text while retaining DialogTitle semantics.',
      },
      {
        name: 'description',
        type: 'DialogContext',
        typeLink: '#dialog-context',
        description: 'Replaces the supporting text while retaining DialogDescription semantics.',
      },
      {
        name: 'footer',
        type: 'DialogContext',
        typeLink: '#dialog-context',
        description: 'Optional footer actions. Receives close to dismiss the dialog.',
      },
      {
        name: 'close',
        type: 'DialogContext',
        typeLink: '#dialog-context',
        description: 'Replaces the close button when showCloseButton is true and block is false.',
      },
      {
        name: 'closeIcon',
        type: 'DialogContext',
        typeLink: '#dialog-context',
        description: 'Replaces the icon inside the default close button.',
      },
    ],
    expose: [],
  },
}

export default dialogConfig
