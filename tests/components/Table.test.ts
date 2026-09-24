import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Table, type TableColumnDef, type TableProps } from '@/components/ui/Table'

type Person = {
  firstName: string
  age: number
}

const columns: TableColumnDef<Person>[] = [
  { accessorKey: 'firstName', header: 'First name' },
  { accessorKey: 'age', header: 'Age' },
]

function mountTable(options: MountingOptions<TableProps<Person>> = {}) {
  return mount(Table, options)
}

describe('Table', () => {
  describe('props', () => {
    describe('columns', () => {
      it('uses the column definitions to render headers and cell values', () => {
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
      it('renders every row supplied to the TanStack table', async () => {
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
  })
})
