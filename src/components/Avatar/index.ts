import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes, ImgHTMLAttributes } from 'vue'
import type { IconName } from '@/components/Icon'
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

export const avatarImageVariants = cva('aspect-square size-full')

export const avatarFallbackVariants = cva('flex size-full items-center justify-center')

export const avatarIconVariants = cva('size-1/2')

export const avatarLabelVariants = cva('whitespace-nowrap')

export const avatarScreenReaderLabelVariants = cva('sr-only')

export function fitText(text: string, fits: (text: string) => boolean) {
  if (fits(text)) return text

  const cut = (length: number) => `${text.slice(0, length).trimEnd()}...`
  let low = 0
  let high = text.length

  while (low < high) {
    const middle = Math.ceil((low + high) / 2)

    if (fits(cut(middle))) low = middle
    else high = middle - 1
  }

  return cut(low)
}

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
  ui?: AvatarUI
}

// Fn
export type AvatarFn<T> = () => T

// UI
export interface AvatarUI {
  image?: AvatarFn<ImgHTMLAttributes>
  fallback?: AvatarFn<HTMLAttributes>
}

// Slots
export interface AvatarSlots {
  fallback?(): unknown
}
