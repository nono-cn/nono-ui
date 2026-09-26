import { cva } from 'class-variance-authority'
import type { Color, ColorChannel, ColorSpace } from 'reka-ui'

export { default as ColorArea } from './ColorArea.vue'

export const colorAreaRootVariants = cva('relative h-48 w-48 overflow-hidden rounded-md')

export const colorAreaThumbVariants = cva(
  'block size-5 rounded-full border-2 border-white shadow-md ring-1 ring-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
)

export type ColorAreaValue = string | Color

export interface ColorAreaProps {
  value?: ColorAreaValue
  colorSpace?: ColorSpace
  xChannel?: ColorChannel
  yChannel?: ColorChannel
}
