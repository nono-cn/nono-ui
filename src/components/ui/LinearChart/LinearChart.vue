<script setup lang="ts" generic="T">
import { computed, useAttrs } from 'vue'
import {
  VisAxis,
  VisCrosshair,
  VisLine,
  VisLineSelectors,
  VisTooltip,
  VisXYContainer,
} from '@unovis/vue'
import { cn } from '@/lib/utils'
import { linearChartVariants, type LinearChartAccessor, type LinearChartProps } from '.'
import { linearChartDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const props = withDefaults(defineProps<LinearChartProps<T>>(), linearChartDefaults)

const xValues = computed(() => props.data.map((datum, index) => props.x(datum, index)))
const xIsNumeric = computed(() => xValues.value.every((value) => typeof value === 'number'))
const xCategories = computed(() =>
  Array.from(new Set(xValues.value.filter((value): value is string => typeof value === 'string'))),
)

const normalizedX = computed(() => {
  if (xIsNumeric.value) return props.x

  return (datum: T, index: number) => {
    const value = props.x(datum, index)

    if (typeof value === 'number') return value
    if (value instanceof Date) return value.getTime()

    return xCategories.value.indexOf(value)
  }
})

const xAxisTickFormat = computed(() => {
  if (props.xTickFormat) return props.xTickFormat
  if (xIsNumeric.value || !xCategories.value.length) return undefined

  return (tick: number | Date) => xCategories.value[Math.round(Number(tick))] ?? ''
})

const yAxisTickFormat = computed(() => props.yTickFormat)

const lineColor = computed(() => props.colors ?? props.color)

const lineEvents = computed(() => {
  if (!props.events) return undefined

  const events: Record<string, (data: unknown, event: Event, index: number) => void> = {}

  for (const eventName of ['click', 'mouseover', 'mouseleave'] as const) {
    const handler = props.events[eventName]
    if (!handler) continue

    events[eventName] = (_data, event, index) => handler(event as MouseEvent, index)
  }

  return { [VisLineSelectors.line]: events }
})

const crosshairX = computed(() => normalizedX.value as LinearChartAccessor<T, number | Date>)

const escapeTooltipValue = (value: unknown) =>
  String(value ?? '—').replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }

    return entities[character]
  })

const tooltipTemplate = (datum: T | undefined, _x: number | Date, _data: T[], index?: number) => {
  if (!datum) return ''

  const datumIndex = index ?? props.data.indexOf(datum)
  if (datumIndex < 0) return ''

  const yAccessors = Array.isArray(props.y) ? props.y : [props.y]
  const rows = yAccessors
    .map(
      (accessor, seriesIndex) =>
        `<div><span>Serie ${seriesIndex + 1}</span><strong>${escapeTooltipValue(accessor(datum, datumIndex))}</strong></div>`,
    )
    .join('')

  return `<div><strong>${escapeTooltipValue(props.x(datum, datumIndex))}</strong>${rows}</div>`
}

const rootProps = computed(() => ({
  ...attrs,
  role: attrs.role ?? 'img',
  'aria-label': attrs['aria-label'],
  class: cn(linearChartVariants(), attrs.class),
  style: attrs.style,
}))
</script>

<template>
  <div v-bind="rootProps" data-slot="linear-chart" data-test-linear-chart-root>
    <VisXYContainer
      :data="props.data"
      :height="props.height"
      :y-domain="props.yDomain"
      data-test-linear-chart-container
    >
      <VisLine
        :x="normalizedX"
        :y="props.y"
        :curve-type="props.curveType"
        :color="lineColor"
        :line-width="props.lineWidth"
        :line-dash-array="props.lineDashArray"
        :interpolate-missing-data="props.interpolateMissingData"
        :fallback-value="props.fallbackValue"
        :highlight-on-hover="props.highlightOnHover"
        :cursor="props.cursor"
        :events="lineEvents"
        data-test-linear-chart-line
      />
      <VisAxis
        type="x"
        :label="props.xLabel"
        :num-ticks="props.xNumTicks"
        :tick-format="xAxisTickFormat"
        :grid-line="props.gridLine"
        data-test-linear-chart-x-axis
      />
      <VisAxis
        type="y"
        :label="props.yLabel"
        :num-ticks="props.yNumTicks"
        :tick-format="yAxisTickFormat"
        :grid-line="props.gridLine"
        data-test-linear-chart-y-axis
      />
      <VisTooltip v-if="props.tooltip" data-test-linear-chart-tooltip />
      <VisCrosshair
        v-if="props.crosshair || props.tooltip"
        :x="crosshairX"
        :y="props.y"
        :template="props.tooltip ? tooltipTemplate : undefined"
        data-test-linear-chart-crosshair
      />
    </VisXYContainer>
  </div>
</template>
