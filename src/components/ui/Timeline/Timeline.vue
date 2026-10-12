<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { Primitive } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useTheme } from '@/composables'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { timelineDefaults } from './constants'
import type {
  TimelineEmits,
  TimelineItemContext,
  TimelineProps,
  TimelineSlots,
  TimelineValue,
} from '.'
import {
  timelineContentVariants,
  timelineDescriptionVariants,
  timelineHeaderVariants,
  timelineIndicatorVariants,
  timelineItemVariants,
  timelineLabelVariants,
  timelineSeparatorVariants,
  timelineVariants,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Omit<TimelineProps, 'modelValue'>>(), timelineDefaults)

defineSlots<TimelineSlots>()
const emit = defineEmits<TimelineEmits>()
const attrs = useAttrs()
const model = defineModel<TimelineValue>()
watch(model, (value) => emit('update:modelValue', value))
const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'timeline',
  defaultColor: timelineDefaults.color,
})

const timelineItems = computed(() => (props.reverse ? [...props.items].reverse() : props.items))
const activeIndex = computed(() =>
  timelineItems.value.findIndex((item) => Object.is(item.value, model.value)),
)

const rootProps = computed(() => ({
  ...attrs,
  class: cn(timelineVariants({ orientation: props.orientation }), attrs.class),
  style: attrs.style,
  'data-orientation': props.orientation,
}))

function getItemContext(item: TimelineProps['items'][number], index: number): TimelineItemContext {
  const completed = activeIndex.value >= 0 && index <= activeIndex.value
  return {
    modelValue: model.value,
    item,
    index,
    completed,
    active: Object.is(model.value, item.value),
    first: index === 0,
    last: index === timelineItems.value.length - 1,
    itemAlign: props.align === 'alternate' ? (index % 2 === 0 ? 'left' : 'right') : props.align,
  }
}

function getItemProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.item, context)
  return {
    ...ui,
    class: cn(
      timelineItemVariants({ orientation: props.orientation, align: props.align }),
      ui.class,
    ),
    style: ui.style,
    'data-align': context.itemAlign,
    'data-completed': context.completed || undefined,
  }
}

function getContentProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.content, context)
  return {
    ...ui,
    class: cn(
      timelineContentVariants({
        orientation: props.orientation,
        align: props.align,
        side: context.itemAlign,
      }),
      ui.class,
    ),
    style: ui.style,
  }
}

function getHeaderProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.header, context)
  return {
    ...ui,
    class: cn(timelineHeaderVariants({ orientation: props.orientation }), ui.class),
  }
}

function getSeparatorProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.separator, context)
  const completed = activeIndex.value > context.index
  return {
    ...ui,
    class: cn(
      timelineSeparatorVariants({
        orientation: props.orientation,
        align: props.align,
        side: context.itemAlign,
        completed,
      }),
      ui.class,
    ),
    'aria-hidden': true,
    'data-completed': completed || undefined,
    style: [colorStyle.value, ui.style],
  }
}

function getLabelProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.label, context)
  return {
    ...ui,
    class: cn(timelineLabelVariants(), ui.class),
  }
}

function getDescriptionProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.description, context)
  return {
    ...ui,
    class: cn(timelineDescriptionVariants({ orientation: props.orientation }), ui.class),
  }
}

function getIndicatorProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.indicator, context)
  return {
    ...ui,
    class: cn(
      timelineIndicatorVariants({
        orientation: props.orientation,
        align: props.align,
        side: context.itemAlign,
        size: props.size,
        completed: context.completed,
      }),
      ui.class,
    ),
    'aria-hidden': true,
    'data-completed': context.completed || undefined,
    style: [colorStyle.value, ui.style],
  }
}

function getSlots(context: TimelineItemContext) {
  const key = getKeyItem(context)
  return {
    header: `header-${key}` as `header-${string}`,
    label: `label-${key}` as `label-${string}`,
    description: `description-${key}` as `description-${string}`,
    indicator: `indicator-${key}` as `indicator-${string}`,
  }
}

function getKeyItem(context: TimelineItemContext) {
  return String(context.item.slot ?? context.item.value)
}
const itemContexts = computed(() => timelineItems.value.map(getItemContext))
</script>

<template>
  <Primitive v-bind="rootProps" role="list" data-test-timeline-root>
    <div
      v-for="context in itemContexts"
      :key="getKeyItem(context)"
      v-bind="getItemProps(context)"
      role="listitem"
      data-test-timeline-item
    >
      <div v-bind="getContentProps(context)" data-test-timeline-content>
        <div v-bind="getHeaderProps(context)" data-test-timeline-header>
          <slot :name="getSlots(context).header" v-bind="context">
            <slot name="header" v-bind="context">
              <slot :name="getSlots(context).label" v-bind="context">
                <slot name="label" v-bind="context">
                  <div v-bind="getLabelProps(context)" data-test-timeline-label>
                    {{ context.item.label }}
                  </div>
                </slot>
              </slot>
            </slot>
          </slot>
        </div>

        <div v-bind="getDescriptionProps(context)" data-test-timeline-description>
          <slot :name="getSlots(context).description" v-bind="context">
            <slot name="description" v-bind="context">
              {{ context.item.description }}
            </slot>
          </slot>
        </div>
      </div>

      <div v-bind="getIndicatorProps(context)" data-test-timeline-indicator>
        <slot :name="getSlots(context).indicator" v-bind="context">
          <slot name="indicator" v-bind="context">
            <Icon
              v-if="context.item.icon"
              :name="context.item.icon"
              data-test-timeline-indicator-icon
            />
          </slot>
        </slot>
      </div>

      <div v-bind="getSeparatorProps(context)" data-test-timeline-separator />
    </div>
  </Primitive>
</template>
