import type { SeparatorProps as RekaSeparatorProps } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { separatorDefaults, separatorPositions, separatorSizes, separatorTypes } from './constants'

export { default as Separator } from './Separator.vue'
export { separatorDefaults, separatorPositions, separatorSizes, separatorTypes } from './constants'

export const separatorVariants = cva('flex shrink-0 items-center border-(--separator-color)', {
  variants: {
    type: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    } satisfies Record<(typeof separatorTypes)[number], string>,
    orientation: {
      horizontal: 'w-full flex-row',
      vertical: 'h-full flex-col self-stretch',
    } satisfies Record<NonNullable<RekaSeparatorProps['orientation']>, string>,
    position: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    } satisfies Record<(typeof separatorPositions)[number], string>,
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    } satisfies Record<(typeof separatorSizes)[number], string>,
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'xs', class: 'h-px border-t' },
    { orientation: 'horizontal', size: 'sm', class: 'h-[2px] border-t-[2px]' },
    { orientation: 'horizontal', size: 'md', class: 'h-[3px] border-t-[3px]' },
    { orientation: 'horizontal', size: 'lg', class: 'h-[4px] border-t-[4px]' },
    { orientation: 'horizontal', size: 'xl', class: 'h-[5px] border-t-[5px]' },
    { orientation: 'vertical', size: 'xs', class: 'w-px border-l' },
    { orientation: 'vertical', size: 'sm', class: 'w-[2px] border-l-[2px]' },
    { orientation: 'vertical', size: 'md', class: 'w-[3px] border-l-[3px]' },
    { orientation: 'vertical', size: 'lg', class: 'w-[4px] border-l-[4px]' },
    { orientation: 'vertical', size: 'xl', class: 'w-[5px] border-l-[5px]' },
  ],
  defaultVariants: {
    type: separatorDefaults.type,
    orientation: separatorDefaults.orientation,
    position: separatorDefaults.position,
    size: separatorDefaults.size,
  },
})

export const separatorContentVariants = cva(
  'relative bg-background px-2 text-sm text-muted-foreground whitespace-nowrap',
)

export type SeparatorRootProps = Pick<RekaSeparatorProps, 'orientation' | 'decorative'>
export type SeparatorType = NonNullable<VariantProps<typeof separatorVariants>['type']>
export type SeparatorSize = NonNullable<VariantProps<typeof separatorVariants>['size']>
export type SeparatorPosition = NonNullable<VariantProps<typeof separatorVariants>['position']>

export interface SeparatorProps extends SeparatorRootProps {
  type?: SeparatorType
  size?: SeparatorSize
  color?: string
  label?: string
  position?: SeparatorPosition
}

export interface SeparatorSlots {
  default?(): unknown
}
