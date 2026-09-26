import { cva, type VariantProps } from 'class-variance-authority'
import type { Color, ColorChannel, ColorSpace } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as ColorArea } from './ColorArea.vue'

export const colorAreaRootVariants = cva('relative overflow-hidden data-[disabled]:opacity-50', {
  variants: {
    size: {
      xs: 'size-32',
      sm: 'size-40',
      md: 'size-48',
      lg: 'size-56',
      xl: 'size-64',
    },
    rounded: {
      true: 'rounded-md',
      false: 'rounded-none',
    },
  },
  defaultVariants: {
    size: 'md',
    rounded: true,
  },
})

export type ColorAreaSize = NonNullable<VariantProps<typeof colorAreaRootVariants>['size']>

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
  value?: ColorAreaValue
  colorSpace?: ColorSpace
  xChannel?: ColorChannel
  yChannel?: ColorChannel
  disabled?: boolean
  size?: ColorAreaSize
  rounded?: boolean
  required?: boolean
  xName?: string
  yName?: string
  ui?: ColorAreaUI
}
