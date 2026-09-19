import { cva, type VariantProps } from 'class-variance-authority'

export const textareaVariants = cva('', {
  variants: {
    autoresize: {
      true: 'field-sizing-content',
      false: 'field-sizing-fixed',
    },
  },
  defaultVariants: {
    autoresize: false,
  },
})

export type TextareaVariants = VariantProps<typeof textareaVariants>

export { default as Textarea } from './Textarea.vue'

export type TextareaValue = string

// Props
export interface TextareaProps {
  value?: TextareaValue
  autoresize?: TextareaVariants['autoresize']
}

// Emits
export interface TextareaEmits {
  'update:value': [value: TextareaValue]
}
