import { cva, type VariantProps } from 'class-variance-authority'
import type { Color } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import {
  colorAreaChannels,
  colorAreaColorSpaces,
  colorAreaDefaults,
  colorAreaSizes,
} from './constants'

export { default as ColorArea } from './ColorArea.vue'
export {
  colorAreaChannels,
  colorAreaColorSpaces,
  colorAreaDefaults,
  colorAreaSizes,
} from './constants'

export const colorAreaRootVariants = cva(
  'relative overflow-hidden rounded-md data-[disabled]:opacity-50',
  {
    variants: {
      size: {
        xs: 'size-32',
        sm: 'size-40',
        md: 'size-48',
        lg: 'size-56',
        xl: 'size-64',
      } satisfies Record<(typeof colorAreaSizes)[number], string>,
    },
    defaultVariants: {
      size: colorAreaDefaults.size,
    },
  },
)

export type ColorAreaSize = NonNullable<VariantProps<typeof colorAreaRootVariants>['size']>
export type ColorAreaColorSpace = (typeof colorAreaColorSpaces)[number]
export type ColorAreaChannel = (typeof colorAreaChannels)[number]

export const colorAreaThumbVariants = cva(
  'block size-5 rounded-full border-2 border-black/60 bg-white shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
)

export type ColorAreaValue = string | Color

export type ColorAreaFn<T> = () => T

export interface ColorAreaUI {
  area?: ColorAreaFn<HTMLAttributes>
  thumb?: ColorAreaFn<HTMLAttributes>
}

export interface ColorAreaProps {
  modelValue?: ColorAreaValue
  colorSpace?: ColorAreaColorSpace
  xChannel?: ColorAreaChannel
  yChannel?: ColorAreaChannel
  disabled?: boolean
  size?: ColorAreaSize
  required?: boolean
  xName?: string
  yName?: string
  ui?: ColorAreaUI
}
