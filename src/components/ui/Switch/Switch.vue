<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { useTheme } from '@/composables'
import { cn } from '@/lib/utils'
import {
  createSwitchContext,
  switchThumbVariants,
  switchVariants,
  type SwitchProps,
  type SwitchValue,
} from '.'
import { switchDefaults, switchSizes } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SwitchProps>(), switchDefaults)
const size = computed(
  () => switchSizes.find((candidate) => candidate === props.size) ?? switchDefaults.size,
)
const modelValue = defineModel<SwitchValue>({ default: switchDefaults.falseValue })

const validateValue = (val: SwitchValue) => {
  const isValid = [props.trueValue, props.falseValue].includes(val)
  if (!isValid) return props.falseValue

  return val
}

watch(
  [modelValue, () => props.trueValue, () => props.falseValue],
  () => {
    modelValue.value = validateValue(modelValue.value)
  },
  {
    immediate: true,
  },
)
const switchContext = computed(() => createSwitchContext(modelValue.value, props.trueValue))
const thumbIcon = computed(() =>
  switchContext.value.state ? props.checkedIcon : props.uncheckedIcon,
)
const colorIcon = computed(() => {
  if (!switchContext.value.state) return 'var(--muted-foreground)'
  return 'var(--switch-color)'
})

const attrs = useAttrs()
const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'switch',
  defaultColor: switchDefaults.color,
})
const rootProps = computed(() => {
  return {
    ...attrs,
    as: 'button',
    asChild: false,
    trueValue: props.trueValue,
    falseValue: props.falseValue,
    class: cn(switchVariants({ size: size.value }), attrs.class),
    style: [colorStyle.value, attrs.style],
  }
})

const thumbProps = computed(() => {
  const thumbUI = useUi(props.ui?.thumb, switchContext.value)

  return {
    ...thumbUI,
    class: cn(switchThumbVariants({ size: size.value }), thumbUI.class),
    style: thumbUI.style,
  }
})
</script>

<template>
  <SwitchRoot v-bind="rootProps" v-model="modelValue" data-test-switch-root>
    <SwitchThumb v-bind="thumbProps" data-test-switch-thumb>
      <Icon v-if="thumbIcon" :name="thumbIcon" :color="colorIcon" data-test-switch-icon />
    </SwitchThumb>
  </SwitchRoot>
</template>
