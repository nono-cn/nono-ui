import type { ComponentDocConfig } from '../component-docs'
import { buttonSizes, buttonVariantNames } from '@/components/ui/Button'
import ButtonColorExample from '../../components/examples/button/ButtonColorExample.vue'
import ButtonIconExample from '../../components/examples/button/ButtonIconExample.vue'
import ButtonDisabledExample from '../../components/examples/button/ButtonDisabledExample.vue'
import ButtonLoadingExample from '../../components/examples/button/ButtonLoadingExample.vue'
import ButtonClassExample from '../../components/examples/button/ButtonClassExample.vue'
import ButtonSquareExample from '../../components/examples/button/ButtonSquareExample.vue'
import ButtonRadiusExample from '../../components/examples/button/ButtonRadiusExample.vue'
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
      description: 'Choose the button’s visual style.',
      component: ButtonVariantsExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme token or custom hexadecimal color and visual style.',
      component: ButtonColorExample,
    },
    {
      title: 'Size',
      description: 'Choose the button’s visual size.',
      component: ButtonSizeExample,
    },
    {
      title: 'Class',
      description: 'Apply Tailwind classes to customize the button radius and shadow.',
      component: ButtonClassExample,
    },
    {
      title: 'Square',
      description: 'Give an icon button equal width and height at each size.',
      component: ButtonSquareExample,
    },
    {
      title: 'Radius',
      description: 'Choose a Tailwind radius token, CSS value, or number of pixels.',
      component: ButtonRadiusExample,
    },
    {
      title: 'Loading',
      description: 'Toggle the button’s busy state.',
      component: ButtonLoadingExample,
    },
    {
      title: 'Disabled',
      description: 'Toggle whether the button accepts interaction.',
      component: ButtonDisabledExample,
    },
    {
      title: 'Icon',
      description: 'Choose the icon displayed before the button’s content.',
      component: ButtonIconExample,
    },
    {
      title: 'Trailing icon',
      description: 'Choose the icon displayed after the button’s content.',
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
        type: buttonVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: "'solid'",
        description: 'Visual style applied to the button.',
      },
      {
        name: 'size',
        type: buttonSizes.map((size) => `'${size}'`).join(' | '),
        default: "'md'",
        description: 'Visual size of the button.',
      },
      {
        name: 'square',
        type: 'boolean',
        default: 'false',
        description: 'Sets equal width and height based on size and removes padding.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: "'md'",
        description:
          'Tailwind radius token, CSS border-radius value, or a number of pixels. Combine full with square for a circular button.',
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
        default: "'primary'",
        description:
          'Theme token name such as primary, neutral or secondary, or a CSS color such as #6366f1. Named colors use --<name> and --<name>-foreground, with primary as fallback. Hexadecimal colors use a computed foreground.',
      },
      {
        name: 'icon',
        type: 'IconName',
        default: 'undefined',
        description: 'Name of the leading icon shown when the leading slot is not provided.',
      },
      {
        name: 'trailingIcon',
        type: 'IconName',
        default: 'undefined',
        description: 'Name of the trailing icon shown when the trailing slot is not provided.',
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
