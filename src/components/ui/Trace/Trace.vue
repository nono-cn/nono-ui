<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  traceContentVariants,
  traceDescriptionVariants,
  traceIconDropdownVariants,
  traceIconVariants,
  traceItemVariants,
  traceLabelVariants,
  traceTriggerVariants,
  traceVariants,
  type TraceItem,
  type TraceItemContext,
  type TraceProps,
  type TraceSlots,
} from '.'
import { traceDefaults, traceStatusIcons } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Omit<TraceProps, 'modelValue'>>(), traceDefaults)
defineSlots<TraceSlots>()

const slots = useSlots()
const attrs = useAttrs()
const model = defineModel<string[]>({ default: () => [] })

const rootProps = computed(() => ({
  ...attrs,
  class: cn(traceVariants(), attrs.class),
  style: attrs.style,
}))

function getKeyItem(item: TraceItem) {
  return item.slot ?? item.value
}

function getSlots(context: TraceItemContext) {
  const key = getKeyItem(context.item)
  return {
    icon: `icon-${key}` as const,
    label: `label-${key}` as const,
    description: `description-${key}` as const,
    content: `content-${key}` as const,
  }
}

function getItemContext(item: TraceItem, index: number): TraceItemContext {
  return {
    item,
    index,
    status: item.status ?? 'pending',
    open: model.value.includes(item.value),
    collapsible: Boolean(item.content || slots[`content-${getKeyItem(item)}`] || slots.content),
    first: index === 0,
    last: index === props.items.length - 1,
  }
}

const itemContexts = computed(() => props.items.map(getItemContext))

function setOpen(context: TraceItemContext, open: boolean) {
  const others = model.value.filter((value) => value !== context.item.value)
  model.value = open ? [...others, context.item.value] : others
}

function getItemProps(context: TraceItemContext) {
  const ui = useUi(props.ui?.item, context)
  return {
    ...ui,
    open: context.open,
    disabled: context.item.disabled || !context.collapsible,
    unmountOnHide: props.unmountOnHide,
    class: cn(traceItemVariants(), ui.class),
    'data-status': context.status,
  }
}

function getTriggerProps(context: TraceItemContext) {
  const ui = useUi(props.ui?.trigger, context)
  return {
    ...ui,
    class: cn(traceTriggerVariants({ collapsible: context.collapsible }), ui.class),
  }
}

function getIconProps(context: TraceItemContext) {
  const ui = useUi(props.ui?.icon, context)
  return {
    ...ui,
    'aria-hidden': true,
    class: cn(traceIconVariants({ status: context.status }), ui.class),
  }
}

function getLabelProps(context: TraceItemContext) {
  const ui = useUi(props.ui?.label, context)
  return {
    ...ui,
    class: cn(traceLabelVariants(), ui.class),
  }
}

function getDescriptionProps(context: TraceItemContext) {
  const ui = useUi(props.ui?.description, context)
  return {
    ...ui,
    class: cn(traceDescriptionVariants(), ui.class),
  }
}

function getContentProps(context: TraceItemContext) {
  const ui = useUi(props.ui?.content, context)
  return {
    ...ui,
    class: cn(traceContentVariants(), ui.class),
  }
}

function getIconName(context: TraceItemContext) {
  return context.item.icon ?? traceStatusIcons[context.status]
}

function getIconDropdownName(context: TraceItemContext) {
  return context.open ? props.iconDropDownOpen : props.iconDropDownClose
}
</script>

<template>
  <ul v-bind="rootProps" data-test-trace-root>
    <CollapsibleRoot
      v-for="context in itemContexts"
      :key="context.item.value"
      v-bind="getItemProps(context)"
      as="li"
      :data-test-trace-item="context.item.value"
      @update:open="setOpen(context, $event)"
    >
      <component
        :is="context.collapsible ? CollapsibleTrigger : 'div'"
        v-bind="getTriggerProps(context)"
        :data-test-trace-trigger="context.item.value"
      >
        <span v-bind="getIconProps(context)" :data-test-trace-icon="context.item.value">
          <slot :name="getSlots(context).icon" v-bind="context">
            <slot name="icon" v-bind="context">
              <Icon :name="getIconName(context)" size="sm" />
            </slot>
          </slot>
        </span>

        <span class="flex min-w-0 flex-1 flex-col gap-0.5">
          <span v-bind="getLabelProps(context)" :data-test-trace-label="context.item.value">
            <slot :name="getSlots(context).label" v-bind="context">
              <slot name="label" v-bind="context">{{ context.item.label }}</slot>
            </slot>
          </span>

          <span
            v-if="
              context.item.description ||
              $slots[getSlots(context).description] ||
              $slots.description
            "
            v-bind="getDescriptionProps(context)"
            :data-test-trace-description="context.item.value"
          >
            <slot :name="getSlots(context).description" v-bind="context">
              <slot name="description" v-bind="context">{{ context.item.description }}</slot>
            </slot>
          </span>
        </span>

        <span
          v-if="context.collapsible"
          :class="traceIconDropdownVariants()"
          aria-hidden="true"
          :data-test-trace-icon-dropdown="context.item.value"
        >
          <slot name="iconDropdown" v-bind="context">
            <Icon :name="getIconDropdownName(context)" size="sm" />
          </slot>
        </span>
      </component>

      <CollapsibleContent
        v-if="context.collapsible"
        v-bind="getContentProps(context)"
        :data-test-trace-content="context.item.value"
      >
        <slot :name="getSlots(context).content" v-bind="context">
          <slot name="content" v-bind="context">{{ context.item.content }}</slot>
        </slot>
      </CollapsibleContent>
    </CollapsibleRoot>
  </ul>
</template>
