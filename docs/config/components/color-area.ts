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
      title: 'Roles and attributes',
      description:
        'The thumb is the only focusable element and carries both channels. Its value attributes describe the horizontal channel, and aria-valuetext reads both.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="group"', 'Root', 'Groups the area and its thumb.'],
          ['role="application"', 'Area', 'The area handles its own pointer and keyboard input.'],
          ['aria-roledescription', 'Area', '"Color picker" in the current locale.'],
          ['role="slider"', 'Thumb', 'Announces the thumb as a slider.'],
          ['aria-roledescription', 'Thumb', '"Color thumb" in the current locale.'],
          ['aria-label', 'Thumb', 'Names of both channels, such as "Hue, Saturation".'],
          ['aria-valuenow', 'Thumb', 'Value of the horizontal channel.'],
          ['aria-valuemin, aria-valuemax', 'Thumb', 'Range of the horizontal channel.'],
          [
            'aria-valuetext',
            'Thumb',
            'Both channels with their values, such as "Hue 0, Saturation 100".',
          ],
          ['tabindex="0"', 'Thumb', 'Removed while disabled, so the thumb leaves the tab order.'],
          ['aria-disabled="true"', 'Root, area', 'Set while disabled.'],
        ],
      },
    },
    {
      title: 'Keyboard',
      description:
        'The horizontal channel is xChannel and the vertical channel is yChannel. Holding Shift multiplies every step by ten, including PageUp, PageDown, Home, and End.',
      table: {
        columns: ['Key', 'Action'],
        rows: [
          ['ArrowRight', 'Increases the horizontal channel by one step.'],
          ['ArrowLeft', 'Decreases the horizontal channel by one step.'],
          ['ArrowUp', 'Increases the vertical channel by one step.'],
          ['ArrowDown', 'Decreases the vertical channel by one step.'],
          ['End', 'Increases the horizontal channel by ten steps.'],
          ['Home', 'Decreases the horizontal channel by ten steps.'],
          ['PageUp', 'Increases the vertical channel by ten steps.'],
          ['PageDown', 'Decreases the vertical channel by ten steps.'],
          ['Shift + key', 'Moves ten times as far as the key alone.'],
        ],
      },
    },
    {
      title: 'Channel names',
      description:
        'The channel names in aria-label and aria-valuetext come from Reka UI and are always in English. The role descriptions follow the current locale.',
    },
    {
      title: 'Forms',
      description:
        'When the color area is inside a form, xName and yName name a hidden input for each channel so both values are submitted.',
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
