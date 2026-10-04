<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import {
  loadingContentVariants,
  loadingIconVariants,
  loadingIndicatorVariants,
  loadingVariants,
  type LoadingContext,
  type LoadingProps,
  type LoadingSlots,
} from '.'
import { loadingDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LoadingProps>(), loadingDefaults)
defineSlots<LoadingSlots>()

const attrs = useAttrs()
const { t } = useI18n()

const loadingContext = computed<LoadingContext>(() => ({
  loading: props.loading,
}))

const rootProps = computed(() => ({
  ...attrs,
  role: 'status',
  'aria-busy': props.loading,
  'aria-label': props.loading ? (attrs['aria-label'] ?? t('loading')) : undefined,
  class: cn(loadingVariants(), attrs.class),
  style: attrs.style,
}))

const loadingProps = computed(() => {
  const loadingUI = useUi(props.ui?.loading, loadingContext.value)

  return {
    ...loadingUI,
    class: cn(loadingIndicatorVariants(), loadingUI.class),
  }
})

const contentProps = computed(() => {
  const contentUI = useUi(props.ui?.content, loadingContext.value)

  return {
    ...contentUI,
    class: cn(loadingContentVariants(), contentUI.class),
  }
})
</script>

<template>
  <div v-bind="rootProps" data-test-loading-root>
    <div v-show="props.loading" v-bind="loadingProps" data-test-loading-loading>
      <slot name="loading" v-bind="loadingContext">
        <Icon
          v-if="props.icon"
          :name="props.icon"
          :class="loadingIconVariants()"
          data-test-loading-icon
        />
      </slot>
    </div>

    <div v-show="!props.loading" v-bind="contentProps" data-test-loading-content>
      <slot v-bind="loadingContext" />
    </div>
  </div>
</template>
