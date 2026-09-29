import { cva, type VariantProps } from 'class-variance-authority'
import type { IconName } from '@/components/ui/Icon'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none',
  {
    variants: {
      size: {
        sm: 'gap-0.5 px-0.5 text-sm',
        md: 'gap-1 px-1 text-base',
        lg: 'gap-1.5 px-2 text-lg',
      },
      variant: {
        solid: 'border-transparent bg-(--badge-solid) text-(--badge-solid-foreground)',
        outline: 'border-(--badge-color)/40 bg-transparent text-(--badge-color)',
        plain: 'border-transparent bg-transparent text-(--badge-color)',
        subtle: 'border-(--badge-color)/20 bg-(--badge-color)/10 text-(--badge-color)',
        soft: 'border-transparent bg-(--badge-color)/10 text-(--badge-color)',
      },
      severity: {
        primary:
          'focus-visible:border-primary focus-visible:ring-primary/30 [--badge-color:var(--primary)] [--badge-solid:var(--primary)] [--badge-solid-foreground:var(--primary-foreground)]',
        neutral:
          'focus-visible:border-foreground focus-visible:ring-foreground/30 [--badge-color:var(--foreground)] [--badge-solid:var(--foreground)] [--badge-solid-foreground:var(--background)]',
        secondary:
          'focus-visible:border-secondary-foreground focus-visible:ring-secondary-foreground/20 [--badge-color:var(--secondary-foreground)] [--badge-solid:var(--secondary)] [--badge-solid-foreground:var(--secondary-foreground)]',
        warning:
          'focus-visible:border-warning focus-visible:ring-warning/30 [--badge-color:var(--warning)] [--badge-solid:var(--warning)] [--badge-solid-foreground:var(--warning-foreground)]',
        success:
          'focus-visible:border-success focus-visible:ring-success/30 [--badge-color:var(--success)] [--badge-solid:var(--success)] [--badge-solid-foreground:var(--success-foreground)]',
        error:
          'focus-visible:border-error focus-visible:ring-error/30 [--badge-color:var(--error)] [--badge-solid:var(--error)] [--badge-solid-foreground:var(--error-foreground)]',
      },
      color: {
        true: 'focus-visible:border-(--badge-color) focus-visible:ring-(--badge-color)/30 [--badge-solid:var(--badge-color)] [--badge-solid-foreground:var(--badge-color-foreground)]',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'solid',
      severity: 'primary',
      color: false,
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
export type BadgeSize = NonNullable<BadgeVariants['size']>
export type BadgeVariant = NonNullable<BadgeVariants['variant']>
export type BadgeSeverity = NonNullable<BadgeVariants['severity']>

export interface BadgeProps {
  label?: string
  size?: BadgeSize
  variant?: BadgeVariant
  severity?: BadgeSeverity
  color?: string
  icon?: IconName
  trailingIcon?: IconName
}

export interface BadgeSlots {
  default?(): unknown
  leading?(): unknown
  trailing?(): unknown
}
