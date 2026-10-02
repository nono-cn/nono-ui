import { cva } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { emptyDefaults, emptyMediaVariantNames } from './constants'

export { default as Empty } from './Empty.vue'
export { emptyDefaults, emptyMediaVariantNames } from './constants'

export type EmptyMediaVariant = (typeof emptyMediaVariantNames)[number]

export const emptyRootVariants = cva(
  'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center md:p-12',
)

export const emptyHeaderVariants = cva('flex max-w-sm flex-col items-center gap-2 text-center')

export const emptyMediaVariants = cva('', {
  variants: {
    variant: {
      default: '',
      icon: 'flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*=size-])]:size-6',
    } satisfies Record<EmptyMediaVariant, string>,
  },
  defaultVariants: {
    variant: emptyDefaults.mediaVariant,
  },
})

export const emptyLabelVariants = cva('text-lg font-medium tracking-tight')

export const emptyDescriptionVariants = cva(
  'text-sm/relaxed text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary',
)

export const emptyContentVariants = cva(
  'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm',
)

export type EmptyFn<T> = () => T

export interface EmptyUI {
  header?: EmptyFn<HTMLAttributes>
  media?: EmptyFn<HTMLAttributes>
  label?: EmptyFn<HTMLAttributes>
  description?: EmptyFn<HTMLAttributes>
  content?: EmptyFn<HTMLAttributes>
}

export interface EmptyProps {
  label?: string
  description?: string
  mediaVariant?: EmptyMediaVariant
  ui?: EmptyUI
}

export interface EmptySlots {
  default?(): unknown
  media?(): unknown
  label?(): unknown
  description?(): unknown
}
