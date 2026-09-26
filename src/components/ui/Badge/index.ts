import { cva, type VariantProps } from 'class-variance-authority'
import type { IconConfig } from '@/components/ui/Icon'

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
        solid: '',
        outline: 'border bg-transparent',
        plain: 'bg-transparent',
        subtle: 'border',
        soft: '',
      },
      severity: {
        primary: 'focus-visible:border-primary focus-visible:ring-primary/30',
        neutral: 'focus-visible:border-foreground focus-visible:ring-foreground/30',
        secondary:
          'focus-visible:border-secondary-foreground focus-visible:ring-secondary-foreground/20',
        warning: 'focus-visible:border-warning focus-visible:ring-warning/30',
        success: 'focus-visible:border-success focus-visible:ring-success/30',
        error: 'focus-visible:border-error focus-visible:ring-error/30',
      },
      color: {
        true: 'focus-visible:border-(--badge-color) focus-visible:ring-(--badge-color)/30',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        severity: 'primary',
        class: 'border-transparent bg-primary text-primary-foreground',
      },
      {
        variant: 'outline',
        severity: 'primary',
        class: 'border-primary/40 text-primary',
      },
      {
        variant: 'plain',
        severity: 'primary',
        class: 'border-transparent text-primary',
      },
      {
        variant: 'subtle',
        severity: 'primary',
        class: 'border-primary/20 bg-primary/10 text-primary',
      },
      {
        variant: 'soft',
        severity: 'primary',
        class: 'border-transparent bg-primary/10 text-primary',
      },
      {
        variant: 'solid',
        severity: 'neutral',
        class: 'border-transparent bg-foreground text-background',
      },
      {
        variant: 'outline',
        severity: 'neutral',
        class: 'border-foreground/30 text-foreground',
      },
      {
        variant: 'plain',
        severity: 'neutral',
        class: 'border-transparent text-foreground',
      },
      {
        variant: 'subtle',
        severity: 'neutral',
        class: 'border-border bg-muted text-foreground',
      },
      {
        variant: 'soft',
        severity: 'neutral',
        class: 'border-transparent bg-muted text-foreground',
      },
      {
        variant: 'solid',
        severity: 'secondary',
        class: 'border-transparent bg-secondary text-secondary-foreground',
      },
      {
        variant: 'outline',
        severity: 'secondary',
        class: 'border-secondary-foreground/30 text-secondary-foreground',
      },
      {
        variant: 'plain',
        severity: 'secondary',
        class: 'border-transparent text-secondary-foreground',
      },
      {
        variant: 'subtle',
        severity: 'secondary',
        class: 'border-secondary-foreground/15 bg-secondary/60 text-secondary-foreground',
      },
      {
        variant: 'soft',
        severity: 'secondary',
        class: 'border-transparent bg-secondary/60 text-secondary-foreground',
      },
      {
        variant: 'solid',
        severity: 'warning',
        class: 'border-transparent bg-warning text-warning-foreground',
      },
      {
        variant: 'outline',
        severity: 'warning',
        class: 'border-warning/40 text-warning',
      },
      {
        variant: 'plain',
        severity: 'warning',
        class: 'border-transparent text-warning',
      },
      {
        variant: 'subtle',
        severity: 'warning',
        class: 'border-warning/20 bg-warning/10 text-warning',
      },
      {
        variant: 'soft',
        severity: 'warning',
        class: 'border-transparent bg-warning/10 text-warning',
      },
      {
        variant: 'solid',
        severity: 'success',
        class: 'border-transparent bg-success text-success-foreground',
      },
      {
        variant: 'outline',
        severity: 'success',
        class: 'border-success/40 text-success',
      },
      {
        variant: 'plain',
        severity: 'success',
        class: 'border-transparent text-success',
      },
      {
        variant: 'subtle',
        severity: 'success',
        class: 'border-success/20 bg-success/10 text-success',
      },
      {
        variant: 'soft',
        severity: 'success',
        class: 'border-transparent bg-success/10 text-success',
      },
      {
        variant: 'solid',
        severity: 'error',
        class: 'border-transparent bg-error text-error-foreground',
      },
      {
        variant: 'outline',
        severity: 'error',
        class: 'border-error/40 text-error',
      },
      {
        variant: 'plain',
        severity: 'error',
        class: 'border-transparent text-error',
      },
      {
        variant: 'subtle',
        severity: 'error',
        class: 'border-error/20 bg-error/10 text-error',
      },
      {
        variant: 'soft',
        severity: 'error',
        class: 'border-transparent bg-error/10 text-error',
      },
      {
        color: true,
        variant: 'solid',
        class: 'border-transparent bg-(--badge-color) text-(--badge-color-foreground)',
      },
      {
        color: true,
        variant: 'outline',
        class: 'border-(--badge-color)/40 bg-transparent text-(--badge-color)',
      },
      {
        color: true,
        variant: 'plain',
        class: 'border-transparent bg-transparent text-(--badge-color)',
      },
      {
        color: true,
        variant: 'subtle',
        class: 'border-(--badge-color)/20 bg-(--badge-color)/10 text-(--badge-color)',
      },
      {
        color: true,
        variant: 'soft',
        class: 'border-transparent bg-(--badge-color)/10 text-(--badge-color)',
      },
    ],
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
  icon?: IconConfig
  trailingIcon?: IconConfig
}

export interface BadgeSlots {
  default?(): unknown
  leading?(): unknown
  trailing?(): unknown
}
