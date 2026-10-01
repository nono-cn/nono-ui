import type { ComponentDocConfig } from '../component-docs'
import {
  colorAreaChannels,
  colorAreaColorSpaces,
  colorAreaDefaults,
  colorAreaSizes,
} from '@/components/ui/ColorArea'
import ColorAreaBasicExample from '../../components/examples/color-area/ColorAreaBasicExample.vue'
import ColorAreaValueExample from '../../components/examples/color-area/ColorAreaValueExample.vue'
import ColorAreaChannelsExample from '../../components/examples/color-area/ColorAreaChannelsExample.vue'
import ColorAreaDisabledExample from '../../components/examples/color-area/ColorAreaDisabledExample.vue'
import ColorAreaNamesExample from '../../components/examples/color-area/ColorAreaNamesExample.vue'
import ColorAreaSizeExample from '../../components/examples/color-area/ColorAreaSizeExample.vue'

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
      title: 'Model value',
      description: 'Bind the selected color with v-model.',
      component: ColorAreaValueExample,
    },
    {
      title: 'Channels',
      description: 'Choose a color space and the channels controlled by each axis.',
      component: ColorAreaChannelsExample,
    },
    {
      title: 'Disabled',
      description: 'Toggle interaction with the color area.',
      component: ColorAreaDisabledExample,
    },
    {
      title: 'Size',
      description: 'Choose the ColorArea dimensions.',
      component: ColorAreaSizeExample,
    },
    {
      title: 'Form field names',
      description:
        'Submit the current horizontal and vertical channel values with their own field names.',
      component: ColorAreaNamesExample,
    },
  ],
  accessibility: [
    {
      title: 'Keyboard interaction',
      description:
        'Use ArrowLeft and ArrowRight to decrease or increase the horizontal channel, and ArrowUp and ArrowDown to increase or decrease the vertical channel. Hold Shift with an arrow key to change values by 10 steps. PageUp and PageDown change the vertical channel by a larger step; Home and End move the horizontal channel to its minimum and maximum.',
      links: [
        {
          label: 'Read the Reka UI ColorArea accessibility guide',
          href: 'https://reka-ui.com/docs/components/color-area#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'string | Color',
        default: `'${colorAreaDefaults.modelValue}'`,
        description: 'Selected color. Can also be bound with v-model.',
      },
      {
        name: 'colorSpace',
        type: colorAreaColorSpaces.map((space) => `'${space}'`).join(' | '),
        default: `'${colorAreaDefaults.colorSpace}'`,
        description: 'Color space used to calculate and display the selected color.',
      },
      {
        name: 'xChannel',
        type: colorAreaChannels.map((channel) => `'${channel}'`).join(' | '),
        default: `'${colorAreaDefaults.xChannel}'`,
        description:
          'Color channel controlled by horizontal movement from its minimum on the left to its maximum on the right.',
      },
      {
        name: 'yChannel',
        type: colorAreaChannels.map((channel) => `'${channel}'`).join(' | '),
        default: `'${colorAreaDefaults.yChannel}'`,
        description:
          'Color channel controlled by vertical movement from its minimum at the bottom to its maximum at the top.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: String(colorAreaDefaults.disabled),
        description: 'Prevents pointer and keyboard interaction with the color area.',
      },
      {
        name: 'size',
        type: colorAreaSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${colorAreaDefaults.size}'`,
        description: 'Controls the width and height of the color area.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'undefined',
        description: 'Passes the required form field flag to ColorAreaRoot.',
      },
      {
        name: 'xName',
        type: 'string',
        default: 'undefined',
        description:
          'Name of the hidden form field submitted with the current horizontal channel value.',
      },
      {
        name: 'yName',
        type: 'string',
        default: 'undefined',
        description:
          'Name of the hidden form field submitted with the current vertical channel value.',
      },
      {
        name: 'ui',
        type: `{
  area?: () => HTMLAttributes
  thumb?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description: 'Resolvers for customizing attributes on the area and thumb.',
      },
    ],
    emits: [
      {
        name: 'change',
        type: '[value: string]',
        description: 'Emitted when the selected color changes.',
      },
      {
        name: 'changeEnd',
        type: '[value: string]',
        description: 'Emitted when color interaction ends.',
      },
      {
        name: 'update:color',
        type: '[value: Color]',
        description: 'Emitted with the selected color object when the color changes.',
      },
      {
        name: 'update:modelValue',
        type: '[value: string | Color]',
        description: 'Emitted when the selected color changes.',
      },
    ],
    slots: [],
    expose: [],
  },
}

export default colorAreaConfig
