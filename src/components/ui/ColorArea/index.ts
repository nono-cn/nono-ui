import { cva } from 'class-variance-authority'
import type { Color, ColorChannel, ColorSpace } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as ColorArea } from './ColorArea.vue'

export const colorAreaRootVariants = cva(
  'relative h-48 w-48 overflow-hidden data-[disabled]:opacity-50',
  {
    variants: {
      rounded: {
        true: 'rounded-md',
        false: 'rounded-none',
      },
    },
    defaultVariants: {
      rounded: true,
    },
  },
)

export const colorAreaThumbVariants = cva(
  'block size-5 rounded-full border-2 border-white shadow-md ring-1 ring-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
)

export type ColorAreaValue = string | Color

export type ColorAreaFn<T> = () => T

export interface ColorAreaUI {
  area?: ColorAreaFn<HTMLAttributes>
  thumb?: ColorAreaFn<HTMLAttributes>
}

export interface ColorAreaProps {
  value?: ColorAreaValue
  colorSpace?: ColorSpace
  xChannel?: ColorChannel
  yChannel?: ColorChannel
  disabled?: boolean
  rounded?: boolean
  required?: boolean
  xName?: string
  yName?: string
  ui?: ColorAreaUI
}
