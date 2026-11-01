import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { SliderRootProps as RekaSliderRootProps } from 'reka-ui'
import {
  sliderDefaults,
  type sliderOrientations,
  type sliderSizes,
  type sliderThumbAlignments,
} from './constants'

export { default as Slider } from './Slider.vue'
export { sliderDefaults, sliderOrientations, sliderSizes, sliderThumbAlignments } from './constants'

type Sizes = (typeof sliderSizes)[number]
type Orientations = (typeof sliderOrientations)[number]

export const sliderVariants = cva('relative flex touch-none items-center select-none', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full flex-col',
    } satisfies Record<Orientations, string>,
    disabled: {
      true: 'cursor-not-allowed opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    orientation: sliderDefaults.orientation,
    disabled: sliderDefaults.disabled,
  },
})

export const sliderTrackVariants = cva(
  'relative grow overflow-hidden rounded-full bg-(--slider-color)/20',
  {
    variants: {
      orientation: {
        horizontal: 'w-full',
        vertical: 'h-full',
      } satisfies Record<Orientations, string>,
      size: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      } satisfies Record<Sizes, string>,
    },
    compoundVariants: [
      { orientation: 'horizontal', size: 'xs', class: 'h-1' },
      { orientation: 'horizontal', size: 'sm', class: 'h-1.5' },
      { orientation: 'horizontal', size: 'md', class: 'h-2' },
      { orientation: 'horizontal', size: 'lg', class: 'h-2.5' },
      { orientation: 'horizontal', size: 'xl', class: 'h-3' },
      { orientation: 'vertical', size: 'xs', class: 'w-1' },
      { orientation: 'vertical', size: 'sm', class: 'w-1.5' },
      { orientation: 'vertical', size: 'md', class: 'w-2' },
      { orientation: 'vertical', size: 'lg', class: 'w-2.5' },
      { orientation: 'vertical', size: 'xl', class: 'w-3' },
    ],
    defaultVariants: {
      orientation: sliderDefaults.orientation,
      size: sliderDefaults.size,
    },
  },
)

export const sliderRangeVariants = cva('absolute bg-(--slider-color)', {
  variants: {
    orientation: {
      horizontal: 'h-full',
      vertical: 'w-full',
    } satisfies Record<Orientations, string>,
  },
  defaultVariants: {
    orientation: sliderDefaults.orientation,
  },
})

export const sliderThumbVariants = cva(
  'block shrink-0 rounded-full border-2 border-(--slider-color) bg-background shadow-sm transition-[color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-(--slider-color)/50',
  {
    variants: {
      size: {
        xs: 'size-3',
        sm: 'size-3.5',
        md: 'size-4',
        lg: 'size-5',
        xl: 'size-6',
      } satisfies Record<Sizes, string>,
      disabled: {
        true: 'cursor-not-allowed',
        false: 'cursor-grab active:cursor-grabbing',
      },
    },
    defaultVariants: {
      size: sliderDefaults.size,
      disabled: sliderDefaults.disabled,
    },
  },
)

// Variants
export type SliderVariants = VariantProps<typeof sliderTrackVariants>
export type SliderSize = Sizes
export type SliderOrientation = Orientations
export type SliderThumbAlignment = (typeof sliderThumbAlignments)[number]

// Props
export type SliderRootProps = Pick<
  RekaSliderRootProps,
  'min' | 'max' | 'step' | 'minStepsBetweenThumbs' | 'inverted' | 'disabled' | 'name' | 'required'
>

export interface SliderProps extends SliderRootProps {
  modelValue?: number[]
  orientation?: SliderOrientation
  thumbAlignment?: SliderThumbAlignment
  size?: SliderSize
  color?: string
  ui?: SliderUI
}

// Context
export interface SliderContext {
  value: number[]
  disabled: boolean
}

export interface SliderThumbContext {
  value: number
  index: number
  disabled: boolean
}

// Fn
export type SliderFn<T> = (context: SliderContext) => T
export type SliderThumbFn<T> = (context: SliderThumbContext) => T

// UI
export interface SliderUI {
  track?: SliderFn<HTMLAttributes>
  range?: SliderFn<HTMLAttributes>
  thumb?: SliderThumbFn<HTMLAttributes>
}

// Emits
export interface SliderEmits {
  'update:modelValue': [value: number[]]
  change: [value: number[]]
}
