import { cva } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import {
  bubbleDefaults,
  type bubbleAlignments,
  type bubbleReactionsAlignments,
  type bubbleReactionsSides,
  type bubbleSizes,
  type bubbleVariantNames,
} from './constants'

export { default as Bubble } from './Bubble.vue'
export {
  bubbleAlignments,
  bubbleDefaults,
  bubbleReactionsAlignments,
  bubbleReactionsSides,
  bubbleSizes,
  bubbleVariantNames,
} from './constants'

export type BubbleAlign = (typeof bubbleAlignments)[number]
export type BubbleVariant = (typeof bubbleVariantNames)[number]
export type BubbleSize = (typeof bubbleSizes)[number]
export type BubbleRadius = string | number
export type BubbleReactionsSide = (typeof bubbleReactionsSides)[number]
export type BubbleReactionsAlign = (typeof bubbleReactionsAlignments)[number]

export const bubbleVariants = cva('relative flex w-fit max-w-[80%]', {
  variants: {
    align: {
      start: 'self-start',
      end: 'self-end',
    } satisfies Record<BubbleAlign, string>,
  },
  defaultVariants: {
    align: bubbleDefaults.align,
  },
})

export const bubbleSurfaceVariants = cva(
  'block w-full rounded-(--bubble-radius) border shadow-sm',
  {
    variants: {
      variant: {
        solid: 'border-transparent bg-(--bubble-solid) text-(--bubble-solid-foreground)',
        outline: 'border-(--bubble-color)/40 bg-transparent text-(--bubble-color)',
        plain: 'border-transparent bg-transparent text-(--bubble-color)',
        subtle: 'border-(--bubble-color)/20 bg-(--bubble-color)/10 text-(--bubble-color)',
        soft: 'border-transparent bg-(--bubble-color)/10 text-(--bubble-color)',
      } satisfies Record<BubbleVariant, string>,
      size: {
        xs: 'px-2.5 py-1.5 text-xs',
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-5 py-3 text-base',
        xl: 'px-6 py-3.5 text-lg',
      } satisfies Record<BubbleSize, string>,
    },
    defaultVariants: {
      variant: bubbleDefaults.variant,
      size: bubbleDefaults.size,
    },
  },
)

export const bubbleReactionsVariants = cva(
  'absolute flex items-center gap-1 rounded-full bg-background px-1 py-0.5 text-xs shadow-sm',
  {
    variants: {
      side: {
        top: '-top-3',
        bottom: '-bottom-3',
      } satisfies Record<BubbleReactionsSide, string>,
      align: {
        start: 'start-2',
        end: 'end-2',
      } satisfies Record<BubbleReactionsAlign, string>,
    },
    defaultVariants: {
      side: bubbleDefaults.reactionsSide,
      align: bubbleDefaults.reactionsAlign,
    },
  },
)

// Props
export interface BubbleProps extends Pick<PrimitiveProps, 'as' | 'asChild'> {
  align?: BubbleAlign
  variant?: BubbleVariant
  size?: BubbleSize
  radius?: BubbleRadius
  color?: string
  reactionsSide?: BubbleReactionsSide
  reactionsAlign?: BubbleReactionsAlign
  ui?: BubbleUI
}

// Fn
export type BubbleFn<T> = () => T

// UI
export interface BubbleUI {
  surface?: BubbleFn<HTMLAttributes>
  reactions?: BubbleFn<HTMLAttributes>
}

// Slots
export interface BubbleSlots {
  default?(): unknown
  reactions?(): unknown
}
