import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { StepperItem, StepperRoot } from 'reka-ui'

import {
  Stepper,
  type StepperContext,
  type StepperItemContext,
  type StepperProps,
  type StepperSize,
  type StepperState,
  type StepperStep,
} from '@/components/ui/Stepper'
import { themeColors } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

const steps: StepperStep[] = [
  { value: 1, label: 'Account', description: 'Create your account' },
  { value: 2, label: 'Profile', description: 'Complete your profile' },
  { value: 3, label: 'Confirm', description: 'Review and confirm' },
]

// el step 2 tiene slot para probar los slots propios del step
const stepsWithSlot: StepperStep[] = [steps[0]!, { ...steps[1]!, slot: 'perfil' }, steps[2]!]

const casesSize = [
  {
    input: 'xs',
    expected: {
      root: '[--stepper-indicator-size:1.5rem]',
      list: '[--stepper-list-gap:0.25rem]',
      indicator: 'text-xs',
      label: 'text-xs',
      description: 'text-xs',
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
    },
  },
  {
    input: undefined,
    expected: {
      root: '[--stepper-indicator-size:2.5rem]',
      list: '[--stepper-list-gap:0.5rem]',
      indicator: 'text-base',
      label: 'text-base',
      description: 'text-sm',
    },
  },
] satisfies Array<{
  input: StepperSize | undefined
  expected: Record<'root' | 'list' | 'indicator' | 'label' | 'description', string>
}>

const casesLinear = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: true },
] satisfies Array<{ input: StepperProps['linear']; expected: boolean }>

const casesOrientation = [
  {
    input: 'horizontal',
    expected: {
      orientation: 'horizontal',
      list: 'items-start',
      item: 'basis-0',
      trigger: 'text-center',
      separator: 'h-0.5',
      centered: true,
      indented: false,
    },
  },
  {
    input: 'vertical',
    expected: {
      orientation: 'vertical',
      list: 'flex-col',
      item: 'pb-(--stepper-spacing)',
      trigger: 'text-left',
      separator: 'w-0.5',
      centered: false,
      indented: true,
    },
  },
  {
    input: undefined,
    expected: {
      orientation: 'horizontal',
      list: 'items-start',
      item: 'basis-0',
      trigger: 'text-center',
      separator: 'h-0.5',
      centered: true,
      indented: false,
    },
  },
] satisfies Array<{
  input: StepperProps['orientation']
  expected: {
    orientation: NonNullable<StepperProps['orientation']>
    list: string
    item: string
    trigger: string
    separator: string
    centered: boolean
    indented: boolean
  }
}>

// con modelValue=2: step 1 completado, step 2 activo, step 3 inactivo
const casesColorState = [
  {
    step: 1,
    state: 'completed',
    expected: {
      indicator: ['bg-(--stepper-color)', 'text-(--stepper-color-foreground)'],
      separator: 'bg-(--stepper-color)',
    },
  },
  {
    step: 2,
    state: 'active',
    expected: {
      indicator: ['bg-(--stepper-color)', 'text-(--stepper-color-foreground)'],
      separator: 'bg-muted',
    },
  },
  {
    step: 3,
    state: 'inactive',
    expected: {
      indicator: ['bg-muted', 'text-muted-foreground'],
      separator: undefined,
    },
  },
] satisfies Array<{
  step: number
  state: StepperState
  expected: { indicator: string[]; separator: string | undefined }
}>

const casesDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
] satisfies Array<{ input: StepperProps['disabled']; expected: boolean }>

const casesModelValue = [
  { input: undefined, expected: { value: 1, content: [true, false, false] } },
  { input: 1, expected: { value: 1, content: [true, false, false] } },
  { input: 2, expected: { value: 2, content: [false, true, false] } },
  { input: 3, expected: { value: 3, content: [false, false, true] } },
  { input: 99, expected: { value: 99, content: [false, false, false] } },
] satisfies Array<{
  input: StepperProps['modelValue']
  expected: { value: number; content: boolean[] }
}>

const casesUpdateModelValue = [
  { input: 1, expected: 2 },
  { input: 3, expected: 1 },
  { input: undefined, expected: 3 },
] satisfies Array<{ input: StepperProps['modelValue']; expected: number }>

// const casesStepContent = [
//   {
//     input: { value: 1, label: 'Cuenta', description: 'Crea tu cuenta' },
//     expected: { wrapper: true, label: 'Cuenta', description: 'Crea tu cuenta' },
//   },
//   {
//     input: { value: 1, label: 'Cuenta' },
//     expected: { wrapper: true, label: 'Cuenta', description: undefined },
//   },
//   {
//     input: { value: 1, description: 'Crea tu cuenta' },
//     expected: { wrapper: true, label: undefined, description: 'Crea tu cuenta' },
//   },
//   {
//     input: { value: 1 },
//     expected: { wrapper: false, label: undefined, description: undefined },
//   },
// ] satisfies Array<{
//   input: StepperStep
//   expected: { wrapper: boolean; label: string | undefined; description: string | undefined }
// }>

// const casesStepIcon = [
//   { input: 'check' as const, expected: { icon: 'check', text: '' } },
//   { input: undefined, expected: { icon: undefined, text: '1' } },
// ] satisfies Array<{
//   input: StepperStep['icon']
//   expected: { icon: string | undefined; text: string }
// }>

const contextFunctions = {
  goToStep: expect.any(Function),
  nextStep: expect.any(Function),
  prevStep: expect.any(Function),
  hasNext: expect.any(Function),
  hasPrev: expect.any(Function),
}

const casesStepperContext = [
  {
    name: 'primer step',
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
    name: 'step intermedio',
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
    name: 'último step',
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
    name: 'steps vecinos deshabilitados',
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
] satisfies Array<{
  name: string
  input: Partial<StepperProps>
  expected: Omit<StepperContext, keyof typeof contextFunctions>
}>

// con modelValue=2: step 1 completado, step 2 activo, step 3 inactivo
const casesStepperItemContext = [
  {
    name: 'completado',
    input: 1,
    expected: {
      item: steps[0]!,
      index: 0,
      completed: true,
      active: false,
      first: true,
      last: false,
    },
  },
  {
    name: 'activo',
    input: 2,
    expected: {
      item: steps[1]!,
      index: 1,
      completed: false,
      active: true,
      first: false,
      last: false,
    },
  },
  {
    name: 'inactivo',
    input: 3,
    expected: {
      item: steps[2]!,
      index: 2,
      completed: false,
      active: false,
      first: false,
      last: true,
    },
  },
] satisfies Array<{
  name: string
  input: number
  expected: Omit<StepperItemContext, keyof StepperContext>
}>

// contexto del step 2 activo, usado para comprobar que llega a cada ui y slot
const expectedStepperItemContext: StepperItemContext = {
  ...casesStepperContext[1]!.expected,
  ...contextFunctions,
  ...casesStepperItemContext[1]!.expected,
}

const casesUiItemContext = [
  'item',
  'trigger',
  'indicator',
  'wrapper',
  'label',
  'description',
  'separator',
  'content',
] satisfies Array<Exclude<keyof NonNullable<StepperProps['ui']>, 'list'>>

const casesSlotItemContext = [
  'indicator',
  'label',
  'description',
  'content',
  'indicator-perfil',
  'label-perfil',
  'description-perfil',
  'content-perfil',
]

function mountStepper(options: MountingOptions<StepperProps> = {}) {
  return mount(Stepper, { ...options, props: { steps, ...options.props } })
}

function findItemContext(contexts: StepperItemContext[], value: number) {
  return contexts.find((context) => context.item.value === value)
}

describe('Stepper', () => {
  describe('props', () => {
    describe('size', () => {
      it.each(casesSize)('aplica las clases de size=$input a cada nodo', ({ input, expected }) => {
        const stepper = mountStepper({ props: { size: input } })

        expect(stepper.get('[data-test-stepper-root]').classes()).toContain(expected.root)
        expect(stepper.get('[data-test-stepper-list]').classes()).toContain(expected.list)
        expect(stepper.get('[data-test-stepper-indicator="1"]').classes()).toContain(
          expected.indicator,
        )
        expect(stepper.get('[data-test-stepper-label="1"]').classes()).toContain(expected.label)
        expect(stepper.get('[data-test-stepper-description="1"]').classes()).toContain(
          expected.description,
        )
      })
    })

    describe('linear', () => {
      it.each(casesLinear)(
        'pasa linear=$input a StepperRoot como $expected',
        ({ input, expected }) => {
          const stepper = mountStepper({ props: { linear: input } })

          expect(stepper.getComponent(StepperRoot).props('linear')).toBe(expected)
        },
      )
    })

    describe('orientation', () => {
      it.each(casesOrientation)(
        'pasa orientation=$input a StepperRoot como $expected.orientation',
        ({ input, expected }) => {
          const stepper = mountStepper({ props: { orientation: input } })

          expect(stepper.getComponent(StepperRoot).props('orientation')).toBe(expected.orientation)
        },
      )

      it.each(casesOrientation)(
        'aplica las clases de orientation=$input a cada nodo',
        ({ input, expected }) => {
          const stepper = mountStepper({
            props: { orientation: input },
            slots: { content: 'Contenido' },
          })

          expect(stepper.get('[data-test-stepper-list]').classes()).toContain(expected.list)
          expect(stepper.get('[data-test-stepper-item="1"]').classes()).toContain(expected.item)
          expect(stepper.get('[data-test-stepper-trigger="1"]').classes()).toContain(
            expected.trigger,
          )
          expect(stepper.get('[data-test-stepper-separator="1"]').classes()).toContain(
            expected.separator,
          )
          expect(
            stepper.get('[data-test-stepper-wrapper="1"]').classes().includes('items-center'),
          ).toBe(expected.centered)
          expect(
            stepper.get('[data-test-stepper-label="1"]').classes().includes('text-center'),
          ).toBe(expected.centered)
          expect(
            stepper.get('[data-test-stepper-description="1"]').classes().includes('text-center'),
          ).toBe(expected.centered)
          expect(
            stepper
              .get('[data-test-stepper-content="1"]')
              .classes()
              .includes('ml-[calc(var(--stepper-indicator-size)+var(--stepper-gap))]'),
          ).toBe(expected.indented)
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

      it.each(casesColorState)(
        'pinta el indicador del step $step ($state) con $expected.indicator',
        ({ step, expected }) => {
          const stepper = mountStepper({ props: { modelValue: 2 } })

          expect(stepper.get(`[data-test-stepper-indicator="${step}"]`).classes()).toEqual(
            expect.arrayContaining(expected.indicator),
          )
        },
      )

      it.each(casesColorState.filter(({ expected }) => expected.separator))(
        'pinta el separador del step $step ($state) con $expected.separator',
        ({ step, expected }) => {
          const stepper = mountStepper({ props: { modelValue: 2 } })

          expect(stepper.get(`[data-test-stepper-separator="${step}"]`).classes()).toContain(
            expected.separator,
          )
        },
      )
    })

    describe('modelValue', () => {
      it.each(casesModelValue)(
        'pasa modelValue=$input a StepperRoot como $expected.value',
        ({ input, expected }) => {
          const stepper = mountStepper({ props: { modelValue: input } })

          expect(stepper.getComponent(StepperRoot).props('modelValue')).toBe(expected.value)
        },
      )

      it.each(casesModelValue)(
        'muestra solo el contenido del step activo con modelValue=$input',
        ({ input, expected }) => {
          const stepper = mountStepper({
            props: { modelValue: input },
            slots: { content: 'Contenido' },
          })

          steps.forEach(({ value }, index) => {
            expect(stepper.find(`[data-test-stepper-content="${value}"]`).exists()).toBe(
              expected.content[index],
            )
          })
        },
      )
    })

    describe('steps', () => {
      describe('value', () => {
        it('pasa value como step a cada StepperItem de Reka', () => {
          const stepper = mountStepper()

          expect(stepper.findAllComponents(StepperItem).map((item) => item.props('step'))).toEqual([
            1, 2, 3,
          ])
        })
      })

      describe('label', () => {
        it('renderiza step.label en el label de cada step', () => {
          const stepper = mountStepper()

          steps.forEach(({ value, label }) => {
            expect(stepper.get(`[data-test-stepper-label="${value}"]`).text()).toBe(label)
          })
        })

        it('no renderiza el label si el step no tiene label', () => {
          const stepper = mountStepper({
            props: { steps: [{ value: 1, description: 'Crea tu cuenta' }] },
          })

          expect(stepper.find('[data-test-stepper-label="1"]').exists()).toBe(false)
        })
      })

      describe('description', () => {
        it('renderiza step.description en la descripción de cada step', () => {
          const stepper = mountStepper()

          steps.forEach(({ value, description }) => {
            expect(stepper.get(`[data-test-stepper-description="${value}"]`).text()).toBe(
              description,
            )
          })
        })

        it('no renderiza la descripción si el step no tiene description', () => {
          const stepper = mountStepper({ props: { steps: [{ value: 1, label: 'Cuenta' }] } })

          expect(stepper.find('[data-test-stepper-description="1"]').exists()).toBe(false)
        })
      })

      it('no renderiza el wrapper si el step no tiene label ni description', () => {
        const stepper = mountStepper({ props: { steps: [{ value: 1 }] } })

        expect(stepper.find('[data-test-stepper-wrapper="1"]').exists()).toBe(false)
      })
    })

    // describe('steps', () => {
    //   it('renderiza un item por cada step', () => {
    //     const stepper = mountStepper()

    //     expect(stepper.findAll('[data-test-stepper-item]')).toHaveLength(steps.length)
    //   })

    //   it('no renderiza items sin steps', () => {
    //     const stepper = mountStepper({ props: { steps: [] } })

    //     expect(stepper.findAll('[data-test-stepper-item]')).toHaveLength(0)
    //   })

    //   it('usa step.slot como identificador del nodo si existe', () => {
    //     const stepper = mountStepper({ props: { steps: [{ value: 1, slot: 'cuenta' }] } })

    //     expect(stepper.find('[data-test-stepper-item="cuenta"]').exists()).toBe(true)
    //     expect(stepper.find('[data-test-stepper-item="1"]').exists()).toBe(false)
    //   })

    //   it.each(casesStepContent)(
    //     'renderiza label=$input.label y description=$input.description',
    //     ({ input, expected }) => {
    //       const stepper = mountStepper({ props: { steps: [input] } })
    //       const label = stepper.find('[data-test-stepper-label="1"]')
    //       const description = stepper.find('[data-test-stepper-description="1"]')

    //       expect(stepper.find('[data-test-stepper-wrapper="1"]').exists()).toBe(expected.wrapper)
    //       expect(label.exists()).toBe(Boolean(expected.label))
    //       if (expected.label) expect(label.text()).toBe(expected.label)
    //       expect(description.exists()).toBe(Boolean(expected.description))
    //       if (expected.description) expect(description.text()).toBe(expected.description)
    //     },
    //   )

    //   it.each(casesStepIcon)(
    //     'renderiza icon=$input o el número del step en el indicador',
    //     ({ input, expected }) => {
    //       const stepper = mountStepper({ props: { steps: [{ value: 1, icon: input }] } })
    //       const icon = stepper.findComponent(Icon)

    //       expect(icon.exists()).toBe(Boolean(expected.icon))
    //       if (expected.icon) expect(icon.props('name')).toBe(expected.icon)
    //       expect(stepper.get('[data-test-stepper-indicator="1"]').text()).toBe(expected.text)
    //     },
    //   )

    //   it('deshabilita solo el step con disabled', () => {
    //     const stepper = mountStepper({
    //       props: { steps: [steps[0]!, { ...steps[1]!, disabled: true }, steps[2]!] },
    //     })

    //     expect(
    //       stepper.findAllComponents(StepperItem).map((item) => item.props('disabled')),
    //     ).toEqual([false, true, false])
    //     steps.forEach(({ value }) => {
    //       expect(
    //         stepper
    //           .get(`[data-test-stepper-indicator="${value}"]`)
    //           .classes()
    //           .includes('opacity-50'),
    //       ).toBe(value === 2)
    //     })
    //   })
    // })

    describe('ui', () => {
      describe('list', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.list',
          id: '[data-test-stepper-list]',
          mount: (attrs) => mountStepper({ props: { ui: { list: () => attrs } } }),
        })
      })

      describe('item', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.item',
          id: '[data-test-stepper-item="1"]',
          mount: (attrs) =>
            mountStepper({ props: { steps: [steps[0]!], ui: { item: () => attrs } } }),
        })
      })

      describe('trigger', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.trigger',
          id: '[data-test-stepper-trigger="1"]',
          mount: (attrs) =>
            mountStepper({ props: { steps: [steps[0]!], ui: { trigger: () => attrs } } }),
        })
      })

      describe('indicator', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.indicator',
          id: '[data-test-stepper-indicator="1"]',
          mount: (attrs) =>
            mountStepper({ props: { steps: [steps[0]!], ui: { indicator: () => attrs } } }),
        })
      })

      describe('wrapper', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.wrapper',
          id: '[data-test-stepper-wrapper="1"]',
          mount: (attrs) =>
            mountStepper({ props: { steps: [steps[0]!], ui: { wrapper: () => attrs } } }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.label',
          id: '[data-test-stepper-label="1"]',
          mount: (attrs) =>
            mountStepper({ props: { steps: [steps[0]!], ui: { label: () => attrs } } }),
        })
      })

      describe('description', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.description',
          id: '[data-test-stepper-description="1"]',
          mount: (attrs) =>
            mountStepper({ props: { steps: [steps[0]!], ui: { description: () => attrs } } }),
        })
      })

      describe('separator', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.separator',
          id: '[data-test-stepper-separator="1"]',
          mount: (attrs) =>
            mountStepper({
              props: { steps: [steps[0]!, steps[1]!], ui: { separator: () => attrs } },
            }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.content',
          id: '[data-test-stepper-content="1"]',
          mount: (attrs) =>
            mountStepper({
              props: { steps: [steps[0]!], ui: { content: () => attrs } },
              slots: { content: 'Contenido' },
            }),
        })
      })
    })

    describe('disabled', () => {
      it.each(casesDisabled)(
        'pasa disabled=$input a todos los StepperItem como $expected',
        ({ input, expected }) => {
          const stepper = mountStepper({ props: { disabled: input } })

          expect(
            stepper.findAllComponents(StepperItem).map((item) => item.props('disabled')),
          ).toEqual(steps.map(() => expected))
        },
      )

      it.each(casesDisabled)(
        'aplica las clases de disabled=$input a todos los steps como $expected',
        ({ input, expected }) => {
          const stepper = mountStepper({ props: { disabled: input } })

          steps.forEach(({ value }) => {
            expect(
              stepper
                .get(`[data-test-stepper-item="${value}"]`)
                .classes()
                .includes('pointer-events-none'),
            ).toBe(expected)
            expect(
              stepper
                .get(`[data-test-stepper-indicator="${value}"]`)
                .classes()
                .includes('opacity-50'),
            ).toBe(expected)
          })
        },
      )

      it('mantiene el color del indicador y el separador completados con opacidad', () => {
        const stepper = mountStepper({ props: { modelValue: 2, disabled: true } })

        expect(stepper.get('[data-test-stepper-indicator="1"]').classes()).toEqual(
          expect.arrayContaining(['bg-(--stepper-color)', 'opacity-50']),
        )
        expect(stepper.get('[data-test-stepper-separator="1"]').classes()).toEqual(
          expect.arrayContaining(['bg-(--stepper-color)', 'opacity-50']),
        )
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-stepper-root]',
      mount: (attrs) => mountStepper({ attrs }),
    })
  })

  describe('slots', () => {
    describe('indicator', () => {
      it('renderiza el slot en todos los steps', () => {
        const stepper = mountStepper({ slots: { indicator: 'Slot' } })

        steps.forEach(({ value }) => {
          expect(stepper.get(`[data-test-stepper-indicator="${value}"]`).text()).toBe('Slot')
        })
      })

      it('oculta el icono del step', () => {
        const stepper = mountStepper({
          props: { steps: [{ value: 1, icon: 'check' }] },
          slots: { indicator: 'Slot' },
        })

        expect(stepper.find('[data-test-stepper-icon="1"]').exists()).toBe(false)
        expect(stepper.get('[data-test-stepper-indicator="1"]').text()).toBe('Slot')
      })

      it('renderiza indicator-{step.slot} solo en su step con prioridad sobre indicator', () => {
        const stepper = mountStepper({
          props: { steps: stepsWithSlot },
          slots: { indicator: 'General', 'indicator-perfil': 'Step 2' },
        })

        expect(stepper.get('[data-test-stepper-indicator="1"]').text()).toBe('General')
        expect(stepper.get('[data-test-stepper-indicator="perfil"]').text()).toBe('Step 2')
        expect(stepper.get('[data-test-stepper-indicator="3"]').text()).toBe('General')
      })

      it('no renderiza indicator-{value} si el step no tiene slot', () => {
        const stepper = mountStepper({ slots: { 'indicator-2': 'Step 2' } })

        expect(stepper.get('[data-test-stepper-indicator="2"]').text()).toBe('2')
      })
    })

    describe('label', () => {
      it('renderiza el slot en todos los steps y oculta step.label', () => {
        const stepper = mountStepper({ slots: { label: 'Slot' } })

        steps.forEach(({ value }) => {
          expect(stepper.get(`[data-test-stepper-label="${value}"]`).text()).toBe('Slot')
        })
      })

      it('renderiza el slot aunque el step no tenga label', () => {
        const stepper = mountStepper({
          props: { steps: [{ value: 1 }] },
          slots: { label: 'Slot' },
        })

        expect(stepper.get('[data-test-stepper-label="1"]').text()).toBe('Slot')
      })

      it('renderiza label-{step.slot} solo en su step con prioridad sobre label', () => {
        const stepper = mountStepper({
          props: { steps: stepsWithSlot },
          slots: { label: 'General', 'label-perfil': 'Step 2' },
        })

        expect(stepper.get('[data-test-stepper-label="1"]').text()).toBe('General')
        expect(stepper.get('[data-test-stepper-label="perfil"]').text()).toBe('Step 2')
        expect(stepper.get('[data-test-stepper-label="3"]').text()).toBe('General')
      })

      it('no renderiza label-{value} si el step no tiene slot', () => {
        const stepper = mountStepper({ slots: { 'label-2': 'Step 2' } })

        expect(stepper.get('[data-test-stepper-label="2"]').text()).toBe(steps[1]!.label)
      })
    })

    describe('description', () => {
      it('renderiza el slot en todos los steps y oculta step.description', () => {
        const stepper = mountStepper({ slots: { description: 'Slot' } })

        steps.forEach(({ value }) => {
          expect(stepper.get(`[data-test-stepper-description="${value}"]`).text()).toBe('Slot')
        })
      })

      it('renderiza el slot aunque el step no tenga description', () => {
        const stepper = mountStepper({
          props: { steps: [{ value: 1 }] },
          slots: { description: 'Slot' },
        })

        expect(stepper.get('[data-test-stepper-description="1"]').text()).toBe('Slot')
      })

      it('renderiza description-{step.slot} solo en su step con prioridad sobre description', () => {
        const stepper = mountStepper({
          props: { steps: stepsWithSlot },
          slots: { description: 'General', 'description-perfil': 'Step 2' },
        })

        expect(stepper.get('[data-test-stepper-description="1"]').text()).toBe('General')
        expect(stepper.get('[data-test-stepper-description="perfil"]').text()).toBe('Step 2')
        expect(stepper.get('[data-test-stepper-description="3"]').text()).toBe('General')
      })

      it('no renderiza description-{value} si el step no tiene slot', () => {
        const stepper = mountStepper({ slots: { 'description-2': 'Step 2' } })

        expect(stepper.get('[data-test-stepper-description="2"]').text()).toBe(
          steps[1]!.description,
        )
      })
    })

    describe('content', () => {
      it('no renderiza el contenido sin slot', () => {
        const stepper = mountStepper()

        expect(stepper.find('[data-test-stepper-content]').exists()).toBe(false)
      })

      it('renderiza el slot solo en el step activo', () => {
        const stepper = mountStepper({ props: { modelValue: 2 }, slots: { content: 'Slot' } })

        expect(stepper.findAll('[data-test-stepper-content]')).toHaveLength(1)
        expect(stepper.get('[data-test-stepper-content="2"]').text()).toBe('Slot')
      })

      it('renderiza content-{step.slot} con prioridad sobre content', () => {
        const stepper = mountStepper({
          props: { modelValue: 2, steps: stepsWithSlot },
          slots: { content: 'General', 'content-perfil': 'Step 2' },
        })

        expect(stepper.get('[data-test-stepper-content="perfil"]').text()).toBe('Step 2')
      })

      it('no renderiza content-{step.slot} si su step no está activo', () => {
        const stepper = mountStepper({
          props: { modelValue: 1, steps: stepsWithSlot },
          slots: { 'content-perfil': 'Step 2' },
        })

        expect(stepper.find('[data-test-stepper-content]').exists()).toBe(false)
      })

      it('no renderiza content-{value} si el step no tiene slot', () => {
        const stepper = mountStepper({
          props: { modelValue: 2 },
          slots: { 'content-2': 'Step 2' },
        })

        expect(stepper.find('[data-test-stepper-content]').exists()).toBe(false)
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
      it('aplica las clases base al item', () => {
        expect(mountStepper().get('[data-test-stepper-item="1"]').classes()).toEqual(
          expect.arrayContaining(['flex', 'items-center', 'gap-2']),
        )
      })
    })

    describe('stepperTriggerVariants', () => {
      it('aplica las clases base al trigger', () => {
        expect(mountStepper().get('[data-test-stepper-trigger="1"]').classes()).toEqual(
          expect.arrayContaining([
            'group/stepper-trigger',
            'flex',
            'min-w-0',
            'flex-col',
            'items-center',
            'gap-1',
            'rounded-md',
            'p-1',
            'text-center',
            'z-10',
            'outline-none',
          ]),
        )
      })
    })

    describe('stepperIndicatorVariants', () => {
      it('aplica las clases base al indicador', () => {
        expect(mountStepper().get('[data-test-stepper-indicator="1"]').classes()).toEqual(
          expect.arrayContaining([
            'inline-flex',
            'size-(--stepper-indicator-size)',
            'shrink-0',
            'items-center',
            'justify-center',
            'rounded-full',
            'transition-colors',
            'group-focus-visible/stepper-trigger:ring-3',
            'group-focus-visible/stepper-trigger:ring-(--stepper-color)/50',
          ]),
        )
      })
    })

    describe('stepperWrapperVariants', () => {
      it('aplica las clases base al wrapper', () => {
        expect(mountStepper().get('[data-test-stepper-wrapper="1"]').classes()).toEqual(
          expect.arrayContaining(['flex', 'min-w-0', 'flex-1', 'flex-col']),
        )
      })
    })

    describe('stepperLabelVariants', () => {
      it('aplica las clases base al label', () => {
        expect(mountStepper().get('[data-test-stepper-label="1"]').classes()).toContain(
          'font-semibold',
        )
      })
    })

    describe('stepperDescriptionVariants', () => {
      it('aplica las clases base a la descripción', () => {
        expect(mountStepper().get('[data-test-stepper-description="1"]').classes()).toContain(
          'text-muted-foreground',
        )
      })
    })

    describe('stepperSeparatorVariants', () => {
      it('aplica las clases base al separador', () => {
        expect(mountStepper().get('[data-test-stepper-separator="1"]').classes()).toContain(
          'transition-colors',
        )
      })
    })

    describe('stepperContentVariants', () => {
      it('aplica las clases base al contenido', () => {
        expect(
          mountStepper({ slots: { content: 'Contenido' } })
            .get('[data-test-stepper-content="1"]')
            .classes(),
        ).toContain('mt-(--stepper-spacing)')
      })
    })
  })

  describe('context', () => {
    describe('StepperContext', () => {
      it.each(casesStepperContext)(
        'cumple el contrato de StepperContext en el caso $name',
        ({ input, expected }) => {
          let context: StepperContext | undefined
          mountStepper({
            props: {
              ...input,
              ui: {
                list: (value) => {
                  context = value
                  return {}
                },
              },
            },
          })

          expect(context).toEqual({ ...expected, ...contextFunctions })
        },
      )
    })

    describe('StepperItemContext', () => {
      it.each(casesStepperItemContext)(
        'cumple el contrato de StepperItemContext en el step $input ($name)',
        ({ input, expected }) => {
          const contexts: StepperItemContext[] = []
          mountStepper({
            props: {
              modelValue: 2,
              ui: {
                item: (value) => {
                  contexts.push(value)
                  return {}
                },
              },
            },
          })

          expect(findItemContext(contexts, input)).toEqual({
            ...casesStepperContext[1]!.expected,
            ...contextFunctions,
            ...expected,
          })
        },
      )

      it.each(casesUiItemContext)('pasa StepperItemContext a ui.%s', (key) => {
        const contexts: StepperItemContext[] = []
        mountStepper({
          props: {
            modelValue: 2,
            ui: {
              [key]: (value: StepperItemContext) => {
                contexts.push(value)
                return {}
              },
            },
          },
          slots: { content: 'Contenido' },
        })

        expect(findItemContext(contexts, 2)).toEqual(expectedStepperItemContext)
      })

      it.each(casesSlotItemContext)('pasa StepperItemContext al slot %s', (name) => {
        const contexts: StepperItemContext[] = []
        mountStepper({
          props: { modelValue: 2, steps: stepsWithSlot },
          slots: {
            // Vue añade ref_for a los slots dentro de un v-for; no es parte del contexto
            [name]: (slotProps: StepperItemContext & { ref_for?: boolean }) => {
              const { ref_for: _refFor, ...value } = slotProps
              void _refFor
              contexts.push(value)
              return 'Slot'
            },
          },
        })

        expect(findItemContext(contexts, 2)).toEqual({
          ...expectedStepperItemContext,
          item: stepsWithSlot[1],
        })
      })
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it.each(casesUpdateModelValue)(
        'reemite $expected cuando StepperRoot cambia modelValue=$input',
        ({ input, expected }) => {
          const stepper = mountStepper({ props: { modelValue: input } })

          stepper.getComponent(StepperRoot).vm.$emit('update:modelValue', expected)

          expect(stepper.emitted('update:modelValue')).toEqual([[expected]])
        },
      )
    })
  })
})
