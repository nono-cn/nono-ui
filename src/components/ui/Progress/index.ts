import type { HTMLAttributes } from 'vue'
import type { ProgressRootProps as RekaProgressRootProps } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  progressAnimations,
  progressDefaults,
  progressOrientations,
  progressSizes,
} from './constants'

export { default as Progress } from './Progress.vue'
export {
  progressAnimations,
  progressDefaults,
  progressOrientations,
  progressSizes,
} from './constants'

export type ProgressValue = number | null
export const progressVariants = cva('relative w-full overflow-hidden rounded-full', {
  variants: {
    trackColor: {
      true: 'bg-(--progress-track-color)',
      false: 'bg-(--progress-color)/20',
    },
    orientation: {
      horizontal: '',
      vertical: '!h-full',
    } satisfies Record<(typeof progressOrientations)[number], string>,
    inverted: { true: '', false: '' },
    size: {
      '2xs': 'h-px',
      xs: 'h-0.5',
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
      xl: 'h-4',
      '2xl': 'h-5',
    } satisfies Record<(typeof progressSizes)[number], string>,
  },
  compoundVariants: [
    { orientation: 'vertical', size: '2xs', class: 'w-px' },
    { orientation: 'vertical', size: 'xs', class: 'w-0.5' },
    { orientation: 'vertical', size: 'sm', class: 'w-1' },
    { orientation: 'vertical', size: 'md', class: 'w-2' },
    { orientation: 'vertical', size: 'lg', class: 'w-3' },
    { orientation: 'vertical', size: 'xl', class: 'w-4' },
    { orientation: 'vertical', size: '2xl', class: 'w-5' },
  ],
  defaultVariants: {
    orientation: progressDefaults.orientation,
    inverted: false,
    size: progressDefaults.size,
    trackColor: false,
  },
})

export const progressIndicatorVariants = cva(
  'h-full w-full flex-1 bg-(--progress-color) transition-all',
  {
    variants: {
      animation: {
        carousel: '',
        'carousel-inverse': '',
        swing: '',
        elastic: '',
      } satisfies Record<(typeof progressAnimations)[number], string>,
      orientation: {
        horizontal: '',
        vertical: '',
      } satisfies Record<(typeof progressOrientations)[number], string>,
    },
    compoundVariants: [
      {
        orientation: 'horizontal',
        animation: 'carousel',
        class: 'data-[state=indeterminate]:animate-[progress-carousel_2s_ease-in-out_infinite]',
      },
      {
        orientation: 'horizontal',
        animation: 'carousel-inverse',
        class:
          'data-[state=indeterminate]:animate-[progress-carousel-inverse_2s_ease-in-out_infinite]',
      },
      {
        orientation: 'horizontal',
        animation: 'swing',
        class: 'data-[state=indeterminate]:animate-[progress-swing_2s_ease-in-out_infinite]',
      },
      {
        orientation: 'horizontal',
        animation: 'elastic',
        class: 'data-[state=indeterminate]:animate-[progress-elastic_2s_ease-in-out_infinite]',
      },
      {
        orientation: 'vertical',
        animation: 'carousel',
        class:
          'data-[state=indeterminate]:animate-[progress-carousel-vertical_2s_ease-in-out_infinite]',
      },
      {
        orientation: 'vertical',
        animation: 'carousel-inverse',
        class:
          'data-[state=indeterminate]:animate-[progress-carousel-inverse-vertical_2s_ease-in-out_infinite]',
      },
      {
        orientation: 'vertical',
        animation: 'swing',
        class:
          'data-[state=indeterminate]:animate-[progress-swing-vertical_2s_ease-in-out_infinite]',
      },
      {
        orientation: 'vertical',
        animation: 'elastic',
        class:
          'data-[state=indeterminate]:animate-[progress-elastic-vertical_2s_ease-in-out_infinite]',
      },
    ],
    defaultVariants: {
      animation: progressDefaults.animation,
      orientation: progressDefaults.orientation,
    },
  },
)

export const progressLabelVariants = cva(
  'pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-2 text-center font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0),0_0_7px_rgb(0_0_0/0.9),0_0_12px_rgb(0_0_0/0.7)]',
  {
    variants: {
      size: {
        '2xs': 'text-[10px]',
        xs: 'text-[10px]',
        sm: 'text-xs',
        md: 'text-xs',
        lg: 'text-sm',
        xl: 'text-sm',
        '2xl': 'text-base',
      } satisfies Record<(typeof progressSizes)[number], string>,
    },
    defaultVariants: { size: progressDefaults.size },
  },
)

export type ProgressVariants = VariantProps<typeof progressVariants>
export type ProgressSize = NonNullable<ProgressVariants['size']>
export type ProgressOrientation = NonNullable<ProgressVariants['orientation']>
export type ProgressLabelSize = NonNullable<VariantProps<typeof progressLabelVariants>['size']>
export type ProgressAnimation = NonNullable<
  VariantProps<typeof progressIndicatorVariants>['animation']
>
export type ProgressRootProps = Pick<
  RekaProgressRootProps,
  'max' | 'getValueLabel' | 'getValueText'
>

export type ProgressFn<T> = (context: ProgressContext) => T

export interface ProgressUI {
  indicator?: ProgressFn<HTMLAttributes>
  label?: ProgressFn<HTMLAttributes>
}

export interface ProgressProps extends ProgressRootProps {
  modelValue?: ProgressValue
  label?: string
  color?: string
  trackColor?: string
  size?: ProgressSize
  animation?: ProgressAnimation
  orientation?: ProgressOrientation
  inverted?: ProgressVariants['inverted'] | boolean
  ui?: ProgressUI
}

export interface ProgressContext {
  value: ProgressValue
  max: number
  percentage: number
}

export interface ProgressSlots {
  indicator?(props: ProgressContext): unknown
  label?(props: ProgressContext): unknown
}
