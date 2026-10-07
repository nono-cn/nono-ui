import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Field } from '@/components/ui/Field'
import { Icon, type IconName } from '@/components/ui/Icon'
import {
  Input,
  inputDefaults,
  type InputProps,
  type InputSize,
  type InputVariant,
} from '@/components/ui/Input'
import { themeColors } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountInput(options: MountingOptions<InputProps> = {}) {
  return mount(Input, options)
}

function findIconByTestId(wrapper: ReturnType<typeof mountInput>, testId: string) {
  return wrapper
    .findAllComponents(Icon)
    .find((icon) => icon.attributes(testId) !== undefined)
}

const casesValue = [
  { input: 'Término de búsqueda', expected: 'Término de búsqueda' },
  { input: '', expected: '' },
  { input: undefined, expected: '' },
  { input: 42, expected: '42' },
]

const casesIconLeading = ['search', 'user', 'check'] satisfies IconName[]

const casesIconLoading = ['spinner', 'search', 'check'] satisfies IconName[]

const casesIconTrailing = ['search', 'x', 'check'] satisfies IconName[]

const casesIconLeadingSize = [
  { input: undefined, expected: 'md' },
  { input: 'no-existe' as const, expected: 'md' },
  { input: 'xl', expected: 'xl' },
]

const casesIconLoadingSize = [
  { input: undefined, expected: 'md' },
  { input: 'no-existe' as const, expected: 'md' },
  { input: 'xl', expected: 'xl' },
]

const casesIconTrailingSize = [
  { input: undefined, expected: 'md' },
  { input: 'no-existe' as const, expected: 'md' },
  { input: 'xl', expected: 'xl' },
]

const casesSize = [
  { input: undefined, expected: ['h-9', 'text-base'] },
  { input: 'xs' as const, expected: ['h-7', 'text-sm'] },
  { input: 'sm' as const, expected: ['h-8', 'text-sm'] },
  { input: 'md' as const, expected: ['h-9', 'text-base'] },
  { input: 'lg' as const, expected: ['h-10', 'text-lg'] },
  { input: 'xl' as const, expected: ['h-11', 'text-xl'] },
  { input: 'no-existe' as const, expected: ['h-9', 'text-base'] },
]

const casesVariant = [
  {
    input: undefined,
    expected: ['rounded-md', 'border', 'border-input', 'bg-transparent', 'shadow-xs'],
  },
  {
    input: 'outline' as const,
    expected: ['rounded-md', 'border', 'border-input', 'bg-transparent', 'shadow-xs'],
  },
  {
    input: 'plain' as const,
    expected: ['rounded-md', 'border-input', 'bg-transparent', 'shadow-none'],
  },
  {
    input: 'subtle' as const,
    expected: ['rounded-md', 'border', 'border-input', 'bg-muted', 'shadow-xs'],
  },
  {
    input: 'soft' as const,
    expected: ['rounded-md', 'border-input', 'bg-muted/50', 'shadow-none'],
  },
  {
    input: 'none' as const,
    expected: ['rounded-md', 'border-0', 'bg-transparent', 'shadow-none'],
  },
]

const casesHighlight = [
  { input: undefined, expected: 'border-input' },
  { input: false, expected: 'border-input' },
  { input: true, expected: 'border-(--input-color)/40' },
]

const casesLoading = [
  { input: undefined, expected: false, expectedAriaBusy: undefined },
  { input: false, expected: false, expectedAriaBusy: undefined },
  { input: true, expected: true, expectedAriaBusy: 'true' },
]

describe('Input', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesValue)('renderiza modelValue=$input como "$expected"', ({ input, expected }) => {
        const root = mountInput({ props: { modelValue: input } }).get('[data-test-input-root]')

        expect(root.element.value).toBe(expected)
      })
    })

    describe('size', () => {
      it.each(casesSize)('renderiza size=$input como "$expected"', ({ input, expected }) => {
        const root = mountInput({ props: { size: input as InputSize } }).get(
          '[data-test-input-group-root]',
        )

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('icon', () => {
      it('no renderiza el icono leading si no se pasa la prop', () => {
        const wrapper = mountInput()
        expect(wrapper.find('[data-test-input-leading-icon]').exists()).toBe(false)
      })

      describe('name', () => {
        it.each(casesIconLeading)('pasa name=%s a Icon.name', (iconName) => {
          const wrapper = mountInput({ props: { icon: iconName } })
          const icon = findIconByTestId(wrapper, 'data-test-input-leading-icon')

          expect(icon).toBeDefined()
          expect(icon?.props('name')).toBe(iconName)
        })
      })

      describe('size', () => {
        it.each(casesIconLeadingSize)(
          'pasa size=$input como "$expected" a Icon.size',
          ({ input, expected }) => {
            const icon = mountInput({ props: { icon: 'search', size: input } }).getComponent(Icon)

            expect(icon.props('size')).toBe(expected)
          },
        )

      })
    })

    describe('loading', () => {
      it.each(casesLoading)('renderiza loading=$input', ({ input, expected, expectedAriaBusy }) => {
        const wrapper = mountInput({ props: { loading: input } })
        const inputElement = wrapper.get('[data-test-input-root]')
        const loadingIcon = findIconByTestId(wrapper, 'data-test-input-loading-icon')

        expect(inputElement.attributes('aria-busy')).toBe(expectedAriaBusy)
        expect(loadingIcon !== undefined).toBe(expected)
        expect(inputElement.classes().includes('pl-0')).toBe(expected)
      })

      it('loading prevalece sobre aria-busy pasado como atributo', () => {
        const wrapper = mountInput({ props: { loading: true }, attrs: { 'aria-busy': 'false' } })

        expect(wrapper.get('[data-test-input-root]').attributes('aria-busy')).toBe('true')
      })

      it('conserva aria-busy pasado como atributo cuando loading es false', () => {
        const wrapper = mountInput({ attrs: { 'aria-busy': 'false' } })

        expect(wrapper.get('[data-test-input-root]').attributes('aria-busy')).toBe('false')
      })
    })

    describe('loadingIcon', () => {
      describe('name', () => {
           it.each(casesIconLoading)('pasa %s a Icon.name como icono de carga', (iconName) => {
              const wrapper = mountInput({ props: { loading: true, loadingIcon: iconName } })
              const icon = findIconByTestId(wrapper, 'data-test-input-loading-icon')

              expect(icon?.props('name')).toBe(iconName)
              expect(icon?.classes()).toContain('animate-spin')
          })
      
           it('usa spinner por defecto', () => {
            const wrapper = mountInput({ props: { loading: true } })
            const icon = findIconByTestId(wrapper, 'data-test-input-loading-icon')

            expect(icon?.props('name')).toBe('spinner')
          })
      })

      describe('size', () => {
        it.each(casesIconLoadingSize)(
          'pasa size=$input como "$expected" a Icon.size',
          ({ input, expected }) => {
            const wrapper = mountInput({ props: { loading: true, size: input } })
            const icon = findIconByTestId(wrapper, 'data-test-input-loading-icon')

            expect(icon?.props('size')).toBe(expected)
          },
        )
      })
   

      it('loadingIcon prevalece sobre icon cuando loading está activo', () => {
        const wrapper = mountInput({ props: { loading: true, icon: 'search' } })
        const loadingIcon = findIconByTestId(wrapper, 'data-test-input-loading-icon')
        const leadingIcon = findIconByTestId(wrapper, 'data-test-input-leading-icon')

        expect(loadingIcon).toBeDefined()
        expect(leadingIcon).toBeUndefined()
      })

    })

    describe('trailingIcon', () => {
      it('no renderiza el icono trailing si no se pasa la prop', () => {
        const wrapper = mountInput()

        expect(wrapper.find('[data-test-input-trailing-icon]').exists()).toBe(false)
      })

      describe('name', () => {
        it.each(casesIconTrailing)('pasa name=%s a Icon.name', (iconName) => {
          const wrapper = mountInput({ props: { trailingIcon: iconName } })
          const icon = findIconByTestId(wrapper, 'data-test-input-trailing-icon')

          expect(icon).toBeDefined()
          expect(icon?.props('name')).toBe(iconName)
        })
      })

      describe('size', () => {
        it.each(casesIconTrailingSize)(
          'pasa size=$input como "$expected" a Icon.size',
          ({ input, expected }) => {
            const wrapper = mountInput({ props: { trailingIcon: 'search', size: input } })
            const icon = findIconByTestId(wrapper, 'data-test-input-trailing-icon')

            expect(icon?.props('size')).toBe(expected)
          },
        )
      })
    })

    describe('variant', () => {
      it.each(casesVariant)('renderiza variant=$input', ({ input, expected }) => {
        const root = mountInput({ props: { variant: input as InputVariant } }).get(
          '[data-test-input-group-root]',
        )

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })

    })

    describe('color', () => {
      testColor({
        text: 'renderiza color',
        id: '[data-test-input-group-root]',
        varColor: '--input-color',
        mount: (color) => mountInput({ props: { color } }),
        defaultColor: `var(--${inputDefaults.color}, var(--${inputDefaults.color}))`,
        fallbackColor: inputDefaults.color,
        theme: {
          colors: themeColors,
          foregroundVar: '--input-color-foreground',
          solidVar: '--input-solid',
          solidForegroundVar: '--input-solid-foreground',
        },
      })

      it('mantiene el valor con el color de texto normal', () => {
        const input = mountInput({ props: { variant: 'soft', color: '#ff0000' } }).get(
          '[data-test-input-root]',
        )

        expect(input.classes()).toContain('text-foreground')
      })
    })

    describe('highlight', () => {
      it.each(casesHighlight)('renderiza highlight=$input', ({ input, expected }) => {
        const root = mountInput({ props: { highlight: input } }).get('[data-test-input-group-root]')

        expect(root.classes()).toContain(expected)
      })
    })

    describe('ui', () => {
      testAttrs({
        text: 'renderiza los atributos de ui.root en el contenedor',
        id: '[data-test-input-group-root]',
        mount: (attrs) => mountInput({ props: { ui: { root: () => attrs } } }),
      })

      testAttrs({
        text: 'renderiza los atributos de ui.leading en el addon inicial',
        id: '[data-test-input-group-addon]:not([data-align="inline-end"])',
        mount: (attrs) =>
          mountInput({
            props: { ui: { leading: () => attrs } },
            slots: { leading: 'Initial content' },
          }),
      })

      testAttrs({
        text: 'renderiza los atributos de ui.trailing en el addon final',
        id: '[data-test-input-group-addon][data-align="inline-end"]',
        mount: (attrs) =>
          mountInput({
            props: { ui: { trailing: () => attrs } },
            slots: { trailing: 'Trailing content' },
          }),
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo solo al input',
      id: '[data-test-input-root]',
      mount: (attrs) => mountInput({ attrs }),
    })

    it('no aplica attrs del input al contenedor', () => {
      const wrapper = mountInput({
        attrs: {
          id: 'input-control',
          class: 'custom-input',
          style: 'opacity: 0.5',
        },
      })
      const root = wrapper.get('[data-test-input-group-root]')
      const input = wrapper.get('[data-test-input-root]')

      expect(input.classes()).toContain('custom-input')
      expect(input.attributes('style')).toContain('opacity: 0.5')
      expect(root.attributes('id')).toBeUndefined()
      expect(root.classes()).not.toContain('custom-input')
      expect(root.attributes('style')).not.toContain('opacity: 0.5')
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it('emite el valor actualizado cuando el usuario edita el campo', async () => {
        const wrapper = mountInput({ props: { modelValue: '' } })

        await wrapper.get('[data-test-input-root]').setValue('Valor actualizado')

        expect(wrapper.emitted('update:modelValue')).toEqual([['Valor actualizado']])
      })

      it('emite un número cuando el input es de tipo number', async () => {
        const wrapper = mountInput({ attrs: { type: 'number' } })

        await wrapper.get('[data-test-input-root]').setValue('42')

        expect(wrapper.emitted('update:modelValue')).toEqual([[42]])
      })

      it('actualiza el valor visible cuando modelValue cambia externamente', async () => {
        const wrapper = mountInput({ props: { modelValue: 'Inicial' } })

        await wrapper.setProps({ modelValue: 'Externo' })

        expect(wrapper.get('[data-test-input-root]').element.value).toBe('Externo')
      })
    })
  })

  describe('slots', () => {
    describe('leading', () => {
      it('renderiza el slot leading dentro del addon predeterminado', () => {
        const wrapper = mountInput({
          slots: {
            leading: () => h('span', { 'data-test-input-leading': '' }, 'Contenido inicial'),
          },
        })

        expect(wrapper.get('[data-test-input-leading]').text()).toBe('Contenido inicial')
        expect(wrapper.findAll('[data-test-input-group-addon]')).toHaveLength(1)
      })

      it('el slot personalizado sustituye el icono de la prop', () => {
        const wrapper = mountInput({
          props: { icon: 'search' },
          slots: {
            leading: () => h('span', { 'data-test-input-leading': '' }, 'Custom leading'),
          },
        })

        expect(wrapper.get('[data-test-input-leading]').text()).toBe('Custom leading')
        expect(wrapper.findComponent(Icon).exists()).toBe(false)
      })
    })

    describe('loading', () => {
      it('el slot sustituye el icono de carga e ignora icon y leading', () => {
        const wrapper = mountInput({
          props: { loading: true, icon: 'search' },
          slots: {
            leading: () => h('span', { 'data-test-input-leading': '' }, 'Leading'),
            loading: () => h('span', { 'data-test-input-custom-loading': '' }, 'Loading'),
          },
        })

        expect(wrapper.get('[data-test-input-custom-loading]').text()).toBe('Loading')
        expect(wrapper.find('[data-test-input-leading]').exists()).toBe(false)
        expect(wrapper.findComponent(Icon).exists()).toBe(false)
      })

      it('no renderiza el slot de carga cuando loading está desactivado', () => {
        const wrapper = mountInput({
          slots: {
            loading: () => h('span', { 'data-test-input-custom-loading': '' }, 'Loading'),
          },
        })

        expect(wrapper.find('[data-test-input-custom-loading]').exists()).toBe(false)
        expect(wrapper.find('[data-test-input-group-addon]').exists()).toBe(false)
      })
    })

    describe('trailing', () => {
      it('renderiza el slot trailing dentro del addon final', () => {
        const wrapper = mountInput({
          slots: {
            trailing: () => h('span', { 'data-test-input-trailing': '' }, 'Contenido final'),
          },
        })

        expect(wrapper.get('[data-test-input-trailing]').text()).toBe('Contenido final')
        expect(wrapper.findAll('[data-test-input-group-addon]')).toHaveLength(1)
      })

      it('el slot personalizado sustituye el trailingIcon de la prop', () => {
        const wrapper = mountInput({
          props: { trailingIcon: 'check' },
          slots: {
            trailing: () => h('span', { 'data-test-input-trailing': '' }, 'Custom trailing'),
          },
        })

        expect(wrapper.get('[data-test-input-trailing]').text()).toBe('Custom trailing')
        expect(wrapper.findComponent(Icon).exists()).toBe(false)
      })
    })
  })

  describe('field', () => {
    it('usa los IDs del label y la descripción', () => {
      const field = mount(Field, {
        props: { label: 'Email', description: 'Texto de ayuda' },
        slots: { default: () => h(Input) },
      })
      const input = field.get('[data-test-input-root]')

      expect(input.attributes('id')).toBe(field.get('[data-test-field-label]').attributes('for'))
      expect(input.attributes('aria-describedby')).toBe(
        field.get('[data-test-field-description]').attributes('id'),
      )
    })

    it('no añade aria-describedby si Field no tiene descripción', () => {
      const field = mount(Field, {
        props: { label: 'Email' },
        slots: { default: () => h(Input) },
      })
      const input = field.get('[data-test-input-root]')

      expect(input.attributes('id')).toBe(field.get('[data-test-field-label]').attributes('for'))
      expect(input.attributes('aria-describedby')).toBeUndefined()
    })

    it('conserva aria-describedby del Input y añade el ID de la descripción', () => {
      const field = mount(Field, {
        props: { description: 'Texto de ayuda' },
        slots: { default: () => h(Input, { 'aria-describedby': 'ayuda-externa' }) },
      })
      const descriptionId = field.get('[data-test-field-description]').attributes('id')

      expect(field.get('[data-test-input-root]').attributes('aria-describedby')).toBe(
        `ayuda-externa ${descriptionId}`,
      )
    })

    it('conserva id y aria-describedby fuera de Field', () => {
      const input = mountInput({
        attrs: { id: 'email', 'aria-describedby': 'ayuda-externa' },
      }).get('[data-test-input-root]')

      expect(input.attributes('id')).toBe('email')
      expect(input.attributes('aria-describedby')).toBe('ayuda-externa')
    })
  })
})
