import { cva } from 'class-variance-authority'
import { linearChartCurveTypes } from './constants'

export { default as LinearChart } from './LinearChart.vue'
export { linearChartCurveTypes, linearChartDefaults } from './constants'

export const linearChartVariants = cva('relative w-full')

export type LinearChartXValue = number | string | Date
export type LinearChartAccessor<T, V> = (datum: T, index: number) => V
export type LinearChartYAccessor<T> = LinearChartAccessor<T, number | null | undefined>
export type LinearChartEventHandler = (event: MouseEvent, seriesIndex: number) => void
export type LinearChartTickFormat = (value: number | Date, index: number) => string
export interface LinearChartEvents {
  click?: LinearChartEventHandler
  mouseover?: LinearChartEventHandler
  mouseleave?: LinearChartEventHandler
}
export type LinearChartCurveType = (typeof linearChartCurveTypes)[number]

export interface LinearChartProps<T = Record<string, unknown>> {
  data: T[]
  x: LinearChartAccessor<T, LinearChartXValue>
  y: LinearChartYAccessor<T> | LinearChartYAccessor<T>[]
  events?: LinearChartEvents
  height?: number | string
  color?: string
  colors?: string[]
  lineWidth?: number
  lineDashArray?: number[]
  curveType?: LinearChartCurveType
  interpolateMissingData?: boolean
  fallbackValue?: number | null
  highlightOnHover?: boolean
  cursor?: string
  tooltip?: boolean
  crosshair?: boolean
  yDomain?: [number | undefined, number | undefined]
  xTickFormat?: LinearChartTickFormat
  yTickFormat?: LinearChartTickFormat
  xLabel?: string
  yLabel?: string
  xNumTicks?: number
  yNumTicks?: number
  gridLine?: boolean
}
