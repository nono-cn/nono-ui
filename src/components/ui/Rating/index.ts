import { cva, type VariantProps } from 'class-variance-authority'
import type { RatingRootProps } from 'reka-ui'
import type { IconName } from '@/components/ui/Icon'

export { default as Rating } from './Rating.vue'

export const ratingRootVariants = cva('flex data-[disabled]:opacity-50', {
  variants: {
    size: {
      xs: 'gap-0.5',
      sm: 'gap-0.5',
      md: 'gap-1',
      lg: 'gap-1.5',
      xl: 'gap-2',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
  },
})

export const ratingItemVariants = cva('relative inline-flex transition-transform duration-150', {
  variants: {
    size: {
      xs: 'size-5',
      sm: 'size-6',
      md: 'size-8',
      lg: 'size-10',
      xl: 'size-12',
    },
    disabled: {
      true: '',
      false: 'hover:z-10 hover:-translate-y-1 hover:scale-110',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
})

export const ratingIndicatorVariants = cva(
  'group absolute inset-y-0 left-0 z-[var(--reka-rating-item-step-z-index)] flex w-[var(--reka-rating-item-step-width)] items-center overflow-hidden text-foreground opacity-[var(--reka-rating-item-step-opacity)] outline-none focus-visible:ring-2 focus-visible:ring-ring',
)

export const ratingIconVariants = cva(
  'absolute fill-transparent group-data-[state=active]:fill-current',
  {
    variants: {
      size: {
        xs: 'top-0.5 left-0.5 size-4',
        sm: 'top-0.5 left-0.5 size-5',
        md: 'top-1 left-1 size-6',
        lg: 'top-1 left-1 size-8',
        xl: 'top-1 left-1 size-10',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export type RatingSize = NonNullable<VariantProps<typeof ratingItemVariants>['size']>

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
> & {
  size?: RatingSize
  icon?: IconName
}

export interface RatingSlots {
  indicator(props: { item: number; step: number; percentage: number; iconClass: string }): unknown
}
