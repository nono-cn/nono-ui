import { cva, type VariantProps } from 'class-variance-authority'
import { buttonGroupOrientations, buttonGroupSizes } from './constants'

export { default as ButtonGroup } from './ButtonGroup.vue'
export { buttonGroupOrientations, buttonGroupSizes } from './constants'

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
      size: {
        xs: '[&>*]:h-7 [&>*]:px-2.5 [&>*]:text-xs [&>*_svg]:size-3',
        sm: '[&>*]:h-8 [&>*]:px-3 [&>*]:text-sm [&>*_svg]:size-4',
        md: '[&>*]:h-9 [&>*]:px-4 [&>*]:text-base [&>*_svg]:size-5',
        lg: '[&>*]:h-10 [&>*]:px-6 [&>*]:text-lg [&>*_svg]:size-6',
        xl: '[&>*]:h-11 [&>*]:px-7 [&>*]:text-xl [&>*_svg]:size-7',
      } satisfies Record<(typeof buttonGroupSizes)[number], string>,
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
    },
  },
)

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>
export type ButtonGroupOrientation = NonNullable<ButtonGroupVariants['orientation']>
export type ButtonGroupSize = NonNullable<ButtonGroupVariants['size']>

export interface ButtonGroupProps {
  orientation?: ButtonGroupOrientation
  size?: ButtonGroupSize
}

export interface ButtonGroupSlots {
  default?(): unknown
}
