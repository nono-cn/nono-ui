import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { TagGroupRootProps as RekaTagGroupRootProps } from 'reka-ui'
import type { IconName } from '@/components/Icon'
import {
  tagGroupDefaults,
  type tagGroupSelectionModes,
  type tagGroupSizes,
  type tagGroupVariantNames,
} from './constants'

export { default as TagGroup } from './TagGroup.vue'
export {
  tagGroupDefaults,
  tagGroupEscapeKeyBehaviors,
  tagGroupSelectionModes,
  tagGroupSizes,
  tagGroupVariantNames,
} from './constants'

type Sizes = (typeof tagGroupSizes)[number]
type Variants = (typeof tagGroupVariantNames)[number]

export const tagGroupVariants = cva('flex flex-wrap items-center', {
  variants: {
    size: {
      xs: 'gap-1',
      sm: 'gap-1.5',
      md: 'gap-1.5',
      lg: 'gap-2',
      xl: 'gap-2',
    } satisfies Record<Sizes, string>,
  },
  defaultVariants: {
    size: tagGroupDefaults.size,
  },
})

export const tagGroupItemVariants = cva(
  'inline-flex max-w-full shrink-0 items-center rounded-(--tag-group-radius) border font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow] outline-none select-none focus-visible:ring-3 focus-visible:ring-(--tag-group-color)/30 data-disabled:cursor-not-allowed data-disabled:opacity-50',
  {
    variants: {
      size: {
        xs: 'h-5 gap-1 px-1.5 text-xs',
        sm: 'h-6 gap-1 px-2 text-xs',
        md: 'h-7 gap-1.5 px-2.5 text-sm',
        lg: 'h-8 gap-1.5 px-3 text-sm',
        xl: 'h-9 gap-2 px-3.5 text-base',
      } satisfies Record<Sizes, string>,
      variant: {
        outline:
          'border-border bg-transparent text-foreground focus-visible:border-(--tag-group-color) data-[state=checked]:border-(--tag-group-color)/60 data-[state=checked]:bg-(--tag-group-color)/10 data-[state=checked]:text-(--tag-group-color)',
        soft: 'border-transparent bg-muted text-foreground data-[state=checked]:bg-(--tag-group-color)/15 data-[state=checked]:text-(--tag-group-color)',
        solid:
          'border-transparent bg-muted text-foreground data-[state=checked]:bg-(--tag-group-color) data-[state=checked]:text-(--tag-group-color-foreground)',
      } satisfies Record<Variants, string>,
      selectable: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        selectable: true,
        class: 'hover:not-data-disabled:not-data-[state=checked]:bg-muted/50',
      },
      {
        variant: ['soft', 'solid'],
        selectable: true,
        class: 'hover:not-data-disabled:not-data-[state=checked]:bg-muted/70',
      },
    ],
    defaultVariants: {
      size: tagGroupDefaults.size,
      variant: tagGroupDefaults.variant,
      selectable: false,
    },
  },
)

export const tagGroupIconVariants = cva('shrink-0', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-3',
      md: 'size-3.5',
      lg: 'size-4',
      xl: 'size-4.5',
    } satisfies Record<Sizes, string>,
  },
  defaultVariants: {
    size: tagGroupDefaults.size,
  },
})

export const tagGroupLabelVariants = cva('truncate')

export const tagGroupDeleteVariants = cva(
  '-ms-1 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-(--tag-group-color)/50 data-disabled:pointer-events-none',
  {
    variants: {
      size: {
        xs: '-me-1.5',
        sm: '-me-1.5',
        md: '-me-2',
        lg: '-me-2.5',
        xl: '-me-3',
      } satisfies Record<Sizes, string>,
    },
    defaultVariants: {
      size: tagGroupDefaults.size,
    },
  },
)

export const tagGroupDeleteTargetVariants = cva('min-h-6 min-w-6')

export const tagGroupDeleteIconVariants = cva('', {
  variants: {
    size: {
      xs: 'size-2.5',
      sm: 'size-3',
      md: 'size-3.5',
      lg: 'size-3.5',
      xl: 'size-4',
    } satisfies Record<Sizes, string>,
  },
  defaultVariants: {
    size: tagGroupDefaults.size,
  },
})

export const tagGroupEmptyVariants = cva('inline-flex items-center text-muted-foreground', {
  variants: {
    size: {
      xs: 'h-5 text-xs',
      sm: 'h-6 text-xs',
      md: 'h-7 text-sm',
      lg: 'h-8 text-sm',
      xl: 'h-9 text-base',
    } satisfies Record<Sizes, string>,
  },
  defaultVariants: {
    size: tagGroupDefaults.size,
  },
})

// Variants
export type TagGroupVariants = VariantProps<typeof tagGroupItemVariants>
export type TagGroupSize = Sizes
export type TagGroupVariant = Variants
export type TagGroupSelectionMode = (typeof tagGroupSelectionModes)[number]
export type TagGroupRadius = string | number

export type TagGroupValue = string | number
export type TagGroupModelValue = TagGroupValue | TagGroupValue[]

// Item
export interface TagGroupItem {
  value: TagGroupValue
  label?: string
  icon?: IconName
  disabled?: boolean
}

// Props
export type TagGroupRootProps = Pick<
  RekaTagGroupRootProps,
  'disabled' | 'disallowEmptySelection' | 'escapeKeyBehavior' | 'loop'
>

export interface TagGroupProps extends TagGroupRootProps {
  modelValue?: TagGroupModelValue
  items?: TagGroupItem[]
  empty?: string
  selectionMode?: TagGroupSelectionMode
  removable?: boolean
  size?: TagGroupSize
  variant?: TagGroupVariant
  radius?: TagGroupRadius
  color?: string
  ui?: TagGroupUI
}

// Context
export interface TagGroupItemContext {
  item: TagGroupItem
  index: number
  selected: boolean
  disabled: boolean
}

// Fn
export type TagGroupFn<T> = () => T
export type TagGroupItemFn<T> = (context: TagGroupItemContext) => T

// UI
export interface TagGroupUI {
  item?: TagGroupItemFn<HTMLAttributes>
  label?: TagGroupItemFn<HTMLAttributes>
  delete?: TagGroupItemFn<HTMLAttributes>
  empty?: TagGroupFn<HTMLAttributes>
}

// Emits
export interface TagGroupEmits {
  'update:modelValue': [value: TagGroupModelValue | undefined]
  change: [value: TagGroupModelValue | undefined]
  remove: [values: TagGroupValue[]]
}

// Slots
export type TagGroupSlots = {
  leading?(props: TagGroupItemContext): unknown
  label?(props: TagGroupItemContext): unknown
  deleteIcon?(props: TagGroupItemContext): unknown
  empty?(): unknown
}
