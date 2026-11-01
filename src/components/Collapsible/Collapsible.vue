<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { type CollapsibleContext, type CollapsibleProps, type CollapsibleSlots } from '.'
import { collapsibleDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CollapsibleProps>(), collapsibleDefaults)
defineSlots<CollapsibleSlots>()

const attrs = useAttrs()
const modelValue = defineModel<boolean>({ default: false })

const collapsibleContext = computed<CollapsibleContext>(() => ({ open: modelValue.value }))

const rootProps = computed(() => {
  return {
    ...attrs,
    as: 'div' as const,
    asChild: false,
    disabled: props.disabled,
    unmountOnHide: props.unmountOnHide,
    class: attrs.class,
    style: attrs.style,
  }
})

const contentProps = computed(() => {
  const normalizedContentUI = useUi(props.ui?.content, collapsibleContext.value)
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  void contentDirection

  return {
    ...contentUI,
    class: contentUI.class,
    style: contentUI.style,
  }
})
</script>

<template>
  <CollapsibleRoot v-model:open="modelValue" v-bind="rootProps" data-test-collapsible-root>
    <CollapsibleTrigger as-child data-test-collapsible-trigger>
      <slot v-bind="collapsibleContext" />
    </CollapsibleTrigger>

    <CollapsibleContent v-if="$slots.content" v-bind="contentProps" data-test-collapsible-content>
      <slot name="content" v-bind="collapsibleContext" />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
