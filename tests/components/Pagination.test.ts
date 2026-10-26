import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { PaginationRoot } from 'reka-ui'
import { describe, expect, it } from 'vitest'

import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
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

const casesFirstIcon = [
  { input: undefined, expected: { name: paginationDefaults.firstIcon } },
  { input: 'heart', expected: { name: 'heart' } },
] satisfies Array<{ input: PaginationProps['firstIcon']; expected: { name: string } }>

const casesPreviousIcon = [
  { input: undefined, expected: { name: paginationDefaults.previousIcon } },
  { input: 'heart', expected: { name: 'heart' } },
] satisfies Array<{ input: PaginationProps['previousIcon']; expected: { name: string } }>

const casesNextIcon = [
  { input: undefined, expected: { name: paginationDefaults.nextIcon } },
  { input: 'heart', expected: { name: 'heart' } },
] satisfies Array<{ input: PaginationProps['nextIcon']; expected: { name: string } }>

const casesLastIcon = [
  { input: undefined, expected: { name: paginationDefaults.lastIcon } },
  { input: 'heart', expected: { name: 'heart' } },
] satisfies Array<{ input: PaginationProps['lastIcon']; expected: { name: string } }>

const casesEllipsisIcon = [
  { input: undefined, expected: { name: paginationDefaults.ellipsisIcon } },
  { input: 'heart', expected: { name: 'heart' } },
] satisfies Array<{ input: PaginationProps['ellipsisIcon']; expected: { name: string } }>

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

    describe('firstIcon', () => {
      it.each(casesFirstIcon)(
        'pasa el icono $expected.name al Button del control first con firstIcon=$input',
        ({ input, expected }) => {
          const button = mountPagination({ props: { firstIcon: input } })
            .get('[data-test-pagination-first]')
            .findComponent(Button)

          expect(button.props('icon')).toBe(expected.name)
        },
      )
    })

    describe('previousIcon', () => {
      it.each(casesPreviousIcon)(
        'pasa el icono $expected.name al Button del control previous con previousIcon=$input',
        ({ input, expected }) => {
          const button = mountPagination({ props: { previousIcon: input } })
            .get('[data-test-pagination-previous]')
            .findComponent(Button)

          expect(button.props('icon')).toBe(expected.name)
        },
      )
    })

    describe('nextIcon', () => {
      it.each(casesNextIcon)(
        'pasa el icono $expected.name al Button del control next con nextIcon=$input',
        ({ input, expected }) => {
          const button = mountPagination({ props: { nextIcon: input } })
            .get('[data-test-pagination-next]')
            .findComponent(Button)

          expect(button.props('icon')).toBe(expected.name)
        },
      )
    })

    describe('lastIcon', () => {
      it.each(casesLastIcon)(
        'pasa el icono $expected.name al Button del control last con lastIcon=$input',
        ({ input, expected }) => {
          const button = mountPagination({ props: { lastIcon: input } })
            .get('[data-test-pagination-last]')
            .findComponent(Button)

          expect(button.props('icon')).toBe(expected.name)
        },
      )
    })

    describe('ellipsisIcon', () => {
      it.each(casesEllipsisIcon)(
        'muestra el icono $expected.name en la ellipsis con ellipsisIcon=$input',
        ({ input, expected }) => {
          // 20 páginas con la 10 en medio para que se pinte la ellipsis
          const icon = mountPagination({ props: { total: 200, page: 10, ellipsisIcon: input } })
            .get('[data-test-pagination-ellipsis]')
            .findComponent(Icon)

          expect(icon.props('name')).toBe(expected.name)
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
