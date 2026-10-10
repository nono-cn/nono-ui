import { cva } from 'class-variance-authority'
import type { RatingRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { IconName } from '@/components/ui/Icon'
import { ratingDefaults, ratingOrientations, ratingSizes } from './constants'

export { default as Rating } from './Rating.vue'
export { ratingDefaults, ratingOrientations, ratingSizes } from './constants'

export const ratingRootVariants = cva('flex', {
  variants: {
    disabled: {
      true: 'opacity-50',
      false: '',
    },
    readonly: {
      true: 'opacity-100',
      false: '',
    },
    size: {
      xs: 'gap-0.5',
      sm: 'gap-0.5',
      md: 'gap-1',
      lg: 'gap-1.5',
      xl: 'gap-2',
    } satisfies Record<(typeof ratingSizes)[number], string>,
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    } satisfies Record<(typeof ratingOrientations)[number], string>,
  },
  defaultVariants: {
    disabled: false,
    readonly: false,
    size: ratingDefaults.size,
    orientation: ratingDefaults.orientation,
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
    size: ratingDefaults.size,
    disabled: false,
  },
})

export const ratingIndicatorVariants = cva(
  'group absolute inset-y-0 left-0 z-[var(--reka-rating-item-step-z-index)] flex w-[var(--reka-rating-item-step-width)] items-center overflow-hidden rounded-md opacity-[var(--reka-rating-item-step-opacity)] text-(--rating-color) outline-none focus-visible:ring-2 focus-visible:ring-(--rating-color)/60',
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
    defaultVariants: { size: ratingDefaults.size },
  },
)

export type RatingSize = (typeof ratingSizes)[number]

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
  readonly?: boolean
  size?: RatingSize
  color?: string
  icon?: IconName
  ui?: RatingUI
}

export interface RatingItemContext {
  item: number
  step: number
  percentage: number
  iconClass: string
}

export type RatingFn<T> = (context: RatingItemContext) => T

export interface RatingUI {
  item?: RatingFn<HTMLAttributes>
  indicator?: RatingFn<HTMLAttributes>
}

export interface RatingSlots {
  item(props: RatingItemContext): unknown
}
