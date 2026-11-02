import { cva, type VariantProps } from 'class-variance-authority'
import type { IconName } from '@/components/Icon'
import { badgeDefaults, badgeSizes, badgeVariantNames } from './constants'

export { default as Badge } from './Badge.vue'
export { badgeDefaults, badgeSizes, badgeVariantNames } from './constants'

export const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-(--badge-radius) border font-medium whitespace-nowrap',
  {
    variants: {
      size: {
        xs: 'gap-0.5 px-0.5 text-xs',
        sm: 'gap-0.5 px-0.5 text-sm',
        md: 'gap-1 px-1 text-base',
        lg: 'gap-1.5 px-2 text-lg',
        xl: 'gap-2 px-2.5 text-xl',
      } satisfies Record<(typeof badgeSizes)[number], string>,
      variant: {
        solid: 'border-transparent bg-(--badge-color) text-(--badge-color-foreground)',
        outline: 'border-(--badge-color)/40 bg-transparent text-(--badge-color)',
        plain: 'border-transparent bg-transparent text-(--badge-color)',
        subtle: 'border-(--badge-color)/20 bg-(--badge-color)/10 text-(--badge-color)',
        soft: 'border-transparent bg-(--badge-color)/10 text-(--badge-color)',
      } satisfies Record<(typeof badgeVariantNames)[number], string>,
    },
    defaultVariants: {
      size: badgeDefaults.size,
      variant: badgeDefaults.variant,
    },
  },
)

export const badgeLeadingVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
    } satisfies Record<(typeof badgeSizes)[number], string>,
  },
  defaultVariants: {
    size: badgeDefaults.size,
  },
})

export const badgeTrailingVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
    } satisfies Record<(typeof badgeSizes)[number], string>,
  },
  defaultVariants: {
    size: badgeDefaults.size,
  },
})

export const badgeIconVariants = cva('size-full')

export type BadgeVariants = VariantProps<typeof badgeVariants>
export type BadgeSize = NonNullable<BadgeVariants['size']>
export type BadgeVariant = NonNullable<BadgeVariants['variant']>
export type BadgeRadius = string | number

export interface BadgeProps {
  label?: string
  size?: BadgeSize
  variant?: BadgeVariant
  radius?: BadgeRadius
  color?: string
  icon?: IconName
  trailingIcon?: IconName
}

export interface BadgeSlots {
  default?(): unknown
  leading?(): unknown
  trailing?(): unknown
}
