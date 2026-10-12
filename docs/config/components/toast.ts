import type { ComponentDocConfig } from '../component-docs'
import { toastDefaults } from '@/components/ui/Toast'
import ToastBasicExample from '../../components/examples/toast/ToastBasicExample.vue'
import ToastColorExample from '../../components/examples/toast/ToastColorExample.vue'
import ToastDescriptionSlotExample from '../../components/examples/toast/ToastDescriptionSlotExample.vue'
import ToastLabelSlotExample from '../../components/examples/toast/ToastLabelSlotExample.vue'
import ToastOptionsExample from '../../components/examples/toast/ToastOptionsExample.vue'
import ToastPositionExample from '../../components/examples/toast/ToastPositionExample.vue'
import ToastVariantExample from '../../components/examples/toast/ToastVariantExample.vue'

const toastConfig: ComponentDocConfig = {
  slug: 'toast',
  title: 'Toast',
  language: 'en',
  description: 'Display an individual notification inside the provider supplied by ConfigProvider.',
  importPath: '@nono-ui/components/ui/Toast',
  usage: [
    {
      title: 'Basic usage',
      description: 'Place Toast inside ConfigProvider; it supplies a shared viewport.',
      component: ToastBasicExample,
    },
  ],
  examples: [
    {
      title: 'Position',
      description: 'Choose where an individual notification appears.',
      component: ToastPositionExample,
    },
    {
      title: 'Variant',
      description: 'Choose the visual style of the notification.',
      component: ToastVariantExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme color or a custom color for the notification.',
      component: ToastColorExample,
    },
    {
      title: 'Description slot',
      description: 'Replace the description prop with custom message content.',
      component: ToastDescriptionSlotExample,
    },
    {
      title: 'Label slot',
      description: 'Replace the label prop with custom title content.',
      component: ToastLabelSlotExample,
    },
    {
      title: 'Provider options',
      description: 'Configure the shared ToastProvider through ConfigProvider.',
      component: ToastOptionsExample,
    },
  ],
  accessibility: [
    {
      title: 'Announcements and dismissal',
      description:
        'Set a localized provider label, give close controls an accessible name and make the viewport hotkey discoverable to keyboard users.',
      links: [
        {
          label: 'Read the Reka UI Toast guide',
          href: 'https://reka-ui.com/docs/components/toast#root',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'color',
        type: 'string',
        default: `'${toastDefaults.color}'`,
        description: 'Theme color token or custom CSS color used by the toast.',
      },
      {
        name: 'duration',
        type: 'number',
        default: 'undefined',
        description: 'Duration in milliseconds for this toast; overrides the provider duration.',
      },
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Text rendered inside ToastTitle when the label slot is absent.',
      },
      {
        name: 'description',
        type: 'string',
        default: 'undefined',
        description:
          'Message rendered inside ToastDescription when the description slot is absent.',
      },
      {
        name: 'forceMount',
        type: 'boolean',
        default: String(toastDefaults.forceMount),
        description: 'Keeps the toast mounted for custom presence animations.',
      },
      {
        name: 'open',
        type: 'boolean',
        default: 'undefined',
        description: 'Controlled open state; supports v-model:open.',
      },
      {
        name: 'position',
        type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
        default: `'${toastDefaults.position}'`,
        description: 'Fixed position of this notification.',
      },
      {
        name: 'toast',
        type: 'ToastObject',
        default: 'undefined',
        description:
          'Managed toast from useToastManager(); supplies its open state, type, duration and content.',
      },
      {
        name: 'type',
        type: "'foreground' | 'background'",
        default: `'${toastDefaults.type}'`,
        description: 'Announcement priority for accessibility.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'",
        default: `'${toastDefaults.variant}'`,
        description: 'Visual style of the notification.',
      },
    ],
    configs: [
      {
        id: 'toast-slot-props',
        title: 'ToastSlotProps',
        typeLabel: 'slotProps',
        showDefault: false,
        rows: [
          { name: 'open', type: 'boolean', description: 'Current open state.' },
          { name: 'remaining', type: 'number', description: 'Time remaining in milliseconds.' },
          {
            name: 'duration',
            type: 'number',
            description: 'Resolved toast duration in milliseconds.',
          },
        ],
      },
    ],
    emits: [
      { name: 'update:open', type: '[value: boolean]', description: 'Open state changed.' },
      { name: 'pause', type: '[]', description: 'Dismiss timer paused.' },
      { name: 'resume', type: '[]', description: 'Dismiss timer resumed.' },
      {
        name: 'escapeKeyDown',
        type: '[event: KeyboardEvent]',
        description: 'Escape key was pressed.',
      },
      { name: 'swipeStart', type: '[event: SwipeEvent]', description: 'Swipe started.' },
      { name: 'swipeMove', type: '[event: SwipeEvent]', description: 'Swipe moved.' },
      { name: 'swipeCancel', type: '[event: SwipeEvent]', description: 'Swipe was cancelled.' },
      { name: 'swipeEnd', type: '[event: SwipeEvent]', description: 'Swipe ended.' },
    ],
    slots: [
      {
        name: 'default',
        type: 'ToastSlotProps',
        typeLink: '#toast-slot-props',
        description: 'Content of this notification.',
      },
      {
        name: 'label',
        type: '—',
        description: 'Custom content inside ToastTitle; replaces the label prop.',
      },
      {
        name: 'description',
        type: '—',
        description: 'Custom content inside ToastDescription; replaces the description prop.',
      },
    ],
    expose: [],
  },
}

export default toastConfig
