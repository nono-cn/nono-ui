import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { PrimitiveProps } from 'reka-ui'

export { default as Bubble } from './Bubble.vue'

export const bubbleWrapperVariants = cva('relative flex w-fit max-w-[80%]', {
  variants: {
    align: { start: 'self-start', end: 'self-end' },
  },
  defaultVariants: { align: 'start' },
})

export const bubbleVariants = cva('block w-full rounded-2xl border px-4 py-2.5 text-sm shadow-sm', {
  variants: {
    variant: {
      solid: 'border-transparent bg-(--bubble-solid) text-(--bubble-solid-foreground)',
      outline: 'border-(--bubble-color)/40 bg-transparent text-(--bubble-color)',
      plain: 'border-transparent bg-transparent text-(--bubble-color)',
      subtle: 'border-(--bubble-color)/20 bg-(--bubble-color)/10 text-(--bubble-color)',
      soft: 'border-transparent bg-(--bubble-color)/10 text-(--bubble-color)',
      muted: 'border-muted bg-muted text-muted-foreground',
    },
    severity: {
      primary:
        '[--bubble-color:var(--primary)] [--bubble-solid:var(--primary)] [--bubble-solid-foreground:var(--primary-foreground)]',
      secondary:
        '[--bubble-color:var(--secondary-foreground)] [--bubble-solid:var(--secondary)] [--bubble-solid-foreground:var(--secondary-foreground)]',
      warning:
        '[--bubble-color:var(--warning)] [--bubble-solid:var(--warning)] [--bubble-solid-foreground:var(--warning-foreground)]',
      success:
        '[--bubble-color:var(--success)] [--bubble-solid:var(--success)] [--bubble-solid-foreground:var(--success-foreground)]',
      error:
        '[--bubble-color:var(--error)] [--bubble-solid:var(--error)] [--bubble-solid-foreground:var(--error-foreground)]',
    },
    color: {
      true: '[--bubble-solid:var(--bubble-color)] [--bubble-solid-foreground:var(--bubble-color-foreground)]',
      false: '',
    },
  },
  defaultVariants: { variant: 'solid', severity: 'primary', color: false },
})

export type BubbleVariants = VariantProps<typeof bubbleVariants>
export type BubbleAlign = NonNullable<VariantProps<typeof bubbleWrapperVariants>['align']>
export type BubbleVariant = NonNullable<BubbleVariants['variant']>
export type BubbleSeverity = NonNullable<BubbleVariants['severity']>
export type BubbleReactionsSide = 'top' | 'bottom'
export type BubbleReactionsAlign = 'start' | 'end'

export interface BubbleReactionsProps {
  side?: BubbleReactionsSide
  align?: BubbleReactionsAlign
}

export type BubbleFn<T> = () => T

export interface BubbleUI {
  reactions?: BubbleFn<HTMLAttributes>
}

export interface BubbleProps extends Pick<PrimitiveProps, 'as' | 'asChild'> {
  align?: BubbleAlign
  variant?: BubbleVariant
  severity?: BubbleSeverity
  color?: string
  sideReaction?: BubbleReactionsSide
  alignReaction?: BubbleReactionsAlign
  ui?: BubbleUI
}

export interface BubbleSlots {
  default?(): unknown
  reactions?(): unknown
}
