import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui'

import {
  Splitter,
  type SplitterItem,
  type SplitterItemContext,
  type SplitterProps,
} from '@/components/ui/Splitter'
import { testAttrs } from '../utils/testAttrs'

function mountSplitter(options: MountingOptions<SplitterProps> = {}) {
  return mount(Splitter, options)
}

function makeItem(overrides: Partial<SplitterItem> = {}): SplitterItem {
  return {
    id: 'left',
    slot: 'left',
    class: undefined,
    style: undefined,
    ...overrides,
  }
}

const casesIds = [
  { input: 'splitter-group', expected: 'splitter-group' },
  { input: undefined, expected: undefined },
]
const casesAutoSaveIds = [
  { input: 'splitter-layout', expected: 'splitter-layout' },
  { input: null, expected: null },
  { input: undefined, expected: null },
]
const casesDirections = [
  { input: 'horizontal' as const, expected: 'horizontal' },
  { input: 'vertical' as const, expected: 'vertical' },
  { input: undefined, expected: 'horizontal' },
]
const casesKeyboardResizeBy = [
  { input: 7, expected: 7 },
  { input: null, expected: null },
  { input: undefined, expected: 10 },
]
const storage = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
}
const hitAreaMargins = { mouse: 12, touch: 24 }
const casesTabindexes = [
  { input: 0, expected: 0 },
  { input: undefined, expected: 0 },
]
const casesDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: undefined },
]
const casesNonces = [
  { input: 'splitter-nonce', expected: 'splitter-nonce' },
  { input: undefined, expected: undefined },
]

describe('Splitter', () => {
  describe('props', () => {
    describe('items', () => {
      const mountItem = (item: Partial<SplitterItem>) =>
        mountSplitter({ props: { items: [makeItem(item)] } }).getComponent(SplitterPanel)

      describe('slot', () => {
        it('usa slot para resolver el nombre del panel', () => {
          const wrapper = mountSplitter({
            props: { items: [makeItem({ slot: 'files' })] },
            slots: { 'panel-files': () => h('span', 'Files') },
          })

          expect(wrapper.text()).toContain('Files')
        })
      })

      describe('id', () => {
        it('pasa id a SplitterPanel de Reka', () => {
          expect(mountItem({ id: 'panel-id' }).props('id')).toBe('panel-id')
        })
      })

      describe('collapsedSize', () => {
        it('pasa collapsedSize a SplitterPanel de Reka', () => {
          expect(mountItem({ collapsedSize: 5 }).props('collapsedSize')).toBe(5)
        })
      })

      describe('collapsible', () => {
        it.each([true, false, undefined])('pasa collapsible=%s a SplitterPanel de Reka', (value) => {
          expect(mountItem({ collapsible: value }).props('collapsible')).toBe(value)
        })
      })

      describe('defaultSize', () => {
        it('pasa defaultSize a SplitterPanel de Reka', () => {
          expect(mountItem({ defaultSize: 35 }).props('defaultSize')).toBe(35)
        })
      })

      describe('maxSize', () => {
        it('pasa maxSize a SplitterPanel de Reka', () => {
          expect(mountItem({ maxSize: 70 }).props('maxSize')).toBe(70)
        })
      })

      describe('minSize', () => {
        it('pasa minSize a SplitterPanel de Reka', () => {
          expect(mountItem({ minSize: 20 }).props('minSize')).toBe(20)
        })
      })

      describe('order', () => {
        it('pasa order a SplitterPanel de Reka', () => {
          expect(mountItem({ order: 2 }).props('order')).toBe(2)
        })
      })

      describe('sizeUnit', () => {
        it.each(['%', 'px'] as const)('pasa sizeUnit=%s a SplitterPanel de Reka', (value) => {
          expect(mountItem({ sizeUnit: value }).props('sizeUnit')).toBe(value)
        })
      })

      describe('class', () => {
        it('pasa class al SplitterPanel de Reka', () => {
          expect(mountItem({ class: 'panel-custom' }).classes()).toContain('panel-custom')
        })
      })

      describe('style', () => {
        it('pasa style al SplitterPanel de Reka', () => {
          expect(mountItem({ style: 'background: red' }).attributes('style')).toContain(
            'background: red',
          )
        })
      })
    })

    describe('id', () => {
      it.each(casesIds)('pasa id=$input al SplitterGroup de Reka', ({ input, expected }) => {
        const group = mountSplitter({ props: { id: input } }).getComponent(SplitterGroup)

        expect(group.props('id')).toBe(expected)
      })
    })

    describe('autoSaveId', () => {
      it.each(casesAutoSaveIds)(
        'pasa autoSaveId=$input al SplitterGroup de Reka',
        ({ input, expected }) => {
          const group = mountSplitter({ props: { autoSaveId: input } }).getComponent(SplitterGroup)

          expect(group.props('autoSaveId')).toBe(expected)
        },
      )
    })

    describe('direction', () => {
      it.each(casesDirections)(
        'pasa direction=$input al SplitterGroup de Reka',
        ({ input, expected }) => {
          const group = mountSplitter({ props: { direction: input } }).getComponent(SplitterGroup)

          expect(group.props('direction')).toBe(expected)
        },
      )
    })

    describe('keyboardResizeBy', () => {
      it.each(casesKeyboardResizeBy)(
        'pasa keyboardResizeBy=$input al SplitterGroup de Reka',
        ({ input, expected }) => {
          const group = mountSplitter({ props: { keyboardResizeBy: input } }).getComponent(
            SplitterGroup,
          )

          expect(group.props('keyboardResizeBy')).toBe(expected)
        },
      )
    })

    describe('storage', () => {
      it('pasa la API de almacenamiento personalizada al SplitterGroup de Reka', () => {
        const group = mountSplitter({ props: { storage } }).getComponent(SplitterGroup)

        expect(group.props('storage')).toEqual(storage)
      })
    })

    describe('hitAreaMargins', () => {
      it('pasa hitAreaMargins a cada SplitterResizeHandle de Reka', () => {
        const wrapper = mountSplitter({
          props: {
            hitAreaMargins,
            items: [makeItem(), makeItem({ id: 'right', slot: 'right' })],
          },
        })

        expect(wrapper.getComponent(SplitterResizeHandle).props('hitAreaMargins')).toEqual(
          hitAreaMargins,
        )
      })
    })

    describe('tabindex', () => {
      it.each(casesTabindexes)(
        'pasa tabindex=$input a cada SplitterResizeHandle de Reka',
        ({ input, expected }) => {
          const wrapper = mountSplitter({
            props: {
              tabindex: input,
              items: [makeItem(), makeItem({ id: 'right', slot: 'right' })],
            },
          })

          expect(wrapper.getComponent(SplitterResizeHandle).props('tabindex')).toBe(expected)
        },
      )
    })

    describe('disabled', () => {
      it.each(casesDisabled)(
        'pasa disabled=$input a cada SplitterResizeHandle de Reka',
        ({ input, expected }) => {
          const wrapper = mountSplitter({
            props: {
              disabled: input,
              items: [makeItem(), makeItem({ id: 'right', slot: 'right' })],
            },
          })

          expect(wrapper.getComponent(SplitterResizeHandle).props('disabled')).toBe(expected)
        },
      )
    })

    describe('nonce', () => {
      it.each(casesNonces)(
        'pasa nonce=$input a cada SplitterResizeHandle de Reka',
        ({ input, expected }) => {
          const wrapper = mountSplitter({
            props: {
              nonce: input,
              items: [makeItem(), makeItem({ id: 'right', slot: 'right' })],
            },
          })

          expect(wrapper.getComponent(SplitterResizeHandle).props('nonce')).toBe(expected)
        },
      )
    })

    describe('ui', () => {
      describe('panel', () => {
        testAttrs({
          id: '[data-test-splitter-panel]',
          mount: (attrs) =>
            mountSplitter({
              props: {
                items: [makeItem()],
                ui: {
                  panel: () => attrs,
                },
              },
            }),
        })
      })

      describe('resizeHandle', () => {
        testAttrs({
          id: '[data-test-splitter-resize-handle]',
          mount: (attrs) =>
            mountSplitter({
              props: {
                items: [makeItem(), makeItem({ id: 'right', slot: 'right' })],
                ui: {
                  resizeHandle: () => attrs,
                },
              },
            }),
        })
      })
    })
  })

  describe('emits', () => {
    describe('layout', () => {
      it('reenvía el layout emitido por SplitterGroup de Reka', async () => {
        const wrapper = mountSplitter()
        const layout = [35, 65]

        wrapper.getComponent(SplitterGroup).vm.$emit('layout', layout)
        await nextTick()

        expect(wrapper.emitted('layout')).toEqual([[layout]])
      })
    })

    describe('collapse', () => {
      it('reenvía collapse emitido por SplitterPanel de Reka', async () => {
        const wrapper = mountSplitter({ props: { items: [makeItem()] } })

        wrapper.getComponent(SplitterPanel).vm.$emit('collapse')
        await nextTick()

        expect(wrapper.emitted('collapse')).toEqual([[]])
      })
    })

    describe('expand', () => {
      it('reenvía expand emitido por SplitterPanel de Reka', async () => {
        const wrapper = mountSplitter({ props: { items: [makeItem()] } })

        wrapper.getComponent(SplitterPanel).vm.$emit('expand')
        await nextTick()

        expect(wrapper.emitted('expand')).toEqual([[]])
      })
    })

    describe('resize', () => {
      it('reenvía el tamaño y el tamaño anterior de SplitterPanel de Reka', async () => {
        const wrapper = mountSplitter({ props: { items: [makeItem()] } })
        await nextTick()
        wrapper.emitted('resize')?.splice(0)

        wrapper.getComponent(SplitterPanel).vm.$emit('resize', 60, 40)
        await nextTick()

        expect(wrapper.emitted('resize')).toEqual([[60, 40]])
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot de panel por defecto', () => {
        const wrapper = mountSplitter({
          props: { items: [makeItem({ slot: undefined })] },
          slots: {
            default: () => h('span', { 'data-test-splitter-default': '' }, 'Default panel'),
          },
        })

        expect(wrapper.get('[data-test-splitter-default]').text()).toBe('Default panel')
      })
    })

    describe('handle', () => {
      it('renderiza el slot global del manejador', () => {
        const wrapper = mountSplitter({
          props: {
            items: [makeItem({ slot: undefined }), makeItem({ id: 'right', slot: undefined })],
          },
          slots: {
            handle: () => h('span', { 'data-test-global-handle': '' }, 'Global handle'),
          },
        })

        expect(wrapper.get('[data-test-global-handle]').text()).toBe('Global handle')
      })
    })

    describe('{slot}', () => {
      it('renderiza panel-{slot} para el panel dirigido', () => {
        const wrapper = mountSplitter({
          props: { items: [makeItem({ slot: 'files' })] },
          slots: {
            'panel-files': () => h('span', { 'data-test-panel-files': '' }, 'Files panel'),
          },
        })

        expect(wrapper.get('[data-test-panel-files]').text()).toBe('Files panel')
      })

      it('renderiza handle-{slot} para el manejador dirigido', () => {
        const wrapper = mountSplitter({
          props: {
            items: [makeItem({ slot: 'files' }), makeItem({ id: 'right', slot: 'right' })],
          },
          slots: {
            'handle-files': () => h('span', { 'data-test-handle-files': '' }, 'Files handle'),
          },
        })

        expect(wrapper.get('[data-test-handle-files]').text()).toBe('Files handle')
      })
    })
  })

  describe('context contract', () => {
    it('pasa el contexto compartido a los slots de panel y manejador', () => {
      const items = [makeItem(), makeItem({ id: 'right', slot: 'right' })]
      const panelContexts: SplitterItemContext[] = []
      const handleContexts: SplitterItemContext[] = []

      function pickContext(context: SplitterItemContext): SplitterItemContext {
        const { layout, item, index, first, last, nextItem } = context

        return { layout, item, index, first, last, nextItem }
      }

      mountSplitter({
        props: { items },
        slots: {
          'panel-left': (context: SplitterItemContext) => {
            panelContexts.push(pickContext(context))
            return h('span')
          },
          'panel-right': (context: SplitterItemContext) => {
            panelContexts.push(pickContext(context))
            return h('span')
          },
          'handle-left': (context: SplitterItemContext) => {
            handleContexts.push(pickContext(context))
            return h('span')
          },
        },
      })

      expect(panelContexts).toHaveLength(2)
      expect(panelContexts[0]).toEqual({
        layout: expect.any(Array),
        item: items[0],
        index: 0,
        first: true,
        last: false,
        nextItem: items[1],
      })
      expect(panelContexts[1]).toEqual({
        layout: expect.any(Array),
        item: items[1],
        index: 1,
        first: false,
        last: true,
        nextItem: undefined,
      })
      expect(handleContexts).toHaveLength(1)
      expect(handleContexts[0]).toEqual({
        layout: expect.any(Array),
        item: items[0],
        index: 0,
        first: true,
        last: false,
        nextItem: items[1],
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-splitter-root]',
      assertId: false,
      mount: (attrs) => mountSplitter({ attrs }),
    })
  })
})
