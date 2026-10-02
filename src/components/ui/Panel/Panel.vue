<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Button } from '@/components/ui/Button'
import { Collapsible } from '@/components/ui/Collapsible'
import { Icon } from '@/components/ui/Icon'
import { useColor } from '@/composables'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { panelVariants } from '.'
import type { PanelContext, PanelProps, PanelSlots } from '.'
import { panelDefaults } from './default'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PanelProps>(), panelDefaults)
defineSlots<PanelSlots>()
const attrs = useAttrs()
const open = defineModel<boolean>('open', { default: false })
const { colorStyle } = useColor(
  computed(() => props.color),
  'panel',
)
const calculatedOpen = computed<boolean>({
  get: () => (props.collapsible ? open.value : true),
  set: (value) => {
    if (props.collapsible) open.value = value
  },
})

const panelContext = computed<PanelContext>(() => {
  return { open: calculatedOpen.value }
})

const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(attrs.class),
    style: [colorStyle.value, attrs.style],
  }
})

const triggerProps = computed(() => ({
  as: props.collapsible ? undefined : 'span',
  color: props.color,
  severity: props.severity,
  variant: props.variant,
  class: cn(
    'w-full',
    calculatedOpen.value && 'rounded-br-none rounded-bl-none',
    !props.collapsible && 'justify-start',
  ),
}))

const buttonProps = computed(() => {
  const triggerUI = useUi(props.ui?.trigger, panelContext.value)

  return {
    ...triggerUI,
    ...triggerProps.value,
    class: cn(triggerUI.class, triggerProps.value.class),
    style: [triggerUI.style, triggerProps.value.style],
  }
})

const iconProps = computed(() => ({ ...props.icon }))

const labelProps = computed(() => {
  const labelUI = useUi(props.ui?.label, panelContext.value)

  return {
    ...labelUI,
    class: cn(labelUI.class),
    style: labelUI.style,
  }
})

const arrowsProps = computed(() => {
  const arrowsUI = useUi(props.ui?.arrows, panelContext.value)

  return {
    ...arrowsUI,
    class: cn('ml-auto shrink-0', arrowsUI.class),
    style: arrowsUI.style,
  }
})

const contentProps = computed(() => {
  const contentUI = useUi(props.ui?.content, panelContext.value)

  return {
    ...contentUI,
    class: cn(
      panelVariants({
        severity: props.severity,
        variant: props.variant,
        color: Boolean(props.color),
      }),
      'rounded-t-none border-t-0 p-[15px] text-card-foreground shadow-none',
      contentUI.class,
    ),
    style: contentUI.style,
  }
})
</script>

<template>
  <Collapsible v-model="calculatedOpen" v-bind="rootProps" data-test-panel-root>
    <template #default>
      <Button v-bind="buttonProps" data-test-panel-trigger data-test-panel-header>
        <span class="flex min-w-0 items-center gap-2">
          <slot name="icon" v-bind="panelContext">
            <Icon
              v-if="iconProps.name"
              v-bind="iconProps"
              :name="iconProps.name"
              data-test-panel-icon
            />
          </slot>

          <span v-if="props.label || $slots.label" v-bind="labelProps" data-test-panel-label>
            <slot name="label" v-bind="panelContext">{{ props.label }}</slot>
          </span>
        </span>

        <span v-if="props.collapsible" v-bind="arrowsProps" data-test-panel-arrows>
          <slot name="arrows" v-bind="panelContext">
            <Icon
              :name="calculatedOpen ? 'chevronUp' : 'chevronDown'"
              size="sm"
              data-test-panel-arrow-icon
            />
          </slot>
        </span>
      </Button>
    </template>

    <template v-if="$slots.default" #content>
      <div v-bind="contentProps" data-test-panel-content>
        <slot v-bind="panelContext" />
      </div>
    </template>
  </Collapsible>
</template>
