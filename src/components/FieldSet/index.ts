import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { fieldSetDefaults, fieldSetLegendVariantNames } from './constants'

export { default as FieldSet } from './FieldSet.vue'
export { fieldSetDefaults, fieldSetLegendVariantNames } from './constants'

export type FieldSetLegend = string
export type FieldSetDescription = string

export type FieldSetLegendVariant = (typeof fieldSetLegendVariantNames)[number]

export const fieldSetRootVariants = cva('flex flex-col gap-6')

export const fieldSetLegendVariants = cva('mb-3 font-medium', {
  variants: {
    legendVariant: {
      legend: 'text-base',
      label: 'text-sm',
    } satisfies Record<FieldSetLegendVariant, string>,
  },
  defaultVariants: {
    legendVariant: fieldSetDefaults.legendVariant,
  },
})

export const fieldSetDescriptionVariants = cva(
  'text-sm leading-normal font-normal text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
)

export const fieldSetGroupVariants = cva('@container/field-group flex w-full flex-col gap-7')

export type FieldSetVariants = VariantProps<typeof fieldSetLegendVariants>

export type FieldSetFn<T> = () => T

export interface FieldSetUI {
  legend?: FieldSetFn<HTMLAttributes>
  description?: FieldSetFn<HTMLAttributes>
  group?: FieldSetFn<HTMLAttributes>
}

export interface FieldSetProps {
  legend?: FieldSetLegend
  description?: FieldSetDescription
  legendVariant?: FieldSetLegendVariant
  ui?: FieldSetUI
}

export interface FieldSetSlots {
  default?(): unknown
  legend?(): unknown
  description?(): unknown
}
