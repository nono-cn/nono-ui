import { cva, type VariantProps } from 'class-variance-authority'
import type { IconName } from '@/components/Icon'
import type { EmitsAsProps } from '@/types/emits'
import type { HTMLAttributes } from 'vue'
import { inputDefaults, inputSizes, inputVariantNames } from './constants'

export { default as Input } from './Input.vue'
export { inputDefaults, inputSizes, inputVariantNames } from './constants'

export const inputVariants = cva(
  'relative flex w-full min-w-0 items-center overflow-hidden transition-[color,box-shadow] focus-within:border-(--input-color) focus-within:ring-3 focus-within:ring-(--input-color)/30 has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-3 has-[[aria-invalid=true]]:ring-destructive/20 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 dark:has-[[aria-invalid=true]]:ring-destructive/40',
  {
    variants: {
      size: {
        xs: 'h-7 text-sm',
        sm: 'h-8 text-sm',
        md: 'h-9 text-base',
        lg: 'h-10 text-lg',
        xl: 'h-11 text-xl',
      } satisfies Record<(typeof inputSizes)[number], string>,
      variant: {
        outline: 'rounded-md border bg-transparent shadow-xs dark:bg-input/30',
        plain: 'rounded-md border-transparent bg-transparent shadow-none',
        subtle: 'rounded-md border bg-muted shadow-xs',
        soft: 'rounded-md border-transparent bg-muted/50 shadow-none',
      } satisfies Record<(typeof inputVariantNames)[number], string>,
      highlight: {
        true: '',
        false: 'border-input',
      },
    },
    compoundVariants: [
      { variant: ['outline', 'plain'], class: 'text-(--input-color)' },
      { variant: ['subtle', 'soft'], class: 'text-(--input-color)' },
      { variant: ['outline', 'plain'], highlight: true, class: 'border-(--input-color)/40' },
      { variant: 'subtle', highlight: true, class: 'border-(--input-color)/20' },
      { variant: 'soft', highlight: true, class: 'border-(--input-color)/40' },
    ],
    defaultVariants: {
      size: inputDefaults.size,
      variant: inputDefaults.variant,
      highlight: inputDefaults.highlight,
    },
  },
)

export const inputFieldVariants = cva(
  'flex h-full w-full min-w-0 flex-1 border-0 bg-transparent px-3 py-1 text-foreground outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed',
  {
    variants: {
      leading: {
        true: 'pl-0',
        false: '',
      },
      trailing: {
        true: 'pr-0',
        false: '',
      },
    },
    defaultVariants: {
      leading: false,
      trailing: false,
    },
  },
)

export const inputLeadingVariants = cva(
  'ms-3 me-3 inline-flex h-(--input-icon-size) min-w-(--input-icon-size) shrink-0 items-center justify-center text-muted-foreground',
  {
    variants: {
      size: {
        xs: '[--input-icon-size:--spacing(3.5)]',
        sm: '[--input-icon-size:--spacing(4)]',
        md: '[--input-icon-size:--spacing(5)]',
        lg: '[--input-icon-size:--spacing(6)]',
        xl: '[--input-icon-size:--spacing(7)]',
      } satisfies Record<(typeof inputSizes)[number], string>,
    },
    defaultVariants: {
      size: inputDefaults.size,
    },
  },
)

export const inputTrailingVariants = cva(
  'ms-3 me-3 inline-flex h-(--input-icon-size) min-w-(--input-icon-size) shrink-0 items-center justify-center text-muted-foreground',
  {
    variants: {
      size: {
        xs: '[--input-icon-size:--spacing(3.5)]',
        sm: '[--input-icon-size:--spacing(4)]',
        md: '[--input-icon-size:--spacing(5)]',
        lg: '[--input-icon-size:--spacing(6)]',
        xl: '[--input-icon-size:--spacing(7)]',
      } satisfies Record<(typeof inputSizes)[number], string>,
    },
    defaultVariants: {
      size: inputDefaults.size,
    },
  },
)

export const inputIconVariants = cva('size-(--input-icon-size)')

export type InputVariants = VariantProps<typeof inputVariants>
export type InputSize = NonNullable<InputVariants['size']>
export type InputVariant = NonNullable<InputVariants['variant']>

export type InputValue = string | number

export interface InputProps {
  modelValue?: InputValue
  size?: InputSize
  variant?: InputVariant
  color?: string
  highlight?: boolean
  icon?: IconName
  loading?: boolean
  loadingIcon?: IconName
  trailingIcon?: IconName
  ui?: InputUI
}

export type InputFn<T> = () => T

export interface InputUI {
  root?: InputFn<HTMLAttributes>
  leading?: InputFn<HTMLAttributes>
  trailing?: InputFn<HTMLAttributes>
}

export interface InputEmits {
  'update:modelValue': [value: InputValue]
}

export interface InputSlots {
  leading?(): unknown
  loading?(): unknown
  trailing?(): unknown
}

export type NormalizeInputProps = InputProps & EmitsAsProps<InputEmits>
