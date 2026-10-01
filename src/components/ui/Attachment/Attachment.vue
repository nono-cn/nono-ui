<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  attachmentActionsVariants,
  attachmentContentVariants,
  attachmentDescriptionVariants,
  attachmentLabelVariants,
  attachmentMediaVariants,
  attachmentVariants,
  type AttachmentContext,
  type AttachmentProps,
  type AttachmentSlots,
} from '.'
import { attachmentDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AttachmentProps>(), attachmentDefaults)
defineSlots<AttachmentSlots>()

const attrs = useAttrs()
const slots = useSlots()
const attachmentContext = computed<AttachmentContext>(() => ({ state: props.state }))

const rootProps = computed(() => {
  return {
    ...attrs,
    'data-orientation': props.orientation,
    'data-size': props.size,
    'data-state': props.state,
    class: cn(
      attachmentVariants({
        orientation: props.orientation,
        size: props.size,
        state: props.state,
      }),
      attrs.class,
    ),
    style: attrs.style,
  }
})

const mediaProps = computed(() => {
  const ui = useUi(props.ui?.media, attachmentContext.value)

  return {
    ...ui,
    class: cn(
      attachmentMediaVariants({
        orientation: props.orientation,
        size: props.size,
        variant: props.mediaVariant,
        state: props.state,
      }),
      ui.class,
    ),
  }
})

const mediaIconProps = computed(() => {
  if (props.state === 'uploading') {
    return {
      name: 'spinner' as const,
      size: props.size,
      class: 'animate-spin',
    }
  }

  if (!props.icon) return undefined

  return { name: props.icon, size: props.size }
})

const hasMedia = computed(() => {
  if (props.mediaVariant === 'image') return Boolean(slots.media)
  return Boolean(mediaIconProps.value?.name)
})

const contentProps = computed(() => {
  const ui = useUi(props.ui?.content, attachmentContext.value)
  return {
    ...ui,
    class: cn(attachmentContentVariants({ orientation: props.orientation }), ui.class),
  }
})

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, attachmentContext.value)
  return {
    ...ui,
    class: cn(attachmentLabelVariants({ size: props.size, state: props.state }), ui.class),
  }
})

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, attachmentContext.value)
  return {
    ...ui,
    class: cn(attachmentDescriptionVariants({ size: props.size, state: props.state }), ui.class),
  }
})

const actionsProps = computed(() => {
  const ui = useUi(props.ui?.actions, attachmentContext.value)
  return {
    ...ui,
    class: cn(
      attachmentActionsVariants({ orientation: props.orientation, size: props.size }),
      ui.class,
    ),
  }
})
</script>

<template>
  <div v-bind="rootProps" data-test-attachment-root>
    <div
      v-if="hasMedia"
      v-bind="mediaProps"
      data-test-attachment-media
      :data-variant="props.mediaVariant"
    >
      <template v-if="props.mediaVariant === 'image'">
        <slot name="media" v-bind="attachmentContext" />
        <span
          v-if="props.state === 'uploading'"
          class="absolute inset-0 flex items-center justify-center bg-background/60"
          data-test-attachment-uploading-overlay
        >
          <Icon name="spinner" :size="props.size" class="animate-spin" data-test-attachment-icon />
        </span>
      </template>
      <Icon v-else-if="mediaIconProps?.name" v-bind="mediaIconProps" data-test-attachment-icon />
    </div>

    <div
      v-if="props.label || props.description || $slots.label || $slots.description"
      v-bind="contentProps"
      data-test-attachment-content
    >
      <div v-if="props.label || $slots.label" v-bind="labelProps" data-test-attachment-label>
        <slot name="label" v-bind="attachmentContext">{{ props.label }}</slot>
      </div>
      <div
        v-if="props.description || $slots.description"
        v-bind="descriptionProps"
        data-test-attachment-description
      >
        <slot name="description" v-bind="attachmentContext">{{ props.description }}</slot>
      </div>
    </div>

    <div v-if="$slots.actions" v-bind="actionsProps" data-test-attachment-actions>
      <slot name="actions" v-bind="attachmentContext" />
    </div>
  </div>
</template>
