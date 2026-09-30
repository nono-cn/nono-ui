import type { IconName } from './icons.ts'
import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { iconSizes } from './constants'

export { default as Icon } from './Icon.vue'
export { iconSizes } from './constants'
export type { IconName } from './icons.ts'

export const iconVariants = cva('shrink-0', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
    } satisfies Record<(typeof iconSizes)[number], string>,
  },
  defaultVariants: {
    size: 'md',
  },
})

// Variants
export type IconVariants = VariantProps<typeof iconVariants>
export type IconSize = NonNullable<IconVariants['size']>

// Props
export interface IconProps {
  name: IconName
  size?: IconSize
  color?: string
  stroke?: number
}

// Normalize

export type IconConfig = IconProps & HTMLAttributes
