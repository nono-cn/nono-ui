import { h } from 'vue'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DropdownMenuRoot, DropdownMenuTrigger } from 'reka-ui'

import { DropdownMenu } from '@/components/ui/DropdownMenu'

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
      it('por defecto el menú está cerrado', () => {
        const dropdownMenu = mountDropdownMenu({
          props: { items: [{ label: 'Perfil' }] },
        })

        expect(dropdownMenu.find('[data-test-dropdown-menu-content]').exists()).toBe(false)
      })

      it('con open=true el menú se muestra', () => {
        const dropdownMenu = mountDropdownMenu({
          props: { open: true, items: [{ label: 'Perfil' }] },
        })

        expect(dropdownMenu.find('[data-test-dropdown-menu-content]').exists()).toBe(true)
      })

      it('con open=false el menú no se muestra', () => {
        const dropdownMenu = mountDropdownMenu({
          props: { open: false, items: [{ label: 'Perfil' }] },
        })

        expect(dropdownMenu.find('[data-test-dropdown-menu-content]').exists()).toBe(false)
      })
    })

    describe('modal', () => {
      it('por defecto pasa modal=true a Reka', () => {
        const dropdownMenu = mountDropdownMenu()

        expect(dropdownMenu.getComponent(DropdownMenuRoot).props('modal')).toBe(true)
      })

      it('con modal=true pasa modal=true a Reka', () => {
        const dropdownMenu = mountDropdownMenu({ props: { modal: true } })

        expect(dropdownMenu.getComponent(DropdownMenuRoot).props('modal')).toBe(true)
      })

      it('con modal=false pasa modal=false a Reka', () => {
        const dropdownMenu = mountDropdownMenu({ props: { modal: false } })

        expect(dropdownMenu.getComponent(DropdownMenuRoot).props('modal')).toBe(false)
      })
    })

    describe('disabled', () => {
      it('por defecto pasa disabled=false a Reka', () => {
        const dropdownMenu = mountDropdownMenu()

        expect(dropdownMenu.getComponent(DropdownMenuTrigger).props('disabled')).toBe(false)
      })

      it('con disabled=true pasa disabled=true a Reka', () => {
        const dropdownMenu = mountDropdownMenu({ props: { disabled: true } })

        expect(dropdownMenu.getComponent(DropdownMenuTrigger).props('disabled')).toBe(true)
      })

      it('con disabled=false pasa disabled=false a Reka', () => {
        const dropdownMenu = mountDropdownMenu({ props: { disabled: false } })

        expect(dropdownMenu.getComponent(DropdownMenuTrigger).props('disabled')).toBe(false)
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('pinta el contenido del slot como trigger', () => {
        const dropdownMenu = mountDropdownMenu({
          slots: { default: () => h('button', 'Opciones') },
        })

        expect(dropdownMenu.get('[data-test-dropdown-menu-trigger]').text()).toBe('Opciones')
      })
    })
  })
})
