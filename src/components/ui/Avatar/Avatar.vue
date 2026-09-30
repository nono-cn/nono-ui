<script setup lang="ts">
import { computed, useAttrs, type ImgHTMLAttributes } from 'vue'
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useTheme } from '@/composables'
import { cn } from '@/lib/utils'
import { avatarVariants, type AvatarProps, type AvatarSlots } from '.'
import { avatarDefaults } from './defaults'

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
type AvatarImageProps = ImgHTMLAttributes & { src: string }
const rootProps = computed(() => {
  return {
    class: cn(
      avatarVariants({
        size: props.size,
      }),
    ),
    style: [colorStyle.value, radiusStyle.value],
  }
})

const imageProps = computed<AvatarImageProps>(() => {
  return {
    ...attrs,
    src: props.src ?? '',
    alt: props.alt ?? '',
    class: cn('aspect-square size-full', attrs.class),
  } as AvatarImageProps
})

const fallbackProps = computed(() => {
  return {
    ...attrs,
    delayMs: props.delayMs,
    class: cn('flex size-full items-center justify-center', attrs.class),
  }
})

const iconProps = computed(() => {
  if (!props.icon) return undefined

  return { name: props.icon, size: props.size }
})
</script>

<template>
  <AvatarRoot v-bind="rootProps" as="span" :as-child="false" data-test-avatar-root>
    <AvatarImage v-bind="imageProps" as="img" :as-child="false" data-test-avatar-image />

    <AvatarFallback v-bind="fallbackProps" as="div" :as-child="false" data-test-avatar-fallback>
      <slot name="fallback">
        <Icon v-if="iconProps?.name" v-bind="iconProps" data-test-avatar-icon />
        <template v-else>{{ props.label }}</template>
      </slot>
    </AvatarFallback>
  </AvatarRoot>
</template>
