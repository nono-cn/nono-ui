<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { announcerDefaults } from './constants'
import { announcerVariants, type AnnouncerProps, type AnnouncerSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AnnouncerProps>(), announcerDefaults)
defineSlots<AnnouncerSlots>()

const attrs = useAttrs()

const role = computed(() => {
  if (props.politeness === 'assertive') return 'alert'
  if (props.politeness === 'polite') return 'status'
  return undefined
})

const rootProps = computed(() => {
  return {
    ...attrs,
    'aria-atomic': props.atomic,
    'aria-live': props.politeness,
    role: role.value,
    class: cn(announcerVariants({ visible: props.visible }), attrs.class),
    style: attrs.style,
  }
})
</script>

<template>
  <span v-bind="rootProps" data-test-announcer-root>
    <slot>{{ props.message }}</slot>
  </span>
</template>
