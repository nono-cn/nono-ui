import { cva, type VariantProps } from 'class-variance-authority'
import { chipDefaults, chipPositions, chipSizes } from './constants'

export { default as Chip } from './Chip.vue'
export { chipDefaults, chipPositions, chipSizes } from './constants'

export const chipRootVariants = cva('relative inline-flex shrink-0 items-center justify-center')

export const chipBaseVariants = cva('rounded-full bg-(--chip-color) ring-2 ring-background', {
  variants: {
    size: {
      '3xs': 'h-1 min-w-1',
      '2xs': 'h-1.5 min-w-1.5',
      xs: 'h-1.5 min-w-1.5',
      sm: 'h-2 min-w-2',
      md: 'h-2 min-w-2',
      lg: 'h-2.5 min-w-2.5',
      xl: 'h-2.5 min-w-2.5',
      '2xl': 'h-3 min-w-3',
      '3xl': 'h-3 min-w-3',
    } satisfies Record<(typeof chipSizes)[number], string>,
    position: {
      'top-right': 'top-0 right-0',
      'bottom-right': 'right-0 bottom-0',
      'top-left': 'top-0 left-0',
      'bottom-left': 'left-0 bottom-0',
    } satisfies Record<(typeof chipPositions)[number], string>,
    inset: {
      true: '',
      false: '',
    },
    standalone: {
      true: '',
      false: 'absolute',
    },
  },
  compoundVariants: [
    {
      position: 'top-right',
      inset: false,
      class: '-translate-y-1/2 translate-x-1/2 transform',
    },
    {
      position: 'bottom-right',
      inset: false,
      class: 'translate-y-1/2 translate-x-1/2 transform',
    },
    {
      position: 'top-left',
      inset: false,
      class: '-translate-x-1/2 -translate-y-1/2 transform',
    },
    {
      position: 'bottom-left',
      inset: false,
      class: '-translate-x-1/2 translate-y-1/2 transform',
    },
  ],
  defaultVariants: {
    size: chipDefaults.size,
  },
})

export type ChipBaseVariants = VariantProps<typeof chipBaseVariants>
export type ChipSize = NonNullable<ChipBaseVariants['size']>
export type ChipPosition = NonNullable<ChipBaseVariants['position']>

export interface ChipProps {
  color?: string
  size?: ChipSize
  position?: ChipPosition
  show?: boolean
  inset?: boolean
  standalone?: boolean
}

export interface ChipSlots {
  default?(): unknown
}
