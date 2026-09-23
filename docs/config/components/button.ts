import type { ComponentDocConfig } from '../component-docs'
import ButtonColorExample from '../../components/examples/button/ButtonColorExample.vue'
import ButtonIconExample from '../../components/examples/button/ButtonIconExample.vue'
import ButtonDisabledExample from '../../components/examples/button/ButtonDisabledExample.vue'
import ButtonLoadingExample from '../../components/examples/button/ButtonLoadingExample.vue'
import ButtonRaisedExample from '../../components/examples/button/ButtonRaisedExample.vue'
import ButtonRoundedExample from '../../components/examples/button/ButtonRoundedExample.vue'
import ButtonSeverityExample from '../../components/examples/button/ButtonSeverityExample.vue'
import ButtonSquareExample from '../../components/examples/button/ButtonSquareExample.vue'
import ButtonSizeExample from '../../components/examples/button/ButtonSizeExample.vue'
import ButtonTrailingIconExample from '../../components/examples/button/ButtonTrailingIconExample.vue'
import ButtonUsageExample from '../../components/examples/button/ButtonUsageExample.vue'
import ButtonVariantsExample from '../../components/examples/button/ButtonVariantsExample.vue'

const buttonConfig: ComponentDocConfig = {
  slug: 'button',
  title: 'Button',
  language: 'en',
  description: 'Interactive action with configurable variants, states, icons, and root elements.',
  importPath: '@nono-ui/components/ui/Button',
  usage: [
    {
      title: 'Basic usage',
      description: 'Start with a button using the default configuration.',
      component: ButtonUsageExample,
    },
  ],
  examples: [
    {
      title: 'Variant',
      description: 'Compare the button’s visual variants using the same severity.',
      component: ButtonVariantsExample,
    },
    {
      title: 'Severity',
      description: 'Compare button severity levels using the same visual variant.',
      component: ButtonSeverityExample,
    },
    {
      title: 'Size',
      description: 'Adjust the button’s visual size.',
      component: ButtonSizeExample,
    },
    {
      title: 'Rounded',
      description: 'Apply a fully rounded shape to the button.',
      component: ButtonRoundedExample,
    },
    {
      title: 'Square',
      description: 'Set equal width and height to create square buttons.',
      component: ButtonSquareExample,
    },
    {
      title: 'Raised',
      description: 'Add a subtle shadow to create visual elevation.',
      component: ButtonRaisedExample,
    },
    {
      title: 'Loading',
      description: 'Show the action’s loading state.',
      component: ButtonLoadingExample,
    },
    {
      title: 'Disabled',
      description: 'Prevent interaction with the button.',
      component: ButtonDisabledExample,
    },
    {
      title: 'Color',
      description: 'Apply a custom CSS color to the button.',
      component: ButtonColorExample,
    },
    {
      title: 'Icon',
      description: 'Add a leading icon to the button.',
      component: ButtonIconExample,
    },
    {
      title: 'Trailing icon',
      description: 'Add a trailing icon to the button.',
      component: ButtonTrailingIconExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible actions',
      description:
        'Give icon-only buttons a clear accessible name (aria-label / aria-labelledby) and preserve aria-busy and aria-disabled while loading. HTML and ARIA attributes, class, and style are forwarded to the root element. Do not rely on color or the icon alone to communicate an action.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Text displayed when no content is provided in the default slot.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft' | 'link'",
        default: "'solid'",
        description: 'Visual style applied to the button.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'primary'",
        description: 'Severity used to choose the button colors.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Visual size of the button.',
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        description: 'Applies a fully rounded shape.',
      },
      {
        name: 'square',
        type: 'boolean',
        default: 'false',
        description:
          'Sets equal width and height to create a square button, typically with an icon.',
      },
      {
        name: 'raised',
        type: 'boolean',
        default: 'false',
        description: 'Adds a subtle shadow to visually raise the button.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description:
          'Displays the default loading icon or the loading slot, and adds aria-busy and aria-disabled.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS color applied to the button style.',
      },
      {
        name: 'icon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Configuration for the leading icon when the leading slot is not provided.',
      },
      {
        name: 'trailingIcon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Configuration for the trailing icon when the trailing slot is not provided.',
      },
      {
        name: 'as',
        type: 'AsTag | Component',
        default: "'button'",
        description: 'Element or component rendered as the root, such as button or a.',
      },
      {
        name: 'asChild',
        type: 'boolean',
        default: 'false',
        description: 'Applies the props and behavior to the element provided in the default slot.',
      },
    ],
    configs: [
      {
        id: 'button-config',
        title: 'ButtonConfig',
        description:
          'Reusable type for Button configurations in other components. Combines ButtonProps, the onClick listener derived from ButtonEmits, and HTMLAttributes.',
        showDefault: false,
        rows: [
          {
            name: 'ButtonProps',
            type: 'ButtonProps',
            typeLink: '#props',
            description: 'Includes Button’s public props.',
          },
          {
            name: 'EmitsAsProps<ButtonEmits>',
            type: 'EmitsAsProps<ButtonEmits>',
            typeLink: '#emits',
            description:
              'Exposes the click event as the onClick property in nested configurations.',
          },
          {
            name: 'HTMLAttributes',
            type: 'HTMLAttributes',
            description:
              'Includes HTML and ARIA attributes, class, style, and native event listeners.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'click',
        type: '[event: PointerEvent]',
        description: 'Emitted when the button is clicked while it is not loading or aria-disabled.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Main button content; overrides the label fallback.',
      },
      {
        name: 'leading',
        type: '-',
        description: 'Content displayed before the label; overrides the icon fallback.',
      },
      {
        name: 'loading',
        type: '-',
        description: 'Content displayed while loading is true; overrides the default spinner.',
      },
      {
        name: 'trailing',
        type: '-',
        description: 'Content displayed after the label; overrides the trailingIcon fallback.',
      },
    ],
    expose: [],
  },
}

export default buttonConfig
