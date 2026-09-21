<script setup lang="ts">
import { computed, ref, useAttrs, useSlots, watch } from 'vue'
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import type { PopoverContext, PopoverEmits, PopoverProps, PopoverSlots } from '.'
import { popoverDefaults } from './defaults'
import { useArrow } from '@/composables/useArrow'
import { useContent } from '@/composables/useContent'

defineOptions({ inheritAttrs: false })
defineSlots<PopoverSlots>()
const props = withDefaults(defineProps<PopoverProps>(), popoverDefaults)
const emit = defineEmits<PopoverEmits>()
const attrs = useAttrs()
const slots = useSlots()
const portalTarget = ref<HTMLElement>()
const open = defineModel<boolean>('open', { default: false })

watch(open, (value, previousValue) => {
  if (value === previousValue) return
  if (value) emit('show')
  else emit('close')
})

function close() {
  open.value = false
}
const popoverContext = computed<PopoverContext>(() => ({ open: open.value, close }))
const rootProps = computed(() => ({ modal: props.modal }))
const contentProps = useContent(computed(() => props.content))
const arrowProps = useArrow(computed(() => props.arrow))
</script>

<template>
  <div v-bind="attrs" class="contents" data-test-popover-root>
    <PopoverRoot v-bind="rootProps" v-model:open="open">
      <PopoverTrigger as-child data-test-popover-trigger
        ><slot v-bind="popoverContext"
      /></PopoverTrigger>
      <PopoverPortal :to="portalTarget">
        <PopoverContent v-if="slots.content" v-bind="contentProps" data-test-popover-content>
          <slot name="content" v-bind="popoverContext" />
          <PopoverArrow v-if="props.showArrow" v-bind="arrowProps" data-test-popover-arrow />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
    <div ref="portalTarget" data-test-popover-portal-target />
  </div>
</template>
