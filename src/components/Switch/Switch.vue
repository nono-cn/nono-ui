<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { Icon } from '@/components/Icon'
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
const modelValue = defineModel<SwitchValue>({ default: switchDefaults.falseValue })

const switchContext = computed(() => createSwitchContext(modelValue.value, props.trueValue))
const thumbIcon = computed(() =>
  switchContext.value.state ? props.checkedIcon : props.uncheckedIcon,
)

const attrs = useAttrs()
const size = computed(() =>
  (switchSizes as readonly unknown[]).includes(props.size) ? props.size : switchDefaults.size,
)

const { colorStyle } = useTheme({
  color: () => props.color,
  prefix: 'switch',
  defaultColor: switchDefaults.color,
})

const rootProps = computed(() => ({
  ...attrs,
  as: 'button',
  asChild: false,
  trueValue: props.trueValue,
  falseValue: props.falseValue,
  class: cn(switchVariants({ size: size.value }), attrs.class),
  style: [colorStyle.value, attrs.style],
}))

const thumbProps = computed(() => {
  const ui = useUi(props.ui?.thumb, switchContext.value)

  return {
    ...ui,
    class: cn(switchThumbVariants({ size: size.value }), ui.class),
    style: ui.style,
  }
})

const iconProps = computed(() => ({
  name: thumbIcon.value,
  color: switchContext.value.state ? 'var(--switch-color)' : 'var(--muted-foreground)',
}))
</script>

<template>
  <SwitchRoot v-bind="rootProps" v-model="modelValue" data-test-switch-root>
    <SwitchThumb v-bind="thumbProps" data-test-switch-thumb>
      <Icon v-if="iconProps.name" v-bind="iconProps" data-test-switch-icon />
    </SwitchThumb>
  </SwitchRoot>
</template>
