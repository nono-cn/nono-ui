import type { HTMLAttributes, SVGAttributes } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ProgressRootProps, ProgressValue } from '@/components/ui/Progress'
import { progressCircularDefaults, type progressCircularSizes } from './constants'

export { default as ProgressCircular } from './ProgressCircular.vue'
export { progressCircularDefaults, progressCircularSizes } from './constants'

type Sizes = (typeof progressCircularSizes)[number]

export const progressCircularVariants = cva(
  'group relative inline-grid shrink-0 place-items-center',
  {
    variants: {
      size: {
        xs: 'size-8',
        sm: 'size-12',
        md: 'size-16',
        lg: 'size-20',
        xl: 'size-24',
      } satisfies Record<Sizes, string>,
    },
    defaultVariants: { size: progressCircularDefaults.size },
  },
)

export const progressCircularSvgVariants = cva(
  'size-full -rotate-90 group-data-[state=indeterminate]:animate-spin',
)

export const progressCircularTrackVariants = cva('fill-none', {
  variants: {
    trackColor: {
      true: 'stroke-(--progress-circular-track-color)',
      false: 'stroke-(--progress-circular-color)/20',
    },
  },
  defaultVariants: { trackColor: false },
})

export const progressCircularIndicatorVariants = cva(
  'fill-none stroke-(--progress-circular-color) transition-[stroke-dashoffset] duration-300 ease-out',
)

export const progressCircularLabelVariants = cva(
  'pointer-events-none absolute inset-0 flex items-center justify-center text-center font-semibold',
  {
    variants: {
      size: {
        xs: 'text-[0.5rem]',
        sm: 'text-[0.625rem]',
        md: 'text-xs',
        lg: 'text-sm',
        xl: 'text-base',
      } satisfies Record<Sizes, string>,
    },
    defaultVariants: { size: progressCircularDefaults.size },
  },
)

export type ProgressCircularVariants = VariantProps<typeof progressCircularVariants>
export type ProgressCircularSize = NonNullable<ProgressCircularVariants['size']>

export type ProgressCircularFn<T> = (context: ProgressCircularContext) => T

// Ui
export interface ProgressCircularUI {
  svg?: ProgressCircularFn<SVGAttributes>
  track?: ProgressCircularFn<SVGAttributes>
  indicator?: ProgressCircularFn<SVGAttributes>
  label?: ProgressCircularFn<HTMLAttributes>
}

// Props
export interface ProgressCircularProps extends ProgressRootProps {
  modelValue?: ProgressValue
  label?: string
  color?: string
  trackColor?: string
  size?: ProgressCircularSize
  thickness?: number
  ui?: ProgressCircularUI
}

// Context
export interface ProgressCircularContext {
  value: ProgressValue
  max: number
  percentage: number
}

// Slots
export interface ProgressCircularSlots {
  label?(props: ProgressCircularContext): unknown
}
