<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { getThemeColorStyle } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  meterGroupBodyVariants,
  meterGroupIconVariants,
  meterGroupIndicatorVariants,
  meterGroupItemVariants,
  meterGroupLabelVariants,
  meterGroupLeadingVariants,
  meterGroupListVariants,
  meterGroupStatusVariants,
  meterGroupTrackVariants,
  meterGroupTrailingVariants,
  meterGroupVariants,
  type MeterGroupContext,
  type MeterGroupItemContext,
  type MeterGroupProps,
  type MeterGroupSlots,
} from '.'
import { meterGroupDefaults, meterGroupItemDefaults } from './constants'

defineOptions({ inheritAttrs: false })
defineSlots<MeterGroupSlots>()

const props = withDefaults(defineProps<MeterGroupProps>(), meterGroupDefaults)

const attrs = useAttrs()
const slots = useSlots()

const max = computed(() => (props.max > 0 ? props.max : meterGroupDefaults.max))
const total = computed(() => props.items.reduce((sum, item) => sum + Math.max(0, item.value), 0))
// si la suma supera max, los indicadores se escalan para caber en la pista
const scale = computed(() => (total.value > max.value ? max.value / total.value : 1))

const context = computed<MeterGroupContext>(() => {
  const value = Math.min(max.value, total.value)

  return { value, max: max.value, percentage: (value / max.value) * 100 }
})

const itemContexts = computed<MeterGroupItemContext[]>(() =>
  props.items.map((item, index) => {
    const value = Math.max(0, item.value)

    return { item, index, value, percentage: Math.min(100, (value / max.value) * 100) }
  }),
)

const listedContexts = computed(() => itemContexts.value.filter(hasLabel))

const rootProps = computed(() => ({
  ...attrs,
  class: cn(meterGroupVariants({ size: props.size }), attrs.class),
  style: attrs.style,
}))

const statusProps = computed(() => {
  const ui = useUi(props.ui?.status, context.value)

  return {
    ...ui,
    class: cn(meterGroupStatusVariants(), ui.class),
  }
})

const bodyProps = computed(() => ({
  class: meterGroupBodyVariants({ orientation: props.orientation }),
}))

const trackProps = computed(() => {
  const ui = useUi(props.ui?.track, context.value)

  return {
    ...ui,
    modelValue: context.value.value,
    max: max.value,
    getValueLabel: props.getValueLabel,
    getValueText: props.getValueText,
    role: 'meter',
    class: cn(
      meterGroupTrackVariants({ orientation: props.orientation, size: props.size }),
      ui.class,
    ),
  }
})

const listProps = computed(() => {
  const ui = useUi(props.ui?.list, context.value)

  return {
    ...ui,
    class: cn(meterGroupListVariants({ orientation: props.orientation }), ui.class),
  }
})

function getColorStyle(itemContext: MeterGroupItemContext) {
  return getThemeColorStyle(itemContext.item.color, 'meter-group', meterGroupItemDefaults.color)
}

function getIndicatorProps(itemContext: MeterGroupItemContext) {
  const ui = useUi(props.ui?.indicator, itemContext)
  const size = `${(itemContext.value / max.value) * 100 * scale.value}%`

  return {
    ...ui,
    class: cn(meterGroupIndicatorVariants({ orientation: props.orientation }), ui.class),
    style: [
      getColorStyle(itemContext),
      props.orientation === 'vertical' ? { height: size } : { width: size },
      ui.style,
    ],
  }
}

function getItemProps(itemContext: MeterGroupItemContext) {
  const ui = useUi(props.ui?.item, itemContext)

  return {
    ...ui,
    class: cn(meterGroupItemVariants(), ui.class),
    style: [getColorStyle(itemContext), ui.style],
  }
}

function getLeadingProps(itemContext: MeterGroupItemContext) {
  const ui = useUi(props.ui?.leading, itemContext)

  return {
    ...ui,
    class: cn(meterGroupLeadingVariants({ size: props.size }), ui.class),
    'aria-hidden': true,
  }
}

function getIconProps(itemContext: MeterGroupItemContext) {
  const ui = useUi(props.ui?.leading, itemContext)

  return {
    ...ui,
    name: itemContext.item.icon!,
    class: cn(meterGroupIconVariants({ size: props.size }), ui.class),
    color: itemContext.item.color ?? meterGroupItemDefaults.color,
  }
}

function getLabelProps(itemContext: MeterGroupItemContext) {
  const ui = useUi(props.ui?.label, itemContext)

  return {
    ...ui,
    class: cn(meterGroupLabelVariants(), ui.class),
  }
}

function getTrailingProps(itemContext: MeterGroupItemContext) {
  const ui = useUi(props.ui?.trailing, itemContext)

  return {
    ...ui,
    class: cn(meterGroupTrailingVariants(), ui.class),
  }
}

function getSlotNames(itemContext: MeterGroupItemContext) {
  const slot = itemContext.item.slot
  if (slot === undefined) {
    return { leading: 'leading', label: 'label', trailing: 'trailing' } as const
  }
  return {
    leading: `leading-${slot}`,
    label: `label-${slot}`,
    trailing: `trailing-${slot}`,
  } as const
}

function hasLabel(itemContext: MeterGroupItemContext) {
  return Boolean(itemContext.item.label || slots.label || slots[getSlotNames(itemContext).label])
}

function getKey(itemContext: MeterGroupItemContext) {
  return itemContext.item.slot ?? itemContext.index
}
</script>

<template>
  <div v-bind="rootProps" data-test-meter-group-root>
    <div v-if="props.status" v-bind="statusProps" data-test-meter-group-status>
      <slot name="status" v-bind="context">{{ Math.round(context.percentage) }}%</slot>
    </div>

    <div v-bind="bodyProps" data-test-meter-group-body>
      <ProgressRoot v-bind="trackProps" data-test-meter-group-track>
        <ProgressIndicator
          v-for="itemContext in itemContexts"
          :key="getKey(itemContext)"
          v-bind="getIndicatorProps(itemContext)"
          data-test-meter-group-indicator
        />
      </ProgressRoot>

      <ul v-if="listedContexts.length" v-bind="listProps" data-test-meter-group-list>
        <li
          v-for="itemContext in listedContexts"
          :key="getKey(itemContext)"
          v-bind="getItemProps(itemContext)"
          data-test-meter-group-item
        >
          <slot :name="getSlotNames(itemContext).leading" v-bind="itemContext">
            <slot name="leading" v-bind="itemContext">
              <Icon
                v-if="itemContext.item.icon"
                v-bind="getIconProps(itemContext)"
                data-test-meter-group-icon
              />
              <span v-else v-bind="getLeadingProps(itemContext)" data-test-meter-group-leading />
            </slot>
          </slot>
          <span v-bind="getLabelProps(itemContext)" data-test-meter-group-label>
            <slot :name="getSlotNames(itemContext).label" v-bind="itemContext">
              <slot name="label" v-bind="itemContext">{{ itemContext.item.label }}</slot>
            </slot>
          </span>
          <span v-bind="getTrailingProps(itemContext)" data-test-meter-group-trailing>
            <slot :name="getSlotNames(itemContext).trailing" v-bind="itemContext">
              <slot name="trailing" v-bind="itemContext"
                >{{ Math.round(itemContext.percentage) }}%</slot
              >
            </slot>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
