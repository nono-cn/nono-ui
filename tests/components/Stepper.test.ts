import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { StepperItem, StepperRoot } from 'reka-ui'

import {
  Stepper,
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

function mountStepper(options: MountingOptions<StepperProps> = {}) {
  return mount(Stepper, { ...options, props: { steps, ...options.props } })
}

describe('Stepper', () => {
  it('renderiza correctamente', () => {
    const wrapper = mountStepper()
    expect(wrapper.find('[data-test-stepper-root]').exists()).toBe(true)
  })

  describe('props', () => {
    describe('size', () => {
      it.each(casesSize)('aplica las clases de size=$input a cada nodo', ({ input, expected }) => {
        const stepper = mountStepper({ props: { size: input } })

        expect(stepper.get('[data-test-stepper-root]').classes()).toContain(expected.root)
        expect(stepper.get('[data-test-stepper-list]').classes()).toContain(expected.list)
        expect(stepper.get('[data-test-stepper-indicator="1"]').classes()).toContain(
          expected.indicator,
        )
        expect(stepper.get('[data-test-stepper-title="1"]').classes()).toContain(expected.label)
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
            stepper.get('[data-test-stepper-title="1"]').classes().includes('text-center'),
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
      )    })

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
})
