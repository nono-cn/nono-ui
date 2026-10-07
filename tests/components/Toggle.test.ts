import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Toggle as RekaToggle } from 'reka-ui'
import { h } from 'vue'

import {
  Toggle,
  createToggleContext,
  type ToggleContext,
  type ToggleProps,
  type ToggleSize,
  type ToggleValue,
  type ToggleVariant,
} from '@/components/ui/Toggle'
import { themeColors } from '@/components/ui/constants'
import type { IconName } from '@/components/ui/Icon'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountToggle(options: MountingOptions<ToggleProps> = {}) {
  return mount(Toggle, options)
}

const casesModelValue = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{ input: ToggleProps['modelValue']; expected: ToggleValue }>

const casesUpdateModelValue = [
  { input: undefined, expected: true },
  { input: false, expected: true },
  { input: true, expected: false },
] satisfies Array<{ input: ToggleProps['modelValue']; expected: ToggleValue }>

const casesSize = [
  { input: undefined, expected: { root: ['h-9', 'px-4', 'py-2', 'text-base'], icon: 'md' } },
  { input: 'xs', expected: { root: ['h-7', 'gap-1', 'px-2.5', 'text-xs'], icon: 'xs' } },
  { input: 'sm', expected: { root: ['h-8', 'gap-1.5', 'px-3', 'text-sm'], icon: 'sm' } },
  { input: 'md', expected: { root: ['h-9', 'px-4', 'py-2', 'text-base'], icon: 'md' } },
  { input: 'lg', expected: { root: ['h-10', 'px-6', 'text-lg'], icon: 'lg' } },
  { input: 'xl', expected: { root: ['h-11', 'px-8', 'text-xl'], icon: 'xl' } },
  { input: 'icon-xs', expected: { root: ['size-7', 'p-0'], icon: 'xs' } },
  { input: 'icon-sm', expected: { root: ['size-8', 'p-0'], icon: 'sm' } },
  { input: 'icon', expected: { root: ['size-9', 'p-0'], icon: 'md' } },
  { input: 'icon-lg', expected: { root: ['size-10', 'p-0'], icon: 'lg' } },
  { input: 'icon-xl', expected: { root: ['size-11', 'p-0'], icon: 'xl' } },
  {
    input: 'invalid' as ToggleSize,
    expected: { root: ['h-9', 'px-4', 'py-2', 'text-base'], icon: 'md' },
  },
] satisfies Array<{
  input: ToggleSize | undefined
  expected: { root: string[]; icon: string }
}>

const casesName = [
  { input: undefined, expected: undefined },
  { input: 'format', expected: 'format' },
] satisfies Array<{ input: ToggleProps['name']; expected: string | undefined }>

const outlineClasses = [
  'border-(--toggle-color)/40',
  'bg-transparent',
  'text-(--toggle-color)',
  'hover:bg-(--toggle-color)/10',
  'data-[state=on]:border-(--toggle-color)/60',
  'data-[state=on]:bg-(--toggle-color)/20',
]

const plainClasses = [
  'bg-transparent',
  'text-(--toggle-color)',
  'hover:bg-(--toggle-color)/10',
  'data-[state=on]:bg-(--toggle-color)/20',
]

const casesVariant = [
  { input: undefined, expected: { present: outlineClasses, absent: [] } },
  { input: 'outline', expected: { present: outlineClasses, absent: [] } },
  {
    input: 'plain',
    expected: {
      present: plainClasses,
      absent: ['border-(--toggle-color)/40', 'data-[state=on]:border-(--toggle-color)/60'],
    },
  },
  { input: 'invalid' as ToggleVariant, expected: { present: outlineClasses, absent: [] } },
] satisfies Array<{
  input: ToggleVariant | undefined
  expected: { present: string[]; absent: string[] }
}>

const casesDisabled = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{ input: ToggleProps['disabled']; expected: boolean }>

const casesIconName = [
  { input: undefined, expected: undefined },
  { input: 'star', expected: 'star' },
  { input: 'plus', expected: 'plus' },
] satisfies Array<{ input: IconName | undefined; expected: IconName | undefined }>

const casesTrailingIconName = [
  { input: undefined, expected: undefined },
  { input: 'check', expected: 'check' },
  { input: 'minus', expected: 'minus' },
] satisfies Array<{ input: IconName | undefined; expected: IconName | undefined }>

const casesToggleContext = [
  { input: undefined, expected: { pressed: false } },
  { input: false, expected: { pressed: false } },
  { input: true, expected: { pressed: true } },
] satisfies Array<{ input: ToggleValue | undefined; expected: ToggleContext }>

const casesAs = [undefined, 'a'] as const
const casesAsChild = [undefined, false, true] as const

describe('Toggle', () => {
  describe('props', () => {
    describe('as', () => {
      it.each(casesAs)('fija as=button aunque se pase %s', (input) => {
        const toggle = mountToggle({ attrs: { as: input } })

        expect(toggle.getComponent(RekaToggle).props('as')).toBe('button')
      })
    })

    describe('asChild', () => {
      it.each(casesAsChild)('fija asChild=false aunque se pase %s', (input) => {
        const toggle = mountToggle({ attrs: { asChild: input } })

        expect(toggle.getComponent(RekaToggle).props('asChild')).toBe(false)
      })
    })

    describe('modelValue', () => {
      it.each(casesModelValue)('pasa modelValue=$input a Reka Toggle', ({ input, expected }) => {
        const toggle = mountToggle({ props: { modelValue: input } })

        expect(toggle.getComponent(RekaToggle).props('modelValue')).toBe(expected)
      })
    })

    describe('name', () => {
      it.each(casesName)('pasa name=$input a Reka Toggle', ({ input, expected }) => {
        const toggle = mountToggle({ props: { name: input } })

        expect(toggle.getComponent(RekaToggle).props('name')).toBe(expected)
      })
    })

    describe('size', () => {
      it.each(casesSize)('aplica size=$input a la raíz', ({ input, expected }) => {
        const toggle = mountToggle({ props: { size: input, icon: 'star' } })

        expect(toggle.get('[data-test-toggle-root]').classes()).toEqual(
          expect.arrayContaining(expected.root),
        )
      })
    })

    describe('variant', () => {
      it.each(casesVariant)('aplica variant=$input a la raíz', ({ input, expected }) => {
        const classes = mountToggle({ props: { variant: input } })
          .get('[data-test-toggle-root]')
          .classes()

        expect(classes).toEqual(expect.arrayContaining(expected.present))
        for (const className of expected.absent) expect(classes).not.toContain(className)
      })
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color',
        id: '[data-test-toggle-root]',
        varColor: '--toggle-color',
        defaultColor: 'var(--neutral, var(--neutral))',
        fallbackColor: 'neutral',
        theme: {
          colors: themeColors,
          foregroundVar: '--toggle-color-foreground',
          solidVar: '--toggle-solid',
          solidForegroundVar: '--toggle-solid-foreground',
        },
        mount: (color) => mountToggle({ props: { color } }),
      })
    })

    describe('disabled', () => {
      it.each(casesDisabled)('pasa disabled=$input a Reka Toggle', ({ input, expected }) => {
        const toggle = mountToggle({ props: { disabled: input } })

        expect(toggle.getComponent(RekaToggle).props('disabled')).toBe(expected)
      })
    })

    describe('icon', () => {
      describe('name', () => {
        it.each(casesIconName)('pasa icon=$input a Icon.name', ({ input, expected }) => {
          const icon = mountToggle({ props: { icon: input } }).findComponent(
            '[data-test-toggle-icon]',
          )

          expect(icon.exists()).toBe(expected !== undefined)
          if (expected !== undefined) expect(icon.props('name')).toBe(expected)
        })
      })

      describe('size', () => {
        it.each(casesSize)('pasa size=$input a Icon.size', ({ input, expected }) => {
          const icon = mountToggle({ props: { icon: 'star', size: input } }).getComponent(
            '[data-test-toggle-icon]',
          )

          expect(icon.props('size')).toBe(expected.icon)
        })
      })
    })

    describe('trailingIcon', () => {
      describe('name', () => {
        it.each(casesTrailingIconName)(
          'pasa trailingIcon=$input a Icon.name',
          ({ input, expected }) => {
            const icon = mountToggle({ props: { trailingIcon: input } }).findComponent(
              '[data-test-toggle-trailing-icon]',
            )

            expect(icon.exists()).toBe(expected !== undefined)
            if (expected !== undefined) expect(icon.props('name')).toBe(expected)
          },
        )
      })

      describe('size', () => {
        it.each(casesSize)('pasa size=$input a Icon.size', ({ input, expected }) => {
          const icon = mountToggle({ props: { trailingIcon: 'check', size: input } }).getComponent(
            '[data-test-toggle-trailing-icon]',
          )

          expect(icon.props('size')).toBe(expected.icon)
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-toggle-root]',
      mount: (attrs) => mountToggle({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it.each(casesUpdateModelValue)(
        'reemite $expected cuando Reka cambia modelValue=$input',
        ({ input, expected }) => {
          const toggle = mountToggle({ props: { modelValue: input } })

          toggle.getComponent(RekaToggle).vm.$emit('update:modelValue', expected)

          expect(toggle.emitted('update:modelValue')).toEqual([[expected]])
        },
      )
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('no renderiza el contenedor sin label ni slot', () => {
        expect(mountToggle().find('[data-test-toggle-slot-default]').exists()).toBe(false)
      })

      it('renderiza el contenedor con label', () => {
        expect(
          mountToggle({ props: { label: 'Etiqueta' } })
            .get('[data-test-toggle-slot-default]')
            .text(),
        ).toBe('Etiqueta')
      })

      it('renderiza el contenedor con el slot sin label', () => {
        const toggle = mountToggle({ slots: { default: () => h('span', 'Contenido') } })

        expect(toggle.get('[data-test-toggle-slot-default]').text()).toBe('Contenido')
      })

      it('renderiza el slot y sustituye label', () => {
        const toggle = mountToggle({
          props: { label: 'Label alternativo' },
          slots: { default: () => h('span', 'Contenido') },
        })

        expect(toggle.get('[data-test-toggle-slot-default]').text()).toBe('Contenido')
        expect(toggle.get('[data-test-toggle-slot-default]').text()).not.toContain('Label alternativo')
      })
    })

    describe('leading', () => {
      it('no renderiza el contenedor sin icon ni slot', () => {
        expect(mountToggle().find('[data-test-toggle-slot-leading]').exists()).toBe(false)
      })

      it('renderiza el contenedor con icon', () => {
        expect(
          mountToggle({ props: { icon: 'star' } })
            .get('[data-test-toggle-slot-leading]')
            .find('[data-test-toggle-icon]')
            .exists(),
        ).toBe(true)
      })

      it('renderiza el contenedor con el slot sin icon', () => {
        const toggle = mountToggle({ slots: { leading: () => h('span', 'Inicio') } })

        expect(toggle.get('[data-test-toggle-slot-leading]').text()).toBe('Inicio')
      })

      it('renderiza el slot y sustituye icon', () => {
        const toggle = mountToggle({
          props: { icon: 'star' },
          slots: { leading: () => h('span', 'Inicio') },
        })

        expect(toggle.get('[data-test-toggle-slot-leading]').text()).toBe('Inicio')
        expect(toggle.find('[data-test-toggle-icon]').exists()).toBe(false)
      })
    })

    describe('trailing', () => {
      it('no renderiza el contenedor sin trailingIcon ni slot', () => {
        expect(mountToggle().find('[data-test-toggle-slot-trailing]').exists()).toBe(false)
      })

      it('renderiza el contenedor con trailingIcon', () => {
        expect(
          mountToggle({ props: { trailingIcon: 'check' } })
            .get('[data-test-toggle-slot-trailing]')
            .find('[data-test-toggle-trailing-icon]')
            .exists(),
        ).toBe(true)
      })

      it('renderiza el contenedor con el slot sin trailingIcon', () => {
        const toggle = mountToggle({ slots: { trailing: () => h('span', 'Final') } })

        expect(toggle.get('[data-test-toggle-slot-trailing]').text()).toBe('Final')
      })

      it('renderiza el slot y sustituye trailingIcon', () => {
        const toggle = mountToggle({
          props: { trailingIcon: 'check' },
          slots: { trailing: () => h('span', 'Final') },
        })

        expect(toggle.get('[data-test-toggle-slot-trailing]').text()).toBe('Final')
        expect(toggle.find('[data-test-toggle-trailing-icon]').exists()).toBe(false)
      })
    })
  })

  describe('context', () => {
    describe('toggleContext', () => {
      it.each(casesToggleContext)(
        'crea el contrato con modelValue=$input',
        ({ input, expected }) => {
          expect(createToggleContext(input)).toEqual(expected)
        },
      )
    })
  })

  describe('variantsCss', () => {
    describe('toggleVariants', () => {
      it('aplica las clases base a la raíz', () => {
        const root = mountToggle().get('[data-test-toggle-root]')

        expect(root.classes()).toEqual(
          expect.arrayContaining([
            'inline-flex',
            'shrink-0',
            'items-center',
            'justify-center',
            'rounded-md',
            'focus-visible:border-(--toggle-color)',
          ]),
        )
      })
    })
  })
})
