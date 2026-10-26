import type { ComponentDocConfig } from '../component-docs'
import {
  separatorDefaults,
  separatorPositions,
  separatorSizes,
  separatorTypes,
} from '@/components/ui/Separator'
import SeparatorBasicExample from '../../components/examples/separator/SeparatorBasicExample.vue'
import SeparatorOrientationExample from '../../components/examples/separator/SeparatorOrientationExample.vue'
import SeparatorTypeExample from '../../components/examples/separator/SeparatorTypeExample.vue'
import SeparatorSizeExample from '../../components/examples/separator/SeparatorSizeExample.vue'
import SeparatorColorExample from '../../components/examples/separator/SeparatorColorExample.vue'
import SeparatorLabelExample from '../../components/examples/separator/SeparatorLabelExample.vue'
import SeparatorPositionExample from '../../components/examples/separator/SeparatorPositionExample.vue'
import SeparatorDecorativeExample from '../../components/examples/separator/SeparatorDecorativeExample.vue'
import SeparatorSlotExample from '../../components/examples/separator/SeparatorSlotExample.vue'

const separatorConfig: ComponentDocConfig = {
  slug: 'separator',
  title: 'Separator',
  language: 'en',
  description: 'Visually or semantically separates groups of content.',
  importPath: '@nono-ui/components/ui/Separator',
  usage: [
    {
      title: 'Basic usage',
      description: 'Separate two groups of content with a horizontal line.',
      component: SeparatorBasicExample,
    },
  ],
  examples: [
    {
      title: 'Color',
      description: 'Choose a theme token or custom CSS color.',
      component: SeparatorColorExample,
    },
    {
      title: 'Type',
      description: 'Choose a solid, dashed, or dotted line.',
      component: SeparatorTypeExample,
    },
    {
      title: 'Size',
      description: 'Adjust the separator thickness.',
      component: SeparatorSizeExample,
    },
    {
      title: 'Orientation',
      description: 'Choose a horizontal or vertical separator.',
      component: SeparatorOrientationExample,
    },
    {
      title: 'Label',
      description: 'Place a label over the separator line. The default slot replaces it.',
      component: SeparatorLabelExample,
    },
    {
      title: 'Position',
      description: 'Align the label or default slot content left, center, or right.',
      component: SeparatorPositionExample,
    },
    {
      title: 'Decorative',
      description: 'Expose a meaningful divider to assistive technology when decorative is false.',
      component: SeparatorDecorativeExample,
    },
    {
      title: 'Default slot',
      description: 'Place custom content inside the separator.',
      component: SeparatorSlotExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'By default the separator is decorative and hidden from assistive technology. Set decorative to false only when the division between sections carries meaning.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="none"', 'Root', 'Used while decorative is true, so the separator is ignored.'],
          ['role="separator"', 'Root', 'Used when decorative is false.'],
          [
            'aria-orientation="vertical"',
            'Root',
            'Set on a semantic separator when orientation is vertical.',
          ],
        ],
      },
    },
    {
      title: 'Labels',
      description:
        'A separator with role="separator" is announced as a single element, so screen readers may skip a label inside it. If the label matters, such as "Or" between two options, repeat it in the content around the separator.',
    },
  ],
  api: {
    props: [
      {
        name: 'color',
        type: 'string',
        default: `'${separatorDefaults.color}'`,
        description:
          'Theme token or CSS color of the separator line. Neutral uses the border color.',
      },
      {
        name: 'type',
        type: separatorTypes.map((value) => `'${value}'`).join(' | '),
        default: `'${separatorDefaults.type}'`,
        description: 'Visual style of the separator line.',
      },
      {
        name: 'size',
        type: separatorSizes.map((value) => `'${value}'`).join(' | '),
        default: `'${separatorDefaults.size}'`,
        description: 'Thickness of the separator line.',
      },
      {
        name: 'label',
        type: 'string',
        default: '-',
        description: 'Content displayed on the line when the default slot is not provided.',
      },
      {
        name: 'position',
        type: separatorPositions.map((value) => `'${value}'`).join(' | '),
        default: `'${separatorDefaults.position}'`,
        description: 'Alignment of the label or default slot content.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: `'${separatorDefaults.orientation}'`,
        description: 'Direction of the separator line.',
      },
      {
        name: 'decorative',
        type: 'boolean',
        default: String(separatorDefaults.decorative),
        description: 'Uses a presentational role when true; uses the separator role when false.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Optional content rendered over the line in place of the label.',
      },
    ],
    expose: [],
  },
}

export default separatorConfig
