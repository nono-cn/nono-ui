import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import {
  LinearChart,
  type LinearChartEvents,
  type LinearChartProps,
} from '@/components/ui/LinearChart'
import { testAttrs } from '../utils/testAttrs'

vi.mock('@unovis/vue', () => {
  const createStub = (name: string, props: string[]) =>
    defineComponent({
      name,
      props,
      setup(_, { attrs, slots }) {
        return () => h('div', attrs, slots.default?.())
      },
    })

  return {
    VisAxis: createStub('VisAxis', ['type', 'label', 'numTicks', 'tickFormat', 'gridLine']),
    VisLine: createStub('VisLine', [
      'x',
      'y',
      'curveType',
      'color',
      'lineWidth',
      'lineDashArray',
      'interpolateMissingData',
      'fallbackValue',
      'highlightOnHover',
      'cursor',
      'events',
    ]),
    VisLineSelectors: { line: 'line-selector' },
    VisTooltip: createStub('VisTooltip', []),
    VisCrosshair: createStub('VisCrosshair', ['x', 'y', 'template']),
    VisXYContainer: createStub('VisXYContainer', ['data', 'height', 'yDomain']),
  }
})

type Point = { position: number; label: string; value: number | null | undefined }

const data: Point[] = [
  { position: 0, label: 'A', value: 10 },
  { position: 1, label: 'B', value: null },
  { position: 2, label: 'C', value: 30 },
]

const x = (point: Point) => point.position
const y = (point: Point) => point.value

export function mountChart(
  props: Partial<LinearChartProps<Point>> = {},
  attrs: Record<string, string> = {},
) {
  return mount(LinearChart, {
    props: {
      data,
      x,
      y,
      ...props,
    },
    attrs,
  })
}

const casesData = [
  { name: 'un array vacío', input: [] },
  { name: 'un punto', input: [data[0]] },
  { name: 'varios puntos', input: data },
]

const categoryData: Point[] = [
  { position: 0, label: 'A', value: 10 },
  { position: 1, label: 'B', value: 20 },
  { position: 2, label: 'A', value: 30 },
]
const dates = [new Date('2026-01-01T00:00:00Z'), new Date('2026-02-01T00:00:00Z')]
const mixedDate = new Date('2026-01-01T00:00:00Z')

const casesX = [
  {
    name: 'valores numéricos',
    data,
    input: (point: Point, index: number) => point.position + index,
    expected: { values: [0, 2, 4], sameAccessor: true },
  },
  {
    name: 'categorías de texto, incluida una repetida',
    data: categoryData,
    input: (point: Point) => point.label,
    expected: { values: [0, 1, 0], tickLabels: ['A', 'B'] },
  },
  {
    name: 'fechas',
    data,
    input: (point: Point) => dates[point.position % dates.length],
    expected: { values: [dates[0].getTime(), dates[1].getTime(), dates[0].getTime()] },
  },
  {
    name: 'valores numéricos, texto y fechas mezclados',
    data,
    input: (point: Point) => (point.position === 0 ? 10 : point.position === 1 ? 'B' : mixedDate),
    expected: { values: [10, 0, mixedDate.getTime()] },
  },
]

const casesY = [
  { name: 'una función de acceso', input: y },
  { name: 'varias funciones de acceso', input: [y, (point: Point) => point.position] },
  { name: 'un array vacío de funciones de acceso', input: [] },
]

const casesHeight = [
  { name: 'el valor por defecto', input: undefined, expected: 320 },
  { name: 'un número', input: 240, expected: 240 },
  { name: 'cero', input: 0, expected: 0 },
  { name: 'una cadena CSS', input: '50vh', expected: '50vh' },
]

const casesColor = [
  { name: 'el valor por defecto', input: undefined, expected: 'var(--chart-1)' },
  { name: 'un color personalizado', input: '#f00', expected: '#f00' },
  { name: 'una cadena vacía', input: '', expected: '' },
]

const casesColors = [
  { name: 'sin colores', input: undefined, expected: 'var(--chart-1)' },
  { name: 'un array vacío', input: [], expected: [] },
  { name: 'un color', input: ['#f00'], expected: ['#f00'] },
  { name: 'varios colores', input: ['#f00', '#00f'], expected: ['#f00', '#00f'] },
  {
    name: 'colores con prioridad sobre color',
    input: ['#f00', '#00f'],
    color: '#0f0',
    expected: ['#f00', '#00f'],
  },
]

const casesLineWidth = [
  { name: 'el valor por defecto', input: undefined, expected: 2 },
  { name: 'cero', input: 0, expected: 0 },
  { name: 'un número entero', input: 4, expected: 4 },
  { name: 'un número decimal', input: 1.5, expected: 1.5 },
]

const casesLineDashArray = [
  { name: 'sin patrón', input: undefined, expected: undefined },
  { name: 'un array vacío', input: [], expected: [] },
  { name: 'un patrón de trazos y espacios', input: [6, 3], expected: [6, 3] },
  { name: 'un patrón con varios segmentos', input: [6, 3, 2, 3], expected: [6, 3, 2, 3] },
]

const casesCurveType = [
  { name: 'el valor por defecto', input: undefined, expected: 'linear' },
  ...(
    [
      'basis',
      'basisClosed',
      'basisOpen',
      'bundle',
      'cardinal',
      'cardinalClosed',
      'cardinalOpen',
      'catmullRom',
      'catmullRomClosed',
      'catmullRomOpen',
      'linear',
      'linearClosed',
      'monotoneX',
      'monotoneY',
      'natural',
      'step',
      'stepAfter',
      'stepBefore',
    ] as const
  ).map((curveType) => ({ name: curveType, input: curveType, expected: curveType })),
]

const casesInterpolateMissingData = [
  { name: 'el valor por defecto', input: undefined, expected: false },
  { name: 'activado', input: true, expected: true },
  { name: 'desactivado', input: false, expected: false },
]

const casesFallbackValue = [
  { name: 'el valor por defecto', input: undefined, expected: undefined },
  { name: 'nulo', input: null, expected: null },
  { name: 'cero', input: 0, expected: 0 },
  { name: 'un número', input: 12, expected: 12 },
]

const casesHighlightOnHover = [
  { name: 'el valor por defecto', input: undefined, expected: false },
  { name: 'activado', input: true, expected: true },
  { name: 'desactivado', input: false, expected: false },
]

const casesCursor = [
  { name: 'el valor por defecto', input: undefined, expected: undefined },
  { name: 'un cursor personalizado', input: 'pointer', expected: 'pointer' },
  { name: 'una cadena vacía', input: '', expected: '' },
]

const casesCrosshair = [
  { name: 'el valor por defecto', input: undefined, tooltip: undefined, expected: false },
  { name: 'desactivado', input: false, tooltip: false, expected: false },
  { name: 'activado', input: true, tooltip: false, expected: true },
  { name: 'desactivado con tooltip activo', input: false, tooltip: true, expected: true },
]

const casesTooltip = [
  { name: 'el valor por defecto', input: undefined, expected: false },
  { name: 'desactivado', input: false, expected: false },
  { name: 'activado', input: true, expected: true },
]

const casesYDomain = [
  { name: 'el valor por defecto', input: undefined, expected: undefined },
  {
    name: 'ambos límites abiertos',
    input: [undefined, undefined],
    expected: [undefined, undefined],
  },
  { name: 'solo el límite inferior', input: [0, undefined], expected: [0, undefined] },
  { name: 'solo el límite superior', input: [undefined, 100], expected: [undefined, 100] },
  { name: 'ambos límites', input: [-10, 100], expected: [-10, 100] },
] satisfies { name: string; input: LinearChartProps<Point>['yDomain']; expected: unknown }[]

const customXTickFormat = (value: number | Date) => `X: ${value}`
const casesXTickFormat = [
  {
    name: 'sin formato para valores numéricos',
    data,
    x,
    input: undefined,
    expected: { format: undefined, labels: undefined },
  },
  {
    name: 'formato automático para categorías',
    data: categoryData,
    x: (point: Point) => point.label,
    input: undefined,
    expected: { format: undefined, labels: ['A', 'B'] },
  },
  {
    name: 'formato personalizado para valores numéricos',
    data,
    x,
    input: customXTickFormat,
    expected: { format: customXTickFormat, labels: undefined },
  },
  {
    name: 'formato personalizado que sustituye al de categorías',
    data: categoryData,
    x: (point: Point) => point.label,
    input: customXTickFormat,
    expected: { format: customXTickFormat, labels: undefined },
  },
]

const customYTickFormat = (value: number | Date) => `${value} €`
const casesYTickFormat = [
  { name: 'el valor por defecto', input: undefined, expected: undefined },
  { name: 'una función de formato', input: customYTickFormat, expected: customYTickFormat },
]

const casesXLabel = [
  { name: 'el valor por defecto', input: undefined, expected: undefined },
  { name: 'una etiqueta', input: 'Mes', expected: 'Mes' },
  { name: 'una cadena vacía', input: '', expected: '' },
]

const casesYLabel = [
  { name: 'el valor por defecto', input: undefined, expected: undefined },
  { name: 'una etiqueta', input: 'Ingresos', expected: 'Ingresos' },
  { name: 'una cadena vacía', input: '', expected: '' },
]

const casesXNumTicks = [
  { name: 'el valor por defecto', input: undefined, expected: undefined },
  { name: 'cero', input: 0, expected: 0 },
  { name: 'un número de marcas', input: 4, expected: 4 },
]

const casesYNumTicks = [
  { name: 'el valor por defecto', input: undefined, expected: undefined },
  { name: 'cero', input: 0, expected: 0 },
  { name: 'un número de marcas', input: 6, expected: 6 },
]

const casesGridLine = [
  { name: 'el valor por defecto', input: undefined, expected: true },
  { name: 'activado', input: true, expected: true },
  { name: 'desactivado', input: false, expected: false },
]

const casesEvents = [
  { name: 'el valor por defecto', input: undefined, expected: undefined },
  { name: 'un objeto vacío', input: {}, expected: [] },
  { name: 'solo click', input: { click: vi.fn() }, expected: ['click'] },
  { name: 'solo mouseover', input: { mouseover: vi.fn() }, expected: ['mouseover'] },
  { name: 'solo mouseleave', input: { mouseleave: vi.fn() }, expected: ['mouseleave'] },
  {
    name: 'los tres eventos',
    input: { click: vi.fn(), mouseover: vi.fn(), mouseleave: vi.fn() },
    expected: ['click', 'mouseover', 'mouseleave'],
  },
] satisfies {
  name: string
  input: LinearChartEvents | undefined
  expected: (keyof LinearChartEvents)[] | undefined
}[]

describe('LinearChart', () => {
  describe('props', () => {
    describe('events', () => {
      it.each(casesEvents)('pasa $name a VisLine', ({ input, expected }) => {
        const wrapper = mountChart({ events: input })
        const events = wrapper.findComponent({ name: 'VisLine' }).props('events') as
          | Record<string, Record<string, (_data: unknown, event: Event, index: number) => void>>
          | undefined

        if (!expected) {
          expect(events).toBeUndefined()
          return
        }

        expect(Object.keys(events ?? {})).toEqual(['line-selector'])
        const handlers = events?.['line-selector']
        expect(Object.keys(handlers ?? {})).toEqual(expected)

        for (const name of expected) {
          const event = new MouseEvent(name)
          handlers?.[name]?.(data[0], event, 2)
          expect(input?.[name]).toHaveBeenCalledExactlyOnceWith(event, 2)
        }
      })
    })

    describe('data', () => {
      it.each(casesData)('pasa $name a VisXYContainer', ({ input }) => {
        const wrapper = mountChart({ data: input })

        expect(wrapper.findComponent({ name: 'VisXYContainer' }).props('data')).toEqual(input)
      })
    })

    describe('x', () => {
      it.each(casesX)('pasa $name a VisLine', ({ data, input, expected }) => {
        const wrapper = mountChart({ data, x: input })
        const accessor = wrapper.findComponent({ name: 'VisLine' }).props('x') as typeof x

        expect(data.map(accessor)).toEqual(expected.values)
        if ('sameAccessor' in expected) expect(accessor).toBe(input)
        if ('tickLabels' in expected) {
          const format = wrapper.findComponent({ name: 'VisAxis' }).props('tickFormat') as (
            value: number,
          ) => string
          expect([0, 1].map(format)).toEqual(expected.tickLabels)
        }
      })
    })

    describe('y', () => {
      it.each(casesY)('pasa $name a VisLine', ({ input }) => {
        const wrapper = mountChart({ y: input })

        expect(wrapper.findComponent({ name: 'VisLine' }).props('y')).toEqual(input)
      })
    })

    describe('height', () => {
      it.each(casesHeight)('pasa $name a VisXYContainer', ({ input, expected }) => {
        const wrapper = mountChart({ height: input })

        expect(wrapper.findComponent({ name: 'VisXYContainer' }).props('height')).toBe(expected)
      })
    })

    describe('color', () => {
      it.each(casesColor)('pasa $name a VisLine', ({ input, expected }) => {
        const wrapper = mountChart({ color: input })

        expect(wrapper.findComponent({ name: 'VisLine' }).props('color')).toBe(expected)
      })
    })

    describe('colors', () => {
      it.each(casesColors)('pasa $name a VisLine', ({ input, color, expected }) => {
        const wrapper = mountChart({ colors: input, color })

        expect(wrapper.findComponent({ name: 'VisLine' }).props('color')).toEqual(expected)
      })
    })

    describe('lineWidth', () => {
      it.each(casesLineWidth)('pasa $name a VisLine', ({ input, expected }) => {
        const wrapper = mountChart({ lineWidth: input })

        expect(wrapper.findComponent({ name: 'VisLine' }).props('lineWidth')).toBe(expected)
      })
    })

    describe('lineDashArray', () => {
      it.each(casesLineDashArray)('pasa $name a VisLine', ({ input, expected }) => {
        const wrapper = mountChart({ lineDashArray: input })

        expect(wrapper.findComponent({ name: 'VisLine' }).props('lineDashArray')).toEqual(expected)
      })
    })

    describe('curveType', () => {
      it.each(casesCurveType)('pasa $name a VisLine', ({ input, expected }) => {
        const wrapper = mountChart({ curveType: input })

        expect(wrapper.findComponent({ name: 'VisLine' }).props('curveType')).toBe(expected)
      })
    })

    describe('interpolateMissingData', () => {
      it.each(casesInterpolateMissingData)('pasa $name a VisLine', ({ input, expected }) => {
        const wrapper = mountChart({ interpolateMissingData: input })

        expect(wrapper.findComponent({ name: 'VisLine' }).props('interpolateMissingData')).toBe(
          expected,
        )
      })
    })

    describe('fallbackValue', () => {
      it.each(casesFallbackValue)('pasa $name a VisLine', ({ input, expected }) => {
        const wrapper = mountChart({ fallbackValue: input })

        expect(wrapper.findComponent({ name: 'VisLine' }).props('fallbackValue')).toBe(expected)
      })
    })

    describe('highlightOnHover', () => {
      it.each(casesHighlightOnHover)('pasa $name a VisLine', ({ input, expected }) => {
        const wrapper = mountChart({ highlightOnHover: input })

        expect(wrapper.findComponent({ name: 'VisLine' }).props('highlightOnHover')).toBe(expected)
      })
    })

    describe('cursor', () => {
      it.each(casesCursor)('pasa $name a VisLine', ({ input, expected }) => {
        const wrapper = mountChart({ cursor: input })

        expect(wrapper.findComponent({ name: 'VisLine' }).props('cursor')).toBe(expected)
      })
    })

    describe('crosshair', () => {
      it.each(casesCrosshair)('muestra VisCrosshair con $name', ({ input, tooltip, expected }) => {
        const wrapper = mountChart({ crosshair: input, tooltip })
        const crosshair = wrapper.findComponent({ name: 'VisCrosshair' })

        expect(crosshair.exists()).toBe(expected)
        if (expected) {
          expect(crosshair.props('x')).toBe(x)
          expect(crosshair.props('y')).toBe(y)
          expect(typeof crosshair.props('template')).toBe(tooltip ? 'function' : 'undefined')
        }
      })
    })

    describe('tooltip', () => {
      it.each(casesTooltip)('muestra los componentes de ayuda con $name', ({ input, expected }) => {
        const wrapper = mountChart({ tooltip: input })
        const crosshair = wrapper.findComponent({ name: 'VisCrosshair' })

        expect(wrapper.findComponent({ name: 'VisTooltip' }).exists()).toBe(expected)
        expect(crosshair.exists()).toBe(expected)
        if (expected) expect(typeof crosshair.props('template')).toBe('function')
      })
    })

    describe('yDomain', () => {
      it.each(casesYDomain)('pasa $name a VisXYContainer', ({ input, expected }) => {
        const wrapper = mountChart({ yDomain: input })

        expect(wrapper.findComponent({ name: 'VisXYContainer' }).props('yDomain')).toEqual(expected)
      })
    })

    describe('xTickFormat', () => {
      it.each(casesXTickFormat)('pasa $name al eje X', ({ data, x, input, expected }) => {
        const wrapper = mountChart({ data, x, xTickFormat: input })
        const format = wrapper.findAllComponents({ name: 'VisAxis' })[0].props('tickFormat') as
          ((value: number) => string) | undefined

        if (expected.labels) {
          expect([0, 1].map((tick) => format?.(tick))).toEqual(expected.labels)
        } else {
          expect(format).toBe(expected.format)
        }
      })
    })

    describe('yTickFormat', () => {
      it.each(casesYTickFormat)('pasa $name al eje Y', ({ input, expected }) => {
        const wrapper = mountChart({ yTickFormat: input })

        expect(wrapper.findAllComponents({ name: 'VisAxis' })[1].props('tickFormat')).toBe(expected)
      })
    })

    describe('xLabel', () => {
      it.each(casesXLabel)('pasa $name al eje X', ({ input, expected }) => {
        const wrapper = mountChart({ xLabel: input })

        expect(wrapper.findAllComponents({ name: 'VisAxis' })[0].props('label')).toBe(expected)
      })
    })

    describe('yLabel', () => {
      it.each(casesYLabel)('pasa $name al eje Y', ({ input, expected }) => {
        const wrapper = mountChart({ yLabel: input })

        expect(wrapper.findAllComponents({ name: 'VisAxis' })[1].props('label')).toBe(expected)
      })
    })

    describe('xNumTicks', () => {
      it.each(casesXNumTicks)('pasa $name al eje X', ({ input, expected }) => {
        const wrapper = mountChart({ xNumTicks: input })

        expect(wrapper.findAllComponents({ name: 'VisAxis' })[0].props('numTicks')).toBe(expected)
      })
    })

    describe('yNumTicks', () => {
      it.each(casesYNumTicks)('pasa $name al eje Y', ({ input, expected }) => {
        const wrapper = mountChart({ yNumTicks: input })

        expect(wrapper.findAllComponents({ name: 'VisAxis' })[1].props('numTicks')).toBe(expected)
      })
    })

    describe('gridLine', () => {
      it.each(casesGridLine)('pasa $name a ambos ejes', ({ input, expected }) => {
        const wrapper = mountChart({ gridLine: input })
        const axes = wrapper.findAllComponents({ name: 'VisAxis' })

        expect(axes[0].props('gridLine')).toBe(expected)
        expect(axes[1].props('gridLine')).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-linear-chart-root]',
      mount: (attrs) => mountChart({}, attrs),
    })

    it('usa el rol img por defecto y permite cambiarlo', () => {
      expect(mountChart().get('[data-test-linear-chart-root]').attributes('role')).toBe('img')
      expect(
        mountChart({}, { role: 'group' }).get('[data-test-linear-chart-root]').attributes('role'),
      ).toBe('group')
    })
  })

  describe('variantsCss', () => {
    describe('linearChartVariants', () => {
      it('mantiene las clases base del gráfico', () => {
        const root = mountChart().get('[data-test-linear-chart-root]')

        expect(root.element.tagName).toBe('DIV')
        expect(root.classes()).toEqual(expect.arrayContaining(['relative', 'w-full']))
      })
    })
  })
})
