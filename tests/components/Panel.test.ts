import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Panel, type PanelContext, type PanelProps } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'
import { testIconConfig } from '../utils/testIconConfig'

function mountPanel(options: MountingOptions<PanelProps> = {}) {
  return mount(Panel, options)
}

const casesOpen = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesLabel = [
  { input: 'Resumen', expected: 'Resumen' },
  { input: '', expected: undefined },
  { input: undefined, expected: undefined },
]

const casesVariant = [
  { input: undefined, expected: { class: 'border-(--panel-border)', button: 'solid' } },
  { input: 'solid' as const, expected: { class: 'border-(--panel-border)', button: 'solid' } },
  {
    input: 'outline' as const,
    expected: { class: 'border-(--panel-border)/40', button: 'outline' },
  },
  {
    input: 'plain' as const,
    expected: { class: 'border-(--panel-border)/20', button: 'plain' },
  },
  {
    input: 'subtle' as const,
    expected: { class: 'border-(--panel-border)/20', button: 'subtle' },
  },
  { input: 'soft' as const, expected: { class: 'border-(--panel-border)/20', button: 'soft' } },
]

const casesSeverity = [
  { input: undefined, expected: { class: '[--panel-border:var(--primary)]', button: 'primary' } },
  {
    input: 'primary' as const,
    expected: { class: '[--panel-border:var(--primary)]', button: 'primary' },
  },
  {
    input: 'secondary' as const,
    expected: { class: '[--panel-border:var(--secondary-foreground)]', button: 'secondary' },
  },
  {
    input: 'success' as const,
    expected: { class: '[--panel-border:var(--success)]', button: 'success' },
  },
  {
    input: 'error' as const,
    expected: { class: '[--panel-border:var(--error)]', button: 'error' },
  },
  {
    input: 'warning' as const,
    expected: { class: '[--panel-border:var(--warning)]', button: 'warning' },
  },
]

const casesCollapsible = [
  { input: undefined, expected: { as: 'button', arrows: true } },
  { input: true, expected: { as: 'button', arrows: true } },
  { input: false, expected: { as: 'span', arrows: false } },
]

const casesContext = [
  { input: false, expected: { open: false } },
  { input: true, expected: { open: true } },
]
const casesEmittedValues = [
  { input: true, initial: false },
  { input: false, initial: true },
]

describe('Panel', () => {
  describe('props', () => {
    describe('open', () => {
      it.each(casesOpen)('renderiza open=$input como $expected', ({ input, expected }) => {
        const panel = mountPanel({ props: { open: input }, slots: { default: 'Contenido' } })

        expect(panel.get('[data-test-panel-trigger]').classes()).toContain('w-full')
        if (expected) {
          expect(panel.get('[data-test-panel-trigger]').classes()).toContain('rounded-br-none')
        } else {
          expect(panel.get('[data-test-panel-trigger]').classes()).not.toContain('rounded-br-none')
        }
      })
    })

    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input como "$expected"', ({ input, expected }) => {
        const panel = mountPanel({ props: { label: input } })
        const label = panel.find('[data-test-panel-label]')

        expect(label.exists()).toBe(expected !== undefined)
        if (expected !== undefined) expect(label.text()).toBe(expected)
      })
    })

    describe('variant', () => {
      it.each(casesVariant)('renderiza variant=$input', ({ input, expected }) => {
        const panel = mountPanel({
          props: { variant: input },
          slots: { default: 'Contenido' },
        })
        const content = panel.get('[data-test-panel-content]')

        expect(content.classes()).toContain(expected.class)
        expect(panel.getComponent(Button).props('variant')).toBe(expected.button)
      })
    })

    describe('severity', () => {
      it.each(casesSeverity)('renderiza severity=$input', ({ input, expected }) => {
        const panel = mountPanel({
          props: { severity: input },
          slots: { default: 'Contenido' },
        })
        const content = panel.get('[data-test-panel-content]')

        expect(content.classes()).toContain(expected.class)
        expect(panel.getComponent(Button).props('severity')).toBe(expected.button)
      })
    })

    describe('color', () => {
      testColor({
        text: 'renderiza color',
        id: '[data-test-panel-root]',
        varColor: '--panel-color',
        mount: (color) => mountPanel({ props: { color } }),
      })
    })

    describe('icon', () => {
      testIconConfig({
        text: 'pasa las props de icon',
        id: '[data-test-panel-icon]',
        mount: (input) => mountPanel({ props: { icon: input } }),
      })
    })

    describe('collapsible', () => {
      it.each(casesCollapsible)('renderiza collapsible=$input', ({ input, expected }) => {
        const panel = mountPanel({
          props: { collapsible: input },
          slots: { default: 'Contenido' },
        })
        const trigger = panel.getComponent(Button)

        expect(trigger.props('as')).toBe(expected.as)
        expect(panel.find('[data-test-panel-arrows]').exists()).toBe(expected.arrows)
      })

      it('mantiene el contenido expandido y no permite cerrarlo cuando es false', async () => {
        const panel = mountPanel({
          props: { collapsible: false },
          slots: { default: 'Contenido' },
        })
        const content = panel.get('[data-test-panel-content]')

        expect(content.isVisible()).toBe(true)

        await panel.get('[data-test-panel-trigger]').trigger('click')

        expect(content.isVisible()).toBe(true)
      })
    })

    describe('ui', () => {
      describe('trigger', () => {
        testAttrs({
          text: 'resuelve props.ui.trigger en el trigger',
          id: '[data-test-panel-trigger]',
          mount: (attrs) => mountPanel({ props: { ui: { trigger: () => attrs } } }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'resuelve props.ui.label en label',
          id: '[data-test-panel-label]',
          mount: (attrs) => mountPanel({ props: { label: 'Label', ui: { label: () => attrs } } }),
        })
      })

      describe('arrows', () => {
        testAttrs({
          text: 'resuelve props.ui.arrows en arrows',
          id: '[data-test-panel-arrows]',
          mount: (attrs) => mountPanel({ props: { ui: { arrows: () => attrs } } }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'resuelve props.ui.content en content',
          id: '[data-test-panel-content]',
          mount: (attrs) =>
            mountPanel({ props: { ui: { content: () => attrs } }, slots: { default: 'Content' } }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-panel-root]',
      mount: (attrs) => mountPanel({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:open', () => {
      it.each(casesEmittedValues)(
        'emite open=$input al cambiar desde $initial con el trigger',
        async ({ input, initial }) => {
          const panel = mountPanel({
            props: { open: initial },
            slots: { default: 'Contenido' },
          })

          await panel.get('[data-test-panel-trigger]').trigger('click')

          expect(panel.emitted('update:open')).toEqual([[input]])
        },
      )

      it('no emite cuando collapsible es false', async () => {
        const panel = mountPanel({
          props: { collapsible: false },
          slots: { default: 'Contenido' },
        })

        await panel.get('[data-test-panel-trigger]').trigger('click')

        expect(panel.emitted('update:open')).toBeUndefined()
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot por defecto dentro del content', () => {
        const panel = mountPanel({ slots: { default: () => h('span', 'Contenido') } })

        expect(panel.get('[data-test-panel-content]').text()).toBe('Contenido')
      })

      it('no renderiza content sin slot', () => {
        expect(mountPanel().find('[data-test-panel-content]').exists()).toBe(false)
      })
    })

    describe('label', () => {
      it('renderiza el slot de label y oculta el fallback', () => {
        const panel = mountPanel({
          props: { label: 'Label predeterminado' },
          slots: { label: () => h('span', { 'data-test-panel-slot': 'label' }, 'Label del slot') },
        })

        expect(panel.get('[data-test-panel-slot="label"]').text()).toBe('Label del slot')
        expect(panel.text()).not.toContain('Label predeterminado')
      })
    })

    describe('icon', () => {
      it('renderiza el slot de icon y oculta el icono predeterminado', () => {
        const panel = mountPanel({
          props: { icon: { name: 'info' } },
          slots: { icon: () => h('span', { 'data-test-panel-slot': 'icon' }, 'Icono del slot') },
        })

        expect(panel.get('[data-test-panel-slot="icon"]').text()).toBe('Icono del slot')
        expect(panel.find('[data-test-panel-icon]').exists()).toBe(false)
      })
    })

    describe('arrows', () => {
      it('renderiza el slot de arrows y oculta el icono predeterminado', () => {
        const panel = mountPanel({
          slots: { arrows: () => h('span', { 'data-test-panel-slot': 'arrows' }, 'Flecha') },
        })

        expect(panel.get('[data-test-panel-slot="arrows"]').text()).toBe('Flecha')
        expect(panel.find('[data-test-panel-arrow-icon]').exists()).toBe(false)
      })

      it('no renderiza arrows cuando collapsible es false', () => {
        expect(
          mountPanel({ props: { collapsible: false } })
            .find('[data-test-panel-arrows]')
            .exists(),
        ).toBe(false)
      })
    })
  })

  describe('context contract', () => {
    describe('PanelContext', () => {
      it.each(casesContext)('expone solo open=$input', ({ input, expected }) => {
        let context: PanelContext | undefined

        mountPanel({
          props: { open: input, label: 'Label', icon: { name: 'info' } },
          slots: {
            default: (value: PanelContext) => {
              context = value
              return h('span')
            },
            label: (value: PanelContext) => {
              context = value
              return h('span')
            },
            icon: (value: PanelContext) => {
              context = value
              return h('span')
            },
            arrows: (value: PanelContext) => {
              context = value
              return h('span')
            },
          },
        })

        expect(context).toEqual(expected)
      })
    })
  })
})
