<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui'
import { Icon } from '@/components/Icon'
import { useTheme } from '@/composables'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  avatarFallbackVariants,
  avatarIconVariants,
  avatarImageVariants,
  avatarVariants,
  type AvatarProps,
  type AvatarSlots,
} from '.'
import { avatarDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AvatarProps>(), avatarDefaults)
defineSlots<AvatarSlots>()

const attrs = useAttrs()

const { colorStyle, radiusStyle } = useTheme({
  color: () => props.color,
  prefix: 'avatar',
  defaultColor: avatarDefaults.color,
  radius: () => props.radius,
  defaultRadius: avatarDefaults.radius,
})

const rootProps = computed(() => {
  return {
    ...attrs,
    as: 'span' as const,
    asChild: false,
    class: cn(avatarVariants({ size: props.size }), attrs.class),
    style: [colorStyle.value, radiusStyle.value, attrs.style],
  }
})

const imageProps = computed(() => {
  const ui = useUi(props.ui?.image, undefined)

  return {
    ...ui,
    src: props.src ?? '',
    alt: props.alt,
    as: 'img' as const,
    asChild: false,
    class: cn(avatarImageVariants(), ui.class),
  }
})

const fallbackProps = computed(() => {
  const ui = useUi(props.ui?.fallback, undefined)

  return {
    ...ui,
    delayMs: props.delayMs,
    as: 'span' as const,
    asChild: false,
    class: cn(avatarFallbackVariants(), ui.class),
  }
})

const iconProps = {
  class: avatarIconVariants(),
}
</script>

<template>
  <AvatarRoot v-bind="rootProps" data-test-avatar-root>
    <AvatarImage v-bind="imageProps" data-test-avatar-image />

    <AvatarFallback v-bind="fallbackProps" data-test-avatar-fallback>
      <slot name="fallback">
        <Icon v-if="props.icon" :name="props.icon" v-bind="iconProps" data-test-avatar-icon />
        <template v-else>{{ props.label }}</template>
      </slot>
    </AvatarFallback>
  </AvatarRoot>
</template>
