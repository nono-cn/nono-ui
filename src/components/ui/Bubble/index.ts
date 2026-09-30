import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import {
  bubbleAlignments,
  bubbleReactionsAlignments,
  bubbleReactionsSides,
  bubbleVariantNames,
} from './constants'
import { bubbleDefaults } from './defaults'

export { default as Bubble } from './Bubble.vue'
export {
  bubbleAlignments,
  bubbleReactionsAlignments,
  bubbleReactionsSides,
  bubbleVariantNames,
} from './constants'

export const bubbleWrapperVariants = cva('relative flex w-fit max-w-[80%]', {
  variants: {
    align: { start: 'self-start', end: 'self-end' } satisfies Record<
      (typeof bubbleAlignments)[number],
      string
    >,
  },
  defaultVariants: { align: bubbleDefaults.align },
})

export const bubbleVariants = cva(
  'block w-full rounded-(--bubble-radius) border px-4 py-2.5 text-sm shadow-sm',
  {
    variants: {
      variant: {
        solid: 'border-transparent bg-(--bubble-solid) text-(--bubble-solid-foreground)',
        outline: 'border-(--bubble-color)/40 bg-transparent text-(--bubble-color)',
        plain: 'border-transparent bg-transparent text-(--bubble-color)',
        subtle: 'border-(--bubble-color)/20 bg-(--bubble-color)/10 text-(--bubble-color)',
        soft: 'border-transparent bg-(--bubble-color)/10 text-(--bubble-color)',
      } satisfies Record<(typeof bubbleVariantNames)[number], string>,
    },
    defaultVariants: { variant: bubbleDefaults.variant },
  },
)

export type BubbleVariants = VariantProps<typeof bubbleVariants>
export type BubbleAlign = NonNullable<VariantProps<typeof bubbleWrapperVariants>['align']>
export type BubbleVariant = NonNullable<BubbleVariants['variant']>
export type BubbleRadius = string | number
export type BubbleReactionsSide = (typeof bubbleReactionsSides)[number]
export type BubbleReactionsAlign = (typeof bubbleReactionsAlignments)[number]

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
  radius?: BubbleRadius
  color?: string
  sideReaction?: BubbleReactionsSide
  alignReaction?: BubbleReactionsAlign
  ui?: BubbleUI
}

export interface BubbleSlots {
  default?(): unknown
  reactions?(): unknown
}
