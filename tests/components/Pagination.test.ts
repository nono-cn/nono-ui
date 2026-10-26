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
  { input: undefined, expected: { reka: paginationDefaults.total } },
  { input: 0, expected: { reka: 0 } },
  { input: 30, expected: { reka: 30 } },
] satisfies Array<{ input: PaginationProps['total']; expected: { reka: number } }>

const casesItemsPerPage = [
  { input: undefined, expected: { reka: paginationDefaults.itemsPerPage } },
  { input: 10, expected: { reka: 10 } },
  { input: 15, expected: { reka: 15 } },
] satisfies Array<{ input: PaginationProps['itemsPerPage']; expected: { reka: number } }>

const casesSiblingCount = [
  { input: undefined, expected: { reka: paginationDefaults.siblingCount } },
  { input: 0, expected: { reka: 0 } },
  { input: 1, expected: { reka: 1 } },
] satisfies Array<{ input: PaginationProps['siblingCount']; expected: { reka: number } }>

const casesShowEdges = [
  { input: undefined, expected: { reka: paginationDefaults.showEdges } },
  { input: true, expected: { reka: true } },
  { input: false, expected: { reka: false } },
] satisfies Array<{ input: PaginationProps['showEdges']; expected: { reka: boolean } }>

const casesDisabled = [
  { input: undefined, expected: { reka: paginationDefaults.disabled } },
  { input: true, expected: { reka: true } },
  { input: false, expected: { reka: false } },
] satisfies Array<{ input: PaginationProps['disabled']; expected: { reka: boolean } }>

const casesShowControls = [
  { input: undefined, expected: { visible: paginationDefaults.showControls } },
  { input: true, expected: { visible: true } },
  { input: false, expected: { visible: false } },
] satisfies Array<{ input: PaginationProps['showControls']; expected: { visible: boolean } }>

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
    })

    describe('itemsPerPage', () => {
      it.each(casesItemsPerPage)(
        'pasa itemsPerPage=$input a Reka PaginationRoot',
        ({ input, expected }) => {
          const pagination = mountPagination({ props: { itemsPerPage: input } })

          expect(pagination.getComponent(PaginationRoot).props('itemsPerPage')).toBe(expected.reka)
        },
      )
    })

    describe('siblingCount', () => {
      it.each(casesSiblingCount)(
        'pasa siblingCount=$input a Reka PaginationRoot',
        ({ input, expected }) => {
          const pagination = mountPagination({ props: { siblingCount: input } })

          expect(pagination.getComponent(PaginationRoot).props('siblingCount')).toBe(expected.reka)
        },
      )
    })

    describe('showEdges', () => {
      it.each(casesShowEdges)(
        'pasa showEdges=$input a Reka PaginationRoot',
        ({ input, expected }) => {
          const pagination = mountPagination({ props: { showEdges: input } })

          expect(pagination.getComponent(PaginationRoot).props('showEdges')).toBe(expected.reka)
        },
      )
    })

    describe('disabled', () => {
      it.each(casesDisabled)(
        'pasa disabled=$input a Reka PaginationRoot',
        ({ input, expected }) => {
          const pagination = mountPagination({ props: { disabled: input } })

          expect(pagination.getComponent(PaginationRoot).props('disabled')).toBe(expected.reka)
        },
      )
    })

    describe('showControls', () => {
      it.each(casesShowControls)(
        'muestra los controles first, previous, next y last con showControls=$input',
        ({ input, expected }) => {
          const pagination = mountPagination({ props: { showControls: input } })
          const exists = (control: string) =>
            pagination.find(`[data-test-pagination-${control}]`).exists()

          expect({
            first: exists('first'),
            previous: exists('previous'),
            next: exists('next'),
            last: exists('last'),
          }).toEqual({
            first: expected.visible,
            previous: expected.visible,
            next: expected.visible,
            last: expected.visible,
          })
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
