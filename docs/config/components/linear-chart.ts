import type { ComponentDocConfig } from '../component-docs'
import { linearChartCurveTypes, linearChartDefaults } from '@/components/ui/LinearChart'
import LinearChartUsageExample from '../../components/examples/linear-chart/LinearChartUsageExample.vue'
import LinearChartSeriesExample from '../../components/examples/linear-chart/LinearChartSeriesExample.vue'
import LinearChartAppearanceExample from '../../components/examples/linear-chart/LinearChartAppearanceExample.vue'
import LinearChartAxesExample from '../../components/examples/linear-chart/LinearChartAxesExample.vue'
import LinearChartInteractionExample from '../../components/examples/linear-chart/LinearChartInteractionExample.vue'
import LinearChartMissingDataExample from '../../components/examples/linear-chart/LinearChartMissingDataExample.vue'
import LinearChartDatesExample from '../../components/examples/linear-chart/LinearChartDatesExample.vue'
import LinearChartHeightExample from '../../components/examples/linear-chart/LinearChartHeightExample.vue'
import LinearChartEventsExample from '../../components/examples/linear-chart/LinearChartEventsExample.vue'

const linearChartConfig: ComponentDocConfig = {
  slug: 'linear-chart',
  title: 'LinearChart',
  language: 'en',
  description: 'Plots one or more numeric series against numeric, date, or category values.',
  importPath: '@nono-ui/components/ui/LinearChart',
  usage: [
    {
      title: 'Basic usage',
      description: 'Plot one numeric series with X and Y accessors.',
      component: LinearChartUsageExample,
    },
  ],
  examples: [
    {
      title: 'Multiple series',
      description: 'Plot several Y accessors and choose a color for each series.',
      component: LinearChartSeriesExample,
    },
    {
      title: 'Date values',
      description: 'Use dates on the X axis and format their ticks.',
      component: LinearChartDatesExample,
    },
    {
      title: 'Line appearance',
      description: 'Choose the interpolation curve, color, width, and stroke pattern.',
      component: LinearChartAppearanceExample,
    },
    {
      title: 'Chart height',
      description: 'Adjust the height of the chart.',
      component: LinearChartHeightExample,
    },
    {
      title: 'Axes and grid',
      description: 'Set axis labels, tick formatting, tick counts, the Y domain, and grid lines.',
      component: LinearChartAxesExample,
    },
    {
      title: 'Interaction',
      description: 'Show a tooltip, crosshair, and hover highlighting.',
      component: LinearChartInteractionExample,
    },
    {
      title: 'Line events',
      description: 'Handle click, mouseover, and mouseleave on the line.',
      component: LinearChartEventsExample,
    },
    {
      title: 'Missing data',
      description: 'Connect points across missing values or substitute a fallback value.',
      component: LinearChartMissingDataExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible description',
      description:
        'The root uses role="img" by default. Give it a concise aria-label that identifies the series and range, and provide a nearby table or text summary when readers need the exact data. Interactive hover details alone are not a substitute for that data.',
    },
  ],
  api: {
    props: [
      {
        name: 'data',
        type: 'T[]',
        required: true,
        description: 'Rows passed to the chart container and the X and Y accessors.',
      },
      {
        name: 'x',
        type: '(datum: T, index: number) => number | string | Date',
        required: true,
        description:
          'X value for each row. Strings become ordered categories; dates become timestamps.',
      },
      {
        name: 'y',
        type: '((datum: T, index: number) => number | null | undefined) | Array<(datum: T, index: number) => number | null | undefined>',
        required: true,
        description: 'One Y accessor or an array of accessors for multiple series.',
      },
      {
        name: 'events',
        type: 'LinearChartEvents',
        typeLink: '#linear-chart-events',
        default: 'undefined',
        description: 'Line callbacks for click, mouseover, and mouseleave.',
      },
      {
        name: 'height',
        type: 'number | string',
        default: String(linearChartDefaults.height),
        description: 'Height passed to the chart container.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${linearChartDefaults.color}'`,
        description: 'Color of a single series when colors is not provided.',
      },
      {
        name: 'colors',
        type: 'string[]',
        default: 'undefined',
        description: 'Colors for multiple series. Takes priority over color when provided.',
      },
      {
        name: 'lineWidth',
        type: 'number',
        default: String(linearChartDefaults.lineWidth),
        description: 'Stroke width of the line.',
      },
      {
        name: 'lineDashArray',
        type: 'number[]',
        default: 'undefined',
        description: 'Alternating dash and gap lengths for a dashed line.',
      },
      {
        name: 'curveType',
        type: linearChartCurveTypes.map((curve) => `'${curve}'`).join(' | '),
        default: `'${linearChartDefaults.curveType}'`,
        description: 'Interpolation curve used to connect the points.',
      },
      {
        name: 'interpolateMissingData',
        type: 'boolean',
        default: String(linearChartDefaults.interpolateMissingData),
        description: 'Connects the line across missing Y values when true.',
      },
      {
        name: 'fallbackValue',
        type: 'number | null',
        default: String(linearChartDefaults.fallbackValue),
        description: 'Value passed to the line for missing Y values.',
      },
      {
        name: 'highlightOnHover',
        type: 'boolean',
        default: String(linearChartDefaults.highlightOnHover),
        description: 'Highlights a line when the pointer hovers over it.',
      },
      {
        name: 'cursor',
        type: 'string',
        default: String(linearChartDefaults.cursor),
        description: 'Cursor value passed to the line.',
      },
      {
        name: 'tooltip',
        type: 'boolean',
        default: String(linearChartDefaults.tooltip),
        description: 'Shows a tooltip on hover and enables the associated crosshair.',
      },
      {
        name: 'crosshair',
        type: 'boolean',
        default: String(linearChartDefaults.crosshair),
        description: 'Shows a crosshair even when tooltip is disabled.',
      },
      {
        name: 'yDomain',
        type: '[number | undefined, number | undefined]',
        default: String(linearChartDefaults.yDomain),
        description: 'Optional lower and upper bounds passed to the Y scale.',
      },
      {
        name: 'xTickFormat',
        type: '(value: number | Date, index: number) => string',
        default: 'undefined',
        description: 'Formats X axis ticks. String categories use their labels when omitted.',
      },
      {
        name: 'yTickFormat',
        type: '(value: number | Date, index: number) => string',
        default: 'undefined',
        description: 'Formats Y axis ticks.',
      },
      {
        name: 'xLabel',
        type: 'string',
        default: 'undefined',
        description: 'Label displayed on the X axis.',
      },
      {
        name: 'yLabel',
        type: 'string',
        default: 'undefined',
        description: 'Label displayed on the Y axis.',
      },
      {
        name: 'xNumTicks',
        type: 'number',
        default: 'undefined',
        description: 'Requested number of X axis ticks.',
      },
      {
        name: 'yNumTicks',
        type: 'number',
        default: 'undefined',
        description: 'Requested number of Y axis ticks.',
      },
      {
        name: 'gridLine',
        type: 'boolean',
        default: String(linearChartDefaults.gridLine),
        description: 'Shows grid lines for both axes.',
      },
    ],
    configs: [
      {
        id: 'linear-chart-events',
        title: 'LinearChartEvents',
        description: 'Each callback receives the mouse event and the series index.',
        typeLabel: 'event',
        showDefault: false,
        rows: [
          {
            name: 'click',
            type: '(event: MouseEvent, seriesIndex: number) => void',
            description: 'Called when a line is clicked.',
          },
          {
            name: 'mouseover',
            type: '(event: MouseEvent, seriesIndex: number) => void',
            description: 'Called when the pointer enters a line.',
          },
          {
            name: 'mouseleave',
            type: '(event: MouseEvent, seriesIndex: number) => void',
            description: 'Called when the pointer leaves a line.',
          },
        ],
      },
    ],
    emits: [],
    slots: [],
    expose: [],
  },
}

export default linearChartConfig
