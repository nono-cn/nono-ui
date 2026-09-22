<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { emptyDefaults } from './default'
import type { EmptyProps, EmptySlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<EmptyProps>(), emptyDefaults)
defineSlots<EmptySlots>()

const attrs = useAttrs()

const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(
      'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center md:p-12',
      attrs.class,
    ),
    style: attrs.style,
  }
})

const headerProps = computed(() => {
  const ui = useUi(props.ui?.header, undefined)
  return {
    ...ui,
    class: cn('flex max-w-sm flex-col items-center gap-2 text-center', ui.class),
    style: ui.style,
  }
})
const mediaProps = computed(() => {
  const ui = useUi(props.ui?.media, undefined)
  return {
    ...ui,
    class: cn(
      props.mediaVariant === 'icon' &&
        'flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*=size-])]:size-6',
      ui.class,
    ),
    style: ui.style,
  }
})
const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, undefined)
  return {
    ...ui,
    class: cn('text-lg font-medium tracking-tight', ui.class),
    style: ui.style,
  }
})
const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, undefined)
  return {
    ...ui,
    class: cn(
      'text-sm/relaxed text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary',
      ui.class,
    ),
    style: ui.style,
  }
})
const contentProps = computed(() => {
  const ui = useUi(props.ui?.content, undefined)
  return {
    ...ui,
    class: cn('flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm', ui.class),
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
        :data-variant="props.mediaVariant"
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







