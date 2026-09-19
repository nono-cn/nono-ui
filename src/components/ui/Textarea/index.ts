import { cva, type VariantProps } from 'class-variance-authority'

export const textareaVariants = cva('', {
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
    },
    severity: {
      primary: 'focus-visible:border-primary focus-visible:ring-primary/50',
      secondary:
        'focus-visible:border-secondary-foreground focus-visible:ring-secondary-foreground/20',
      error: 'focus-visible:border-error focus-visible:ring-error/30',
      warning: 'focus-visible:border-warning focus-visible:ring-warning/30',
      success: 'focus-visible:border-success focus-visible:ring-success/30',
    },
    color: {
      true: 'focus-visible:border-(--textarea-color) focus-visible:ring-(--textarea-color)/30',
      false: '',
    },
    highlight: {
      true: '',
      false: 'border-input',
    },
  },
  compoundVariants: [
    { highlight: true, severity: 'primary', class: 'border-primary/40' },
    { highlight: true, severity: 'secondary', class: 'border-secondary-foreground/30' },
    { highlight: true, severity: 'error', class: 'border-error/40' },
    { highlight: true, severity: 'warning', class: 'border-warning/40' },
    { highlight: true, severity: 'success', class: 'border-success/40' },
    { highlight: true, color: true, class: 'border-(--textarea-color)/40' },
  ],
  defaultVariants: {
    autoresize: false,
    size: 'md',
    severity: 'primary',
    color: false,
    highlight: false,
  },
})

export type TextareaVariants = VariantProps<typeof textareaVariants>

export { default as Textarea } from './Textarea.vue'

export type TextareaValue = string

// Props
export interface TextareaProps {
  value?: TextareaValue
  autoresize?: TextareaVariants['autoresize']
  size?: TextareaVariants['size']
  severity?: TextareaVariants['severity']
  color?: string
  highlight?: TextareaVariants['highlight']
}

// Emits
export interface TextareaEmits {
  'update:value': [value: TextareaValue]
}
