import { h } from 'vue'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'reka-ui'

import {
  DropdownMenu,
  dropdownMenuDefaults,
  type DropdownMenuArrowConfig,
  type DropdownMenuContentConfig,
  type DropdownMenuContext,
  type DropdownMenuItem,
  type DropdownMenuItemContext,
  type DropdownMenuProps,
} from '@/components/ui/DropdownMenu'
import { arrowPaths } from '@/components/ui/constants'
import { Icon } from '@/components/ui/Icon'

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

const casesDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: dropdownMenuDefaults.disabled },
] satisfies Array<{ input: DropdownMenuProps['disabled']; expected: boolean }>

const casesSize = [
  {
    input: undefined,
    expected: { class: { item: ['gap-2', 'px-2', 'py-1.5', 'text-sm'], leading: ['size-5'] } },
  },
  {
    input: 'xs',
    expected: { class: { item: ['gap-1', 'px-1.5', 'py-1', 'text-xs'], leading: ['size-3'] } },
  },
  {
    input: 'sm',
    expected: { class: { item: ['gap-1.5', 'px-2', 'py-1', 'text-xs'], leading: ['size-4'] } },
  },
  {
    input: 'md',
    expected: { class: { item: ['gap-2', 'px-2', 'py-1.5', 'text-sm'], leading: ['size-5'] } },
  },
  {
    input: 'lg',
    expected: { class: { item: ['gap-2', 'px-2.5', 'py-1.5', 'text-base'], leading: ['size-6'] } },
  },
  {
    input: 'xl',
    expected: { class: { item: ['gap-2.5', 'px-3', 'py-2', 'text-base'], leading: ['size-7'] } },
  },
] satisfies Array<{
  input: DropdownMenuProps['size']
  expected: { class: { item: string[]; leading: string[] } }
}>

const casesItemsVacios = [
  { input: undefined, expected: dropdownMenuDefaults.items },
  { input: [], expected: undefined },
] satisfies Array<{ input: DropdownMenuProps['items']; expected: undefined }>

const customContent = {
  side: 'top',
  sideOffset: 12,
  align: 'end',
  alignOffset: 6,
  collisionPadding: 16,
  avoidCollisions: false,
  loop: true,
  onEscapeKeyDown: () => {},
  onPointerDownOutside: () => {},
  onFocusOutside: () => {},
  onInteractOutside: () => {},
  onOpenAutoFocus: () => {},
  onCloseAutoFocus: () => {},
} satisfies DropdownMenuContentConfig

// Content
const casesContent = [
  { name: 'sin configuración', input: undefined, expected: dropdownMenuDefaults.content },
  {
    name: 'con configuración',
    input: customContent,
    expected: { ...dropdownMenuDefaults.content, ...customContent },
  },
] satisfies Array<{ name: string; input: DropdownMenuProps['content']; expected: object }>

// Arrow
const customArrow = { width: 16, height: 8, rounded: true } satisfies DropdownMenuArrowConfig

const casesArrow = [
  { name: 'sin configuración', input: undefined, expected: dropdownMenuDefaults.arrow },
  {
    name: 'con configuración',
    input: customArrow,
    expected: { ...dropdownMenuDefaults.arrow, ...customArrow },
  },
] satisfies Array<{ name: string; input: DropdownMenuProps['arrow']; expected: object }>

const casesArrowPath = [
  { name: 'redondeado', input: true, expected: arrowPaths.rounded },
  { name: 'recto', input: false, expected: arrowPaths.sharp },
  { name: 'por defecto', input: undefined, expected: arrowPaths.sharp },
] satisfies Array<{ name: string; input: DropdownMenuArrowConfig['rounded']; expected: string }>

const casesShowArrow = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: dropdownMenuDefaults.showArrow },
] satisfies Array<{ input: DropdownMenuProps['showArrow']; expected: boolean }>

// Nodes
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
      class: ['relative', 'flex', 'items-center', 'rounded-sm', 'select-none'],
      attrs: { role: 'menuitem' },
    },
  },
  {
    input: 'item-leading',
    expected: {
      class: ['inline-flex', 'shrink-0', 'items-center', 'justify-center'],
      attrs: {},
    },
  },
  { input: 'item-icon', expected: { class: ['size-full'], attrs: { 'aria-hidden': 'true' } } },
  {
    input: 'arrow',
    expected: { class: ['fill-popover', 'stroke-border', '-translate-y-px'], attrs: {} },
  },
] satisfies Array<{
  input: 'content' | 'item' | 'item-leading' | 'item-icon' | 'arrow'
  expected: { class: string[]; attrs: Record<string, string> }
}>

// Reka
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

    describe('disabled', () => {
      it.each(casesDisabled)(
        'pasa disabled=$input al DropdownMenuTrigger como $expected',
        ({ input, expected }) => {
          const dropdownMenu = mountDropdownMenu({ props: { disabled: input } })

          expect(dropdownMenu.getComponent(DropdownMenuTrigger).props('disabled')).toBe(expected)
        },
      )
    })

    describe('size', () => {
      it.each(casesSize)(
        'aplica las class size=$input al item y a su leading',
        ({ input, expected }) => {
          const dropdownMenu = mountDropdownMenu({
            props: { open: true, size: input, items: [{ label: 'Perfil', icon: 'user' }] },
          })

          expect({
            item: dropdownMenu.get('[data-test-dropdown-menu-item]').classes(),
            leading: dropdownMenu.get('[data-test-dropdown-menu-item-leading]').classes(),
          }).toEqual({
            item: expect.arrayContaining(expected.class.item),
            leading: expect.arrayContaining(expected.class.leading),
          })
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

      describe('icon', () => {
        it('pinta el Icon con el name de item.icon', () => {
          const icon = mountDropdownMenu({
            props: { open: true, items: [{ label: 'Perfil', icon: 'user' }] },
          }).getComponent<typeof Icon>('[data-test-dropdown-menu-item-icon]')

          expect(icon.props('name')).toBe('user')
        })

        // it('no pinta el leading si el item no tiene icon ni hay slot leading', () => {
        //   const dropdownMenu = mountDropdownMenu({
        //     props: { open: true, items: [{ label: 'Perfil' }] },
        //   })

        //   expect(dropdownMenu.find('[data-test-dropdown-menu-item-leading]').exists()).toBe(false)
        // })
      })
    })

    describe('content', () => {
      it.each(casesContent)('pasa content $name al DropdownMenuContent', ({ input, expected }) => {
        const dropdownMenu = mountDropdownMenu({
          props: { open: true, content: input, items: [{ label: 'Perfil' }] },
        })

        expect(dropdownMenu.getComponent(DropdownMenuContent).vm.$.vnode.props).toMatchObject(
          expected,
        )
      })
    })

    describe('arrow', () => {
      it.each(casesArrow)('pasa arrow $name al DropdownMenuArrow', ({ input, expected }) => {
        const dropdownMenu = mountDropdownMenu({
          props: { open: true, showArrow: true, arrow: input, items: [{ label: 'Perfil' }] },
        })

        expect(dropdownMenu.getComponent(DropdownMenuArrow).props()).toMatchObject(expected)
      })

      it.each(casesArrowPath)('con rounded=$input pinta el path $name', ({ input, expected }) => {
        const path = mountDropdownMenu({
          props: {
            open: true,
            showArrow: true,
            arrow: { rounded: input },
            items: [{ label: 'Perfil' }],
          },
        }).get('[data-test-dropdown-menu-arrow] path')

        expect(path.attributes('d')).toBe(expected)
      })
    })

    describe('showArrow', () => {
      it.each(casesShowArrow)(
        'con showArrow=$input renderiza la flecha: $expected',
        ({ input, expected }) => {
          const dropdownMenu = mountDropdownMenu({
            props: { open: true, showArrow: input, items: [{ label: 'Perfil' }] },
          })

          expect(dropdownMenu.find('[data-test-dropdown-menu-arrow]').exists()).toBe(expected)
        },
      )
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot dentro del trigger', () => {
        expect(mountDropdownMenu().get('[data-test-dropdown-menu-trigger]').text()).toBe('Abrir')
      })
    })

    describe('leading', () => {
      it('renderiza el slot en el leading de todos los items y oculta item.icon', () => {
        const dropdownMenu = mountDropdownMenu({
          props: {
            open: true,
            items: [
              { label: 'Perfil', icon: 'user' },
              { label: 'Ajustes', icon: 'star' },
            ],
          },
          slots: { leading: () => h('span', 'Leading') },
        })

        expect({
          leadings: dropdownMenu
            .findAll('[data-test-dropdown-menu-item-leading]')
            .map((leading) => leading.text()),
          icon: dropdownMenu.find('[data-test-dropdown-menu-item-icon]').exists(),
        }).toEqual({ leadings: ['Leading', 'Leading'], icon: false })
      })
    })
  })

  describe('nodos', () => {
    it.each(casesNodos)(
      'aplica las class y los attrs fijos al nodo $input',
      ({ input, expected }) => {
        const node = mountDropdownMenu({
          props: { open: true, showArrow: true, items: [{ label: 'Perfil', icon: 'user' }] },
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

    describe('DropdownMenuItemContext', () => {
      it('pasa DropdownMenuItemContext al slot leading de cada item', () => {
        const items: DropdownMenuItem[] = [{ label: 'Perfil' }, { label: 'Ajustes' }]
        const contexts: DropdownMenuItemContext[] = []
        mountDropdownMenu({
          props: { open: true, items },
          slots: {
            // Vue añade ref_for a los slots dentro de un v-for; no es parte del contexto
            leading: (slotProps: DropdownMenuItemContext & { ref_for?: boolean }) => {
              const { ref_for: _refFor, ...value } = slotProps
              void _refFor
              contexts.push(value)
              return h('span', 'Leading')
            },
          },
        })

        expect(contexts).toEqual([
          { item: items[0], index: 0 },
          { item: items[1], index: 1 },
        ])
      })
    })
  })
})
