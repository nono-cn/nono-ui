<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  switchThumbVariants,
  switchVariants,
  type SwitchProps,
  type SwitchSlots,
  type SwitchValue,
} from '.'
import { switchDefaults } from './default'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SwitchProps>(), switchDefaults)
defineSlots<SwitchSlots>()
const value = defineModel<SwitchValue>('value', { default: false })

const validateValue = (val: SwitchValue) => {
  const isValid = [props.trueValue, props.falseValue].includes(val)
  if (!isValid) return props.falseValue

  return val
}

watch(
  value,
  () => {
    value.value = validateValue(value.value)
  },
  {
    immediate: true,
  },
)
const switchContext = computed(() => ({
  state: value.value === props.trueValue,
}))

const attrs = useAttrs()
const rootProps = computed(() => {
  return {
    ...attrs,
    as: 'button',
    asChild: false,
    trueValue: props.trueValue,
    falseValue: props.falseValue,
    class: cn(
      'peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
      'focus-visible:border-primary focus-visible:ring-primary/50',
      switchVariants({ size: props.size }),
      attrs.class,
    ),
    style: attrs.style,
  }
})

const thumbProps = computed(() => {
  const thumbUI = useUi(props.ui?.thumb, switchContext.value)

  return {
    ...thumbUI,
    class: cn(
      'pointer-events-none block rounded-full bg-background ring-0 transition-transform data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground',
      switchThumbVariants({ size: props.size }),
      thumbUI.class,
    ),
    style: thumbUI.style,
  }
})
</script>

<template>
  <SwitchRoot v-bind="rootProps" v-model="value" data-test-switch-root>
    <SwitchThumb v-bind="thumbProps" data-test-switch-thumb>
      <slot name="thumb" v-bind="switchContext" />
    </SwitchThumb>
  </SwitchRoot>
</template>
