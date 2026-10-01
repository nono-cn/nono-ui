import { cva, type VariantProps } from 'class-variance-authority'
import type { IconName } from '@/components/ui/Icon'
import { badgeDefaults, badgeSizes, badgeVariantNames } from './constants'

export { default as Badge } from './Badge.vue'
export { badgeDefaults, badgeSizes, badgeVariantNames } from './constants'

export const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-(--badge-radius) border font-medium whitespace-nowrap transition-[color,box-shadow] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none',
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
        solid: 'border-transparent bg-(--badge-solid) text-(--badge-solid-foreground)',
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
