import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { IconName } from '@/components/ui/Icon'
import {
  attachmentMediaVariantNames,
  attachmentOrientationNames,
  attachmentSizes,
  attachmentStateNames,
} from './constants'

export { default as Attachment } from './Attachment.vue'
export {
  attachmentMediaVariantNames,
  attachmentOrientationNames,
  attachmentSizes,
  attachmentStateNames,
} from './constants'

export const attachmentVariants = cva(
  'group/attachment relative flex min-w-0 items-center overflow-hidden rounded-lg border bg-background text-foreground transition-colors',
  {
    variants: {
      orientation: {
        horizontal: 'w-fit max-w-full',
        vertical: 'w-40 flex-col items-stretch',
      } satisfies Record<(typeof attachmentOrientationNames)[number], string>,
      size: { md: '', sm: '', xs: '' } satisfies Record<(typeof attachmentSizes)[number], string>,
      state: {
        idle: 'border-dashed',
        uploading: '',
        processing: '',
        error: 'border-error/50 bg-error/5 text-error',
        done: '',
      } satisfies Record<(typeof attachmentStateNames)[number], string>,
    },
    compoundVariants: [
      { orientation: 'horizontal', size: 'md', class: 'gap-3 p-3' },
      { orientation: 'horizontal', size: 'sm', class: 'gap-2.5 p-2.5' },
      { orientation: 'horizontal', size: 'xs', class: 'gap-2 p-2' },
      { orientation: 'vertical', size: ['md', 'sm'], class: 'gap-2 p-2' },
      { orientation: 'vertical', size: 'xs', class: 'gap-1.5 p-1.5' },
    ],
    defaultVariants: { orientation: 'horizontal', size: 'md', state: 'idle' },
  },
)

export const attachmentMediaVariants = cva(
  'relative z-10 flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground [&_svg]:shrink-0',
  {
    variants: {
      orientation: { horizontal: '', vertical: '' } satisfies Record<
        (typeof attachmentOrientationNames)[number],
        string
      >,
      size: {
        md: 'size-10 [&_svg:not([class*=size-])]:size-5',
        sm: 'size-8 [&_svg:not([class*=size-])]:size-4',
        xs: 'size-6 [&_svg:not([class*=size-])]:size-3.5',
      } satisfies Record<(typeof attachmentSizes)[number], string>,
      variant: { icon: '', image: '[&_img]:size-full [&_img]:object-cover' } satisfies Record<
        (typeof attachmentMediaVariantNames)[number],
        string
      >,
      state: {
        idle: '',
        uploading: '',
        processing: '',
        error: 'bg-error/10 text-error',
        done: '',
      } satisfies Record<(typeof attachmentStateNames)[number], string>,
    },
    compoundVariants: [
      { orientation: 'vertical', variant: 'image', class: 'aspect-video h-auto w-full' },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
      variant: 'icon',
      state: 'idle',
    },
  },
)

export const attachmentContentVariants = cva('relative z-10 min-w-0 flex-1', {
  variants: { orientation: { horizontal: '', vertical: 'w-full px-1 pb-1' } },
  defaultVariants: { orientation: 'horizontal' },
})

export const attachmentLabelVariants = cva('truncate font-medium', {
  variants: {
    size: { md: 'text-sm', sm: 'text-xs', xs: 'text-[11px]' },
    state: {
      idle: '',
      uploading: 'animate-pulse',
      processing: 'animate-pulse',
      error: '',
      done: '',
    },
  },
  defaultVariants: { size: 'md', state: 'idle' },
})

export const attachmentDescriptionVariants = cva('truncate text-muted-foreground', {
  variants: {
    size: { md: 'text-xs', sm: 'text-[11px]', xs: 'text-[11px]' },
    state: {
      idle: '',
      uploading: '',
      processing: '',
      error: 'text-error',
      done: '',
    },
  },
  defaultVariants: { size: 'md', state: 'idle' },
})

export const attachmentActionsVariants = cva(
  'relative z-20 ml-auto flex shrink-0 items-center gap-1 ',
  {
    variants: {
      orientation: { horizontal: '', vertical: 'absolute top-3 right-3 ml-0' },
      size: { md: '', sm: '', xs: '' },
    },
    defaultVariants: { orientation: 'horizontal', size: 'md' },
  },
)

export type AttachmentVariants = VariantProps<typeof attachmentVariants>
export type AttachmentMediaVariants = VariantProps<typeof attachmentMediaVariants>
export type AttachmentOrientation = NonNullable<AttachmentVariants['orientation']>
export type AttachmentSize = NonNullable<AttachmentVariants['size']>
export type AttachmentState = NonNullable<AttachmentVariants['state']>
export type AttachmentMediaVariant = (typeof attachmentMediaVariantNames)[number]
export type AttachmentLabel = string
export type AttachmentDescription = string

export interface AttachmentContext {
  state: AttachmentState
}

export type AttachmentFn<T> = (context: AttachmentContext) => T

// Props
export interface AttachmentProps {
  label?: AttachmentLabel
  description?: AttachmentDescription
  icon?: IconName
  orientation?: AttachmentOrientation
  size?: AttachmentSize
  state?: AttachmentState
  mediaVariant?: AttachmentMediaVariant
  ui?: AttachmentUI
}

// Slots
export interface AttachmentSlots {
  media?(props: AttachmentContext): unknown
  label?(props: AttachmentContext): unknown
  description?(props: AttachmentContext): unknown
  actions?(props: AttachmentContext): unknown
}

// UI
export interface AttachmentUI {
  media?: AttachmentFn<HTMLAttributes>
  content?: AttachmentFn<HTMLAttributes>
  label?: AttachmentFn<HTMLAttributes>
  description?: AttachmentFn<HTMLAttributes>
  actions?: AttachmentFn<HTMLAttributes>
}
