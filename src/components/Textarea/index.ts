import { cva, type VariantProps } from 'class-variance-authority'
import type { EmitsAsProps } from '@/types/emits'
import { textareaDefaults, textareaSizes, textareaVariantNames } from './constants'

export { default as Textarea } from './Textarea.vue'
export { textareaDefaults, textareaSizes, textareaVariantNames } from './constants'

export const textareaVariants = cva(
  'flex w-full border bg-transparent outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-(--textarea-color) focus-visible:ring-3 focus-visible:ring-(--textarea-color)/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      autoresize: {
        true: 'field-sizing-content',
        false: 'field-sizing-fixed',
      },
      size: {
        xs: 'min-h-14 px-2 py-1 text-sm',
        sm: 'min-h-16 px-2.5 py-1.5 text-sm',
        md: 'min-h-20 px-3 py-2 text-base',
        lg: 'min-h-24 px-3 py-2.5 text-lg',
        xl: 'min-h-28 px-4 py-3 text-xl',
      } satisfies Record<(typeof textareaSizes)[number], string>,
      highlight: {
        true: '',
        false: 'border-input',
      },
      variant: {
        outline: 'rounded-md border bg-transparent shadow-xs',
        subtle: 'rounded-md border bg-muted shadow-xs',
        soft: 'rounded-md border-transparent bg-muted/50 shadow-none hover:bg-muted focus:bg-muted disabled:bg-muted/50',
        plain: 'rounded-md border-transparent bg-transparent shadow-none',
        none: 'rounded-md border-0 bg-transparent shadow-none',
      } satisfies Record<(typeof textareaVariantNames)[number], string>,
    },
    compoundVariants: [
      { variant: 'none', class: 'focus-visible:border-0 focus-visible:ring-0' },
      { variant: ['outline', 'plain'], highlight: true, class: 'border-(--textarea-color)/40' },
      { variant: 'subtle', highlight: true, class: 'border-(--textarea-color)/20' },
      { variant: 'soft', highlight: true, class: 'border-(--textarea-color)/40' },
    ],
    defaultVariants: {
      autoresize: textareaDefaults.autoresize,
      size: textareaDefaults.size,
      highlight: textareaDefaults.highlight,
      variant: textareaDefaults.variant,
    },
  },
)

export type TextareaVariants = VariantProps<typeof textareaVariants>
export type TextareaSize = NonNullable<TextareaVariants['size']>
export type TextareaVariant = NonNullable<TextareaVariants['variant']>
export type TextareaValue = string

export interface TextareaProps {
  modelValue?: TextareaValue
  autoresize?: boolean
  size?: TextareaSize
  color?: string
  highlight?: boolean
  variant?: TextareaVariant
}

export interface TextareaEmits {
  'update:modelValue': [value: TextareaValue]
}

export type NormalizeTextareaProps = TextareaProps & EmitsAsProps<TextareaEmits>
