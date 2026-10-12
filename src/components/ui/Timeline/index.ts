import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { IconName } from '@/components/ui/Icon'
import { timelineDefaults } from './constants'

export { default as Timeline } from './Timeline.vue'
export { timelineAligns, timelineDefaults, timelineSizes, timelineOrientations } from './constants'

export type TimelineValue = string | number
export type TimelineAlign = (typeof import('./constants').timelineAligns)[number]

export const timelineVariants = cva('group/timeline m-0 flex w-full list-none p-0', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row items-stretch overflow-x-auto py-6',
    },
  },
  defaultVariants: {
    orientation: timelineDefaults.orientation,
  },
})

export const timelineItemVariants = cva('group/timeline-item relative min-w-0', {
  variants: {
    orientation: {
      vertical: 'flex flex-col gap-0.5 not-last:pb-6',
      horizontal: 'flex min-w-48 flex-1 shrink-0 flex-col gap-0.5 not-last:pe-8',
    },
    align: {
      left: '',
      right: '',
      alternate: '',
    },
  },
  compoundVariants: [
    { orientation: 'vertical', align: 'left', class: 'me-5 items-end pe-8 text-end' },
    { orientation: 'vertical', align: 'right', class: 'ms-5 ps-8' },
    {
      orientation: 'vertical',
      align: 'alternate',
      class: 'w-1/2 odd:self-start odd:items-end odd:pe-8 odd:text-end even:self-end even:ps-8',
    },
    { orientation: 'horizontal', align: 'left', class: 'mb-5 pb-8' },
    { orientation: 'horizontal', align: 'right', class: 'mt-5 pt-8' },
    {
      orientation: 'horizontal',
      align: 'alternate',
      class: 'grid grid-rows-[minmax(0,1fr)_minmax(0,1fr)]',
    },
  ],
  defaultVariants: {
    orientation: timelineDefaults.orientation,
    align: timelineDefaults.align,
  },
})

export const timelineContentVariants = cva('flex min-w-0 flex-col gap-0.5', {
  variants: {
    orientation: {
      vertical: '',
      horizontal: 'w-full',
    },
    align: {
      left: '',
      right: '',
      alternate: '',
    },
    side: {
      left: '',
      right: '',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      align: 'alternate',
      side: 'left',
      class: 'row-start-1 self-end pb-8',
    },
    {
      orientation: 'horizontal',
      align: 'alternate',
      side: 'right',
      class: 'row-start-2 self-start pt-8',
    },
  ],
  defaultVariants: {
    orientation: timelineDefaults.orientation,
    align: timelineDefaults.align,
    side: timelineDefaults.align,
  },
})

export const timelineHeaderVariants = cva('', {
  variants: {
    orientation: {
      vertical: '',
      horizontal: 'w-full',
    },
  },
  defaultVariants: {
    orientation: timelineDefaults.orientation,
  },
})

export const timelineLabelVariants = cva('text-sm font-semibold text-foreground')

export const timelineDescriptionVariants = cva('text-sm text-muted-foreground', {
  variants: {
    orientation: {
      vertical: 'mt-2',
      horizontal: 'mt-3 w-full min-w-0',
    },
  },
  defaultVariants: {
    orientation: timelineDefaults.orientation,
  },
})

export const timelineIndicatorVariants = cva(
  'absolute z-10 flex items-center justify-center rounded-full border-2 font-medium transition-colors [&_svg]:size-[1em]',
  {
    variants: {
      orientation: {
        vertical: 'top-0',
        horizontal: 'start-0',
      },
      align: {
        left: '',
        right: '',
        alternate: '',
      },
      side: {
        left: '',
        right: '',
      },
      size: {
        xs: 'size-6 text-xs',
        sm: 'size-7 text-base',
        md: 'size-8 text-xl',
        lg: 'size-9 text-2xl',
        xl: 'size-10 text-[1.75rem]',
      } satisfies Record<(typeof import('./constants').timelineSizes)[number], string>,
      completed: {
        true: 'border-(--timeline-color)/20 bg-(--timeline-color) text-(--timeline-color-foreground)',
        false: 'border-border bg-background text-muted-foreground',
      },
    },
    compoundVariants: [
      { orientation: 'vertical', side: 'left', class: 'end-0 translate-x-1/2' },
      { orientation: 'vertical', side: 'right', class: 'start-0 -translate-x-1/2' },
      { orientation: 'horizontal', align: 'left', class: 'bottom-0 translate-y-1/2' },
      { orientation: 'horizontal', align: 'right', class: 'top-0 -translate-y-1/2' },
      { orientation: 'horizontal', align: 'alternate', class: 'top-1/2 -translate-y-1/2' },
    ],
    defaultVariants: {
      orientation: timelineDefaults.orientation,
      align: timelineDefaults.align,
      side: timelineDefaults.align,
      size: timelineDefaults.size,
      completed: false,
    },
  },
)

export const timelineSeparatorVariants = cva(
  'pointer-events-none absolute z-0 transition-colors group-last/timeline-item:hidden',
  {
    variants: {
      orientation: {
        vertical: 'top-0 bottom-0 w-0.5',
        horizontal: 'start-0 h-0.5 w-full',
      },
      align: {
        left: '',
        right: '',
        alternate: '',
      },
      side: {
        left: '',
        right: '',
      },
      completed: {
        true: '',
        false: 'bg-border',
      },
    },
    compoundVariants: [
      { orientation: 'vertical', side: 'left', class: 'end-0 translate-x-1/2' },
      { orientation: 'vertical', side: 'right', class: 'start-0 -translate-x-1/2' },
      { orientation: 'horizontal', align: 'left', class: 'bottom-0 translate-y-1/2' },
      { orientation: 'horizontal', align: 'right', class: 'top-0 -translate-y-1/2' },
      { orientation: 'horizontal', align: 'alternate', class: 'top-1/2 -translate-y-1/2' },
      { completed: true, class: 'bg-(--timeline-color)/40' },
    ],
    defaultVariants: {
      orientation: timelineDefaults.orientation,
      align: timelineDefaults.align,
      side: timelineDefaults.align,
      completed: false,
    },
  },
)

export type TimelineIndicatorVariants = VariantProps<typeof timelineIndicatorVariants>
export type TimelineItemVariants = VariantProps<typeof timelineItemVariants>
export type TimelineVariants = VariantProps<typeof timelineVariants>
export type TimelineSeparatorVariants = VariantProps<typeof timelineSeparatorVariants>

// Item
export interface TimelineItem {
  value: TimelineValue
  slot?: string
  label?: string
  description?: string
  icon?: IconName
}

// Props
export interface TimelineProps {
  modelValue?: TimelineValue
  items: TimelineItem[]
  orientation?: TimelineVariants['orientation']
  align?: TimelineAlign
  size?: TimelineIndicatorVariants['size']
  color?: string
  reverse?: boolean
  ui?: TimelineUI
}

// Fn
export type TimelineItemFn<T> = (context: TimelineItemContext) => T

// UI
export interface TimelineUI {
  item?: TimelineItemFn<HTMLAttributes>
  content?: TimelineItemFn<HTMLAttributes>
  header?: TimelineItemFn<HTMLAttributes>
  separator?: TimelineItemFn<HTMLAttributes>
  indicator?: TimelineItemFn<HTMLAttributes>
  label?: TimelineItemFn<HTMLAttributes>
  description?: TimelineItemFn<HTMLAttributes>
}

// Context
export interface TimelineItemContext {
  modelValue?: TimelineValue
  item: TimelineItem
  index: number
  active: boolean
  completed: boolean
  first: boolean
  last: boolean
  itemAlign: Exclude<TimelineAlign, 'alternate'>
}

// Slots
export type TimelineSlots = {
  header?(props: TimelineItemContext): unknown
  label?(props: TimelineItemContext): unknown
  description?(props: TimelineItemContext): unknown
  indicator?(props: TimelineItemContext): unknown
} & {
  [name: `header-${string}`]: ((props: TimelineItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: TimelineItemContext) => unknown) | undefined
  [name: `indicator-${string}`]: ((props: TimelineItemContext) => unknown) | undefined
  [name: `description-${string}`]: ((props: TimelineItemContext) => unknown) | undefined
}

export type TimelineEmits = {
  'update:modelValue': [value: TimelineValue | undefined]
}
