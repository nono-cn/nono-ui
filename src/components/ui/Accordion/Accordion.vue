<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { AccordionItemContext, AccordionProps, AccordionSlots, AccordionValue } from '.'
import { createAccordionItemContext } from '.'
import { accordionDefaults } from './default'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AccordionProps>(), accordionDefaults)
defineSlots<AccordionSlots>()

const model = defineModel<AccordionValue>('value')
const attrs = useAttrs()

const rootProps = computed(() => {
  const { dir: rootDirection, ...rootAttrs } = attrs
  void rootDirection

  return {
    ...rootAttrs,
    type: props.type,
    collapsible: props.collapsible,
    disabled: props.disabled,
    unmountOnHide: props.unmountOnHide,
    as: 'div' as const,
    asChild: false,
    class: cn(attrs.class),
    style: attrs.style,
  }
})

function getItemContext(
  item: NonNullable<AccordionProps['items']>[number],
  index: number,
): AccordionItemContext {
  return createAccordionItemContext(item, index, model.value, props.items.length)
}

function getItemProps(context: AccordionItemContext) {
  const itemUI = useUi(props.ui?.item, context)
  return {
    ...itemUI,
    value: context.item.value,
    disabled: context.item.disabled,
    unmountOnHide: context.item.unmountOnHide ?? props.unmountOnHide,
    class: cn('border-b border-border last:border-b-0', itemUI.class),
    style: itemUI.style,
  }
}

function getTriggerProps(context: AccordionItemContext) {
  const ui = useUi(props.ui?.trigger, context)
  return {
    ...ui,
    class: cn(
      'flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
      ui.class,
    ),
    style: ui.style,
  }
}

function getContentProps(context: AccordionItemContext) {
  const ui = useUi(props.ui?.content, context)
  return {
    ...ui,
    class: cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      ui.class,
    ),
    style: ui.style,
  }
}

function getSlots(context: AccordionItemContext) {
  const key = context.item.slot

  if (!key) return {}

  return {
    trigger: `trigger-${key}` as const,
    leading: `leading-${key}` as const,
    label: `label-${key}` as const,
    content: `content-${key}` as const,
  }
}

const itemContexts = computed(() => props.items.map(getItemContext))

function getIconProps(context: AccordionItemContext) {
  return context.item.icon
}

function getIconDropdownProps(context: AccordionItemContext) {
  return context.open ? props.iconDropDownOpen : props.iconDropDownClose
}
</script>

<template>
  <AccordionRoot v-model="model" v-bind="rootProps" data-test-accordion-root>
    <AccordionItem
      v-for="context in itemContexts"
      :key="context.item.value"
      v-bind="getItemProps(context)"
      :data-test-accordion-item="context.item.value"
    >
      <AccordionHeader class="flex">
        <AccordionTrigger
          v-bind="getTriggerProps(context)"
          :data-test-accordion-trigger="context.item.value"
        >
          <span class="flex min-w-0 flex-1 items-start gap-2">
            <slot :name="getSlots(context).trigger" v-bind="context">
              <slot name="trigger" v-bind="context">
                <slot :name="getSlots(context).leading" v-bind="context">
                  <slot name="leading" v-bind="context">
                    <Icon
                      v-if="getIconProps(context)"
                      v-bind="getIconProps(context)!"
                      :data-test-accordion-icon="context.item.value"
                    />
                  </slot>
                </slot>
                <slot :name="getSlots(context).label" v-bind="context">
                  <slot name="label" v-bind="context">
                    <span :data-test-accordion-label="context.item.value">
                      {{ context.item.label }}
                    </span>
                  </slot>
                </slot>
              </slot>
            </slot>
          </span>
          <slot name="iconDropdown" v-bind="context">
            <Icon
              v-if="getIconDropdownProps(context)"
              v-bind="getIconDropdownProps(context)!"
              :data-test-accordion-icon-dropdown="context.item.value"
            />
          </slot>
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent
        v-bind="getContentProps(context)"
        :data-test-accordion-content="context.item.value"
      >
        <div class="pt-0 pb-4">
          <slot :name="getSlots(context).content" v-bind="context">
            <slot name="content" v-bind="context">
              <span :data-test-accordion-description="context.item.value">
                {{ context.item.description }}
              </span>
            </slot>
          </slot>
        </div>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
