import type { HTMLAttributes } from 'vue'
import { emptyMediaVariantNames } from './constants'

export { default as Empty } from './Empty.vue'
export { emptyDefaults, emptyMediaVariantNames } from './constants'

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

export type EmptyMediaVariant = (typeof emptyMediaVariantNames)[number]

export interface EmptySlots {
  default?(): unknown
  media?(): unknown
  label?(): unknown
  description?(): unknown
}
