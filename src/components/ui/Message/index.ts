import { cva } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { AvatarProps } from '@/components/ui/Avatar'
import type { BubbleProps, BubbleReactionsSide } from '@/components/ui/Bubble'
import { messageDefaults, type messageAligns } from './constants'

export { default as Message } from './Message.vue'
export { messageAligns, messageDefaults } from './constants'

export type MessageAlign = (typeof messageAligns)[number]

export const messageVariants = cva('flex w-full items-start gap-2', {
  variants: {
    align: {
      start: 'flex-row',
      end: 'flex-row-reverse',
    } satisfies Record<MessageAlign, string>,
  },
  defaultVariants: { align: messageDefaults.align },
})

export const messageAvatarVariants = cva('shrink-0')

export const messageContentVariants = cva('flex min-w-0 flex-1 flex-col gap-1', {
  variants: {
    align: {
      start: 'items-start text-start',
      end: 'items-end text-end',
    } satisfies Record<MessageAlign, string>,
  },
  defaultVariants: { align: messageDefaults.align },
})

export const messageBubbleVariants = cva('', {
  variants: {
    reactionsSide: {
      top: 'mt-3',
      bottom: 'mb-3',
    } satisfies Record<BubbleReactionsSide, string>,
  },
})

export const messageHeaderVariants = cva('text-xs font-medium text-muted-foreground')

export const messageFooterVariants = cva('text-xs text-muted-foreground')

// Props
export type MessageBubbleProps = Omit<BubbleProps, 'align'>

export interface MessageProps {
  align?: MessageAlign
  avatar?: AvatarProps
  bubble?: MessageBubbleProps
  message?: string
  ui?: MessageUI
}

// Fn
export type MessageFn<T> = () => T

// UI
export interface MessageUI {
  content?: MessageFn<HTMLAttributes>
  header?: MessageFn<HTMLAttributes>
  footer?: MessageFn<HTMLAttributes>
}

// Slots
export interface MessageSlots {
  avatar?(): unknown
  header?(): unknown
  default?(): unknown
  reactions?(): unknown
  footer?(): unknown
}
