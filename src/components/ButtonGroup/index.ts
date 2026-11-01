import { cva, type VariantProps } from 'class-variance-authority'
import type { InjectionKey, Ref } from 'vue'
import { buttonGroupOrientations, buttonGroupSizes } from './constants'

export { default as ButtonGroup } from './ButtonGroup.vue'
export { buttonGroupDefaults, buttonGroupOrientations, buttonGroupSizes } from './constants'
export const buttonGroupVariants = cva(
  'relative flex w-fit items-stretch [&>*]:focus-visible:relative [&>*]:focus-visible:z-10',
  {
    variants: {
      orientation: {
        horizontal:
          'flex-row [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none',
        vertical:
          'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none',
      } satisfies Record<(typeof buttonGroupOrientations)[number], string>,
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
)

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>
export type ButtonGroupOrientation = NonNullable<ButtonGroupVariants['orientation']>
export type ButtonGroupSize = (typeof buttonGroupSizes)[number]
export const buttonGroupSizeKey: InjectionKey<Ref<ButtonGroupSize>> =
  Symbol.for('nono-ui.buttonGroupSize')

export interface ButtonGroupProps {
  orientation?: ButtonGroupOrientation
  size?: ButtonGroupSize
}

export interface ButtonGroupSlots {
  default?(): unknown
}
