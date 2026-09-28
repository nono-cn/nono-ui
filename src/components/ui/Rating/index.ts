import { cva } from 'class-variance-authority'
import type { RatingRootProps } from 'reka-ui'

export { default as Rating } from './Rating.vue'

export const ratingItemVariants = cva('relative inline-flex transition-transform duration-150', {
  variants: {
    disabled: {
      true: '',
      false: 'hover:z-10 hover:-translate-y-1 hover:scale-110',
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export type RatingProps = Pick<
  RatingRootProps,
  'modelValue' | 'length' | 'clearable' | 'hoverable' | 'loop' | 'disabled' | 'required' | 'name'
>
