import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { SliderRootProps as RekaSliderRootProps } from 'reka-ui'

export { default as Slider } from './Slider.vue'

export const sliderVariants = cva('relative flex w-full touch-none select-none', {
  variants: {
    orientation: {
      horizontal: 'items-center',
      vertical: 'h-full w-auto flex-col',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
})

export const sliderTrackVariants = cva('relative grow overflow-hidden rounded-full bg-secondary', {
  variants: {
    orientation: { horizontal: 'w-full', vertical: 'h-full' },
    size: { xs: '', sm: '', md: '', lg: '', xl: '' },
    severity: {
      primary: 'bg-primary/20',
      secondary: 'bg-secondary/20',
      success: 'bg-success/20',
      warning: 'bg-warning/20',
      error: 'bg-error/20',
    },
    color: {
      true: 'bg-(--slider-color)/20',
      false: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'xs', class: 'h-[7px]' },
    { orientation: 'horizontal', size: 'sm', class: 'h-2' },
    { orientation: 'horizontal', size: 'md', class: 'h-[9px]' },
    { orientation: 'horizontal', size: 'lg', class: 'h-[10px]' },
    { orientation: 'horizontal', size: 'xl', class: 'h-[11px]' },
    { orientation: 'vertical', size: 'xs', class: 'w-[7px]' },
    { orientation: 'vertical', size: 'sm', class: 'w-2' },
    { orientation: 'vertical', size: 'md', class: 'w-[9px]' },
    { orientation: 'vertical', size: 'lg', class: 'w-[10px]' },
    { orientation: 'vertical', size: 'xl', class: 'w-[11px]' },
  ],
  defaultVariants: { orientation: 'horizontal', size: 'md', severity: 'primary' },
})

export const sliderRangeVariants = cva('absolute h-full', {
  variants: {
    orientation: { horizontal: '', vertical: 'h-auto w-full' },
    severity: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
    },
    color: {
      true: 'bg-(--slider-color)',
      false: '',
    },
  },
  defaultVariants: { orientation: 'horizontal', severity: 'primary' },
})

export const sliderThumbVariants = cva(
  'shrink-0 rounded-full border-2 border-primary bg-background shadow-sm transition-colors active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        xs: 'block size-3.5',
        sm: 'block size-4',
        md: 'block size-4.5',
        lg: 'block size-5',
        xl: 'block size-5.5',
      },
      disabled: {
        true: '!cursor-default disabled:active:!cursor-default',
        false: 'cursor-grab',
      },
      severity: {
        primary: 'border-primary focus-visible:ring-primary/50',
        secondary: 'border-secondary focus-visible:ring-secondary/50',
        success: 'border-success focus-visible:ring-success/50',
        warning: 'border-warning focus-visible:ring-warning/50',
        error: 'border-error focus-visible:ring-error/50',
      },
      color: {
        true: 'border-(--slider-color) focus-visible:ring-(--slider-color)',
        false: '',
      },
    },
    defaultVariants: { size: 'md', disabled: false, severity: 'primary' },
  },
)

export type SliderVariants = VariantProps<typeof sliderVariants>
export type SliderSize = NonNullable<VariantProps<typeof sliderThumbVariants>['size']>
export type SliderSeverity = NonNullable<VariantProps<typeof sliderTrackVariants>['severity']>

export type SliderValue = number[] | null
export type SliderRootProps = Pick<
  RekaSliderRootProps,
  | 'disabled'
  | 'orientation'
  | 'inverted'
  | 'min'
  | 'max'
  | 'step'
  | 'minStepsBetweenThumbs'
  | 'thumbAlignment'
  | 'name'
  | 'required'
>
export type SliderFn<T> = (context: SliderContext) => T
export type SliderThumbFn<T> = (context: SliderThumbContext) => T

export interface SliderUI {
  track?: SliderFn<HTMLAttributes>
  range?: SliderFn<HTMLAttributes>
  thumb?: SliderThumbFn<HTMLAttributes>
}

export interface SliderProps extends SliderRootProps {
  value?: SliderValue
  size?: SliderSize
  color?: string
  severity?: SliderSeverity
  ui?: SliderUI
}

export interface SliderContext {
  values: number[]
}

export interface SliderThumbContext extends SliderContext {
  index: number
  value: number
  first: boolean
  last: boolean
}
