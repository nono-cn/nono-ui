import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ListboxItem as RekaListboxItem, ListboxRoot, ListboxVirtualizer } from 'reka-ui'

import { Listbox, type ListboxProps } from '@/components/ui/Listbox'
import { Input } from '@/components/ui/Input'
import { i18n } from '@/i18n'
import { testIconConfig } from '../utils/testIconConfig'
import { testInputConfig } from '../utils/testInputConfig'
import { testAttrs } from '../utils/testAttrs'
import * as filterComposable from '@/composables/useFilter'
import { testColor } from '../utils/testColor'

Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
})

const casesItems = {
  normal: [
    { value: 'apple', label: 'Manzana' },
    { value: 'banana', label: 'Plátano' },
  ],
  grouped: [{ value: 'apple', label: 'Manzana' }],
  many: Array.from({ length: 50 }, (_, index) => ({
    value: index,
    label: `Opción ${index}`,
  })),
}

function mountListbox(items = casesItems.normal, options: MountingOptions<ListboxProps> = {}) {
  return mount(Listbox, {
    ...options,
    global: { plugins: [i18n], ...options.global },
    props: {
      items,
      ...options.props,
    },
  })
}

const casesValue = [
  { input: 'banana', expected: 'banana' },
  { input: undefined, expected: undefined },
  { input: ['apple', 'banana'], expected: ['apple', 'banana'] },
]

const casesDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesHighlightOnHover = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: true },
]

const casesMultiple = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesOrientation = [
  { input: 'vertical' as const, expected: 'vertical' },
  { input: 'horizontal' as const, expected: 'horizontal' },
  { input: undefined, expected: 'vertical' },
]

const casesSelectionBehavior = [
  { input: 'toggle' as const, expected: 'toggle' },
  { input: 'replace' as const, expected: 'replace' },
  { input: undefined, expected: 'toggle' },
]

const casesLoading = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesFilter = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesSearch = [
  { input: 'ban', expected: 'ban' },
  { input: '', expected: '' },
  { input: undefined, expected: '' },
]

const casesEmptyText = [
  { input: 'No hay frutas', expected: 'No hay frutas' },
  { input: undefined, expected: i18n.global.t('empty') },
]

const casesNoResultsText = [
  { input: 'No coincide ninguna fruta', expected: 'No coincide ninguna fruta' },
  { input: undefined, expected: i18n.global.t('noResults') },
]

const casesName = [
  { input: 'fruits', expected: 'fruits' },
  { input: undefined, expected: undefined },
]

const casesSize = [
  { input: 'xs' as const, expected: 'min-h-7' },
  { input: 'sm' as const, expected: 'min-h-8' },
  { input: 'md' as const, expected: 'min-h-9' },
  { input: 'lg' as const, expected: 'min-h-10' },
  { input: 'xl' as const, expected: 'min-h-11' },
  { input: undefined, expected: 'min-h-9' },
]

const casesRequired = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesVirtualize = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
]

const casesVirtualizerConfig = [
  { input: undefined, expected: { estimateSize: 32, overscan: 12 } },
  { input: { estimateSize: 48, overscan: 20 }, expected: { estimateSize: 48, overscan: 20 } },
]

const casesSeverity = [
  { input: 'primary' as const, expected: 'has-[:focus-visible]:border-primary' },
  { input: 'secondary' as const, expected: 'has-[:focus-visible]:border-secondary-foreground' },
  { input: 'error' as const, expected: 'has-[:focus-visible]:border-error' },
  { input: 'warning' as const, expected: 'has-[:focus-visible]:border-warning' },
  { input: 'success' as const, expected: 'has-[:focus-visible]:border-success' },
]

const casesItemDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: undefined },
]

const casesGroups = [
  { input: [], expectedGroups: 0, expectedItems: 2 },
  {
    input: [{ id: 'fruits', label: 'Frutas', items: [{ value: 'apple', label: 'Manzana' }] }],
    expectedGroups: 1,
    expectedItems: 1,
  },
]

describe('Listbox', () => {
  describe('attrs', () => {
    testAttrs({
      text: 'reenvía atributos arbitrarios al ListboxContent de Reka UI',
      id: '[data-test-listbox-content]',
      mount: (attrs) => mountListbox(undefined, { attrs }),
    })
  })

  describe('props', () => {
    describe('ui', () => {
      describe('root', () => {
        testAttrs({
          id: '[data-test-listbox-root]',
          mount: (attrs) => mountListbox(undefined, { props: { ui: { root: () => attrs } } }),
        })
      })

      describe('content', () => {
        testAttrs({
          id: '[data-test-listbox-content]',
          mount: (attrs) => mountListbox(undefined, { props: { ui: { content: () => attrs } } }),
        })
      })

      describe('empty', () => {
        testAttrs({
          id: '[data-test-listbox-empty]',
          mount: (attrs) => mountListbox([], { props: { ui: { empty: () => attrs } } }),
        })
      })

      describe('noResults', () => {
        testAttrs({
          id: '[data-test-listbox-no-results]',
          mount: (attrs) =>
            mountListbox(undefined, {
              props: { filter: true, search: 'missing', ui: { noResults: () => attrs } },
            }),
        })
      })

      describe('loading', () => {
        testAttrs({
          id: '[data-test-listbox-loading]',
          mount: (attrs) =>
            mountListbox(undefined, { props: { loading: true, ui: { loading: () => attrs } } }),
        })
      })

      describe('group', () => {
        testAttrs({
          id: '[data-test-listbox-group]',
          mount: (attrs) =>
            mountListbox([], {
              props: {
                groups: [
                  { id: 'fruit', label: 'Frutas', items: [{ value: 'apple', label: 'Manzana' }] },
                ],
                ui: { group: () => attrs },
              },
            }),
        })
      })

      describe('groupLabel', () => {
        testAttrs({
          id: '[data-test-listbox-group-label]',
          mount: (attrs) =>
            mountListbox([], {
              props: {
                groups: [
                  { id: 'fruit', label: 'Frutas', items: [{ value: 'apple', label: 'Manzana' }] },
                ],
                ui: { groupLabel: () => attrs },
              },
            }),
        })
      })

      describe('item', () => {
        testAttrs({
          id: '[data-test-listbox-item]',
          mount: (attrs) => mountListbox(undefined, { props: { ui: { item: () => attrs } } }),
        })
      })

      describe('itemLeading', () => {
        testAttrs({
          id: '[data-test-listbox-item-leading]',
          mount: (attrs) =>
            mountListbox(undefined, { props: { ui: { itemLeading: () => attrs } } }),
        })
      })

      describe('label', () => {
        testAttrs({
          id: '[data-test-listbox-item-label]',
          mount: (attrs) => mountListbox(undefined, { props: { ui: { itemLabel: () => attrs } } }),
        })
      })

      describe('itemIndicator', () => {
        testAttrs({
          id: '[data-test-listbox-item-indicator]',
          mount: (attrs) =>
            mountListbox(undefined, {
              props: { value: 'apple', ui: { itemIndicator: () => attrs } },
            }),
        })
      })
    })

    describe('items', () => {
      describe('label', () => {
        it('renderiza el label de cada item', () => {
          const listbox = mountListbox([{ value: 'apple', label: 'Manzana' }])

          expect(listbox.get('[data-test-listbox-item]').text()).toContain('Manzana')
        })
      })

      describe('value', () => {
        it('pasa value de cada item a ListboxItem', () => {
          const listbox = mountListbox([{ value: 'apple', label: 'Manzana' }])

          expect(listbox.getComponent(RekaListboxItem).props('value')).toBe('apple')
        })
      })

      describe('icon', () => {
        testIconConfig({
          text: 'renderiza el icon de cada item',
          id: '[data-test-listbox-item-icon]',
          mount: (icon) => mountListbox([{ value: 'apple', label: 'Manzana', icon }]),
        })
      })

      describe('disabled', () => {
        it.each(casesItemDisabled)('pasa disabled=$input a ListboxItem', ({ input, expected }) => {
          const listbox = mountListbox([{ value: 'apple', label: 'Manzana', disabled: input }])

          expect(listbox.getComponent(RekaListboxItem).props('disabled')).toBe(expected)
        })
      })
    })

    describe('groups', () => {
      it.each(casesGroups)(
        'renderiza los grupos recibidos',
        ({ input, expectedGroups, expectedItems }) => {
          const listbox = mountListbox(casesItems.normal, { props: { groups: input } })

          expect(listbox.findAll('[data-test-listbox-group]')).toHaveLength(expectedGroups)
          expect(listbox.findAll('[data-test-listbox-item]')).toHaveLength(expectedItems)
        },
      )

      describe('label', () => {
        it('renderiza el label del grupo', () => {
          const listbox = mountListbox([], {
            props: {
              groups: [{ id: 'fruits', label: 'Frutas', items: casesItems.grouped }],
            },
          })

          expect(listbox.get('[data-test-listbox-group-label]').text()).toBe('Frutas')
        })
      })

      describe('items', () => {
        it('pasa value del item agrupado a ListboxItem', () => {
          const listbox = mountListbox([], {
            props: {
              groups: [{ id: 'fruits', label: 'Frutas', items: casesItems.grouped }],
            },
          })

          expect(listbox.getComponent(RekaListboxItem).props('value')).toBe('apple')
        })

        it('renderiza label del item agrupado', () => {
          const listbox = mountListbox([], {
            props: {
              groups: [{ id: 'fruits', label: 'Frutas', items: casesItems.grouped }],
            },
          })

          expect(listbox.get('[data-test-listbox-item]').text()).toContain('Manzana')
        })

        it('renderiza icon del item agrupado', () => {
          const listbox = mountListbox([], {
            props: {
              groups: [
                {
                  id: 'fruits',
                  label: 'Frutas',
                  items: [{ value: 'apple', label: 'Manzana', icon: { name: 'save' } }],
                },
              ],
            },
          })

          expect(listbox.find('[data-test-listbox-item-icon]').exists()).toBe(true)
        })

        it('pasa disabled del item agrupado a ListboxItem', () => {
          const listbox = mountListbox([], {
            props: {
              groups: [
                {
                  id: 'fruits',
                  label: 'Frutas',
                  items: [{ value: 'apple', label: 'Manzana', disabled: true }],
                },
              ],
            },
          })

          expect(listbox.getComponent(RekaListboxItem).props('disabled')).toBe(true)
        })
      })
    })

    describe('value', () => {
      it.each(casesValue)('pasa value=$input a ListboxRoot', ({ input, expected }) => {
        const listbox = mountListbox(undefined, {
          props: { value: input, multiple: Array.isArray(input) },
        })

        expect(listbox.getComponent(ListboxRoot).props('modelValue')).toEqual(expected)
      })
    })

    describe('disabled', () => {
      it.each(casesDisabled)('pasa disabled=$input a ListboxRoot', ({ input, expected }) => {
        const listbox = mountListbox(undefined, { props: { disabled: input } })

        expect(listbox.getComponent(ListboxRoot).props('disabled')).toBe(expected)
      })
    })

    describe('highlightOnHover', () => {
      it.each(casesHighlightOnHover)(
        'pasa highlightOnHover=$input a ListboxRoot',
        ({ input, expected }) => {
          const listbox = mountListbox(undefined, { props: { highlightOnHover: input } })

          expect(listbox.getComponent(ListboxRoot).props('highlightOnHover')).toBe(expected)
        },
      )
    })

    describe('multiple', () => {
      it.each(casesMultiple)('pasa multiple=$input a ListboxRoot', ({ input, expected }) => {
        const listbox = mountListbox(undefined, { props: { multiple: input } })

        expect(listbox.getComponent(ListboxRoot).props('multiple')).toBe(expected)
      })
    })

    describe('orientation', () => {
      it.each(casesOrientation)('pasa orientation=$input a ListboxRoot', ({ input, expected }) => {
        const listbox = mountListbox(undefined, { props: { orientation: input } })

        expect(listbox.getComponent(ListboxRoot).props('orientation')).toBe(expected)
      })
    })

    describe('selectionBehavior', () => {
      it.each(casesSelectionBehavior)(
        'pasa selectionBehavior=$input a ListboxRoot',
        ({ input, expected }) => {
          const listbox = mountListbox(undefined, { props: { selectionBehavior: input } })

          expect(listbox.getComponent(ListboxRoot).props('selectionBehavior')).toBe(expected)
        },
      )
    })

    describe('name', () => {
      it.each(casesName)('pasa name=$input a ListboxRoot', ({ input, expected }) => {
        const listbox = mountListbox(undefined, { props: { name: input } })

        expect(listbox.getComponent(ListboxRoot).props('name')).toBe(expected)
      })
    })

    describe('required', () => {
      it.each(casesRequired)('pasa required=$input a ListboxRoot', ({ input, expected }) => {
        const listbox = mountListbox(undefined, { props: { required: input } })

        expect(listbox.getComponent(ListboxRoot).props('required')).toBe(expected)
      })
    })

    describe('severity', () => {
      it.each(casesSeverity)('renderiza severity=$input', ({ input, expected }) => {
        const root = mountListbox(undefined, { props: { severity: input } }).get(
          '[data-test-listbox-root]',
        )

        expect(root.classes()).toContain(expected)
      })
    })

    describe('color', () => {
      testColor({
        text: 'renderiza color personalizado',
        id: '[data-test-listbox-root]',
        varColor: '--listbox-color',
        mount: (color) => mountListbox(undefined, { props: { color } }),
      })
    })

    describe('size', () => {
      it.each(casesSize)(
        'aplica size=$input a cada opción y al Input de filtro',
        ({ input, expected }) => {
          const listbox = mountListbox(undefined, {
            props: { size: input, filter: true },
          })

          expect(listbox.findAll('[data-test-listbox-item]')[0].classes()).toContain(expected)
          const filterInput = listbox
            .findAllComponents(Input)
            .find((inputComponent) => inputComponent.find('[data-test-listbox-filter]').exists())
          expect(filterInput.props('size')).toBe(input ?? 'md')
        },
      )

      it.each(casesSize)(
        'aplica size=$input a loading, empty y no-results',
        ({ input, expected }) => {
          const loading = mountListbox([], { props: { size: input, loading: true } })
          expect(loading.get('[data-test-listbox-loading]').classes()).toContain(expected)

          const empty = mountListbox([], { props: { size: input } })
          expect(empty.get('[data-test-listbox-empty]').classes()).toContain(expected)

          const noResults = mountListbox(undefined, {
            props: { size: input, filter: true, search: 'inexistente' },
          })
          expect(noResults.get('[data-test-listbox-no-results]').classes()).toContain(expected)
        },
      )
    })

    describe('loading', () => {
      it.each(casesLoading)('renderiza loading=$input', ({ input, expected }) => {
        const listbox = mountListbox(undefined, { props: { loading: input } })

        expect(listbox.find('[data-test-listbox-loading]').exists()).toBe(expected)
      })
    })

    describe('filter', () => {
      it.each(casesFilter)('renderiza filter=$input', ({ input, expected }) => {
        const listbox = mountListbox(undefined, { props: { filter: input } })

        expect(listbox.find('[data-test-listbox-filter]').exists()).toBe(expected)
      })
    })

    describe('filterConfig', () => {
      it('pasa filterConfig a useFilter', () => {
        const useFilterSpy = vi.spyOn(filterComposable, 'useFilter')

        mountListbox(undefined, {
          props: { filterConfig: { mode: 'startWith', sensitivity: 'accent' } },
        })

        expect(useFilterSpy).toHaveBeenLastCalledWith(
          expect.objectContaining({
            mode: 'startWith',
            sensitivity: 'accent',
            getText: expect.any(Function),
          }),
        )
        useFilterSpy.mockRestore()
      })
    })

    describe('ignoreFilter', () => {
      it('no ejecuta el filtro cuando está activo', () => {
        const filter = vi.fn()
        const useFilterSpy = vi.spyOn(filterComposable, 'useFilter').mockReturnValue({
          filter,
          normalized: (value: string) => value,
        })

        mountListbox(undefined, {
          props: { filter: true, ignoreFilter: true, search: 'ana' },
        })

        expect(filter).not.toHaveBeenCalled()
        useFilterSpy.mockRestore()
      })
    })

    describe('virtualize', () => {
      it.each(casesVirtualize)('renderiza virtualize=$input', ({ input, expected }) => {
        const listbox = mountListbox(undefined, { props: { virtualize: input } })

        expect(listbox.findComponent(ListboxVirtualizer).exists()).toBe(expected)
      })
    })

    describe('virtualizerConfig', () => {
      it.each(casesVirtualizerConfig)('usa virtualizerConfig=$input', ({ input, expected }) => {
        const listbox = mountListbox(undefined, {
          props: { virtualize: true, virtualizerConfig: input },
        })
        const virtualizer = listbox.getComponent(ListboxVirtualizer)

        expect({
          estimateSize: virtualizer.props('estimateSize'),
          overscan: virtualizer.props('overscan'),
        }).toEqual(expected)
      })
    })

    describe('search', () => {
      it.each(casesSearch)('pasa search=$input al Input del filtro', ({ input, expected }) => {
        const listbox = mountListbox(undefined, {
          props: { filter: true, search: input },
        })

        const filterInput = listbox
          .findAllComponents(Input)
          .find((inputComponent) => inputComponent.find('[data-test-listbox-filter]').exists())

        expect(filterInput.props('value')).toBe(expected)
      })
    })

    describe('iconFilter', () => {
      testIconConfig({
        text: 'renderiza iconFilter en el leading del filtro',
        id: '[data-test-listbox-icon-filter]',
        mount: (iconFilter) => mountListbox(undefined, { props: { filter: true, iconFilter } }),
      })
    })

    describe('emptyText', () => {
      it.each(casesEmptyText)('renderiza emptyText=$input', ({ input, expected }) => {
        const listbox = mountListbox([], { props: { emptyText: input } })

        expect(listbox.get('[data-test-listbox-empty]').text()).toBe(expected)
      })
    })

    describe('noResultsText', () => {
      it.each(casesNoResultsText)('renderiza noResultsText=$input', ({ input, expected }) => {
        const listbox = mountListbox(undefined, {
          props: { filter: true, search: 'inexistente', noResultsText: input },
        })

        expect(listbox.get('[data-test-listbox-no-results]').text()).toBe(expected)
      })
    })

    describe('inputFilter', () => {
      testInputConfig({
        text: 'pasa inputFilter al Input del filtro',
        id: '[data-test-listbox-filter]',
        mount: (inputFilter) => mountListbox(undefined, { props: { filter: true, inputFilter } }),
      })
    })
  })

  describe('emits', () => {
    describe('select', () => {
      it('reenvía el evento de selección de una opción', async () => {
        const onSelect = vi.fn()
        const listbox = mountListbox(undefined, { props: { onSelect } })
        const event = new CustomEvent('select', {
          detail: { value: 'apple', originalEvent: new PointerEvent('pointerdown') },
        })

        listbox.getComponent(RekaListboxItem).vm.$emit('select', event)
        await listbox.vm.$nextTick()

        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(onSelect).toHaveBeenCalledWith(event)
      })

      it('reenvía el evento de selección de una opción agrupada', async () => {
        const onSelect = vi.fn()
        const listbox = mountListbox([], {
          props: {
            groups: [{ id: 'fruits', label: 'Frutas', items: casesItems.grouped }],
            onSelect,
          },
        })
        const event = new CustomEvent('select', {
          detail: { value: 'apple', originalEvent: new PointerEvent('pointerdown') },
        })

        listbox.getComponent(RekaListboxItem).vm.$emit('select', event)
        await listbox.vm.$nextTick()

        expect(onSelect).toHaveBeenCalledWith(event)
      })
    })

    describe.each([
      ['entryFocus', new CustomEvent('entryFocus')],
      ['highlight', { ref: document.createElement('div'), value: 'apple' }],
      ['leave', new Event('mouseleave')],
    ])('%s', (eventName, payload) => {
      it('reenvía el evento de Reka UI', async () => {
        const listener = vi.fn()
        const listbox = mountListbox(undefined, { props: { [
          `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`
        ]: listener } })

        listbox.getComponent(ListboxRoot).vm.$emit(eventName, payload)
        await listbox.vm.$nextTick()

        expect(listener).toHaveBeenCalledWith(payload)
      })
    })

    describe('update:value', () => {
      it('emite el valor seleccionado', async () => {
        const onUpdateValue = vi.fn()
        const listbox = mountListbox(undefined, {
          props: { 'onUpdate:value': onUpdateValue },
        })

        listbox.getComponent(ListboxRoot).vm.$emit('update:modelValue', 'apple')
        await listbox.vm.$nextTick()

        expect(onUpdateValue).toHaveBeenCalledTimes(1)
        expect(onUpdateValue).toHaveBeenCalledWith('apple')
      })
    })

    describe('update:search', () => {
      it('emite el texto de búsqueda actualizado', async () => {
        const onUpdateSearch = vi.fn()
        const listbox = mountListbox(undefined, {
          props: { filter: true, 'onUpdate:search': onUpdateSearch },
        })

        const filterInput = listbox
          .findAllComponents(Input)
          .find((inputComponent) => inputComponent.find('[data-test-listbox-filter]').exists())

        if (!filterInput) throw new Error('Expected Listbox filter Input')
        filterInput.vm.$emit('update:value', 'ban')
        await listbox.vm.$nextTick()

        expect(onUpdateSearch).toHaveBeenCalledTimes(1)
        expect(onUpdateSearch).toHaveBeenCalledWith('ban')
      })
    })
  })

  describe('slots', () => {
    describe('loading', () => {
      it('renderiza el spinner por defecto', () => {
        const listbox = mountListbox(undefined, { props: { loading: true } })
        const icon = listbox.findComponent('[data-test-listbox-loading-icon]')

        expect(icon.props('name')).toBe('spinner')
        expect(icon.exists()).toBe(true)
        expect(icon.classes()).toContain('animate-spin')
      })

      it('permite sobrescribir el spinner mediante el slot', () => {
        const listbox = mountListbox(undefined, {
          props: { loading: true },
          slots: { loading: 'Cargando opciones personalizadas' },
        })

        expect(listbox.get('[data-test-listbox-loading]').text()).toBe(
          'Cargando opciones personalizadas',
        )
        expect(listbox.find('[data-test-listbox-loading-icon]').exists()).toBe(false)
      })
    })

    describe('empty', () => {
      it('permite sobrescribir emptyText mediante el slot', () => {
        const listbox = mountListbox([], {
          slots: { empty: 'Lista vacía personalizada' },
        })

        expect(listbox.get('[data-test-listbox-empty]').text()).toBe('Lista vacía personalizada')
      })
    })

    describe('no-results', () => {
      it('permite sobrescribir noResultsText mediante el slot', () => {
        const listbox = mountListbox(undefined, {
          props: { filter: true, search: 'inexistente' },
          slots: { 'no-results': 'Sin coincidencias personalizadas' },
        })

        expect(listbox.get('[data-test-listbox-no-results]').text()).toBe(
          'Sin coincidencias personalizadas',
        )
      })
    })

    describe('filter-leading', () => {
      it('sobrescribe el iconFilter mediante el slot', () => {
        const listbox = mountListbox(undefined, {
          props: { filter: true, iconFilter: { name: 'search' } },
          slots: { 'filter-leading': 'Leading personalizado' },
        })

        expect(listbox.get('[data-test-listbox-filter-leading]').text()).toBe(
          'Leading personalizado',
        )
        expect(listbox.find('[data-test-listbox-icon-filter]').exists()).toBe(false)
      })
    })

    describe('item-leading', () => {
      it('sobrescribe el contenido anterior al label mediante el slot', () => {
        const listbox = mountListbox([{ value: 'apple', label: 'Manzana' }], {
          slots: { 'item-leading': 'Leading personalizado' },
        })

        expect(listbox.get('[data-test-listbox-item]').text()).toContain('Leading personalizado')
      })
    })

    describe('item', () => {
      it('sobrescribe el contenido de cada item', () => {
        const listbox = mountListbox([{ value: 'apple', label: 'Manzana' }], {
          slots: { item: 'Item personalizado' },
        })

        expect(listbox.get('[data-test-listbox-item]').text()).toBe('Item personalizado')
      })
    })

    describe('item-label', () => {
      it('sobrescribe el label mediante el slot', () => {
        const listbox = mountListbox([{ value: 'apple', label: 'Manzana' }], {
          slots: { 'item-label': 'Etiqueta personalizada' },
        })

        expect(listbox.get('[data-test-listbox-item-label]').text()).toBe('Etiqueta personalizada')
      })
    })

    describe('item-indicator', () => {
      it('sobrescribe el indicador mediante el slot', () => {
        const listbox = mountListbox([{ value: 'apple', label: 'Manzana' }], {
          props: { value: 'apple' },
          slots: { 'item-indicator': 'Indicador personalizado' },
        })

        expect(listbox.get('[data-test-listbox-item-indicator]').text()).toContain(
          'Indicador personalizado',
        )
      })
    })
  })

  describe('context contract', () => {
    it('listboxContext', () => {
      const root = vi.fn(() => ({}))
      const content = vi.fn(() => ({}))

      mountListbox(undefined, {
        props: { value: 'apple', search: 'man', ui: { root, content } },
      })

      expect(root).toHaveBeenCalledWith({ value: 'apple', search: 'man' })
      expect(content).toHaveBeenCalledWith({ value: 'apple', search: 'man' })
    })

    it('listboxItemContext', () => {
      const item = vi.fn(() => ({}))
      const itemSlot = vi.fn(() => 'Item')

      mountListbox([{ value: 'apple', label: 'Manzana' }], {
        props: { value: 'apple', ui: { item } },
        slots: { item: itemSlot },
      })

      const expected = {
        item: { value: 'apple', label: 'Manzana' },
        index: 0,
        selected: true,
      }
      expect(item).toHaveBeenCalledWith(expected)
      expect(itemSlot).toHaveBeenCalledWith({ ...expected, ref_for: true })
    })

    it('listboxGroupContext', () => {
      const group = vi.fn(() => ({}))
      const groupLabel = vi.fn(() => ({}))
      const groupLabelSlot = vi.fn(() => 'Grupo')
      const groupData = {
        id: 'fruits',
        label: 'Frutas',
        items: [{ value: 'apple', label: 'Manzana' }],
      }

      mountListbox([], {
        props: { groups: [groupData], ui: { group, groupLabel } },
        slots: { 'group-label': groupLabelSlot },
      })

      const expected = { group: groupData, index: 0 }
      expect(group).toHaveBeenCalledWith(expected)
      expect(groupLabel).toHaveBeenCalledWith(expected)
      expect(groupLabelSlot).toHaveBeenCalledWith({ ...expected, ref_for: true })
    })
  })
})
