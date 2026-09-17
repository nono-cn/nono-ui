import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Masonry, type MasonryProps } from '@/components/ui/Masonry'
import { testAttrs } from '../utils/testAttrs'

type Item = { id: string; label: string }

const items: Item[] = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two' },
  { id: 'three', label: 'Three' },
  { id: 'four', label: 'Four' },
  { id: 'five', label: 'Five' },
]

function mountMasonry(options: MountingOptions<MasonryProps> = {}) {
  return mount(Masonry, {
    props: { items },
    ...options,
  })
}

function getColumns(wrapper: ReturnType<typeof mountMasonry>) {
  return Array.from(wrapper.get('[data-test-masonry-root]').element.children)
}

describe('Masonry', () => {
  describe('props', () => {
    describe('items', () => {
      it('renderiza todos los items mediante el slot default scoped', () => {
        const wrapper = mountMasonry({
          slots: {
            default: ({ item }: { item: Item }) => h('span', item.label),
          },
        })

        expect(wrapper.text()).toContain('One')
        expect(wrapper.text()).toContain('Five')
        expect(wrapper.findAll('span')).toHaveLength(items.length)
      })

      it('renderiza un div por item cuando no se proporciona el slot', () => {
        const wrapper = mountMasonry({ props: { items: ['one', 'two'] } })
        const renderedItems = getColumns(wrapper).flatMap((column) =>
          Array.from(column.children).map((itemWrapper) => itemWrapper.firstElementChild),
        )

        expect(renderedItems).toHaveLength(2)
        expect(renderedItems.every((element) => element?.tagName === 'DIV')).toBe(true)
        expect(renderedItems.map((element) => element?.textContent)).toEqual(['one', 'two'])
      })

      it('renderiza un array vacío sin items', () => {
        const wrapper = mountMasonry({ props: { items: [] } })

        expect(wrapper.find('[data-test-masonry-root]').exists()).toBe(false)
      })
    })

    describe('columns', () => {
      it.each([
        { input: 1, expected: 1 },
        { input: 2, expected: 2 },
        { input: 3, expected: 3 },
        { input: 4, expected: 4 },
        { input: 0, expected: 1 },
        { input: undefined, expected: 4 },
      ])('crea $expected columnas cuando columns=$input', ({ input, expected }) => {
        const wrapper = mountMasonry({ props: { items, columns: input } })

        expect(getColumns(wrapper)).toHaveLength(expected)
      })
    })

    describe('spacing', () => {
      it.each([
        { input: 1, expected: '0.25rem' },
        { input: 2, expected: '0.5rem' },
        { input: 4, expected: '1rem' },
        { input: '3', expected: '0.75rem' },
        { input: undefined, expected: '0.5rem' },
      ])('aplica spacing=$input como $expected', ({ input, expected }) => {
        const wrapper = mountMasonry({ props: { items, spacing: input } })
        const root = wrapper.get('[data-test-masonry-root]')

        expect(root.attributes('style')).toContain(`gap: ${expected}`)
        expect(getColumns(wrapper)[0].getAttribute('style')).toContain(`gap: ${expected}`)
      })
    })

    describe('sequential', () => {
      it.each([
        { input: false, expected: ['One', 'Four'] },
        { input: true, expected: ['One', 'Four'] },
        { input: undefined, expected: ['One', 'Four'] },
      ])('distribuye con sequential=$input', ({ input, expected }) => {
        const wrapper = mountMasonry({
          props: { items, columns: 3, sequential: input },
          slots: {
            default: ({ item }: { item: Item }) => h('span', item.label),
          },
        })
        const firstColumn = getColumns(wrapper)[0]

        expect(firstColumn.textContent).toContain(expected[0])
        expect(firstColumn.textContent).toContain(expected[1])
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-masonry-root]',
      mount: (attrs) => mountMasonry({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('expone item e index al slot scoped', () => {
        const wrapper = mountMasonry({
          slots: {
            default: ({ item, index }: { item: Item; index: number }) =>
              h('span', `${index}:${item.id}`),
          },
        })

        expect(wrapper.text()).toContain('0:one')
        expect(wrapper.text()).toContain('4:five')
      })
    })
  })
})
