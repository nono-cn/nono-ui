import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type {
  TabsRootProps as RekaTabsRootProps,
  TabsTriggerProps as RekaTabsTriggerProps,
} from 'reka-ui'
import type { IconName } from '@/components/ui/Icon'
import { tabsDefaults, tabsOrientations, tabsVariantNames } from './constants'

export { default as Tabs } from './Tabs.vue'
export { tabsActivationModes, tabsDefaults, tabsOrientations, tabsVariantNames } from './constants'

export const tabsVariants = {
  root: cva('flex flex-col gap-2', {
    variants: {
      orientation: {
        horizontal: '',
        vertical: 'flex-row items-start',
      },
    },
    defaultVariants: {
      orientation: tabsDefaults.orientation,
    },
  }),
  list: cva(
    'inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground aria-[orientation=vertical]:h-fit aria-[orientation=vertical]:flex-col',
    {
      variants: {
        variant: {
          default: '',
          line: 'relative h-auto gap-1 rounded-none bg-transparent p-0',
        } satisfies Record<(typeof tabsVariantNames)[number], string>,
        orientation: {
          horizontal: '',
          vertical: 'shrink-0',
        } satisfies Record<(typeof tabsOrientations)[number], string>,
      },
      compoundVariants: [
        {
          variant: 'line',
          orientation: 'vertical',
          class: 'items-stretch',
        },
      ],
      defaultVariants: {
        variant: tabsDefaults.variant,
        orientation: tabsDefaults.orientation,
      },
    },
  ),
  trigger: cva(
    'inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground transition-[color,box-shadow] focus-visible:border-(--tabs-color) focus-visible:ring-3 focus-visible:ring-(--tabs-color)/50 focus-visible:outline-1 focus-visible:outline-(--tabs-color) disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-(--tabs-color) data-[state=active]:text-(--tabs-color-foreground) data-[state=active]:shadow-sm dark:text-muted-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-(--tabs-color) dark:data-[state=active]:text-(--tabs-color-foreground) [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
    {
      variants: {
        variant: {
          default: '',
          line: 'relative h-9 flex-none rounded-none border-0 bg-transparent px-3 text-muted-foreground shadow-none after:absolute after:bg-(--tabs-color) after:opacity-0 after:transition-opacity data-[state=active]:bg-transparent data-[state=active]:text-(--tabs-color) data-[state=active]:shadow-none data-[state=active]:after:opacity-100 dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-(--tabs-color)',
        },
        orientation: {
          horizontal: '',
          vertical: 'w-full justify-start',
        },
      },
      compoundVariants: [
        {
          variant: 'line',
          orientation: 'horizontal',
          class: 'after:inset-x-0 after:bottom-0 after:h-0.5',
        },
        {
          variant: 'line',
          orientation: 'vertical',
          class: 'after:inset-y-0 after:left-0 after:w-0.5',
        },
      ],
      defaultVariants: {
        variant: tabsDefaults.variant,
        orientation: tabsDefaults.orientation,
      },
    },
  ),
  contentWrapper: cva('min-w-0 flex-1'),
  content: cva(
    'flex-1 outline-none rounded-md focus-visible:ring-3 focus-visible:ring-(--tabs-color)/50',
  ),
}

export type TabsVariants = VariantProps<typeof tabsVariants.list>
export type TabsValue = string | number
export type TabsRootProps = Partial<
  Pick<RekaTabsRootProps<TabsValue>, 'orientation' | 'activationMode' | 'unmountOnHide'>
>
export type TabsTriggerProps = Partial<Pick<RekaTabsTriggerProps, 'as' | 'asChild'>>

export interface TabItem {
  slot: string
  value: TabsValue
  label?: string
  icon?: IconName
  trailingIcon?: IconName
  disabled?: boolean
  forceMount?: boolean
}

// Fn
export type TabsFn<T> = () => T
export type TabsItemFn<T> = (context: TabsItemContext) => T

// Props
export interface TabsProps extends TabsRootProps {
  modelValue?: TabsValue
  loop?: boolean
  variant?: TabsVariants['variant']
  color?: string
  tabs?: TabItem[]
  ui?: TabsUI
}

// UI
export interface TabsUI {
  list?: TabsFn<HTMLAttributes>
  contentWrapper?: TabsFn<HTMLAttributes>
  trigger?: TabsItemFn<HTMLAttributes>
  label?: TabsItemFn<HTMLAttributes>
  content?: TabsItemFn<HTMLAttributes>
}

// Context
export interface TabsContext {
  tabs: TabItem[]
}

export interface TabsItemContext {
  tab: TabItem
  index: number
  active: boolean
  first: boolean
  last: boolean
}

// Emits
export interface TabsEmits {
  'update:modelValue': [value: TabsValue | undefined]
}

// Slots
export type TabsSlots = {
  trigger?(props: TabsContext): unknown
  leading?(props: TabsContext): unknown
  label?(props: TabsContext): unknown
  trailing?(props: TabsContext): unknown
  content?(props: TabsContext): unknown
} & {
  [name: `trigger-${string}`]: ((props: TabsItemContext) => unknown) | undefined
  [name: `leading-${string}`]: ((props: TabsItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: TabsItemContext) => unknown) | undefined
  [name: `trailing-${string}`]: ((props: TabsItemContext) => unknown) | undefined
  [name: `content-${string}`]: ((props: TabsItemContext) => unknown) | undefined
}
