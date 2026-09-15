import type { HTMLAttributes } from 'vue'
import type { ProgressRootProps as RekaProgressRootProps } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'

export { default as Progress } from './Progress.vue'

export type ProgressValue = number | null
export const progressVariants = cva(
  'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
  {
    variants: {
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
    defaultVariants: { size: 'md' },
  },
)

export type ProgressVariants = VariantProps<typeof progressVariants>
export type ProgressSize = NonNullable<ProgressVariants['size']>
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
