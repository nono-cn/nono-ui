<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { Button, toIconButtonSize } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { useI18n } from '@/i18n'
import { alertVariants, type AlertEmits, type AlertProps, type AlertSlots } from '.'
import { alertDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AlertProps>(), alertDefaults)
const emit = defineEmits<AlertEmits>()
defineSlots<AlertSlots>()

const attrs = useAttrs()
const slots = useSlots()
const visible = ref(true)
const { t } = useI18n()
const { colorStyle } = useColor(
  computed(() => props.color),
  'alert',
)

const rootProps = computed(() => {
  const calculatedVariants = alertVariants({
    variant: props.variant,
    severity: props.severity,
    color: Boolean(props.color),
  })
  return {
    ...attrs,
    role: props.decorative ? 'none' : 'alert',
    class: cn(
      'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm',
      (props.icon || slots.icon) && 'grid-cols-[calc(var(--spacing)*4)_1fr] gap-x-3',
      '[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
      calculatedVariants,
      props.closable && (props.closeButton?.label ? 'pr-24' : 'pr-12'),
      attrs.class,
    ),
    style: [colorStyle.value, attrs.style],
  }
})

const iconProps = computed(() => props.icon)

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, undefined)
  return {
    ...ui,
    class: cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', ui.class),
  }
})

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, undefined)
  return {
    ...ui,
    class: cn('col-start-2 text-sm text-current/80 [&_p]:leading-relaxed', ui.class),
  }
})

const closeButtonContainerProps = computed(() => {
  const ui = useUi(props.ui?.closeButtonContainer, undefined)
  return { ...ui, class: cn('absolute top-2 right-2 shrink-0', ui.class) }
})

const closeButtonProps = computed(() => {
  const button = props.closeButton
  return {
    ...button,
    'aria-label': t('close'),
    size: toIconButtonSize(button?.size ?? 'xs'),
    radius: button?.radius ?? 'full',
    variant: button?.variant ?? props.variant,
    severity: button?.severity ?? props.severity,
    color: button?.color ?? props.color,
    icon: button?.icon ?? 'x',
  }
})

function close() {
  visible.value = false
  emit('close')
}
</script>
<template>
  <div v-if="visible" v-bind="rootProps" data-test-alert-root>
    <slot name="icon">
      <Icon v-if="iconProps" :name="iconProps" data-test-alert-icon />
    </slot>

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

    <div v-if="props.closable" v-bind="closeButtonContainerProps">
      <slot name="close" :close="close">
        <Button v-bind="closeButtonProps" data-test-alert-close-button @click="close" />
      </slot>
    </div>
  </div>
</template>
