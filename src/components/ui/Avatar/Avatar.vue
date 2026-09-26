<script setup lang="ts">
import { computed, useAttrs, type CSSProperties, type ImgHTMLAttributes } from 'vue'
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import { avatarVariants, type AvatarProps, type AvatarSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
  shape: 'rounded',
  severity: 'neutral',
  icon: undefined,
  label: undefined,
})
defineSlots<AvatarSlots>()

const attrs = useAttrs()
const colorStyle = computed<CSSProperties | undefined>(() =>
  props.color ? { '--avatar-color': props.color } : undefined,
)
type AvatarImageProps = ImgHTMLAttributes & { src: string }
const rootProps = computed(() => {
  return {
    class: cn(
      avatarVariants({
        size: props.size,
        shape: props.shape,
        severity: props.severity,
        color: Boolean(props.color),
      }),
    ),
    style: colorStyle.value,
  }
})

const imageProps = computed<AvatarImageProps>(() => {
  return {
    ...attrs,
    src: props.src ?? '',
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

const iconProps = computed(() => props.icon)
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
