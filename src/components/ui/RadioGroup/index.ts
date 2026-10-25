import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { RadioGroupRootProps as RekaRadioGroupRootProps } from 'reka-ui'
import type { IconName } from '@/components/ui/Icon'
import {
  radioGroupDefaults,
  type radioGroupIndicators,
  type radioGroupOrientations,
  type radioGroupSizes,
  type radioGroupVariantNames,
} from './constants'

export { default as RadioGroup } from './RadioGroup.vue'
export {
  radioGroupDefaults,
  radioGroupIndicators,
  radioGroupOrientations,
  radioGroupSizes,
  radioGroupVariantNames,
} from './constants'

type Sizes = (typeof radioGroupSizes)[number]
type Variants = (typeof radioGroupVariantNames)[number]
type Indicators = (typeof radioGroupIndicators)[number]

export const radioGroupVariants = cva('flex flex-col')

export const radioGroupLegendVariants = cva('mb-1 block font-medium text-foreground', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
      xl: 'text-base',
    } satisfies Record<Sizes, string>,
  },
  defaultVariants: {
    size: radioGroupDefaults.size,
  },
})

export const radioGroupListVariants = cva('flex gap-x-2', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    } satisfies Record<(typeof radioGroupOrientations)[number], string>,
    variant: {
      list: 'flex-wrap',
      card: 'flex-wrap',
      table: '',
    } satisfies Record<Variants, string>,
    size: {
      xs: 'gap-y-0.5',
      sm: 'gap-y-0.5',
      md: 'gap-y-1',
      lg: 'gap-y-1',
      xl: 'gap-y-1.5',
    } satisfies Record<Sizes, string>,
  },
  compoundVariants: [
    { variant: 'table', orientation: 'vertical', class: 'gap-0 -space-y-px' },
    { variant: 'table', orientation: 'horizontal', class: 'gap-0 -space-x-px' },
  ],
  defaultVariants: {
    orientation: radioGroupDefaults.orientation,
    variant: radioGroupDefaults.variant,
    size: radioGroupDefaults.size,
  },
})

export const radioGroupItemVariants = cva('relative flex items-start', {
  variants: {
    variant: {
      list: '',
      card: 'rounded-lg border border-border transition-colors',
      table: 'border border-border transition-colors',
    } satisfies Record<Variants, string>,
    orientation: {
      vertical: '',
      horizontal: '',
    } satisfies Record<(typeof radioGroupOrientations)[number], string>,
    indicator: {
      start: 'flex-row',
      end: 'flex-row-reverse',
      hidden: '',
    } satisfies Record<Indicators, string>,
    size: {
      xs: 'text-xs',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
      xl: 'text-base',
    } satisfies Record<Sizes, string>,
    disabled: {
      true: 'cursor-not-allowed opacity-50',
      false: 'cursor-pointer',
    },
  },
  compoundVariants: [
    { variant: ['card', 'table'], size: 'xs', class: 'p-2.5' },
    { variant: ['card', 'table'], size: 'sm', class: 'p-3' },
    { variant: ['card', 'table'], size: 'md', class: 'p-3.5' },
    { variant: ['card', 'table'], size: 'lg', class: 'p-4' },
    { variant: ['card', 'table'], size: 'xl', class: 'p-4.5' },
    // las esquinas de la tabla siguen la orientación
    {
      variant: 'table',
      orientation: 'vertical',
      class: 'first-of-type:rounded-t-lg last-of-type:rounded-b-lg',
    },
    {
      variant: 'table',
      orientation: 'horizontal',
      class: 'first-of-type:rounded-s-lg last-of-type:rounded-e-lg',
    },
    {
      variant: ['card', 'table'],
      disabled: false,
      class: 'hover:not-has-data-[state=checked]:bg-muted/50',
    },
    {
      variant: 'card',
      class:
        'has-data-[state=checked]:border-(--radio-group-color)/50 has-data-[state=checked]:bg-(--radio-group-color)/10',
    },
    {
      variant: 'table',
      class:
        'has-data-[state=checked]:z-[2] has-data-[state=checked]:border-(--radio-group-color)/50 has-data-[state=checked]:bg-(--radio-group-color)/10',
    },
    // sin indicador visible, el foco y la selección se muestran en el item
    {
      variant: ['card', 'table'],
      class:
        'has-focus-visible:z-[3] has-focus-visible:border-(--radio-group-color) has-focus-visible:ring-3 has-focus-visible:ring-(--radio-group-color)/30',
    },
    {
      variant: 'list',
      indicator: 'hidden',
      class:
        'rounded-md has-focus-visible:ring-3 has-focus-visible:ring-(--radio-group-color)/30 has-data-[state=checked]:text-(--radio-group-color)',
    },
  ],
  defaultVariants: {
    variant: radioGroupDefaults.variant,
    orientation: radioGroupDefaults.orientation,
    indicator: radioGroupDefaults.indicator,
    size: radioGroupDefaults.size,
    disabled: radioGroupDefaults.disabled,
  },
})

export const radioGroupContainerVariants = cva('flex items-center', {
  variants: {
    size: {
      xs: 'h-4',
      sm: 'h-4',
      md: 'h-5',
      lg: 'h-5',
      xl: 'h-6',
    } satisfies Record<Sizes, string>,
    indicator: {
      start: '',
      end: '',
      hidden: 'h-auto',
    } satisfies Record<Indicators, string>,
  },
  defaultVariants: {
    size: radioGroupDefaults.size,
    indicator: radioGroupDefaults.indicator,
  },
})

export const radioGroupBaseVariants = cva(
  'shrink-0 overflow-hidden rounded-full border border-input shadow-xs outline-none transition-[color,box-shadow] data-[state=checked]:border-(--radio-group-color) data-[state=checked]:bg-(--radio-group-color) disabled:cursor-not-allowed aria-invalid:border-destructive',
  {
    variants: {
      size: {
        xs: 'size-3',
        sm: 'size-3.5',
        md: 'size-4',
        lg: 'size-4.5',
        xl: 'size-5',
      } satisfies Record<Sizes, string>,
      variant: {
        list: '',
        card: '',
        table: '',
      } satisfies Record<Variants, string>,
      indicator: {
        start: '',
        end: '',
        hidden: 'sr-only',
      } satisfies Record<Indicators, string>,
    },
    compoundVariants: [
      // en card y table el foco se marca en el item
      {
        variant: 'list',
        indicator: ['start', 'end'],
        class:
          'focus-visible:border-(--radio-group-color) focus-visible:ring-3 focus-visible:ring-(--radio-group-color)/30',
      },
    ],
    defaultVariants: {
      size: radioGroupDefaults.size,
      variant: radioGroupDefaults.variant,
      indicator: radioGroupDefaults.indicator,
    },
  },
)

export const radioGroupIndicatorVariants = cva(
  'flex size-full items-center justify-center after:rounded-full after:bg-(--radio-group-color-foreground)',
  {
    variants: {
      size: {
        xs: 'after:size-1',
        sm: 'after:size-1',
        md: 'after:size-1.5',
        lg: 'after:size-1.5',
        xl: 'after:size-2',
      } satisfies Record<Sizes, string>,
    },
    defaultVariants: {
      size: radioGroupDefaults.size,
    },
  },
)

export const radioGroupWrapperVariants = cva('w-full', {
  variants: {
    indicator: {
      start: 'ms-2',
      end: 'me-2',
      hidden: 'flex flex-col items-center gap-1 text-center',
    } satisfies Record<Indicators, string>,
  },
  defaultVariants: {
    indicator: radioGroupDefaults.indicator,
  },
})

// el icono acompaña al tamaño del texto
export const radioGroupIconVariants = cva('shrink-0', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-4.5',
      xl: 'size-5',
    } satisfies Record<Sizes, string>,
  },
  defaultVariants: {
    size: radioGroupDefaults.size,
  },
})

export const radioGroupLabelVariants = cva('block font-medium')

export const radioGroupDescriptionVariants = cva('block text-muted-foreground')

// Variants
export type RadioGroupVariants = VariantProps<typeof radioGroupItemVariants>
export type RadioGroupSize = Sizes
export type RadioGroupVariant = Variants
export type RadioGroupIndicator = Indicators
export type RadioGroupOrientation = (typeof radioGroupOrientations)[number]

export type RadioGroupValue = string | number

// Item
export interface RadioGroupItem {
  value: RadioGroupValue
  label?: string
  description?: string
  icon?: IconName
  disabled?: boolean
}

// Props
export type RadioGroupRootProps = Pick<
  RekaRadioGroupRootProps,
  'disabled' | 'loop' | 'name' | 'required'
>

export interface RadioGroupProps extends RadioGroupRootProps {
  modelValue?: RadioGroupValue
  items?: RadioGroupItem[]
  legend?: string
  orientation?: RadioGroupOrientation
  size?: RadioGroupSize
  variant?: RadioGroupVariant
  indicator?: RadioGroupIndicator
  color?: string
  ui?: RadioGroupUI
}

// Context
export interface RadioGroupContext {
  value: RadioGroupValue | undefined
  disabled: boolean
}

export interface RadioGroupItemContext {
  item: RadioGroupItem
  index: number
  checked: boolean
  disabled: boolean
}

// Fn
export type RadioGroupFn<T> = (context: RadioGroupContext) => T
export type RadioGroupItemFn<T> = (context: RadioGroupItemContext) => T

// UI
export interface RadioGroupUI {
  legend?: RadioGroupFn<HTMLAttributes>
  list?: RadioGroupFn<HTMLAttributes>
  item?: RadioGroupItemFn<HTMLAttributes>
  container?: RadioGroupItemFn<HTMLAttributes>
  base?: RadioGroupItemFn<HTMLAttributes>
  indicator?: RadioGroupItemFn<HTMLAttributes>
  wrapper?: RadioGroupItemFn<HTMLAttributes>
  icon?: RadioGroupItemFn<HTMLAttributes>
  label?: RadioGroupItemFn<HTMLAttributes>
  description?: RadioGroupItemFn<HTMLAttributes>
}

// Emits
export interface RadioGroupEmits {
  'update:modelValue': [value: RadioGroupValue]
  change: [value: RadioGroupValue]
}

// Slots
export type RadioGroupSlots = {
  legend?(props: RadioGroupContext): unknown
  label?(props: RadioGroupItemContext): unknown
  description?(props: RadioGroupItemContext): unknown
}
