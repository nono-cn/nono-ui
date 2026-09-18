import { h, nextTick, ref, type Component } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperRoot,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from 'reka-ui'

import {
  Stepper,
  type StepperContext,
  type StepperItemContext,
  type StepperProps,
  type StepperStep,
} from '@/components/ui/Stepper'
import { stepperDefaults } from '@/components/ui/Stepper/defaults'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'
import { testIconConfig } from '../utils/testIconConfig'

const steps: StepperStep[] = [
  {
    slot: 'first',
    step: 1,
    label: 'First step',
    description: 'First description',
    icon: { name: 'user' },
    content: 'First content',
  },
  {
    slot: 'second',
    step: 2,
    label: 'Second step',
    description: 'Second description',
    content: 'Second content',
  },
  {
    slot: 'third',
    step: 3,
    label: 'Third step',
    description: 'Third description',
    content: 'Third content',
    disabled: true,
  },
]

function mountStepper(options: MountingOptions<StepperProps> = {}) {
  return mount(Stepper, options)
}

describe('Stepper', () => {
  describe('props', () => {
    describe('value', () => {
      it.each([
        { input: undefined, expected: 1 },
        { input: 2, expected: 2 },
      ])('pasa value=$input a StepperRoot como $expected', ({ input, expected }) => {
        const wrapper = mountStepper({ props: { steps, value: input } })

        expect(wrapper.getComponent(StepperRoot).props('modelValue')).toBe(expected)
      })
    })

    describe('orientation', () => {
      it.each([
        { input: undefined, expected: stepperDefaults.orientation },
        { input: 'horizontal', expected: 'horizontal' },
        { input: 'vertical', expected: 'vertical' },
      ])('pasa orientation=$input como $expected', ({ input, expected }) => {
        const wrapper = mountStepper({ props: { steps, orientation: input } })
        const root = wrapper.getComponent(StepperRoot)

        expect(root.props('orientation')).toBe(expected)
        expect(wrapper.get('[data-test-stepper-list]').classes()).toContain(
          input === 'vertical' ? 'flex-col' : 'items-start',
        )

        if (input === 'vertical') {
          expect(wrapper.get('[data-test-stepper-trigger="first"]').classes()).toContain('w-full')
          expect(wrapper.get('[data-test-stepper-item="first"]').classes()).toContain('pb-6')
          expect(wrapper.get('[data-test-stepper-wrapper="first"]').classes()).toContain('flex-1')
          expect(wrapper.get('[data-test-stepper-title="first"]').classes()).toContain(
            'whitespace-normal',
          )
          expect(wrapper.get('[data-test-stepper-content="first"]').classes()).toContain('ml-14')
          expect(wrapper.get('[data-test-stepper-separator="first"]').classes()).toContain(
            '-bottom-5',
          )
        } else {
          expect(wrapper.get('[data-test-stepper-item="first"]').classes()).toEqual(
            expect.arrayContaining(['min-w-0', 'flex-1', 'basis-0']),
          )
          expect(wrapper.get('[data-test-stepper-trigger="first"]').classes()).toContain('w-full')
          expect(wrapper.get('[data-test-stepper-title="first"]').classes()).toEqual(
            expect.arrayContaining(['break-words', 'whitespace-normal', 'text-center']),
          )
        }
      })
    })

    describe('linear', () => {
      it.each([
        { input: undefined, expected: stepperDefaults.linear },
        { input: true, expected: true },
        { input: false, expected: false },
      ])('pasa linear=$input como $expected a StepperRoot', ({ input, expected }) => {
        const root = mountStepper({ props: { steps, linear: input } }).getComponent(StepperRoot)

        expect(root.props('linear')).toBe(expected)
      })
    })

    describe('color', () => {
      testColor({
        text: 'pasa color a Stepper',
        id: '[data-test-stepper-root]',
        varColor: '--stepper-color',
        mount: (color) => mountStepper({ props: { steps, color } }),
      })
    })

    describe('steps', () => {
      it.each([
        { input: [], expectedItems: 0, expectedTriggers: 0, expectedContents: 0 },
        { input: steps, expectedItems: 3, expectedTriggers: 3, expectedContents: 1 },
      ])(
        'renderiza $expectedItems items para steps=$input',
        ({ input, expectedItems, expectedTriggers, expectedContents }) => {
          const wrapper = mountStepper({ props: { steps: input } })

          expect(wrapper.findAll('[data-test-stepper-item]')).toHaveLength(expectedItems)
          expect(wrapper.findAll('[data-test-stepper-trigger]')).toHaveLength(expectedTriggers)
          expect(wrapper.findAll('[data-test-stepper-content]')).toHaveLength(expectedContents)
        },
      )

      it('pasa las props del item a StepperItem y deshabilita su trigger', () => {
        const input: StepperStep[] = [
          {
            ...steps[0],
            completed: true,
          },
          steps[1],
        ]
        const wrapper = mountStepper({ props: { steps: input } })
        const item = wrapper.findAllComponents(StepperItem)[0]
        const trigger = wrapper.findAllComponents(StepperTrigger)[0]

        expect(item.props()).toMatchObject({
          step: 1,
          completed: true,
        })
        expect(trigger.attributes('disabled')).toBeUndefined()

        const disabledTrigger = mountStepper({ props: { steps } }).findAllComponents(
          StepperTrigger,
        )[2]
        expect(disabledTrigger.attributes('disabled')).toBeDefined()
      })

      it('pasa las props de los nodos internos a sus primitivas', () => {
        const input: StepperStep[] = [
          {
            step: 1,
            label: 'Step',
            description: 'Description',
            trigger: { as: 'a', asChild: false },
            indicator: { as: 'span', asChild: false },
            labelProps: { as: 'h3', asChild: false },
            descriptionProps: { as: 'p', asChild: false },
            separator: { as: 'span', asChild: false, decorative: true },
          },
          { step: 2, label: 'Last step' },
        ]
        const wrapper = mountStepper({ props: { steps: input } })

        expect(wrapper.getComponent(StepperTrigger).props()).toMatchObject({
          as: 'a',
          asChild: false,
        })
        expect(wrapper.getComponent(StepperIndicator).props()).toMatchObject({
          as: 'span',
          asChild: false,
        })
        expect(wrapper.getComponent(StepperTitle).props()).toMatchObject({
          as: 'h3',
          asChild: false,
        })
        expect(wrapper.getComponent(StepperDescription).props()).toMatchObject({
          as: 'p',
          asChild: false,
        })
        expect(wrapper.getComponent(StepperSeparator).props()).toMatchObject({
          as: 'span',
          asChild: false,
          decorative: true,
        })
      })

      describe('icon', () => {
        testIconConfig({
          text: 'pasa las props de step.icon',
          id: '[data-test-stepper-icon="first"]',
          mount: (input) =>
            mountStepper({ props: { steps: [{ ...steps[0], icon: input }, steps[1]] } }),
        })

        it('muestra check para un paso completado sin icono', () => {
          const wrapper = mountStepper({
            props: { value: 2, steps: [{ ...steps[0], icon: undefined }, steps[1]] },
          })

          expect(wrapper.getComponent('[data-test-stepper-icon="first"]').props('name')).toBe(
            'check',
          )
        })
      })
    })

    describe('ui', () => {
      describe('root', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.root',
          id: '[data-test-stepper-root]',
          mount: (attrs) => mountStepper({ props: { ui: { root: () => attrs } } }),
        })
      })

      describe('list', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.list',
          id: '[data-test-stepper-list]',
          mount: (attrs) => mountStepper({ props: { steps, ui: { list: () => attrs } } }),
        })
      })

      const uiParts = [
        ['item', '[data-test-stepper-item="first"]'],
        ['trigger', '[data-test-stepper-trigger="first"]'],
        ['indicator', '[data-test-stepper-indicator="first"]'],
        ['wrapper', '[data-test-stepper-wrapper="first"]'],
        ['label', '[data-test-stepper-title="first"]'],
        ['description', '[data-test-stepper-description="first"]'],
        ['separator', '[data-test-stepper-separator="first"]'],
        ['content', '[data-test-stepper-content="first"]'],
      ] as const

      it.each(uiParts)('reenvia attrs mediante ui.%s', (part, id) => {
        const wrapper = mountStepper({
          props: {
            value: 1,
            steps,
            ui: {
              [part]: () => ({
                id: `ui-${part}`,
                'aria-label': part,
                class: 'ui-class',
                style: 'opacity: 0.5',
              }),
            },
          },
        })
        const node = wrapper.get(id)

        expect(node.attributes('id')).toBe(`ui-${part}`)
        expect(node.attributes('aria-label')).toBe(part)
        expect(node.classes()).toContain('ui-class')
        expect(node.attributes('style')).toContain('opacity: 0.5')
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa atributos arbitrarios, class y style a la raíz',
      id: '[data-test-stepper-root]',
      mount: (attrs) => mountStepper({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it.each([1, 2, undefined])('reenvia value=%s desde StepperRoot', async (input) => {
        const wrapper = mountStepper({ props: { value: 1, steps } })

        await wrapper.getComponent(StepperRoot).vm.$emit('update:modelValue', input)
        await nextTick()

        expect(wrapper.emitted('update:value')).toEqual(input === 1 ? undefined : [[input]])
      })

      it('actualiza el modelo al pulsar un trigger habilitado', async () => {
        const wrapper = mountStepper({ props: { value: 1, steps } })

        await wrapper
          .get('[data-test-stepper-trigger="second"]')
          .trigger('mousedown', { button: 0 })

        expect(wrapper.emitted('update:value')).toEqual([[2]])
      })

      it('no actualiza el modelo al pulsar un trigger deshabilitado', async () => {
        const wrapper = mountStepper({ props: { value: 1, steps } })

        await wrapper.get('[data-test-stepper-trigger="third"]').trigger('mousedown', { button: 0 })

        expect(wrapper.emitted('update:value')).toBeUndefined()
      })
    })
  })

  describe('slots', () => {
    const slotCases = [
      { name: 'indicator', selector: '[data-test-stepper-slot="indicator"]' },
      { name: 'label', selector: '[data-test-stepper-slot="label"]' },
      { name: 'description', selector: '[data-test-stepper-slot="description"]' },
      { name: 'content', selector: '[data-test-stepper-slot="content"]' },
    ] as const

    it.each(slotCases)('renderiza y sustituye el slot $name', ({ name, selector }) => {
      const wrapper = mountStepper({
        props: { steps },
        slots: { [name]: () => h('span', { 'data-test-stepper-slot': name }, `Custom ${name}`) },
      })

      expect(wrapper.get(selector).text()).toBe(`Custom ${name}`)
    })

    it('prioriza el slot dinámico sobre el slot global', () => {
      const wrapper = mountStepper({
        props: { steps },
        slots: {
          label: () => h('span', { 'data-test-stepper-slot': 'global' }, 'Global'),
          'label-second': () => h('span', { 'data-test-stepper-slot': 'specific' }, 'Specific'),
        },
      })

      expect(wrapper.get('[data-test-stepper-slot="specific"]').text()).toBe('Specific')
      expect(wrapper.get('[data-test-stepper-slot="global"]').text()).toBe('Global')
    })

    it('pasa StepperItemContext a los slots', () => {
      let context: StepperItemContext | undefined

      mountStepper({
        props: { steps, value: 1 },
        slots: {
          label: (input: StepperItemContext) => {
            context ??= input
            return h('span')
          },
        },
      })

      expect(context).toBeDefined()
      expect(context).toMatchObject({ item: steps[0], index: 0, active: true, first: true })
    })
  })

  describe('context contract', () => {
    it('expone el StepperContext sin props', () => {
      let context: StepperContext | undefined

      mountStepper({
        props: { steps, value: 1 },
        slots: {
          content: (input: StepperItemContext) => {
            context ??= input
            return h('span')
          },
        },
      })

      expect(context).toMatchObject({
        value: 1,
        totalSteps: 3,
        isNextDisabled: false,
        isPrevDisabled: true,
        isFirstStep: true,
        isLastStep: false,
      })
      expect(context).not.toHaveProperty('props')
    })

    it.each([
      {
        value: 1,
        expected: { completed: false, active: true, first: true, last: false },
      },
      {
        value: 2,
        expected: { completed: false, active: true, first: false, last: false },
      },
    ])('crea el estado del item activo para value=$value', ({ value, expected }) => {
      let itemContext: StepperItemContext | undefined

      mountStepper({
        props: {
          steps,
          value,
          ui: {
            trigger: (input) => {
              if (input.item.step === value) itemContext = input
              return {}
            },
          },
        },
      })

      expect(itemContext).toMatchObject({ ...expected, value, item: steps[value - 1] })
    })

    it('marca como completados los pasos anteriores y respeta completed explícito', () => {
      const input: StepperStep[] = [{ ...steps[0], completed: true }, steps[1], steps[2]]
      const contexts = new Map<number, StepperItemContext>()

      mountStepper({
        props: {
          steps: input,
          value: 2,
          ui: {
            trigger: (context) => {
              contexts.set(context.item.step, context)
              return {}
            },
          },
        },
      })

      expect(contexts.get(1)).toMatchObject({ completed: true, active: false })
      expect(contexts.get(2)).toMatchObject({ completed: false, active: true })
      expect(contexts.get(3)).toMatchObject({ completed: false, active: false })
    })

    it('expone navegación contextual y respeta pasos deshabilitados', async () => {
      const value = ref(1)
      let context: StepperItemContext | undefined
      const Host = {
        setup() {
          return { value }
        },
        render() {
          return h(
            Stepper as Component,
            {
              value: this.value,
              steps,
              'onUpdate:value': (nextValue: number | undefined) => {
                value.value = nextValue ?? 1
              },
            },
            {
              content: (input: StepperItemContext) => {
                context = input
                return h('span')
              },
            },
          )
        },
      }
      const wrapper = mount(Host)

      expect(context).toMatchObject({
        hasNext: expect.any(Function),
        hasPrev: expect.any(Function),
      })
      expect(context?.hasNext()).toBe(true)
      context?.nextStep()
      await nextTick()

      expect(wrapper.vm.value).toBe(2)
      expect(context?.isNextDisabled).toBe(true)
      expect(context?.hasNext()).toBe(false)
      context?.nextStep()
      await nextTick()
      expect(wrapper.vm.value).toBe(2)
    })
  })
})
