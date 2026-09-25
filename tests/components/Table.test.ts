import { mount, type MountingOptions } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'

import { Icon } from '@/components/ui/Icon'
import { Table, type TableColumnDef, type TableProps } from '@/components/ui/Table'
import { testAttrs } from '../utils/testAttrs'

type Person = {
  firstName: string
  age: number
}

const columns: TableColumnDef<Person>[] = [
  { accessorKey: 'firstName', header: 'First name' },
  { accessorKey: 'age', header: 'Age' },
]
const sortableColumns: TableColumnDef<Person>[] = [
  { accessorKey: 'firstName', header: 'First name', enableSorting: true },
  { accessorKey: 'age', header: 'Age', enableSorting: true },
]
type SpanningRow = {
  region: string
  city: string
  isSummary?: boolean
}

const spanningData: SpanningRow[] = [
  { region: 'North', city: 'Bilbao' },
  { region: 'North', city: 'Santander' },
  { region: 'South', city: 'Seville' },
  { region: 'Total', city: '', isSummary: true },
]

const cellSpanningColumns: TableColumnDef<SpanningRow>[] = [
  { accessorKey: 'region', header: 'Region', spanRows: true },
  { accessorKey: 'city', header: 'City' },
]

const columnSpanningColumns: TableColumnDef<SpanningRow>[] = [
  {
    accessorKey: 'region',
    header: 'Region',
    spanColumns: ({ row }) => (row.original.isSummary ? Infinity : 1),
  },
  { accessorKey: 'city', header: 'City' },
]

function mountTable(options: MountingOptions<TableProps<Person>> = {}) {
  return mount(Table, options)
}

function mountSortableTable(options: MountingOptions<TableProps<Person>> = {}) {
  return mountTable({
    ...options,
    props: {
      columns: sortableColumns,
      data: [
        { firstName: 'Grace', age: 85 },
        { firstName: 'Ada', age: 36 },
      ],
      ...options.props,
    },
  })
}

describe('Table', () => {
  describe('props', () => {
    describe('columns', () => {
      it('renderiza los encabezados y celdas definidos por las columnas', () => {
        const wrapper = mountTable({
          props: {
            columns,
            data: [{ firstName: 'Ada', age: 36 }],
          },
        })

        expect(wrapper.findAll('thead th').map((header) => header.text())).toEqual([
          'First name',
          'Age',
        ])
        expect(wrapper.findAll('tbody td').map((cell) => cell.text())).toEqual(['Ada', '36'])
      })
    })

    describe('data', () => {
      it('renderiza y actualiza las filas recibidas', async () => {
        const wrapper = mountTable({
          props: {
            columns,
            data: [{ firstName: 'Ada', age: 36 }],
          },
        })

        await wrapper.setProps({
          data: [
            { firstName: 'Grace', age: 85 },
            { firstName: 'Linus', age: 56 },
          ],
        })

        expect(wrapper.findAll('tbody tr')).toHaveLength(2)
        expect(wrapper.findAll('tbody td').map((cell) => cell.text())).toEqual([
          'Grace',
          '85',
          'Linus',
          '56',
        ])
      })
    })

    describe('ordenación', () => {
      it('no permite ordenar columnas que no lo habilitan', () => {
        const wrapper = mountTable({
          props: {
            columns,
            data: [{ firstName: 'Ada', age: 36 }],
          },
        })

        expect(wrapper.findAll('thead th[role="button"]')).toHaveLength(0)
      })

      it('ordena ascendente y descendentemente al hacer clic en una columna habilitada', async () => {
        const wrapper = mountSortableTable()
        const header = wrapper.get('thead th[role="button"]')
        await header.trigger('click')

        expect(wrapper.findAll('tbody td').map((cell) => cell.text())).toEqual([
          'Ada',
          '36',
          'Grace',
          '85',
        ])
        expect(header.attributes('aria-sort')).toBe('ascending')

        await header.trigger('click')

        expect(wrapper.findAll('tbody td').map((cell) => cell.text())).toEqual([
          'Grace',
          '85',
          'Ada',
          '36',
        ])
        expect(header.attributes('aria-sort')).toBe('descending')
      })

      it('expone las columnas ordenables como botones enfocables', () => {
        const wrapper = mountSortableTable()
        const headers = wrapper.findAll('thead th')

        expect(headers.map((header) => header.attributes('role'))).toEqual(['button', 'button'])
        expect(headers.map((header) => header.attributes('tabindex'))).toEqual(['0', '0'])
      })

      it('permite activar la ordenación con Enter y Espacio', async () => {
        const wrapper = mountSortableTable()
        const header = wrapper.get('thead th[role="button"]')

        await header.trigger('keydown.enter')
        expect(header.attributes('aria-sort')).toBe('ascending')

        await header.trigger('keydown.space')
        expect(header.attributes('aria-sort')).toBe('descending')
      })

      it('actualiza aria-sort según el sentido de ordenación', async () => {
        const wrapper = mountSortableTable()
        const header = wrapper.get('thead th[role="button"]')

        expect(header.attributes('aria-sort')).toBeUndefined()
        await header.trigger('click')
        expect(header.attributes('aria-sort')).toBe('ascending')

        await header.trigger('click')
        expect(header.attributes('aria-sort')).toBe('descending')
      })
    })

    describe('cellSpanning', () => {
      it('renderiza rowspan y omite las celdas cubiertas por filas adyacentes iguales', () => {
        const wrapper = mountTable({
          props: { columns: cellSpanningColumns, data: spanningData.slice(0, 3) },
        })
        const rows = wrapper.findAll('tbody tr')

        expect(rows[0].find('td').attributes('rowspan')).toBe('2')
        expect(rows[0].findAll('td').map((cell) => cell.text())).toEqual(['North', 'Bilbao'])
        expect(rows[1].findAll('td').map((cell) => cell.text())).toEqual(['Santander'])
        expect(rows[2].findAll('td').map((cell) => cell.text())).toEqual(['South', 'Seville'])
      })
    })

    describe('columnSpanning', () => {
      it('renderiza colspan con Infinity y omite las celdas cubiertas', () => {
        const wrapper = mountTable({
          props: { columns: columnSpanningColumns, data: spanningData },
        })
        const summaryRow = wrapper.findAll('tbody tr')[3]
        const summaryCell = summaryRow.get('td')

        expect(summaryCell.text()).toBe('Total')
        expect(summaryCell.attributes('colspan')).toBe('2')
        expect(summaryRow.findAll('td')).toHaveLength(1)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos, la clase y el estilo al contenedor raíz',
      id: 'div',
      mount: (attrs) => mountTable({ attrs }),
    })
  })

  describe('slots', () => {
    describe('sort', () => {
      it('pasa sorted como false, asc y desc', async () => {
        const wrapper = mountSortableTable({
          slots: {
            sort: ({ sorted }: { sorted: false | 'asc' | 'desc' }) =>
              h('span', { 'data-test-sort-state': sorted }, `sort:${sorted}`),
          },
        })
        const firstHeader = wrapper.get('thead th[role="button"]')
        const state = () =>
          firstHeader.get('[data-test-sort-state]').attributes('data-test-sort-state')

        expect(state()).toBe('false')
        await firstHeader.trigger('click')
        expect(state()).toBe('asc')

        await firstHeader.trigger('click')
        expect(state()).toBe('desc')
      })

      it('muestra los iconos predeterminados dentro de un indicador aria-hidden', async () => {
        const wrapper = mountSortableTable()
        const header = wrapper.get('thead th[role="button"]')

        expect(header.findComponent(Icon).exists()).toBe(false)
        await header.trigger('click')

        expect(header.findComponent(Icon).props('name')).toBe('chevronUp')
        expect(header.find('[aria-hidden="true"]').exists()).toBe(true)
      })
    })
  })
})
