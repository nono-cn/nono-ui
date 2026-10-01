import { cva, type VariantProps } from 'class-variance-authority'
import type { IconName } from '@/components/ui/Icon'
import { avatarDefaults, avatarSizes } from './constants'

export { default as Avatar } from './Avatar.vue'
export { avatarDefaults, avatarSizes } from './constants'

export const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-(--avatar-radius) bg-(--avatar-color)/10 text-(--avatar-color)',
  {
    variants: {
      size: {
        xs: 'size-6 text-xs',
        sm: 'size-8 text-sm',
        md: 'size-10 text-base',
        lg: 'size-12 text-lg',
        xl: 'size-16 text-xl',
      } satisfies Record<(typeof avatarSizes)[number], string>,
    },
    defaultVariants: {
      size: avatarDefaults.size,
    },
  },
)

export type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>['size']>
export type AvatarRadius = string | number

// Props
export interface AvatarProps {
  src?: string
  alt?: string
  size?: AvatarSize
  radius?: AvatarRadius
  color?: string
  delayMs?: number
  icon?: IconName
  label?: string
}

// Slots
export interface AvatarSlots {
  fallback?(props: Record<string, never>): unknown
}
