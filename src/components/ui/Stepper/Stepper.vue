<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperRoot,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables'
import {
  stepperVariants,
  stepperListVariants,
  stepperItemVariants,
  stepperTriggerVariants,
  stepperIndicatorVariants,
  stepperWrapperVariants,
  stepperLabelVariants,
  stepperDescriptionVariants,
  stepperSeparatorVariants,
  stepperContentVariants,
  normalizeStepperRootProps,
} from '.'
import { stepperDefaults } from './constants'
import type {
  StepperContext,
  StepperEmits,
  StepperItemContext,
  StepperProps,
  StepperSlots,
  StepperState,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<StepperProps>(), stepperDefaults)
defineSlots<StepperSlots>()
defineEmits<StepperEmits>()

const attrs = useAttrs()
const slots = useSlots()
const model = defineModel<number>()
const value = computed<number | undefined>({
  get: () => model.value ?? 1,
  set: (nextValue) => {
    model.value = nextValue
  },
})
const currentStepIndex = computed(() => props.steps.findIndex((item) => item.value === value.value))
const nextStepItem = computed(() => {
  if (currentStepIndex.value < 0) return undefined
  return props.steps[currentStepIndex.value + 1]
})
const prevStepItem = computed(() => {
  if (currentStepIndex.value < 0) return undefined
  return props.steps[currentStepIndex.value - 1]
})
const stepper = ref<StepperRootInstance>()
const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'stepper',
  defaultColor: stepperDefaults.color,
})

interface StepperRootInstance {
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  hasNext: () => boolean
  hasPrev: () => boolean
}

function goToStep(step: number) {
  const target = props.steps.find((item) => item.value === step)

  if (props.disabled || !target || target.disabled) return

  stepper.value?.goToStep(step)
}

function nextStep() {
  if (nextStepItem.value) goToStep(nextStepItem.value.value)
}

function prevStep() {
  if (prevStepItem.value) goToStep(prevStepItem.value.value)
}

function hasNext() {
  return Boolean(
    !props.disabled &&
    nextStepItem.value &&
    !nextStepItem.value.disabled &&
    stepper.value?.hasNext(),
  )
}

function hasPrev() {
  return Boolean(
    !props.disabled &&
    prevStepItem.value &&
    !prevStepItem.value.disabled &&
    stepper.value?.hasPrev(),
  )
}

const stepperContext = computed<StepperContext>(() => {
  return {
    modelValue: value.value,
    totalSteps: props.steps.length,
    isNextDisabled:
      props.disabled ||
      currentStepIndex.value < 0 ||
      currentStepIndex.value === props.steps.length - 1 ||
      Boolean(nextStepItem.value?.disabled),
    isPrevDisabled:
      props.disabled || currentStepIndex.value <= 0 || Boolean(prevStepItem.value?.disabled),
    isFirstStep: currentStepIndex.value >= 0 && currentStepIndex.value === 0,
    isLastStep: currentStepIndex.value >= 0 && currentStepIndex.value === props.steps.length - 1,
    goToStep,
    nextStep,
    prevStep,
    hasNext,
    hasPrev,
  }
})

const rootProps = computed(() => {
  return {
    ...attrs,
    ...normalizeStepperRootProps(props),
    'data-slot': 'stepper',
    'data-test-stepper-root': '',
    class: cn(stepperVariants({ size: props.size }), attrs.class),
    style: [colorStyle.value, attrs.style],
  }
})

const listProps = computed(() => {
  const listUI = useUi(props.ui?.list, stepperContext.value)

  return {
    ...listUI,
    'data-slot': 'stepper-list',
    'data-test-stepper-list': '',
    class: cn(
      stepperListVariants({ orientation: props.orientation, size: props.size }),
      listUI.class,
    ),
    style: listUI.style,
  }
})

function getStepContext(
  step: NonNullable<StepperProps['steps']>[number],
  index: number,
): StepperItemContext {
  const currentStep = value.value
  const completed = currentStep !== undefined && step.value < currentStep
  return {
    ...stepperContext.value,
    item: step,
    index,
    completed,
    active: !completed && step.value === currentStep,
    first: index === 0,
    last: index === props.steps.length - 1,
  }
}

function getSlotNames(context: StepperItemContext) {
  const slot = String(context.item.slot ?? context.item.value)
  return {
    indicator: `indicator-${slot}`,
    label: `label-${slot}`,
    description: `description-${slot}`,
    content: `content-${slot}`,
  } as const
}

function getState(context: StepperItemContext): StepperState {
  if (context.completed) return 'completed'
  if (context.active) return 'active'
  return 'inactive'
}

function isDisabled(context: StepperItemContext) {
  return Boolean(props.disabled || context.item.disabled)
}

function getItemProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.item, context)
  const disabled = isDisabled(context)
  return {
    ...ui,
    step: context.item.value,
    disabled,
    'data-slot': 'stepper-item',
    'data-test-stepper-item': context.item.slot ?? context.item.value,
    class: cn(stepperItemVariants({ orientation: props.orientation, disabled }), ui.class),
    style: ui.style,
  }
}

function getTriggerProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.trigger, context)
  return {
    ...ui,
    'data-slot': 'stepper-trigger',
    'data-test-stepper-trigger': context.item.slot ?? context.item.value,
    class: cn(stepperTriggerVariants({ orientation: props.orientation }), ui.class),
    style: ui.style,
  }
}

function getIndicatorProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.indicator, context)
  return {
    ...ui,
    'data-slot': 'stepper-indicator',
    'data-test-stepper-indicator': context.item.slot ?? context.item.value,
    class: cn(
      stepperIndicatorVariants({
        size: props.size,
        state: getState(context),
        disabled: isDisabled(context),
      }),
      ui.class,
    ),
    style: ui.style,
  }
}

function getWrapperProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.wrapper, context)
  return {
    ...ui,
    'data-slot': 'stepper-wrapper',
    'data-test-stepper-wrapper': context.item.slot ?? context.item.value,
    class: cn(stepperWrapperVariants({ orientation: props.orientation }), ui.class),
    style: ui.style,
  }
}

function getLabelProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.label, context)
  return {
    ...ui,
    'data-slot': 'stepper-title',
    'data-test-stepper-title': context.item.slot ?? context.item.value,
    class: cn(stepperLabelVariants({ orientation: props.orientation, size: props.size }), ui.class),
    style: ui.style,
  }
}

function getDescriptionProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.description, context)
  return {
    ...ui,
    'data-slot': 'stepper-description',
    'data-test-stepper-description': context.item.slot ?? context.item.value,
    class: cn(
      stepperDescriptionVariants({ orientation: props.orientation, size: props.size }),
      ui.class,
    ),
    style: ui.style,
  }
}

function getSeparatorProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.separator, context)
  return {
    ...ui,
    'data-slot': 'stepper-separator',
    'data-test-stepper-separator': context.item.slot ?? context.item.value,
    class: cn(
      stepperSeparatorVariants({
        orientation: props.orientation,
        state: getState(context),
        disabled: isDisabled(context),
      }),
      ui.class,
    ),
    style: ui.style,
  }
}

function getContentProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.content, context)
  return {
    ...ui,
    'data-slot': 'stepper-content',
    'data-test-stepper-content': context.item.slot ?? context.item.value,
    class: cn(stepperContentVariants({ orientation: props.orientation }), ui.class),
    style: ui.style,
  }
}

function showWrapper(context: StepperItemContext) {
  const slotNames = getSlotNames(context)
  const step = context.item
  return Boolean(
    step.label ||
    step.description ||
    slots.label ||
    slots.description ||
    slots[slotNames.label] ||
    slots[slotNames.description],
  )
}

function showLabel(context: StepperItemContext) {
  return Boolean(context.item.label || slots.label || slots[getSlotNames(context).label])
}

function showDescription(context: StepperItemContext) {
  return Boolean(
    context.item.description || slots.description || slots[getSlotNames(context).description],
  )
}

function showContent(context: StepperItemContext) {
  return Boolean(slots.content || slots[getSlotNames(context).content])
}

function getKey(context: StepperItemContext) {
  return String(context.item.slot ?? context.item.value)
}

const stepContexts = computed(() => props.steps.map(getStepContext))
</script>

<template>
  <StepperRoot ref="stepper" v-bind="rootProps" v-model="value">
    <div v-bind="listProps">
      <StepperItem
        v-for="context in stepContexts"
        :key="getKey(context)"
        v-bind="getItemProps(context)"
      >
        <StepperTrigger v-bind="getTriggerProps(context)">
          <StepperIndicator v-bind="getIndicatorProps(context)">
            <slot :name="getSlotNames(context).indicator" v-bind="context">
              <slot name="indicator" v-bind="context">
                <Icon
                  v-if="context.item.icon"
                  :name="context.item.icon"
                  :size="props.size"
                  data-slot="stepper-icon"
                  :data-test-stepper-icon="context.item.slot ?? context.item.value"
                />
                <span v-else>{{ context.item.value }}</span>
              </slot>
            </slot>
          </StepperIndicator>

          <div v-if="showWrapper(context)" v-bind="getWrapperProps(context)">
            <StepperTitle v-if="showLabel(context)" v-bind="getLabelProps(context)">
              <slot :name="getSlotNames(context).label" v-bind="context">
                <slot name="label" v-bind="context">
                  {{ context.item.label }}
                </slot>
              </slot>
            </StepperTitle>

            <StepperDescription
              v-if="showDescription(context)"
              v-bind="getDescriptionProps(context)"
            >
              <slot :name="getSlotNames(context).description" v-bind="context">
                <slot name="description" v-bind="context">
                  {{ context.item.description }}
                </slot>
              </slot>
            </StepperDescription>
          </div>
        </StepperTrigger>

        <template v-if="!context.last">
          <StepperSeparator v-bind="getSeparatorProps(context)" />
        </template>
      </StepperItem>
    </div>

    <template v-for="context in stepContexts" :key="`content-${getKey(context)}`">
      <div
        v-if="context.item.value === value && showContent(context)"
        v-bind="getContentProps(context)"
      >
        <slot :name="getSlotNames(context).content" v-bind="context">
          <slot name="content" v-bind="context" />
        </slot>
      </div>
    </template>
  </StepperRoot>
</template>
