import type { HTMLAttributes } from 'vue'
import type {
  SplitterGroupProps,
  SplitterPanelProps,
  SplitterResizeHandleProps,
} from 'reka-ui'

export { default as Splitter } from './Splitter.vue'

export type SplitterDirection = 'horizontal' | 'vertical'

export interface SplitterItem {
  slot?: string
  id?: SplitterPanelProps ['id']
  collapsedSize?: SplitterPanelProps ['collapsedSize']
  collapsible?: SplitterPanelProps ['collapsible']
  defaultSize?: SplitterPanelProps ['defaultSize']
  maxSize?: SplitterPanelProps ['maxSize']
  minSize?: SplitterPanelProps ['minSize']
  order?: SplitterPanelProps ['order']
  sizeUnit?: SplitterPanelProps ['sizeUnit']
  class,
  style,
}

export interface SplitterProps {
  id?: SplitterGroupProps['id']
  autoSaveId?: SplitterGroupProps['autoSaveId']
  direction?: SplitterDirection
  keyboardResizeBy?: SplitterGroupProps['keyboardResizeBy']
  storage?: SplitterGroupProps['storage']
  hitAreaMargins?: SplitterResizeHandleProps['hitAreaMargins']
  tabindex?: SplitterResizeHandleProps['tabindex']
  disabled?: SplitterResizeHandleProps['disabled']
  nonce?: SplitterResizeHandleProps['nonce']
  items?: SplitterItem[]
  ui?: SplitterUI
}

// Context
export interface SplitterItemContext {
  layout: number[]
  item: SplitterItem
  index: number
  first: boolean
  last: boolean
  nextItem?: SplitterItem
}

// Fn
export type SplitterPanelFn<T> = (context: SplitterItemContext) => T
export type SplitterResizeHandleFn<T> = (context: SplitterItemContext) => T

// Ui
export interface SplitterUI {
  panel?: SplitterPanelFn<HTMLAttributes>
  resizeHandle?: SplitterResizeHandleFn<HTMLAttributes>
}

// Emits
export interface SplitterEmits {
  layout: [layout: number[]]
  collapse: []
  expand: []
  resize: [size: number, previousSize: number | undefined]
}

// Slots
export type SplitterSlots = {
  default?(props: SplitterItemContext): unknown
  handle?(props: SplitterItemContext): unknown
} & {
  [name: `panel-${string}`]: ((props: SplitterItemContext) => unknown) | undefined
  [name: `handle-${string}`]: ((props: SplitterItemContext) => unknown) | undefined
}
