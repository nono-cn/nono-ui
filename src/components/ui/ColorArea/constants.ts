import type { ColorChannel, ColorSpace } from 'reka-ui'

export const colorAreaSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const colorAreaColorSpaces = ['hsl', 'hsb', 'rgb'] as const satisfies readonly ColorSpace[]

export const colorAreaChannels = [
  'red',
  'green',
  'blue',
  'hue',
  'saturation',
  'lightness',
  'brightness',
  'alpha',
] as const satisfies readonly ColorChannel[]

export const colorAreaDefaults = {
  modelValue: '#ff0000',
  colorSpace: 'hsl' as const,
  xChannel: 'hue' as const,
  yChannel: 'saturation' as const,
  disabled: false,
  size: 'md' as const,
}
