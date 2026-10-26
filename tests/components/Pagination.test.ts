import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { PaginationRoot } from 'reka-ui'
import { describe, expect, it } from 'vitest'

import { Pagination, paginationDefaults, type PaginationProps } from '@/components/ui/Pagination'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'

function mountPagination(options: ComponentMountingOptions<typeof Pagination> = {}) {
  const { props, global, ...rest } = options
  return mount(Pagination, {
    props: { total: 30, ...props },
    global: { ...global, plugins: [i18n, ...(global?.plugins ?? [])] },
    ...rest,
  })
}

const casesPage = [
  { input: undefined, expected: { reka: 1 } },
  { input: 1, expected: { reka: 1 } },
  { input: 3, expected: { reka: 3 } },
] satisfies Array<{ input: PaginationProps['page']; expected: { reka: number } }>

const casesTotal = [
  { input: undefined, expected: { reka: paginationDefaults.total, length: 1 } },
  { input: 0, expected: { reka: 0, length: 1 } },
  { input: 30, expected: { reka: 30, length: 3 } },
] satisfies Array<{
  input: PaginationProps['total']
  expected: { reka: number; length: number }
}>

const casesItemsPerPage = [
  { input: undefined, expected: { reka: paginationDefaults.itemsPerPage, length: 3 } },
  { input: 10, expected: { reka: 10, length: 3 } },
  { input: 15, expected: { reka: 15, length: 2 } },
] satisfies Array<{
  input: PaginationProps['itemsPerPage']
  expected: { reka: number; length: number }
}>

describe('Pagination', () => {
  describe('props', () => {
    describe('page', () => {
      it.each(casesPage)('pasa page=$input a Reka PaginationRoot', ({ input, expected }) => {
        const pagination = mountPagination({ props: { page: input } })

        expect(pagination.getComponent(PaginationRoot).props('page')).toBe(expected.reka)
      })
    })

    describe('total', () => {
      it.each(casesTotal)('pasa total=$input a Reka PaginationRoot', ({ input, expected }) => {
        const pagination = mountPagination({ props: { total: input } })

        expect(pagination.getComponent(PaginationRoot).props('total')).toBe(expected.reka)
      })

      it.each(casesTotal)(
        'pinta $expected.length páginas con total=$input',
        ({ input, expected }) => {
          const items = mountPagination({ props: { total: input } }).findAll(
            '[data-test-pagination-item]',
          )

          expect(items).toHaveLength(expected.length)
        },
      )
    })

    describe('itemsPerPage', () => {
      it.each(casesItemsPerPage)(
        'pasa itemsPerPage=$input a Reka PaginationRoot',
        ({ input, expected }) => {
          const pagination = mountPagination({ props: { itemsPerPage: input } })

          expect(pagination.getComponent(PaginationRoot).props('itemsPerPage')).toBe(
            expected.reka,
          )
        },
      )

      it.each(casesItemsPerPage)(
        'pinta $expected.length páginas con itemsPerPage=$input',
        ({ input, expected }) => {
          const items = mountPagination({ props: { itemsPerPage: input } }).findAll(
            '[data-test-pagination-item]',
          )

          expect(items).toHaveLength(expected.length)
        },
      )
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-pagination-root]',
      mount: (attrs) => mountPagination({ attrs }),
    })
  })
})
