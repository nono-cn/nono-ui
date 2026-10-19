import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { ProgressRootProps as RekaProgressRootProps } from 'reka-ui'
import type { IconName } from '@/components/ui/Icon'
import { meterGroupDefaults, type meterGroupOrientations, type meterGroupSizes } from './constants'

export { default as MeterGroup } from './MeterGroup.vue'
export {
  meterGroupDefaults,
  meterGroupItemDefaults,
  meterGroupOrientations,
  meterGroupSizes,
} from './constants'

export const meterGroupVariants = cva('grid gap-2', {
  variants: {
    size: {
      '2xs': 'text-xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-sm',
      xl: 'text-base',
      '2xl': 'text-base',
    } satisfies Record<(typeof meterGroupSizes)[number], string>,
  },
  defaultVariants: {
    size: meterGroupDefaults.size,
  },
})

export const meterGroupStatusVariants = cva('text-right font-medium tabular-nums')

export const meterGroupBodyVariants = cva('gap-2', {
  variants: {
    orientation: {
      horizontal: 'grid',
      vertical: 'flex h-48 flex-row justify-center',
    } satisfies Record<(typeof meterGroupOrientations)[number], string>,
  },
  defaultVariants: {
    orientation: meterGroupDefaults.orientation,
  },
})

export const meterGroupTrackVariants = cva('relative flex overflow-hidden rounded-full bg-muted', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      // los indicadores se apilan desde abajo
      vertical: 'h-full flex-col-reverse self-center',
    } satisfies Record<(typeof meterGroupOrientations)[number], string>,
    size: {
      '2xs': '',
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
      '2xl': '',
    } satisfies Record<(typeof meterGroupSizes)[number], string>,
  },
  compoundVariants: [
    { orientation: 'horizontal', size: '2xs', class: 'h-px' },
    { orientation: 'horizontal', size: 'xs', class: 'h-0.5' },
    { orientation: 'horizontal', size: 'sm', class: 'h-1' },
    { orientation: 'horizontal', size: 'md', class: 'h-2' },
    { orientation: 'horizontal', size: 'lg', class: 'h-3' },
    { orientation: 'horizontal', size: 'xl', class: 'h-4' },
    { orientation: 'horizontal', size: '2xl', class: 'h-5' },
    { orientation: 'vertical', size: '2xs', class: 'w-px' },
    { orientation: 'vertical', size: 'xs', class: 'w-0.5' },
    { orientation: 'vertical', size: 'sm', class: 'w-1' },
    { orientation: 'vertical', size: 'md', class: 'w-2' },
    { orientation: 'vertical', size: 'lg', class: 'w-3' },
    { orientation: 'vertical', size: 'xl', class: 'w-4' },
    { orientation: 'vertical', size: '2xl', class: 'w-5' },
  ],
  defaultVariants: {
    orientation: meterGroupDefaults.orientation,
    size: meterGroupDefaults.size,
  },
})

export const meterGroupIndicatorVariants = cva('shrink-0 bg-(--meter-group-color)', {
  variants: {
    orientation: {
      horizontal: 'h-full transition-[width] duration-300',
      vertical: 'w-full transition-[height] duration-300',
    } satisfies Record<(typeof meterGroupOrientations)[number], string>,
  },
  defaultVariants: {
    orientation: meterGroupDefaults.orientation,
  },
})

export const meterGroupListVariants = cva('grid text-muted-foreground', {
  variants: {
    orientation: {
      horizontal: 'gap-1',
      vertical: 'content-center gap-1',
    } satisfies Record<(typeof meterGroupOrientations)[number], string>,
  },
  defaultVariants: {
    orientation: meterGroupDefaults.orientation,
  },
})

export const meterGroupItemVariants = cva('flex items-center gap-2')

export const meterGroupLeadingVariants = cva('shrink-0 rounded-full bg-(--meter-group-color)', {
  variants: {
    size: {
      '2xs': 'size-1.5',
      xs: 'size-1.5',
      sm: 'size-2',
      md: 'size-2',
      lg: 'size-2',
      xl: 'size-2.5',
      '2xl': 'size-2.5',
    } satisfies Record<(typeof meterGroupSizes)[number], string>,
  },
  defaultVariants: {
    size: meterGroupDefaults.size,
  },
})

// el icono de la leyenda acompaña al tamaño del texto
export const meterGroupIconVariants = cva('', {
  variants: {
    size: {
      '2xs': 'size-3',
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-4',
      lg: 'size-4',
      xl: 'size-5',
      '2xl': 'size-5',
    } satisfies Record<(typeof meterGroupSizes)[number], string>,
  },
  defaultVariants: {
    size: meterGroupDefaults.size,
  },
})

export const meterGroupLabelVariants = cva('min-w-0 flex-1 truncate')

export const meterGroupTrailingVariants = cva('ms-2 shrink-0 tabular-nums')

// Variants
export type MeterGroupVariants = VariantProps<typeof meterGroupTrackVariants>
export type MeterGroupSize = NonNullable<MeterGroupVariants['size']>
export type MeterGroupOrientation = NonNullable<MeterGroupVariants['orientation']>

// Item
export interface MeterGroupItem {
  value: number
  label?: string
  slot?: string
  color?: string
  icon?: IconName
}

// Props
export type MeterGroupRootProps = Pick<RekaProgressRootProps, 'getValueLabel' | 'getValueText'>

export interface MeterGroupProps extends MeterGroupRootProps {
  items?: MeterGroupItem[]
  max?: number
  orientation?: MeterGroupOrientation
  size?: MeterGroupSize
  status?: boolean
  ui?: MeterGroupUI
}

// Context
export interface MeterGroupContext {
  value: number
  max: number
  percentage: number
}

export interface MeterGroupItemContext {
  item: MeterGroupItem
  index: number
  value: number
  percentage: number
}

// Fn
export type MeterGroupFn<T> = (context: MeterGroupContext) => T
export type MeterGroupItemFn<T> = (context: MeterGroupItemContext) => T

// UI
export interface MeterGroupUI {
  status?: MeterGroupFn<HTMLAttributes>
  track?: MeterGroupFn<HTMLAttributes>
  indicator?: MeterGroupItemFn<HTMLAttributes>
  list?: MeterGroupFn<HTMLAttributes>
  item?: MeterGroupItemFn<HTMLAttributes>
  leading?: MeterGroupItemFn<HTMLAttributes>
  label?: MeterGroupItemFn<HTMLAttributes>
  trailing?: MeterGroupItemFn<HTMLAttributes>
}

// Slots
export type MeterGroupSlots = {
  status?(props: MeterGroupContext): unknown
  leading?(props: MeterGroupItemContext): unknown
  label?(props: MeterGroupItemContext): unknown
  trailing?(props: MeterGroupItemContext): unknown
} & {
  [name: `leading-${string}`]: ((props: MeterGroupItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: MeterGroupItemContext) => unknown) | undefined
  [name: `trailing-${string}`]: ((props: MeterGroupItemContext) => unknown) | undefined
}
