import { cva } from 'class-variance-authority'
import type { RatingRootProps } from 'reka-ui'

export { default as Rating } from './Rating.vue'

export const ratingRootVariants = cva('flex gap-1 data-[disabled]:opacity-50', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

export const ratingItemVariants = cva(
  'relative inline-flex size-8 transition-transform duration-150',
  {
    variants: {
      disabled: {
        true: '',
        false: 'hover:z-10 hover:-translate-y-1 hover:scale-110',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
)

export const ratingIndicatorVariants = cva(
  'group absolute inset-y-0 left-0 z-[var(--reka-rating-item-step-z-index)] flex w-[var(--reka-rating-item-step-width)] items-center overflow-hidden text-foreground opacity-[var(--reka-rating-item-step-opacity)] outline-none focus-visible:ring-2 focus-visible:ring-ring',
)

export const ratingIconVariants = cva(
  'absolute top-1 left-1 size-6 fill-transparent group-data-[state=active]:fill-current',
)

export type RatingProps = Pick<
  RatingRootProps,
  | 'modelValue'
  | 'length'
  | 'clearable'
  | 'hoverable'
  | 'loop'
  | 'disabled'
  | 'required'
  | 'name'
  | 'step'
  | 'orientation'
>
