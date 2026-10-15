import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { StepperItem, StepperRoot } from 'reka-ui'
import { h, nextTick } from 'vue'

import {
  Stepper,
  type StepperContext,
  type StepperItemContext,
  type StepperProps,
  type StepperStep,
} from '@/components/ui/Stepper'
import { themeColors } from '@/components/ui/constants'
import { Icon } from '@/components/ui/Icon'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

const steps: StepperStep[] = [
  { value: 1, label: 'Account', description: 'Create your account' },
  { value: 2, label: 'Profile', description: 'Complete your profile' },
  { value: 3, label: 'Confirm', description: 'Review and confirm' },
]

const slotSteps: StepperStep[] = [
  { value: 1, slot: 'account', label: 'Account', description: 'Create your account' },
  { value: 2, slot: 'profile', label: 'Profile', description: 'Complete your profile' },
]

const casesModelValue = [
  { input: undefined, expected: { value: 1, states: ['active', 'inactive', 'inactive'] } },
  { input: 1, expected: { value: 1, states: ['active', 'inactive', 'inactive'] } },
  { input: 2, expected: { value: 2, states: ['completed', 'active', 'inactive'] } },
  { input: 3, expected: { value: 3, states: ['completed', 'completed', 'active'] } },
] satisfies Array<{
  input: StepperProps['modelValue']
  expected: { value: number; states: string[] }
}>

const casesOrientation = [
  {
    input: undefined,
    expected: { rekaValue: 'horizontal', list: ['items-start'], item: ['flex-col', 'flex-1'] },
  },
  {
    input: 'horizontal',
    expected: { rekaValue: 'horizontal', list: ['items-start'], item: ['flex-col', 'flex-1'] },
  },
  {
    input: 'vertical',
    expected: { rekaValue: 'vertical', list: ['flex-col'], item: ['w-full', 'items-start'] },
  },
] satisfies Array<{
  input: StepperProps['orientation']
  expected: { rekaValue: string; list: string[]; item: string[] }
}>

const casesLinear = [
  { input: undefined, expected: true },
  { input: true, expected: true },
  { input: false, expected: false },
] satisfies Array<{ input: StepperProps['linear']; expected: boolean }>

const casesSize = [
  {
    input: undefined,
    expected: {
      root: '[--stepper-indicator-size:2.5rem]',
      list: '[--stepper-list-gap:0.5rem]',
      indicator: 'text-base',
      label: 'text-base',
      description: 'text-sm',
      icon: 'md',
    },
  },
  {
    input: 'xs',
    expected: {
      root: '[--stepper-indicator-size:1.5rem]',
      list: '[--stepper-list-gap:0.25rem]',
      indicator: 'text-xs',
      label: 'text-xs',
      description: 'text-xs',
      icon: 'xs',
    },
  },
  {
    input: 'sm',
    expected: {
      root: '[--stepper-indicator-size:2rem]',
      list: '[--stepper-list-gap:0.375rem]',
      indicator: 'text-sm',
      label: 'text-sm',
      description: 'text-xs',
      icon: 'sm',
    },
  },
  {
    input: 'md',
    expected: {
      root: '[--stepper-indicator-size:2.5rem]',
      list: '[--stepper-list-gap:0.5rem]',
      indicator: 'text-base',
      label: 'text-base',
      description: 'text-sm',
      icon: 'md',
    },
  },
  {
    input: 'lg',
    expected: {
      root: '[--stepper-indicator-size:3rem]',
      list: '[--stepper-list-gap:0.625rem]',
      indicator: 'text-xl',
      label: 'text-lg',
      description: 'text-sm',
      icon: 'lg',
    },
  },
  {
    input: 'xl',
    expected: {
      root: '[--stepper-indicator-size:3.5rem]',
      list: '[--stepper-list-gap:0.75rem]',
      indicator: 'text-2xl',
      label: 'text-xl',
      description: 'text-base',
      icon: 'xl',
    },
  },
] satisfies Array<{
  input: StepperProps['size']
  expected: {
    root: string
    list: string
    indicator: string
    label: string
    description: string
    icon: string
  }
}>

const casesDisabled = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{ input: StepperProps['disabled']; expected: boolean }>

const casesCustomColor = [
  {
    input: 'primary',
    expected: {
      indicator: 'group-data-[state=active]:bg-(--stepper-color)',
      separator: 'group-data-[state=completed]:bg-(--stepper-color)',
    },
  },
  {
    input: '',
    expected: { indicator: 'group-focus-visible/stepper-trigger:ring-primary/50', separator: '' },
  },
] satisfies Array<{
  input: StepperProps['color']
  expected: { indicator: string; separator: string }
}>

const casesStepLabel = [
  { input: undefined, expected: false },
  { input: '', expected: false },
  { input: 'Account', expected: true },
] satisfies Array<{ input: StepperStep['label']; expected: boolean }>

const casesStepDescription = [
  { input: undefined, expected: false },
  { input: '', expected: false },
  { input: 'Create your account', expected: true },
] satisfies Array<{ input: StepperStep['description']; expected: boolean }>

const casesStepIcon = [
  { input: undefined, expected: undefined },
  { input: 'star', expected: 'star' },
  { input: 'heart', expected: 'heart' },
] satisfies Array<{ input: StepperStep['icon']; expected: StepperStep['icon'] }>

const casesStepDisabled = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{ input: StepperStep['disabled']; expected: boolean }>

const casesStepSlot = [
  { input: undefined, expected: '1' },
  { input: 'account', expected: 'account' },
  { input: 7, expected: '7' },
] satisfies Array<{ input: StepperStep['slot']; expected: string }>

const casesTriggerNavigation = [
  { name: 'el paso siguiente en modo lineal', input: { target: 2 }, expected: [[2]] },
  { name: 'un paso no adyacente en modo lineal', input: { target: 3 }, expected: undefined },
  {
    name: 'un paso no adyacente en modo libre',
    input: { target: 3, linear: false },
    expected: [[3]],
  },
  {
    name: 'un paso deshabilitado',
    input: { target: 2, steps: [steps[0]!, { ...steps[1]!, disabled: true }, steps[2]!] },
    expected: undefined,
  },
  {
    name: 'con el stepper deshabilitado',
    input: { target: 2, disabled: true },
    expected: undefined,
  },
] satisfies Array<{
  name: string
  input: Partial<StepperProps> & { target: number }
  expected: Array<[number]> | undefined
}>

const casesStepperContext = [
  {
    name: 'primer paso',
    input: { modelValue: 1 },
    expected: {
      modelValue: 1,
      totalSteps: 3,
      isNextDisabled: false,
      isPrevDisabled: true,
      isFirstStep: true,
      isLastStep: false,
    },
  },
  {
    name: 'paso intermedio',
    input: { modelValue: 2 },
    expected: {
      modelValue: 2,
      totalSteps: 3,
      isNextDisabled: false,
      isPrevDisabled: false,
      isFirstStep: false,
      isLastStep: false,
    },
  },
  {
    name: 'último paso',
    input: { modelValue: 3 },
    expected: {
      modelValue: 3,
      totalSteps: 3,
      isNextDisabled: true,
      isPrevDisabled: false,
      isFirstStep: false,
      isLastStep: true,
    },
  },
  {
    name: 'sin modelValue',
    input: { modelValue: undefined },
    expected: {
      modelValue: 1,
      totalSteps: 3,
      isNextDisabled: false,
      isPrevDisabled: true,
      isFirstStep: true,
      isLastStep: false,
    },
  },
  {
    name: 'modelValue inexistente',
    input: { modelValue: 99 },
    expected: {
      modelValue: 99,
      totalSteps: 3,
      isNextDisabled: true,
      isPrevDisabled: true,
      isFirstStep: false,
      isLastStep: false,
    },
  },
  {
    name: 'vecinos deshabilitados',
    input: {
      modelValue: 2,
      steps: [{ ...steps[0]!, disabled: true }, steps[1]!, { ...steps[2]!, disabled: true }],
    },
    expected: {
      modelValue: 2,
      totalSteps: 3,
      isNextDisabled: true,
      isPrevDisabled: true,
      isFirstStep: false,
      isLastStep: false,
    },
  },
  {
    name: 'stepper deshabilitado',
    input: { modelValue: 2, disabled: true },
    expected: {
      modelValue: 2,
      totalSteps: 3,
      isNextDisabled: true,
      isPrevDisabled: true,
      isFirstStep: false,
      isLastStep: false,
    },
  },
  {
    name: 'sin pasos',
    input: { modelValue: 1, steps: [] },
    expected: {
      modelValue: 1,
      totalSteps: 0,
      isNextDisabled: true,
      isPrevDisabled: true,
      isFirstStep: false,
      isLastStep: false,
    },
  },
] satisfies Array<{
  name: string
  input: Partial<StepperProps>
  expected: Omit<StepperContext, 'goToStep' | 'nextStep' | 'prevStep' | 'hasNext' | 'hasPrev'>
}>

const casesStepperItemContext = [
  {
    name: 'primer paso activo',
    input: { modelValue: 1 },
    expected: [
      { item: steps[0]!, index: 0, completed: false, active: true, first: true, last: false },
      { item: steps[1]!, index: 1, completed: false, active: false, first: false, last: false },
      { item: steps[2]!, index: 2, completed: false, active: false, first: false, last: true },
    ],
  },
  {
    name: 'paso intermedio activo',
    input: { modelValue: 2 },
    expected: [
      { item: steps[0]!, index: 0, completed: true, active: false, first: true, last: false },
      { item: steps[1]!, index: 1, completed: false, active: true, first: false, last: false },
      { item: steps[2]!, index: 2, completed: false, active: false, first: false, last: true },
    ],
  },
  {
    name: 'último paso activo',
    input: { modelValue: 3 },
    expected: [
      { item: steps[0]!, index: 0, completed: true, active: false, first: true, last: false },
      { item: steps[1]!, index: 1, completed: true, active: false, first: false, last: false },
      { item: steps[2]!, index: 2, completed: false, active: true, first: false, last: true },
    ],
  },
  {
    name: 'un único paso',
    input: { modelValue: 1, steps: [steps[0]!] },
    expected: [
      { item: steps[0]!, index: 0, completed: false, active: true, first: true, last: true },
    ],
  },
] satisfies Array<{
  name: string
  input: Partial<StepperProps>
  expected: Array<
    Pick<StepperItemContext, 'item' | 'index' | 'completed' | 'active' | 'first' | 'last'>
  >
}>

const casesNavigation = [
  {
    name: 'nextStep avanza un paso',
    input: { modelValue: 1 },
    action: 'nextStep',
    expected: [[2]],
  },
  {
    name: 'nextStep no avanza desde el último paso',
    input: { modelValue: 3 },
    action: 'nextStep',
    expected: undefined,
  },
  {
    name: 'nextStep no avanza a un paso deshabilitado',
    input: { modelValue: 1, steps: [steps[0]!, { ...steps[1]!, disabled: true }, steps[2]!] },
    action: 'nextStep',
    expected: undefined,
  },
  {
    name: 'prevStep retrocede un paso',
    input: { modelValue: 2 },
    action: 'prevStep',
    expected: [[1]],
  },
  {
    name: 'prevStep no retrocede desde el primer paso',
    input: { modelValue: 1 },
    action: 'prevStep',
    expected: undefined,
  },
  {
    name: 'prevStep no retrocede a un paso deshabilitado',
    input: { modelValue: 2, steps: [{ ...steps[0]!, disabled: true }, steps[1]!, steps[2]!] },
    action: 'prevStep',
    expected: undefined,
  },
  {
    name: 'nextStep no avanza con el stepper deshabilitado',
    input: { modelValue: 1, disabled: true },
    action: 'nextStep',
    expected: undefined,
  },
  {
    name: 'prevStep no retrocede con el stepper deshabilitado',
    input: { modelValue: 2, disabled: true },
    action: 'prevStep',
    expected: undefined,
  },
] satisfies Array<{
  name: string
  input: Partial<StepperProps>
  action: 'nextStep' | 'prevStep'
  expected: Array<[number]> | undefined
}>

const casesGoToStep = [
  { name: 'un paso anterior', input: { modelValue: 3 }, target: 1, expected: [[1]] },
  { name: 'el paso siguiente', input: { modelValue: 1 }, target: 2, expected: [[2]] },
  {
    name: 'un paso no adyacente en modo lineal',
    input: { modelValue: 1 },
    target: 3,
    expected: undefined,
  },
  {
    name: 'un paso no adyacente en modo libre',
    input: { modelValue: 1, linear: false },
    target: 3,
    expected: [[3]],
  },
  {
    name: 'un paso inexistente',
    input: { modelValue: 1, linear: false },
    target: 99,
    expected: undefined,
  },
  {
    name: 'un paso deshabilitado',
    input: { modelValue: 1, steps: [steps[0]!, { ...steps[1]!, disabled: true }, steps[2]!] },
    target: 2,
    expected: undefined,
  },
  {
    name: 'cualquier paso con el stepper deshabilitado',
    input: { modelValue: 1, disabled: true },
    target: 2,
    expected: undefined,
  },
] satisfies Array<{
  name: string
  input: Partial<StepperProps>
  target: number
  expected: Array<[number]> | undefined
}>

const casesHasNavigation = [
  { name: 'primer paso', input: { modelValue: 1 }, expected: { hasNext: true, hasPrev: false } },
  { name: 'paso intermedio', input: { modelValue: 2 }, expected: { hasNext: true, hasPrev: true } },
  { name: 'último paso', input: { modelValue: 3 }, expected: { hasNext: false, hasPrev: true } },
  {
    name: 'vecinos deshabilitados',
    input: {
      modelValue: 2,
      steps: [{ ...steps[0]!, disabled: true }, steps[1]!, { ...steps[2]!, disabled: true }],
    },
    expected: { hasNext: false, hasPrev: false },
  },
  {
    name: 'stepper deshabilitado',
    input: { modelValue: 2, disabled: true },
    expected: { hasNext: false, hasPrev: false },
  },
] satisfies Array<{
  name: string
  input: Partial<StepperProps>
  expected: { hasNext: boolean; hasPrev: boolean }
}>

function mountStepper(options: MountingOptions<StepperProps> = {}) {
  return mount(Stepper, { ...options, props: { steps, ...options.props } })
}

function captureContext(props: Partial<StepperProps> = {}) {
  let context: StepperContext | undefined
  const wrapper = mountStepper({
    props: {
      ...props,
      ui: {
        list: (value) => {
          context = value
          return {}
        },
      },
    },
  })

  return { wrapper, getContext: () => context! }
}

describe('Stepper', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesModelValue)(
        'pasa modelValue=$input a Reka y marca el estado de cada paso',
        ({ input, expected }) => {
          const wrapper = mountStepper({ props: { modelValue: input } })

          expect(wrapper.getComponent(StepperRoot).props('modelValue')).toBe(expected.value)
          expect(
            wrapper
              .findAll('[data-test-stepper-item]')
              .map((item) => item.attributes('data-state')),
          ).toEqual(expected.states)
        },
      )

      it('actualiza el estado de los pasos cuando cambia la prop', async () => {
        const wrapper = mountStepper({ props: { modelValue: 1 } })

        await wrapper.setProps({ modelValue: 3 })

        expect(
          wrapper.findAll('[data-test-stepper-item]').map((item) => item.attributes('data-state')),
        ).toEqual(['completed', 'completed', 'active'])
      })
    })

    describe('orientation', () => {
      it.each(casesOrientation)('aplica orientation=$input', ({ input, expected }) => {
        const wrapper = mountStepper({ props: { orientation: input } })

        expect(wrapper.getComponent(StepperRoot).props('orientation')).toBe(expected.rekaValue)
        expect(wrapper.get('[data-test-stepper-list]').classes()).toEqual(
          expect.arrayContaining(expected.list),
        )
        expect(wrapper.get('[data-test-stepper-item]').classes()).toEqual(
          expect.arrayContaining(expected.item),
        )
      })
    })

    describe('linear', () => {
      it.each(casesLinear)('pasa linear=$input a Reka StepperRoot', ({ input, expected }) => {
        const wrapper = mountStepper({ props: { linear: input } })

        expect(wrapper.getComponent(StepperRoot).props('linear')).toBe(expected)
        expect(wrapper.get('[data-test-stepper-root]').attributes('data-linear')).toBe(
          expected ? '' : undefined,
        )
      })
    })

    describe('size', () => {
      it.each(casesSize)('aplica las clases de size=$input', ({ input, expected }) => {
        const wrapper = mountStepper({
          props: { size: input, steps: [{ ...steps[0]!, icon: 'star' }, steps[1]!] },
        })

        expect(wrapper.get('[data-test-stepper-root]').classes()).toContain(expected.root)
        expect(wrapper.get('[data-test-stepper-list]').classes()).toContain(expected.list)
        expect(wrapper.get('[data-test-stepper-indicator]').classes()).toContain(expected.indicator)
        expect(wrapper.get('[data-test-stepper-title]').classes()).toContain(expected.label)
        expect(wrapper.get('[data-test-stepper-description]').classes()).toContain(
          expected.description,
        )
        expect(wrapper.getComponent(Icon).props('size')).toBe(expected.icon)
      })
    })

    describe('disabled', () => {
      it.each(casesDisabled)(
        'deshabilita todos los pasos con disabled=$input',
        ({ input, expected }) => {
          const wrapper = mountStepper({ props: { disabled: input, linear: false } })

          for (const item of wrapper.findAllComponents(StepperItem)) {
            expect(item.props('disabled')).toBe(expected)
          }
          for (const item of wrapper.findAll('[data-test-stepper-item]')) {
            expect(item.attributes('data-disabled')).toBe(expected ? '' : undefined)
          }
        },
      )
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color',
        id: '[data-test-stepper-root]',
        varColor: '--stepper-color',
        defaultColor: 'var(--primary, var(--primary))',
        theme: {
          colors: themeColors,
          foregroundVar: '--stepper-color-foreground',
          solidVar: '--stepper-solid',
          solidForegroundVar: '--stepper-solid-foreground',
        },
        mount: (color) => mountStepper({ props: { color } }),
      })

      it.each(casesCustomColor)(
        'aplica las clases de color con color=$input',
        ({ input, expected }) => {
          const wrapper = mountStepper({ props: { color: input } })
          const separator = wrapper.get('[data-test-stepper-separator]').classes()

          expect(wrapper.get('[data-test-stepper-indicator]').classes()).toContain(
            expected.indicator,
          )
          if (expected.separator) expect(separator).toContain(expected.separator)
          else expect(separator).not.toContain('group-data-[state=completed]:bg-(--stepper-color)')
        },
      )
    })

    describe('steps', () => {
      it('renderiza un item por paso y un separador entre pasos', () => {
        const wrapper = mountStepper()

        expect(wrapper.findAll('[data-test-stepper-item]')).toHaveLength(steps.length)
        expect(wrapper.findAll('[data-test-stepper-separator]')).toHaveLength(steps.length - 1)
      })

      it('no renderiza items sin pasos', () => {
        const wrapper = mountStepper({ props: { steps: [] } })

        expect(wrapper.find('[data-test-stepper-item]').exists()).toBe(false)
      })

      describe('value', () => {
        it('pasa value a StepperItem y lo muestra en el indicador', () => {
          const wrapper = mountStepper()

          expect(wrapper.findAllComponents(StepperItem).map((item) => item.props('step'))).toEqual([
            1, 2, 3,
          ])
          expect(
            wrapper.findAll('[data-test-stepper-indicator]').map((indicator) => indicator.text()),
          ).toEqual(['1', '2', '3'])
        })
      })

      describe('label', () => {
        it.each(casesStepLabel)('renderiza label=$input', ({ input, expected }) => {
          const wrapper = mountStepper({ props: { steps: [{ value: 1, label: input }] } })
          const title = wrapper.find('[data-test-stepper-title]')

          expect(title.exists()).toBe(expected)
          if (expected) expect(title.text()).toBe(input)
        })
      })

      describe('description', () => {
        it.each(casesStepDescription)('renderiza description=$input', ({ input, expected }) => {
          const wrapper = mountStepper({ props: { steps: [{ value: 1, description: input }] } })
          const description = wrapper.find('[data-test-stepper-description]')

          expect(description.exists()).toBe(expected)
          if (expected) expect(description.text()).toBe(input)
        })
      })

      it('no renderiza el wrapper sin label ni description', () => {
        const wrapper = mountStepper({ props: { steps: [{ value: 1 }] } })

        expect(wrapper.find('[data-test-stepper-wrapper]').exists()).toBe(false)
      })

      describe('icon', () => {
        it.each(casesStepIcon)('renderiza icon=$input', ({ input, expected }) => {
          const wrapper = mountStepper({ props: { steps: [{ value: 1, icon: input }] } })
          const icon = wrapper.findComponent(Icon)
          const indicator = wrapper.get('[data-test-stepper-indicator]')

          expect(icon.exists()).toBe(expected !== undefined)
          if (expected) {
            expect(icon.props('name')).toBe(expected)
            expect(indicator.text()).toBe('')
          } else {
            expect(indicator.text()).toBe('1')
          }
        })
      })

      describe('disabled', () => {
        it.each(casesStepDisabled)(
          'pasa disabled=$input solo al StepperItem indicado',
          ({ input, expected }) => {
            const wrapper = mountStepper({
              props: { linear: false, steps: [steps[0]!, { ...steps[1]!, disabled: input }] },
            })

            expect(
              wrapper.findAllComponents(StepperItem).map((item) => item.props('disabled')),
            ).toEqual([false, expected])
          },
        )
      })

      describe('slot', () => {
        it.each(casesStepSlot)(
          'usa slot=$input como identificador de los nodos',
          ({ input, expected }) => {
            const wrapper = mountStepper({
              props: { steps: [{ value: 1, slot: input, label: 'Account', icon: 'star' }] },
            })

            for (const node of ['item', 'trigger', 'indicator', 'wrapper', 'title', 'icon']) {
              expect(
                wrapper.get(`[data-test-stepper-${node}]`).attributes(`data-test-stepper-${node}`),
              ).toBe(expected)
            }
          },
        )
      })
    })

    describe('ui', () => {
      for (const [key, id] of [
        ['list', '[data-test-stepper-list]'],
        ['item', '[data-test-stepper-item]'],
        ['trigger', '[data-test-stepper-trigger]'],
        ['indicator', '[data-test-stepper-indicator]'],
        ['wrapper', '[data-test-stepper-wrapper]'],
        ['label', '[data-test-stepper-title]'],
        ['description', '[data-test-stepper-description]'],
        ['separator', '[data-test-stepper-separator]'],
        ['content', '[data-test-stepper-content]'],
      ] as const) {
        describe(key, () => {
          testAttrs({
            text: `pasa attrs, class y style a ui.${key}`,
            id,
            assertId: key !== 'label' && key !== 'description',
            mount: (attrs) =>
              mountStepper({
                props: { ui: { [key]: () => attrs } },
                slots: { content: () => h('p', 'Content') },
              }),
          })
        })
      }
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-stepper-root]',
      mount: (attrs) => mountStepper({ attrs }),
    })

    it('asigna data-slot a cada parte', () => {
      const wrapper = mountStepper({
        props: { steps: [{ ...steps[0]!, icon: 'star' }, steps[1]!] },
        slots: { content: () => h('p', 'Content') },
      })

      for (const slot of [
        'stepper',
        'stepper-list',
        'stepper-item',
        'stepper-trigger',
        'stepper-indicator',
        'stepper-icon',
        'stepper-wrapper',
        'stepper-title',
        'stepper-description',
        'stepper-separator',
        'stepper-content',
      ]) {
        expect(wrapper.find(`[data-slot="${slot}"]`).exists()).toBe(true)
      }
    })

    it('mantiene role=group en la raíz', () => {
      expect(mountStepper().get('[data-test-stepper-root]').attributes('role')).toBe('group')
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it('reemite update:modelValue desde Reka StepperRoot', async () => {
        const wrapper = mountStepper({ props: { modelValue: 1 } })

        wrapper.getComponent(StepperRoot).vm.$emit('update:modelValue', 2)
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
      })

      it.each(casesTriggerNavigation)(
        'al pulsar el trigger, navega a $name',
        async ({ input, expected }) => {
          const { target, ...props } = input
          const wrapper = mountStepper({ props: { modelValue: 1, ...props } })

          await wrapper.get(`[data-test-stepper-trigger="${target}"]`).trigger('mousedown')

          expect(wrapper.emitted('update:modelValue')).toEqual(expected)
        },
      )

      it('funciona sin v-model y actualiza el estado interno', async () => {
        const wrapper = mountStepper()

        await wrapper.get('[data-test-stepper-trigger="2"]').trigger('mousedown')

        expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
        expect(wrapper.get('[data-test-stepper-item="2"]').attributes('data-state')).toBe('active')
      })
    })
  })

  describe('slots', () => {
    describe('indicator', () => {
      it('sustituye el contenido de todos los indicadores', () => {
        const wrapper = mountStepper({
          props: { steps: [{ ...steps[0]!, icon: 'star' }, steps[1]!] },
          slots: { indicator: () => h('span', '★') },
        })

        expect(
          wrapper.findAll('[data-test-stepper-indicator]').map((indicator) => indicator.text()),
        ).toEqual(['★', '★'])
        expect(wrapper.findComponent(Icon).exists()).toBe(false)
      })
    })

    describe('label', () => {
      it('sustituye todas las etiquetas', () => {
        const wrapper = mountStepper({ slots: { label: () => h('span', 'Custom label') } })

        expect(wrapper.findAll('[data-test-stepper-title]').map((title) => title.text())).toEqual([
          'Custom label',
          'Custom label',
          'Custom label',
        ])
      })

      it('renderiza la etiqueta aunque el paso no tenga label', () => {
        const wrapper = mountStepper({
          props: { steps: [{ value: 1 }] },
          slots: { label: () => h('span', 'Custom label') },
        })

        expect(wrapper.get('[data-test-stepper-wrapper]').text()).toBe('Custom label')
      })
    })

    describe('description', () => {
      it('sustituye todas las descripciones', () => {
        const wrapper = mountStepper({
          slots: { description: () => h('span', 'Custom description') },
        })

        expect(
          wrapper.findAll('[data-test-stepper-description]').map((node) => node.text()),
        ).toEqual(['Custom description', 'Custom description', 'Custom description'])
      })

      it('renderiza la descripción aunque el paso no tenga description', () => {
        const wrapper = mountStepper({
          props: { steps: [{ value: 1 }] },
          slots: { description: () => h('span', 'Custom description') },
        })

        expect(wrapper.get('[data-test-stepper-description]').text()).toBe('Custom description')
      })
    })

    describe('content', () => {
      it('muestra solo el contenido del paso activo', async () => {
        const wrapper = mountStepper({
          props: { modelValue: 1 },
          slots: { content: ({ item }: StepperItemContext) => h('p', `Content ${item.value}`) },
        })

        expect(wrapper.findAll('[data-test-stepper-content]')).toHaveLength(1)
        expect(wrapper.get('[data-test-stepper-content]').text()).toBe('Content 1')

        await wrapper.setProps({ modelValue: 2 })

        expect(wrapper.get('[data-test-stepper-content]').text()).toBe('Content 2')
      })

      it('no renderiza el contenedor sin slot de contenido', () => {
        expect(mountStepper().find('[data-test-stepper-content]').exists()).toBe(false)
      })
    })

    describe('indicator-[slot]', () => {
      it('sustituye solo el indicador indicado', () => {
        const wrapper = mountStepper({
          props: { steps: slotSteps },
          slots: { 'indicator-account': () => h('span', '★') },
        })

        expect(
          wrapper.findAll('[data-test-stepper-indicator]').map((indicator) => indicator.text()),
        ).toEqual(['★', '2'])
      })

      it('usa value como nombre del slot si el paso no define slot', () => {
        const wrapper = mountStepper({ slots: { 'indicator-2': () => h('span', '★') } })

        expect(
          wrapper.findAll('[data-test-stepper-indicator]').map((indicator) => indicator.text()),
        ).toEqual(['1', '★', '3'])
      })

      it('tiene prioridad sobre el slot genérico', () => {
        const wrapper = mountStepper({
          props: { steps: slotSteps },
          slots: {
            indicator: () => h('span', 'generic'),
            'indicator-account': () => h('span', 'specific'),
          },
        })

        expect(
          wrapper.findAll('[data-test-stepper-indicator]').map((indicator) => indicator.text()),
        ).toEqual(['specific', 'generic'])
      })
    })

    describe('label-[slot]', () => {
      it('sustituye solo la etiqueta indicada', () => {
        const wrapper = mountStepper({
          props: { steps: slotSteps },
          slots: { 'label-account': () => h('span', 'Custom account') },
        })

        expect(wrapper.findAll('[data-test-stepper-title]').map((title) => title.text())).toEqual([
          'Custom account',
          'Profile',
        ])
      })
    })

    describe('description-[slot]', () => {
      it('sustituye solo la descripción indicada', () => {
        const wrapper = mountStepper({
          props: { steps: slotSteps },
          slots: { 'description-account': () => h('span', 'Custom account') },
        })

        expect(
          wrapper.findAll('[data-test-stepper-description]').map((node) => node.text()),
        ).toEqual(['Custom account', 'Complete your profile'])
      })
    })

    describe('content-[slot]', () => {
      it('muestra el contenido solo cuando el paso indicado está activo', async () => {
        const wrapper = mountStepper({
          props: { steps: slotSteps, modelValue: 1 },
          slots: { 'content-profile': () => h('p', 'Profile content') },
        })

        expect(wrapper.find('[data-test-stepper-content]').exists()).toBe(false)

        await wrapper.setProps({ modelValue: 2 })

        expect(wrapper.get('[data-test-stepper-content="profile"]').text()).toBe('Profile content')
      })
    })
  })

  describe('context', () => {
    describe('StepperContext', () => {
      it.each(casesStepperContext)('expone el contrato para $name', ({ input, expected }) => {
        const { getContext } = captureContext(input)

        expect(getContext()).toEqual({
          ...expected,
          goToStep: expect.any(Function),
          nextStep: expect.any(Function),
          prevStep: expect.any(Function),
          hasNext: expect.any(Function),
          hasPrev: expect.any(Function),
        })
      })

      it.each(casesNavigation)('$name', async ({ input, action, expected }) => {
        const { wrapper, getContext } = captureContext(input)

        getContext()[action]()
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toEqual(expected)
      })

      it.each(casesGoToStep)('goToStep navega a $name', async ({ input, target, expected }) => {
        const { wrapper, getContext } = captureContext(input)

        getContext().goToStep(target)
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toEqual(expected)
      })

      it.each(casesHasNavigation)('hasNext y hasPrev para $name', async ({ input, expected }) => {
        const { getContext } = captureContext(input)
        await nextTick()

        expect({ hasNext: getContext().hasNext(), hasPrev: getContext().hasPrev() }).toEqual(
          expected,
        )
      })
    })

    describe('StepperItemContext', () => {
      it.each(casesStepperItemContext)(
        'pasa el contrato a cada ui para $name',
        ({ input, expected }) => {
          const keys = [
            'item',
            'trigger',
            'indicator',
            'wrapper',
            'label',
            'description',
            'separator',
          ] as const
          const contexts = Object.fromEntries(keys.map((key) => [key, [] as StepperItemContext[]]))

          mountStepper({
            props: {
              ...input,
              ui: Object.fromEntries(
                keys.map((key) => [
                  key,
                  (context: StepperItemContext) => {
                    contexts[key]!.push(context)
                    return {}
                  },
                ]),
              ),
            },
          })

          for (const key of keys) {
            const received = key === 'separator' ? expected.slice(0, -1) : expected
            expect(contexts[key]).toEqual(
              received.map((context) => expect.objectContaining(context)),
            )
          }
        },
      )

      it.each(casesStepperItemContext)(
        'pasa el contrato a cada slot para $name',
        ({ input, expected }) => {
          for (const slot of ['indicator', 'label', 'description'] as const) {
            const contexts: StepperItemContext[] = []
            mountStepper({
              props: input,
              slots: {
                [slot]: (context: StepperItemContext) => {
                  contexts.push(context)
                  return h('span', slot)
                },
              },
            })
            expect(contexts).toEqual(expected.map((context) => expect.objectContaining(context)))

            const itemContexts: StepperItemContext[] = []
            const itemSlot = `${slot}-${expected[0]!.item.value}`
            mountStepper({
              props: input,
              slots: {
                [itemSlot]: (context: StepperItemContext) => {
                  itemContexts.push(context)
                  return h('span', itemSlot)
                },
              },
            })
            expect(itemContexts).toEqual([expect.objectContaining(expected[0])])
          }
        },
      )

      it('pasa el contrato del paso activo al slot content', () => {
        const contexts: StepperItemContext[] = []

        mountStepper({
          props: { modelValue: 2 },
          slots: {
            content: (context: StepperItemContext) => {
              contexts.push(context)
              return h('p', 'Content')
            },
          },
        })

        expect(contexts).toEqual([
          expect.objectContaining({ item: steps[1], index: 1, active: true, completed: false }),
        ])
      })
    })
  })

  describe('variantsCss', () => {
    describe('stepperVariants', () => {
      it('aplica las clases base a la raíz', () => {
        expect(mountStepper().get('[data-test-stepper-root]').classes()).toEqual(
          expect.arrayContaining(['block', 'w-full']),
        )
      })
    })

    describe('stepperListVariants', () => {
      it('aplica las clases base a la lista', () => {
        expect(mountStepper().get('[data-test-stepper-list]').classes()).toEqual(
          expect.arrayContaining(['flex', 'w-full']),
        )
      })
    })

    describe('stepperItemVariants', () => {
      it('aplica las clases base a cada item', () => {
        for (const item of mountStepper().findAll('[data-test-stepper-item]')) {
          expect(item.classes()).toEqual(
            expect.arrayContaining(['group', 'flex', 'data-[disabled]:pointer-events-none']),
          )
        }
      })
    })

    describe('stepperTriggerVariants', () => {
      it('aplica las clases base a cada trigger', () => {
        for (const trigger of mountStepper().findAll('[data-test-stepper-trigger]')) {
          expect(trigger.classes()).toEqual(
            expect.arrayContaining([
              'group/stepper-trigger',
              'flex',
              'min-w-0',
              'rounded-md',
              'outline-none',
            ]),
          )
        }
      })
    })

    describe('stepperIndicatorVariants', () => {
      it('aplica las clases base a cada indicador', () => {
        for (const indicator of mountStepper().findAll('[data-test-stepper-indicator]')) {
          expect(indicator.classes()).toEqual(
            expect.arrayContaining([
              'inline-flex',
              'size-(--stepper-indicator-size)',
              'rounded-full',
              'bg-muted',
              'text-muted-foreground',
              'group-data-[disabled]:opacity-50',
            ]),
          )
        }
      })
    })

    describe('stepperWrapperVariants', () => {
      it('aplica las clases base al wrapper', () => {
        expect(mountStepper().get('[data-test-stepper-wrapper]').classes()).toEqual(
          expect.arrayContaining(['flex', 'min-w-0', 'flex-1', 'flex-col']),
        )
      })
    })

    describe('stepperLabelVariants', () => {
      it('aplica las clases base a la etiqueta', () => {
        expect(mountStepper().get('[data-test-stepper-title]').classes()).toContain('font-semibold')
      })
    })

    describe('stepperDescriptionVariants', () => {
      it('aplica las clases base a la descripción', () => {
        expect(mountStepper().get('[data-test-stepper-description]').classes()).toContain(
          'text-muted-foreground',
        )
      })
    })

    describe('stepperSeparatorVariants', () => {
      it.each([
        { input: undefined, expected: ['absolute', 'h-0.5'] },
        { input: 'vertical', expected: ['absolute', 'w-0.5'] },
      ] satisfies Array<{ input: StepperProps['orientation']; expected: string[] }>)(
        'aplica las clases base al separador con orientation=$input',
        ({ input, expected }) => {
          expect(
            mountStepper({ props: { orientation: input } })
              .get('[data-test-stepper-separator]')
              .classes(),
          ).toEqual(
            expect.arrayContaining(['bg-muted', 'group-data-[disabled]:opacity-50', ...expected]),
          )
        },
      )
    })

    describe('stepperContentVariants', () => {
      it.each([
        { input: undefined, expected: ['mt-(--stepper-spacing)'] },
        {
          input: 'vertical',
          expected: [
            'mt-(--stepper-spacing)',
            'ml-[calc(var(--stepper-indicator-size)+var(--stepper-gap))]',
          ],
        },
      ] satisfies Array<{ input: StepperProps['orientation']; expected: string[] }>)(
        'aplica las clases base al contenido con orientation=$input',
        ({ input, expected }) => {
          expect(
            mountStepper({
              props: { orientation: input },
              slots: { content: () => h('p', 'Content') },
            })
              .get('[data-test-stepper-content]')
              .classes(),
          ).toEqual(expect.arrayContaining(expected))
        },
      )
    })
  })
})
