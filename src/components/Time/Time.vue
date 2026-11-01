<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useDates } from '@/composables/useDates'
import { cn } from '@/lib/utils'
import { createTimeContext, type TimeProps, type TimeSlots } from '.'
import { timeDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TimeProps>(), timeDefaults)
defineSlots<TimeSlots>()

const attrs = useAttrs()
const { formatDate, toDatetime } = useDates()
const formattedDate = computed(() =>
  formatDate(props.datetime, {
    locale: props.locale,
    format: props.format,
  }),
)
const timeContext = computed(() => createTimeContext(formattedDate.value))

const rootProps = computed(() => {
  return {
    ...attrs,
    datetime: toDatetime(props.datetime),
    'data-allow-mismatch': true,
    class: cn(attrs.class),
    style: [attrs.style],
  }
})
</script>

<template>
  <time v-bind="rootProps" data-test-time-root>
    <slot v-bind="timeContext">{{ formattedDate }}</slot>
  </time>
</template>
