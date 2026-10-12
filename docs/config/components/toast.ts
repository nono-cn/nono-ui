import type { ComponentDocConfig } from '../component-docs'
import { toastDefaults } from '@/components/ui/Toast'
import { toastProviderDefaults } from '@/components/provider'
import ToastBasicExample from '../../components/examples/toast/ToastBasicExample.vue'
import ToastColorExample from '../../components/examples/toast/ToastColorExample.vue'
import ToastDescriptionSlotExample from '../../components/examples/toast/ToastDescriptionSlotExample.vue'
import ToastLabelSlotExample from '../../components/examples/toast/ToastLabelSlotExample.vue'
import ToastOptionsExample from '../../components/examples/toast/ToastOptionsExample.vue'
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
        id: 'toast-provider-options',
        title: 'ConfigProvider toast options',
        description: 'Pass these options to the toast prop of ConfigProvider.',
        rows: [
          {
            name: 'disableSwipe',
            type: 'boolean',
            default: String(toastProviderDefaults.disableSwipe),
            description: 'Disables swipe gestures.',
          },
          {
            name: 'duration',
            type: 'number',
            default: String(toastProviderDefaults.duration),
            description: 'Default duration in milliseconds.',
          },
          {
            name: 'label',
            type: 'string',
            default: String(toastProviderDefaults.label),
            description: 'Localized announcement label.',
          },
          {
            name: 'limit',
            type: 'number',
            default: 'undefined',
            description: 'Maximum visible toasts; older ones become inert.',
          },
          {
            name: 'swipeDirection',
            type: "'right' | 'left' | 'down' | 'up'",
            default: `'${toastProviderDefaults.swipeDirection}'`,
            description: 'Swipe direction that closes a toast.',
          },
          {
            name: 'swipeThreshold',
            type: 'number',
            default: String(toastProviderDefaults.swipeThreshold),
            description: 'Minimum closing swipe distance in pixels.',
          },
          {
            name: 'toastManager',
            type: 'GlobalToastManager<any>',
            default: 'undefined',
            description: 'Global manager created with createToastManager().',
          },
        ],
      },
      {
        id: 'toast-viewport-options',
        title: 'ConfigProvider toastViewport options',
        description:
          'Pass these options to the toastViewport prop of ConfigProvider. ConfigProvider renders one viewport automatically.',
        rows: [
          {
            name: 'hotkey',
            type: 'string[]',
            default: "['F8']",
            description: 'Keyboard shortcut that focuses the viewport.',
          },
          {
            name: 'label',
            type: 'string | ((hotkey: string) => string)',
            default: "'Notifications ({hotkey})'",
            description: 'Accessible landmark label; {hotkey} is replaced with the shortcut.',
          },
          {
            name: 'class',
            type: "HTMLAttributes['class']",
            default: "'fixed right-4 bottom-4 z-50 w-80'",
            description: 'Classes used to position and style the viewport.',
          },
          {
            name: 'style',
            type: "HTMLAttributes['style']",
            default: 'undefined',
            description: 'Inline styles applied to the viewport.',
          },
        ],
      },
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
