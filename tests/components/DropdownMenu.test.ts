import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import {
  DropdownMenuContent,
  DropdownMenuArrow,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuItem as RekaDropdownMenuItem,
} from 'reka-ui'

import { DropdownMenu, type DropdownMenuProps } from '@/components/ui/DropdownMenu'
import DropdownMenuOption from '@/components/ui/DropdownMenu/DropdownMenuOption.vue'
import { testIconProps } from '../utils/testIconProps'

const casesModal = [
  { name: 'normal true', input: true, expected: true },
  { name: 'normal false', input: false, expected: false },
  { name: 'límite undefined', input: undefined, expected: true },
]

const casesOpen = [
  { name: 'normal abierto', input: true, expected: true },
  { name: 'normal cerrado', input: false, expected: false },
  { name: 'límite undefined', input: undefined, expected: false },
]

const casesDisabled = [
  { name: 'normal deshabilitado', input: true, expected: true },
  { name: 'normal habilitado', input: false, expected: false },
  { name: 'límite undefined', input: undefined, expected: false },
]

const casesContentProps = {
  align: [
    { input: 'end', expected: 'end' },
    { input: 'start', expected: 'start' },
    { input: 'center', expected: 'center' },
    { input: undefined, expected: 'center' },
  ],
  alignFlip: [
    { input: true, expected: true },
    { input: false, expected: false },
    { input: undefined, expected: true },
  ],
  alignOffset: [
    { input: -1, expected: -1 },
    { input: 0, expected: 0 },
    { input: 12, expected: 12 },
    { input: undefined, expected: 0 },
  ],
  arrowPadding: [
    { input: 0, expected: 0 },
    { input: -1, expected: -1 },
    { input: 8, expected: 8 },
    { input: undefined, expected: 0 },
  ],
  avoidCollisions: [
    { input: true, expected: true },
    { input: false, expected: false },
    { input: undefined, expected: true },
  ],
  collisionBoundary: [
    { input: [], expected: [] },
    { input: [null], expected: [null] },
    { input: null, expected: null },
    { input: undefined, expected: [] },
  ],
  collisionPadding: [
    { input: 0, expected: 0 },
    { input: -1, expected: -1 },
    { input: { top: 12, left: 4 }, expected: { top: 12, left: 4 } },
    { input: undefined, expected: 0 },
  ],
  disableUpdateOnLayoutShift: [
    { input: false, expected: false },
    { input: true, expected: true },
    { input: undefined, expected: false },
  ],
  forceMount: [
    { input: true, expected: true },
    { input: false, expected: false },
    { input: undefined, expected: undefined },
  ],
  hideShiftedArrow: [
    { input: true, expected: true },
    { input: false, expected: false },
    { input: undefined, expected: true },
  ],
  hideWhenDetached: [
    { input: false, expected: false },
    { input: true, expected: true },
    { input: undefined, expected: false },
  ],
  loop: [
    { input: false, expected: false },
    { input: true, expected: true },
    { input: undefined, expected: false },
  ],
  positionStrategy: [
    { input: 'fixed', expected: 'fixed' },
    { input: 'absolute', expected: 'absolute' },
    { input: undefined, expected: 'fixed' },
  ],
  prioritizePosition: [
    { input: false, expected: false },
    { input: true, expected: true },
    { input: undefined, expected: false },
  ],
  side: [
    { input: 'right', expected: 'right' },
    { input: 'bottom', expected: 'bottom' },
    { input: 'left', expected: 'left' },
    { input: 'top', expected: 'top' },
    { input: undefined, expected: 'bottom' },
  ],
  sideFlip: [
    { input: true, expected: true },
    { input: false, expected: false },
    { input: undefined, expected: true },
  ],
  sideOffset: [
    { input: -1, expected: -1 },
    { input: 0, expected: 0 },
    { input: 16, expected: 16 },
    { input: undefined, expected: 0 },
  ],
  sticky: [
    { input: 'partial', expected: 'partial' },
    { input: 'always', expected: 'always' },
    { input: undefined, expected: 'partial' },
  ],
  updatePositionStrategy: [
    { input: 'optimized', expected: 'optimized' },
    { input: 'always', expected: 'always' },
    { input: undefined, expected: 'optimized' },
  ],
} as const

const casesContentEmits = [
  'closeAutoFocus',
  'escapeKeyDown',
  'focusOutside',
  'interactOutside',
  'pointerDownOutside',
] as const

const casesArrowProps = {
  heightArrow: [
    { input: -1, expected: -1 },
    { input: 0, expected: 0 },
    { input: 5, expected: 5 },
    { input: undefined, expected: 5 },
  ],
  widthArrow: [
    { input: -1, expected: -1 },
    { input: 0, expected: 0 },
    { input: 10, expected: 10 },
    { input: undefined, expected: 10 },
  ],
  roundedArrow: [
    { input: true, expected: true },
    { input: false, expected: false },
    { input: undefined, expected: false },
  ],
} as const

const casesItems = {
  label: [
    { input: 'Perfil', expected: 'Perfil' },
    { input: '', expected: '' },
    { input: undefined, expected: undefined },
  ],
  disabled: [
    { input: true, expected: true },
    { input: false, expected: false },
    { input: undefined, expected: undefined },
  ],
} as const

beforeAll(() => {
  class TestResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  globalThis.ResizeObserver = TestResizeObserver as typeof ResizeObserver
})

function mountDropdownMenu(options: MountingOptions<DropdownMenuProps> = {}) {
  return mount(DropdownMenu, { attachTo: document.body, ...options })
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('DropdownMenu', () => {
  describe('props', () => {
    describe('modal', () => {
      it.each(casesModal)('pasa $name a DropdownMenuRoot', ({ input, expected }) => {
        const wrapper = mountDropdownMenu({ props: { modal: input } })

        expect(wrapper.getComponent(DropdownMenuRoot).props('modal')).toBe(expected)
      })
    })

    describe('open', () => {
      it.each(casesOpen)('pasa $name a DropdownMenuRoot', ({ input, expected }) => {
        const wrapper = mountDropdownMenu({ props: { open: input } })

        expect(wrapper.getComponent(DropdownMenuRoot).props('open')).toBe(expected)
      })
    })

    describe('disabled', () => {
      it.each(casesDisabled)('pasa $name a DropdownMenuTrigger', ({ input, expected }) => {
        const wrapper = mountDropdownMenu({ props: { disabled: input } })

        expect(wrapper.getComponent(DropdownMenuTrigger).props('disabled')).toBe(expected)
        expect(wrapper.getComponent(DropdownMenuPortal).props('disabled')).toBe(expected)
      })
    })

    for (const [prop, cases] of Object.entries(casesContentProps)) {
      describe(prop, () => {
        it.each(cases)('pasa el valor $input y su default', async ({ input, expected }) => {
          const wrapper = mountDropdownMenu({
            props: {
              open: true,
              disabled: true,
              forceMount: true,
              [prop]: input,
            },
          })
          await nextTick()

          if (prop === 'forceMount' && input === undefined) {
            expect(wrapper.props('forceMount')).toBeUndefined()
          } else {
            expect(wrapper.getComponent(DropdownMenuContent).props(prop)).toEqual(expected)
          }
        })
      })
    }

    for (const [prop, cases] of Object.entries(casesArrowProps)) {
      describe(prop, () => {
        it.each(cases)(
          'pasa el valor $input y su default al Arrow',
          async ({ input, expected }) => {
            const wrapper = mountDropdownMenu({
              props: { open: true, disabled: true, forceMount: true, [prop]: input },
            })
            await nextTick()

            const arrowProp = prop.replace('Arrow', '').toLowerCase()
            expect(wrapper.getComponent(DropdownMenuArrow).props(arrowProp)).toBe(expected)
          },
        )
      })
    }

    describe('items', () => {
      for (const [prop, cases] of Object.entries(casesItems)) {
        describe(prop, () => {
          it.each(cases)('pasa $input al DropdownMenuOption', async ({ input, expected }) => {
            const item = { label: 'Opción', [prop]: input }
            const wrapper = mountDropdownMenu({
              props: { open: true, disabled: true, forceMount: true, items: [item] },
            })
            await nextTick()

            expect(wrapper.getComponent(DropdownMenuOption).props('item')[prop]).toEqual(expected)
          })
        })
      }

      describe('icon', () => {
        testIconProps({
          text: 'pasa toda la configuración del icono del item',
          id: '[data-test-dropdown-menu-item-icon]',
          mount: async (icon) => {
            const wrapper = mountDropdownMenu({
              props: {
                open: true,
                disabled: true,
                forceMount: true,
                items: [{ label: 'Opción', icon }],
              },
            })
            await nextTick()
            return wrapper
          },
        })
      })

      describe('onSelect', () => {
        it('ejecuta la función cuando RekaDropdownMenuItem emite select', async () => {
          const onSelect = vi.fn()
          const wrapper = mountDropdownMenu({
            props: {
              open: true,
              disabled: true,
              forceMount: true,
              items: [{ label: 'Opción', onSelect }],
            },
          })
          await nextTick()
          const event = new Event('select')

          await wrapper.getComponent(RekaDropdownMenuItem).vm.$emit('select', event)

          expect(onSelect).toHaveBeenCalledWith(event)
        })
      })
    })
  })

  describe('emits', () => {
    it('emite update:open al cambiar el estado', async () => {
      const wrapper = mountDropdownMenu()

      await wrapper.getComponent(DropdownMenuRoot).vm.$emit('update:open', true)

      expect(wrapper.emitted('update:open')).toEqual([[true]])
    })

    for (const event of casesContentEmits) {
      describe(event, () => {
        it('reenvía el evento de DropdownMenuContent', async () => {
          const wrapper = mountDropdownMenu({
            props: { open: true, disabled: true, forceMount: true },
          })
          await nextTick()
          const payload = new Event(event)

          wrapper.getComponent(DropdownMenuContent).vm.$emit(event, payload)

          expect(wrapper.emitted(event)).toEqual([[payload]])
        })
      })
    }
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el contenido personalizado del trigger', () => {
        const wrapper = mountDropdownMenu({
          props: { open: true, disabled: true, forceMount: true },
          slots: {
            default: () => h('span', 'Abrir'),
          },
        })

        expect(wrapper.get('[data-test-dropdown-menu-trigger]').text()).toBe('Abrir')
      })
    })

    for (const slotName of ['item', 'item-leading', 'item-label'] as const) {
      describe(slotName, () => {
        it('renderiza el slot con item e index', async () => {
          const wrapper = mountDropdownMenu({
            props: {
              open: true,
              disabled: true,
              forceMount: true,
              items: [{ label: 'Opción' }],
            },
            slots: {
              [slotName]: ({ item, index }) => h('span', `${item.label}-${index}`),
            },
          })
          await nextTick()

          const selector = {
            item: '[data-test-dropdown-menu-item]',
            'item-leading': '[data-test-dropdown-menu-item-leading]',
            'item-label': '[data-test-dropdown-menu-item-label]',
          }[slotName]

          expect(wrapper.get(selector).text()).toContain('Opción-0')
        })
      })
    }
  })
})
