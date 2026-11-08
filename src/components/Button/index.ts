import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { IconName } from '@/components/Icon'
import type { PrimitiveProps } from 'reka-ui'
import type { EmitsAsProps } from '@/types/emits'
import { buttonDefaults, buttonIconSizes, buttonSizes, buttonVariantNames } from './constants'
export { default as Button } from './Button.vue'
export {
  buttonDefaults,
  buttonTextSizes,
  buttonIconSizes,
  buttonSizes,
  buttonVariantNames,
} from './constants'

export const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-(--button-radius) border border-transparent font-medium whitespace-nowrap transition-colors outline-none focus-visible:border-(--button-color) focus-visible:ring-[3px] focus-visible:ring-(--button-color)/30',
  {
    variants: {
      variant: {
        solid:
          'bg-(--button-color) text-(--button-color-foreground) hover:bg-(--button-color)/90 active:bg-(--button-color)/80',
        outline:
          'border-(--button-color)/40 bg-transparent text-(--button-color) hover:bg-(--button-color)/10 active:border-(--button-color)/60 active:bg-(--button-color)/20',
        plain:
          'bg-transparent text-(--button-color) hover:bg-(--button-color)/10 active:bg-(--button-color)/20',
        subtle:
          'border-(--button-color)/20 bg-(--button-color)/10 text-(--button-color) hover:bg-(--button-color)/15 active:bg-(--button-color)/25',
        soft: 'bg-(--button-color)/10 text-(--button-color) hover:bg-(--button-color)/20 active:bg-(--button-color)/30',
        link: 'bg-transparent text-(--button-color) underline underline-offset-4 hover:no-underline',
      } satisfies Record<(typeof buttonVariantNames)[number], string | string[]>,
      size: {
        xs: 'h-7 gap-1 px-2.5 text-xs has-[>[data-button-ui]]:px-2',
        sm: 'h-8 gap-1.5 px-3 text-sm has-[>[data-button-ui]]:px-2.5',
        md: 'h-9 px-4 py-2 text-base has-[>[data-button-ui]]:px-3',
        lg: 'h-10 px-6 text-lg has-[>[data-button-ui]]:px-4',
        xl: 'h-11 px-7 text-xl has-[>[data-button-ui]]:px-5',
        'icon-xs': 'size-7 p-0',
        'icon-sm': 'size-8 p-0',
        icon: 'size-9 p-0',
        'icon-lg': 'size-10 p-0',
        'icon-xl': 'size-11 p-0',
      } satisfies Record<(typeof buttonSizes)[number], string>,
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      variant: buttonDefaults.variant,
      size: buttonDefaults.size,
      disabled: false,
    },
  },
)

export const buttonLeadingVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
      'icon-xs': 'size-3',
      'icon-sm': 'size-4',
      icon: 'size-5',
      'icon-lg': 'size-6',
      'icon-xl': 'size-7',
    } satisfies Record<(typeof buttonSizes)[number], string>,
  },
  defaultVariants: {
    size: buttonDefaults.size,
  },
})

export const buttonTrailingVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
      'icon-xs': 'size-3',
      'icon-sm': 'size-4',
      icon: 'size-5',
      'icon-lg': 'size-6',
      'icon-xl': 'size-7',
    } satisfies Record<(typeof buttonSizes)[number], string>,
  },
  defaultVariants: {
    size: buttonDefaults.size,
  },
})

export const buttonIconVariants = cva('size-full')

// Variants
export type ButtonVariants = VariantProps<typeof buttonVariants>
export type ButtonVariant = NonNullable<ButtonVariants['variant']>
export type ButtonSize = NonNullable<ButtonVariants['size']>
export type IconButtonSize = (typeof buttonIconSizes)[number]

// Props
export interface ButtonProps extends Pick<PrimitiveProps, 'as'> {
  label?: string
  variant?: ButtonVariant
  size?: ButtonSize
  radius?: string | number
  loading?: boolean
  disabled?: boolean
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
