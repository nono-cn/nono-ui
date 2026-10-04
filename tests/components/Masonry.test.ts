import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Masonry, type MasonryItem, type MasonryProps } from '@/components/ui/Masonry'
import { testAttrs } from '../utils/testAttrs'

function mountMasonry(options: MountingOptions<MasonryProps> = {}) {
  return mount(Masonry, {
    props: { items: [{ height: 72, label: 'one' }] },
    ...options,
  })
}

const casesItems = [
  { input: [], expected: { root: false, items: [] } },
  {
    input: [{ height: 72, label: 'one' }],
    expected: { root: true, items: [{ text: 'one', height: '72px' }] },
  },
  {
    input: [
      { height: 72, label: 'one' },
      { height: 120, label: 'two' },
      { height: 88, label: 'three' },
    ],
    expected: {
      root: true,
      items: [
        { text: 'one', height: '72px' },
        { text: 'two', height: '120px' },
        { text: 'three', height: '88px' },
      ],
    },
  },
  {
    input: [{ height: 64 }],
    expected: { root: true, items: [{ text: '64', height: '64px' }] },
  },
  {
    input: [{ height: 96, id: 'custom' }],
    expected: { root: true, items: [{ text: '96', height: '96px' }] },
  },
]

const casesColumns = [
  { input: undefined, expected: 4, label: 'default' },
  { input: 1, expected: 1, label: 'one' },
  { input: 2, expected: 2, label: 'two' },
  { input: 3, expected: 3, label: 'three' },
  { input: 4, expected: 4, label: 'four' },
  { input: 0, expected: 1, label: 'zero' },
  { input: -2, expected: 1, label: 'negative' },
  { input: 2.9, expected: 2, label: 'fractional' },
  { input: { sm: 1, md: 2, lg: 4 }, width: 500, expected: 2, label: 'below sm' },
  { input: { sm: 1, md: 2, lg: 4 }, width: 700, expected: 1, label: 'sm' },
  { input: { sm: 1, md: 2, lg: 4 }, width: 800, expected: 2, label: 'md' },
  { input: { sm: 1, md: 2, lg: 4 }, width: 1200, expected: 4, label: 'lg' },
  { input: { sm: 2 }, width: 1200, expected: 2, label: 'responsive fallback' },
]

const casesSpacing = [
  { input: undefined, expected: { root: '0.5rem', column: '0.5rem' } },
  { input: 0, expected: { root: '0rem', column: '0rem' } },
  { input: 1, expected: { root: '0.25rem', column: '0.25rem' } },
  { input: 2, expected: { root: '0.5rem', column: '0.5rem' } },
  { input: 4, expected: { root: '1rem', column: '1rem' } },
  { input: -2, expected: { root: '0rem', column: '0rem' } },
  { input: '3', expected: { root: '0.75rem', column: '0.75rem' } },
  { input: '1.5', expected: { root: '0.375rem', column: '0.375rem' } },
  { input: 'invalid', expected: { root: '0rem', column: '0rem' } },
]

const casesSequential = [
  {
    input: undefined,
    expected: { columns: [['one'], ['two', 'four'], ['three', 'five']] },
  },
  {
    input: false,
    expected: { columns: [['one'], ['two', 'four'], ['three', 'five']] },
  },
  {
    input: true,
    expected: { columns: [['one', 'four'], ['two', 'five'], ['three']] },
  },
]

describe('Masonry', () => {
  describe('props', () => {
    describe('items', () => {
      it.each(casesItems)('renderiza items=$input', ({ input, expected }) => {
        const wrapper = mountMasonry({
          props: { items: input },
          slots: {
            default: ({ item }: { item: MasonryItem }) =>
              h('span', String(item.label ?? item.height)),
          },
        })
        const root = wrapper.find('[data-test-masonry-root]')

        expect(root.exists()).toBe(expected.root)
        if (!expected.root) return

        const renderedItems = wrapper.findAll('[data-test-masonry-item]').map((item) => ({
          text: item.text().trim(),
          height: (item.element as HTMLElement).style.height,
        }))
        expect(renderedItems).toHaveLength(expected.items.length)
        expect(renderedItems).toEqual(expect.arrayContaining(expected.items))
      })

      it('actualiza la distribución y la altura cuando cambian los items', async () => {
        const wrapper = mountMasonry({
          props: {
            columns: 2,
            items: [
              { height: 100, label: 'one' },
              { height: 10, label: 'two' },
              { height: 10, label: 'three' },
            ],
          },
          slots: { default: ({ item }: { item: MasonryItem }) => h('span', String(item.label)) },
        })
        const columnTexts = () =>
          wrapper
            .findAll('[data-test-masonry-column]')
            .map((column) =>
              column.findAll('[data-test-masonry-item]').map((item) => item.text().trim()),
            )

        expect(columnTexts()).toEqual([['one'], ['two', 'three']])

        await wrapper.setProps({
          items: [
            { height: 5, label: 'one' },
            { height: 10, label: 'two' },
            { height: 10, label: 'three' },
          ],
        })

        expect(columnTexts()).toEqual([['one', 'three'], ['two']])
        expect(
          (wrapper.findAll('[data-test-masonry-item]')[0].element as HTMLElement).style.height,
        ).toBe('5px')

        await wrapper.setProps({ items: [] })
        expect(wrapper.find('[data-test-masonry-root]').exists()).toBe(false)
      })
    })

    describe('columns', () => {
      it.each(casesColumns)('crea $expected columnas con $label', ({ input, width, expected }) => {
        const originalWidth = window.innerWidth

        try {
          if (width !== undefined) window.innerWidth = width
          const wrapper = mountMasonry({
            props: { items: [{ height: 72, label: 'one' }], columns: input },
          })

          expect(wrapper.findAll('[data-test-masonry-column]')).toHaveLength(expected)
        } finally {
          window.innerWidth = originalWidth
        }
      })

      it('actualiza las columnas al cambiar el ancho de la ventana', async () => {
        const originalWidth = window.innerWidth
        let wrapper: ReturnType<typeof mountMasonry> | undefined

        try {
          window.innerWidth = 700
          wrapper = mountMasonry({
            props: {
              items: [{ height: 72 }],
              columns: { sm: 1, md: 2, lg: 4 },
            },
          })
          expect(wrapper.findAll('[data-test-masonry-column]')).toHaveLength(1)

          window.innerWidth = 1200
          window.dispatchEvent(new Event('resize'))
          await wrapper.vm.$nextTick()
          expect(wrapper.findAll('[data-test-masonry-column]')).toHaveLength(4)

          await wrapper.setProps({ columns: 2 })
          expect(wrapper.findAll('[data-test-masonry-column]')).toHaveLength(2)
        } finally {
          wrapper?.unmount()
          window.innerWidth = originalWidth
        }
      })
    })

    describe('spacing', () => {
      it.each(casesSpacing)('aplica spacing=$input', ({ input, expected }) => {
        const wrapper = mountMasonry({
          props: { items: [{ height: 72, label: 'one' }], spacing: input },
        })

        expect(wrapper.get('[data-test-masonry-root]').attributes('style')).toContain(
          `gap: ${expected.root}`,
        )
        expect(wrapper.get('[data-test-masonry-column]').attributes('style')).toContain(
          `gap: ${expected.column}`,
        )
      })
    })

    describe('sequential', () => {
      it.each(casesSequential)('distribuye items con sequential=$input', ({ input, expected }) => {
        const wrapper = mountMasonry({
          props: {
            items: [
              { height: 100, label: 'one' },
              { height: 10, label: 'two' },
              { height: 10, label: 'three' },
              { height: 10, label: 'four' },
              { height: 10, label: 'five' },
            ],
            columns: 3,
            sequential: input,
          },
          slots: { default: ({ item }: { item: MasonryItem }) => h('span', String(item.label)) },
        })
        const columns = wrapper
          .findAll('[data-test-masonry-column]')
          .map((column) =>
            column.findAll('[data-test-masonry-item]').map((item) => item.text().trim()),
          )

        expect(columns).toEqual(expected.columns)
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('expone el item completo y su índice original', () => {
        const items = [
          { height: 100, label: 'one', id: 'custom-one' },
          { height: 10, label: 'two', id: 'custom-two' },
          { height: 10, label: 'three', id: 'custom-three' },
        ] satisfies MasonryItem[]
        const wrapper = mountMasonry({
          props: { items, columns: 2 },
          slots: {
            default: ({ item, index }: { item: MasonryItem; index: number }) =>
              h(
                'span',
                { 'data-test-slot': '' },
                `${index}:${item.id}:${item.label}:${item.height}`,
              ),
          },
        })

        expect(wrapper.findAll('[data-test-slot]').map((node) => node.text())).toEqual([
          '0:custom-one:one:100',
          '1:custom-two:two:10',
          '2:custom-three:three:10',
        ])
      })

      it('renderiza el contenido por defecto cuando no se pasa un slot', () => {
        const wrapper = mountMasonry({ props: { items: [{ height: 72, id: 'custom' }] } })
        const item = wrapper.get('[data-test-masonry-item]').element as HTMLElement

        expect(item.textContent).toBe('[object Object]')
        expect(item.style.height).toBe('72px')
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-masonry-root]',
      mount: (attrs) => mountMasonry({ attrs }),
    })
  })

  describe('variantsCss', () => {
    describe('masonryVariants', () => {
      it('aplica las clases base a la raíz', () => {
        expect(mountMasonry().get('[data-test-masonry-root]').classes()).toEqual(
          expect.arrayContaining(['flex', 'w-full', 'items-start']),
        )
      })
    })

    describe('masonryColumnVariants', () => {
      it('aplica las clases base a cada columna', () => {
        const column = mountMasonry().get('[data-test-masonry-column]')

        expect(column.classes()).toEqual(
          expect.arrayContaining(['flex', 'min-w-0', 'flex-1', 'flex-col']),
        )
      })
    })

    describe('masonryItemVariants', () => {
      it('aplica la clase base a cada item', () => {
        const item = mountMasonry().get('[data-test-masonry-item]')

        expect(item.classes()).toContain('min-w-0')
      })
    })
  })
})
