import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { IconName } from '@/components/ui/Icon'
import type { PrimitiveProps } from 'reka-ui'
import type { EmitsAsProps } from '@/types/emits'
import { buttonIconSizes, buttonSizes, buttonVariantNames } from './constants'

export { default as Button } from './Button.vue'
export { buttonIconSizes, buttonSizes, buttonTextSizes, buttonVariantNames } from './constants'

export const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-(--button-radius) border border-transparent font-medium whitespace-nowrap transition-colors outline-none focus-visible:border-(--button-color) focus-visible:ring-[3px] focus-visible:ring-(--button-color)/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
  {
    variants: {
      variant: {
        solid: [
          '[--button-solid-hover:color-mix(in_oklab,var(--button-solid)_90%,transparent)]',
          '[--button-solid-active:color-mix(in_oklab,var(--button-solid)_80%,transparent)]',
          'bg-(--button-solid) text-(--button-solid-foreground) hover:bg-(--button-solid-hover) active:bg-(--button-solid-active)',
        ],
        outline: [
          '[--button-outline-border:color-mix(in_oklab,var(--button-color)_40%,transparent)]',
          '[--button-outline-hover:color-mix(in_oklab,var(--button-color)_10%,transparent)]',
          '[--button-outline-active-border:color-mix(in_oklab,var(--button-color)_60%,transparent)]',
          '[--button-outline-active:color-mix(in_oklab,var(--button-color)_20%,transparent)]',
          'border bg-transparent border-(--button-outline-border) text-(--button-color) hover:bg-(--button-outline-hover) active:border-(--button-outline-active-border) active:bg-(--button-outline-active)',
        ],
        plain: [
          '[--button-plain-hover:color-mix(in_oklab,var(--button-color)_10%,transparent)]',
          '[--button-plain-active:color-mix(in_oklab,var(--button-color)_20%,transparent)]',
          'bg-transparent text-(--button-color) hover:bg-(--button-plain-hover) active:bg-(--button-plain-active)',
        ],
        subtle: [
          '[--button-subtle-border:color-mix(in_oklab,var(--button-color)_20%,transparent)]',
          '[--button-subtle-bg:color-mix(in_oklab,var(--button-color)_10%,transparent)]',
          '[--button-subtle-hover:color-mix(in_oklab,var(--button-color)_15%,transparent)]',
          '[--button-subtle-active:color-mix(in_oklab,var(--button-color)_25%,transparent)]',
          'border border-(--button-subtle-border) bg-(--button-subtle-bg) text-(--button-color) hover:bg-(--button-subtle-hover) active:bg-(--button-subtle-active)',
        ],
        soft: [
          '[--button-soft-bg:color-mix(in_oklab,var(--button-color)_10%,transparent)]',
          '[--button-soft-hover:color-mix(in_oklab,var(--button-color)_20%,transparent)]',
          '[--button-soft-active:color-mix(in_oklab,var(--button-color)_30%,transparent)]',
          'bg-(--button-soft-bg) text-(--button-color) hover:bg-(--button-soft-hover) active:bg-(--button-soft-active)',
        ],
        link: 'bg-transparent underline underline-offset-4 hover:no-underline text-(--button-color)',
      } satisfies Record<(typeof buttonVariantNames)[number], string | string[]>,
      size: {
        xs: 'h-7 gap-1 px-2.5 text-xs has-[>svg]:px-2',
        sm: 'h-8 gap-1.5 px-3 text-sm has-[>svg]:px-2.5',
        md: 'h-9 px-4 py-2 text-base has-[>svg]:px-3',
        lg: 'h-10 px-6 text-lg has-[>svg]:px-4',
        xl: 'h-11 px-7 text-xl has-[>svg]:px-5',
        'icon-xs': 'size-7 p-0',
        'icon-sm': 'size-8 p-0',
        icon: 'size-9 p-0',
        'icon-lg': 'size-10 p-0',
        'icon-xl': 'size-11 p-0',
      } satisfies Record<(typeof buttonSizes)[number], string>,
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  },
)

// Variants
export type ButtonVariants = VariantProps<typeof buttonVariants>
export type ButtonVariant = NonNullable<ButtonVariants['variant']>
export type ButtonSize = NonNullable<ButtonVariants['size']>
export type IconButtonSize = (typeof buttonIconSizes)[number]

export function toIconButtonSize(size: ButtonSize = 'md'): IconButtonSize {
  if (size === 'icon' || size === 'md') return 'icon'
  return size.startsWith('icon-') ? (size as IconButtonSize) : (`icon-${size}` as IconButtonSize)
}

// Props
export interface ButtonProps extends Pick<PrimitiveProps, 'as' | 'asChild'> {
  label?: string
  variant?: ButtonVariant
  size?: ButtonSize
  radius?: string | number
  loading?: boolean
  color?: string
  icon?: IconName
  trailingIcon?: IconName
}

// Emits
export interface ButtonEmits {
  click: [event: PointerEvent]
}

// Slots
export interface ButtonSlots {
  default?(): unknown
  leading?(): unknown
  loading?(): unknown
  trailing?(): unknown
}

export type NormalizeButtonProps = ButtonProps & EmitsAsProps<ButtonEmits> & HTMLAttributes
