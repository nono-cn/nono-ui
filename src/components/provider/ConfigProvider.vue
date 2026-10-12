<script setup lang="ts">
import {
  ConfigProvider as RekaConfigProvider,
  ToastProvider,
  ToastViewport,
  useDirection,
} from 'reka-ui'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getTextDirection } from '@/i18n'
import { toastProviderDefaults } from './constants'
import type { ToastProviderProps, ToastViewportConfig } from '@/components/ui/Toast'
import type { NeutralColor } from '../../types/theme'

const props = withDefaults(
  defineProps<{
    neutral?: NeutralColor
    toast?: ToastProviderProps
    toastViewport?: ToastViewportConfig
  }>(),
  {
    neutral: 'neutral',
    toast: undefined,
    toastViewport: undefined,
  },
)

const providerProps = computed(() => ({
  disableSwipe: props.toast?.disableSwipe ?? toastProviderDefaults.disableSwipe,
  duration: props.toast?.duration ?? toastProviderDefaults.duration,
  label: props.toast?.label ?? toastProviderDefaults.label,
  limit: props.toast?.limit,
  swipeDirection: props.toast?.swipeDirection ?? toastProviderDefaults.swipeDirection,
  swipeThreshold: props.toast?.swipeThreshold ?? toastProviderDefaults.swipeThreshold,
  toastManager: props.toast?.toastManager,
}))

const viewportProps = computed(() => ({
  hotkey: props.toastViewport?.hotkey,
  label: props.toastViewport?.label,
  class: props.toastViewport?.class ?? 'fixed right-4 bottom-4 z-50 w-80',
  style: props.toastViewport?.style,
}))

const { locale } = useI18n({ useScope: 'global' })
const localeDirection = computed(() => getTextDirection(locale.value))
const dir = useDirection(localeDirection)

watch(
  locale,
  (value) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = value
      document.documentElement.dir = getTextDirection(value)
    }
  },
  { immediate: true },
)

watch(
  () => props.neutral,
  (value) => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.neutral = value
    }
  },
  { immediate: true },
)
</script>

<template>
  <RekaConfigProvider :dir="dir" :locale="locale">
    <ToastProvider v-bind="providerProps" data-test-toast-provider>
      <slot />
      <ToastViewport v-bind="viewportProps" data-test-toast-viewport />
    </ToastProvider>
  </RekaConfigProvider>
</template>
