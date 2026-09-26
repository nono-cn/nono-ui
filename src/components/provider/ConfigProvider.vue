<script setup lang="ts">
import { ConfigProvider as RekaConfigProvider, useDirection } from 'reka-ui'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getTextDirection } from '@/i18n'
import type { NeutralColor } from '../../types/theme'

const props = withDefaults(defineProps<{ neutral?: NeutralColor }>(), {
  neutral: 'neutral',
})

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
    <slot />
  </RekaConfigProvider>
</template>
