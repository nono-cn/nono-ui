import type { ComponentDocConfig } from '../component-docs'
import ColorAreaBasicExample from '../../components/examples/color-area/ColorAreaBasicExample.vue'
import ColorAreaValueExample from '../../components/examples/color-area/ColorAreaValueExample.vue'
import ColorAreaXChannelExample from '../../components/examples/color-area/ColorAreaXChannelExample.vue'

const colorAreaConfig: ComponentDocConfig = {
  slug: 'color-area',
  title: 'ColorArea',
  language: 'en',
  description: 'A two-dimensional control for selecting a color value.',
  importPath: '@nono-ui/components/ui/ColorArea',
  usage: [
    {
      title: 'Basic usage',
      description: 'Render a color area with its default value.',
      component: ColorAreaBasicExample,
    },
  ],
  examples: [
    {
      title: 'Value',
      description: 'Bind the selected color with v-model:value.',
      component: ColorAreaValueExample,
    },
    {
      title: 'Horizontal channel',
      description: 'Compare the HSL channels that can change from left to right.',
      component: ColorAreaXChannelExample,
    },
  ],
  accessibility: [
    {
      title: 'Keyboard interaction',
      description:
        'ColorArea uses the keyboard interaction provided by Reka UI. Additional accessibility guidance will be added as the public API grows.',
    },
  ],
  api: {
    props: [
      {
        name: 'value',
        type: 'string | Color',
        default: "'#ff0000'",
        description: 'Selected color. Can also be bound with v-model:value.',
      },
      {
        name: 'colorSpace',
        type: "'hsl' | 'hsb' | 'rgb'",
        default: "'hsl'",
        description: 'Color space used to calculate and display the selected color.',
      },
      {
        name: 'xChannel',
        type: "'red' | 'green' | 'blue' | 'hue' | 'saturation' | 'lightness' | 'brightness' | 'alpha'",
        default: "'hue'",
        description:
          'Color channel controlled by horizontal movement from its minimum on the left to its maximum on the right.',
      },
    ],
    emits: [
      {
        name: 'update:value',
        type: '[value: string]',
        description: 'Emitted when the selected color changes.',
      },
    ],
    slots: [],
    expose: [],
  },
}

export default colorAreaConfig
