import { cva, type VariantProps } from 'class-variance-authority'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Avatar } from './Avatar.vue'

export const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden bg-(--avatar-background,var(--color-muted))/10 text-(--avatar-foreground)',
  {
    variants: {
      severity: {
        primary: '[--avatar-foreground:var(--primary)] [--avatar-background:var(--primary)]',
        secondary:
          '[--avatar-foreground:var(--secondary-foreground)] [--avatar-background:var(--secondary-foreground)]',
        neutral:
          '[--avatar-foreground:var(--muted-foreground)] [--avatar-background:var(--muted-foreground)]',
        warning: '[--avatar-foreground:var(--warning)] [--avatar-background:var(--warning)]',
        success: '[--avatar-foreground:var(--success)] [--avatar-background:var(--success)]',
        error: '[--avatar-foreground:var(--error)] [--avatar-background:var(--error)]',
      },
      size: {
        xs: 'size-6 text-xs',
        sm: 'size-8 text-sm',
        md: 'size-10 text-base',
        lg: 'size-12 text-lg',
      },
      shape: {
        rounded: 'rounded-full',
        square: 'rounded-none',
      },
      color: {
        true: 'bg-(--avatar-color)',
        false: '',
      },
    },
    defaultVariants: {
      severity: 'neutral',
      size: 'md',
      shape: 'rounded',
    },
  },
)

export type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>['size']>
export type AvatarShape = NonNullable<VariantProps<typeof avatarVariants>['shape']>
export type AvatarSeverity = NonNullable<VariantProps<typeof avatarVariants>['severity']>

// Props
export interface AvatarProps {
  src?: string
  size?: AvatarSize
  shape?: AvatarShape
  severity?: AvatarSeverity
  color?: string
  delayMs?: number
  icon?: IconConfig
  label?: string
}

// Slots
export interface AvatarSlots {
  fallback?(props: Record<string, never>): unknown
}
