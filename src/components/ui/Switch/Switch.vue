<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { useColor } from '@/composables'
import { cn } from '@/lib/utils'
import { switchThumbVariants, switchVariants, type SwitchProps, type SwitchValue } from '.'
import { switchDefaults } from './default'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SwitchProps>(), switchDefaults)
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
const thumbIcon = computed(() =>
  switchContext.value.state ? props.checkedIcon : props.uncheckedIcon,
)
const colorIcon = computed(() => {
  if (!switchContext.value.state) return 'var(--muted-foreground)'
  if (props.color) return 'var(--switch-color)'

  return `var(--${props.severity})`
})

const attrs = useAttrs()
const { colorStyle } = useColor(
  computed(() => props.color),
  'switch',
)
const rootProps = computed(() => {
  return {
    ...attrs,
    as: 'button',
    asChild: false,
    trueValue: props.trueValue,
    falseValue: props.falseValue,
    class: cn(
      'peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
      switchVariants({ size: props.size, severity: props.severity, color: Boolean(props.color) }),
      attrs.class,
    ),
    style: [colorStyle.value, attrs.style],
  }
})

const thumbProps = computed(() => {
  const thumbUI = useUi(props.ui?.thumb, switchContext.value)

  return {
    ...thumbUI,
    class: cn(
      'pointer-events-none block rounded-full bg-background ring-0 transition-transform [&>*]:!size-full data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground',
      '[&>svg]:text-foreground',
      switchThumbVariants({
        size: props.size,
        severity: props.severity,
        color: Boolean(props.color),
      }),
      thumbUI.class,
    ),
    style: thumbUI.style,
  }
})
</script>

<template>
  <SwitchRoot v-bind="rootProps" v-model="value" data-test-switch-root>
    <SwitchThumb v-bind="thumbProps" data-test-switch-thumb>
      <Icon
        v-if="thumbIcon?.name"
        v-bind="thumbIcon"
        :name="thumbIcon.name"
        :color="thumbIcon.color ?? colorIcon"
        :class="thumbIcon.class"
        data-test-switch-icon
      />
    </SwitchThumb>
  </SwitchRoot>
</template>
