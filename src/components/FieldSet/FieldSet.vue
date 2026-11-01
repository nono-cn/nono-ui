<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  fieldSetDefaults,
  fieldSetDescriptionVariants,
  fieldSetGroupVariants,
  fieldSetLegendVariants,
  fieldSetRootVariants,
  type FieldSetProps,
  type FieldSetSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FieldSetProps>(), fieldSetDefaults)
defineSlots<FieldSetSlots>()

const attrs = useAttrs()
const slots = useSlots()

const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(fieldSetRootVariants(), attrs.class),
    style: attrs.style,
  }
})

const legendProps = computed(() => {
  const ui = useUi(props.ui?.legend, undefined)
  return {
    ...ui,
    class: cn(fieldSetLegendVariants({ legendVariant: props.legendVariant }), ui.class),
    style: ui.style,
  }
})

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, undefined)
  return {
    ...ui,
    class: cn(fieldSetDescriptionVariants(), ui.class),
    style: ui.style,
  }
})

const groupProps = computed(() => {
  const ui = useUi(props.ui?.group, undefined)
  return {
    ...ui,
    class: cn(fieldSetGroupVariants(), ui.class),
    style: ui.style,
  }
})
</script>

<template>
  <fieldset v-bind="rootProps" data-test-field-set-root>
    <legend v-if="props.legend || slots.legend" v-bind="legendProps" data-test-field-set-legend>
      <slot name="legend">{{ props.legend }}</slot>
    </legend>

    <p
      v-if="props.description || slots.description"
      v-bind="descriptionProps"
      data-test-field-set-description
    >
      <slot name="description">{{ props.description }}</slot>
    </p>

    <div v-bind="groupProps" data-test-field-set-group>
      <slot />
    </div>
  </fieldset>
</template>
