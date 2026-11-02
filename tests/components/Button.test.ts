import { defineComponent, h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Primitive } from 'reka-ui'

import { Button, buttonDefaults, type ButtonProps } from '@/components/Button'
import { ButtonGroup } from '@/components/ButtonGroup'
import { Icon } from '@/components/Icon'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'
import { testRadius } from '../utils/testRadius'

function mountButton(options: MountingOptions<ButtonProps> = {}) {
  return mount(Button, options)
}

const ButtonInGroup = defineComponent({
  props: { groupSize: String, buttonSize: String },
  setup(props) {
    return () =>
      h(ButtonGroup, { size: props.groupSize }, () =>
        h(Button, { label: 'Guardar', icon: 'check', size: props.buttonSize }),
      )
  },
})

describe('Button', () => {
  describe('props', () => {
    describe('label', () => {
      const casesLabel = [
        {
          text: 'pinta el label como texto del botón',
          input: { label: 'Guardar' },
          expected: {
            root: { text: 'Guardar' },
          },
        },
        {
          text: 'sin label el botón no tiene texto',
          input: {},
          expected: {
            root: { text: '' },
          },
        },
      ] as const

      it.each(casesLabel)('$text', ({ input, expected }) => {
        const root = mountButton({ props: input }).get('[data-test-button-root]')

        expect({
          root: { text: root.text() },
        }).toEqual({
          root: { text: expected.root.text },
        })
      })
    })

    describe('variant', () => {
      const casesVariant = [
        {
          text: 'con variant=solid rellena con --button-color, que se aclara al 90% con hover y al 80% al pulsar',
          input: { variant: 'solid' },
          expected: {
            root: {
              class: [
                'bg-(--button-color)',
                'text-(--button-color-foreground)',
                'hover:bg-(--button-color)/90',
                'active:bg-(--button-color)/80',
              ],
            },
          },
        },
        {
          text: 'con variant=outline no tiene fondo y tiene borde de --button-color al 40%, que pasa al 60% al pulsar',
          input: { variant: 'outline' },
          expected: {
            root: {
              class: [
                'bg-transparent',
                'border-(--button-color)/40',
                'text-(--button-color)',
                'hover:bg-(--button-color)/10',
                'active:border-(--button-color)/60',
                'active:bg-(--button-color)/20',
              ],
            },
          },
        },
        {
          text: 'con variant=plain no tiene fondo hasta el hover (10%) o al pulsar (20%)',
          input: { variant: 'plain' },
          expected: {
            root: {
              class: [
                'bg-transparent',
                'text-(--button-color)',
                'hover:bg-(--button-color)/10',
                'active:bg-(--button-color)/20',
              ],
            },
          },
        },
        {
          text: 'con variant=subtle tiene fondo de --button-color al 10% y borde al 20%',
          input: { variant: 'subtle' },
          expected: {
            root: {
              class: [
                'bg-(--button-color)/10',
                'border-(--button-color)/20',
                'text-(--button-color)',
                'hover:bg-(--button-color)/15',
                'active:bg-(--button-color)/25',
              ],
            },
          },
        },
        {
          text: 'con variant=soft tiene fondo de --button-color al 10% sin borde',
          input: { variant: 'soft' },
          expected: {
            root: {
              class: [
                'bg-(--button-color)/10',
                'text-(--button-color)',
                'hover:bg-(--button-color)/20',
                'active:bg-(--button-color)/30',
              ],
            },
          },
        },
        {
          text: 'con variant=link no tiene fondo y subraya el texto, que pierde el subrayado con hover',
          input: { variant: 'link' },
          expected: {
            root: {
              class: [
                'bg-transparent',
                'text-(--button-color)',
                'underline',
                'underline-offset-4',
                'hover:no-underline',
              ],
            },
          },
        },
      ] as const

      it.each(casesVariant)('$text', ({ input, expected }) => {
        const root = mountButton({ props: input }).get('[data-test-button-root]')

        expect({
          root: { class: root.classes() },
        }).toEqual({
          root: { class: expect.arrayContaining(expected.root.class) },
        })
      })
    })

    describe('size', () => {
      it('sin size usa el size del ButtonGroup', () => {
        const wrapper = mount(ButtonInGroup, { props: { groupSize: 'xl' } })

        expect(wrapper.get('[data-test-button-root]').classes()).toContain('h-11')
      })

      it('con size manda sobre el del ButtonGroup', () => {
        const wrapper = mount(ButtonInGroup, { props: { groupSize: 'xl', buttonSize: 'sm' } })

        expect(wrapper.get('[data-test-button-root]').classes()).toContain('h-8')
      })

      const casesSize = [
        {
          text: 'con size=xs mide h-7, con texto xs y huecos de icono size-3',
          input: { size: 'xs' },
          expected: {
            root: { class: ['h-7', 'gap-1', 'px-2.5', 'text-xs', 'has-[>[data-button-ui]]:px-2'] },
            leading: { class: ['size-3'] },
            trailing: { class: ['size-3'] },
          },
        },
        {
          text: 'con size=sm mide h-8, con texto sm y huecos de icono size-4',
          input: { size: 'sm' },
          expected: {
            root: {
              class: ['h-8', 'gap-1.5', 'px-3', 'text-sm', 'has-[>[data-button-ui]]:px-2.5'],
            },
            leading: { class: ['size-4'] },
            trailing: { class: ['size-4'] },
          },
        },
        {
          text: 'con size=md mide h-9, con texto base y huecos de icono size-5',
          input: { size: 'md' },
          expected: {
            root: { class: ['h-9', 'px-4', 'py-2', 'text-base', 'has-[>[data-button-ui]]:px-3'] },
            leading: { class: ['size-5'] },
            trailing: { class: ['size-5'] },
          },
        },
        {
          text: 'con size=lg mide h-10, con texto lg y huecos de icono size-6',
          input: { size: 'lg' },
          expected: {
            root: { class: ['h-10', 'px-6', 'text-lg', 'has-[>[data-button-ui]]:px-4'] },
            leading: { class: ['size-6'] },
            trailing: { class: ['size-6'] },
          },
        },
        {
          text: 'con size=xl mide h-11, con texto xl y huecos de icono size-7',
          input: { size: 'xl' },
          expected: {
            root: { class: ['h-11', 'px-7', 'text-xl', 'has-[>[data-button-ui]]:px-5'] },
            leading: { class: ['size-7'] },
            trailing: { class: ['size-7'] },
          },
        },
        {
          text: 'con size=icon-xs es un cuadrado size-7 sin padding y con huecos de icono size-3',
          input: { size: 'icon-xs' },
          expected: {
            root: { class: ['size-7', 'p-0'] },
            leading: { class: ['size-3'] },
            trailing: { class: ['size-3'] },
          },
        },
        {
          text: 'con size=icon-sm es un cuadrado size-8 sin padding y con huecos de icono size-4',
          input: { size: 'icon-sm' },
          expected: {
            root: { class: ['size-8', 'p-0'] },
            leading: { class: ['size-4'] },
            trailing: { class: ['size-4'] },
          },
        },
        {
          text: 'con size=icon es un cuadrado size-9 sin padding y con huecos de icono size-5',
          input: { size: 'icon' },
          expected: {
            root: { class: ['size-9', 'p-0'] },
            leading: { class: ['size-5'] },
            trailing: { class: ['size-5'] },
          },
        },
        {
          text: 'con size=icon-lg es un cuadrado size-10 sin padding y con huecos de icono size-6',
          input: { size: 'icon-lg' },
          expected: {
            root: { class: ['size-10', 'p-0'] },
            leading: { class: ['size-6'] },
            trailing: { class: ['size-6'] },
          },
        },
        {
          text: 'con size=icon-xl es un cuadrado size-11 sin padding y con huecos de icono size-7',
          input: { size: 'icon-xl' },
          expected: {
            root: { class: ['size-11', 'p-0'] },
            leading: { class: ['size-7'] },
            trailing: { class: ['size-7'] },
          },
        },
      ] as const

      it.each(casesSize)('$text', ({ input, expected }) => {
        const button = mountButton({
          props: { ...input, icon: 'check', trailingIcon: 'chevronRight' },
        })

        expect({
          root: { class: button.get('[data-test-button-root]').classes() },
          leading: { class: button.get('[data-test-button-leading]').classes() },
          trailing: { class: button.get('[data-test-button-trailing]').classes() },
        }).toEqual({
          root: { class: expect.arrayContaining(expected.root.class) },
          leading: { class: expect.arrayContaining(expected.leading.class) },
          trailing: { class: expect.arrayContaining(expected.trailing.class) },
        })
      })
    })

    describe('color', () => {
      testColor({
        id: '[data-test-button-root]',
        variable: '--button-color',
        fallbackColor: buttonDefaults.color,
        mount: (color) => mountButton({ props: { color } }),
      })

      const casesColor = [
        {
          text: 'por defecto pinta con buttonDefaults.color',
          input: {},
          expected: {
            root: {
              style: [
                `--button-color: var(--${buttonDefaults.color}, var(--${buttonDefaults.color}))`,
              ],
            },
          },
        },
      ] as const

      it.each(casesColor)('$text', ({ input, expected }) => {
        const root = mountButton({ props: input }).get('[data-test-button-root]')

        expect({
          root: {
            style: root
              .attributes('style')
              ?.split(';')
              .map((declaration) => declaration.trim()),
          },
        }).toEqual({
          root: { style: expect.arrayContaining(expected.root.style) },
        })
      })
    })

    describe('radius', () => {
      testRadius({
        id: '[data-test-button-root]',
        variable: '--button-radius',
        mount: (radius) => mountButton({ props: { radius } }),
      })

      const casesRadius = [
        {
          text: 'por defecto redondea con buttonDefaults.radius',
          input: {},
          expected: {
            root: { style: [`--button-radius: var(--radius-${buttonDefaults.radius})`] },
          },
        },
      ] as const

      it.each(casesRadius)('$text', ({ input, expected }) => {
        const root = mountButton({ props: input }).get('[data-test-button-root]')

        expect({
          root: {
            style: root
              .attributes('style')
              ?.split(';')
              .map((declaration) => declaration.trim()),
          },
        }).toEqual({
          root: { style: expect.arrayContaining(expected.root.style) },
        })
      })
    })

    describe('icon', () => {
      const casesIcon = [
        {
          text: 'con icon pinta ese icono dentro del leading',
          input: { icon: 'check' },
          expected: {
            leading: { exists: true },
            icon: { exists: true, props: { name: 'check' } },
          },
        },
        {
          text: 'sin icon no pinta el leading',
          input: {},
          expected: {
            leading: { exists: false },
            icon: { exists: false, props: undefined },
          },
        },
      ] as const

      it.each(casesIcon)('$text', ({ input, expected }) => {
        const button = mountButton({ props: input })
        const icon = button.findComponent<typeof Icon>('[data-test-button-icon]')

        expect({
          leading: { exists: button.find('[data-test-button-leading]').exists() },
          icon: {
            exists: icon.exists(),
            props: icon.exists() ? { name: icon.props('name') } : undefined,
          },
        }).toEqual(expected)
      })
    })

    describe('trailingIcon', () => {
      const casesTrailingIcon = [
        {
          text: 'con trailingIcon pinta ese icono dentro del trailing',
          input: { trailingIcon: 'chevronRight' },
          expected: {
            trailing: { exists: true },
            'trailing-icon': { exists: true, props: { name: 'chevronRight' } },
          },
        },
        {
          text: 'sin trailingIcon no pinta el trailing',
          input: {},
          expected: {
            trailing: { exists: false },
            'trailing-icon': { exists: false, props: undefined },
          },
        },
      ] as const

      it.each(casesTrailingIcon)('$text', ({ input, expected }) => {
        const button = mountButton({ props: input })
        const icon = button.findComponent<typeof Icon>('[data-test-button-trailing-icon]')

        expect({
          trailing: { exists: button.find('[data-test-button-trailing]').exists() },
          'trailing-icon': {
            exists: icon.exists(),
            props: icon.exists() ? { name: icon.props('name') } : undefined,
          },
        }).toEqual(expected)
      })
    })

    describe('disabled', () => {
      const casesDisabled = [
        {
          text: 'con disabled deshabilita el button nativo y lo atenúa',
          input: { disabled: true },
          expected: {
            root: {
              class: ['pointer-events-none', 'opacity-50'],
              attrs: { disabled: '', 'aria-disabled': undefined },
            },
          },
        },
        {
          text: 'con disabled=false no tiene disabled ni aria-disabled',
          input: { disabled: false },
          expected: {
            root: {
              class: [],
              attrs: { disabled: undefined, 'aria-disabled': undefined },
            },
          },
        },
        {
          text: 'con disabled y as=a usa aria-disabled porque un a no admite disabled',
          input: { disabled: true, as: 'a' },
          expected: {
            root: {
              class: ['pointer-events-none', 'opacity-50'],
              attrs: { disabled: undefined, 'aria-disabled': 'true' },
            },
          },
        },
      ] as const

      it.each(casesDisabled)('$text', ({ input, expected }) => {
        const root = mountButton({ props: input }).get('[data-test-button-root]')

        expect({
          root: {
            class: root.classes(),
            attrs: {
              disabled: root.attributes('disabled'),
              'aria-disabled': root.attributes('aria-disabled'),
            },
          },
        }).toEqual({
          root: {
            class: expect.arrayContaining(expected.root.class),
            attrs: expected.root.attrs,
          },
        })
      })
    })

    describe('loading', () => {
      const casesLoading = [
        {
          text: 'con loading marca el botón como ocupado, pinta el spinner en lugar del icono y mantiene el trailing',
          input: { loading: true, icon: 'check', trailingIcon: 'chevronRight' },
          expected: {
            root: { attrs: { 'aria-busy': 'true', 'aria-disabled': 'true' } },
            'loading-icon': { exists: true, props: { name: 'spinner' } },
            icon: { exists: false },
            'trailing-icon': { exists: true },
          },
        },
        {
          text: 'sin loading no marca el botón como ocupado y pinta sus iconos',
          input: { loading: false, icon: 'check', trailingIcon: 'chevronRight' },
          expected: {
            root: { attrs: { 'aria-busy': undefined, 'aria-disabled': undefined } },
            'loading-icon': { exists: false, props: undefined },
            icon: { exists: true },
            'trailing-icon': { exists: true },
          },
        },
      ] as const

      it.each(casesLoading)('$text', ({ input, expected }) => {
        const button = mountButton({ props: input })
        const root = button.get('[data-test-button-root]')
        const loadingIcon = button.findComponent<typeof Icon>('[data-test-button-loading-icon]')

        expect({
          root: {
            attrs: {
              'aria-busy': root.attributes('aria-busy'),
              'aria-disabled': root.attributes('aria-disabled'),
            },
          },
          'loading-icon': {
            exists: loadingIcon.exists(),
            props: loadingIcon.exists() ? { name: loadingIcon.props('name') } : undefined,
          },
          icon: { exists: button.find('[data-test-button-icon]').exists() },
          'trailing-icon': { exists: button.find('[data-test-button-trailing-icon]').exists() },
        }).toEqual(expected)
      })
    })

    describe('as', () => {
      const casesAs = [
        {
          text: 'por defecto pinta un button con type=button y con hover y active',
          input: { variant: 'solid' },
          expected: {
            root: {
              tag: buttonDefaults.as,
              attrs: { type: 'button' },
              stateClass: ['hover:bg-(--button-color)/90', 'active:bg-(--button-color)/80'],
            },
          },
        },
        {
          text: 'con as=a pinta un a sin type y mantiene hover y active porque es un enlace',
          input: { variant: 'solid', as: 'a' },
          expected: {
            root: {
              tag: 'a',
              attrs: { type: undefined },
              stateClass: ['hover:bg-(--button-color)/90', 'active:bg-(--button-color)/80'],
            },
          },
        },
        {
          text: 'con as=div pinta un div sin type y sin hover ni active porque no es interactivo',
          input: { variant: 'solid', as: 'div' },
          expected: {
            root: {
              tag: 'div',
              attrs: { type: undefined },
              stateClass: [],
            },
          },
        },
      ] as const

      it.each(casesAs)('$text', ({ input, expected }) => {
        const root = mountButton({ props: input }).get('[data-test-button-root]')

        expect({
          root: {
            tag: root.element.tagName.toLowerCase(),
            attrs: { type: root.attributes('type') },
            stateClass: root
              .classes()
              .filter(
                (className) => className.startsWith('hover:') || className.startsWith('active:'),
              ),
          },
        }).toEqual({
          root: expected.root,
        })
      })
    })
  })

  describe('emits', () => {
    describe('click', () => {
      it('al hacer click emite click con el evento', async () => {
        const button = mountButton()

        await button.get('[data-test-button-root]').trigger('click')

        expect(button.emitted('click')?.[0]?.[0]).toBeInstanceOf(Event)
      })

      it('con disabled no emite click', async () => {
        const button = mountButton({ props: { disabled: true, as: 'a' } })

        await button.get('[data-test-button-root]').trigger('click')

        expect(button.emitted('click')).toBeUndefined()
      })

      it('con loading no emite click', async () => {
        const button = mountButton({ props: { loading: true } })

        await button.get('[data-test-button-root]').trigger('click')

        expect(button.emitted('click')).toBeUndefined()
      })

      it('con aria-disabled=true en attrs no emite click', async () => {
        const button = mountButton({ attrs: { 'aria-disabled': 'true' } })

        await button.get('[data-test-button-root]').trigger('click')

        expect(button.emitted('click')).toBeUndefined()
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('sustituye al label', () => {
        const button = mountButton({
          props: { label: 'Guardar' },
          slots: { default: () => h('strong', 'Enviar') },
        })

        expect(button.get('[data-test-button-root]').text()).toBe('Enviar')
      })
    })

    describe('leading', () => {
      it('se pinta dentro del leading', () => {
        const button = mountButton({ slots: { leading: () => h('em', 'L') } })

        expect(button.get('[data-test-button-leading]').text()).toBe('L')
      })

      it('sustituye al icono leading', () => {
        const button = mountButton({
          props: { icon: 'check' },
          slots: { leading: () => h('em', 'L') },
        })

        expect(button.find('[data-test-button-icon]').exists()).toBe(false)
      })

      it('con loading no se pinta', () => {
        const button = mountButton({
          props: { loading: true },
          slots: { leading: () => h('em', 'L') },
        })

        expect(button.get('[data-test-button-leading]').text()).not.toContain('L')
      })
    })

    describe('loading', () => {
      it('se pinta dentro del leading', () => {
        const button = mountButton({
          props: { loading: true },
          slots: { loading: () => h('em', 'Cargando') },
        })

        expect(button.get('[data-test-button-leading]').text()).toBe('Cargando')
      })

      it('sustituye al spinner', () => {
        const button = mountButton({
          props: { loading: true },
          slots: { loading: () => h('em', 'Cargando') },
        })

        expect(button.find('[data-test-button-loading-icon]').exists()).toBe(false)
      })

      it('sin loading no se pinta', () => {
        const button = mountButton({ slots: { loading: () => h('em', 'Cargando') } })

        expect(button.text()).not.toContain('Cargando')
      })
    })

    describe('trailing', () => {
      it('se pinta dentro del trailing', () => {
        const button = mountButton({ slots: { trailing: () => h('em', 'T') } })

        expect(button.get('[data-test-button-trailing]').text()).toBe('T')
      })

      it('sustituye al icono trailing', () => {
        const button = mountButton({
          props: { trailingIcon: 'check' },
          slots: { trailing: () => h('em', 'T') },
        })

        expect(button.find('[data-test-button-trailing-icon]').exists()).toBe(false)
      })
    })
  })

  describe('nodos', () => {
    describe('root', () => {
      const casesRoot = [
        {
          text: 'coloca el contenido en fila, centrado y separado con gap-2',
          input: {},
          expected: {
            class: ['inline-flex', 'shrink-0', 'items-center', 'justify-center', 'gap-2'],
            attrs: {},
            reka: {},
          },
        },
        {
          text: 'tiene un borde transparente y el radio de --button-radius',
          input: {},
          expected: {
            class: ['border', 'border-transparent', 'rounded-(--button-radius)'],
            attrs: {},
            reka: {},
          },
        },
        {
          text: 'no parte el texto, lo pone en negrita media y anima los cambios de color',
          input: {},
          expected: {
            class: ['whitespace-nowrap', 'font-medium', 'transition-colors'],
            attrs: {},
            reka: {},
          },
        },
        {
          text: 'con el foco de teclado muestra un anillo de --button-color en lugar del outline',
          input: {},
          expected: {
            class: [
              'outline-none',
              'focus-visible:border-(--button-color)',
              'focus-visible:ring-[3px]',
              'focus-visible:ring-(--button-color)/30',
            ],
            attrs: {},
            reka: {},
          },
        },
        {
          text: 'tiene data-button-ui=root',
          input: {},
          expected: {
            class: [],
            attrs: { 'data-button-ui': 'root' },
            reka: {},
          },
        },
        {
          text: 'se pinta como su propio elemento en lugar de pasar sus props al hijo',
          input: {},
          expected: {
            class: [],
            attrs: {},
            reka: { asChild: false },
          },
        },
      ] as const

      it.each(casesRoot)('$text', ({ input, expected }) => {
        const button = mountButton({ props: input })
        const root = button.get('[data-test-button-root]')

        expect({
          class: root.classes(),
          attrs: root.attributes(),
          reka: button.getComponent(Primitive).props(),
        }).toEqual({
          class: expect.arrayContaining(expected.class),
          attrs: expect.objectContaining(expected.attrs),
          reka: expect.objectContaining(expected.reka),
        })
      })

      testAttrs({
        id: '[data-test-button-root]',
        ownClass: 'h-9',
        conflictingClass: 'h-12',
        // data-button-ui lo usan los estilos para saber si hay leading o trailing
        notOverridable: ['data-button-ui'],
        // type="sustituido" no es válido y el navegador lo convierte en submit
        values: { type: 'reset' },
        mount: (attrs) => mountButton({ attrs }),
      })
    })

    describe('leading', () => {
      const casesLeading = [
        {
          text: 'centra su contenido sin encogerse',
          input: { icon: 'check' },
          expected: {
            class: ['inline-flex', 'shrink-0', 'items-center', 'justify-center'],
            attrs: {},
          },
        },
        {
          text: 'tiene data-button-ui=leading para que root ajuste su padding',
          input: { icon: 'check' },
          expected: {
            class: [],
            attrs: { 'data-button-ui': 'leading' },
          },
        },
      ] as const

      it.each(casesLeading)('$text', ({ input, expected }) => {
        const leading = mountButton({ props: input }).get('[data-test-button-leading]')

        expect({ class: leading.classes(), attrs: leading.attributes() }).toEqual({
          class: expect.arrayContaining(expected.class),
          attrs: expect.objectContaining(expected.attrs),
        })
      })
    })

    describe('trailing', () => {
      const casesTrailing = [
        {
          text: 'centra su contenido sin encogerse',
          input: { trailingIcon: 'chevronRight' },
          expected: {
            class: ['inline-flex', 'shrink-0', 'items-center', 'justify-center'],
            attrs: {},
          },
        },
        {
          text: 'tiene data-button-ui=trailing para que root ajuste su padding',
          input: { trailingIcon: 'chevronRight' },
          expected: {
            class: [],
            attrs: { 'data-button-ui': 'trailing' },
          },
        },
      ] as const

      it.each(casesTrailing)('$text', ({ input, expected }) => {
        const trailing = mountButton({ props: input }).get('[data-test-button-trailing]')

        expect({ class: trailing.classes(), attrs: trailing.attributes() }).toEqual({
          class: expect.arrayContaining(expected.class),
          attrs: expect.objectContaining(expected.attrs),
        })
      })
    })

    describe('icon', () => {
      const casesIconNode = [
        {
          text: 'ocupa todo el hueco del leading',
          input: { icon: 'check' },
          expected: {
            class: ['size-full'],
          },
        },
      ] as const

      it.each(casesIconNode)('$text', ({ input, expected }) => {
        const icon = mountButton({ props: input }).get('[data-test-button-icon]')

        expect({ class: icon.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })

    describe('trailing-icon', () => {
      const casesTrailingIconNode = [
        {
          text: 'ocupa todo el hueco del trailing',
          input: { trailingIcon: 'chevronRight' },
          expected: {
            class: ['size-full'],
          },
        },
      ] as const

      it.each(casesTrailingIconNode)('$text', ({ input, expected }) => {
        const trailingIcon = mountButton({ props: input }).get('[data-test-button-trailing-icon]')

        expect({ class: trailingIcon.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })

    describe('loading-icon', () => {
      const casesLoadingIcon = [
        {
          text: 'ocupa todo el hueco del leading y gira sin parar',
          input: { loading: true },
          expected: {
            class: ['size-full', 'animate-spin'],
          },
        },
      ] as const

      it.each(casesLoadingIcon)('$text', ({ input, expected }) => {
        const loadingIcon = mountButton({ props: input }).get('[data-test-button-loading-icon]')

        expect({ class: loadingIcon.classes() }).toEqual({
          class: expect.arrayContaining(expected.class),
        })
      })
    })
  })
})
