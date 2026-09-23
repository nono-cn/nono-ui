import { cva, type VariantProps } from 'class-variance-authority'
import type { IconName } from '@/components/ui/Icon'

export { default as IconTile } from './IconTile.vue'

export const iconTileVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center text-(--icon-tile-icon,var(--color-foreground))',
  {
    variants: {
      variant: {
        solid: 'border-transparent',
        outline:
          'border border-(--icon-tile-border,var(--color-border)) bg-(--icon-tile-surface,transparent)',
        elevated:
          'border border-(--icon-tile-border,transparent) bg-(--icon-tile-surface,var(--color-muted)) shadow-sm ring-1 ring-(--icon-tile-ring,var(--color-border))',
        frame:
          'border border-(--icon-tile-border,var(--color-border)) bg-(--icon-tile-ring,var(--color-muted)) p-1 before:absolute before:inset-1 before:rounded-[inherit] before:border before:border-(--icon-tile-border,var(--color-border)) before:bg-(--icon-tile-surface,var(--color-card))',
      },
      size: {
        xs: 'size-6 [&>svg]:size-3',
        sm: 'size-8 [&>svg]:size-4',
        md: 'size-10 [&>svg]:size-5',
        lg: 'size-12 [&>svg]:size-6',
        xl: 'size-16 [&>svg]:size-8',
      },
      shape: {
        rounded: 'rounded-lg',
        full: 'rounded-full',
      },
      severity: {
        primary: 'text-primary',
        secondary: 'text-secondary-foreground',
        warning: 'text-warning',
        success: 'text-success',
        error: 'text-error',
      },
      color: {
        true: 'border-(--icon-tile-color)/40 text-(--icon-tile-color)',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        severity: 'primary',
        color: false,
        class: 'bg-primary text-primary-foreground',
      },
      {
        variant: 'solid',
        severity: 'secondary',
        color: false,
        class: 'bg-secondary text-secondary-foreground',
      },
      {
        variant: 'solid',
        severity: 'warning',
        color: false,
        class: 'bg-warning text-warning-foreground',
      },
      {
        variant: 'solid',
        severity: 'success',
        color: false,
        class: 'bg-success text-success-foreground',
      },
      {
        variant: 'solid',
        severity: 'error',
        color: false,
        class: 'bg-error text-error-foreground',
      },
      {
        variant: 'solid',
        color: true,
        class: 'bg-(--icon-tile-color) text-(--icon-tile-color-foreground)',
      },
      {
        variant: 'elevated',
        severity: 'primary',
        color: false,
        class: 'bg-primary/10 ring-primary/20',
      },
      {
        variant: 'elevated',
        severity: 'secondary',
        color: false,
        class: 'bg-secondary/60 ring-secondary-foreground/20',
      },
      {
        variant: 'elevated',
        severity: 'warning',
        color: false,
        class: 'bg-warning/10 ring-warning/20',
      },
      {
        variant: 'elevated',
        severity: 'success',
        color: false,
        class: 'bg-success/10 ring-success/20',
      },
      { variant: 'elevated', severity: 'error', color: false, class: 'bg-error/10 ring-error/20' },
      {
        variant: 'elevated',
        color: true,
        class: 'bg-(--icon-tile-color)/10 ring-(--icon-tile-color)/20',
      },
    ],
    defaultVariants: {
      variant: 'outline',
      size: 'md',
      shape: 'rounded',
      severity: 'primary',
      color: false,
    },
  },
)

export type IconTileVariants = VariantProps<typeof iconTileVariants>
export type IconTileVariant = NonNullable<IconTileVariants['variant']>
export type IconTileSize = NonNullable<IconTileVariants['size']>
export type IconTileShape = NonNullable<IconTileVariants['shape']>
export type IconTileSeverity = NonNullable<IconTileVariants['severity']>

export interface IconTileProps {
  iconName: IconName
  variant?: IconTileVariant
  size?: IconTileSize
  shape?: IconTileShape
  severity?: IconTileSeverity
  color?: string
}
