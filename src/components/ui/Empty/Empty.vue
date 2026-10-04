<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  emptyContentVariants,
  emptyDescriptionVariants,
  emptyHeaderVariants,
  emptyLabelVariants,
  emptyMediaVariants,
  emptyRootVariants,
  emptyDefaults,
} from '.'
import type { EmptyProps, EmptySlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<EmptyProps>(), emptyDefaults)
defineSlots<EmptySlots>()

const attrs = useAttrs()
const mediaVariant = computed(() => props.mediaVariant ?? emptyDefaults.mediaVariant)

const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(emptyRootVariants(), attrs.class),
    style: attrs.style,
  }
})

const headerProps = computed(() => {
  const ui = useUi(props.ui?.header, undefined)
  return {
    ...ui,
    class: cn(emptyHeaderVariants(), ui.class),
    style: ui.style,
  }
})
const mediaProps = computed(() => {
  const ui = useUi(props.ui?.media, undefined)
  return {
    ...ui,
    class: cn(emptyMediaVariants({ variant: mediaVariant.value }), ui.class),
    style: ui.style,
  }
})
const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, undefined)
  return {
    ...ui,
    class: cn(emptyLabelVariants(), ui.class),
    style: ui.style,
  }
})
const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, undefined)
  return {
    ...ui,
    class: cn(emptyDescriptionVariants(), ui.class),
    style: ui.style,
  }
})
const contentProps = computed(() => {
  const ui = useUi(props.ui?.content, undefined)
  return {
    ...ui,
    class: cn(emptyContentVariants(), ui.class),
    style: ui.style,
  }
})
</script>

<template>
  <div v-bind="rootProps" data-test-empty-root>
    <div
      v-if="$slots.media || props.label || $slots.label || props.description || $slots.description"
      v-bind="headerProps"
      data-test-empty-header
    >
      <div
        v-if="$slots.media"
        v-bind="mediaProps"
        data-test-empty-media
        :data-variant="mediaVariant"
      >
        <slot name="media" />
      </div>

      <div v-if="props.label || $slots.label" v-bind="labelProps" data-test-empty-label>
        <slot name="label">{{ props.label }}</slot>
      </div>

      <div
        v-if="props.description || $slots.description"
        v-bind="descriptionProps"
        data-test-empty-description
      >
        <slot name="description">{{ props.description }}</slot>
      </div>
    </div>

    <div v-if="$slots.default" v-bind="contentProps" data-test-empty-content>
      <slot />
    </div>
  </div>
</template>
