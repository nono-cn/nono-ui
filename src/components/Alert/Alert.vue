<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { useTheme } from '@/composables'
import { useUi } from '@/composables/useUi'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import {
  alertCloseButtonContainerVariants,
  alertDescriptionVariants,
  alertIconContainerVariants,
  alertLabelVariants,
  alertVariants,
  type AlertEmits,
  type AlertProps,
  type AlertSlots,
} from '.'
import { alertDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AlertProps>(), alertDefaults)
const emit = defineEmits<AlertEmits>()
defineSlots<AlertSlots>()

const attrs = useAttrs()
const slots = useSlots()
const visible = ref(true)
const { t } = useI18n()

const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'alert',
  defaultColor: alertDefaults.color,
})

const rootProps = computed(() => {
  return {
    role: props.decorative ? 'none' : 'alert',
    ...attrs,
    class: cn(
      alertVariants({
        variant: props.variant,
        icon: Boolean(props.icon || slots.icon),
      }),
      attrs.class,
    ),
    style: [colorStyle.value, attrs.style],
  }
})

const iconContainerProps = {
  class: alertIconContainerVariants(),
}

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, undefined)
  return { ...ui, class: cn(alertLabelVariants(), ui.class) }
})

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, undefined)
  return { ...ui, class: cn(alertDescriptionVariants(), ui.class) }
})

const closeButtonContainerProps = {
  class: alertCloseButtonContainerVariants(),
}

const closeButtonProps = computed(() => {
  return {
    'aria-label': t('close'),
    size: 'icon-xs' as const,
    radius: 'full',
    variant: props.variant,
    color: props.color,
    icon: 'x' as const,
  }
})

function close() {
  visible.value = false
  emit('close')
}
</script>

<template>
  <div v-if="visible" v-bind="rootProps" data-test-alert-root>
    <span
      v-if="props.icon || slots.icon"
      v-bind="iconContainerProps"
      data-test-alert-icon-container
    >
      <slot name="icon">
        <Icon v-if="props.icon" :name="props.icon" data-test-alert-icon />
      </slot>
    </span>

    <div v-if="props.label || slots.label" v-bind="labelProps" data-test-alert-label>
      <slot name="label">{{ props.label }}</slot>
    </div>

    <div
      v-if="props.description || slots.description"
      v-bind="descriptionProps"
      data-test-alert-description
    >
      <slot name="description">{{ props.description }}</slot>
    </div>

    <div
      v-if="props.closable"
      v-bind="closeButtonContainerProps"
      data-test-alert-close-button-container
    >
      <slot name="close" :close="close">
        <Button v-bind="closeButtonProps" data-test-alert-close-button @click="close" />
      </slot>
    </div>
  </div>
</template>
