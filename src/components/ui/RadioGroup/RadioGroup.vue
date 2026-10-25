<script setup lang="ts">
import { computed, useAttrs, useId, useSlots } from 'vue'
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot, type AcceptableValue } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useTheme } from '@/composables'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  radioGroupBaseVariants,
  radioGroupContainerVariants,
  radioGroupDescriptionVariants,
  radioGroupIconVariants,
  radioGroupIndicatorVariants,
  radioGroupItemVariants,
  radioGroupLabelVariants,
  radioGroupLegendVariants,
  radioGroupListVariants,
  radioGroupVariants,
  radioGroupWrapperVariants,
  type RadioGroupContext,
  type RadioGroupEmits,
  type RadioGroupItemContext,
  type RadioGroupProps,
  type RadioGroupSlots,
  type RadioGroupValue,
} from '.'
import { radioGroupDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<RadioGroupProps>(), radioGroupDefaults)
defineSlots<RadioGroupSlots>()
const emit = defineEmits<RadioGroupEmits>()

const attrs = useAttrs()
const slots = useSlots()
const modelValue = defineModel<RadioGroupValue>()
const id = useId()
const legendId = `${id}-legend`

const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'radio-group',
  defaultColor: radioGroupDefaults.color,
})

const context = computed<RadioGroupContext>(() => ({
  value: modelValue.value,
  disabled: props.disabled,
}))

const itemContexts = computed<RadioGroupItemContext[]>(() =>
  props.items.map((item, index) => ({
    item,
    index,
    checked: Object.is(modelValue.value, item.value),
    disabled: props.disabled || Boolean(item.disabled),
  })),
)

const hasLegend = computed(() => Boolean(props.legend || slots.legend))

const rootProps = computed(() => ({
  ...attrs,
  disabled: props.disabled,
  loop: props.loop,
  name: props.name,
  required: props.required,
  orientation: props.orientation,
  'aria-labelledby': hasLegend.value ? legendId : attrs['aria-labelledby'],
  class: cn(radioGroupVariants(), attrs.class),
  style: [colorStyle.value, attrs.style],
}))

const legendProps = computed(() => {
  const ui = useUi(props.ui?.legend, context.value)

  return {
    ...ui,
    id: legendId,
    class: cn(radioGroupLegendVariants({ size: props.size }), ui.class),
  }
})

const listProps = computed(() => {
  const ui = useUi(props.ui?.list, context.value)

  return {
    ...ui,
    class: cn(
      radioGroupListVariants({
        orientation: props.orientation,
        variant: props.variant,
        size: props.size,
      }),
      ui.class,
    ),
  }
})

function getItemProps(itemContext: RadioGroupItemContext) {
  const ui = useUi(props.ui?.item, itemContext)

  return {
    ...ui,
    class: cn(
      radioGroupItemVariants({
        variant: props.variant,
        orientation: props.orientation,
        indicator: props.indicator,
        size: props.size,
        disabled: itemContext.disabled,
      }),
      ui.class,
    ),
  }
}

function getContainerProps(itemContext: RadioGroupItemContext) {
  const ui = useUi(props.ui?.container, itemContext)

  return {
    ...ui,
    class: cn(
      radioGroupContainerVariants({ size: props.size, indicator: props.indicator }),
      ui.class,
    ),
  }
}

function getBaseProps(itemContext: RadioGroupItemContext) {
  const ui = useUi(props.ui?.base, itemContext)

  return {
    ...ui,
    value: itemContext.item.value,
    disabled: itemContext.disabled,
    'aria-labelledby': hasLabel(itemContext) ? getPartId(itemContext, 'label') : undefined,
    'aria-describedby': hasDescription(itemContext)
      ? getPartId(itemContext, 'description')
      : undefined,
    class: cn(
      radioGroupBaseVariants({
        size: props.size,
        variant: props.variant,
        indicator: props.indicator,
      }),
      ui.class,
    ),
  }
}

function getIndicatorProps(itemContext: RadioGroupItemContext) {
  const ui = useUi(props.ui?.indicator, itemContext)

  return {
    ...ui,
    class: cn(radioGroupIndicatorVariants({ size: props.size }), ui.class),
  }
}

function getWrapperProps(itemContext: RadioGroupItemContext) {
  const ui = useUi(props.ui?.wrapper, itemContext)

  return {
    ...ui,
    class: cn(radioGroupWrapperVariants({ indicator: props.indicator }), ui.class),
  }
}

function getIconProps(itemContext: RadioGroupItemContext) {
  const ui = useUi(props.ui?.icon, itemContext)

  return {
    ...ui,
    name: itemContext.item.icon!,
    color: 'currentColor',
    class: cn(radioGroupIconVariants({ size: props.size }), ui.class),
  }
}

function getLabelProps(itemContext: RadioGroupItemContext) {
  const ui = useUi(props.ui?.label, itemContext)

  return {
    ...ui,
    id: getPartId(itemContext, 'label'),
    class: cn(radioGroupLabelVariants(), ui.class),
  }
}

function getDescriptionProps(itemContext: RadioGroupItemContext) {
  const ui = useUi(props.ui?.description, itemContext)

  return {
    ...ui,
    id: getPartId(itemContext, 'description'),
    class: cn(radioGroupDescriptionVariants(), ui.class),
  }
}

function hasLabel(itemContext: RadioGroupItemContext) {
  return Boolean(itemContext.item.label || slots.label)
}

function hasDescription(itemContext: RadioGroupItemContext) {
  return Boolean(itemContext.item.description || slots.description)
}

function hasIcon(itemContext: RadioGroupItemContext) {
  return props.indicator === 'hidden' && Boolean(itemContext.item.icon)
}

function getPartId(itemContext: RadioGroupItemContext, part: 'label' | 'description') {
  return `${id}-${itemContext.index}-${part}`
}

function onUpdateModelValue(value: AcceptableValue) {
  if (typeof value !== 'string' && typeof value !== 'number') return
  if (Object.is(value, modelValue.value)) return
  modelValue.value = value
  emit('change', value)
}

function getKey(itemContext: RadioGroupItemContext) {
  return String(itemContext.item.value)
}
</script>

<template>
  <RadioGroupRoot
    :model-value="modelValue"
    v-bind="rootProps"
    data-test-radio-group-root
    @update:model-value="onUpdateModelValue"
  >
    <span v-if="hasLegend" v-bind="legendProps" data-test-radio-group-legend>
      <slot name="legend" v-bind="context">{{ props.legend }}</slot>
    </span>

    <div v-bind="listProps" data-test-radio-group-list>
      <label
        v-for="itemContext in itemContexts"
        :key="getKey(itemContext)"
        v-bind="getItemProps(itemContext)"
        data-test-radio-group-item
      >
        <span v-bind="getContainerProps(itemContext)" data-test-radio-group-container>
          <RadioGroupItem v-bind="getBaseProps(itemContext)" data-test-radio-group-base>
            <RadioGroupIndicator
              v-bind="getIndicatorProps(itemContext)"
              data-test-radio-group-indicator
            />
          </RadioGroupItem>
        </span>

        <span v-bind="getWrapperProps(itemContext)" data-test-radio-group-wrapper>
          <Icon
            v-if="hasIcon(itemContext)"
            v-bind="getIconProps(itemContext)"
            data-test-radio-group-icon
          />
          <span
            v-if="hasLabel(itemContext)"
            v-bind="getLabelProps(itemContext)"
            data-test-radio-group-label
          >
            <slot name="label" v-bind="itemContext">{{ itemContext.item.label }}</slot>
          </span>
          <span
            v-if="hasDescription(itemContext)"
            v-bind="getDescriptionProps(itemContext)"
            data-test-radio-group-description
          >
            <slot name="description" v-bind="itemContext">{{ itemContext.item.description }}</slot>
          </span>
        </span>
      </label>
    </div>
  </RadioGroupRoot>
</template>
