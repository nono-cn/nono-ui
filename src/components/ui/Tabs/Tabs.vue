<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useTheme } from '@/composables'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { tabsVariants } from '.'
import { tabsDefaults } from './constants'
import type { TabsContext, TabsEmits, TabsItemContext, TabsProps, TabsSlots, TabsValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TabsProps>(), tabsDefaults)
defineSlots<TabsSlots>()
defineEmits<TabsEmits>()

const attrs = useAttrs()
const modelValue = defineModel<TabsValue>()
const tabsContext = computed<TabsContext>(() => ({ tabs: props.tabs }))
const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'tabs',
  defaultColor: tabsDefaults.color,
})

const rootProps = computed(() => {
  return {
    ...attrs,
    orientation: props.orientation,
    activationMode: props.activationMode,
    unmountOnHide: props.unmountOnHide,
    as: 'div' as const,
    asChild: false,
    'data-variant': props.variant,
    class: cn(tabsVariants.root({ orientation: props.orientation }), attrs.class),
    style: [colorStyle.value, attrs.style],
  }
})

const listProps = computed(() => {
  const ui = useUi(props.ui?.list, undefined)

  return {
    ...ui,
    loop: props.loop,
    'data-variant': props.variant,
    class: cn(
      tabsVariants.list({ variant: props.variant, orientation: props.orientation }),
      ui.class,
    ),
    style: ui.style,
  }
})

const contentWrapperProps = computed(() => {
  const ui = useUi(props.ui?.contentWrapper, undefined)
  return { ...ui, class: cn(tabsVariants.contentWrapper(), ui.class), style: ui.style }
})

const itemContexts = computed<TabsItemContext[]>(() =>
  props.tabs.map((tab, index) => ({
    tab,
    index,
    active: Object.is(modelValue.value, tab.value),
    first: index === 0,
    last: index === props.tabs.length - 1,
  })),
)

function getTabsContext(): TabsContext {
  return tabsContext.value
}

function getTriggerProps(context: TabsItemContext) {
  const ui = useUi(props.ui?.trigger, context)

  return {
    ...ui,
    value: context.tab.value,
    disabled: context.tab.disabled,
    class: cn(
      tabsVariants.trigger({ variant: props.variant, orientation: props.orientation }),
      ui.class,
    ),
    'data-variant': props.variant,
    style: ui.style,
  }
}

function getLabelProps(context: TabsItemContext) {
  const ui = useUi(props.ui?.label, context)
  return { ...ui, class: cn(ui.class), style: ui.style }
}

function getContentProps(context: TabsItemContext) {
  const normalizedUI = useUi(props.ui?.content, context)
  const { dir: contentDirection, ...ui } = normalizedUI
  void contentDirection

  return {
    ...ui,
    tabindex: ui.tabindex ?? 0,
    value: context.tab.value,
    forceMount: context.tab.forceMount,
    class: cn(tabsVariants.content(), ui.class),
    style: ui.style,
  }
}

function getSlotNames(context: TabsItemContext) {
  const key = getKey(context)
  return {
    trigger: `trigger-${key}` as `trigger-${string}`,
    leading: `leading-${key}` as `leading-${string}`,
    label: `label-${key}` as `label-${string}`,
    trailing: `trailing-${key}` as `trailing-${string}`,
    content: `content-${key}` as `content-${string}`,
  }
}

function getKey(context: TabsItemContext) {
  return context.tab.slot
}
</script>

<template>
  <TabsRoot v-model="modelValue" v-bind="rootProps" data-test-tabs-root>
    <TabsList v-bind="listProps" data-test-tabs-list>
      <TabsTrigger
        v-for="itemContext in itemContexts"
        :key="getKey(itemContext)"
        v-bind="getTriggerProps(itemContext)"
        data-test-tabs-trigger
      >
        <slot :name="getSlotNames(itemContext).trigger" v-bind="itemContext">
          <slot name="trigger" v-bind="getTabsContext()">
            <slot :name="getSlotNames(itemContext).leading" v-bind="itemContext">
              <slot name="leading" v-bind="getTabsContext()">
                <Icon
                  v-if="itemContext.tab.icon"
                  :name="itemContext.tab.icon"
                  color="currentColor"
                />
              </slot>
            </slot>

            <slot :name="getSlotNames(itemContext).label" v-bind="itemContext">
              <slot name="label" v-bind="getTabsContext()">
                <span v-if="itemContext.tab.label" v-bind="getLabelProps(itemContext)">
                  {{ itemContext.tab.label }}
                </span>
              </slot>
            </slot>

            <slot :name="getSlotNames(itemContext).trailing" v-bind="itemContext">
              <slot name="trailing" v-bind="getTabsContext()">
                <Icon
                  v-if="itemContext.tab.trailingIcon"
                  :name="itemContext.tab.trailingIcon"
                  color="currentColor"
                />
              </slot>
            </slot>
          </slot>
        </slot>
      </TabsTrigger>
    </TabsList>

    <div v-bind="contentWrapperProps" data-test-tabs-content-wrapper>
      <TabsContent
        v-for="itemContext in itemContexts"
        :key="getKey(itemContext)"
        v-bind="getContentProps(itemContext)"
        data-test-tabs-content
      >
        <slot :name="getSlotNames(itemContext).content" v-bind="itemContext">
          <slot name="content" v-bind="getTabsContext()"> </slot>
        </slot>
      </TabsContent>
    </div>
  </TabsRoot>
</template>
