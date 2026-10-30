import { h } from 'vue'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DropdownMenuPortal, DropdownMenuRoot, DropdownMenuTrigger } from 'reka-ui'

import {
  DropdownMenu,
  dropdownMenuDefaults,
  type DropdownMenuContext,
  type DropdownMenuItem,
  type DropdownMenuProps,
} from '@/components/ui/DropdownMenu'

// reka-ui posiciona el contenido con floating-ui, que necesita ResizeObserver
vi.stubGlobal(
  'ResizeObserver',
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
)

afterEach(() => {
  document.body.innerHTML = ''
})

const casesOpen = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: dropdownMenuDefaults.open },
] satisfies Array<{ input: DropdownMenuProps['open']; expected: boolean }>

const casesModal = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: dropdownMenuDefaults.modal },
] satisfies Array<{ input: DropdownMenuProps['modal']; expected: boolean }>

const casesItemsVacios = [
  { input: undefined, expected: dropdownMenuDefaults.items },
  { input: [], expected: undefined },
] satisfies Array<{ input: DropdownMenuProps['items']; expected: undefined }>

const casesNodos = [
  {
    input: 'content',
    expected: {
      class: [
        'z-50',
        'min-w-32',
        'rounded-md',
        'border',
        'bg-popover',
        'p-1',
        'text-popover-foreground',
        'shadow-md',
        'outline-hidden',
      ],
      attrs: { role: 'menu' },
    },
  },
  {
    input: 'item',
    expected: {
      class: [
        'relative',
        'flex',
        'items-center',
        'gap-2',
        'rounded-sm',
        'px-2',
        'py-1.5',
        'text-sm',
        'select-none',
      ],
      attrs: { role: 'menuitem' },
    },
  },
] satisfies Array<{
  input: 'content' | 'item'
  expected: { class: string[]; attrs: Record<string, string> }
}>

const casesNodoReka = [
  {
    name: 'DropdownMenuTrigger',
    input: DropdownMenuTrigger,
    expected: { reka: { as: 'button', asChild: true } },
  },
  {
    name: 'DropdownMenuPortal',
    input: DropdownMenuPortal,
    expected: { reka: { to: 'body', forceMount: false, defer: undefined, disabled: undefined } },
  },
] satisfies Array<{
  name: string
  input: typeof DropdownMenuTrigger | typeof DropdownMenuPortal
  expected: { reka: Record<string, unknown> }
}>

const contextFunctions = {
  close: expect.any(Function),
}

const casesDropdownMenuContext = [
  {
    name: 'abierto',
    input: { open: true },
    expected: { open: true },
  },
  {
    name: 'cerrado',
    input: { open: false },
    expected: { open: false },
  },
  {
    name: 'open por defecto',
    input: { open: undefined },
    expected: { open: dropdownMenuDefaults.open },
  },
] satisfies Array<{
  name: string
  input: Partial<DropdownMenuProps>
  expected: Omit<DropdownMenuContext, keyof typeof contextFunctions>
}>

const casesUpdateOpen = [
  { input: false, expected: true },
  { input: true, expected: false },
] satisfies Array<{ input: DropdownMenuProps['open']; expected: boolean }>

function mountDropdownMenu(options: ComponentMountingOptions<typeof DropdownMenu> = {}) {
  const { slots, global, ...rest } = options
  return mount(DropdownMenu, {
    attachTo: document.body,
    global: {
      ...global,
      // el portal se pinta en línea para poder buscar el contenido dentro del wrapper
      stubs: { DropdownMenuPortal: { template: '<div><slot /></div>' }, ...global?.stubs },
    },
    slots: { default: () => h('button', 'Abrir'), ...slots },
    ...rest,
  })
}

describe('DropdownMenu', () => {
  describe('props', () => {
    describe('open', () => {
      it.each(casesOpen)(
        'pasa open=$input al DropdownMenuRoot como $expected',
        ({ input, expected }) => {
          const dropdownMenu = mountDropdownMenu({ props: { open: input } })

          expect(dropdownMenu.getComponent(DropdownMenuRoot).props('open')).toBe(expected)
        },
      )
    })

    describe('modal', () => {
      it.each(casesModal)(
        'pasa modal=$input al DropdownMenuRoot como $expected',
        ({ input, expected }) => {
          const dropdownMenu = mountDropdownMenu({ props: { modal: input } })

          expect(dropdownMenu.getComponent(DropdownMenuRoot).props('modal')).toBe(expected)
        },
      )
    })

    describe('items', () => {
      it('renderiza un item por cada entrada de items', () => {
        const items: DropdownMenuItem[] = [{ label: 'Perfil' }, { label: 'Ajustes' }]
        const dropdownMenu = mountDropdownMenu({ props: { open: true, items } })

        expect(dropdownMenu.findAll('[data-test-dropdown-menu-item]')).toHaveLength(2)
      })

      it.each(casesItemsVacios)('no renderiza el contenido con items=$input', ({ input }) => {
        const dropdownMenu = mountDropdownMenu({ props: { open: true, items: input } })

        expect(dropdownMenu.find('[data-test-dropdown-menu-content]').exists()).toBe(false)
      })

      describe('label', () => {
        it('pinta el label de cada item', () => {
          const items: DropdownMenuItem[] = [{ label: 'Perfil' }, { label: 'Ajustes' }]
          const dropdownMenu = mountDropdownMenu({ props: { open: true, items } })

          expect(
            dropdownMenu.findAll('[data-test-dropdown-menu-item]').map((item) => item.text()),
          ).toEqual(['Perfil', 'Ajustes'])
        })
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot dentro del trigger', () => {
        expect(mountDropdownMenu().get('[data-test-dropdown-menu-trigger]').text()).toBe('Abrir')
      })
    })
  })

  describe('nodos', () => {
    it.each(casesNodos)(
      'aplica las class y los attrs fijos al nodo $input',
      ({ input, expected }) => {
        const node = mountDropdownMenu({
          props: { open: true, items: [{ label: 'Perfil' }] },
        }).get(`[data-test-dropdown-menu-${input}]`)

        expect({ class: node.classes(), attrs: node.attributes() }).toEqual({
          class: expect.arrayContaining(expected.class),
          attrs: expect.objectContaining(expected.attrs),
        })
      },
    )

    it.each(casesNodoReka)('pasa las props fijas de Reka a $name', ({ input, expected }) => {
      const node = mountDropdownMenu({
        props: { open: true, items: [{ label: 'Perfil' }] },
      }).getComponent(input)

      expect(node.vm.$.vnode.props).toMatchObject(expected.reka)
    })
  })

  describe('emits', () => {
    describe('update:open', () => {
      it.each(casesUpdateOpen)(
        'reemite $expected cuando DropdownMenuRoot cambia open=$input',
        ({ input, expected }) => {
          const dropdownMenu = mountDropdownMenu({ props: { open: input } })

          dropdownMenu.getComponent(DropdownMenuRoot).vm.$emit('update:open', expected)

          expect(dropdownMenu.emitted('update:open')).toEqual([[expected]])
        },
      )
    })
  })

  describe('context', () => {
    describe('DropdownMenuContext', () => {
      it.each(casesDropdownMenuContext)(
        'cumple el contrato de DropdownMenuContext en el caso $name',
        ({ input, expected }) => {
          let context: DropdownMenuContext | undefined
          mountDropdownMenu({
            props: input,
            slots: {
              default: (value: DropdownMenuContext) => {
                context = value
                return h('button', 'Abrir')
              },
            },
          })

          expect(context).toEqual({ ...expected, ...contextFunctions })
        },
      )
    })
  })
})
