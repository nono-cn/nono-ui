<script setup lang="ts">
import { computed, ref, useAttrs, useTemplateRef, watch } from 'vue'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui'
import { Icon } from '@/components/Icon'
import { useTheme } from '@/composables'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  avatarFallbackVariants,
  avatarIconVariants,
  avatarImageVariants,
  avatarLabelVariants,
  avatarScreenReaderLabelVariants,
  avatarVariants,
  fitText,
  type AvatarProps,
  type AvatarSlots,
} from '.'
import { avatarDefaults, avatarSizes } from './constants'

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

const size = computed(() =>
  (avatarSizes as readonly unknown[]).includes(props.size) ? props.size : avatarDefaults.size,
)

const rootProps = computed(() => {
  return {
    ...attrs,
    as: 'span' as const,
    asChild: false,
    class: cn(avatarVariants({ size: size.value }), attrs.class),
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

const labelProps = {
  class: avatarLabelVariants(),
}

const screenReaderLabelProps = {
  class: avatarScreenReaderLabelVariants(),
}

const labelElement = useTemplateRef<HTMLElement>('label')
const visibleLabel = ref(props.label ?? '')
let measureContext: CanvasRenderingContext2D | null = null

function fitLabel() {
  const label = props.label ?? ''
  const element = labelElement.value

  if (!element?.parentElement) {
    visibleLabel.value = label
    return
  }

  measureContext ??= document.createElement('canvas').getContext('2d')
  measureContext!.font = getComputedStyle(element).font
  const available = element.parentElement.clientWidth

  visibleLabel.value = fitText(
    label,
    (text) => measureContext!.measureText(text).width <= available,
  )
}

watch([labelElement, () => props.label], fitLabel, { flush: 'post' })
useResizeObserver(() => labelElement.value?.parentElement, fitLabel)
useEventListener(document.fonts, 'loadingdone', fitLabel)
</script>

<template>
  <AvatarRoot v-bind="rootProps" data-test-avatar-root>
    <AvatarImage v-bind="imageProps" data-test-avatar-image />

    <AvatarFallback v-bind="fallbackProps" data-test-avatar-fallback>
      <slot name="fallback">
        <Icon v-if="props.icon" :name="props.icon" v-bind="iconProps" data-test-avatar-icon />
        <template v-else-if="props.label">
          <span ref="label" v-bind="labelProps" aria-hidden="true" data-test-avatar-label>
            {{ visibleLabel }}
          </span>
          <span v-bind="screenReaderLabelProps" data-test-avatar-screen-reader-label>
            {{ props.label }}
          </span>
        </template>
      </slot>
    </AvatarFallback>
  </AvatarRoot>
</template>
