<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  cardActionVariants,
  cardContentVariants,
  cardDescriptionVariants,
  cardFooterVariants,
  cardHeaderVariants,
  cardLabelVariants,
  cardVariants,
  type CardProps,
  type CardSlots,
} from '.'
import { cardDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CardProps>(), cardDefaults)
defineSlots<CardSlots>()

const attrs = useAttrs()

const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(cardVariants(), attrs.class),
    style: attrs.style,
  }
})

const headerProps = computed(() => {
  const ui = useUi(props.ui?.header, undefined)
  return { ...ui, class: cn(cardHeaderVariants(), ui.class) }
})

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, undefined)
  return { ...ui, class: cn(cardLabelVariants(), ui.class) }
})

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, undefined)
  return { ...ui, class: cn(cardDescriptionVariants(), ui.class) }
})

const actionProps = computed(() => {
  const ui = useUi(props.ui?.action, undefined)
  return { ...ui, class: cn(cardActionVariants(), ui.class) }
})

const contentProps = computed(() => {
  const ui = useUi(props.ui?.content, undefined)
  return { ...ui, class: cn(cardContentVariants(), ui.class) }
})

const footerProps = computed(() => {
  const ui = useUi(props.ui?.footer, undefined)
  return { ...ui, class: cn(cardFooterVariants(), ui.class) }
})
</script>

<template>
  <div v-bind="rootProps" data-test-card-root>
    <div
      v-if="
        props.label ||
        props.description ||
        $slots.header ||
        $slots.label ||
        $slots.description ||
        $slots.action
      "
      v-bind="headerProps"
      data-test-card-header
    >
      <slot name="header">
        <h3 v-if="props.label || $slots.label" v-bind="labelProps" data-test-card-label>
          <slot name="label">{{ props.label }}</slot>
        </h3>

        <p
          v-if="props.description || $slots.description"
          v-bind="descriptionProps"
          data-test-card-description
        >
          <slot name="description">{{ props.description }}</slot>
        </p>

        <div
          v-if="$slots.action"
          v-bind="actionProps"
          data-slot="card-action"
          data-test-card-action
        >
          <slot name="action" />
        </div>
      </slot>
    </div>

    <div v-if="$slots.default" v-bind="contentProps" data-test-card-content>
      <slot />
    </div>

    <div v-if="$slots.footer" v-bind="footerProps" data-test-card-footer>
      <slot name="footer" />
    </div>
  </div>
</template>
