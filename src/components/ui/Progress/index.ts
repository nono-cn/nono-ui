import type { HTMLAttributes } from 'vue'
import type { ProgressRootProps as RekaProgressRootProps } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'

export { default as Progress } from './Progress.vue'

export type ProgressValue = number | null
export const progressVariants = cva(
  'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
  {
    variants: {
      severity: {
        primary: 'bg-primary/20',
        secondary: 'bg-secondary/20',
        success: 'bg-success/20',
        warning: 'bg-warning/20',
        error: 'bg-error/20',
      },
      size: {
        '2xs': 'h-px',
        xs: 'h-0.5',
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
        '2xl': 'h-5',
      },
    },
    defaultVariants: { severity: 'primary', size: 'md' },
  },
)

export const progressIndicatorVariants = cva('h-full w-full flex-1 transition-all', {
  variants: {
    animation: {
      carousel: 'data-[state=indeterminate]:animate-[progress-carousel_2s_ease-in-out_infinite]',
      'carousel-inverse':
        'data-[state=indeterminate]:animate-[progress-carousel-inverse_2s_ease-in-out_infinite]',
      swing: 'data-[state=indeterminate]:animate-[progress-swing_2s_ease-in-out_infinite]',
      elastic: 'data-[state=indeterminate]:animate-[progress-elastic_2s_ease-in-out_infinite]',
    },
    severity: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
    },
  },
  defaultVariants: { animation: 'carousel', severity: 'primary' },
})

export type ProgressVariants = VariantProps<typeof progressVariants>
export type ProgressSize = NonNullable<ProgressVariants['size']>
export type ProgressSeverity = NonNullable<ProgressVariants['severity']>
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
  value?: ProgressValue
  label?: string
  color?: string
  trackColor?: string
  size?: ProgressSize
  severity?: ProgressSeverity
  animation?: ProgressAnimation
  ui?: ProgressUI
}

export interface ProgressContext {
  value: ProgressValue
  max: number
  percentage: number
}

export interface ProgressSlots {
  label?(props: ProgressContext): unknown
}
