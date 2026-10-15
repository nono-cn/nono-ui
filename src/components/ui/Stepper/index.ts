import { cva } from 'class-variance-authority'
import { stepperDefaults, stepperSizes } from './constants'
import type { HTMLAttributes } from 'vue'
import type { StepperRootProps as RekaStepperRootProps } from 'reka-ui'
import type { IconName } from '@/components/ui/Icon'

export { default as Stepper } from './Stepper.vue'
export { stepperDefaults, stepperOrientations, stepperSizes } from './constants'

export type StepperSize = (typeof stepperSizes)[number]

export const stepperVariants = cva('block w-full', {
  variants: {
    size: {
      xs: '[--stepper-indicator-size:1.5rem] [--stepper-gap:0.5rem] [--stepper-spacing:1rem]',
      sm: '[--stepper-indicator-size:2rem] [--stepper-gap:0.625rem] [--stepper-spacing:1.25rem]',
      md: '[--stepper-indicator-size:2.5rem] [--stepper-gap:0.75rem] [--stepper-spacing:1.5rem]',
      lg: '[--stepper-indicator-size:3rem] [--stepper-gap:0.875rem] [--stepper-spacing:1.75rem]',
      xl: '[--stepper-indicator-size:3.5rem] [--stepper-gap:1rem] [--stepper-spacing:2rem]',
    } satisfies Record<StepperSize, string>,
  },
  defaultVariants: { size: stepperDefaults.size },
})
export const stepperListVariants = cva('flex w-full', {
  variants: {
    orientation: { vertical: 'flex-col', horizontal: 'items-start gap-(--stepper-list-gap)' },
    size: {
      xs: '[--stepper-list-gap:0.25rem]',
      sm: '[--stepper-list-gap:0.375rem]',
      md: '[--stepper-list-gap:0.5rem]',
      lg: '[--stepper-list-gap:0.625rem]',
      xl: '[--stepper-list-gap:0.75rem]',
    } satisfies Record<StepperSize, string>,
  },
  defaultVariants: { orientation: stepperDefaults.orientation, size: stepperDefaults.size },
})

export type StepperState = 'active' | 'completed' | 'inactive'

export const stepperItemVariants = cva('flex items-center gap-2', {
  variants: {
    orientation: {
      vertical: 'relative flex w-full items-start gap-4 pb-(--stepper-spacing) last:pb-0',
      horizontal: 'relative flex min-w-0 flex-1 basis-0 flex-col items-center justify-start',
    },
    disabled: { true: 'pointer-events-none', false: '' },
  },
  defaultVariants: { orientation: stepperDefaults.orientation, disabled: false },
})

export const stepperTriggerVariants = cva(
  'group/stepper-trigger flex min-w-0 flex-col items-center gap-1 rounded-md p-1 text-center z-10 outline-none',
  {
    variants: {
      orientation: {
        vertical: 'w-full flex-row items-start gap-(--stepper-gap) p-0 text-left',
        horizontal: 'w-full',
      },
    },
    defaultVariants: { orientation: stepperDefaults.orientation },
  },
)

export const stepperIndicatorVariants = cva(
  'inline-flex size-(--stepper-indicator-size) shrink-0 items-center justify-center rounded-full transition-colors group-focus-visible/stepper-trigger:ring-3 group-focus-visible/stepper-trigger:ring-(--stepper-color)/50',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-xl',
        xl: 'text-2xl',
      } satisfies Record<StepperSize, string>,
      state: {
        active: 'bg-(--stepper-color) text-(--stepper-color-foreground)',
        completed: 'bg-(--stepper-color) text-(--stepper-color-foreground)',
        inactive: 'bg-muted text-muted-foreground',
      } satisfies Record<StepperState, string>,
      disabled: { true: 'opacity-50', false: '' },
    },
    defaultVariants: { size: stepperDefaults.size, state: 'inactive', disabled: false },
  },
)

export const stepperWrapperVariants = cva('flex min-w-0 flex-1 flex-col', {
  variants: {
    orientation: { vertical: '', horizontal: 'w-full items-center' },
  },
  defaultVariants: { orientation: stepperDefaults.orientation },
})

export const stepperLabelVariants = cva('font-semibold', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    } satisfies Record<StepperSize, string>,
    orientation: {
      vertical: 'whitespace-normal',
      horizontal: 'w-full break-words whitespace-normal text-center',
    },
  },
  defaultVariants: { orientation: stepperDefaults.orientation, size: stepperDefaults.size },
})

export const stepperDescriptionVariants = cva('text-muted-foreground', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
      xl: 'text-base',
    } satisfies Record<StepperSize, string>,
    orientation: { vertical: '', horizontal: 'w-full break-words text-center' },
  },
  defaultVariants: { orientation: stepperDefaults.orientation, size: stepperDefaults.size },
})

export const stepperSeparatorVariants = cva('absolute rounded-full transition-colors', {
  variants: {
    state: {
      active: 'bg-muted',
      completed: 'bg-(--stepper-color)',
      inactive: 'bg-muted',
    } satisfies Record<StepperState, string>,
    disabled: { true: 'opacity-50', false: '' },
    orientation: {
      vertical:
        'top-(--stepper-indicator-size) left-[calc(var(--stepper-indicator-size)/2)] -bottom-[calc(var(--stepper-indicator-size)/2)] w-0.5 -translate-x-1/2',
      horizontal:
        'top-[calc(var(--stepper-indicator-size)/2+var(--spacing))] right-[calc(-50%-var(--stepper-list-gap)+var(--stepper-indicator-size)/2)] left-[calc(50%+var(--stepper-indicator-size)/2)] h-0.5 shrink-0 -translate-y-1/2',
    },
  },
  defaultVariants: { orientation: stepperDefaults.orientation, state: 'inactive', disabled: false },
})

export const stepperContentVariants = cva('mt-(--stepper-spacing)', {
  variants: {
    orientation: {
      vertical: 'ml-[calc(var(--stepper-indicator-size)+var(--stepper-gap))]',
      horizontal: '',
    },
  },
  defaultVariants: { orientation: stepperDefaults.orientation },
})

export type StepperRootProps = Pick<RekaStepperRootProps, 'orientation' | 'linear'>
export function normalizeStepperRootProps(
  source: StepperRootProps | null | undefined,
): StepperRootProps | undefined {
  if (!source) return undefined
  const { orientation, linear } = source
  return { orientation, linear }
}

export interface StepperStep {
  value: number
  disabled?: boolean
  slot?: string | number
  label?: string
  description?: string
  icon?: IconName
}

export interface StepperProps extends StepperRootProps {
  size?: StepperSize
  disabled?: boolean
  modelValue?: number
  steps?: StepperStep[]
  color?: string
  ui?: StepperUI
}

export type StepperFn<T> = (context: StepperContext) => T
export type StepperItemFn<T> = (context: StepperItemContext) => T

export interface StepperUI {
  list?: StepperFn<HTMLAttributes>
  item?: StepperItemFn<HTMLAttributes>
  trigger?: StepperItemFn<HTMLAttributes>
  indicator?: StepperItemFn<HTMLAttributes>
  wrapper?: StepperItemFn<HTMLAttributes>
  label?: StepperItemFn<HTMLAttributes>
  description?: StepperItemFn<HTMLAttributes>
  separator?: StepperItemFn<HTMLAttributes>
  content?: StepperItemFn<HTMLAttributes>
}

export interface StepperContext {
  modelValue: number | undefined
  totalSteps: number
  isNextDisabled: boolean
  isPrevDisabled: boolean
  isFirstStep: boolean
  isLastStep: boolean
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  hasNext: () => boolean
  hasPrev: () => boolean
}

export interface StepperItemContext extends StepperContext {
  item: StepperStep
  index: number
  completed: boolean
  active: boolean
  first: boolean
  last: boolean
}

export interface StepperEmits {
  'update:modelValue': [value: number | undefined]
}

export type StepperSlots = {
  indicator?(props: StepperItemContext): unknown
  label?(props: StepperItemContext): unknown
  description?(props: StepperItemContext): unknown
  content?(props: StepperItemContext): unknown
} & {
  [name: `indicator-${string}`]: ((props: StepperItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: StepperItemContext) => unknown) | undefined
  [name: `description-${string}`]: ((props: StepperItemContext) => unknown) | undefined
  [name: `content-${string}`]: ((props: StepperItemContext) => unknown) | undefined
}
